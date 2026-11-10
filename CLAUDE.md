# CLAUDE.md — חדר הכושר שלי (Gym app)

Personal workout PWA for Ilan's gym at work (multi-trainer, adjustable bench, dumbbells, spin bike), home treadmill and outdoor running, with a Garmin Fenix 8 Pro.
Hebrew UI, RTL, mobile-first (tested at 360–412px, OPPO phone). Legacy static version: https://natav-services-ltd.github.io/gym/ (branch `main`). Next.js version deployed on Railway (branch `nextjs`).

## Golden rules
- **Stack: Next.js (App Router) + TypeScript backend + Postgres, deployed on Railway.** The client UI is still the original vanilla JS in `public/app.js`; port screens to React components only when they are being changed. Keep `npm run typecheck` and `npm run build` green.
- **Never invent training data.** Stats, muscle load, recommendations and charts come only from sets the user marked done (`set.done === true`).
- **Don't lose user data.** Storage keys, document ids and document shapes below are a contract. Migrate, never drop.
- All user-facing text is Hebrew; keep `dir="rtl"`. Exercise `en` names are for YouTube search only.
- Respect `prefers-reduced-motion`; keep touch targets ≥ 40px.

## Files
| File | Purpose |
|---|---|
| `app/layout.tsx`, `app/page.tsx` | Page shell: `<head>` PWA tags, static markup from `app/body.html`, loads `/app.js` |
| `app/globals.css` | All app CSS |
| `public/app.js` | The whole client UI (vanilla JS) |
| `app/api/auth/*` | `signup`, `login`, `logout` (POST), `me` (GET). Email + scrypt password, httpOnly session cookie |
| `app/api/docs`, `app/api/docs/[id]` | Per-user doc store: GET all / POST bulk upsert; PUT / DELETE one |
| `lib/db.ts` | pg pool + schema (`users`, `auth_sessions`, `gym_docs`), created on first request |
| `lib/auth.ts`, `lib/creds.ts`, `lib/docs.ts` | Password hashing, sessions, input validation, allowed doc ids |
| `public/sw.js` | Service worker: network-first for page + `app.js`, cache-first for icons/fonts, never caches `/api`. **Bump `CACHE` (`gym-vN`) on every release** |
| `public/manifest.webmanifest`, `public/icon-*.png`, `public/apple-touch-icon.png` | PWA install |

Env: `DATABASE_URL` (Railway: `${{Postgres.DATABASE_URL}}`).

## Two runtime targets, one client source
1. **Website (Next.js on Railway)** — server accounts via `/api`; works as guest (localStorage only) if the user skips login or the server is unreachable.
2. **Claude artifact** (claude.ai) — same client code *without* the PWA head tags and SW registration. Inside Claude, `window.claude` exists and enables `db` (per-user cloud store), `user` and `sample` (AI coach).

The code branches on `window.claude`:
- present → Claude storage (`claude.use('db')`, docs under `data/users/<uid>/`), AI coach enabled, YouTube embeds **blocked** (links open externally).
- absent (website) → server account via `/api` (or guest/local), AI coach hidden, YouTube embeds play in-app (`youtube-nocookie.com`).

## Code map (inside `public/app.js`, in order)
- **DATA**: `AREAS`, `EQ`, `EX` (base exercises) + `MORE` (added via `X(...)` helper), `CARDIO`, `DEF_PLAN`, `DEF`.
- **Muscles**: `MUS` (id → Hebrew), `MUSX` (id → English), `MU` (exercise → `[[primary],[secondary]]`), `CARDIO_MU`. Every exercise has `e.mu`.
- **Figure engine** (exercise animations): `PATS` (poses A/B per motion pattern), `solve()` forward kinematics, `phaseAt()` tempo (≈1s concentric, hold, ≈1.7s eccentric), `HL` muscle highlight per pattern, `ECCF` (eccentric-first patterns), `CYC` (cyclic), `TRAIL`. Rendered via `figSVG(pid)` + `registerFigs(root)`; one rAF loop animates visible figures.
- **Anatomy / muscle map**: `ANAT` (original SVG paths, left half, mirrored with `MIR`), `bodySVG(side, colorOf, small, opts)`, `bodyMap()`, `miniBody()`. Interactive map: `muscleLoad(period)` → per-muscle `{pri, sec, vol, reps, last, ex}`, `mmLevel()` with thresholds `MM_T`, `muscleMapCard()` / `renderMM()`. Primary set = 1, secondary = 0.5.
- **State & storage**: `S = {settings, sessions, active}`; `LS` = current localStorage key; `saveLocal()`, `dbPut(id, data)` (routes to Claude db or the `/api/docs` backend via `sbPut`), `saveSettings()`, `saveActive()` (debounced), `saveSession()`. Doc ids: `settings`, `active`, `s-<session id>`.
- **Logic**: `genDraft()` (builds workout, least-recently-used first, weighted exercises preferred), `recommend()`.
