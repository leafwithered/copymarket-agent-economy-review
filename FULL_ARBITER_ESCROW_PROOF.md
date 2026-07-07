# Escrow Lifecycle Proof

## Scope

This file records the public Solana devnet chain evidence available for CopyMarket.

It does not claim mainnet readiness, real revenue, or a completed arbiter release. It does show:

1. Arbiter `open` / vault-backed deposit.
2. Direct escrow deposit / release.
3. Direct escrow deposit / timeout refund.

The machine-readable proof is in `DEVNET_ESCROW_LIFECYCLE_PROOF.json`.

## Programs

Escrow program:

```text
R5NWNg9eRLWWQU81Xbzz5Du1k7jTDeeT92Ty6qCeXet
https://explorer.solana.com/address/R5NWNg9eRLWWQU81Xbzz5Du1k7jTDeeT92Ty6qCeXet?cluster=devnet
```

Arbiter program:

```text
FJtuVXsyXuRKqgJBEPAXmktkd13CqStapgevzGwYktXd
https://explorer.solana.com/address/FJtuVXsyXuRKqgJBEPAXmktkd13CqStapgevzGwYktXd?cluster=devnet
```

## Wallets

Buyer:

```text
6WwdWJNYYFAthMJFP1gdM7xysGJv1GhwpBRSL2ch8Yhd
```

Seller:

```text
FeXKD6fYwGeBMeU5G9qF6HJk3Z9Wj5qFjFTopktFmJfD
```

Local disposable arbiter:

```text
H5xAASAz21bhdtdRi73QSxa1bphXMTGCLXCwCbw2Ud9g
```

Configured on-chain arbiter:

```text
Ay2GqHyukwso14RLZWRPhnFMovGGPpVcBzZcnceEiG4Z
```

The deployed arbiter config requires the configured on-chain arbiter signer. Its private key is not
present locally, so this proof does not claim arbiter release.

## Arbiter Open / Deposit

Amount:

```text
0.001 devnet SOL
```

Reference:

```text
4HMT3ni5kaT9iQSVhenbP7YPUtsQZv9NF8XjquGN5HZ8
```

Vault PDA:

```text
J1g9MvkyHxLnY821AVcpUffMjvByHDFcnXX2sjMfHYWN
```

Escrow PDA:

```text
AKof1wk9rcGKx63uptsCwnYPCbEKZcskaHRzDhFTMfWu
```

Open transaction:

```text
https://explorer.solana.com/tx/2USoxnivGULMWoxNFKHfZrHwvt8uMLDuWrTFpFNuVgFqSW4pvspd1BDKFYcp7bQxgzF37iLKA9oTqCUYxAfnGEjG?cluster=devnet
```

## Direct Escrow Release Path

Amount:

```text
0.0001 devnet SOL
```

Reference:

```text
Grv7om8SF7MTBSSqV6t4hMVdxLLJneaizu4QqsNAcqDa
```

Escrow PDA:

```text
8YuLsCJHCCEgqg97qvtCWjSWDwc1ayWDfqesCcpEY57N
```

Deposit transaction:

```text
https://explorer.solana.com/tx/3Sg7rEFJDmVSbScdqwv1yJN9eAbwwpEMab7YUhbdyc7176wwe2kcrVYyrrLpe1MFTiwStwJjrW9FRzXzTNduXAcZ?cluster=devnet
```

Release transaction:

```text
https://explorer.solana.com/tx/m8cVY2j78NAtgUA73ziQ9aC68pAyTgW4f5EL7HbMngxtF7eU85VGFJGjkwjSBb6KXWcLuhVASP4Q9TuYWF36Mph?cluster=devnet
```

## Direct Escrow Refund Path

Amount:

```text
0.0001 devnet SOL
```

Reference:

```text
8zJhAWfP5qKQemkZ2EGvhTTXq3y1jA7wQQP5EctT2amW
```

Escrow PDA:

```text
raWrBD9bdY1fxgnW6uMB12TbjbjYfFF35iyyt62Xvhz
```

Deposit transaction:

```text
https://explorer.solana.com/tx/2Du967wbVa6uTAgEpRtrFumV6HE2qtXnQNTm7m9azCwE14Qj7HpgPvEtCbZLCpPW62DFDwqZovorDvsH27p1bTHF?cluster=devnet
```

Refund transaction:

```text
https://explorer.solana.com/tx/3RieKuRAsTHfHAxwLCSHipwVMp1E5XhVLJEqaqHrnMXbRVSyQAfkDDMi11S2aQbBn3FfaCGwQn7GMXhricDFyRnS?cluster=devnet
```

## Status Summary

| Path | Public proof | Status |
| --- | --- | --- |
| Funding | Buyer devnet funding tx | Complete |
| Smoke payment | Buyer-to-seller transfer | Complete |
| Arbiter open/deposit | Vault-backed open tx | Complete |
| Arbiter release | Requires configured arbiter signer | Not claimed |
| Direct escrow release | Deposit + release txs | Complete |
| Direct escrow refund | Deposit + refund txs | Complete |

This is stronger than the original smoke proof, but still honest: the remaining gap is full arbiter
release with the currently configured on-chain arbiter signer.
