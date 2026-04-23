globalThis.process ??= {}; globalThis.process.env ??= {};
import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate, o as renderScript, l as renderComponent } from '../chunks/astro/server_Bu7p-cgi.mjs';
import { u as urlFor$1, a as cn, t as twMerge, d as deprecatedcreateImageUrlBuilder, b as dataset, p as projectId, $ as $$Layout, c as client } from '../chunks/astro-client_BBQB_sd6.mjs';
import { M as MotionConfigContext, j as jsxRuntimeExports, i as isHTMLElement, u as useConstant, P as PresenceContext, a as usePresence, b as useIsomorphicLayoutEffect, L as LayoutGroupContext, m as motion } from '../chunks/proxy_DOIbYyR2.mjs';
import { a as reactExports, R as React } from '../chunks/_@astro-renderers_DORRZ_O8.mjs';
export { r as renderers } from '../chunks/_@astro-renderers_DORRZ_O8.mjs';

/**
 * Taken from https://github.com/radix-ui/primitives/blob/main/packages/react/compose-refs/src/compose-refs.tsx
 */
/**
 * Set a given ref to a given value
 * This utility takes care of different types of refs: callback refs and RefObject(s)
 */
function setRef(ref, value) {
    if (typeof ref === "function") {
        return ref(value);
    }
    else if (ref !== null && ref !== undefined) {
        ref.current = value;
    }
}
/**
 * A utility to compose multiple refs together
 * Accepts callback refs and RefObject(s)
 */
function composeRefs(...refs) {
    return (node) => {
        let hasCleanup = false;
        const cleanups = refs.map((ref) => {
            const cleanup = setRef(ref, node);
            if (!hasCleanup && typeof cleanup === "function") {
                hasCleanup = true;
            }
            return cleanup;
        });
        // React <19 will log an error to the console if a callback ref returns a
        // value. We don't use ref cleanups internally so this will only happen if a
        // user's ref callback returns a value, which we only expect if they are
        // using the cleanup functionality added in React 19.
        if (hasCleanup) {
            return () => {
                for (let i = 0; i < cleanups.length; i++) {
                    const cleanup = cleanups[i];
                    if (typeof cleanup === "function") {
                        cleanup();
                    }
                    else {
                        setRef(refs[i], null);
                    }
                }
            };
        }
    };
}
/**
 * A custom hook that composes multiple refs
 * Accepts callback refs and RefObject(s)
 */
function useComposedRefs(...refs) {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    return reactExports.useCallback(composeRefs(...refs), refs);
}

/**
 * Measurement functionality has to be within a separate component
 * to leverage snapshot lifecycle.
 */
class PopChildMeasure extends reactExports.Component {
    getSnapshotBeforeUpdate(prevProps) {
        const element = this.props.childRef.current;
        if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
            const parent = element.offsetParent;
            const parentWidth = isHTMLElement(parent)
                ? parent.offsetWidth || 0
                : 0;
            const parentHeight = isHTMLElement(parent)
                ? parent.offsetHeight || 0
                : 0;
            const computedStyle = getComputedStyle(element);
            const size = this.props.sizeRef.current;
            size.height = parseFloat(computedStyle.height);
            size.width = parseFloat(computedStyle.width);
            size.top = element.offsetTop;
            size.left = element.offsetLeft;
            size.right = parentWidth - size.width - size.left;
            size.bottom = parentHeight - size.height - size.top;
        }
        return null;
    }
    /**
     * Required with getSnapshotBeforeUpdate to stop React complaining.
     */
    componentDidUpdate() { }
    render() {
        return this.props.children;
    }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
    const id = reactExports.useId();
    const ref = reactExports.useRef(null);
    const size = reactExports.useRef({
        width: 0,
        height: 0,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    });
    const { nonce } = reactExports.useContext(MotionConfigContext);
    /**
     * In React 19, refs are passed via props.ref instead of element.ref.
     * We check props.ref first (React 19) and fall back to element.ref (React 18).
     */
    const childRef = children.props?.ref ??
        children?.ref;
    const composedRef = useComposedRefs(ref, childRef);
    /**
     * We create and inject a style block so we can apply this explicit
     * sizing in a non-destructive manner by just deleting the style block.
     *
     * We can't apply size via render as the measurement happens
     * in getSnapshotBeforeUpdate (post-render), likewise if we apply the
     * styles directly on the DOM node, we might be overwriting
     * styles set via the style prop.
     */
    reactExports.useInsertionEffect(() => {
        const { width, height, top, left, right, bottom } = size.current;
        if (isPresent || pop === false || !ref.current || !width || !height)
            return;
        const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
        const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
        ref.current.dataset.motionPopId = id;
        const style = document.createElement("style");
        if (nonce)
            style.nonce = nonce;
        const parent = root ?? document.head;
        parent.appendChild(style);
        if (style.sheet) {
            style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
        }
        return () => {
            ref.current?.removeAttribute("data-motion-pop-id");
            if (parent.contains(style)) {
                parent.removeChild(style);
            }
        };
    }, [isPresent]);
    return (jsxRuntimeExports.jsx(PopChildMeasure, { isPresent: isPresent, childRef: ref, sizeRef: size, pop: pop, children: pop === false
            ? children
            : reactExports.cloneElement(children, { ref: composedRef }) }));
}

const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
    const presenceChildren = useConstant(newChildrenMap);
    const id = reactExports.useId();
    let isReusedContext = true;
    let context = reactExports.useMemo(() => {
        isReusedContext = false;
        return {
            id,
            initial,
            isPresent,
            custom,
            onExitComplete: (childId) => {
                presenceChildren.set(childId, true);
                for (const isComplete of presenceChildren.values()) {
                    if (!isComplete)
                        return; // can stop searching when any is incomplete
                }
                onExitComplete && onExitComplete();
            },
            register: (childId) => {
                presenceChildren.set(childId, false);
                return () => presenceChildren.delete(childId);
            },
        };
    }, [isPresent, presenceChildren, onExitComplete]);
    /**
     * If the presence of a child affects the layout of the components around it,
     * we want to make a new context value to ensure they get re-rendered
     * so they can detect that layout change.
     */
    if (presenceAffectsLayout && isReusedContext) {
        context = { ...context };
    }
    reactExports.useMemo(() => {
        presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
    }, [isPresent]);
    /**
     * If there's no `motion` components to fire exit animations, we want to remove this
     * component immediately.
     */
    reactExports.useEffect(() => {
        !isPresent &&
            !presenceChildren.size &&
            onExitComplete &&
            onExitComplete();
    }, [isPresent]);
    children = (jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent: isPresent, anchorX: anchorX, anchorY: anchorY, root: root, children: children }));
    return (jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children: children }));
};
function newChildrenMap() {
    return new Map();
}

const getChildKey = (child) => child.key || "";
function onlyElements(children) {
    const filtered = [];
    // We use forEach here instead of map as map mutates the component key by preprending `.$`
    reactExports.Children.forEach(children, (child) => {
        if (reactExports.isValidElement(child))
            filtered.push(child);
    });
    return filtered;
}

const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender?.();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && safeToRemove?.();
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};

