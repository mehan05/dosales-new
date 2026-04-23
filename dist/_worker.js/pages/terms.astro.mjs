globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, l as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_Bu7p-cgi.mjs';
import { $ as $$Layout, c as client } from '../chunks/astro-client_CTYSy9NU.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DORRZ_O8.mjs';

const $$Terms = createComponent(async ($$result, $$props, $$slots) => {
  async function getGlobalData() {
    try {
      const query = `*[_type == "settings"][0]`;
      return await client.fetch(query);
    } catch (error) {
      if (error?.statusCode === 500) throw error;
      return {};
    }
  }
  const remoteSettings = await getGlobalData();
  const settings = remoteSettings || {};
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Terms of Service | ${settings.siteTitle || "DoSales"}`, "description": "Read about our terms and conditions for using the DoSales platform.", "settings": settings }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="main-content" class="flex-1 relative pt-32 pb-20 px-4 md:px-[60px] overflow-hidden"> <!-- Background Grid & Glows --> <div class="absolute inset-0 z-0 pointer-events-none overflow-hidden"> <div class="absolute inset-0 z-[3] mask-[radial-gradient(circle_at_50%_40%,black_0%,transparent_70%)]"> <svg class="w-full h-full opacity-30"> <defs> <pattern id="terms-grid" x="0" y="0" width="76" height="76" patternUnits="userSpaceOnUse"> <rect x="5" y="5" width="66" height="66" rx="12" ry="12" fill="#FAFDFF33" fill-opacity="0.7"></rect> </pattern> </defs> <rect width="100%" height="100%" fill="url(#terms-grid)"></rect> </svg> </div> <div class="absolute z-[2] rounded-full w-[800px] h-[800px] -top-[20%] -left-[10%] bg-[radial-gradient(circle_at_center,_#76B1C5_0%,_#B9E6FE_70%,_transparent_100%)] blur-[150px] opacity-50"></div> <div class="absolute z-[1] rounded-full w-[800px] h-[800px] top-[10%] -right-[15%] bg-[radial-gradient(circle_at_center,_#9b87f5_0%,_#7c3aed_70%,_transparent_100%)] blur-[250px] opacity-40"></div> <div class="absolute z-[0] rounded-full w-full h-[600px] -top-[10%] left-0 bg-[radial-gradient(ellipse_at_center,_#CDDBFE_0%,_#F0F9FF_60%,_transparent_100%)] blur-[180px] opacity-30"></div> </div> <div class="max-w-[1360px] mx-auto relative z-10 w-full"> <div class="backdrop-blur-2xl bg-white/60 rounded-[20px] md:rounded-[32px] border-2 border-white shadow-[0px_12px_44px_rgba(0,0,0,0.06)] px-4 pb-4 pt-10 md:px-28 md:py-24"> <h1 class="text-[42px] md:text-[52px] font-sans font-bold text-[var(--color-text-primary)] mb-12 tracking-tight leading-none font-satoshi">
Terms of Service
</h1> <div class="prose prose-slate max-w-none font-satoshi flex flex-col gap-12"> <section> <p class="text-[18px] leading-[1.6] text-[var(--color-text-primary)] font-medium">
The User shall be deemed to have accepted and agreed to the following terms and conditions upon accessing and using the website <a href="http://www.dosales.com" class="text-[var(--color-brand)] font-bold">www.dosales.com</a> (the “Site”), operated by Dosales.
</p> </section> <div class="flex flex-col gap-14"> <!-- Definitions --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Definitions</h3> <div class="flex flex-col gap-4"> <div class="flex items-center gap-4"> <div class="flex-shrink-0 w-1.5 h-1.5 bg-[#0284C7]"></div> <p class="text-[17px] text-[var(--color-text-secondary)]">The term “User” refers to any individual or entity accessing, browsing, or using the Site.</p> </div> <div class="flex items-center gap-4"> <div class="flex-shrink-0 w-1.5 h-1.5 bg-[#0284C7]"></div> <p class="text-[17px] text-[var(--color-text-secondary)]">The term “Dosales” refers to the owner and operator of the website.</p> </div> </div> </section> <!-- Ownership of Content --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Ownership of Content</h3> <p class="text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
All content present on this Site, including but not limited to software, text, images, graphics, videos, and audio, is the exclusive property of Dosales or its licensors and is protected under applicable intellectual property laws.
</p> </section> <!-- Trademarks --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Trademarks</h3> <p class="text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
The Dosales name, logo, and associated branding elements are trademarks owned by Dosales. These may not be used, reproduced, or distributed without prior written consent.
</p> </section> <!-- Use of Website --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Use of Website</h3> <p class="text-[17px] text-[var(--color-text-secondary)] mb-6">By using this Site, the User agrees to:</p> <div class="flex flex-col gap-4"> ${[
    "Use the Site only for lawful purposes",
    "Not copy, reproduce, distribute, or modify any content without permission",
    "Not attempt to gain unauthorized access to any part of the Site"
  ].map((item) => renderTemplate`<div class="flex items-center gap-4"> <div class="flex-shrink-0 w-1.5 h-1.5 bg-[#0284C7]"></div> <p class="text-[17px] text-[var(--color-text-secondary)]">${item}</p> </div>`)} </div> <p class="text-[17px] mt-6 text-[var(--color-text-secondary)]">Unauthorized use may result in legal action under applicable laws.</p> </section> <!-- Modifications to Terms --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Modifications to Terms</h3> <p class="text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
Dosales reserves the right to revise or update these terms at any time without prior notice. Continued use of the Site constitutes acceptance of the updated terms.
</p> </section> <!-- Disclaimer of Warranties --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Disclaimer of Warranties</h3> <p class="text-[17px] text-[var(--color-text-secondary)] mb-4">The Site and all content, materials, and services are provided on an “as is” and “as available” basis.</p> <p class="text-[17px] text-[var(--color-text-secondary)] mb-6">Dosales makes no warranties, express or implied, including but not limited to:</p> <div class="flex flex-col gap-4"> ${[
    "Accuracy or completeness of information",
    "Fitness for a particular purpose",
    "Uninterrupted or error-free operation"
  ].map((item) => renderTemplate`<div class="flex items-center gap-4"> <div class="flex-shrink-0 w-1.5 h-1.5 bg-[#0284C7]"></div> <p class="text-[17px] text-[var(--color-text-secondary)]">${item}</p> </div>`)} </div> </section> <!-- Limitation of Liability --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Limitation of Liability</h3> <p class="text-[17px] text-[var(--color-text-secondary)] mb-6">Dosales shall not be liable for any direct, indirect, incidental, or consequential damages, including but not limited to:</p> <div class="flex flex-col gap-4 mb-6"> ${[
    "Loss of data",
    "Loss of business or profits",
    "System failures"
  ].map((item) => renderTemplate`<div class="flex items-center gap-4"> <div class="flex-shrink-0 w-1.5 h-1.5 bg-[#0284C7]"></div> <p class="text-[17px] text-[var(--color-text-secondary)]">${item}</p> </div>`)} </div> <p class="text-[17px] text-[var(--color-text-secondary)] italic">arising from the use or inability to use the Site.</p> </section> <!-- Data and Security --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Data and Security</h3> <p class="text-[17px] leading-[1.6] text-[var(--color-text-secondary)]">
Dosales does not guarantee that the Site will be free from viruses or harmful components. Users are responsible for ensuring adequate protection of their systems.
</p> </section> <!-- Third-Party Links --> <section> <h3 class="text-[22px] font-bold text-[var(--color-text-primary)] mb-4">Third-Party Links</h3> <p class="text-[17px] text-[var(--color-text-secondary)] mb-6">The Site may include links to third-party websites. Dosales is not responsible for:</p> <div class="flex flex-col gap-4 mb-6"> ${[
    "The content of such websites",
    "Their privacy practices",
    "Any damages arising from their use"
  ].map((item) => renderTemplate`<div class="flex items-center gap-4"> <div class="flex-shrink-0 w-1.5 h-1.5 bg-[#0284C7]"></div> <p class="text-[17px] text-[var(--color-text-secondary)]">${item}</p> </div>`)} </div> <p class="text-[17px] text-[var(--color-text-secondary)]">Users are advised to review third-party policies before engaging with them.</p> </section> <div class="grid grid-cols-1 md:grid-cols-2 gap-10"> <!-- Termination --> <section> <h3 class="text-[20px] font-bold text-[var(--color-text-primary)] mb-3">Termination</h3> <p class="text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
Dosales reserves the right to terminate or restrict User access to the Site at any time, without notice, for any reason.
</p> </section> <!-- Indemnification --> <section> <h3 class="text-[20px] font-bold text-[var(--color-text-primary)] mb-3">Indemnification</h3> <p class="text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
The User agrees to indemnify and hold Dosales harmless from any claims, damages, or expenses arising out of misuse of the Site or violation of these terms.
</p> </section> <!-- Changes to the Website --> <section> <h3 class="text-[20px] font-bold text-[var(--color-text-primary)] mb-3">Changes to the Website</h3> <p class="text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
Dosales may modify, suspend, or discontinue any part of the Site, including content or features, at any time without notice.
</p> </section> <!-- Governing Law --> <section> <h3 class="text-[20px] font-bold text-[var(--color-text-primary)] mb-3">Governing Law</h3> <p class="text-[16px] leading-[1.6] text-[var(--color-text-secondary)]">
These terms shall be governed by and construed in accordance with the laws applicable in the jurisdiction of operation.
</p> </section> </div> </div> <p class="text-center italic text-[14px] text-[var(--color-text-secondary)] mt-10">
Update: Continued use of the Site shall constitute your acceptance of any revisions made to these terms.
</p> </div> </div> </div> </main> ` })}`;
}, "/home/mehan/Step_7/calibraint/dosales-landing/src/pages/terms.astro", void 0);

const $$file = "/home/mehan/Step_7/calibraint/dosales-landing/src/pages/terms.astro";
const $$url = "/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
