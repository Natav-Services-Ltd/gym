import { Pool } from 'pg';

const g = globalThis as unknown as { gymPool?: Pool; gymReady?: Promise<void> };

function pool(): Pool {
  if (!g.gymPool) {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL is not set');
    g.gymPool = new Pool({ connectionString: url, max: 5 });
  }
  return g.gymPool;
}

// Schema is tiny and idempotent, so it is created on first use instead of a migration tool.
const SCHEMA = `
create table if not exists users (
  id            uuid primary key default gen_random_uuid(),
  email         text not null unique,
  password_hash text not null,
  created_at    timestamptz not null default now()
);
create table if not exists auth_sessions (
  token_hash text primary key,
  user_id    uuid not null references users(id) on delete cascade,
  expires_at timestamptz not null
);
create table if not exists gym_docs (
  user_id    uuid not null references users(id) on delete cascade,
  id         text not null,            -- 'settings' | 'active' | 's-<session id>'
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);`;

export async function db(): Promise<Pool> {
  const p = pool();
  g.gymReady ??= p.query(SCHEMA).then(() => undefined).catch((e) => { g.gymReady = undefined; throw e; });
  await g.gymReady;
  return p;
}
