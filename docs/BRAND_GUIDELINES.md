# DoSales Brand Guidelines

Official brand reference for DoSales — AI-native B2B lead intelligence for Fintech and PropTech in MENA and Southeast Asia.

---

## 1. Brand Overview

### Mission

AI-powered sales intelligence for emerging markets. DoSales gives B2B teams in Fintech and PropTech the data, AI agents, and workflows to find, qualify, and close deals across MENA and Southeast Asia.

### Brand Personality

- **Direct.** Short sentences. Verbs lead. The "Do" in DoSales means execution, not promises.
- **Confident.** We let data speak. Numbers over adjectives, proof over hype.
- **Technically precise.** We respect our audience's intelligence. Business language with surgical technical accuracy where it matters.
- **Regionally aware.** We name countries, not continents. We know the difference between Dubai and Riyadh, Jakarta and Bangkok.

### The Name

"DoSales" is intentionally action-oriented. The prefix "Do" signals execution — this is a platform for teams that ship pipeline, not teams that plan to plan. Always written as **DoSales** (capital D, capital S, no space).

---

## 2. Color Palette — "Deep Intelligence"

A dark, high-contrast palette that conveys depth, precision, and trust. Designed for dark-mode-first interfaces with strategic pops of signal blue.

### Primary — Navy

| Token       | Hex       | Usage                              |
|-------------|-----------|-------------------------------------|
| `navy-950`  | `#0A0F1E` | Deepest background, hero sections   |
| `navy-900`  | `#0F172A` | Primary dark background             |
| `navy-800`  | `#1E293B` | Cards, secondary surfaces           |
| `navy-700`  | `#334155` | Borders, subtle dividers            |

### Accent — "Signal Blue"

| Token       | Hex       | Usage                              |
|-------------|-----------|-------------------------------------|
| `blue-600`  | `#0284C7` | Pressed states, active elements     |
| `blue-500`  | `#0EA5E9` | Primary accent, CTAs, links         |
| `blue-400`  | `#38BDF8` | Hover states, highlights            |
| `blue-300`  | `#7DD3FC` | Light accent on dark backgrounds    |

### Secondary — "Precision Teal"

| Token       | Hex       | Usage                              |
|-------------|-----------|-------------------------------------|
| `teal-500`  | `#14B8A6` | Secondary actions, success, data viz |
| `teal-400`  | `#2DD4BF` | Hover states                        |

### Neutrals — Slate Scale

| Token       | Hex       |
|-------------|-----------|
| `slate-50`  | `#F8FAFC` |
| `slate-100` | `#F1F5F9` |
| `slate-200` | `#E2E8F0` |
| `slate-300` | `#CBD5E1` |
| `slate-400` | `#94A3B8` |
| `slate-500` | `#64748B` |
| `slate-600` | `#475569` |
| `slate-700` | `#334155` |
| `slate-800` | `#1E293B` |
| `slate-900` | `#0F172A` |

### Semantic Colors

| Role    | Hex       | Usage                        |
|---------|-----------|-------------------------------|
| Success | `#22C55E` | Confirmations, positive state |
| Warning | `#F59E0B` | Caution states, alerts        |
| Error   | `#EF4444` | Errors, destructive actions   |
| Info    | `#0EA5E9` | Informational (matches blue-500) |

### Color Combinations & Accessibility

| Foreground   | Background   | Contrast Ratio | WCAG Level |
|-------------|-------------|----------------|------------|
| `blue-500`  | `navy-950`  | ~7.2:1         | AAA        |
| `blue-400`  | `navy-950`  | ~9.1:1         | AAA        |
| `blue-300`  | `navy-900`  | ~10.3:1        | AAA        |
| `slate-50`  | `navy-950`  | ~16.5:1        | AAA        |
| `slate-400` | `navy-950`  | ~5.8:1         | AA         |
| `teal-500`  | `navy-950`  | ~7.4:1         | AAA        |
| `navy-950`  | `slate-50`  | ~16.5:1        | AAA        |

**Rules:**
- Body text on dark backgrounds must meet WCAG AA minimum (4.5:1). Prefer AAA (7:1).
- Interactive elements (links, buttons) must meet AA for both normal and hover states.
- Never place `blue-500` on `navy-800` — insufficient contrast (~3.8:1).
- Semantic colors are pre-tested on `navy-900` backgrounds.

---

## 3. Typography

### Font Stack

