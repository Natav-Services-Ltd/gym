# חדר הכושר שלי

Personal workout app (PWA), Next.js + TypeScript with a Postgres backend.

- `app/` – Next.js App Router: page shell (`layout.tsx`, `page.tsx`, `body.html`, `globals.css`) and API routes under `app/api`.
- `public/app.js` – the client UI (vanilla JS, ported unchanged from the old single-file app).
- `lib/` – database pool + schema (`db.ts`), password/session auth (`auth.ts`).

API: `POST /api/auth/{signup,login,logout}`, `GET /api/auth/me`, `GET|POST /api/docs`, `PUT|DELETE /api/docs/:id`.
Tables are created automatically on first request.

## Run locally

```sh
cp .env.example .env.local   # point DATABASE_URL at a Postgres
npm install
npm run dev
```

## Deploy (Railway)

Create a project with a Postgres service and a service from this repo, and set the app's
`DATABASE_URL` to `${{Postgres.DATABASE_URL}}`. Railway builds with `npm run build` and runs `npm start`.
