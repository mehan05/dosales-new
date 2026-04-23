import { defineField, defineType } from 'sanity'

export const radarType = defineType({
  name: 'radar',
  title: 'Radar Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Data Sources'
    }),
    defineField({
      name: 'icons',
      title: 'Radar Icons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'image', type: 'image' },
            { name: 'title', type: 'string' },
            { name: 'description', type: 'string' },
            { name: 'bottom', type: 'string', description: 'Percentage, e.g. 50%' },
            { name: 'left', type: 'string', description: 'Percentage, e.g. 50%' },
            { 
              name: 'pSide', 
              type: 'string', 
              options: { list: ['top', 'bottom', 'left', 'right'] },
              initialValue: 'top'
            }
          ]
        }
      ]
    }),
  ],
})
