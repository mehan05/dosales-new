import { defineField, defineType } from 'sanity'

export const whyDoSalesType = defineType({
  name: 'whyDoSales',
  title: 'Why DoSales Section',
  type: 'document',
  fields: [
    defineField({
      name: 'eyebrow',
      type: 'string',
      initialValue: 'Why DoSales'
    }),
    defineField({
      name: 'heading',
      type: 'string',
      initialValue: 'Built exclusively for your market'
    }),
    defineField({
      name: 'features',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text' },
            { name: 'image', type: 'image' },
            { name: 'icon', type: 'image', title: 'Feature Icon/Image' }
          ]
        }
      ]
    }),
  ],
})
