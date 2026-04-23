import { defineField, defineType } from 'sanity'

export const pageType = defineType({
  name: 'page',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      initialValue: 'Home',
      readOnly: true,
    }),
    defineField({
      name: 'hero',
      type: 'reference',
      to: [{ type: 'hero' }],
    }),
    defineField({
      name: 'whyDoSales',
      type: 'reference',
      to: [{ type: 'whyDoSales' }],
    }),
    defineField({
      name: 'radar',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', initialValue: 'Waterfall Enrichment' },
        { name: 'heading', type: 'string', initialValue: 'Chains 10+ data providers, 85%+ match rates' },
        { name: 'description', type: 'text', initialValue: "We don't rely on a single source..." }
      ]
    }),
    defineField({
      name: 'demo',
      type: 'reference',
      to: [{ type: 'demo' }],
    }),
    defineField({
      name: 'platform',
      type: 'reference',
      to: [{ type: 'platform' }],
    }),
    defineField({
      name: 'footerCta',
      type: 'object',
      fields: [
        { name: 'eyebrow', type: 'string', initialValue: 'Upgrade your Leads' },
        { name: 'heading', type: 'string', initialValue: 'Start closing in emerging markets today' },
        { name: 'buttonText', type: 'string', initialValue: 'Get Early Access' }
      ]
    }),
  ],
})
