import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { fail, readJson, startSession, verifyPassword } from '@/lib/auth';

// shortcut: no rate limiting on login attempts; add one (per IP + email) before the user base grows.
export async function POST(req: Request) {
  const b = ((await readJson(req).catch(() => null)) ?? {}) as Record<string, unknown>;
  const email = typeof b.email === 'string' ? b.email.trim().toLowerCase() : '';
  const password = typeof b.password === 'string' ? b.password : '';
  if (!email || !password || password.length > 200) return fail('invalid_credentials', 401);
  const { rows } = await (await db()).query<{ id: string; email: string; password_hash: string }>(
    'select id, email, password_hash from users where email = $1',
    [email],
  );
  const u = rows[0];
  if (!u || !(await verifyPassword(password, u.password_hash))) return fail('invalid_credentials', 401);
  await startSession(u.id);
  return NextResponse.json({ user: { id: u.id, email: u.email } });
}