| Role              | Family          | Weights          | Usage                                    |
|-------------------|-----------------|------------------|------------------------------------------|
| Headings + Body   | **Inter**       | 400, 500, 600, 700 | All UI text, headings, paragraphs       |
| Monospace Accent  | **JetBrains Mono** | 400           | Stats, data labels, technical callouts   |

### Type Scale

| Level    | Size (Mobile) | Size (Desktop) | Line Height | Weight | Font            |
|----------|---------------|----------------|-------------|--------|-----------------|
| H1       | 36px          | 56px           | 1.1         | 700    | Inter           |
| H2       | 28px          | 40px           | 1.2         | 700    | Inter           |
| H3       | 22px          | 28px           | 1.3         | 600    | Inter           |
| Body     | 16px          | 16px           | 24px        | 400    | Inter           |
| Body Bold| 16px          | 16px           | 24px        | 600    | Inter           |
| Small    | 14px          | 14px           | 20px        | 400    | Inter           |
| Caption  | 13px          | 13px           | 18px        | 400    | JetBrains Mono  |

### Usage Notes

- **Headings** use Inter 700 (Bold) for H1/H2, Inter 600 (Semibold) for H3 and subheadings.
- **Body copy** uses Inter 400 (Regular). Use 500 (Medium) for emphasis within paragraphs instead of bold where subtlety is preferred.
- **Monospace** (JetBrains Mono) is reserved for data-heavy callouts: stat numbers, percentages, code snippets, and technical labels. Do not use it for body copy.
- Letter spacing: -0.02em on H1, -0.01em on H2. Default for everything else.
- Maximum line length for body text: 65-75 characters.

---

## 4. Logo Usage

### Logo Variants

| Variant            | Description                                          | Primary Use                   |
|--------------------|------------------------------------------------------|-------------------------------|
| Full Horizontal    | Icon + "DoSales" wordmark, side by side              | Navigation bars, headers      |
| Stacked            | Icon above "DoSales" wordmark                        | Hero sections, splash screens |
| Icon Only          | Geometric "D" with signal motif                      | Favicons, app icons, avatars  |
| Wordmark Only      | "DoSales" text without icon                          | Inline text references        |

### The Mark

The primary icon is a geometric "D" integrated with a signal/data motif — representing both the brand initial and the intelligence network DoSales provides. Clean lines, no gradients in the mark itself.

### Clear Space

Minimum clear space around the logo is **1x the height of the icon** on all sides. No text, graphic elements, or edges should encroach on this space.

```
    ┌─────────────────────────┐
    │         1x              │
    │    ┌───────────┐        │
    │ 1x │   LOGO    │ 1x    │
    │    └───────────┘        │
    │         1x              │
    └─────────────────────────┘
```

### Minimum Sizes

| Variant         | Minimum Size          |
|-----------------|-----------------------|
| Icon Only       | 24px height           |
| Full Horizontal | 80px width            |
| Stacked         | 48px width            |

### Color Variants

| Context             | Logo Color | Background     |
|---------------------|-----------|----------------|
| Light backgrounds   | `navy-950` | White / Slate-50 |
| Dark backgrounds    | White      | Navy-950 / Navy-900 |
| Single-color print  | Black or White (context-dependent) | Any |

### Logo Don'ts

- Do not stretch, compress, or distort the logo.
- Do not rotate or skew.
- Do not apply drop shadows, glows, or other effects.
- Do not place on busy photographic backgrounds without a solid backing.
- Do not change the logo colors outside the approved variants.
- Do not rearrange or separate the icon from the wordmark in the combined versions.
- Do not recreate the logo with substitute fonts.

---

## 5. Tone of Voice

### Principles

1. **Direct and action-oriented.** Short sentences. Verbs lead. Remove filler words. Say what the product does, not what it could maybe help with.
2. **Confident without arrogance.** Let data points carry the weight. Avoid superlatives ("best", "revolutionary", "game-changing").
3. **Technical but accessible.** Write for a VP of Sales who respects precision. Use business language with occasional technical specificity where it adds clarity.
4. **Regionally aware.** Name specific countries and cities. Never say "exotic markets" or "the East." Demonstrate genuine knowledge of the regions we serve.

### Do / Don't Examples

**Headlines & Hero Copy**

| Do | Don't |
|----|-------|
| 275M verified contacts across 12 MENA and Southeast Asian markets. | Unlock the untapped potential of exotic emerging markets! |
| AI agents that research, qualify, and sequence — autonomously. | Our revolutionary AI-powered solution leverages cutting-edge technology... |
| Pipeline built while you sleep. Literally. | Supercharge your sales pipeline with our amazing platform! |

