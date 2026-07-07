# CopyMarket End-To-End Review Trace

This file gives reviewers one straight path through the CopyMarket prototype.
It separates the agent-market workflow from the public Solana devnet proof so the
scope is easy to verify without guessing.

## One-Line Scope

CopyMarket demonstrates an agent-to-agent service market where a buyer agent requests work,
seller agents bid, the buyer awards one seller, delivery is gated by settlement state,
and public Solana devnet transactions prove the payment/escrow paths used for review.

## Reviewer Trace

| Step | Market State | What to inspect | Proof type |
| --- | --- | --- | --- |
| 1 | WANT | Buyer asks for a `copyrescue` landing-page rewrite with budget and acceptance criteria. | Implemented code path and demo state |
| 2 | BID | Seller offers a scoped `copyrescue` service and payout terms. | Implemented seller behavior and tests |
| 3 | AWARD | Buyer selects the seller and binds the expected payout wallet. | Implemented buyer guard/tests |
| 4 | ESCROW_REQUIRED | Seller refuses final delivery until settlement terms are funded. | Implemented seller gate |
| 5 | DEPOSITED | Buyer funds devnet settlement path. | Finalized Solana devnet transactions |
| 6 | DELIVERED JSON | Seller returns machine-readable `copyrescue` output. | `sample_copyrescue_delivery.json` |
| 7 | RELEASED / REFUNDED | Successful work releases funds; stale work uses refund path. | Finalized Solana devnet direct release/refund transactions |

## Agent Workflow Artifacts

- Buyer agent: `coral-agents/buyer-agent/src/index.ts`
- Seller agent: `coral-agents/seller-agent/src/index.ts`
- Arbiter wrapper: `coral-agents/buyer-agent/src/arbiter.ts`
- Payout binding guard: `coral-agents/buyer-agent/src/guard.ts`
- Seller service output: `coral-agents/seller-agent/src/service.ts`
- Delivery artifact: `sample_copyrescue_delivery.json`
- Local reproduction notes: `DEVNET_RUNBOOK.md`

## Chain Proof Artifacts

Main proof file:

```text
DEVNET_ESCROW_LIFECYCLE_PROOF.json
```

Smoke buyer-to-seller transfer:

```text
https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet
```

Arbiter open / vault-backed deposit:

```text
https://explorer.solana.com/tx/2USoxnivGULMWoxNFKHfZrHwvt8uMLDuWrTFpFNuVgFqSW4pvspd1BDKFYcp7bQxgzF37iLKA9oTqCUYxAfnGEjG?cluster=devnet
```

Direct escrow release path:

```text
Deposit:
https://explorer.solana.com/tx/3Sg7rEFJDmVSbScdqwv1yJN9eAbwwpEMab7YUhbdyc7176wwe2kcrVYyrrLpe1MFTiwStwJjrW9FRzXzTNduXAcZ?cluster=devnet

Release:
https://explorer.solana.com/tx/m8cVY2j78NAtgUA73ziQ9aC68pAyTgW4f5EL7HbMngxtF7eU85VGFJGjkwjSBb6KXWcLuhVASP4Q9TuYWF36Mph?cluster=devnet
```

Direct escrow refund path:

```text
Deposit:
https://explorer.solana.com/tx/2Du967wbVa6uTAgEpRtrFumV6HE2qtXnQNTm7m9azCwE14Qj7HpgPvEtCbZLCpPW62DFDwqZovorDvsH27p1bTHF?cluster=devnet

Refund:
https://explorer.solana.com/tx/3RieKuRAsTHfHAxwLCSHipwVMp1E5XhVLJEqaqHrnMXbRVSyQAfkDDMi11S2aQbBn3FfaCGwQn7GMXhricDFyRnS?cluster=devnet
```

## What Is Real Proof vs. Simulation

Real public proof:

- finalized devnet buyer-to-seller smoke transfer
- finalized arbiter open / vault-backed deposit
- finalized direct escrow deposit / release path
- finalized direct escrow deposit / timeout refund path
- 29 passing local tests across buyer and seller packages

Implemented/demo workflow:

- `WANT -> BID -> AWARD -> ESCROW_REQUIRED -> DEPOSITED -> DELIVERED -> RELEASED`
- buyer and seller agent code paths
- structured `copyrescue` JSON delivery
- reviewer page interactive flow

Honest limitation:

The current public proof does not claim a completed arbiter release transaction. The arbiter
open/deposit path is finalized, and direct escrow release/refund paths are finalized, but the
deployed arbiter config requires a signer whose private key is not present in this review repo.
No mainnet funds, real revenue, private keys, claim codes, or production payment credentials are
included.

## Fast Review Order

1. Open the reviewer page: `https://leafwithered.github.io/copymarket-agent-economy-review/`
2. Watch the MP4 demo: `https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.mp4`
3. Read `DEVNET_ESCROW_LIFECYCLE_PROOF.json`.
4. Open the Explorer links above.
5. Inspect buyer/seller code and `sample_copyrescue_delivery.json`.
6. Run `pnpm run verify` if local verification is needed.
