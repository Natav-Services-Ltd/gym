import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fail, hashPassword, readJson, startSession } from '@/lib/auth';
import { parseCreds } from '@/lib/creds';

export async function POST(req: Request) {
  const c = parseCreds(await readJson(req).catch(() => null));
  if ('error' in c) return fail(c.error, 400);
  try {
    const { rows } = await (await db()).query<{ id: string; email: string }>(
      'insert into users (email, password_hash) values ($1, $2) returning id, email',
      [c.email, await hashPassword(c.password)],
    );
    await startSession(rows[0].id);
    return NextResponse.json({ user: rows[0] });
  } catch (e) {
    if ((e as { code?: string }).code === '23505') return fail('email_taken', 409);
    throw e;
  }
}
