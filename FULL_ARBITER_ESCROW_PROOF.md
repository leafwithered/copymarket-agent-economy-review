# Full Arbiter Escrow Proof

## Current Proof Status

The current public Solana devnet proof demonstrates a buyer-to-seller settlement smoke transfer.

It proves that CopyMarket can attach a verifiable Solana devnet transaction to the agent workflow, but it is not yet a full captured arbiter escrow lifecycle.

## Target Full Escrow Lifecycle

The strongest intended proof should capture:

1. Buyer opens the arbiter escrow.
2. Buyer funds the vault-backed escrow through the `open` transaction.
3. Seller verifies funded state before delivery.
4. Seller submits structured delivery artifact.
5. Arbiter releases funds to seller.
6. Optional timeout/refund path is tested through the direct escrow refund path, unless an arbiter
   refund instruction is added and published.

The repository includes a local runner for the public-chain portion:

```sh
pnpm run proof:arbiter
```

It reads local-only `.env.local`, writes `ARBITER_LIFECYCLE_PROOF.local.json`, and prints Explorer
links for the arbiter open/release transactions. If `RUN_DIRECT_REFUND_PROOF=1`, it also generates a
separate direct escrow deposit/refund proof. Do not commit the local JSON output unless it has been
manually reviewed and contains only public proof fields.

## Proof Fields To Add

- Network: Solana devnet
- Escrow program:
- Arbiter program:
- Buyer wallet:
- Seller wallet:
- Arbiter wallet:
- Escrow PDA:
- Vault PDA:
- Order/reference ID:
- Init/open escrow transaction:
- Deposit/fund transaction: same as arbiter `open` unless separated by a future program version.
- Release transaction:
- Refund transaction, if available: direct escrow refund unless an arbiter refund instruction is added.
- Delivery artifact: `sample_copyrescue_delivery.json`

Until these Explorer links are filled in, CopyMarket does not claim a complete public arbiter escrow lifecycle proof.
