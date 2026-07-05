import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import anchor from '@coral-xyz/anchor'
import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  sendAndConfirmTransaction,
} from '@solana/web3.js'

const { AnchorProvider, BN } = anchor

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const BUYER_DIR = path.resolve(SCRIPT_DIR, '..')
const REPO_ROOT = path.resolve(BUYER_DIR, '..', '..')

const ESCROW_PROGRAM_ID = new PublicKey('R5NWNg9eRLWWQU81Xbzz5Du1k7jTDeeT92Ty6qCeXet')
const ARBITER_PROGRAM_ID = new PublicKey('FJtuVXsyXuRKqgJBEPAXmktkd13CqStapgevzGwYktXd')

const ARBITER_IDL = {
  address: ARBITER_PROGRAM_ID.toBase58(),
  metadata: { name: 'arbiter', version: '0.1.0', spec: '0.1.0' },
  instructions: [
    {
      name: 'init_config',
      discriminator: [23, 235, 115, 232, 168, 96, 1, 231],
      accounts: [
        { name: 'admin', writable: true, signer: true },
        { name: 'config', writable: true },
        { name: 'system_program', address: SystemProgram.programId.toBase58() },
      ],
      args: [{ name: 'arbiter', type: 'pubkey' }],
    },
    {
      name: 'open',
      discriminator: [228, 220, 155, 71, 199, 189, 60, 45],
      accounts: [
        { name: 'payer', writable: true, signer: true },
        { name: 'vault', writable: true },
        { name: 'seller' },
        { name: 'escrow', writable: true },
        { name: 'escrow_program', address: ESCROW_PROGRAM_ID.toBase58() },
        { name: 'system_program', address: SystemProgram.programId.toBase58() },
      ],
      args: [
        { name: 'amount', type: 'u64' },
        { name: 'reference', type: 'pubkey' },
        { name: 'deadline', type: 'i64' },
      ],
    },
    {
      name: 'arbitrate_release',
      discriminator: [194, 41, 251, 189, 16, 195, 150, 11],
      accounts: [
        { name: 'arbiter', signer: true },
        { name: 'config' },
        { name: 'vault', writable: true },
        { name: 'seller', writable: true },
        { name: 'escrow', writable: true },
        { name: 'escrow_program', address: ESCROW_PROGRAM_ID.toBase58() },
      ],
      args: [{ name: 'reference', type: 'pubkey' }],
    },
  ],
}

