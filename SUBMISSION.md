# CopyMarket Agent Economy - Submission Notes

Status: submitted to Superteam Agentic Engineering Grants and pending review.

## Listing

Superteam Earn:

```text
Agentic Engineering Grants
```

Submission status:

```text
Submitted privately through Superteam. Private Superteam account materials are kept outside the public repo.
```

Scope:

```text
Global grant application. Do not claim regional residency or eligibility that has not been verified.
```

## Public Links

GitHub repo:

```text
https://github.com/leafwithered/copymarket-agent-economy-review
```

One-page reviewer page:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/docs/index.html
```

GitHub Pages target, served from the `gh-pages` branch:

```text
https://leafwithered.github.io/copymarket-agent-economy-review/
```

Public X launch thread:

```text
https://x.com/leafmyx/status/2072747881883369696
```

X backup summary:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/X_POST_BACKUP.md
```

Reviewer contact:

```text
X: https://x.com/leafmyx
Telegram: https://t.me/hierarchleaf
Email: hierarchleaf@gmail.com
```

Submission package:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_submission_package.zip
```

Review tag:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/tree/v0.1-review-package
```

Direct demo video:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_demo_video.mp4
```

The package contains the pitch deck and demo video at the archive root:

- `CopyMarket_Agent_Economy_Pitch.pptx`
- `CopyMarket_demo_video.mp4`
- `CopyMarket_demo_video.avi`

## Project

CopyMarket is a Solana devnet agent service market with escrow-aware buyer/seller code paths.

A buyer agent purchases a landing-page copy rescue from a seller agent. The seller bids within the
buyer budget, waits for arbiter escrow funding, and only then delivers a structured JSON artifact:

- hero headline
- subheadline
- CTA
- three section rewrites
- conversion notes
- compliance and risk controls

The product is intentionally small and commercial: it is the kind of useful B2B artifact an agent,
founder tool, broker, or marketplace workflow could buy without a human sales cycle.

## Local Artifacts

- Pitch deck: `CopyMarket_Agent_Economy_Pitch.pptx`
- Demo video: `CopyMarket_demo_video.mp4` (https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_demo_video.mp4)
- AVI backup: `CopyMarket_demo_video.avi`
- Demo preview: `CopyMarket_demo_preview.gif`
- Sample delivery: `sample_copyrescue_delivery.json`
- Devnet runbook: `DEVNET_RUNBOOK.md`
- Devnet airdrop proof: `devnet_airdrop_proof.json`
- Devnet buyer-to-seller payment proof: `DEVNET_PAYMENT_PROOF.json`
- Devnet escrow lifecycle proof: `DEVNET_ESCROW_LIFECYCLE_PROOF.json`
- Arbiter lifecycle proof status: `ARBITER_LIFECYCLE_STATUS.md`
- Demo script: `demo_video_script.md`
- Upload checklist: `UPLOAD_AND_SUBMIT.md`
- Seller code: `coral-agents/seller-agent/src/service.ts`
- Buyer defaults: `coral-agents/buyer-agent/src/index.ts`

## Verification Completed

Seller agent:

```text
pnpm run typecheck
pnpm test
```

Result:

- Typecheck passed.
- 5 test files passed.
- 16 tests passed.

Buyer agent:

```text
tsc --noEmit
vitest run
```

Result:

- Typecheck passed.
- 2 test files passed.
- 13 tests passed.

Pitch deck:

```text
slides_test.py CopyMarket_Agent_Economy_Pitch.pptx
```

Result:

- Test passed.
- No overflow detected.

## Live Devnet Proof

The buyer wallet was funded on devnet. The public proof now includes a live buyer-to-seller smoke
payment, arbiter open/deposit, direct escrow release, and direct escrow timeout refund.

Funding proof:

```text
https://explorer.solana.com/tx/4CMqLmrU6zLTaCFse1NP6F4WTeDjj1hbFcRagV8T8rNEQ8ZBziieaE2W8khwRree3iVnjrUTTBkyC497u6vAUoBe?cluster=devnet
```

Buyer-to-seller payment proof:

```text
https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet
```

Arbiter open / vault-backed deposit:

```text
https://explorer.solana.com/tx/2USoxnivGULMWoxNFKHfZrHwvt8uMLDuWrTFpFNuVgFqSW4pvspd1BDKFYcp7bQxgzF37iLKA9oTqCUYxAfnGEjG?cluster=devnet
```

Direct escrow deposit / release:

```text
https://explorer.solana.com/tx/3Sg7rEFJDmVSbScdqwv1yJN9eAbwwpEMab7YUhbdyc7176wwe2kcrVYyrrLpe1MFTiwStwJjrW9FRzXzTNduXAcZ?cluster=devnet
https://explorer.solana.com/tx/m8cVY2j78NAtgUA73ziQ9aC68pAyTgW4f5EL7HbMngxtF7eU85VGFJGjkwjSBb6KXWcLuhVASP4Q9TuYWF36Mph?cluster=devnet
```

Direct escrow deposit / refund:

```text
https://explorer.solana.com/tx/2Du967wbVa6uTAgEpRtrFumV6HE2qtXnQNTm7m9azCwE14Qj7HpgPvEtCbZLCpPW62DFDwqZovorDvsH27p1bTHF?cluster=devnet
https://explorer.solana.com/tx/3RieKuRAsTHfHAxwLCSHipwVMp1E5XhVLJEqaqHrnMXbRVSyQAfkDDMi11S2aQbBn3FfaCGwQn7GMXhricDFyRnS?cluster=devnet
```

RPC used:

```text
https://api.devnet.solana.com
```

The payment proof transfers 0.001 devnet SOL from buyer to seller and is recorded in
`DEVNET_PAYMENT_PROOF.json`. The escrow lifecycle evidence is recorded in
`DEVNET_ESCROW_LIFECYCLE_PROOF.json`.

Honest limitation: arbiter release is not claimed because the deployed arbiter config requires a
different signer than the local disposable arbiter key. Current proof is devnet-only.

The contact / claim wallet is separate from the devnet demo wallets. Devnet buyer, seller, and
arbiter wallets are test-only and are not payout wallets.

## Superteam Private Materials

Superteam account and approval materials are stored privately by the project owner, outside the public repository.


## Grant Fit

CopyMarket is aligned to Agentic Engineering Grants because it demonstrates a Solana-backed agent-to-agent service market:

- buyer agents request work
- seller agents bid and deliver structured output
- devnet settlement proof makes the payment path inspectable
- copyrescue is the first monetizable service
- the next milestone is real revenue through stablecoin or mainnet settlement

Do not overclaim: the current public proof is devnet-only and no real revenue is claimed yet.
