import { defineField, defineType } from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      type: 'string',
      initialValue: 'Marcaus Teo'
    }),
    defineField({
      name: 'role',
      type: 'string',
      initialValue: 'VP Sales, Nium'
    }),
    defineField({
      name: 'quote',
      type: 'text',
      initialValue: 'We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.'
    }),
    defineField({
      name: 'avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
