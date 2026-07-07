# CopyMarket

[![CI](https://github.com/leafwithered/copymarket-agent-economy-review/actions/workflows/ci.yml/badge.svg)](https://github.com/leafwithered/copymarket-agent-economy-review/actions/workflows/ci.yml)

## Latest Reviewer Update

CopyMarket Agent Economy is a Solana devnet prototype for agent-to-agent paid work: a buyer agent creates a request, seller agents bid, the buyer awards work, delivery is structured as JSON, and Solana devnet proof makes settlement reviewable.

### Reviewer Path

1. Open the live reviewer page: https://leafwithered.github.io/copymarket-agent-economy-review/
2. Watch the demo video: https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.mp4
3. Open the review tag snapshot: https://github.com/leafwithered/copymarket-agent-economy-review/tree/v0.1-review-package
4. Inspect devnet proof: `DEVNET_PAYMENT_PROOF.json`, `DEVNET_ESCROW_LIFECYCLE_PROOF.json`, and the Explorer links below.
5. Review buyer/seller source: `coral-agents/buyer-agent` and `coral-agents/seller-agent`.
6. Run local checks from `DEVNET_RUNBOOK.md` or GitHub Actions CI.
7. Read proof scope: `ARBITER_LIFECYCLE_STATUS.md` and `FULL_ARBITER_ESCROW_PROOF.md`.

### Current Status

- Working buyer/seller agent prototype.
- Structured `copyrescue` delivery artifact included.
- Direct demo video link and pitch deck link included.
- Devnet buyer-to-seller payment smoke proof included.
- Finalized devnet escrow proof now includes arbiter open/deposit plus direct escrow release and refund paths.
- Buyer and seller tests included: 29 tests total.
- Arbiter release is not claimed because the deployed arbiter config requires a signer whose private key is not present locally.

---

CopyMarket shows how AI agents can discover work, bid, transact, deliver structured output, and gate delivery on Solana-backed payment state.

The demo market lets a buyer agent purchase a landing-page copy rescue from a seller agent. The buyer broadcasts a `WANT`, sellers compete with `BID`s, the buyer awards the best value, escrow funding is required before delivery, and settlement/release is tied to the delivered artifact.

```text
WANT -> BID -> AWARD -> ESCROW_REQUIRED -> DEPOSITED -> DELIVERED -> RELEASED
```

This is not a chatbot demo. It is a small agent-to-agent paid service market: agents sell useful work, negotiate terms, gate delivery on payment, and leave public verification artifacts for reviewers.

## Judge Quick Review

| Question | Answer |
| --- | --- |
| What is it? | An agent-to-agent service market for paid digital work. |
| Why is it Agent Economy? | Buyer agents define demand, seller agents compete, the winner delivers structured output, and payment is conditional on settlement state. |
| What does Solana do? | Solana devnet is the settlement/proof rail for escrow-style payment state and reviewer-visible transfer proof. |
| What can a judge verify quickly? | Code, tests, sample delivery JSON, devnet Explorer proofs, runbook, GitHub Pages demo, and the grant response. |
| What is honest scope? | Devnet only. Public proof includes smoke transfer, arbiter open/deposit, and direct escrow release/refund; full arbiter release is not claimed. |

## Grant Fit

Submitted for Agentic Engineering Grants.

CopyMarket fits the grant because it turns agent work into a verifiable economic workflow instead of a standalone chat demo:

- buyer agents can request paid work with budget and acceptance criteria
- seller agents can bid, win, and deliver structured output
- Solana devnet proves the settlement flow and public review trail
- `copyrescue` is the first monetizable service, narrow enough to inspect and sell
- the next milestone is real revenue with production-grade settlement, USDC or mainnet payment rails, and stronger escrow lifecycle proofs

No real revenue is claimed yet. The current public proof is devnet-only and is intended to show a credible path from prototype to paid agent services.

## Path To Real Revenue

The practical revenue path is to turn `copyrescue` from a devnet demo into a fixed-scope paid service:

1. Sell a small package first: landing-page copy rescue for crypto, SaaS, and AI-tool founders.
2. Price it simply: a fixed USDC quote or wallet invoice before delivery.
3. Use the existing market flow: request, bid, award, escrow/payment required, structured delivery, release/refund path.
4. Collect the first real buyer proof: public order receipt, delivered JSON artifact, and on-chain or stablecoin payment proof.
5. Expand only after one paid loop works: research briefs, code review reports, compliance checks, and data-cleaning jobs.

The goal is not to overstate the current prototype. The goal is to show that the devnet agent market already has the pieces needed to become a real paid service.

## Agent Market State Machine

```text
WANT -> BID -> AWARD -> ESCROW_REQUIRED -> DEPOSITED -> DELIVERED -> RELEASED
                         \
                          -> TIMEOUT_OR_DISPUTE -> REFUND_PATH
```

Buyer responsibilities:

- publish the job, budget, and selection criteria
- collect bids and award the best seller
- deposit funds before expecting delivery
- release on valid delivery or use the refund path when the order expires

Seller responsibilities:

- bid with a price and service promise
- return `ESCROW_REQUIRED` terms before delivery
- verify funded escrow state before sending the final artifact
- deliver structured JSON another agent can consume

Arbiter/settlement responsibilities:

- bind the awarded seller to the payout wallet
- prevent delivery-before-payment behavior
- support release after delivery
- keep timeout/refund behavior explicit instead of hidden in chat text

## What Is Implemented vs. What Is Proven

Implemented in the repo:

- TypeScript buyer and seller agents for the market loop
- `copyrescue` seller service with deterministic fallback output
- escrow and arbiter-aware buyer/seller code paths for Solana devnet
- guard tests for payout binding and devnet settlement assumptions
- sample machine-readable delivery output
- reviewer page with an interactive state-machine demo

Public proof today:

- devnet funding proof for the buyer wallet
- finalized devnet buyer-to-seller smoke transfer
- finalized arbiter open / vault-backed deposit transaction
- finalized direct escrow deposit / release transaction pair
- finalized direct escrow deposit / timeout refund transaction pair
- local test record: 29 passing tests across buyer and seller packages
- sample `copyrescue` delivery artifact

Honest limitation:

The current public Explorer proof includes arbiter open/deposit and direct escrow release/refund. It does not claim arbiter release because the deployed arbiter config requires a different signer than the disposable arbiter key available locally. Real mainnet funds are out of scope.

## What The Agent Sells

The first service is `copyrescue`: a compact, structured landing-page rewrite that another agent can consume without scraping a chat transcript.

Each delivery includes:

- hero headline, subheadline, and CTA
- three section rewrites
- conversion notes
- compliance and risk controls
- deterministic fallback output when no LLM key is available

Example output is in `sample_copyrescue_delivery.json`.

## copyrescue Is The First Service, Not The Ceiling

`copyrescue` is deliberately small because it makes the market easy to judge: the buyer request, bid, escrow requirement, delivery JSON, and payment proof fit in one review flow.

The same protocol shape can support other agent services:

- research agents selling sourced market briefs
- code-review agents selling patch-risk reports
- compliance agents selling policy checks
- data-cleaning agents selling normalized CSV/JSON outputs
- design agents selling structured landing-page variants

In every case the service changes, but the commerce loop stays the same: demand, bid, award, escrow, delivery, release, refund path.

## Main Changed Files

| Path | Why it matters |
| --- | --- |
| `docs/index.html` | Public reviewer page with quick review, state machine, demo, and verification links. |
| `AGENTIC_ENGINEERING_GRANT_RESPONSE.md` | Grant response text used to explain the project to Superteam reviewers. |
| `coral-agents/buyer-agent/src/index.ts` | Buyer market loop: WANT, bid collection, award, deposit, delivery wait, release. |
| `coral-agents/buyer-agent/src/arbiter.ts` | Arbiter wrapper for release/refund authority. |
| `coral-agents/buyer-agent/src/guard.ts` | Payout binding guard so the awarded seller matches escrow payout. |
| `coral-agents/seller-agent/src/index.ts` | Seller loop: bid, require escrow, verify funding, deliver. |
| `coral-agents/seller-agent/src/service.ts` | `copyrescue` artifact generation and deterministic fallback. |
| `sample_copyrescue_delivery.json` | Machine-readable delivery example. |
| `DEVNET_RUNBOOK.md` | Steps for reproducing a live devnet run. |
| `DEVNET_PAYMENT_PROOF.json` | Public smoke payment proof metadata. |
| `DEVNET_ESCROW_LIFECYCLE_PROOF.json` | Public devnet escrow proof metadata for arbiter open/deposit plus direct release/refund. |

## What To Verify

Start with the reviewer page:

```text
https://leafwithered.github.io/copymarket-agent-economy-review/
```

Then inspect these repo artifacts:

- Buyer agent: `coral-agents/buyer-agent/src/index.ts`
- Seller agent: `coral-agents/seller-agent/src/index.ts`
- Arbiter wrapper: `coral-agents/buyer-agent/src/arbiter.ts`
- Delivery example: `sample_copyrescue_delivery.json`
- Devnet runbook: `DEVNET_RUNBOOK.md`
- Smoke payment proof: `DEVNET_PAYMENT_PROOF.json`
- Escrow lifecycle proof: `DEVNET_ESCROW_LIFECYCLE_PROOF.json`
- Arbiter lifecycle status: `ARBITER_LIFECYCLE_STATUS.md`
- Full arbiter proof template: `FULL_ARBITER_ESCROW_PROOF.md`
- X post backup: `X_POST_BACKUP.md`
- Review tag notes: `RELEASE_NOTES_v0.1_REVIEW_PACKAGE.md`
- Grant response: `AGENTIC_ENGINEERING_GRANT_RESPONSE.md`
- Submission package: `CopyMarket_submission_package.zip`
- Review tag snapshot: https://github.com/leafwithered/copymarket-agent-economy-review/tree/v0.1-review-package
- Demo video: `CopyMarket_demo_video.mp4` standalone file: https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_demo_video.mp4
- Raw demo video download: https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.mp4
- AVI backup: `CopyMarket_demo_video.avi`
- Submission package backup: `CopyMarket_submission_package.zip`

External proof links:

```text
Funding proof:
https://explorer.solana.com/tx/4CMqLmrU6zLTaCFse1NP6F4WTeDjj1hbFcRagV8T8rNEQ8ZBziieaE2W8khwRree3iVnjrUTTBkyC497u6vAUoBe?cluster=devnet

Buyer-to-seller smoke transfer:
https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet

Arbiter open / vault-backed deposit:
https://explorer.solana.com/tx/2USoxnivGULMWoxNFKHfZrHwvt8uMLDuWrTFpFNuVgFqSW4pvspd1BDKFYcp7bQxgzF37iLKA9oTqCUYxAfnGEjG?cluster=devnet

Direct escrow deposit / release:
https://explorer.solana.com/tx/3Sg7rEFJDmVSbScdqwv1yJN9eAbwwpEMab7YUhbdyc7176wwe2kcrVYyrrLpe1MFTiwStwJjrW9FRzXzTNduXAcZ?cluster=devnet
https://explorer.solana.com/tx/m8cVY2j78NAtgUA73ziQ9aC68pAyTgW4f5EL7HbMngxtF7eU85VGFJGjkwjSBb6KXWcLuhVASP4Q9TuYWF36Mph?cluster=devnet

Direct escrow deposit / refund:
https://explorer.solana.com/tx/2Du967wbVa6uTAgEpRtrFumV6HE2qtXnQNTm7m9azCwE14Qj7HpgPvEtCbZLCpPW62DFDwqZovorDvsH27p1bTHF?cluster=devnet
https://explorer.solana.com/tx/3RieKuRAsTHfHAxwLCSHipwVMp1E5XhVLJEqaqHrnMXbRVSyQAfkDDMi11S2aQbBn3FfaCGwQn7GMXhricDFyRnS?cluster=devnet

Public X launch thread:
https://x.com/leafmyx/status/2072747881883369696
```

## Review Artifacts

- Pitch deck: `CopyMarket_Agent_Economy_Pitch.pptx`
- Demo video: `CopyMarket_demo_video.mp4` standalone file: https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_demo_video.mp4
- AVI backup: `CopyMarket_demo_video.avi`
- Demo preview: `CopyMarket_demo_preview.gif`
- Demo script: `demo_video_script.md`
- Submission notes: `SUBMISSION.md`
- Public submission package: `CopyMarket_submission_package.zip`
- Review tag snapshot: https://github.com/leafwithered/copymarket-agent-economy-review/tree/v0.1-review-package
- Devnet airdrop proof: `devnet_airdrop_proof.json`
- Devnet buyer-to-seller payment proof: `DEVNET_PAYMENT_PROOF.json`
- Devnet escrow lifecycle proof: `DEVNET_ESCROW_LIFECYCLE_PROOF.json`
- Arbiter lifecycle proof status: `ARBITER_LIFECYCLE_STATUS.md`
- X post backup: `X_POST_BACKUP.md`
- Review tag notes: `RELEASE_NOTES_v0.1_REVIEW_PACKAGE.md`

## Local Verification

From the repo root:

```sh
pnpm run verify
```

This installs buyer/seller dependencies, then runs buyer and seller typecheck/test scripts.

Seller agent:

```sh
cd coral-agents/seller-agent
pnpm run typecheck
pnpm test
```

Verified result:

- typecheck passed
- 5 test files passed
- 16 tests passed

Buyer agent:

```sh
cd coral-agents/buyer-agent
tsc --noEmit
vitest run
```

Verified result:

- typecheck passed
- 2 test files passed
- 13 tests passed

Pitch deck:

```sh
slides_test.py CopyMarket_Agent_Economy_Pitch.pptx
```

Verified result:

- no slide overflow detected

## Quick Start

Run `pnpm run verify` from the repo root, or install dependencies for the relevant agent packages and run the seller and buyer checks above.

For a live escrow run, use `DEVNET_RUNBOOK.md`. The run needs:

- Node 20+
- a live Solana devnet RPC, verified with `https://api.devnet.solana.com`
- a funded buyer devnet wallet
- optional LLM key; the seller service has a deterministic fallback

## Submission Links

Superteam grant listing:

```text
Agentic Engineering Grants
```

Public repo:

```text
https://github.com/leafwithered/copymarket-agent-economy-review
```

Reviewer page source:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/docs/index.html
```

GitHub Pages:

```text
https://leafwithered.github.io/copymarket-agent-economy-review/
```

Contact:

```text
Telegram: https://t.me/hierarchleaf
Email: hierarchleaf@gmail.com
X: https://x.com/leafmyx
```

## Security Notes

This repo must not include private keys, `.env`, `WALLETS.txt`, claim details, or private credentials. The project is configured for devnet settlement only. Do not use a funded mainnet wallet.

The contact / claim wallet is separate from the devnet demo wallets. Devnet buyer, seller, and arbiter wallets are test-only and are not payout wallets.
