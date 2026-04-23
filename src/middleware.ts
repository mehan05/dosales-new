import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    const response = await next();
    
    // If the response status is 500, we show the custom 500 page
    if (response.status === 500 && context.url.pathname !== '/500') {
      console.error(`[Middleware] 500 Response detected for ${context.url.pathname}. Rewriting to /500.`);
      return context.rewrite('/500');
    }
    
    return response;
  } catch (error) {
    // If an unhandled error occurs during rendering, we show the custom 500 page
    // and avoid infinite loops if the error happens on the 500 page itself
    if (context.url.pathname === '/500') {
      throw error;
    }

    console.error(`[Middleware] Unhandled error for ${context.url.pathname}:`, error);
    return context.rewrite('/500');
  }
});
