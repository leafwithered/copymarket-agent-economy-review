# Arbiter Lifecycle Proof Status

## Current Public Proof

CopyMarket now publishes finalized Solana devnet chain evidence for three settlement paths:

- buyer devnet funding transaction
- buyer-to-seller smoke transfer
- arbiter `open` / vault-backed deposit transaction
- direct escrow deposit -> release path
- direct escrow deposit -> timeout refund path
- buyer and seller TypeScript checks
- 29 local tests across buyer and seller agents

The public proof file is:

```text
DEVNET_ESCROW_LIFECYCLE_PROOF.json
```

## Finalized Explorer Links

Arbiter open / deposit:

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

## Honest Limitation

The arbiter release transaction is not claimed in this proof.

The deployed arbiter config currently requires this on-chain arbiter signer:

```text
Ay2GqHyukwso14RLZWRPhnFMovGGPpVcBzZcnceEiG4Z
```

That private key is not present locally. The local disposable arbiter key therefore cannot sign
`arbitrate_release`, and the program correctly rejects it. Rather than force or fake this step, the
public materials show the completed arbiter `open` deposit plus the completed direct escrow release
and refund paths.

## Reproduction Notes

The normal command remains:

```sh
pnpm run proof:arbiter
```

On this Windows host, Node fetches to devnet timed out while PowerShell JSON-RPC worked. The public
Explorer links above were produced by signing locally and sending the signed transactions through
PowerShell JSON-RPC to `https://api.devnet.solana.com`.

No mainnet wallet, real funds, claim code, or private key is published.
