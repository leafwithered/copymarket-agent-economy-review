# Agentic Engineering Grant Response

## Project

CopyMarket Agent Economy

## One-Line Summary

CopyMarket is a Solana devnet marketplace where AI agents sell copyrescue work, gate delivery on payment state, and publish proof.

## What I Am Building

CopyMarket turns a small, concrete B2B service into a paid agent market. A buyer agent requests a `copyrescue` package, seller agents bid, the buyer awards the job, payment state is checked through Solana devnet code paths, and delivery is only considered complete when the work package and payment proof are reviewable.

The first service is intentionally narrow: landing-page copy rescue for founders and small teams. Each package includes a hero rewrite, section rewrites, conversion notes, compliance notes, and a deterministic fallback delivery path when no LLM key is available.

## Why It Fits The Grant

The grant asks builders to use AI coding tools to ship meaningful Solana products. CopyMarket already has the important proof pieces:

- a public repo and reviewer page
- a buyer-to-seller devnet payment proof
- arbiter open/deposit proof on devnet
- direct escrow release and timeout refund proofs on devnet
- an agent market flow with `WANT -> BID -> AWARD -> ESCROW_REQUIRED -> DEPOSITED -> DELIVERED -> RELEASED`
- an end-to-end reviewer trace that maps the market states to code, delivery JSON, and Explorer proof
- a reproducible runbook for devnet proof
- a demo package, pitch deck, preview GIF, and sample delivery artifact

The next grant-funded step is to turn this from a strong proof-of-work demo into a cleaner working product.

## Path To Real Revenue

The current project does not claim real revenue yet. The revenue path is to productize `copyrescue` as a fixed-scope paid service, quote a simple USDC or wallet payment before delivery, publish a structured delivery artifact, and attach payment proof without exposing private keys. Once one paid loop works, the same market flow can support research briefs, code review reports, compliance checks, and data-cleaning jobs.

## How I Use AI Coding Tools

I use Codex and related AI coding workflows for:

- implementation planning and code changes
- frontend reviewer page iteration
- Solana devnet proof workflow planning
- copy, docs, and submission packaging
- QA passes on claims, links, and public review artifacts
- rapid issue triage after reviewer feedback

The AI tool is not only used for writing text. It is part of the build loop: inspect, modify, verify, document, and package.

## Proof Of Work

Reviewer site:

```text
https://leafwithered.github.io/copymarket-agent-economy-review/
```

GitHub repo:

```text
https://github.com/leafwithered/copymarket-agent-economy-review
```

Submission package:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_submission_package.zip
```

Direct demo video:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.mp4
```

X launch thread:

```text
https://x.com/leafmyx/status/2072747881883369696
```

Solana devnet buyer-to-seller proof:

```text
https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet
```

Solana devnet funding proof:

```text
https://explorer.solana.com/tx/4CMqLmrU6zLTaCFse1NP6F4WTeDjj1hbFcRagV8T8rNEQ8ZBziieaE2W8khwRree3iVnjrUTTBkyC497u6vAUoBe?cluster=devnet
```

Solana devnet arbiter open / deposit proof:

```text
https://explorer.solana.com/tx/2USoxnivGULMWoxNFKHfZrHwvt8uMLDuWrTFpFNuVgFqSW4pvspd1BDKFYcp7bQxgzF37iLKA9oTqCUYxAfnGEjG?cluster=devnet
```

Solana devnet direct escrow release proof:

```text
https://explorer.solana.com/tx/3Sg7rEFJDmVSbScdqwv1yJN9eAbwwpEMab7YUhbdyc7176wwe2kcrVYyrrLpe1MFTiwStwJjrW9FRzXzTNduXAcZ?cluster=devnet
https://explorer.solana.com/tx/m8cVY2j78NAtgUA73ziQ9aC68pAyTgW4f5EL7HbMngxtF7eU85VGFJGjkwjSBb6KXWcLuhVASP4Q9TuYWF36Mph?cluster=devnet
```

Solana devnet direct escrow refund proof:

```text
https://explorer.solana.com/tx/2Du967wbVa6uTAgEpRtrFumV6HE2qtXnQNTm7m9azCwE14Qj7HpgPvEtCbZLCpPW62DFDwqZovorDvsH27p1bTHF?cluster=devnet
https://explorer.solana.com/tx/3RieKuRAsTHfHAxwLCSHipwVMp1E5XhVLJEqaqHrnMXbRVSyQAfkDDMi11S2aQbBn3FfaCGwQn7GMXhricDFyRnS?cluster=devnet
```

Machine-readable devnet escrow proof:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/DEVNET_ESCROW_LIFECYCLE_PROOF.json
```

End-to-end review trace:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/END_TO_END_REVIEW_TRACE.md
```

Superteam profile:

```text
https://superteam.fun/earn/t/leafmyx
```

## Grant Plan

Target deadline: July 12, 2026.

### Milestone 1 - Product hardening

Improve the reviewer-facing product flow so a new visitor can understand the buyer, seller, payment, and delivery path without reading the whole repo.

Deliverables:

- cleaner wallet and payment state explanation
- stronger proof section on the reviewer page
- clearer buyer-to-seller transaction labeling
- issue list separating shipped proof from future protocol hardening

### Milestone 2 - Shippable Solana workflow

Turn the current proof into a tighter reproducible workflow that another builder or reviewer can run.

Deliverables:

- updated runbook for devnet settlement
- improved packaged demo artifacts
- concise product README for the agent market
- public final update with links to repo, reviewer page, and Explorer proof

## Current Limitations

The current public proof includes a live buyer-to-seller devnet transfer, arbiter open/deposit, direct escrow release, and direct escrow timeout refund. Arbiter release is not claimed because the deployed arbiter config requires a different signer than the local disposable arbiter key. Mainnet use and real revenue are out of scope for the current version.

## Contact

```text
X: https://x.com/leafmyx
Telegram: https://t.me/hierarchleaf
Email: hierarchleaf@gmail.com
Solana wallet: CwxV8FZwVKhVMqPqp8BV6zuoGDc12CA4qkz7jdmhnwWB
```

The contact / claim wallet is separate from the devnet demo wallets. Devnet buyer, seller, and arbiter wallets are test-only and are not payout wallets.
