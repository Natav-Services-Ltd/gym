import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser, fail, readJson } from '@/lib/auth';
import { validDocId } from '@/lib/docs';

type Ctx = { params: Promise<{ id: string }> };

export async function PUT(req: Request, { params }: Ctx) {
  const u = await currentUser();
  if (!u) return fail('unauthorized', 401);
  const { id } = await params;
  if (!validDocId(id)) return fail('bad_id', 400);
  const body = (await readJson(req).catch(() => null)) as { data?: unknown } | null;
  if (body?.data == null) return fail('bad_request', 400);
  await (await db()).query(
    `insert into gym_docs (user_id, id, data) values ($1, $2, $3)
     on conflict (user_id, id) do update set data = excluded.data, updated_at = now()`,
    [u.id, id, JSON.stringify(body.data)],
  );
  return NextResponse.json({ ok: true });
}

export async function DELETE(_req: Request, { params }: Ctx) {
  const u = await currentUser();
  if (!u) return fail('unauthorized', 401);
  const { id } = await params;
  if (!validDocId(id)) return fail('bad_id', 400);
  await (await db()).query('delete from gym_docs where user_id = $1 and id = $2', [u.id, id]);
  return NextResponse.json({ ok: true });
}
