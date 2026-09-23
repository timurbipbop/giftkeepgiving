# Kado Abadi — working rules

Read `docs/SPEC.md` before changing anything. These rules are the parts of the spec that are easy to break by accident.

## Product invariants
- Every gift is perpetual. There is no one-time mode, no spend-down, no "habiskan". Principal is never disbursed.
- All projection math goes through `calc.js`. Never inline yield or unit-cost numbers anywhere else. If a number in the UI cannot be traced to `calc.js`, it is a bug.
- Every disbursement (`PoolEvent` of type `DISBURSE`) carries an `intentLine`. Refuse to record one without it.
- Attribution is pro-rata across every gift alive on the disbursement date with the matching cause. Never assign a disbursement to a single gift by hand.
- The recipient is the hero of the living page. Their name is the `h1`; the balance is never the headline.

## Copy
- Verb is "menanam" / "plant". Never "donasi", "donate", "donation", "spend", "payout", "receipt", "balance".
- Every future number is labelled "proyeksi". Actual stamps replace projections; they never sit as equals.
- The first WhatsApp message contains no ask and comes from Kitabisa's official number.
- Describe the certificate as "dirancang untuk [nama]", never "AI-generated".

## Data and safety
- Recipient photos: template compositing only until a consent flow exists. Giver attests permission at upload.
- No generative image models on photos of minors.
- Unit costs in `calc.js` are placeholders until a partner quote replaces them; when you change one, change the comment beside it to name the source.

## Campaign pages
- A campaign (`KP-…`) is owned by the recipient (couple, parents). Gifts attach via `campaignId`; the campaign never holds money itself, only the sum of its gifts' units.
- The campaign's cause and region are locked for every gift planted into it. Givers choose only amount and message.
- Collective numbers on a campaign page are computed from its gifts, never stored.

## Future fund
- Only newborn and birthday campaigns can enable it (`campaign.trust`). Each gift stores `trustPct`; `causePart(g)` and `trustPart(g)` are the only way to split an amount. Never use `g.amount` directly for impact math.
- Public surfaces (campaign page, gift page stats, poster, featured cards) use `causePart` only. The trust portion appears only on `#/owner/:id` and, to the giver, as a private note on their own gift page.
- Growth shown for the fund is labelled an illustration at `TRUST_RATE`. Never call it a guarantee, return, or interest.

## Language
- Every user-facing string lives in the `L` dictionary in `index.html` (keys `id` and `en`). Never inline copy in templates.
- Never name a top-level function after a `window` property (`top`, `name`, `status`, `open`, `parent`, …). It silently kills everything declared after it in browsers. The jsdom render check catches this; run it before committing.

## Engineering
- v1 is static and hash-routed; keep it deployable to GitHub Pages until the Next.js migration lands.
- Run `node --test` before committing. The tests pin the spec's worked example (Rp 1jt → 2 / 24 / 40 / 240 trees at years 1 / 10 / 17 / 100).
- Indonesian first. Strings live next to the component that uses them for now; extract to a dictionary when the second language lands.
