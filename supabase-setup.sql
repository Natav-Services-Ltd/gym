-- חדר הכושר שלי: טבלת נתונים לכל משתמש, עם הרשאות ברמת שורה
create table if not exists public.gym_docs (
  user_id    uuid not null default auth.uid() references auth.users(id) on delete cascade,
  id         text not null,               -- 'settings' | 'active' | 's-<session id>'
  data       jsonb not null,
  updated_at timestamptz not null default now(),
  primary key (user_id, id)
);
alter table public.gym_docs enable row level security;
drop policy if exists "own rows select" on public.gym_docs;
drop policy if exists "own rows insert" on public.gym_docs;
drop policy if exists "own rows update" on public.gym_docs;
drop policy if exists "own rows delete" on public.gym_docs;
create policy "own rows select" on public.gym_docs for select to authenticated using (auth.uid() = user_id);
create policy "own rows insert" on public.gym_docs for insert to authenticated with check (auth.uid() = user_id);
create policy "own rows update" on public.gym_docs for update to authenticated using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows delete" on public.gym_docs for delete to authenticated using (auth.uid() = user_id);
