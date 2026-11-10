import { createHash, randomBytes, scrypt as scryptCb, timingSafeEqual } from 'node:crypto';
import { promisify } from 'node:util';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { db } from './db';

const scrypt = promisify(scryptCb) as (pw: string, salt: Buffer, len: number) => Promise<Buffer>;
const COOKIE = 'gym_session';
const SESSION_DAYS = 180;

export type User = { id: string; email: string };

export async function hashPassword(pw: string): Promise<string> {
  const salt = randomBytes(16);
  const key = await scrypt(pw, salt, 64);
  return `scrypt$${salt.toString('base64')}$${key.toString('base64')}`;
}

export async function verifyPassword(pw: string, stored: string): Promise<boolean> {
  const [alg, salt, key] = stored.split('$');
  if (alg !== 'scrypt' || !salt || !key) return false;
  const want = Buffer.from(key, 'base64');
  const got = await scrypt(pw, Buffer.from(salt, 'base64'), want.length);
  return timingSafeEqual(got, want);
}

const sha = (s: string) => createHash('sha256').update(s).digest('hex');

export async function startSession(userId: string): Promise<void> {
  const token = randomBytes(32).toString('base64url');
  const expires = new Date(Date.now() + SESSION_DAYS * 864e5);
  const pg = await db();
  await pg.query('delete from auth_sessions where expires_at < now()');
  await pg.query('insert into auth_sessions (token_hash, user_id, expires_at) values ($1, $2, $3)', [sha(token), userId, expires]);
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    expires,
  });
}

export async function endSession(): Promise<void> {
  const jar = await cookies();
  const token = jar.get(COOKIE)?.value;
  if (token) await (await db()).query('delete from auth_sessions where token_hash = $1', [sha(token)]);
  jar.delete(COOKIE);
}

export async function currentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const { rows } = await (await db()).query<User>(
    `select u.id, u.email from auth_sessions s join users u on u.id = s.user_id
     where s.token_hash = $1 and s.expires_at > now()`,
    [sha(token)],
  );
  return rows[0] ?? null;
}

export const fail = (error: string, status: number) => NextResponse.json({ error }, { status });

/** Reads a JSON body, refusing anything over `max` bytes. */
export async function readJson(req: Request, max = 1_000_000): Promise<unknown> {
  const text = await req.text();
  if (text.length > max) throw new Error('too_large');
  return JSON.parse(text);
}
