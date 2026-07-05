/**
 * CopyMarket seller service.
 *
 * The agent sells a compact landing-page copy rescue: a clearer hero, sharper CTA, rewritten offer
 * sections, and conversion notes. It is deterministic without an LLM key, but uses the runtime LLM when
 * one is configured. The settlement rails stay the same: the buyer pays through devnet escrow and
 * receives this structured delivery only after DEPOSITED.
 */
import { complete, parseJsonReply } from '@pay/agent-runtime'

type CopyRescue = {
  service: 'copyrescue'
  request: string
  audience: string
  currentIssue: string
  hero: {
    headline: string
    subheadline: string
    cta: string
  }
  sections: Array<{
    title: string
    copy: string
  }>
  conversionNotes: string[]
  riskControls: string[]
  generatedBy: 'llm' | 'deterministic'
  timestamp: string
}

export async function deliverService(request: string): Promise<string> {
  const [first, ...rest] = request.trim().split(/\s+/).filter(Boolean)
  const service = (first ?? 'copyrescue').toLowerCase()
  if (service !== 'copyrescue') {
    return JSON.stringify({ error: 'unsupported service', service, supported: ['copyrescue'] })
  }
  return copyRescue(rest.join(' '))
}

async function copyRescue(rawRequest: string): Promise<string> {
  const request = rawRequest.trim() || 'crypto SaaS landing page that needs a clearer first screen'
  const deterministic = deterministicRescue(request)

  try {
    const text = await complete({
      system:
        'You are a senior landing-page copywriter selling a paid copy rescue through an escrowed agent market. ' +
        'Reply only with JSON matching this shape: {"audience": string, "currentIssue": string, ' +
        '"hero": {"headline": string, "subheadline": string, "cta": string}, ' +
        '"sections": [{"title": string, "copy": string}], "conversionNotes": string[], "riskControls": string[]}. ' +
        'Do not promise guaranteed revenue, token price, rankings, or investment returns.',
      user:
        `Create a compact landing-page copy rescue for this buyer request: ${request}. ` +
        'Make it useful for a crypto, fintech, SaaS, or cross-border business. Include exactly 3 sections, ' +
        '3 conversion notes, and 3 risk controls.',
      maxTokens: 700,
    })
    const parsed = parseJsonReply<Partial<CopyRescue>>(text)
    if (!parsed?.hero || !Array.isArray(parsed.sections)) return JSON.stringify(deterministic)
    return JSON.stringify(normalizeRescue(request, parsed, 'llm'))
  } catch {
    return JSON.stringify(deterministic)
  }
}

function normalizeRescue(
  request: string,
  value: Partial<CopyRescue>,
  generatedBy: CopyRescue['generatedBy'],
): CopyRescue {
  const fallback = deterministicRescue(request)
  return {
    service: 'copyrescue',
    request,
    audience: clean(value.audience, fallback.audience),
    currentIssue: clean(value.currentIssue, fallback.currentIssue),
    hero: {
      headline: clean(value.hero?.headline, fallback.hero.headline),
      subheadline: clean(value.hero?.subheadline, fallback.hero.subheadline),
      cta: clean(value.hero?.cta, fallback.hero.cta),
    },
    sections: normalizeSections(value.sections, fallback.sections),
    conversionNotes: normalizeList(value.conversionNotes, fallback.conversionNotes, 3),
    riskControls: normalizeList(value.riskControls, fallback.riskControls, 3),
    generatedBy,
    timestamp: new Date().toISOString(),
  }
}

function deterministicRescue(request: string): CopyRescue {
  const audience = inferAudience(request)
  return {
    service: 'copyrescue',
    request,
    audience,
    currentIssue:
      'The first screen is likely asking visitors to decode the product before they see the outcome, proof, and next step.',
    hero: {
      headline: `Turn ${audience} visitors into qualified actions faster`,
      subheadline:
        'Clarify the offer, remove trust friction, and show exactly what happens after the first click.',
      cta: 'Get the 48h copy rescue',
    },
    sections: [
      {
        title: 'Outcome first',
        copy:
          'Lead with the business result visitors can understand in five seconds, then support it with product mechanics.',
      },
      {
        title: 'Trust path',
        copy:
          'Explain what users share, what they keep control of, and which proof points make the decision feel safe.',
      },
      {
        title: 'Action flow',
        copy:
          'Use one primary CTA, a short expectation-setting line, and a second proof point directly beside the action.',
      },
    ],
    conversionNotes: [
      'Move the strongest quantified proof above the first scroll.',
      'Replace abstract category language with a concrete user action.',
      'Put risk-reducing copy next to the primary CTA, not only in the FAQ.',
    ],
    riskControls: [
      'No guaranteed revenue, ranking, token-price, or investment claims.',
      'Keep compliance-sensitive wording factual and verifiable.',
      'Use user-control language when payments, wallets, or personal data are involved.',
    ],
    generatedBy: 'deterministic',
    timestamp: new Date().toISOString(),
  }
}

function inferAudience(request: string): string {
  const lower = request.toLowerCase()
  if (lower.includes('fintech') || lower.includes('payment')) return 'fintech'
  if (lower.includes('crypto') || lower.includes('wallet') || lower.includes('defi')) return 'crypto'
  if (lower.includes('saas')) return 'SaaS'
  return 'B2B'
}

function clean(value: unknown, fallback: string): string {
  return typeof value === 'string' && value.trim() ? value.trim().slice(0, 320) : fallback
}

function normalizeList(value: unknown, fallback: string[], count: number): string[] {
  if (!Array.isArray(value)) return fallback.slice(0, count)
  const cleaned = value.map((item) => clean(item, '')).filter(Boolean)
  return cleaned.length ? cleaned.slice(0, count) : fallback.slice(0, count)
}

function normalizeSections(value: unknown, fallback: CopyRescue['sections']): CopyRescue['sections'] {
  if (!Array.isArray(value)) return fallback
  const cleaned = value.map((section) => ({
    title: clean((section as { title?: unknown }).title, ''),
    copy: clean((section as { copy?: unknown }).copy, ''),
  })).filter((section) => section.title && section.copy)
  return cleaned.length ? cleaned.slice(0, 3) : fallback
}
