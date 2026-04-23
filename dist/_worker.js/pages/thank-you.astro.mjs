globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, l as renderComponent, o as renderScript, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bu7p-cgi.mjs';
import { $ as $$Layout, c as client } from '../chunks/astro-client_BBQB_sd6.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DORRZ_O8.mjs';

const $$ThankYou = createComponent(async ($$result, $$props, $$slots) => {
  async function getSettings() {
    try {
      return await client.fetch(`*[_type == "settings"][0]`);
    } catch (error) {
      if (error?.statusCode === 500) throw error;
      return {};
    }
  }
  const settings = await getSettings();
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Thank You \u2014 DoSales", "description": "Your demo has been successfully scheduled.", "settings": settings }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="main-content" class="flex-1 flex flex-col items-center justify-center pt-40 pb-20 px-4"> <div class="w-full max-w-2xl text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000"> <!-- Success Icon --> <div class="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"> <svg class="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path> </svg> </div> <h1 class="text-4xl md:text-6xl font-bold text-gray-900 tracking-tight font-satoshi">
Demo Scheduled!
</h1> <p class="text-lg md:text-xl text-gray-600 max-w-md mx-auto leading-relaxed">
Your demo has been scheduled. Check your inbox for the calendar invitation and meeting details.
</p> <div class="pt-10 flex flex-col sm:flex-row items-center justify-center gap-4"> <a href="/" class="inline-flex items-center justify-center h-12 px-8 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800 transition-colors shadow-lg">
Back to Home
</a> <a href="#features" class="text-gray-600 hover:text-black font-medium inline-flex items-center gap-2">
Explore Features
<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg> </a> </div> </div> </main> ` })} ${renderScript($$result, "/home/mehan/Step_7/dosales-landing/src/pages/thank-you.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/mehan/Step_7/dosales-landing/src/pages/thank-you.astro", void 0);

const $$file = "/home/mehan/Step_7/dosales-landing/src/pages/thank-you.astro";
const $$url = "/thank-you";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ThankYou,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
