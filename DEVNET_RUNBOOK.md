# CopyMarket Devnet Runbook

This file explains how to produce the strongest proof for CopyMarket: a live Solana devnet escrow
settlement where the buyer funds escrow, the seller delivers `copyrescue`, and the arbiter releases
payment to the seller.

## Current Prepared Wallets

The local setup generated these public devnet addresses:

```text
buyer:   6WwdWJNYYFAthMJFP1gdM7xysGJv1GhwpBRSL2ch8Yhd
seller:  FeXKD6fYwGeBMeU5G9qF6HJk3Z9Wj5qFjFTopktFmJfD
arbiter: H5xAASAz21bhdtdRi73QSxa1bphXMTGCLXCwCbw2Ud9g
```

Only public addresses are shown here. The generated `.env` and `WALLETS.txt` contain private key
material and must stay local.

## Needed Before A Live Run

1. Fund the buyer address with devnet SOL from `https://faucet.solana.com` or `requestAirdrop`.
2. Use a working Solana devnet RPC in `SOLANA_RPC_URL`; `https://api.devnet.solana.com` was verified.
3. Optionally add an LLM key. Without one, the seller still returns deterministic structured output.

## Private Env Setup

Do not paste private keys into chat, commits, issues, release notes, or zip files.

Use fresh devnet-only wallets for proof runs. Do not reuse a mainnet wallet or a wallet that holds
real funds. The keypairs are only needed so the script can sign devnet transactions:

- `BUYER_KEYPAIR_B58` signs the devnet buyer account that opens/funds escrow.
- `ARBITER_KEYPAIR_B58` signs the devnet arbiter account that releases escrow.
- `SELLER_WALLET` is a public receiving address; it does not need a private key for the proof script.

If you have the Solana CLI installed, generate fresh local keypairs outside the repo or inside an
ignored private folder:

```sh
solana-keygen new --no-bip39-passphrase --outfile buyer-devnet.json
solana-keygen new --no-bip39-passphrase --outfile arbiter-devnet.json
solana-keygen pubkey buyer-devnet.json
solana-keygen pubkey arbiter-devnet.json
```

Convert each JSON secret key to the base58 string expected by `.env.local` using your preferred
local wallet tooling. Keep the JSON files and base58 strings private. Never publish them, and delete
or move them to a secure location after the proof run.

Alternatively, use the repository helper to generate fresh local devnet wallets and an ignored
`.env.local`:

```sh
pnpm run wallets:devnet
```

This writes `.env.local` and `WALLETS.txt`. Both files are ignored by Git. Fund only the printed
buyer public address with devnet SOL, then run:

```sh
pnpm run proof:arbiter
```

Create a local-only `.env.local` in the repository root. It is ignored by Git through the `.env.*`
rule. Use `.env.example` as the shape:

```text
SOLANA_RPC_URL=https://api.devnet.solana.com
SETTLEMENT_MODE=arbiter
BUYER_MAX_SOL=0.001
ARBITER_DEADLINE_SECS=300
SELLER_WALLET=your_devnet_seller_public_key
BUYER_KEYPAIR_B58=your_devnet_buyer_secret_key_base58
ARBITER_KEYPAIR_B58=your_devnet_arbiter_secret_key_base58
RUN_DIRECT_REFUND_PROOF=0
```

Only the public wallet addresses and Explorer links should be copied into public materials.

## Live Devnet Proofs

Buyer funding proof:

```text
https://explorer.solana.com/tx/4CMqLmrU6zLTaCFse1NP6F4WTeDjj1hbFcRagV8T8rNEQ8ZBziieaE2W8khwRree3iVnjrUTTBkyC497u6vAUoBe?cluster=devnet
```

Buyer-to-seller payment smoke proof:

```text
https://explorer.solana.com/tx/49V7wedjpa66Rzk87qhCzjshWVx4uw2zhBL4WhKzN7kTEfshickWW9dcwbUS11adb33LkhEFEiE9hFdQbcV1s7zo?cluster=devnet
```

