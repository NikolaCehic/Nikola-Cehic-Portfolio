# Design

## Visual Theme

Dark, engineered, and cinematic, built around the idea of a systems chapter rather than a resume page. The primary scene is a senior engineer presenting infrastructure work on a dim technical review display: calm enough for trust, precise enough for protocol and data systems, and visually distinctive without becoming crypto spectacle.

## Color

Use OKLCH tokens. The strategy is restrained with a desaturated steel-blue accent used for state, signal, and section emphasis. Neutrals are tinted toward blue and warm bone rather than pure black or pure white.

```css
--bg-0: oklch(0.06 0.004 250);
--bg-1: oklch(0.085 0.004 250);
--bg-2: oklch(0.11 0.004 250);
--panel: oklch(0.145 0.005 250);
--panel-2: oklch(0.18 0.005 250);
--line: oklch(0.32 0.006 250);
--muted: oklch(0.62 0.006 250);
--text: oklch(0.94 0.004 80);
--text-strong: oklch(0.985 0.003 80);
--accent: oklch(0.78 0.035 220);
--accent-dim: oklch(0.56 0.026 220);
```

## Typography

Use Geist for primary text and JetBrains Mono for technical labels, metadata, and compact chips. Headings should be large, solid, and readable, with hierarchy driven by scale and weight rather than gradient text or decorative italics. Body copy should stay under roughly 70 characters where possible.

## Layout

Use a chapter structure: hero, flagship work, profile, experience, lab/projects, stack, principles, and contact. Each section should feel like a distinct system panel in the same narrative, with visible numerals, rule lines, and dense but ordered content. Avoid nested cards and repeated icon-card grids. Cards are reserved for concrete work/project units.

## Components

- Fixed top navigation with numbered links, active state, scroll progress, and a direct contact action.
- Full-bleed hero with code-native SVG system map, status panel, credibility strip, and primary CTA.
- Work cards with small data diagrams that explain pipelines, governance, design systems, and real-time products.
- Experience ledger with dates, company, role, highlights, and stack chips.
- Stack board organized by category, not a generic tag cloud.
- Contact frame with email, LinkedIn, GitHub, and CV actions.

## Motion

Motion should support orientation: page-load reveal, section entry, scroll progress, subtle SVG drawing, and small hover feedback. Avoid blocking animation, bounce, layout-property animation, and excessive blur. Respect `prefers-reduced-motion`.

## Responsive Behavior

Desktop should feel dense and cinematic. Tablet should collapse complex grids into readable two-column or single-column flows. Mobile should hide nonessential nav density, keep CTAs reachable, remove oversized background numerals, and preserve line wrapping without overflow.

## Content Voice

Direct, proof-oriented, and compact. Prefer shipped-work language over abstract adjectives. Avoid em dashes in visible copy, placeholder links, fake metrics, and unsupported claims.