function loadEnvFile(file) {
  if (!fs.existsSync(file)) return
  for (const raw of fs.readFileSync(file, 'utf8').split(/\r?\n/)) {
    const line = raw.trim()
    if (!line || line.startsWith('#')) continue
    const match = line.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/)
    if (!match) continue
    const [, key, value] = match
    if (process.env[key] == null) {
      process.env[key] = value.replace(/^['"]|['"]$/g, '')
    }
  }
}

const BASE58_ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'
function decodeBase58(text) {
  let bytes = [0]
  for (const char of text) {
    const value = BASE58_ALPHABET.indexOf(char)
    if (value < 0) throw new Error(`invalid base58 character in keypair: ${char}`)
    let carry = value
    for (let i = 0; i < bytes.length; i++) {
      carry += bytes[i] * 58
      bytes[i] = carry & 0xff
      carry >>= 8
    }
    while (carry > 0) {
      bytes.push(carry & 0xff)
      carry >>= 8
    }
  }
  for (const char of text) {
    if (char !== '1') break
    bytes.push(0)
  }
  return Uint8Array.from(bytes.reverse())
}

function requireEnv(name) {
  const value = process.env[name]
  if (!value) throw new Error(`${name} is required. Put it in .env.local; do not paste it into chat or commit it.`)
  return value
}

function loadKeypair(name) {
  return Keypair.fromSecretKey(decodeBase58(requireEnv(name)))
}

function assertDevnet(rpcUrl) {
  const normalized = rpcUrl.toLowerCase()
  if (normalized.includes('mainnet') && process.env.ALLOW_MAINNET !== '1') {
    throw new Error('devnet-only Solana RPC required; set ALLOW_MAINNET=1 only for an audited mainnet run')
  }
}

function explorer(kind, id) {
  return `https://explorer.solana.com/${kind}/${id}?cluster=devnet`
}

function configPda() {
  return PublicKey.findProgramAddressSync([Buffer.from('config')], ARBITER_PROGRAM_ID)[0]
}

function vaultPda(reference) {
  return PublicKey.findProgramAddressSync([Buffer.from('vault'), reference.toBuffer()], ARBITER_PROGRAM_ID)[0]
}

function escrowPda(buyer, reference) {
  return PublicKey.findProgramAddressSync(
    [Buffer.from('escrow'), buyer.toBuffer(), reference.toBuffer()],
    ESCROW_PROGRAM_ID,
  )[0]
}

function arbitratedEscrowPda(vault, reference) {
  return escrowPda(vault, reference)
}

function makeProvider(connection, signer) {
  return new AnchorProvider(connection, new anchor.Wallet(signer), { commitment: 'confirmed' })
}

function makeArbiter(connection, signer) {
  return new anchor.Program(ARBITER_IDL, makeProvider(connection, signer))
}

async function ensureArbiterConfig(connection, buyer, arbiterPublicKey) {
  if (await connection.getAccountInfo(configPda(), 'confirmed')) return null
  return (makeArbiter(connection, buyer).methods)
    .initConfig(arbiterPublicKey)
    .accounts({ admin: buyer.publicKey, config: configPda(), systemProgram: SystemProgram.programId })
    .signers([buyer])
    .rpc()
}

async function ensureArbiterFunded(connection, payer, arbiterPublicKey) {
  if ((await connection.getBalance(arbiterPublicKey)) >= 0.01 * LAMPORTS_PER_SOL) return null
  const tx = new Transaction().add(SystemProgram.transfer({
    fromPubkey: payer.publicKey,
    toPubkey: arbiterPublicKey,
    lamports: Math.round(0.02 * LAMPORTS_PER_SOL),
  }))
  return sendAndConfirmTransaction(connection, tx, [payer])
}

async function runArbiterReleaseProof(connection, buyer, arbiter, seller, amountSol, deadlineSecs) {
  const reference = Keypair.generate().publicKey
  const vault = vaultPda(reference)
  const escrow = arbitratedEscrowPda(vault, reference)
  const openSig = await makeArbiter(connection, buyer).methods
    .open(new BN(Math.round(amountSol * LAMPORTS_PER_SOL)), reference, new BN(Math.floor(Date.now() / 1000) + deadlineSecs))
    .accounts({
      payer: buyer.publicKey,
      vault,
      seller,
      escrow,
      escrowProgram: ESCROW_PROGRAM_ID,
      systemProgram: SystemProgram.programId,
    })
    .signers([buyer])
    .rpc()

  const releaseSig = await makeArbiter(connection, arbiter).methods
    .arbitrateRelease(reference)
    .accounts({
      arbiter: arbiter.publicKey,
      config: configPda(),
      vault,
      seller,
      escrow,
      escrowProgram: ESCROW_PROGRAM_ID,
    })
    .signers([arbiter])
    .rpc()

  return {
    reference: reference.toBase58(),
    vaultPda: vault.toBase58(),
    escrowPda: escrow.toBase58(),
    openTransaction: { signature: openSig, explorer: explorer('tx', openSig) },
    releaseTransaction: { signature: releaseSig, explorer: explorer('tx', releaseSig) },
  }
}

async function runDirectRefundProof(connection, buyer, seller) {
  const amountSol = Number(process.env.DIRECT_REFUND_AMOUNT_SOL ?? '0.0001')
  const deadlineSecs = Number(process.env.DIRECT_REFUND_DEADLINE_SECS ?? '3')
  const reference = Keypair.generate().publicKey
  const escrow = escrowPda(buyer.publicKey, reference)
  const program = new anchor.Program(
    await anchor.Program.fetchIdl(ESCROW_PROGRAM_ID, makeProvider(connection, buyer)),
    makeProvider(connection, buyer),
  )
  const depositSig = await program.methods
    .initialize(new BN(Math.round(amountSol * LAMPORTS_PER_SOL)), reference, new BN(Math.floor(Date.now() / 1000) + deadlineSecs))
    .accounts({ buyer: buyer.publicKey, seller, escrow })
    .signers([buyer])
    .rpc()

  await new Promise((resolve) => setTimeout(resolve, (deadlineSecs + 2) * 1000))

  const refundSig = await program.methods
    .refund()
    .accounts({ buyer: buyer.publicKey, escrow })
    .signers([buyer])
    .rpc()

  return {
    note: 'Direct escrow refund proof. The current arbiter client exposes open/release; it does not expose an arbiter refund instruction.',
    reference: reference.toBase58(),
    escrowPda: escrow.toBase58(),
    depositTransaction: { signature: depositSig, explorer: explorer('tx', depositSig) },
    refundTransaction: { signature: refundSig, explorer: explorer('tx', refundSig) },
  }
}

async function main() {
  loadEnvFile(path.join(REPO_ROOT, '.env.local'))
  loadEnvFile(path.join(BUYER_DIR, '.env.local'))
  loadEnvFile(path.join(REPO_ROOT, '.env'))
  loadEnvFile(path.join(BUYER_DIR, '.env'))

  const rpcUrl = process.env.SOLANA_RPC_URL ?? 'https://api.devnet.solana.com'
  assertDevnet(rpcUrl)
  const connection = new Connection(rpcUrl, 'confirmed')
  const buyer = loadKeypair('BUYER_KEYPAIR_B58')
  const arbiter = loadKeypair('ARBITER_KEYPAIR_B58')
  const seller = new PublicKey(requireEnv('SELLER_WALLET'))
  const amountSol = Number(process.env.BUYER_MAX_SOL ?? '0.001')
  const deadlineSecs = Number(process.env.ARBITER_DEADLINE_SECS ?? '300')

  const startingBuyerLamports = await connection.getBalance(buyer.publicKey)
  if (startingBuyerLamports < Math.round((amountSol + 0.03) * LAMPORTS_PER_SOL)) {
    throw new Error(`buyer wallet ${buyer.publicKey.toBase58()} needs more devnet SOL`)
  }

  const configInitSig = await ensureArbiterConfig(connection, buyer, arbiter.publicKey)
  const arbiterFundingSig = await ensureArbiterFunded(connection, buyer, arbiter.publicKey)
  const releaseProof = await runArbiterReleaseProof(connection, buyer, arbiter, seller, amountSol, deadlineSecs)
  const directRefundProof = process.env.RUN_DIRECT_REFUND_PROOF === '1'
    ? await runDirectRefundProof(connection, buyer, seller)
    : null

  const proof = {
    generatedAt: new Date().toISOString(),
    network: 'solana-devnet',
    rpcUrl,
    escrowProgram: { address: ESCROW_PROGRAM_ID.toBase58(), explorer: explorer('address', ESCROW_PROGRAM_ID.toBase58()) },
    arbiterProgram: { address: ARBITER_PROGRAM_ID.toBase58(), explorer: explorer('address', ARBITER_PROGRAM_ID.toBase58()) },
    buyerWallet: { address: buyer.publicKey.toBase58(), explorer: explorer('address', buyer.publicKey.toBase58()) },
    sellerWallet: { address: seller.toBase58(), explorer: explorer('address', seller.toBase58()) },
    arbiterWallet: { address: arbiter.publicKey.toBase58(), explorer: explorer('address', arbiter.publicKey.toBase58()) },
    configPda: { address: configPda().toBase58(), explorer: explorer('address', configPda().toBase58()) },
    setupTransactions: {
      configInit: configInitSig ? { signature: configInitSig, explorer: explorer('tx', configInitSig) } : null,
      arbiterFunding: arbiterFundingSig ? { signature: arbiterFundingSig, explorer: explorer('tx', arbiterFundingSig) } : null,
    },
    arbiterOpenReleaseProof: releaseProof,
    directRefundProof,
    notes: [
      'Arbiter open is the funding/deposit transaction for the vault-backed escrow.',
      'Current public arbiter client supports open and arbitrate_release.',
      'Set RUN_DIRECT_REFUND_PROOF=1 to add a separate direct escrow deposit/refund path.',
      'This file is local proof output and must not contain private keys.',
    ],
  }

  const outputFile = path.join(REPO_ROOT, 'ARBITER_LIFECYCLE_PROOF.local.json')
  fs.writeFileSync(outputFile, `${JSON.stringify(proof, null, 2)}\n`)
  console.log(`wrote ${outputFile}`)
  console.log(JSON.stringify({
    open: releaseProof.openTransaction.explorer,
    release: releaseProof.releaseTransaction.explorer,
    refund: directRefundProof?.refundTransaction.explorer ?? null,
  }, null, 2))
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