The second transaction transfers 0.001 devnet SOL from the prepared buyer wallet to the prepared seller
wallet. It is a live payment smoke proof. Stronger escrow lifecycle proof is now published below.

## Runnable Local Checks

The public repository includes the buyer package, seller package, and the local `@pay/agent-runtime`
dependency required by both agents. A reviewer can run the local verification without the older
Docker/example workspace commands.

From the repo root, use Node 20+ and pnpm:

```sh
pnpm run verify
```

This installs buyer/seller dependencies, then runs both agent typechecks and tests.

Equivalent package-level commands:

```sh
cd coral-agents/buyer-agent
pnpm install --lockfile=false --ignore-scripts
pnpm exec tsc --noEmit
pnpm exec vitest run

cd ../seller-agent
pnpm install --lockfile=false --ignore-scripts
pnpm exec tsc --noEmit
pnpm exec vitest run
```

Expected local verification:

```text
buyer-agent: 2 test files, 13 tests passed
seller-agent: 5 test files, 16 tests passed
```

## Live Escrow Lifecycle Status

The public Explorer proof now includes:

- arbiter `open` / vault-backed deposit
- direct escrow deposit / release
- direct escrow deposit / timeout refund

Machine-readable public proof:

```text
DEVNET_ESCROW_LIFECYCLE_PROOF.json
```

Arbiter open / deposit:

```text
https://explorer.solana.com/tx/2USoxnivGULMWoxNFKHfZrHwvt8uMLDuWrTFpFNuVgFqSW4pvspd1BDKFYcp7bQxgzF37iLKA9oTqCUYxAfnGEjG?cluster=devnet
```

Direct escrow release path:

```text
https://explorer.solana.com/tx/3Sg7rEFJDmVSbScdqwv1yJN9eAbwwpEMab7YUhbdyc7176wwe2kcrVYyrrLpe1MFTiwStwJjrW9FRzXzTNduXAcZ?cluster=devnet
https://explorer.solana.com/tx/m8cVY2j78NAtgUA73ziQ9aC68pAyTgW4f5EL7HbMngxtF7eU85VGFJGjkwjSBb6KXWcLuhVASP4Q9TuYWF36Mph?cluster=devnet
```

Direct escrow refund path:

```text
https://explorer.solana.com/tx/2Du967wbVa6uTAgEpRtrFumV6HE2qtXnQNTm7m9azCwE14Qj7HpgPvEtCbZLCpPW62DFDwqZovorDvsH27p1bTHF?cluster=devnet
https://explorer.solana.com/tx/3RieKuRAsTHfHAxwLCSHipwVMp1E5XhVLJEqaqHrnMXbRVSyQAfkDDMi11S2aQbBn3FfaCGwQn7GMXhricDFyRnS?cluster=devnet
```

Honest limitation:

The deployed arbiter config currently requires arbiter signer
`Ay2GqHyukwso14RLZWRPhnFMovGGPpVcBzZcnceEiG4Z`. That private key is not present locally, so this
project does not claim a completed arbiter release transaction. The public proof instead shows
arbiter deposit semantics plus completed direct release and refund escrow paths.

Required private inputs for that run:

- `BUYER_KEYPAIR_B58`
- `ARBITER_KEYPAIR_B58`
- `SELLER_WALLET`
- funded devnet buyer balance

Do not publish those private key values. Only publish public addresses, Explorer links, and PDA values.

## Reviewer Shortcut

If a reviewer does not want to run devnet, inspect:

- `coral-agents/seller-agent/src/service.ts`
- `coral-agents/buyer-agent/src/index.ts`
- `sample_copyrescue_delivery.json`
- `CopyMarket_Agent_Economy_Pitch.pptx`
- `CopyMarket_demo_video.mp4`
- `CopyMarket_demo_video.avi`
- `devnet_airdrop_proof.json`
- `DEVNET_PAYMENT_PROOF.json`

These show the paid service, the market loop, and the escrow-gated delivery path.
