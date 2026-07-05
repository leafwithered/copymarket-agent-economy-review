import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { deliverService } from './service.js'

describe('deliverService copyrescue routing', () => {
  beforeEach(() => {
    delete process.env.ANTHROPIC_API_KEY
    delete process.env.OPENAI_API_KEY
    delete process.env.LLM_PROVIDER
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('rejects legacy generic services', async () => {
    const out = JSON.parse(await deliverService('coingecko eth'))
    expect(out).toEqual({ error: 'unsupported service', service: 'coingecko', supported: ['copyrescue'] })
  })

  it('returns a deterministic copy rescue without a live LLM key', async () => {
    const out = JSON.parse(await deliverService('copyrescue crypto wallet landing page'))
    expect(out).toMatchObject({
      service: 'copyrescue',
      audience: 'crypto',
      generatedBy: 'deterministic',
    })
    expect(out.hero.headline).toContain('crypto')
    expect(out.sections).toHaveLength(3)
    expect(out.conversionNotes).toHaveLength(3)
    expect(out.riskControls[0]).toContain('No guaranteed')
  })

  it('normalizes a live LLM JSON rescue', async () => {
    process.env.LLM_PROVIDER = 'openai'
    process.env.OPENAI_API_KEY = 'test'
    global.fetch = vi.fn(async () => ({
      ok: true,
      json: async () => ({
        choices: [{
          message: {
            content: JSON.stringify({
              audience: 'fintech',
              currentIssue: 'The offer is credible but the first screen hides the buyer outcome.',
              hero: {
                headline: 'Move money across borders without mystery steps',
                subheadline: 'Show settlement speed, corridor coverage, and user control before the first CTA.',
                cta: 'Review the payment flow',
              },
              sections: [
                { title: 'Corridor clarity', copy: 'Name where money can move and how fast.' },
                { title: 'Control', copy: 'Explain what users approve before money moves.' },
                { title: 'Proof', copy: 'Place volume and settlement proof beside the CTA.' },
              ],
              conversionNotes: ['Use one CTA.', 'Show proof earlier.', 'Clarify the next step.'],
              riskControls: ['Avoid investment claims.', 'Keep fees factual.', 'Clarify custody.'],
            }),
          },
        }],
      }),
    })) as unknown as typeof fetch

    const out = JSON.parse(await deliverService('copyrescue fintech payments page'))
    expect(out).toMatchObject({
      service: 'copyrescue',
      audience: 'fintech',
      generatedBy: 'llm',
    })
    expect(out.hero.cta).toBe('Review the payment flow')
    expect(out.sections).toHaveLength(3)
  })
})
