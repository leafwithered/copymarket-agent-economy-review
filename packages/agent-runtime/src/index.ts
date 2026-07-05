import bs58 from "bs58"
import { Connection, Keypair } from "@solana/web3.js"

export interface Want { round: number; service: string; arg: string; budgetSol: number }
export interface Bid { round: number; priceSol: number; by: string; note?: string }
export interface EscrowTerms { round: number; reference: string; seller: string; amountSol: number; deadlineSecs: number; settlement?: "direct" | "arbiter" }
export interface Deposited { round: number; reference: string; buyer: string; sig: string; settlement?: "direct" | "arbiter"; vault?: string; arbiter?: string }
export interface CompleteOpts { system: string; user: string; maxTokens?: number }
export interface CoralMessage { text: string }
export interface CoralAgentContext {
  waitForMention(timeoutMs?: number): Promise<CoralMessage | null>
  waitForAgent(name: string, timeoutMs?: number): Promise<void>
  createThread(name: string, agents: string[]): Promise<string>
  send(text: string, thread?: string, recipients?: string[]): Promise<void>
  reply(message: CoralMessage, text: string): Promise<void>
}

export function solanaConnection(rpc = process.env.SOLANA_RPC_URL ?? "https://api.devnet.solana.com"): Connection {
  const normalized = rpc.toLowerCase()
  const allowMainnet = process.env.ALLOW_MAINNET === "1"
  if (!allowMainnet && normalized.includes("mainnet")) {
    throw new Error("devnet-only Solana RPC required; set ALLOW_MAINNET=1 only for an audited mainnet run")
  }
  return new Connection(rpc, "confirmed")
}

export function loadKeypairB58(envName: string): Keypair {
  const encoded = process.env[envName]
  if (!encoded) throw new Error(`${envName} is required`)
  return Keypair.fromSecretKey(bs58.decode(encoded))
}

export async function complete(opts: CompleteOpts): Promise<string> {
  const provider = (process.env.LLM_PROVIDER ?? (process.env.OPENAI_API_KEY ? "openai" : process.env.ANTHROPIC_API_KEY ? "anthropic" : "none")).toLowerCase()
  if (provider === "openai" && process.env.OPENAI_API_KEY) {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "content-type": "application/json", authorization: `Bearer ${process.env.OPENAI_API_KEY}` },
      body: JSON.stringify({ model: process.env.OPENAI_MODEL ?? "gpt-4o-mini", messages: [{ role: "system", content: opts.system }, { role: "user", content: opts.user }], max_tokens: opts.maxTokens ?? 300 }),
    })
    if (!res.ok) throw new Error(`OpenAI completion failed: ${res.status}`)
    const json = await res.json() as { choices?: Array<{ message?: { content?: string } }> }
    return json.choices?.[0]?.message?.content ?? ""
  }
  throw new Error("No LLM provider configured")
}

export function parseJsonReply<T>(text: string): T | null {
  const trimmed = text.trim()
  const fenced = trimmed.match(/```(?:json)?\s*([\s\S]*?)```/i)?.[1]
  const candidate = fenced ?? trimmed.match(/\{[\s\S]*\}/)?.[0] ?? trimmed
  try { return JSON.parse(candidate) as T } catch { return null }
}

export function formatWant(w: Want): string { return `WANT round=${w.round} service=${w.service} budget=${w.budgetSol} arg=${JSON.stringify(w.arg)}` }
export function formatBid(b: Bid): string { return `BID round=${b.round} by=${b.by} price=${b.priceSol}${b.note ? ` note=${JSON.stringify(b.note)}` : ""}` }
export function formatAward(round: number, to: string, reason = ""): string { return `AWARD round=${round} to=${to}${reason ? ` reason=${JSON.stringify(reason)}` : ""}` }
export function formatEscrowRequired(t: EscrowTerms): string { return `ESCROW_REQUIRED round=${t.round} reference=${t.reference} seller=${t.seller} amount=${t.amountSol} deadline=${t.deadlineSecs}${t.settlement ? ` settlement=${t.settlement}` : ""}` }
export function formatDeposited(d: Deposited): string { return `DEPOSITED round=${d.round} reference=${d.reference} buyer=${d.buyer} sig=${d.sig}${d.settlement ? ` settlement=${d.settlement}` : ""}${d.vault ? ` vault=${d.vault}` : ""}${d.arbiter ? ` arbiter=${d.arbiter}` : ""}` }

export function verb(text: string): string { return text.trim().split(/\s+/, 1)[0] ?? "" }
export function messageRound(text: string): number | null { const m = text.match(/\bround=(\d+)/); return m ? Number(m[1]) : null }
function field(text: string, name: string): string | undefined { return text.match(new RegExp(`\\b${name}=([^\\s]+)`))?.[1] }
function quotedArg(text: string): string { const m = text.match(/\barg=("[\s\S]*")$/); if (!m) return field(text, "arg") ?? ""; try { return JSON.parse(m[1]) as string } catch { return m[1] } }
export function parseWant(text: string): Want | null { if (verb(text) !== "WANT") return null; const round = messageRound(text); const service = field(text, "service"); const budget = Number(field(text, "budget")); return round && service && Number.isFinite(budget) ? { round, service, budgetSol: budget, arg: quotedArg(text) } : null }
export function parseBid(text: string): Bid | null { if (verb(text) !== "BID") return null; const round = messageRound(text); const by = field(text, "by"); const priceSol = Number(field(text, "price")); return round && by && Number.isFinite(priceSol) ? { round, by, priceSol, note: field(text, "note") } : null }
export function parseAward(text: string): { round: number; to: string } | null { if (verb(text) !== "AWARD") return null; const round = messageRound(text); const to = field(text, "to"); return round && to ? { round, to } : null }
export function parseEscrowRequired(text: string): EscrowTerms | null { if (verb(text) !== "ESCROW_REQUIRED") return null; const round = messageRound(text); const reference = field(text, "reference"); const seller = field(text, "seller"); const amountSol = Number(field(text, "amount")); const deadlineSecs = Number(field(text, "deadline")); const settlement = field(text, "settlement") as EscrowTerms["settlement"]; return round && reference && seller && Number.isFinite(amountSol) && Number.isFinite(deadlineSecs) ? { round, reference, seller, amountSol, deadlineSecs, settlement } : null }
export function parseDeposited(text: string): Deposited | null { if (verb(text) !== "DEPOSITED") return null; const round = messageRound(text); const reference = field(text, "reference"); const buyer = field(text, "buyer"); const sig = field(text, "sig"); const settlement = field(text, "settlement") as Deposited["settlement"]; return round && reference && buyer && sig ? { round, reference, buyer, sig, settlement, vault: field(text, "vault"), arbiter: field(text, "arbiter") } : null }
export function selectBids(bids: Bid[], round: number): Bid[] { return bids.filter((bid) => bid.round === round && Number.isFinite(bid.priceSol)) }
export function pickCheapest(bids: Bid[]): Bid | null { return bids.reduce<Bid | null>((best, bid) => !best || bid.priceSol < best.priceSol ? bid : best, null) }

export async function startCoralAgent(_opts: { agentName: string }, fn: (ctx: CoralAgentContext) => Promise<void>): Promise<void> {
  const ctx: CoralAgentContext = {
    async waitForMention() { return null },
    async waitForAgent() {},
    async createThread(name) { return name },
    async send(text) { console.error(`[coral-stub] send ${text}`) },
    async reply(_message, text) { console.error(`[coral-stub] reply ${text}`) },
  }
  await fn(ctx)
}