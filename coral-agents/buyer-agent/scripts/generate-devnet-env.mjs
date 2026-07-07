import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { Keypair } from '@solana/web3.js'

const SCRIPT_DIR = path.dirname(fileURLToPath(import.meta.url))
const REPO_ROOT = path.resolve(SCRIPT_DIR, '..', '..', '..')
const ENV_FILE = path.join(REPO_ROOT, '.env.local')
const WALLETS_FILE = path.join(REPO_ROOT, 'WALLETS.txt')

const ALPHABET = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz'

function encodeBase58(bytes) {
  let digits = [0]
  for (const byte of bytes) {
    let carry = byte
    for (let i = 0; i < digits.length; i++) {
      carry += digits[i] << 8
      digits[i] = carry % 58
      carry = Math.floor(carry / 58)
    }
    while (carry > 0) {
      digits.push(carry % 58)
      carry = Math.floor(carry / 58)
    }
  }
  for (const byte of bytes) {
    if (byte !== 0) break
    digits.push(0)
  }
  return digits.reverse().map((digit) => ALPHABET[digit]).join('')
}

function makeWallet(label) {
  const keypair = Keypair.generate()
  return {
    label,
    publicKey: keypair.publicKey.toBase58(),
    secretKeyB58: encodeBase58(keypair.secretKey),
  }
}

if ((fs.existsSync(ENV_FILE) || fs.existsSync(WALLETS_FILE)) && !process.argv.includes('--force')) {
  console.error('Refusing to overwrite existing .env.local or WALLETS.txt. Pass --force only if you intend to rotate devnet wallets.')
  process.exit(1)
}

const buyer = makeWallet('buyer')
const arbiter = makeWallet('arbiter')
const seller = makeWallet('seller')

const env = `SOLANA_RPC_URL=https://api.devnet.solana.com
SETTLEMENT_MODE=arbiter
BUYER_SERVICE=copyrescue
BUYER_ARG=crypto wallet landing page needs a clearer hero and trust path
BUYER_MAX_SOL=0.001
ARBITER_DEADLINE_SECS=300
MARKET_SELLERS=seller-copyrescue,seller-fast,seller-premium
SELLER_WALLET=${seller.publicKey}
BUYER_KEYPAIR_B58=${buyer.secretKeyB58}
ARBITER_KEYPAIR_B58=${arbiter.secretKeyB58}
RUN_DIRECT_REFUND_PROOF=0
TRACE=1
LLM_PROVIDER=none
`

const wallets = `CopyMarket local devnet wallets

These are devnet-only proof wallets. Do not use them on mainnet.
Do not commit this file, paste it into chat, or publish it.

buyer public:   ${buyer.publicKey}
buyer secret:   ${buyer.secretKeyB58}

seller public:  ${seller.publicKey}
seller secret:  ${seller.secretKeyB58}

arbiter public: ${arbiter.publicKey}
arbiter secret: ${arbiter.secretKeyB58}

Next steps:
1. Fund the buyer public address with devnet SOL.
2. Run: pnpm run proof:arbiter
3. Publish only public addresses, PDA values, and Explorer links.
`

fs.writeFileSync(ENV_FILE, env, { mode: 0o600 })
fs.writeFileSync(WALLETS_FILE, wallets, { mode: 0o600 })

console.log(`wrote ${ENV_FILE}`)
console.log(`wrote ${WALLETS_FILE}`)
console.log(`fund buyer devnet wallet: ${buyer.publicKey}`)
