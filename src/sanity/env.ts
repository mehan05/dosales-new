export const apiVersion =
  import.meta.env.PUBLIC_SANITY_API_VERSION || 
  import.meta.env.NEXT_PUBLIC_SANITY_API_VERSION || 
  '2025-05-10'

export const dataset = assertValue(
  import.meta.env.PUBLIC_SANITY_DATASET || import.meta.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: PUBLIC_SANITY_DATASET'
)

export const projectId = assertValue(
  import.meta.env.PUBLIC_SANITY_PROJECT_ID || import.meta.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: PUBLIC_SANITY_PROJECT_ID'
)

export const studioUrl = '/admin'

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }

  return v
}
