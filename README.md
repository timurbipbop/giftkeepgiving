# Kado Abadi

The gift that keeps on giving. Send love as a perpetual fund: pick a person, a cause and an amount; we mint a stamped certificate with a QR code, deliver it via WhatsApp, and the gift keeps producing impact in their name, every year, forever.

Personal project by Alfa, built on Kitabisa's licensed nazhir and distribution. Read `docs/SPEC.md` first.

## What's here

| File | What |
| --- | --- |
| `index.html` | The whole prototype, bilingual (ID/EN): landing, gift flow with live calculator, living gift page, poster, and campaign pages (`#/start`, `#/c/:id`) that many people plant into. Static, hash-routed, no build step. |
| `calc.js` | Impact calculator and config constants (net yield, unit costs, causes, occasions). Pure functions. The one file the API must reuse. |
| `calc.test.js` | Tests that pin the spec's worked example. `node --test` |
| `docs/SPEC.md` | Product spec snapshot |
| `CLAUDE.md` | Working rules for anyone (human or Claude Code) touching this repo |

## Run locally

Open `index.html` in a browser, or `npx serve .` and visit the printed URL. Nothing to install.

## Deploy (GitHub Pages)

1. Push to `main`.
2. Repo → Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`.
3. Settings → Pages → Custom domain: `giftkeepgiving.com` → Save. The `CNAME` file in this repo already says the same.
4. GoDaddy → giftkeepgiving.com → DNS → Records. Delete the default `A @ → Parked` record. Add four `A` records, Name `@`, values `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`. Edit the `CNAME www` record to point to `timurbipbop.github.io`. Leave TTL default.
5. Back on GitHub Pages, wait for "DNS check successful" (usually under an hour), then tick "Enforce HTTPS".

## Routes

| Route | What |
| --- | --- |
| `#/` | Landing: two paths (send a gift / start a page), occasions, featured pages |
| `#/create` | Gift flow; `#/create?c=<pageId>` plants into an existing page with cause locked |
| `#/start` | A couple or new parents start their own page |
| `#/c/:id` | Campaign page: photo hero, story, collective stats, givers, plant-alongside CTA |
| `#/gift/:id` | One gift's living page and timeline |
| `#/poster/:id` | 1080x1350 certificate with QR |

Demo photos are Unsplash-licensed (credited on page). User-uploaded photos stay in the browser only.

## What is stubbed in v1

Payment (simulated), poster (template compositing, not generative), disbursement stamps (seeded on the demo gift), WhatsApp (message shown, not sent), persistence (browser localStorage only).

## Roadmap for the team

1. Move to Next.js on Vercel. Keep `calc.js` as the single source of the projection logic; import it on both client and server.
2. `POST /gifts` → payment intent (Kitabisa payment rail) → mint units → return gift id.
3. `GET /gifts/:id` living page with real Attribution rows; `GET /poster/:id` as a server-rendered 1080×1350 image (Vercel OG or satori).
4. WhatsApp Business API send from Kitabisa's official number: first message zero ask, opt-out included.
5. Admin: record `PoolEvent{type: DISBURSE}` with partner, location, proofs and a mandatory `intentLine`; write pro-rata `Attribution` for every gift alive with the matching cause.
6. Anniversary job: yearly WhatsApp summary per gift on the occasion date.
7. Partner pages with on-time rate and full delivery history.
