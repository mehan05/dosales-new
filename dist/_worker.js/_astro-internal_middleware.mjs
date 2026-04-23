globalThis.process ??= {}; globalThis.process.env ??= {};
import { d as defineMiddleware, s as sequence } from './chunks/index_DSye9KUq.mjs';
import './chunks/astro-designed-error-pages_T8MVGUFj.mjs';
import './chunks/astro/server_Bu7p-cgi.mjs';

const onRequest$2 = defineMiddleware(async (context, next) => {
  try {
    const response = await next();
    if (response.status === 500 && context.url.pathname !== "/500") {
      console.error(`[Middleware] 500 Response detected for ${context.url.pathname}. Rewriting to /500.`);
      return context.rewrite("/500");
    }
    return response;
  } catch (error) {
    if (context.url.pathname === "/500") {
      throw error;
    }
    console.error(`[Middleware] Unhandled error for ${context.url.pathname}:`, error);
    return context.rewrite("/500");
  }
});

const onRequest$1 = (context, next) => {
  if (context.isPrerendered) {
    context.locals.runtime ??= {
      env: process.env
    };
  }
  return next();
};

const onRequest = sequence(
	onRequest$1,
	onRequest$2
	
);

export { onRequest };