const $$Astro$3 = createAstro("https://dosales.ai");
const $$Hero = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Hero;
  const { data } = Astro2.props;
  const heroTitle = data?.eyebrow || "Stop Chasing Leads!";
  const headlineTop = data?.headlineTop || "Turn your Ideal Customer Profile into a";
  const headlineAccent = data?.headlineAccent || "Automated Outreach";
  const heroSubtitle = data?.description || "DoSales automates lead discovery, outreach, and lead qualification with DoSales AI. Hand-over only sales-ready prospects and your sales team focuses on Revenue and Closing.";
  const ctaText = data?.ctaText || "REGISTER NOW";
  const badgeText = data?.badgeText || "Early Access Live - Limited Spots available";
  const dashboardImage = data?.dashboardImage ? urlFor$1(data.dashboardImage).url() : "/logos/table-view.svg";
  const sectionWrapper = "relative w-full overflow-hidden";
  const contentWrapper = cn(
    "relative z-10",
    "flex flex-col items-center justify-center text-center",
    "pt-32 md:pt-[175px] px-4 sm:px-6"
  );
  const eyebrowText = "text-[24px] md:text-[36px] font-bold text-[var(--color-brand)] leading-[100%] tracking-[0] text-center mb-6";
  const headingPrimary = cn(
    "text-[28px] md:text-[39px] font-medium leading-[1.4] tracking-normal",
    "text-[var(--color-text-primary)] max-w-4xl mx-auto mb-7 text-center font-sans font-satoshi"
  );
  const headingAccent = "font-bold";
  const subheadingText = cn(
    "text-[14px] md:text-[16px] font-medium leading-[1.6] tracking-[0%] text-[var(--color-text-secondary)]",
    "max-w-xl md:max-w-2xl mx-auto text-center mb-6"
  );
  const earlyAccessBadge = cn(
    "inline-flex items-center justify-center gap-2 mb-[14px]",
    "w-full max-w-[344px] h-[34px] rounded-[20px] border border-[var(--color-accent-green-border)] bg-[var(--color-accent-green-bg)]",
    "px-3 py-[6px]"
  );
  const emailFormWrapper = "flex flex-row items-center justify-between gap-2 w-full max-w-[403px] h-[51px] mx-auto mb-[14px] bg-white rounded-[10px] shadow-[0px_4px_4px_rgba(0,0,0,0.04)] p-[6px] pl-[14px] transition-all";
  const ctaButton = cn(
    "bg-[var(--color-action)] hover:bg-[var(--color-brand-hover)] text-[var(--color-white)]",
    "w-[141px] h-[39px] px-4 rounded-[6px] font-bold text-[14px] leading-none tracking-wide text-center whitespace-nowrap cursor-pointer",
    "transition-all active:scale-95 border-none"
  );
  const secureText = "text-[16px] font-normal italic leading-[24px] text-center text-[var(--color-text-secondary)] mb-[26px]";
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(sectionWrapper, "class")}> <div class="absolute inset-0 z-[3] pointer-events-none mask-[radial-gradient(circle_at_10%_20%,black_0%,transparent_70%),radial-gradient(circle_at_90%_15%,black_0%,transparent_60%),radial-gradient(circle_at_85%_85%,black_0%,transparent_70%)]"> <svg class="w-full h-[calc(100vh-12vh)]"> <defs> <pattern id="hero-grid" x="0" y="0" width="76" height="76" patternUnits="userSpaceOnUse"> <rect x="5" y="5" width="66" height="66" rx="12" ry="12" fill="#FAFDFF33" fill-opacity="0.7"></rect> </pattern> </defs> <rect width="100%" height="100%" fill="url(#hero-grid)"></rect> </svg> </div> <div class="absolute z-[2] pointer-events-none rounded-full w-[70%] h-[70%] -top-[20%] -left-[25%] bg-[radial-gradient(circle_at_center,_#76B1C5_0%,_#B9E6FE_70%,_transparent_100%)] blur-[120px] opacity-60"></div> <div class="absolute z-[2] pointer-events-none rounded-full w-[700px] h-[700px] top-[400px] -right-[200px] bg-blue-500 blur-[434px] opacity-60"></div> <div class="absolute z-[2] pointer-events-none rounded-full w-[400px] h-[400px] top-[15%] right-[5%] bg-[radial-gradient(circle_at_center,_#CDDBFE_0%,_#B9E6FE_70%,_transparent_100%)] blur-[200px] opacity-60"></div> <div class="absolute inset-x-0 top-0 bottom-0 z-[1] pointer-events-none bg-[radial-gradient(ellipse_at_50%_40%,_#FAFDFF_0%,_transparent_40%)] opacity-80"></div> <div${addAttribute(contentWrapper, "class")}> <p${addAttribute(eyebrowText, "class")}>${heroTitle}</p> <h1${addAttribute(headingPrimary, "class")}> ${headlineTop}<br class="hidden md:block">
with <span${addAttribute(headingAccent, "class")}>${headlineAccent}</span> </h1> <p${addAttribute(subheadingText, "class")}>${heroSubtitle}</p> <div${addAttribute(earlyAccessBadge, "class")}> <div class="relative w-1.5 h-1.5 shrink-0"> <span class="absolute inset-0 rounded-full bg-[var(--color-status-success)] animate-ping opacity-25"></span> <span class="relative block w-1.5 h-1.5 rounded-full bg-[var(--color-status-success)] shadow-[0_0_5px_var(--color-status-success)]"></span> </div> <span class="text-[16px] font-medium leading-[100%] tracking-[0%] text-center whitespace-nowrap"> ${badgeText} </span> </div> <div${addAttribute(emailFormWrapper, "class")}> <input type="email" placeholder="example@email.com" class="h-[39px] flex-1 rounded-lg bg-white text-[var(--color-text-slate)] text-[14px] font-normal placeholder:text-[var(--color-text-slate)] border-none shadow-none ring-0 outline-none focus:!ring-0 focus:!outline-none"> <button${addAttribute(ctaButton, "class")} data-modal-trigger data-analytics-id="hero_register_top" data-analytics-location="hero_top"> ${ctaText} </button> </div> <p${addAttribute(secureText, "class")}>Get Free Early Access</p> </div> <div id="dashboard-mockup-container" class="relative z-10 mx-auto max-w-[1120px] px-4 lg:px-0"> <div id="dashboard-rotate-frame" class="rounded-[40px] border-2 border-white p-4 bg-[linear-gradient(89.72deg,_#E2F2F8_0.4%,_#D2DCF9_99.93%)] origin-top transition-transform duration-100 ease-out" style="transform: perspective(1200px) rotateX(25deg);"> <div class="rounded-[30px] border border-gray-200/80 shadow-2xl shadow-blue-100/40 overflow-hidden bg-white mx-auto w-full max-w-[1088px] md:h-auto lg:h-[680px]"> <div class="hidden md:block"> <img${addAttribute(dashboardImage, "src")} alt="DoSales dashboard" width="1120" height="720" loading="eager" fetchpriority="high" class="w-full h-auto object-contain scale-[1.02]"> </div> <div class="block md:hidden"> <img${addAttribute(dashboardImage, "src")} alt="DoSales dashboard mobile" width="380" height="480" loading="eager" fetchpriority="high" class="w-full h-full object-cover"> </div> </div> </div> <div class="flex flex-col items-center text-center mt-[88px] pb-[78px] md:pb-[181px] px-4"> <div class="flex flex-col md:flex-row items-center justify-center gap-10 md:gap-12 lg:gap-24 mb-[54px] w-full max-w-6xl"> <div class="flex flex-col items-center space-y-3"> <h2 class="font-sans font-bold text-[28px] md:text-[32px] text-[var(--color-brand)] uppercase leading-none">50 LEADS/MO</h2> <p class="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-text-secondary)] uppercase leading-none">FREE FOREVER</p> </div> <div class="flex flex-col items-center space-y-3"> <h2 class="font-sans font-bold text-[28px] md:text-[32px] text-[var(--color-brand)] uppercase leading-none">2 MIN</h2> <p class="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-text-secondary)] uppercase leading-none">SETUP</p> </div> <div class="flex flex-col items-center space-y-3"> <h2 class="font-sans font-bold text-[28px] md:text-[32px] text-[var(--color-brand)] uppercase leading-none">NO CARD</h2> <p class="font-sans font-medium text-[14px] md:text-[16px] text-[var(--color-text-secondary)] uppercase leading-none">REQUIRED</p> </div> </div> <div class="flex flex-col items-center space-y-4"> <button class="w-[280px] md:w-[136px] h-[52px] bg-[var(--color-text-primary)] text-white rounded-[10px] font-bold text-[14px] uppercase tracking-wider flex items-center justify-center shadow-xl active:scale-95 transition-all cursor-pointer border-none" data-modal-trigger data-analytics-id="hero_register_bottom" data-analytics-location="hero_bottom">
REGISTER NOW
</button> <div class="flex flex-row items-center justify-center gap-[10px] pt-2"> <p class="font-sans font-normal text-[16px] text-[var(--color-text-secondary)] leading-none">
Loved by 132+ existing users
</p> <div class="flex gap-[4px] items-center"> ${[...Array(5)].map((_, i) => renderTemplate`<svg${addAttribute(i, "key")} width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="url(#star_grad)" stroke="#FFB627" stroke-width="1.2" stroke-linejoin="round"></path> </svg>`)} <svg width="0" height="0" class="absolute"> <defs> <linearGradient id="star_grad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse"> <stop stop-color="#FFF282"></stop> <stop offset="1" stop-color="#FFB627"></stop> </linearGradient> </defs> </svg> </div> </div> </div> </div> </div> </section> ${renderScript($$result, "/home/mehan/Step_7/dosales-landing/src/components/sections/Hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/mehan/Step_7/dosales-landing/src/components/sections/Hero.astro", void 0);

const $$Astro$2 = createAstro("https://dosales.ai");
const $$WhyDoSales = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$WhyDoSales;
  const { data } = Astro2.props;
  const featureImages = data?.features?.map((f) => f.image ? urlFor$1(f.image).url() : null) || [];
  const eyebrow = cn(
    "inline-flex items-center justify-center text-[16px] font-medium leading-[100%] tracking-[0%] text-center text-[var(--color-brand)]",
    "w-[124px] h-[32px] rounded-[30px] border-[1.5px] border-white",
    "px-[14px] py-[5px] gap-[10px] mb-[20px] whitespace-nowrap",
    "shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)]"
  );
  const heading = cn(
    "text-[32px] md:text-[48px] font-bold leading-[1.1] md:leading-[100%] tracking-[0%] text-[var(--color-text-primary)]",
    "text-center max-w-5xl mx-auto font-satoshi"
  );
  return renderTemplate`${maybeRenderHead()}<section id="why-dosales" class="w-full bg-white flex flex-col items-center"> <div class="w-full rounded-t-[500px_120px] rounded-b-none border-t-[1px] border-t-[var(--color-accent-blue-alpha)] relative overflow-hidden shadow-[0px_12px_40px_rgba(0,0,0,0.02)] bg-[var(--color-bg-subtle)] lg:pb-[141px]"> <div class="relative z-10 w-full pt-[82px] pb-[120px] lg:pb-0 px-4 sm:px-6 flex flex-col items-center"> <p${addAttribute(cn(eyebrow, "bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)]"), "class")}>${data?.eyebrow || "Why DoSales"}</p> <h2${addAttribute(heading, "class")}> ${data?.heading || "Built exclusively for your market"} </h2> <div class="mx-auto w-full max-w-[956px] h-auto grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-0 mt-[112px] relative px-4 md:px-0"> <!-- Lines and Borders --> <div class="absolute inset-0 pointer-events-none"> <div class="md:hidden"> <div class="absolute left-0 top-[40px] w-[1px] h-[280px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute left-0 top-[400px] w-[1px] h-[700px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute right-0 top-[100px] w-[1px] h-[1000px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_10%,_rgba(239,249,254,0.4)_100%)]"></div> <div class="absolute top-0 right-0 w-[240px] h-[1px] bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute bottom-[-40px] left-10 right-10 h-[1px] bg-[linear-gradient(90deg,_rgba(136,191,247,0.1)_0%,_rgba(136,191,247,0.86)_50%,_rgba(136,191,247,0.1)_100%)]"></div> </div> <div class="hidden md:block absolute left-0 top-[80px] w-[1px] h-[280px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="hidden md:block"> <div class="absolute left-1/2 top-0 w-[1px] h-[384px] -translate-x-1/2 bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute right-0 top-0 w-[1px] h-[256px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute top-0 left-1/2 w-[800px] h-[1px] -translate-x-1/2 bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute top-[420px] left-1/2 w-[800px] h-[1px] -translate-x-1/2 bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute right-0 top-[420px] w-[1px] h-[384px] bg-[linear-gradient(180deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> <div class="absolute bottom-[-40px] left-1/2 w-[600px] h-[1px] -translate-x-1/2 bg-[linear-gradient(90deg,_rgba(136,191,247,0.86)_0%,_rgba(239,249,254,0.6)_100%)]"></div> </div> </div> <!-- Regional Dominance --> <div class="p-0 h-full"> <div class="flex flex-col items-start lg:px-8 px-4 lg:py-10 h-full relative z-10 lg:px-0 bg-[radial-gradient(100%_146.88%_at_100%_100%,_rgba(255,255,255,0.03)_0%,_rgba(3,0,20,0.01)_100%)]"> <div class="w-full flex justify-center"> <img${addAttribute(featureImages[0] || "/screens/regional-dominance.svg", "src")} alt="Regional Dominance" width="400" height="250" loading="lazy" class="w-full max-w-[400px] h-auto"> </div> <h3 class="font-sans font-bold text-[20px] leading-[30px] text-[var(--color-brand)] mb-3">Regional Dominance</h3> <p class="font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] max-w-[420px]">
Built for MENA & Southeast Asia from day one — not bolted on as an afterthought. Coverage where Apollo and ZoomInfo have blind spots.
</p> <div class="md:hidden absolute -bottom-[20px] left-1/2 -translate-x-1/2 w-[320px] h-[1px] bg-[var(--color-accent-blue-alpha)]"></div> </div> </div> <!-- Vertical Intelligence --> <div class="p-0 h-full"> <div class="flex flex-col items-start lg:px-8 px-4 py-10 h-full relative z-10 lg:px-0" style="background: radial-gradient(100% 146.88% at 100% 100%, rgba(255, 255, 255, 0.03) 0%, rgba(3, 0, 20, 0.01) 100%)"> <div class="w-full flex justify-center"> <img${addAttribute(featureImages[1] || "/screens/vertical-intelligence.svg", "src")} alt="Vertical Intelligence" width="400" height="250" loading="lazy" class="w-full max-w-[400px] h-auto"> </div> <h3 class="font-sans font-bold text-[20px] leading-[30px] text-[var(--color-brand)] mb-3">Vertical Intelligence</h3> <p class="font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] max-w-[420px]">
Deep data models for Fintech, PropTech, Trade Finance, and Supply Chain. Industry-specific signals that horizontal tools miss entirely.
</p> </div> </div> <!-- AI Autonomy --> <div class="p-0 md:col-span-2 w-full"> <div class="flex flex-col md:flex-row items-center md:items-start gap-8 lg:px-8 px-4 py-4 relative z-10 mt-8 md:mt-0 bg-[radial-gradient(100%_146.88%_at_100%_100%,_rgba(255,255,255,0.03)_0%,_rgba(3,0,20,0.01)_100%)]"> <div class="md:hidden absolute top-0 left-1/2 -translate-x-1/2 w-[320px] h-[1px] bg-[var(--color-accent-blue-alpha)]"></div> <div class="w-full md:w-1/2 flex justify-center"> <img${addAttribute(featureImages[2] || "/screens/ai-autonomy.svg", "src")} alt="AI Autonomy" width="400" height="250" loading="lazy" class="w-full max-w-[400px] h-auto"> </div> <div class="w-full md:w-1/2 flex flex-col items-start px-4 justify-start pt-2 md:pt-8 lg:px-0"> <h3 class="font-sans font-bold text-[20px] leading-[30px] text-[var(--color-brand)] mb-3">AI Autonomy</h3> <p class="font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-primary)] text-left">
Autonomous prospecting that finds, enriches, scores, and engages leads. Your AI SDR works 24/7 while your team focuses on closing.
</p> </div> </div> </div> </div> </div> </div> </section>`;
}, "/home/mehan/Step_7/dosales-landing/src/components/sections/WhyDoSales.astro", void 0);

