# Waitlist backend (Supabase) — setup

Free. Stores every signup, locks a seat (queue position), and lets you **see who signed up + the count** in Supabase's Table Editor. Works on Vercel.

## 1. Create the project (2 min)
1. Go to https://supabase.com → New project (free tier). Pick a region near Pakistan (e.g. Singapore).
2. Wait for it to provision.

## 2. Create the table
Open **SQL Editor** → run:

```sql
create table if not exists waitlist (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  name        text not null,
  age         text,
  email       text unique not null,   -- one seat per email (dedupe)
  ref         text
);

-- lock it down: only the server (service-role key) can read/write
alter table waitlist enable row level security;
```

## 3. Get your keys
**Settings → API**:
- `Project URL`  → `NEXT_PUBLIC_SUPABASE_URL`
- `service_role` secret (under Project API keys) → `SUPABASE_SERVICE_ROLE_KEY`

## 4. Local
```bash
cp .env.local.example .env.local   # then paste the two values
npm run dev
```

## 5. Vercel (production)
Project → **Settings → Environment Variables** → add both:
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

Redeploy.

## How to see signups + count
- **Supabase → Table Editor → `waitlist`** = every person (name, age, email, time). Row count = total signups.
- Or hit `GET /api/waitlist` → `{ configured, count, displayed }`.
- The site's "You'll be around #N" pulls this live count automatically.

## Notes
- Until the keys are set, the form still works but **does not store** anyone (`stored:false` in the response) — it just shows a placeholder position. Add the keys to go live.
- Duplicate email → returns the person's existing seat instead of a new one.
- `service_role` key bypasses row-level security and must stay server-side only (it already is — used only in `/api/waitlist`). Never expose it to the browser.
