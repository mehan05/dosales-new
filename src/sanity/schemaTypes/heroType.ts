import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      title: 'Eyebrow Text',
      type: 'string',
      initialValue: 'Stop Chasing Leads!'
    }),
    defineField({
      name: 'headlineTop',
      type: 'string',
      initialValue: 'Turn your Ideal Customer Profile into a'
    }),
    defineField({
      name: 'headlineAccent',
      type: 'string',
      initialValue: 'Automated Outreach'
    }),
    defineField({
      name: 'description',
      type: 'text',
      initialValue: 'DoSales automates lead discovery, outreach, and lead qualification with DoSales AI. Hand over only sales-ready prospects and your sales team focuses on Revenue and Closing.'
    }),
    defineField({
      name: 'badgeText',
      title: 'Badge Text (Status)',
      type: 'string',
      initialValue: 'Early Access Live - Limited Spots available'
    }),
    defineField({
      name: 'dashboardImage',
      title: 'Dashboard Mockup Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      type: 'string',
      initialValue: 'REGISTER NOW'
    }),
    defineField({
      name: 'ctaLink',
      type: 'string',
    }),
    defineField({
      name: 'stats',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', type: 'string' },
            { name: 'label', type: 'string' }
          ]
        }
      ]
    }),
  ],
})