const $$Astro$1 = createAstro("https://dosales.ai");
const $$EarlyAccess = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EarlyAccess;
  const { data } = Astro2.props;
  const eyebrowText = data?.eyebrow || "Upgrade your Leads";
  const headingText = data?.heading || "Start closing in emerging markets today";
  const buttonText = data?.buttonText || "Get Early Access";
  return renderTemplate`${maybeRenderHead()}<section class="w-full relative overflow-hidden min-h-[400px] flex flex-col items-center justify-center pb-24"> <div class="absolute inset-0 pointer-events-none z-0 bg-[url('/backdrop/grid-block.png')] bg-cover bg-center opacity-100"></div> <div class="relative z-10 flex flex-col items-center max-w-5xl px-6"> <div class="flex items-center gap-8 mb-12 w-full justify-center"> <div class="flex-1 h-[1.5px] max-w-[200px] bg-[linear-gradient(289deg,_rgba(255,255,255,0.2)_6.73%,_#9CD2F8_54%,_#2DD5FF_92%)] rotate-180"></div> <div class="flex-shrink-0 flex items-center justify-center rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] px-6 h-[32px] bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] gap-[10px]"> <span class="font-sans font-medium text-[14px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap w-fit"> ${eyebrowText} </span> </div> <div class="flex-1 h-[1.5px] max-w-[200px] bg-[linear-gradient(289deg,_rgba(255,255,255,0.2)_6.73%,_#9CD2F8_54%,_#2DD5FF_92%)]"></div> </div> <h2 class="font-sans font-bold text-[36px] md:text-[42px] lg:text-[58px] leading-[1.1] md:leading-[100%] tracking-tight text-black text-center mb-12 max-w-4xl align-middle font-satoshi"> ${headingText} </h2> <button class="bg-[var(--color-text-primary)] text-[var(--color-white)] rounded-[10px] shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center whitespace-nowrap w-[138px] h-[48px] px-4 py-[14px] font-satoshi text-[14px] font-medium leading-[100%] border-none" data-calendly-trigger> ${buttonText} </button> </div> </section>`;
}, "/home/mehan/Step_7/dosales-landing/src/components/sections/EarlyAccess.astro", void 0);

