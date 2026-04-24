globalThis.process ??= {}; globalThis.process.env ??= {};
import { f as createComponent, k as renderHead, l as renderComponent, r as renderTemplate } from '../chunks/astro/server_Bu7p-cgi.mjs';
/* empty css                                 */
import { j as jsxRuntimeExports, m as motion } from '../chunks/proxy_DOIbYyR2.mjs';
import { a as reactExports } from '../chunks/_@astro-renderers_DORRZ_O8.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DORRZ_O8.mjs';
import { C as Canvas, a as CircuitFloor, D as Digit, S as Stadium, F as Flag, H as Helipad, b as HelicopterController, V as Vector3, c as FloatingSemi, R as Radar, T as TrackTunnel, d as Spaceship, e as FloatingOrb, P as Pad } from '../chunks/Helicopter_DpbA9QHD.mjs';
/* empty css                               */

function Three404() {
  reactExports.useEffect(() => {
    window.dispatchEvent(new CustomEvent("three-404-ready"));
  }, []);
  const pads = reactExports.useMemo(() => [
    { pos: [-16, 0.02, -10], size: 1.2 },
    { pos: [-12, 0.02, -12], size: 0.9 },
    { pos: [14, 0.02, -11], size: 1.5 },
    { pos: [16, 0.02, -8], size: 1 },
    { pos: [-15, 0.02, 8], size: 1.3 },
    { pos: [12, 0.02, 9], size: 1.1 },
    { pos: [18, 0.02, 0], size: 1.4 },
    { pos: [5, 0.02, -13], size: 0.8 }
  ], []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-screen  relative overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Canvas,
    {
      gl: { alpha: true, antialias: true },
      camera: { position: [-25, 25, 25], fov: 25 },
      dpr: [1, 2],
      shadows: true,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("directionalLight", { position: [10, 20, 10], intensity: 2.5, castShadow: true }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ambientLight", { intensity: 0.5 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CircuitFloor, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Suspense, { fallback: null, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, 0, 0], children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Digit, { value: "4", position: [-6.5, 0.1, 0], color: "#f5da07", delay: 0.1 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Stadium, { delay: 0.3, scale: 1.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { position: [-1.2, 0.8, -1.2], delay: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { position: [0, 0.8, 1.5], delay: 0.7 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Flag, { position: [1.2, 0.8, -1.2], delay: 0.9 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Digit, { value: "4", position: [6.5, 0.4, 0], color: "#f1542d", delay: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Helipad, { position: [7.3, 1, 2.1], delay: 0.5 }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Helipad, { position: [-15, 2.1, -2], radius: 2, delay: 0, oscillate: false }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              HelicopterController,
              {
                targetPos: new Vector3(7.3, 1, 2.1),
                basePos: new Vector3(-15, 2.1, -2)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingSemi, { position: [-5.5, 0, 5.5], delay: 0 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingSemi, { position: [5.5, 0, 5.5], delay: 0.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("group", { position: [0, 2.4, 7.2], scale: 0.4, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              TrackTunnel,
              {
                start: new Vector3(100, 0.02, 12),
                end: new Vector3(-100, 0.02, 12)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Spaceship,
              {
                start: new Vector3(100, 0.02, 12),
                end: new Vector3(-100, 0.02, 12)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOrb, { position: [-10, 4, -5], speed: 0.8, delay: 0, size: 0.4 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOrb, { position: [8, 6, -8], speed: 0.6, delay: 1, size: 0.3 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOrb, { position: [-12, 3, 6], speed: 0.9, delay: 2, size: 0.5 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOrb, { position: [14, 5, 2], speed: 0.7, delay: 3, size: 0.2 }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(FloatingOrb, { position: [0, 8, -15], speed: 0.5, delay: 4, size: 0.6 }),
          pads.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Pad, { position: p.pos, size: p.size, delay: i * 0.2 }, i))
        ] })
      ]
    }
  ) });
}

function Page404() {
  const [loadingStage, setLoadingStage] = reactExports.useState("loading");
  reactExports.useEffect(() => {
    const fadeTimer = setTimeout(() => setLoadingStage("fading"), 100);
    const removeTimer = setTimeout(() => setLoadingStage("gone"), 800);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 w-full h-full bg-[var(--blue-deep)] font-inter overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-[3] ", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "w-full h-full text-white/5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("pattern", { id: "hero-grid-404", x: "0", y: "0", width: "76", height: "76", patternUnits: "userSpaceOnUse", children: /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "5", y: "5", width: "66", height: "66", rx: "12", ry: "12", fill: "currentColor", fillOpacity: "1" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "100%", height: "100%", fill: "url(#hero-grid-404)" })
    ] }) }) }),
    loadingStage !== "gone" && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: `fixed inset-0 bg-[var(--blue-deep)] z-[100] flex items-center justify-center transition-opacity duration-700 pointer-events-none ${loadingStage === "loading" ? "opacity-100" : "opacity-0"}`,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 border-[3px] border-white/15 border-t-white rounded-full animate-spin" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 w-screen h-screen cursor-grab active:cursor-grabbing z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Three404, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "fixed inset-0 pointer-events-none z-20 flex flex-col p-[20px_22px] sm:p-[36px_56px]", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute top-0 left-0 right-0 p-[inherit] flex justify-between items-start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] },
            className: "flex flex-col pointer-events-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[32px] sm:text-[40px] font-black leading-none tracking-tight", children: "404" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-white text-[10px] sm:text-[12px] font-bold tracking-[0.3em] opacity-70 -mt-1 ml-1", children: "PAGE" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] },
            className: "pointer-events-auto pt-2",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "a",
              {
                href: "/#footer",
                className: "px-6 py-2 border border-white/20 rounded-full text-white text-[13px] font-semibold hover:bg-white/10 transition-all duration-300",
                children: "Contact us"
              }
            )
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-[100px] sm:pt-[120px] pb-5 max-w-[600px]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 30 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.4, ease: [0.21, 0.47, 0.32, 0.98] },
            className: "text-white text-[36px] sm:text-[clamp(48px,6vw,78px)] font-bold leading-[1.1] mb-3 tracking-[-0.02em]",
            children: [
              "Something's",
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "missing."
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.a,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] },
            href: "/",
            className: "text-[var(--yellow)] underline text-lg font-bold pointer-events-auto inline-flex items-center transition-all duration-[250ms] hover:opacity-80 hover:translate-x-1",
            children: "Go back home"
          }
        )
      ] })
    ] })
  ] });
}

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`<html lang="en" data-astro-cid-zetdm5md> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>404 - Something's Missing | DoSales</title><meta name="description" content="Oops! The page you are looking for doesn't exist. Return home or contact DoSales."><link rel="icon" type="image/svg+xml" href="/logos/dosales-logo.svg"><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet">${renderHead()}</head> <body data-astro-cid-zetdm5md> ${renderComponent($$result, "Page404", Page404, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/mehan/Step_7/dosales-landing/src/components/404/Page404", "client:component-export": "default", "data-astro-cid-zetdm5md": true })} </body></html>`;
}, "/home/mehan/Step_7/dosales-landing/src/pages/404.astro", void 0);

const $$file = "/home/mehan/Step_7/dosales-landing/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
