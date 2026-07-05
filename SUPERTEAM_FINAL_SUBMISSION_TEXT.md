# Superteam Final Submission Text

## Field 1 - Link your GitHub Repo

```text
https://github.com/leafwithered/copymarket-agent-economy-review
```

## Field 2 - Link your pitch deck

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_Agent_Economy_Pitch.pptx
```

## Field 3 - Link your demo video

```text
https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.mp4
```

Backup GitHub file page:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_demo_video.mp4
```

## Other Info

```text
CopyMarket is a Solana devnet agent service market for paid B2B growth work, with escrow-aware code paths and public settlement proof.

Grant fit: built for Agentic Engineering Grants as a Solana-backed agent-to-agent service market. Buyer agents request work, seller agents bid and deliver structured output, and devnet proof makes the settlement path inspectable.

The buyer agent broadcasts a WANT for copyrescue, collects bids, awards the best-value seller, opens arbiter-gated devnet escrow, and waits for delivery. The seller agent only delivers after escrow funding is verified.

The sold artifact is concrete: hero rewrite, CTA, three section rewrites, conversion notes, and risk controls.

No real revenue is claimed yet. The next milestone is one paid copyrescue loop with stablecoin or mainnet settlement, a public order receipt, and a structured delivery artifact. The output is structured JSON so another agent can consume it without parsing a vague chat transcript.

Pitch deck: https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_Agent_Economy_Pitch.pptx
Demo video: https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.mp4
Review tag snapshot: https://github.com/leafwithered/copymarket-agent-economy-review/tree/v0.1-review-package
Public package backup: https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_submission_package.zip

One-page reviewer page: https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/docs/index.html
GitHub Pages target served from the gh-pages branch: https://leafwithered.github.io/copymarket-agent-economy-review/
Public X launch thread: https://x.com/leafmyx/status/2072747881883369696
X backup summary: https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/X_POST_BACKUP.md

Local verification completed:
- seller-agent typecheck passed
- seller-agent tests passed: 5 files, 16 tests
- buyer-agent typecheck passed
- buyer-agent tests passed: 2 files, 13 tests
- root verify script available: pnpm run verify, which installs buyer/seller dependencies and runs typecheck/tests
- pitch deck overflow check passed

Live devnet proof:
- buyer public address: 6WwdWJNYYFAthMJFP1gdM7xysGJv1GhwpBRSL2ch8Yhd
- seller public address: FeXKD6fYwGeBMeU5G9qF6HJk3Z9Wj5qFjFTopktFmJfD
- arbiter public address: H5xAASAz21bhdtdRi73QSxa1bphXMTGCLXCwCbw2Ud9g
- funding proof: https://explorer.solana.com/tx/4CMqLmrU6zLTaCFse1NP6F4WTeDjj1hbFcRagV8T8rNEQ8ZBziieaE2W8khwRree3iVnjrUTTBkyC497u6vAUoBe?cluster=devnet
- buyer-to-seller payment proof: https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet
- RPC used: https://api.devnet.solana.com
- DEVNET_RUNBOOK.md explains runnable local checks.
- ARBITER_LIFECYCLE_STATUS.md tracks that current public Explorer proof is a buyer-to-seller devnet smoke transfer, not a complete arbiter lifecycle transaction set yet.

Main changed files:
- coral-agents/seller-agent/src/service.ts
- coral-agents/seller-agent/src/bidder.ts
- coral-agents/buyer-agent/src/index.ts
- coral-agents/buyer-agent/src/llm_buyer.ts
- README.md
- docs/index.html
- DEVNET_RUNBOOK.md
- ARBITER_LIFECYCLE_STATUS.md
- DEVNET_PAYMENT_PROOF.json
- devnet_airdrop_proof.json
- SUBMISSION.md
- CopyMarket_Agent_Economy_Pitch.pptx
- CopyMarket_demo_video.mp4
- CopyMarket_demo_video.avi

Contact Telegram: https://t.me/hierarchleaf
Contact Email: hierarchleaf@gmail.com
X: https://x.com/leafmyx
```