const Circle = ({ className, children, idx, ...rest }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      ...rest,
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { delay: idx * 0.1, duration: 0.2 },
      className: twMerge(
        "absolute inset-0 left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 transform rounded-full border border-neutral-200",
        className
      )
    }
  );
};
const Radar = ({ className, size = 400 }) => {
  const circles = new Array(8).fill(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: twMerge(
        "relative flex items-center justify-center rounded-full h-[var(--size)] w-[var(--size)]",
        className
      ),
      style: { "--size": `${size}px` },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes radar-spin {
          from { transform: rotate(0deg); }
          to   { transform: rotate(360deg); }
        }
        .animate-radar-spin {
          animation: radar-spin 8s linear infinite;
        }
      ` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            style: {
              "--half-size": `${size / 2}px`
            },
            className: "animate-radar-spin absolute right-1/2 top-1/2 z-40 flex items-center justify-center mix-blend-screen origin-right w-[var(--half-size)] h-[2px]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[2px] w-full bg-gradient-to-r from-transparent via-sky-400 to-sky-300 shadow-[0_0_15px_rgba(14,165,233,0.8)]" })
          }
        ),
        circles.map((_, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          Circle,
          {
            style: {
              height: `${(idx + 1) / circles.length * 100}%`,
              width: `${(idx + 1) / circles.length * 100}%`,
              border: `1px solid rgba(148, 163, 184, 0.1)`
            },
            idx
          },
          `circle-${idx}`
        ))
      ]
    }
  );
};
const IconContainer = ({
  icon,
  title,
  description,
  delay,
  rotationDelay,
  pSide = "top"
}) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const getPositionClasses = () => {
    switch (pSide) {
      case "left":
        return "right-full top-1/2 -translate-y-1/2 mr-2";
      case "right":
        return "left-full top-1/2 -translate-y-1/2 ml-2";
      default:
        return "bottom-full left-1/2 -translate-x-1/2 mb-2";
    }
  };
  const getAnimation = () => {
    switch (pSide) {
      case "left":
        return { initial: { x: -5 }, animate: { x: -10 } };
      case "right":
        return { initial: { x: 5 }, animate: { x: 10 } };
      default:
        return { initial: { y: 5 }, animate: { y: -10 } };
    }
  };
  const anim = getAnimation();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative z-50 flex flex-col items-center justify-center cursor-pointer",
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
      onClick: () => setIsHovered(!isHovered),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("style", { children: `
        @keyframes icon-glow {
          0% { 
            filter: drop-shadow(0 0 15px rgba(14, 165, 233, 0.9)); 
            transform: scale(1.1); 
            opacity: 1; 
            background-color: rgba(14, 165, 233, 0.15);
          }
          10%, 90% { 
            filter: drop-shadow(0 0 0px rgba(14, 165, 233, 0)); 
            transform: scale(1); 
            opacity: 0.6; 
            background-color: transparent;
          }
        }
        @keyframes ripple-effect {
          0% { transform: scale(1); opacity: 0.6; border-width: 2px; }
          25% { transform: scale(2.5); opacity: 0; border-width: 1px; }
          100% { transform: scale(2.5); opacity: 0; }
        }
        .animate-icon-glow { animation: icon-glow 8s linear infinite; }
        .animate-ripple { animation: ripple-effect 8s cubic-bezier(0, 0, 0.2, 1) infinite; }
      ` }),
        isHovered && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95, ...anim.initial },
            animate: { opacity: 1, scale: 1, ...anim.animate },
            className: twMerge(
              "absolute z-[200] w-[300px] h-[104px] p-[14px] rounded-[20px] border border-[var(--color-tooltip-border)] bg-[var(--color-tooltip-bg)]/95 backdrop-blur-[44px] shadow-2xl pointer-events-none flex flex-col justify-center gap-[4px]",
              getPositionClasses()
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h5", { className: "font-sans font-medium text-[16px] leading-[24px] text-[var(--color-text-tooltip-heading)]", children: title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans font-normal text-[16px] leading-[24px] text-[var(--color-text-tooltip-body)] line-clamp-2", children: description })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, scale: 0.95 },
            animate: { opacity: 1, scale: 1 },
            transition: { duration: 0.2, delay: delay ?? 0 },
            className: "animate-icon-glow flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-slate-900/50 backdrop-blur-sm shadow-xl relative z-10 cursor-pointer",
            style: { animationDelay: `-${rotationDelay || 0}s` },
            children: icon || /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-5 h-5 bg-white/20 rounded-full" })
          }
        )
      ]
    }
  );
};

const builder = deprecatedcreateImageUrlBuilder({ projectId, dataset });
const urlFor = (source) => {
  return builder.image(source);
};

const fallbackIcons = [
  {
    icon: "/icons/service.svg",
    title: "Web Scraping",
    description: "Collects publicly available data from relevant websites",
    bottom: "86%",
    left: "50%",
    pSide: "top"
  },
  {
    icon: "/icons/verify-email-icon.svg",
    title: "Email Verify",
    description: "Validates email addresses for accuracy and deliverability",
    bottom: "62%",
    left: "78%",
    pSide: "left"
  },
  {
    icon: "/icons/people-iocn.svg",
    title: "Social Networks",
    description: "Insights from social and professional user profiles",
    bottom: "55%",
    left: "26%",
    pSide: "top"
  },
  {
    icon: "/icons/global-icon.svg",
    title: "Intent Signals",
    description: "Tracks user behavior to identify buying intent signals",
    bottom: "40%",
    left: "64%",
    pSide: "top"
  },
  {
    icon: "/icons/database-icon.svg",
    title: "Contact DBs",
    description: "Verified contact data including emails and phone numbers",
    bottom: "35%",
    left: "10%",
    pSide: "right"
  },
  {
    icon: "/icons/security-icon.svg",
    title: "Compliance",
    description: "Ensures data meets global privacy and compliance standards",
    bottom: "25%",
    left: "45%",
    pSide: "top"
  },
  {
    icon: "/icons/industrial-icon.svg",
    title: "Registries",
    description: "Company data from official business registries",
    bottom: "12%",
    left: "32%",
    pSide: "top"
  },
  {
    icon: "/icons/govt-iocn.svg",
    title: "Gov Registries",
    description: "Verified company data from government registry sources",
    bottom: "12%",
    left: "84%",
    pSide: "left"
  }
];
function DataSourcesSection({ data }) {
  const eyebrowText = data?.eyebrow || "Waterfall Enrichment";
  const headingText = data?.heading || "Chains 10+ data providers, 85%+ match rates";
  const subheadingText = data?.description || "We don't rely on a single source. DoSales waterfalls through 10+ data providers to verify emails, phones, and company intel across MENA and Southeast Asia.";
  const displayIcons = data?.icons?.length > 0 ? data.icons.map((icon) => ({
    icon: icon.image ? urlFor(icon.image).url() : "/icons/service.svg",
    title: icon.title || "Data Source",
    description: icon.description || "",
    bottom: icon.bottom || "50%",
    left: icon.left || "50%",
    pSide: icon.pSide || "top"
  })) : fallbackIcons;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "section",
    {
      className: "relative flex flex-col items-center justify-center overflow-visible pt-32 pb-0 dark-section bg-[linear-gradient(89.47deg,_#0A0B18_0.71%,_#0A0B18_99.81%)]",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full max-w-5xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative w-full aspect-[3/2] md:aspect-[2/1] overflow-hidden rounded-[1000px_1000px_0_0]",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-end justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Radar, { className: "opacity-40 translate-y-1/2", size: 1200 }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-0 pointer-events-none flex items-end justify-center opacity-40", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-square translate-y-1/2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: "/backdrop/radar.svg",
                    alt: "DoSales radar scanning visualization representing cross-region data intelligence",
                    className: "w-full h-full object-contain rotate-90"
                  }
                ) }) })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 z-50 pointer-events-none flex items-end justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full aspect-[2/1]", children: displayIcons.map((item, idx) => {
            const L = parseFloat(item.left);
            const B = parseFloat(item.bottom);
            const dx = L - 50;
            const dy = B;
            const angle = Math.atan2(dy, -dx) * 180 / Math.PI;
            const normalizedAngle = angle < 0 ? angle + 360 : angle;
            return /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto",
                style: { bottom: item.bottom, left: item.left },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  IconContainer,
                  {
                    delay: 0.1 * idx,
                    rotationDelay: 8 - normalizedAngle / 360 * 8,
                    title: item.title,
                    description: item.description,
                    pSide: item.pSide,
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "img",
                      {
                        src: item.icon,
                        width: 44,
                        height: 44,
                        alt: `${item.title} data source icon`,
                        loading: "lazy",
                        decoding: "async",
                        className: "w-[32px] md:w-[44px] h-[32px] md:h-[44px] brightness-200"
                      }
                    )
                  }
                )
              },
              idx
            );
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 z-[60] flex flex-col items-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              initial: { scale: 0.8, opacity: 0 },
              animate: { scale: 1, opacity: 1 },
              transition: { duration: 0.5, delay: 0.8 },
              className: "flex h-20 w-20 items-center justify-center rounded-full  pointer-events-auto",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/icons/do-sales-icon.svg",
                  alt: "DoSales central AI intelligence logo",
                  width: 48,
                  height: 48,
                  loading: "lazy",
                  decoding: "async",
                  className: "w-[56px] h-[56px] md:w-[80px] md:h-[80px]"
                }
              )
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-full h-[394px] flex flex-col items-center justify-center -mt-px bg-[linear-gradient(180deg,_rgba(3,0,20,0.8)_0%,_#030014_37.87%)]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative z-10 flex flex-col items-center justify-center space-y-6 max-w-4xl px-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex items-center justify-center opacity-100 w-auto min-w-[180px] h-[32px] rounded-[30px] px-[14px] py-[5px] gap-[10px] bg-[linear-gradient(90deg,_#105677_0%,_#10171A_100%)] border border-[#366E86] shadow-[0px_2px_4px_0px_rgba(0,0,0,0.05)] font-satoshi font-medium text-[16px] leading-[100%] text-white text-center whitespace-nowrap",
                  children: eyebrowText
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "h2",
                {
                  className: "text-[32px] md:text-[38px] lg:text-[48px] lg:whitespace-nowrap font-satoshi font-medium leading-[100%] text-center bg-[linear-gradient(180deg,_#FFFFFF_0%,_rgba(255,255,255,0.7)_100%)] bg-clip-text text-transparent",
                  children: headingText
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-satoshi font-normal text-[16px] leading-[24px] text-center text-[#EFEDFDB2] max-w-[680px] mx-auto",
                  children: subheadingText
                }
              )
            ] })
          }
        )
      ]
    }
  );
}

const discoveryFields = [
  { label: "TARGET COMPANY", placeholder: "e.g. Stripe, Coinbase" },
  { label: "JOB TITLES", placeholder: "CTO, VP Engineering" },
  { label: "LOCATION", placeholder: "San Francisco, London" },
  { label: "INDUSTRY", placeholder: "Fintech, SaaS" },
  { label: "COMPANY SIZE", placeholder: "50-200" },
  { label: "MAX RESULTS", placeholder: "25" }
];
const fallbackTestimonials = [
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Marcaus Teo", title: "VP Sales, Nium", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Talan Septimus", title: "Sales Director, Razorpay", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Jocelyn Kenter", title: "Growth Lead, Funding Societies", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Zain Septimus", title: "Head of BD, Sarwa", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Paityn Vaccaro", title: "Co-founder, Propseller", avatar: null },
  { quote: "We’ve burned through Apollo and ZoomInfo licenses. The UAE Fintech data is a graveyard — wrong emails, outdated titles, companies that pivoted two years ago.", name: "Cristofer Curtis", title: "SDR Manager, Tabby", avatar: null }
];
function AIAgentSection({ data, testimonials: sanityTestimonials }) {
  const [showLeads, setShowLeads] = reactExports.useState(false);
  const [isDiscovering, setIsDiscovering] = reactExports.useState(false);
  const [formValues, setFormValues] = reactExports.useState({});
  const [activeButton, setActiveButton] = reactExports.useState(false);
  const [cursorPos, setCursorPos] = reactExports.useState({ x: 300, y: 300, opacity: 0 });
  const mockupImage = data?.mockupImage ? urlFor(data.mockupImage).url() : null;
  const mappedSanity = (sanityTestimonials || []).map((t) => ({
    quote: t.quote || "No quote provided",
    name: t.author || "Anonymous",
    title: t.role || "Sales Leader",
    avatar: t.avatar ? urlFor(t.avatar).url() : null
  }));
  const displayTestimonials = mappedSanity.length > 0 ? [...mappedSanity, ...fallbackTestimonials].slice(0, Math.max(mappedSanity.length, 6)) : fallbackTestimonials;
  reactExports.useEffect(() => {
    if (mockupImage) return;
    let timeoutId;
    const startAnimation = async () => {
      setShowLeads(false);
      setIsDiscovering(false);
      setFormValues({});
      setActiveButton(false);
      setCursorPos({ x: 500, y: 100, opacity: 0 });
      await new Promise((r) => setTimeout(r, 400));
      setCursorPos({ x: 100, y: 65, opacity: 1 });
      const company = "Revolut";
      for (let i = 0; i <= company.length; i++) {
        setFormValues((prev) => ({ ...prev, "TARGET COMPANY": company.slice(0, i) }));
        await new Promise((r) => setTimeout(r, 40));
      }
      setCursorPos({ x: 400, y: 65, opacity: 1 });
      const jobs = "Head of Growth";
      for (let i = 0; i <= jobs.length; i++) {
        setFormValues((prev) => ({ ...prev, "JOB TITLES": jobs.slice(0, i) }));
        await new Promise((r) => setTimeout(r, 30));
      }
      setCursorPos({ x: 100, y: 125, opacity: 1 });
      const loc = "Dubai, UAE";
      for (let i = 0; i <= loc.length; i++) {
        setFormValues((prev) => ({ ...prev, "LOCATION": loc.slice(0, i) }));
        await new Promise((r) => setTimeout(r, 40));
      }
      setCursorPos({ x: 400, y: 125, opacity: 1 });
      const industry = "Fintech";
      for (let i = 0; i <= industry.length; i++) {
        setFormValues((prev) => ({ ...prev, "INDUSTRY": industry.slice(0, i) }));
        await new Promise((r) => setTimeout(r, 40));
      }
      setCursorPos({ x: 100, y: 185, opacity: 1 });
      const size = "50-200";
      for (let i = 0; i <= size.length; i++) {
        setFormValues((prev) => ({ ...prev, "COMPANY SIZE": size.slice(0, i) }));
        await new Promise((r) => setTimeout(r, 40));
      }
      setCursorPos({ x: 400, y: 185, opacity: 1 });
      const res = "25";
      for (let i = 0; i <= res.length; i++) {
        setFormValues((prev) => ({ ...prev, "MAX RESULTS": res.slice(0, i) }));
        await new Promise((r) => setTimeout(r, 40));
      }
      await new Promise((r) => setTimeout(r, 300));
      setCursorPos({ x: 80, y: 260, opacity: 1 });
      await new Promise((r) => setTimeout(r, 600));
      setActiveButton(true);
      await new Promise((r) => setTimeout(r, 200));
      setCursorPos((prev) => ({ ...prev, opacity: 0 }));
      setIsDiscovering(true);
      await new Promise((r) => setTimeout(r, 1500));
      setIsDiscovering(false);
      setShowLeads(true);
      setActiveButton(false);
      timeoutId = setTimeout(startAnimation, 6e3);
    };
    startAnimation();
    return () => clearTimeout(timeoutId);
  }, [mockupImage]);
  const handleInputChange = (label, value) => {
    setFormValues((prev) => ({ ...prev, [label]: value }));
  };
  const handleRunDiscovery = () => {
    setIsDiscovering(true);
    setTimeout(() => {
      setIsDiscovering(false);
      setShowLeads(true);
    }, 1200);
  };
  const leads = [
    { name: "David Kim", title: "CEO", company: "Axe Infinity", sub: "201-500 Emps", tier: "HOT", score: 94 },
    { name: "Priya Nair", title: "CFO", company: "Axe Infinity", sub: "201-500 Emps", tier: "HOT", score: 89 },
    { name: "Marcus Oei", title: "Director of Engineering", company: "Revolut Ltd.", sub: "Fintech & Digital Finance", tier: "HOT", score: 86 },
    { name: "Zoe Serova", title: "Head of Technology", company: "Revolut Ltd.", sub: "Fintech & Digital Finance", tier: "HOT", score: 74 }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "w-full lg:pt-40 pt-20 flex flex-col items-center align-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col lg:flex-row justify-center items-center gap-12 lg:gap-20 w-full max-w-7xl lg:max-w-[1360px] px-4 md:px-10 lg:px-10 mb-16 md:mb-36", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col justify-center items-start gap-[20px] md:gap-[28px] md:max-w-[700px] lg:max-w-[464px] order-first lg:order-last", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-auto h-[32px] rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] flex items-center justify-center shrink-0 bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] px-[14px] py-[5px] gap-[10px]",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-medium text-[16px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap", children: data?.headingBadge || "AI Outbound Agent" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-[440px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "h2",
          {
            className: "font-sans font-bold text-[42px] lg:text-[52px] leading-[100%] tracking-tight text-[var(--color-text-primary)] w-full font-satoshi",
            children: (data?.heading || "From Ideal\nProspects to\nBooked Meetings\n- Automatically").split("\n").map((line, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
              line,
              i !== (data?.heading || "From Ideal\nProspects to\nBooked Meetings\n- Automatically").split("\n").length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("br", {})
            ] }, i))
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans font-normal text-[18px] md:text-[19px] leading-[1.5] text-[var(--color-text-secondary)] max-w-[420px] lg:max-w-[310px] opacity-90", children: data?.subheading || "From ICP targeting to follow-ups, DoSales handles the entire outbound process. So your team spends time closing, not chasing." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "relative shrink-0 w-full md:max-w-[720px] lg:w-[720px] h-auto lg:h-[420px] p-[6px] rounded-[30px] shadow-[0px_12px_44px_rgba(0,0,0,0.08)] bg-gradient-to-r from-[var(--color-gradient-start)] to-[var(--color-gradient-end)] border-2 border-white order-last lg:order-first pointer-events-none select-none bg-[linear-gradient(89.72deg,_#E2F2F8_0.4%,_#D2DCF9_99.93%)]",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-full h-full min-h-[350px] lg:min-h-0 rounded-[24px] bg-[var(--color-bg-surface)] flex flex-col items-center lg:items-center px-6 lg:px-[14px] pt-8 lg:pt-[12px] pb-[22.3px] relative overflow-hidden",
              children: mockupImage ? /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: mockupImage, alt: "Discovery Mockup", className: "w-full h-full object-contain p-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  motion.div,
                  {
                    animate: {
                      x: cursorPos.x,
                      y: cursorPos.y,
                      opacity: cursorPos.opacity
                    },
                    transition: { type: "spring", damping: 20, stiffness: 100 },
                    className: "absolute pointer-events-none z-[100] hidden md:block",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "18", height: "18", viewBox: "0 0 24 24", fill: "black", stroke: "white", strokeWidth: "1.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z" }) })
                  }
                ),
                !showLeads ? /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full lg:max-w-[684px] mx-auto", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans font-semibold text-[16px] md:text-[18px] text-[var(--color-text-heading-dark)] mb-[10px] h-[24px] lg:ml-1.5", children: "Discovery Search" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "bg-white rounded-[7.54px] border-[0.75px] border-[var(--color-border-subtle)] px-6 md:px-[18.86px] pt-4 md:pt-[18.86px] pb-4 md:pb-6 shadow-sm flex flex-col relative w-full lg:h-[340px]",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 md:gap-[18.11px]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-3 md:gap-x-5 gap-y-3 md:gap-[10px]", children: discoveryFields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "label",
                            {
                              className: "block font-sans font-medium text-[9.05px] leading-[12.07px] tracking-[0.45px] text-[var(--color-text-secondary)] uppercase mb-1.5 font-inter",
                              children: field.label
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-[28px] md:h-[34px] rounded-lg border border-[var(--color-border-light)] bg-[var(--color-bg-surface)] flex items-center group focus-within:border-[var(--color-brand-focus)] focus-within:bg-white focus-within:ring-1 focus-within:ring-[var(--color-brand-focus)] transition-all overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "input",
                            {
                              type: "text",
                              placeholder: field.placeholder,
                              value: formValues[field.label] || "",
                              onChange: (e) => handleInputChange(field.label, e.target.value),
                              className: "w-full h-full bg-transparent border-none outline-none shadow-none px-3 md:px-4 text-[12px] md:text-[13px] text-[var(--color-text-heading-dark)] placeholder:text-[var(--color-text-placeholder)] font-sans focus:ring-0 flex-1 min-w-0"
                            }
                          ) })
                        ] }, field.label)) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 pt-0 md:pt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[12.07px] h-[12.07px] rounded-[1.5px] border-[0.75px] border-[var(--color-border-input)] bg-white flex items-center justify-center shadow-sm cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "8", height: "8", viewBox: "0 0 24 24", fill: "none", stroke: "#0BA5E9", strokeWidth: "4", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "20 6 9 17 4 12" }) }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] text-[var(--color-text-secondary)] font-sans font-medium", children: "Auto-enrich discovered leads" })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-stretch sm:items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "button",
                            {
                              onClick: handleRunDiscovery,
                              disabled: isDiscovering,
                              className: cn(
                                "bg-[var(--color-brand-alt)] text-white w-full sm:w-[119.7px] h-[30.2px] px-[15.09px] rounded-[7.54px] text-[10px] font-medium flex items-center justify-center gap-[6.04px] hover:bg-[var(--color-brand-alt-hover)] transition-all disabled:opacity-50 font-inter whitespace-nowrap cursor-pointer leading-[15.09px] tracking-[-0.11px]",
                                activeButton && "scale-95 brightness-110 shadow-inner"
                              ),
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M13 2 3 14h9l-1 8 10-12h-9l1-8z" }) }),
                                isDiscovering ? "Running..." : "Run Discovery"
                              ]
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 items-center", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "bg-[var(--color-text-slate)] text-white w-[47.9px] h-[30.2px] rounded-[7.54px] font-bold flex items-center justify-center gap-1 text-[12px] hover:opacity-90 cursor-pointer", children: [
                              "0 ",
                              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 5v14M19 12l-7 7-7-7" }) })
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { className: "border border-[var(--color-border-light)] text-[var(--color-text-slate-dark)] w-[108.7px] h-[31.7px] px-4 rounded-[7.54px] text-[12px] font-semibold bg-white shadow-sm hover:bg-gray-50 transition-colors whitespace-nowrap flex items-center justify-center gap-2 cursor-pointer", children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3" }) }),
                              "Save Preset"
                            ] })
                          ] })
                        ] })
                      ] })
                    }
                  )
                ] }) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col w-full h-full lg:max-w-[684px] mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between mb-[14px] lg:ml-1.5 h-[48px]", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-sans font-bold text-[18px] md:text-[20px] text-[var(--color-text-heading-dark)] leading-none mb-1", children: "Leads" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[12px] text-[var(--color-text-tertiary)] font-medium", children: "0 of 6 leads" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-2", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-[var(--color-border-light)] rounded-lg text-[12px] font-medium text-[var(--color-text-slate-dark)] bg-white shadow-sm cursor-pointer", children: [
                        "Shown ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold", children: "25" }),
                        " ",
                        /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m6 9 6 6 6-6" }) })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex bg-[var(--color-bg-gray-light)] p-1 rounded-lg border border-[var(--color-border-light)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 flex items-center justify-center bg-white rounded-md shadow-sm cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "#0BA5E9", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "3", x2: "21", y1: "9", y2: "9" })
                        ] }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 flex items-center justify-center text-[var(--color-text-tertiary)] cursor-pointer", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "7", height: "7", x: "3", y: "3", rx: "1" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "7", height: "7", x: "14", y: "3", rx: "1" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "7", height: "7", x: "3", y: "14", rx: "1" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "7", height: "7", x: "14", y: "14", rx: "1" })
                        ] }) })
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-white rounded-[7.54px] border-[0.75px] border-[var(--color-border-subtle)] shadow-sm flex-1 overflow-hidden lg:h-[340px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-left border-collapse h-full", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "bg-[var(--color-bg-surface)] border-bottom border-[var(--color-border-light)]", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-[9px] md:text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        "Name / Title ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "opacity-40", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m7 15 5 5 5-5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m7 9 5-5 5-5" })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "px-5 py-3 text-[9px] md:text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                        "Company ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "opacity-40", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m7 15 5 5 5-5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m7 9 5-5 5-5" })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden md:table-cell px-5 py-3 text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
                        "Tier ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "opacity-40", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m7 15 5 5 5-5" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m7 9 5-5 5-5" })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "hidden md:table-cell px-5 py-3 text-[10px] font-bold text-[var(--color-text-secondary)] tracking-wider uppercase text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5", children: [
                        "Score ",
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { width: "10", height: "10", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", className: "opacity-40", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "21", x2: "3", y1: "6", y2: "6" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "15", x2: "3", y1: "12", y2: "12" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("line", { x1: "10", x2: "3", y1: "18", y2: "18" })
                        ] })
                      ] }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "w-8" })
                    ] }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { className: "divide-y divide-[var(--color-border-light)]", children: leads.map((lead, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "hover:bg-gray-50 transition-colors border-b border-[var(--color-border-light)] last:border-b-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] font-bold text-[var(--color-text-heading-dark)] mb-0.5", children: lead.name }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[var(--color-text-tertiary)] font-medium", children: lead.title })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { className: "px-5 py-2.5", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[11.5px] font-bold text-[var(--color-text-heading-dark)] mb-0.5", children: lead.company }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-[10px] text-[var(--color-text-tertiary)] font-medium", children: lead.sub })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden md:table-cell px-5 py-2.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center px-2 py-0.5 rounded-full bg-[var(--color-bg-blue-light)] text-[var(--color-text-blue-dark)] text-[9.5px] font-bold", children: lead.tier }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "hidden md:table-cell px-5 py-2.5 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[12px] font-bold text-[var(--color-text-green-dark)]", children: lead.score }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-2.5 text-right opacity-30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "m9 18 6-6-6-6" }) }) })
                    ] }, idx)) })
                  ] }) })
                ] })
              ] })
            }
          )
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "w-[calc(100%-40px)] md:w-[calc(100%-90px)] h-[auto] md:h-[1080px] rounded-[30px] border-[2px] border-white relative overflow-hidden mb-32 flex flex-col md:flex-row items-center md:items-start p-8 md:pl-16 md:pr-0 gap-12 mx-auto md:mx-10 shadow-[0px_12px_40px_rgba(0,0,0,0.02)] pt-16 mt-6 md:mt-12 bg-[linear-gradient(114.57deg,_#F0F9FF_0.89%,_#C5E6F6_45.83%,_#F1FAFF_100%)] [border-image-source:linear-gradient(90.3deg,_#FFFFFF_0.28%,_#AEDEF7_52.97%,_#FDFEFF_99.77%)] [border-image-slice:1]",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-0 left-0 p-4 z-0 pointer-events-none grid grid-cols-6 gap-4", children: Array.from({ length: 30 }).map((_, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-[66px] h-[66px] rounded-[16px] bg-[var(--color-bg-white-alpha-20)]"
            },
            i
          )) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-[0.6] relative z-10 shrink-0 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-full md:max-w-[620px] mb-10 md:mb-20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "w-[168px] h-[32px] rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] flex items-center justify-center shrink-0 mb-6 md:mb-10 bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] px-[14px] py-[5px] gap-[10px]",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-medium text-[16px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap", children: "Real Pain Points" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-[38px] md:text-[52px] font-sans font-bold text-[var(--color-text-nav)] leading-none md:leading-[1.2] mb-6 md:mb-10 tracking-tight", children: "Existing tools weren't built for emerging markets" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-[14px] md:text-[16px] text-[var(--color-text-secondary)] font-medium leading-[1.5] md:leading-[28.5px] opacity-90 w-100", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "md:hidden", children: "Hear from sales leaders who've burned through Apollo, ZoomInfo, and Cognism trying to sell into MENA and Southeast Asia." }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "hidden md:inline", children: [
                "Hear from sales leaders who've burned through Apollo,",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "ZoomInfo, and Cognism trying to sell into MENA and",
                /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                "Southeast Asia."
              ] })
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-[calc(100%+32px)] md:w-[800px] lg:w-[1100px] h-[660px] rounded-l-[30px] rounded-r-none border-[1.5px] border-[var(--color-white)] md:border-r-0 backdrop-blur-[34px] relative z-10 p-[12px] md:p-[16px] overflow-hidden ml-auto -mr-8 md:-mr-2 mt-8 md:mt-70 bg-white/50",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full bg-[var(--color-black)] rounded-l-[30px] rounded-r-none relative overflow-hidden flex items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-dot-grid opacity-20 pointer-events-none" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex gap-[18px] p-[24px] animate-marquee whitespace-nowrap mask-[linear-gradient(to_right,transparent,black_16%,black_84%,transparent)]",
                    children: [1, 2].map((set) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-[18px] shrink-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-[18px]", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[312px] min-h-[186px] rounded-[16px] border border-[var(--color-bg-dark-surface-alt)] backdrop-blur-[44px] p-[16px] flex flex-col gap-[18px] shadow-lg shrink-0 whitespace-normal bg-[var(--color-bg-dark)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-[14px] font-medium leading-[22px] text-[var(--color-text-muted)] font-satoshi",
                            children: displayTestimonials[i % displayTestimonials.length].quote
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[12px] mt-auto", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: displayTestimonials[i % displayTestimonials.length].avatar || `/profile/profile${i % 6 + 1}.svg`,
                              alt: `Profile`,
                              width: 46,
                              height: 46,
                              loading: "lazy",
                              decoding: "async",
                              className: "h-[46px] w-[46px] shrink-0 rounded-[35.38px] object-cover"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h4",
                              {
                                className: "font-medium text-[16px] leading-[24px] text-[var(--color-text-on-dark)] font-satoshi",
                                children: displayTestimonials[i % displayTestimonials.length].name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-[14px] leading-[22px] text-[var(--color-text-muted)] font-normal font-satoshi",
                                children: displayTestimonials[i % displayTestimonials.length].title
                              }
                            )
                          ] })
                        ] })
                      ] }, `c1-${i}-${set}`)) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-[18px]", children: [3, 4, 5].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[312px] min-h-[186px] rounded-[16px] border border-[var(--color-bg-dark-surface-alt)] backdrop-blur-[44px] p-[16px] flex flex-col gap-[18px] shadow-lg shrink-0 whitespace-normal bg-[var(--color-bg-dark)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-[14px] font-medium leading-[22px] text-[var(--color-text-muted)] font-satoshi",
                            children: displayTestimonials[i % displayTestimonials.length].quote
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[12px] mt-auto", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: displayTestimonials[i % displayTestimonials.length].avatar || `/profile/profile${i % 6 + 1}.svg`,
                              alt: `Profile`,
                              width: 46,
                              height: 46,
                              loading: "lazy",
                              decoding: "async",
                              className: "h-[46px] w-[46px] shrink-0 rounded-[35.38px] object-cover"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h4",
                              {
                                className: "font-medium text-[16px] leading-[24px] text-[var(--color-text-on-dark)] font-satoshi",
                                children: displayTestimonials[i % displayTestimonials.length].name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-[14px] leading-[22px] text-[var(--color-text-muted)] font-normal font-satoshi",
                                children: displayTestimonials[i % displayTestimonials.length].title
                              }
                            )
                          ] })
                        ] })
                      ] }, `c2-${i}-${set}`)) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-[18px]", children: [0, 2, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-[312px] min-h-[186px] rounded-[16px] border border-[var(--color-bg-dark-surface-alt)] backdrop-blur-[44px] p-[16px] flex flex-col gap-[18px] shadow-lg shrink-0 whitespace-normal bg-[var(--color-bg-dark)]", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-[14px] font-medium leading-[22px] text-[var(--color-text-muted)] font-satoshi",
                            children: displayTestimonials[i % displayTestimonials.length].quote
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-[12px] mt-auto", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "img",
                            {
                              src: displayTestimonials[i % displayTestimonials.length].avatar || `/profile/profile${i % 6 + 1}.svg`,
                              alt: `Profile`,
                              width: 46,
                              height: 46,
                              loading: "lazy",
                              decoding: "async",
                              className: "h-[46px] w-[46px] shrink-0 rounded-[35.38px] object-cover"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "h4",
                              {
                                className: "font-medium text-[16px] leading-[24px] text-[var(--color-text-on-dark)] font-satoshi",
                                children: displayTestimonials[i % displayTestimonials.length].name
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "p",
                              {
                                className: "text-[14px] leading-[22px] text-[var(--color-text-muted)] font-normal font-satoshi",
                                children: displayTestimonials[i % displayTestimonials.length].title
                              }
                            )
                          ] })
                        ] })
                      ] }, `c3-${i}-${set}`)) })
                    ] }, `set-${set}`))
                  }
                )
              ] })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("style", { jsx: true, children: `
        @keyframes marquee {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
        }
      ` })
  ] });
}

const tiers = [
  { id: 1, label: "1. Define & Discover", width: 660 },
  { id: 2, label: "2. Enrich and Qualify", width: 540 },
  { id: 3, label: "3. Research & Convert", width: 420 }
];
function PlatformSection({ data }) {
  const [activeStep, setActiveStep] = reactExports.useState(1);
  const headingText = data?.heading || "An Automated Funnel that turns your ICP to Booked Meetings in 3 steps";
  const subheadingText = data?.subheading || "Define your ICP and DoSales AI handles discovery, outreach, and qualification automatically.";
  const buttonText = data?.buttonText || "Setup your Sales Engine";
  reactExports.useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => prev % 3 + 1);
    }, 3e3);
    return () => clearInterval(interval);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "w-full bg-white flex flex-col items-center overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative text-center mb-20 max-w-4xl px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 30 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "inline-flex items-center justify-center rounded-[30px] border-[1.5px] border-[var(--color-white)] shadow-[0px_2px_4px_0px_#0000000D] mb-8 mx-auto w-[90px] h-[32px] bg-[linear-gradient(90deg,_#C5E7F7_0%,_#F4F9FB_100%)] px-[14px] py-[5px] gap-[10px]",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-medium text-[16px] leading-[100%] tracking-[0%] text-[var(--color-brand)] text-center whitespace-nowrap", children: "Platform" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-sans font-bold text-[32px] md:text-[42px] lg:text-[52px] leading-[1.1] md:leading-[100%] tracking-tight text-[var(--color-text-primary)] text-center mb-8 w-full lg:w-[1060px] mx-auto", children: headingText }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans font-medium text-[16px] leading-[24px] tracking-[0%] text-[var(--color-text-secondary)] text-center max-w-[580px] mx-auto mb-10", children: subheadingText }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              className: "inline-flex items-center justify-center rounded-[10px] bg-[var(--color-action)] text-white transition-all hover:scale-[1.02] active:scale-95 mx-auto cursor-pointer w-[172px] h-[48px] px-[10px] py-[15px] gap-[10px]",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-sans font-medium text-[14px] leading-[100%] tracking-[0%] text-center", children: buttonText })
            }
          )
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-[1360px] px-8 flex flex-col lg:flex-row items-center justify-center gap-[40px] lg:gap-[133px] lg:pb-40 mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center shrink-0 w-full lg:w-auto px-4 md:px-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-sans font-medium text-[16px] md:text-[20px] leading-none text-[var(--color-text-primary)] uppercase text-center md:order-last mb-6 md:mb-0 md:mt-6 whitespace-nowrap", children: "DOSALES AI AUTOMATED FUNNEL" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-[12px] md:gap-[16px] w-full lg:w-[600px] md:order-first", children: tiers.map((tier) => {
          const active = activeStep === tier.id;
          const topColors = active ? ["#0D7CB4", "#A2DEF9"] : ["#FFFFFF", "#B1D6EF"];
          const frontColors = active ? ["#026AA2", "#36BEFA"] : ["#FFFFFF", "#B1D6EF"];
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              onClick: () => setActiveStep(tier.id),
              className: "relative cursor-pointer transition-transform duration-500 hover:scale-[1.02] active:scale-[0.98] flex justify-center",
              style: {
                width: `${tier.width / 660 * 100}%`,
                maxWidth: `${tier.width}px`
              },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { viewBox: `0 0 ${tier.width} 110`, width: "100%", height: "auto", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid meet", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: `top-${tier.id}`, x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.stop,
                        {
                          offset: "0%",
                          animate: { stopColor: topColors[0] },
                          transition: { duration: 0.3 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.stop,
                        {
                          offset: "100%",
                          animate: { stopColor: topColors[1] },
                          transition: { duration: 0.3 }
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: `front-${tier.id}`, x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.stop,
                        {
                          offset: "0%",
                          animate: { stopColor: frontColors[0] },
                          transition: { duration: 0.3 }
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        motion.stop,
                        {
                          offset: "100%",
                          animate: { stopColor: frontColors[1] },
                          transition: { duration: 0.3 }
                        }
                      )
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polygon",
                    {
                      points: `30,0 ${tier.width - 30},0 ${tier.width},18 0,18`,
                      fill: `url(#top-${tier.id})`
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "polygon",
                    {
                      points: `0,18 ${tier.width},18 ${tier.width - 30},108 30,108`,
                      fill: `url(#front-${tier.id})`
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn(
                  "absolute left-0 right-0 bottom-0 top-[16.36%] flex items-center justify-center transition-colors duration-500",
                  active ? "text-white" : "text-[var(--color-text-primary)]"
                ), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: "font-sans font-medium text-[14px] md:text-[22px] tracking-tight text-center px-4 leading-[100%]",
                    children: tier.label
                  }
                ) })
              ]
            },
            tier.id
          );
        }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative w-full max-w-[592px] h-[350px] sm:h-[400px] md:h-[520px] flex-shrink-0 lg:flex-shrink", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 30, scale: 0.98 },
          animate: { opacity: 1, y: 0, scale: 1 },
          exit: { opacity: 0, y: -30, scale: 0.98 },
          transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
          className: "w-full h-full rounded-[24px] md:rounded-[32px] overflow-hidden",
          children: [
            activeStep === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/screens/sales-screen1.svg", alt: "DoSales Discovery Search interface showing ICP filtering for sales leads", width: 592, height: 520, loading: "lazy", decoding: "async", className: "hidden lg:block w-full h-full object-contain p-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/screens/sales-responsive-screen1.svg", alt: "Discovery Search mobile responsive view", width: 350, height: 350, loading: "lazy", decoding: "async", className: "lg:hidden w-full h-full object-contain p-2" })
            ] }),
            activeStep === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/screens/sales-screen2.svg", alt: "Lead enrichment and qualification dashboard showing verified contact data", width: 592, height: 520, loading: "lazy", decoding: "async", className: "hidden lg:block w-full h-full object-contain p-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/screens/sales-responsive-screen2.svg", alt: "Enrichment and qualification mobile view", width: 350, height: 350, loading: "lazy", decoding: "async", className: "lg:hidden w-full h-full object-contain p-2" })
            ] }),
            activeStep === 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/screens/sales-screen3.svg", alt: "Autonomous outreach agent interface managing email sequences and bookings", width: 592, height: 520, loading: "lazy", decoding: "async", className: "hidden lg:block w-full h-full object-contain p-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: "/screens/sales-responsive-screen3.svg", alt: "Autonomous outreach mobile dashboard", width: 350, height: 350, loading: "lazy", decoding: "async", className: "lg:hidden w-full h-full object-contain p-2" })
            ] })
          ]
        },
        activeStep
      ) }) })
    ] })
  ] });
}

