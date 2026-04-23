globalThis.process ??= {}; globalThis.process.env ??= {};
import { r as renderers } from './chunks/_@astro-renderers_DORRZ_O8.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CL1DznHt.mjs';
import { manifest } from './manifest_BQD2mvky.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/500.astro.mjs');
const _page3 = () => import('./pages/admin/_---index_.astro.mjs');
const _page4 = () => import('./pages/api/revalidate.astro.mjs');
const _page5 = () => import('./pages/privacy.astro.mjs');
const _page6 = () => import('./pages/robots.txt.astro.mjs');
const _page7 = () => import('./pages/terms.astro.mjs');
const _page8 = () => import('./pages/thank-you.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/@astrojs/cloudflare/dist/entrypoints/image-endpoint.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/500.astro", _page2],
    ["src/pages/admin/[...index].astro", _page3],
    ["src/pages/api/revalidate.ts", _page4],
    ["src/pages/privacy.astro", _page5],
    ["src/pages/robots.txt.ts", _page6],
    ["src/pages/terms.astro", _page7],
    ["src/pages/thank-you.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./noop-entrypoint.mjs'),
    middleware: () => import('./_astro-internal_middleware.mjs')
});
const _args = undefined;
const _exports = createExports(_manifest);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
