# Aspire Community Services Day Program — Website

A Next.js 14 site for Aspire Community Services Day Program (ACSDP), a
community-based day program in San Jose, CA.

# Pages

- `/` — Home
- `/program` — Mission, vision, Program Design Statement, director's note, outcomes
- `/services` — The six service areas + real community resources
- `/community` — "A Day in the Community" route strip + hours & staffing details
- `/team` — Staff profiles
- `/contact` — Contact info + a working contact form (`/api/contact`)
- `/admin` — Password-protected dashboard for editing contact info, the director
  profile, the homepage hero text, and the team list (see **Admin panel** below)

# Run it locally

Requires Node.js 18.18+ (Node 20 LTS recommended).

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Before you launch

1. **Wire up the contact form's email delivery.**
   Right now, `app/api/contact/route.js` validates submissions and logs them to
   the server console — it does not send email. Open that file and follow the
   comment block to add a provider such as [Resend](https://resend.com):

   ```bash
   npm install resend
   ```

   Then add your API key locally in `.env.local` (copy `.env.example`) and in
   Vercel under **Project Settings → Environment Variables**.

2. **Fill in real team member names, roles, and photos** on `/team`, and add
   the rest of the staff — either by editing `data/site-content.json` directly
   or through the `/admin` dashboard (see below).

3. **Double-check contact details** (phone, email, address, hours) via the
   `/admin` dashboard, or by editing `data/site-content.json` directly — they
   currently reflect the program design document, but worth a final proofread.

4. Update the `metadataBase` URL in `app/layout.js` once you know your final
   domain (Vercel gives you one automatically, e.g. `your-project.vercel.app`,
   or you can attach a custom domain in Project Settings → Domains).

## Admin panel

`/admin` is a lightweight, password-protected dashboard for editing contact
info, the director profile (name/title/quote/photo), the homepage hero text,
and the team roster (add/remove members, upload photos) — without touching
code.

**Setup:**

1. Copy `.env.example` to `.env.local` if you haven't already.
2. Generate a password hash:
   ```bash
   node scripts/hash-password.js "your-new-password"
   ```
3. Set in `.env.local`:
   ```
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD_HASH=<paste the hash here, escaping every $ as \$>
   SESSION_SECRET=<any long random string>
   ```
   ⚠️ **Escape every `$` in the hash as `\$`.** Next.js expands `$VAR`-style
   references in `.env` files, and bcrypt hashes are full of `$` characters —
   unescaped, the value gets silently corrupted and login will fail.
4. Restart the dev server, then sign in at `/admin/login`.
5. Once logged in, use the **Account** section at the bottom of `/admin` to
   change the username/password from the UI — no restart needed after that.

**How content is stored:** edits are written to `data/site-content.json` (and
uploaded photos to `/public/uploads`) on the server's local filesystem — there's
no database. This works well for local development or a self-hosted/VPS
deployment where the server process keeps running.

⚠️ **This will *not* persist on Vercel.** Vercel's serverless functions run on
a read-only, ephemeral filesystem — any edits made through `/admin` in
production will be lost on the next deploy or cold start. If you deploy there,
either treat `/admin` as dev-only (edit `data/site-content.json` locally and
redeploy), or swap the file-based storage in `lib/content.js` / `lib/auth.js`
for a real database (e.g. Vercel Postgres) and blob storage (e.g. Vercel Blob)
for uploads.

## Deploy to Vercel

**Option A — from the Vercel dashboard (no terminal needed):**
1. Push this project to a GitHub repo (see below).
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Framework preset auto-detects as Next.js — leave build settings as default.
4. Add any environment variables (e.g. `RESEND_API_KEY`) under the project's
   Environment Variables screen.
5. Click **Deploy**.

**Option B — from the command line:**
```bash
npm install -g vercel
vercel
```
Follow the prompts; running `vercel` again after changes will redeploy, or
`vercel --prod` to push straight to production.

### Getting this project onto GitHub first
```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin <your-empty-github-repo-url>
git push -u origin main
```

## Tech

- Next.js 14 (App Router)
- Tailwind CSS (design tokens only — most page styling lives in `app/globals.css`)
- `next/font/google` for Fraunces, Work Sans, and Space Mono
- No external UI libraries — everything is hand-built to match the brand
