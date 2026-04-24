globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../../chunks/astro/server_Bu7p-cgi.mjs';
export { r as renderers } from '../../chunks/_@astro-renderers_DORRZ_O8.mjs';

const prerender = false;
const $$ = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>DoSales Admin | Sanity Studio</title>${renderHead()}</head> <body style="margin: 0; padding: 0;"> ${renderComponent($$result, "SanityStudio", null, { "client:only": "react", "client:component-hydration": "only", "client:component-path": "/home/mehan/Step_7/dosales-landing/src/components/SanityStudio", "client:component-export": "default" })} </body></html>`;
}, "/home/mehan/Step_7/dosales-landing/src/pages/admin/[...index].astro", void 0);

const $$file = "/home/mehan/Step_7/dosales-landing/src/pages/admin/[...index].astro";
const $$url = "/admin/[...index]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
