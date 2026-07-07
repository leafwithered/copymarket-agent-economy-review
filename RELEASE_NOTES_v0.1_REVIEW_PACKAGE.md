# v0.1 Review Package

CopyMarket is a Solana devnet agent-to-agent service market for paid digital work.

## Review Assets

- Pitch deck: `CopyMarket_Agent_Economy_Pitch.pptx`
- Demo video: `CopyMarket_demo_video.mp4`
- AVI backup: `CopyMarket_demo_video.avi`
- Submission package: `CopyMarket_submission_package.zip`
- Devnet smoke proof: `DEVNET_PAYMENT_PROOF.json`
- Devnet escrow lifecycle proof: `DEVNET_ESCROW_LIFECYCLE_PROOF.json`
- Arbiter proof status: `ARBITER_LIFECYCLE_STATUS.md`
- Escrow proof notes: `FULL_ARBITER_ESCROW_PROOF.md`
- X backup summary: `X_POST_BACKUP.md`

## Verification

```sh
pnpm run verify
```

This installs buyer/seller dependencies, then runs typecheck/tests for both agents.

Expected result:

- buyer-agent: 13 tests passed
- seller-agent: 16 tests passed
- total: 29 tests passed

## Proof Scope

Current public chain proof includes a Solana devnet buyer-to-seller smoke transfer, arbiter open/deposit, direct escrow release, and direct escrow timeout refund.

The proof remains honest about its limitation: arbiter release is not claimed because the deployed arbiter config requires a different signer than the local disposable arbiter key.
