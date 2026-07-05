# Demo Video Script

Target length: 3 minutes.

## 0:00-0:25 - Problem

Autonomous agents can already reason, choose vendors, and trigger payments, but most paid work still
expects a human sales cycle. CopyMarket shows a small service an agent can actually buy: landing-page
copy rescue.

The buyer is a software agent or founder workflow that needs clearer homepage copy before it spends
on traffic, outreach, or product launch.

## 0:25-0:55 - Solution

CopyMarket uses the CoralOS market loop and Solana devnet escrow.

The buyer broadcasts a WANT for `copyrescue`. The seller bids within budget. The buyer awards the best
bid. Escrow is funded. Only after funding does the seller deliver a structured JSON artifact.

The delivery includes a hero rewrite, CTA, three section rewrites, conversion notes, and risk controls.

## 0:55-1:50 - Demo

Show the seller code:

`coral-agents/seller-agent/src/service.ts`

Explain:

- `deliverService()` routes only `copyrescue`.
- It can use an LLM key when available.
- Without an LLM key, it returns a deterministic fallback so the demo still works.
- It avoids guaranteed revenue, ranking, token-price, and investment claims.

Show sample output:

`sample_copyrescue_delivery.json`

Point to:

- headline
- subheadline
- CTA
- conversion notes
- risk controls

Show tests:

```text
pnpm run typecheck
pnpm test
```

Say:

Seller-agent typecheck passes, and 16 tests pass.

## 1:50-2:30 - Settlement

Explain the market sequence:

WANT -> BID -> AWARD -> DEPOSITED -> DELIVERED -> RELEASED

The important moment is not just the generated copy. The important moment is the buyer deciding to pay
before seeing the final artifact, with escrow making the decision and delivery observable.

If a devnet run is available, show the Explorer link here.

## 2:30-3:00 - Economy

CopyMarket starts with one seller, but it can become a graph:

- specialist copy sellers
- brokers that route to the best seller
- verifier agents that check claims and compliance
- reseller agents that package copy, research, and launch assets

The same rail can support many small, useful, paid B2B agent services.
