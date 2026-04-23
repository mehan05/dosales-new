import { createClient } from '@sanity/client';
import { apiVersion, dataset, projectId } from './env';

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // Use CDN by default for better performance
});

/**
 * Hardened fetch utility with 5s timeout and 1-retry logic
 */
export const client = {
  ...sanityClient,
  fetch: async (query: string, params = {}, options = {}) => {
    const timeout = 5000;
    const retryDelay = 500;
    
    const executeFetch = async (attempt: number = 0): Promise<any> => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), timeout);

      try {
        const result = await sanityClient.fetch(query, params, {
          ...options,
          signal: controller.signal,
        });
        clearTimeout(id);
        return result;
      } catch (error: any) {
        clearTimeout(id);
        
        const isTimeout = error.name === 'AbortError';
        const isServerError = error.statusCode >= 500;
        
        if ((isTimeout || isServerError) && attempt < 1) {
          console.warn(`Sanity fetch attempt ${attempt + 1} failed. Retrying in ${retryDelay}ms...`);
          await new Promise(resolve => setTimeout(resolve, retryDelay));
          return executeFetch(attempt + 1);
        }
        
        throw error;
      }
    };

    return executeFetch();
  }
};