**Feature Descriptions**

| Do | Don't |
|----|-------|
| Real-time company signals from Saudi Arabia, UAE, Indonesia, and 9 more markets. | We cover tons of markets in developing regions around the world. |
| 3 AI agents. 47 data sources. One unified pipeline. | A comprehensive, end-to-end, fully integrated sales acceleration ecosystem. |

**CTAs**

| Do | Don't |
|----|-------|
| Start building pipeline | Learn more about our offering |
| See it work — live demo | Request information |
| Get your ICP report | Click here |

### Writing Checklist

- [ ] Can you remove an adjective? Do it.
- [ ] Is there a number that could replace a vague claim? Use it.
- [ ] Are you naming a country or city? Good. Saying "the region"? Revise.
- [ ] Does the sentence start with a verb or concrete noun? Prefer that.
- [ ] Would a busy VP read past the first line? If not, rewrite.

---

## 6. Visual Style

### Design Principles

- **Dark-mode first.** Hero sections, key product showcases, and above-the-fold content default to dark backgrounds (navy-950, navy-900).
- **Data as texture.** Subtle dot-grid overlays and node-line patterns evoke AI networks and data connections without being literal.
- **Restrained color.** Large areas of navy with controlled bursts of blue-500 and teal-500 at interaction points.
- **Depth through layering.** Cards and surfaces use navy-800 on navy-900 backgrounds with subtle borders (navy-700) rather than heavy shadows.

### Graphic Elements

| Element              | Specification                                     |
|----------------------|---------------------------------------------------|
| Dot-grid overlay     | 24px spacing, 1px dots, `slate-700` at 15-25% opacity |
| Gradient accents     | `navy-900` to `blue-500` at 10-20% opacity, radial or linear |
| Icon style           | Outlined geometric, 1.5px stroke, rounded caps    |
| Stat callouts        | JetBrains Mono, blue-400 or teal-400, oversized   |
| Dividers             | 1px solid `navy-700` or gradient fade              |

### Imagery

- **Prefer** UI screenshots, product mockups, and abstract geometric compositions.
- **Minimize** stock photography. When photos are necessary, use real-world business contexts (not generic handshake photos).
- **Data visualizations** use the teal and blue palette. Keep them clean — no 3D charts, no excessive decoration.
- **Maps** of MENA and Southeast Asia should be stylized (dot-based or outline) using the brand palette, not photorealistic.

### Motion (When Applicable)

- Subtle entrance animations: fade-up with 20-30px translation, 400-600ms duration.
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)` for entrances.
- Stat counters: animate on scroll with JetBrains Mono typeface.
- Avoid decorative animation that does not support comprehension.

---

## 7. Spacing & Layout

### Grid System

- Base unit: **8px**.
- All spacing values are multiples of 8: 8, 16, 24, 32, 40, 48, 64, 80, 96, 128.
- Component internal padding: minimum 16px.

### Layout Constraints

| Property              | Value          |
|-----------------------|----------------|
| Max content width     | 1280px         |
| Section vertical padding | 96px - 128px |
| Card padding          | 24px - 32px    |
| Grid gap              | 24px - 32px    |
| Navigation height     | 64px - 80px    |

### Responsive Breakpoints

| Name     | Width    | Columns | Gutter |
|----------|----------|---------|--------|
| Mobile   | < 640px  | 1       | 16px   |
| Tablet   | 640-1024px | 2     | 24px   |
| Desktop  | > 1024px | 3-4     | 32px   |

### Whitespace Philosophy

Generous whitespace is not wasted space — it communicates confidence and clarity. Dense layouts signal desperation. Let content breathe.

- Hero sections: 128px vertical padding minimum.
- Between major sections: 96px minimum.
- Between related elements within a section: 48-64px.
- Between tightly coupled elements (heading + subheading): 16-24px.

---

## Quick Reference

```
Brand:        DoSales
Tagline:      AI-powered sales intelligence for emerging markets
Fonts:        Inter (400/500/600/700), JetBrains Mono (400)
Primary BG:   #0A0F1E / #0F172A
Accent:       #0EA5E9 (Signal Blue)
Secondary:    #14B8A6 (Precision Teal)
Grid:         8px base, 1280px max-width
Mode:         Dark-first
```
