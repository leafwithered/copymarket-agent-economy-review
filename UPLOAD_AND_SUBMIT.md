# Upload And Submit Status

Status: submitted. Keep this file as the operational checklist for upgrades before the deadline.

## Public GitHub Repo

```text
https://github.com/leafwithered/copymarket-agent-economy-review
```

Public package:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_submission_package.zip
```

Review tag:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/releases/tag/v0.1-review-package
```

Do not upload:

- `node_modules`
- `.env`
- `WALLETS.txt`
- private credential files

## Pitch Deck

Current public answer can use the direct deck file or the package link. The deck is also inside the ZIP at archive root:

```text
CopyMarket_Agent_Economy_Pitch.pptx
```

Current status: the PPTX is available as a repo-root public file; GitHub release assets remain an optional later upgrade.

Direct deck link:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_Agent_Economy_Pitch.pptx
```

## Demo Video

Current public answer should use the direct MP4 demo video file. The AVI and ZIP are backups.

```text
CopyMarket_demo_video.mp4
https://github.com/leafwithered/copymarket-agent-economy-review/blob/main/CopyMarket_demo_video.mp4
https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.mp4
```

Current status: the MP4 video is now uploaded as a separate public GitHub file. YouTube unlisted, Loom, or GitHub release assets remain optional later upgrades.

AVI backup:

```text
https://github.com/leafwithered/copymarket-agent-economy-review/raw/main/CopyMarket_demo_video.avi
```

## Devnet Proof

Prepared public wallet addresses are in `DEVNET_RUNBOOK.md`.

Completed:

1. Funded the buyer wallet with 1 devnet SOL.
2. Verified `https://api.devnet.solana.com` as the working RPC endpoint.
3. Broadcast a buyer-to-seller devnet payment smoke proof.

Proof files:

- `devnet_airdrop_proof.json`
- `DEVNET_PAYMENT_PROOF.json`

Explorer links:

```text
https://explorer.solana.com/tx/4CMqLmrU6zLTaCFse1NP6F4WTeDjj1hbFcRagV8T8rNEQ8ZBziieaE2W8khwRree3iVnjrUTTBkyC497u6vAUoBe?cluster=devnet
https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet
```

Next best upgrade:

1. Run the market with `TRACE=1`.
2. Add the full arbiter escrow open and release Explorer transaction links to Superteam `otherInfo`.

Do not mark full arbiter lifecycle proof as complete unless the repository includes the actual Explorer transaction set.

## Superteam Submission

Listing:

```text
Agentic Engineering Grants
```

Submission status:

```text
Submitted privately through Superteam. Private Superteam account materials are kept outside the public repo.
```

Required fields:

1. Link your GitHub Repo
2. Link your pitch deck
3. Link your demo video

Telegram URL:

```text
https://t.me/hierarchleaf
```

Email:

```text
hierarchleaf@gmail.com
```

X:

```text
https://x.com/leafmyx
```

## If Approved

Use the project owner's private Superteam account materials to claim or complete any approval steps. Do not publish private claim material in GitHub, the reviewer site, X, Telegram, or submission screenshots.


## Grant Alignment Cleanup

Current submission target:

```text
Agentic Engineering Grants
```

Use this wording in future updates:

```text
Built for Agentic Engineering Grants - a Solana-backed agent-to-agent service market.
```

Avoid claiming unverified regional eligibility, production revenue, or production-grade escrow until those proofs exist. The correct current claim is devnet proof plus a path to real revenue.

No real revenue is claimed yet; current proof is devnet-only until a paid stablecoin or mainnet loop exists.
