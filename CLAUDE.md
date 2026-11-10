# CLAUDE.md — חדר הכושר שלי (Gym app)

Personal workout PWA for Ilan's gym at work (multi-trainer, adjustable bench, dumbbells, spin bike), home treadmill and outdoor running, with a Garmin Fenix 8 Pro.
Hebrew UI, RTL, mobile-first (tested at 360–412px, OPPO phone). Live at https://natav-services-ltd.github.io/gym/

## Golden rules
- **No build step, no framework.** Everything lives in one file: `index.html` (HTML + CSS + vanilla JS). Do not introduce React, bundlers or npm deps — the single-file PWA must keep working on GitHub Pages / Netlify as static files.
- **Never invent training data.** Stats, muscle load, recommendations and charts come only from sets the user marked done (`set.done === true`).
- **Don't lose user data.** Storage keys and document shapes below are a contract. Migrate, never drop.
- All user-facing text is Hebrew; keep `dir="rtl"`. Exercise `en` names are for YouTube search only.
- Respect `prefers-reduced-motion`; keep touch targets ≥ 40px.

## Files
| File | Purpose |
|---|---|
| `index.html` | The whole app |
| `sw.js` | Service worker: network-first for the page, cache-first for icons/fonts. **Bump `CACHE` (`gym-vN`) on every release** |
| `manifest.webmanifest`, `icon-*.png`, `apple-touch-icon.png` | PWA install |
| `supabase-setup.sql` | Optional: table `gym_docs` + RLS for web accounts |

## Two deployment targets, one source
1. **Website (this repo, GitHub Pages)** — `index.html` here includes the PWA `<head>` tags (manifest, theme-color, icons) and registers `sw.js` after `initCloud()`.
2. **Claude artifact** (claude.ai) — same code *without* the PWA head tags and SW registration. Inside Claude, `window.claude` exists and enables `db` (per-user cloud store), `user` and `sample` (AI coach).

The code branches on `window.claude`:
- present → Claude storage (`claude.use('db')`, docs under `data/users/<uid>/`), AI coach enabled, YouTube embeds **blocked** (links open externally).
- absent (website) → local profiles (or Supabase if configured), AI coach hidden, YouTube embeds play in-app (`youtube-nocookie.com`).

## Code map (inside `index.html`, in order)
- **DATA**: `AREAS`, `EQ`, `EX` (base exercises) + `MORE` (added via `X(...)` helper), `CARDIO`, `DEF_PLAN`, `DEF`.
- **Muscles**: `MUS` (id → Hebrew), `MUSX` (id → English), `MU` (exercise → `[[primary],[secondary]]`), `CARDIO_MU`. Every exercise has `e.mu`.
- **Figure engine** (exercise animations): `PATS` (poses A/B per motion pattern), `solve()` forward kinematics, `phaseAt()` tempo (≈1s concentric, hold, ≈1.7s eccentric), `HL` muscle highlight per pattern, `ECCF` (eccentric-first patterns), `CYC` (cyclic), `TRAIL`. Rendered via `figSVG(pid)` + `registerFigs(root)`; one rAF loop animates visible figures.
- **Anatomy / muscle map**: `ANAT` (original SVG paths, left half, mirrored with `MIR`), `bodySVG(side, colorOf, small, opts)`, `bodyMap()`, `miniBody()`. Interactive map: `muscleLoad(period)` → per-muscle `{pri, sec, vol, reps, last, ex}`, `mmLevel()` with thresholds `MM_T`, `muscleMapCard()` / `renderMM()`. Primary set = 1, secondary = 0.5.
- **State & storage**: `S = {settings, sessions, active}`; `LS` = current localStorage key; `saveLocal()`, `dbPut(id, data)` (routes to Claude db or Supabase), `saveSettings()`, `saveActive()` (debounced), `saveSession()`.
- **Logic**: `genDraft()` (builds workout, least-recently-used first, weighted exercises preferred), `recommend()` (double progression: all sets at top of range → +increment; twice below range → −10%), `makeItem()`, `techFor()` (drop set / tempo / etc.), `recovery()` (72h decay model).
- **Views**: `vToday`, `vWorkout`, `vLibrary`, `vStats`, `vPrefs`; hash routes `#today #workout #library #stats #prefs` (never `#settings`).
- **Sheets**: `openSheet(html, 'full')`, `exInfo`, `pickEx`, `cardioSheet`, `exForm` (custom exercises), `openVideo`, questionnaire `openQ/renderQ/buildPlan`.
- **AI coach** (Claude only): `aiBuild()` (JSON workout via `sample.json`), `chatSheet()/aiAsk()`.
- **Profiles** (website): `initProfiles`, `switchProfile`, `pickProfile`, `profileForm`, PIN = SHA-256 of `id:pin` (deterrent, not encryption).
- **Accounts** (website, optional): `SUPA = {url, key}` — empty means disabled. `initSupa`, `sbPut`, `sbLoad`, `openAuth`.
- **Events**: one delegated `click` handler switching on `data-act`, plus `input` / `change` / `submit` handlers keyed by `data-f` or form id.

## Data model
- Session (strength): `{id, type:'strength', date:'YYYY-MM-DD', start, end, areas[], goal, items:[{ex, range:[lo,hi], rest, rec, tech?, sets:[{tw, tr, w, r, done}]}], note}`
- Session (cardio): `{id, type:'cardio', kind:'run'|'tread'|'spin', date, start, durMin, distKm, avgHr, maxHr, kcal, rpe, plan, note, source:'manual'|'garmin'}`
- Settings: `{maxHr, dbInc, mtInc, goal, dur, sound, videos{exId:url}, plan[7], favs[], custom[], q, level}`
- Store docs (Claude db / Supabase `gym_docs`): `settings`, `active` (`{w: activeSession}`), `s-<sessionId>`.
- localStorage: `gym.profiles`, `gym.cur`, `gym.askeach`, `gym.guest`, per-profile data key (`gymlog.v1` for the first profile, `gymlog.p.<id>` for others).

## Common tasks
- **Add an exercise**: append `X(id, he, en, area, 'c'|'i', eq[], pattern, 'w'|'bw'|'time', mus, cues[3], err[2], [[primary],[secondary]])` to `MORE`. Use an existing `PATS` key or add a pattern (poses A/B, props, hold) plus `HL` / `ECCF` / `CYC` / `TRAIL` entries.
- **Add a demo video**: put the YouTube id in `VID[exerciseId]` (first search result for "`<en>` proper form"). Users can override per exercise via the custom video URL.
- **Change design**: tokens live in `:root` (black-neon theme). Questionnaire uses its own slate/teal `.q*` styles.
- **Enable web accounts**: run `supabase-setup.sql` in the Supabase SQL editor, disable "Confirm email" (free tier only emails team members), set `SUPA.url` / `SUPA.key` (anon public key).

## Testing
Headless Chrome + Playwright (Python), viewport 412×915 mobile:
- Syntax: extract the `<script>` body and run `node --check`.
- Exercise flows: build workout → start → mark sets → finish; muscle map (tap muscle, change period, select group); questionnaire; profiles (create, PIN, switch); cardio form fits at 360px.
- Assert `pageerror` list is empty. Screenshot once, fix, then publish.

## Release checklist
1. Edit `index.html`; keep the PWA head tags and SW registration.
2. Bump `CACHE` in `sw.js`.
3. Run tests above.
4. Commit and push to `main` → GitHub Pages updates in ~1–2 minutes. Installed apps refresh on next launch.
5. If the Claude artifact should match, publish the same file without the PWA head tags / SW registration.
