import { defineField, defineType } from 'sanity'

export const settingsType = defineType({
  name: 'settings',
  title: 'Global Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Site Title (SEO)',
      type: 'string',
      initialValue: 'DoSales — AI-Powered Sales Intelligence'
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description (SEO)',
      type: 'text',
      initialValue: 'DoSales automates lead discovery, outreach, and lead qualification with DoSales AI.'
    }),
    defineField({
      name: 'logo',
      title: 'Brand Logo',
      type: 'image',
    }),
    defineField({
      name: 'navLinks',
      title: 'Navbar Navigation Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string' },
            { name: 'href', type: 'string' }
          ]
        }
      ],
      initialValue: [
        { label: 'FEATURES', href: '#features' },
        { label: 'ABOUT', href: '#about' },
        { label: 'PRICING', href: '#pricing' }
      ]
    }),
    defineField({
      name: 'footerLinks',
      title: 'Footer Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string' },
            { name: 'href', type: 'string' }
          ]
        }
      ]
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      initialValue: '© 2024 DoSales. All rights reserved.'
    }),
  ],
})
