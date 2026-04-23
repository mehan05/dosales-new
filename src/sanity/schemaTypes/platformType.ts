import { defineField, defineType } from 'sanity'

export const platformType = defineType({
  name: 'platform',
  title: 'Platforms (Bento) Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      initialValue: 'Beyond just data'
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      initialValue: 'Access a worldwide network of retailers, and more from a single platform.'
    }),
    defineField({
      name: 'cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'subtitle', type: 'string' },
            { name: 'description', type: 'text' },
            { name: 'icon', type: 'string' }
          ]
        }
      ]
    }),
  ],
})
