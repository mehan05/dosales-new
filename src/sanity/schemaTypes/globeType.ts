import { defineField, defineType } from 'sanity'

export const globeType = defineType({
  name: 'globe',
  title: 'Markets Globe',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'marketCount',
      type: 'number',
    }),
  ],
})
