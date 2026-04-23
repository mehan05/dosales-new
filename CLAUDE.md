@AGENTS.md

# DoSales Landing Page — Project Context

## Architecture

- **Framework**: Next.js (App Router) with TypeScript, Tailwind CSS, Framer Motion
- **Theme**: Dark navy (`navy-950` base), brand cyan (`brand-400/500`), slate grays
- **Design system**: Custom `tailwind.config` with navy/brand color scales
- **UI components**: Mix of custom + 21st.dev community components (aceternity, etc.)

## Component Map

### Layout

- `src/components/layout/Header.tsx` — Fixed header: DoSales logo (left) + Coming Soon badge (right). Lamp glow line at bottom edge. Glass-morphic blur on scroll. No center badge (moved to hero).
- `src/components/layout/Footer.tsx` — Full footer with DoSales branding, social links (X, LinkedIn), Product/Resources/Company link columns, "DoSales" watermark, copyright bar. Responsive text sizing for watermark.

### Hero Section (in page.tsx)

- `ContainerScroll` wraps the hero title + dashboard mockup card
- Title: "AI-Native Sales Intelligence" badge → h1 "Your AI closes the gap..." → "Emerging Markets" gradient text → description → stats (50 leads/mo, 2 min, No card) → email input + CTA → social proof text
- `DashboardMockup` inside the scroll card — stat cards + lead table
- `Particles` overlay with `z-[60]` (top layer), canvas `pointer-events-none`, mouse-attract interaction

### Sections (order in page.tsx)

1. **Hero + Dashboard** — ContainerScroll with badge, headline, stats, CTA, dashboard
2. **Data Sources Radar** — Semi-circular radar with 8 icons (Contact DBs, Social Networks, Registries, Intent Signals, Compliance, Email Verify, Gov Registries, Web Scraping) scattered inside arcs. Sweep line animation.
3. **Testimonials** — Discovery call quotes from emerging market sales leaders (columns layout)
4. **Solutions Bento** — 4-card BentoGrid (Vertical Lead Discovery, Buying Signal Detection, AI Outbound Agent, Pipeline Analytics) with abstract SVG backgrounds (grid pattern, pulse rings, wave lines, data flow)
5. **AI Agent Demo** — AI prompt box with typing animation, "From ICP definition to booked meetings"
6. **Markets Globe** — 3D dotted globe, "Coverage across 12+ emerging markets"
7. **CTA Section** — "Start closing in emerging markets today" with infinite grid background, email input + CTA

### UI Components

- `container-scroll-animation.tsx` — Aceternity ContainerScroll: scroll-linked 3D card rotation. Container: `h-[56rem] md:h-[72rem]`. Card: device frame (`bg-[#0c0f17]`, camera dot bezel, `rounded-[2.5rem]`). Screen area: `h-[26rem] md:h-[29rem]` — sized to show all 4 dashboard rows without clipping.
- `radar-effect.tsx` — Semi-circular SVG radar with 8 concentric arcs, sweep line animation (ease-in-out alternate 6s)
- `bento-grid.tsx` — BentoGrid + BentoCard with hover reveal CTA, `auto-rows-[22rem] grid-cols-3`
- `particles.tsx` — Canvas particle animation with mouse-attract gravity (ATTRACT_RADIUS=180, ATTRACT_STRENGTH=0.015) and opacity pulse. Canvas has `pointer-events-none` so inputs remain clickable.
- `page-loader.tsx` — Full-screen loader with DoSales logo, glow ring, typewriter "Loading Intelligence" text
- `ai-prompt-box.tsx` — AI prompt input with typing animation and generate button
- `the-infinite-grid.tsx` — Animated infinite dot grid for CTA background
- `lamp.tsx` — Lamp glow effect component (used inline in Header.tsx for floating state)
- `badge.tsx`, `button.tsx`, `card.tsx`, `input.tsx` — Base UI primitives

## Key Decisions & Patterns

- Hero uses `animate="visible"` (not `whileInView`) because ContainerScroll's perspective transform breaks IntersectionObserver
- Particles canvas has `pointer-events-none`; mouse position tracked via `mousemove` on the parent wrapper element. Inputs/buttons above the canvas remain clickable.
- Radar is semi-circular (SVG arcs from bottom center), not full circle — matches reference design
- Header has NO center badge; badge is in hero section as first animated element
- ContainerScroll uses `items-start` (not `items-center`) to prevent hero content from being pushed above viewport
- Bento cards have unique abstract SVG backgrounds: grid+orbs, pulse rings, wave lines, chart bars
- Header floats on scroll: `scrolled` state toggles glass-morphic pill (`rounded-2xl bg-navy-950/80 backdrop-blur-2xl`) with Aceternity lamp glow rendered below the nav bar in a zero-height overflow-visible container
- ContainerScroll card is a device frame: dark outer bezel `#0c0f17`, camera dot indicator, inner screen inset with `mx-3 mb-3`. Container must be tall enough (`h-[72rem]` desktop) for the rotateX animation to complete fully before the card exits the viewport.

## Responsive Breakpoints

- Mobile: `375px` — header shows logo + zap icon only, hero stacks vertically, table scrolls horizontally
- Tablet: `768px` — intermediate layout
- Desktop: `1280px+` — full layout with all elements

## Lessons Learned

- `whileInView` with `amount: 0.3` fails inside ContainerScroll due to CSS perspective transform — use `animate` instead
- ContainerScroll with `items-center` on desktop pushes content above fold when hero is taller than container — use `items-start`
- Footer watermark needs responsive text sizing (`text-[4rem] sm:text-[6rem] md:text-[10rem] lg:text-[12rem]`) to prevent mobile clipping
- Touch targets must be min 44px for mobile — add `min-h-[44px]` or `py-2` to interactive elements
- Git case sensitivity on macOS: `Button.tsx` vs `button.tsx` requires two-step rename via temp name (`git mv Button.tsx button-temp.tsx && git mv button-temp.tsx button.tsx`)
- `getBoundingClientRect()` returns VISUAL bounds after CSS transforms — use it to measure 3D-rotated card actual on-screen dimensions
- ContainerScroll card screen area height must be tuned so content fills without excessive empty space; dashboard mockup table uses `flex-1` so table wrapper stretches but rows don't — size screen to ~29rem desktop to match actual content height (~445px)
- Particle mouse-attract: track mouse on parent (not canvas, which is pointer-events-none). Store position in a `ref` to avoid re-render on every mouse move.