const hero = {"eyebrow":"Stop Chasing Leads!","headlineTop":"Turn your Ideal Customer Profile into a","headlineAccent":"Booked Meeting","description":"DoSales automates lead discovery, outreach, and lead qualification with DoSales AI. Hand-over only sales-ready prospects and your sales team focuses on Revenue and Closing.","ctaText":"REGISTER NOW","badgeText":"Early Access Live - Limited Spots available"};
const whyDoSales = {"eyebrow":"Why DoSales","heading":"Built exclusively for your market","features":[{"title":"Regional Dominance"},{"title":"Vertical Intelligence"},{"title":"AI Autonomy"}]};
const demo = {"headingBadge":"AI Outbound Agent","heading":"From Ideal\nProspects to\nBooked Meetings\n- Automatically","subheading":"From ICP targeting to follow-ups, DoSales handles the entire outbound process. So your team spends time closing, not chasing."};
const platform = {"heading":"An Automated Funnel that turns your ICP to Booked Meetings in 3 steps","subheading":"Define your ICP and DoSales AI handles discovery, outreach, and qualification automatically."};
const backupContent = {
  hero,
  whyDoSales,
  demo,
  platform,
};

const $$Astro = createAstro("https://dosales.ai");
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  async function getLandingPageData(runtime) {
    const KV = runtime?.env?.SNAPSHOTS;
    const CACHE_KEY = "homepage_data_v1";
    try {
      const query = `{
      "page": *[_type == "page" && title == "Home"][0] {
        hero->,
        whyDoSales->,
        radar,
        demo->,
        platform->,
        footerCta
      },
      "fallbackHero": *[_type == "hero"][0],
      "fallbackWhy": *[_type == "whyDoSales"][0],
      "fallbackDemo": *[_type == "demo"][0],
      "fallbackPlatform": *[_type == "platform"][0],
      "settings": *[_type == "settings"][0],
      "radarData": *[_type == "radar"][0],
      "testimonials": *[_type == "testimonial"]
    }`;
      const remoteData = await client.fetch(query);
      if (!remoteData || !remoteData.page) throw new Error("No data found");
      if (KV) {
        await KV.put(CACHE_KEY, JSON.stringify(remoteData));
      }
      return remoteData;
    } catch (error) {
      if (error?.statusCode === 500) {
        throw error;
      }
      console.warn("Sanity fetch failed - checking Cloudflare KV fallback:", error);
      if (KV) {
        const snapshot = await KV.get(CACHE_KEY, { type: "json" });
        if (snapshot) {
          console.info("Recovered data from Cloudflare KV snapshot");
          return snapshot;
        }
      }
      console.warn("KV fallback unavailable - using local hardcoded backup");
      return {
        page: {
          hero: backupContent.hero,
          whyDoSales: backupContent.whyDoSales,
          demo: backupContent.demo,
          platform: backupContent.platform
        },
        testimonials: []
      };
    }
  }
  const data = await getLandingPageData(Astro2.locals.runtime);
  const heroData = data?.page?.hero || data?.fallbackHero || backupContent.hero;
  const whyData = data?.page?.whyDoSales || data?.fallbackWhy || backupContent.whyDoSales;
  data?.page?.radar;
  const demoData = data?.page?.demo || data?.fallbackDemo || backupContent.demo;
  const platformData = data?.page?.platform || data?.fallbackPlatform || backupContent.platform;
  const settings = data?.settings || {};
  const finalRadarData = data?.radarData || { title: "Data Sources", icons: [] };
  const footerCta = data?.page?.footerCta;
  const testimonials = data?.testimonials || [];
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": settings.siteTitle, "description": settings.siteDescription, "settings": settings }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="main-content" class="flex-1"> ${renderComponent($$result2, "Hero", $$Hero, { "data": heroData })} ${renderComponent($$result2, "WhyDoSales", $$WhyDoSales, { "data": whyData })} <!-- Interactive Islands --> ${renderComponent($$result2, "DataSourcesSection", DataSourcesSection, { "client:visible": true, "data": finalRadarData, "client:component-hydration": "visible", "client:component-path": "/home/mehan/Step_7/dosales-landing/src/components/sections/DataSourcesSection.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "AIAgentSection", AIAgentSection, { "client:visible": true, "data": demoData, "testimonials": testimonials, "client:component-hydration": "visible", "client:component-path": "/home/mehan/Step_7/dosales-landing/src/components/sections/AIAgentSection.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "PlatformSection", PlatformSection, { "client:visible": true, "data": platformData, "client:component-hydration": "visible", "client:component-path": "/home/mehan/Step_7/dosales-landing/src/components/sections/PlatformSection.tsx", "client:component-export": "default" })} ${renderComponent($$result2, "EarlyAccess", $$EarlyAccess, { "data": footerCta })} </main> ` })}`;
}, "/home/mehan/Step_7/dosales-landing/src/pages/index.astro", void 0);

const $$file = "/home/mehan/Step_7/dosales-landing/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
    __proto__: null,
    default: $$Index,
    file: $$file,
    url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
