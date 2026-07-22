# Aspire Community Services Day Program — Website

A Next.js 14 (App Router) site for Aspire Community Services Day Program (ACSDP), a
community-based day program in San Jose, CA.

## Pages

- `/` — Home
- `/program` — Mission, vision, Program Design Statement, director's note, outcomes
- `/services` — The six service areas + real community resources
- `/community` — "A Day in the Community" route strip + hours & staffing details
- `/contact` — Contact info + a working contact form (`/api/contact`)

## Run it locally

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

2. **Swap the director photo.**
   `app/program/page.js` currently shows a "JG" monogram placeholder in the
   `.director-photo` block. Drop a real photo into `/public`, then replace the
   `<span className="initials">` with an `<Image />` (from `next/image`).

3. **Double-check contact details** in `components/Footer.js` and
   `app/contact/page.js` (phone, email, address, hours) — they're pulled
   directly from the program design document, but worth a final proofread.

4. Update the `metadataBase` URL in `app/layout.js` once you know your final
   domain (Vercel gives you one automatically, e.g. `your-project.vercel.app`,
   or you can attach a custom domain in Project Settings → Domains).

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
