import { defineField, defineType } from 'sanity'

export const demoType = defineType({
  name: 'demo',
  title: 'AI Agent Demo Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      type: 'string',
      initialValue: 'From Ideal\nProspects to\nBooked Meetings\n- Automatically'
    }),
    defineField({
      name: 'subheading',
      type: 'text',
      initialValue: 'From ICP targeting to follow-ups, DoSales handles the entire outbound process. So your team spends time closing, not chasing.'
    }),
    defineField({
      name: 'promptPlaceholder',
      type: 'string',
    }),
    defineField({
      name: 'typingAnimationText',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'buttonText',
      type: 'string',
    }),
    defineField({
      name: 'mockupImage',
      title: 'Discovery Search Mockup Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
