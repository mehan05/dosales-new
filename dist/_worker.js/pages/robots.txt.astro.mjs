globalThis.process ??= {}; globalThis.process.env ??= {};
export { r as renderers } from '../chunks/_@astro-renderers_DORRZ_O8.mjs';

const robotsTxt = `
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /cart/
Disallow: /checkout/
Disallow: /*?sort=
Disallow: /*?filter=

Sitemap: https://dosales.ai/sitemap-index.xml
`.trim();
const GET = () => {
  return new Response(robotsTxt, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
