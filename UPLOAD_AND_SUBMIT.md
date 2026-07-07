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
https://github.com/leafwithered/copymarket-agent-economy-review/tree/v0.1-review-package
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
4. Broadcast an arbiter open / vault-backed deposit transaction.
5. Broadcast direct escrow deposit / release and direct escrow deposit / refund transaction pairs.

Proof files:

- `devnet_airdrop_proof.json`
- `DEVNET_PAYMENT_PROOF.json`
- `DEVNET_ESCROW_LIFECYCLE_PROOF.json`

Explorer links:

```text
https://explorer.solana.com/tx/4CMqLmrU6zLTaCFse1NP6F4WTeDjj1hbFcRagV8T8rNEQ8ZBziieaE2W8khwRree3iVnjrUTTBkyC497u6vAUoBe?cluster=devnet
https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet
https://explorer.solana.com/tx/2USoxnivGULMWoxNFKHfZrHwvt8uMLDuWrTFpFNuVgFqSW4pvspd1BDKFYcp7bQxgzF37iLKA9oTqCUYxAfnGEjG?cluster=devnet
https://explorer.solana.com/tx/3Sg7rEFJDmVSbScdqwv1yJN9eAbwwpEMab7YUhbdyc7176wwe2kcrVYyrrLpe1MFTiwStwJjrW9FRzXzTNduXAcZ?cluster=devnet
https://explorer.solana.com/tx/m8cVY2j78NAtgUA73ziQ9aC68pAyTgW4f5EL7HbMngxtF7eU85VGFJGjkwjSBb6KXWcLuhVASP4Q9TuYWF36Mph?cluster=devnet
https://explorer.solana.com/tx/2Du967wbVa6uTAgEpRtrFumV6HE2qtXnQNTm7m9azCwE14Qj7HpgPvEtCbZLCpPW62DFDwqZovorDvsH27p1bTHF?cluster=devnet
https://explorer.solana.com/tx/3RieKuRAsTHfHAxwLCSHipwVMp1E5XhVLJEqaqHrnMXbRVSyQAfkDDMi11S2aQbBn3FfaCGwQn7GMXhricDFyRnS?cluster=devnet
```

Honest limitation:

Do not mark arbiter release as complete. The deployed arbiter config requires a different signer than
the local disposable arbiter key. Current public proof is devnet-only and includes arbiter
open/deposit plus direct release/refund paths.

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
