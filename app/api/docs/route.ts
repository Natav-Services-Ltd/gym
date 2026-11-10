import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { currentUser, fail, readJson } from '@/lib/auth';
import { validDocId } from '@/lib/docs';

export const dynamic = 'force-dynamic';

/** All of the signed-in user's docs. */
export async function GET() {
  const u = await currentUser();
  if (!u) return fail('unauthorized', 401);
  const { rows } = await (await db()).query('select id, data from gym_docs where user_id = $1', [u.id]);
  return NextResponse.json({ docs: rows });
}

/** Bulk upsert, used on first login to upload what is on the device. */
export async function POST(req: Request) {
  const u = await currentUser();
  if (!u) return fail('unauthorized', 401);
  const body = (await readJson(req, 20_000_000).catch(() => null)) as { docs?: unknown } | null;
  const docs = body?.docs;
  if (!Array.isArray(docs) || docs.length > 10_000) return fail('bad_request', 400);
  if (!docs.every((d) => d && validDocId(d.id) && d.data != null)) return fail('bad_request', 400);
  const pg = await db();
  const client = await pg.connect();
  try {
    await client.query('begin');
    for (const d of docs) {
      await client.query(
        `insert into gym_docs (user_id, id, data) values ($1, $2, $3)
         on conflict (user_id, id) do update set data = excluded.data, updated_at = now()`,
        [u.id, d.id, JSON.stringify(d.data)],
      );
    }
    await client.query('commit');
  } catch (e) {
    await client.query('rollback');
    throw e;
  } finally {
    client.release();
  }
  return NextResponse.json({ ok: true, count: docs.length });
}
