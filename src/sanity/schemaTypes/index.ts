import { type SchemaTypeDefinition } from 'sanity'
import { heroType } from './heroType'
import { whyDoSalesType } from './whyDoSalesType'
import { testimonialType } from './testimonialType'
import { platformType } from './platformType'
import { pageType } from './pageType'
import { demoType } from './demoType'
import { globeType } from './globeType'
import { settingsType } from './settingsType'
import { radarType } from './radarType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    heroType, 
    whyDoSalesType, 
    testimonialType, 
    platformType, 
    pageType, 
    demoType, 
    globeType,
    settingsType,
    radarType
  ],
}
