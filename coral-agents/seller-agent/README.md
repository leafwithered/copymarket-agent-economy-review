# seller-agent

The CopyMarket fulfillment agent competes in the CoralOS market and sells a structured landing-page
copy rescue. It only routes the `copyrescue` service, so the market story stays focused: a buyer pays
for a useful B2B growth artifact, escrow verifies settlement, and the seller delivers after funds lock.

```text
WANT service=copyrescue arg="crypto wallet landing page needs a clearer hero and trust path"
  -> BID price=<floor-or-LLM-price>
  -> AWARD to=<me>
  -> ESCROW_REQUIRED settlement=arbiter reference=<bound order>
  -> verify funded escrow using vault PDA
  -> DELIVERED {hero, CTA, sections, conversionNotes, riskControls}
```

The seller only delivers after `isFunded` confirms the escrow names its payout wallet and holds at
least the quoted price. In arbiter mode it checks the escrow buyer as the vault PDA from `DEPOSITED`,
not the human buyer wallet.

## Files

| File | Role |
|---|---|
| `src/index.ts` | Market loop and arbiter-aware funding verification |
| `src/bidder.ts` | LLM bid proposal with code-enforced floor/budget |
| `src/escrow.ts` | Read-only escrow funding check |
| `src/service.ts` | Copy rescue delivery: hero, CTA, sections, notes, risk controls |

`src/payment.ts` and `src/replay.ts` remain for the older direct-pay helpers and tests, but they are
not part of the CopyMarket CoralOS seller loop.

## Env

`SELLER_WALLET`, `AGENT_NAME`, `SERVICES=copyrescue`, `FLOOR_SOL`, `PERSONA`,
`SETTLEMENT_MODE=arbiter`, `ESCROW_DEADLINE_SECS`, and `SOLANA_RPC_URL`.

Use `ANTHROPIC_API_KEY`, or `LLM_PROVIDER=openai` plus `OPENAI_API_KEY`, for live copy generation.
Without a live key, `service.ts` returns a deterministic rescue that is still useful and labels it as
fallback.

## Test

```sh
npm install
npm run typecheck
npm test
```
