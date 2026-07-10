# Ampliterm — Website

## App Name

**Ampliterm** (formerly called "Alpha Journal" in the design files — all design files use "Alpha Journal" but the correct product name going forward is **Ampliterm**). The tagline/sub-label is **RESEARCH TERMINAL**.

---

## Tech Stack

- **Nuxt 4** (`nuxt ^4.4.4`)
- **@nuxt/content v3** — markdown-driven content (collections in `content.config.ts`)
- **@nuxt/fonts** — font loading (JetBrains Mono via Google Fonts)
- **@nuxt/image** — image optimization
- **better-sqlite3** — local DB for Nuxt Content

### Directory layout

```
app/
  app.vue           — root app shell
  components/       — shared Vue components
  pages/
    [...slug].vue   — catch-all content route
content/            — markdown content files
design/             — HTML design mockups (source of truth for visual design)
content.config.ts   — Nuxt Content collection config
nuxt.config.ts
```

---

## Design System

Design files live in `/design/`. They reference "Alpha Journal" — treat all of these as **Ampliterm**.

### Font

Single typeface: **JetBrains Mono** (weights 300–700).  
Load via: `https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@300;400;500;600;700`  
CSS variable: `--font: 'JetBrains Mono', monospace`

### Color Tokens

#### Backgrounds (darkest → lightest)
| Token | Hex | Usage |
|-------|-----|-------|
| `--bg-0` | `#0a0a0a` | Page / deepest background |
| `--bg-1` | `#111111` | Cards, panels |
| `--bg-2` | `#181818` | Elevated surfaces, headers |
| `--bg-3` | `#222222` | Hover states, inputs |
| `--bg-4` | `#2a2a2a` | Active, pressed states |

#### Borders
| Token | Hex | Usage |
|-------|-----|-------|
| `--border-0` | `#1e1e1e` | Subtle dividers |
| `--border-1` | `#2a2a2a` | Default borders |
| `--border-2` | `#3a3a3a` | Emphasized borders |

#### Text
| Token | Hex | Usage |
|-------|-----|-------|
| `--text-0` | `#f0f0ee` | Primary text |
| `--text-1` | `#a0a09e` | Secondary text |
| `--text-2` | `#606060` | Muted / labels |
| `--text-3` | `#3a3a3a` | Disabled / hints |

#### Semantic & Accent Colors
| Token | Hex | Usage |
|-------|-----|-------|
| `--green` | `#00e676` | Primary brand, up/success, primary CTA |
| `--green-dim` | `#00e67622` | Green tinted backgrounds |
| `--red` | `#ff4444` | Down/error/danger |
| `--red-dim` | `#ff444422` | Red tinted backgrounds |
| `--cyan` | `#00b8d4` | Interactive, links, focus rings, active nav |
| `--cyan-dim` | `#00b8d422` | Cyan tinted backgrounds |
| `--amber` | `#f5a623` | Alerts, watchlists, tags |
| `--amber-dim` | `#f5a62322` | Amber tinted backgrounds |

### Spacing Scale
| Token | Value |
|-------|-------|
| `--sp-1` | 4px |
| `--sp-2` | 8px |
| `--sp-3` | 12px |
| `--sp-4` | 16px |
| `--sp-5` | 24px |
| `--sp-6` | 32px |

### Border Radius

**Zero-radius system** — `--r: 0px`. All surfaces, inputs, cards, modals, and buttons use **sharp corners**. This enforces the terminal/data aesthetic.

### Elevation

Use border color to show elevation — **never box shadows**.

| Level | Background | Border |
|-------|-----------|--------|
| 0 — page | `--bg-0` | `--border-0` |
| 1 — panel | `--bg-1` | `--border-1` |
| 2 — header/elevated | `--bg-2` | `--border-1` |
| 3 — tooltip/popover | `--bg-3` | `--border-2` |

### Typography Scale

All type is JetBrains Mono. Base font-size: **12px**.

| Role | Size | Weight | Notes |
|------|------|--------|-------|
| display | 28px | 700 | Big data numbers |
| h1 | 20px | 600 | |
| h2 | 16px | 600 | |
| h3 | 13px | 600 | `letter-spacing: 0.05em` |
| body | 12px | 400 | `line-height: 1.6` |
| body-sm | 11px | 400 | |
| label | 9px | 600 | `letter-spacing: 0.16em`, `text-transform: uppercase` |
| mono-data | 12px | 400 | Green for positive, red for negative |
| ticker | 13px | 700 | `letter-spacing: 0.06em` |

---

## Logo / Logomark

SVG delta triangle (upward-pointing, outlined, never filled). Green stroke (`--green`) on dark backgrounds only.

**Symbol logic:**
- △ Delta triangle — alpha signal, upward movement
- — Mid-bar — the journal / annotation layer
- ╎ Dashed descent — tracking over time
- ▬ Anchor — grounded research base

**Usage rules:**
- Dark surfaces only
- Never fill the triangle
- Never rotate or skew
- Never add drop shadows or gradients
- Minimum clearspace = 1× logomark width on all sides

**Size variants:** 64px (app icon), 40px (UI medium), 24px (topbar), 16px (favicon)

**Color variants:**
- Primary: Green on black (`--green` on `--bg-0`)
- Cyan variant: `--cyan` on `--bg-2` (interactive contexts)
- Reversed: black on light (print/export only)

---

## Page Designs

Design mockups are in `/design/`. Pages include:

| File | Route | Notes |
|------|-------|-------|
| `Alpha Journal - Landing Page.html` | `/` | Hero, feature sections, app mockup |
| `Alpha Journal - Blog.html` | `/blog` | Featured post + post grid with filter bar |
| `Alpha Journal - Blog Post.html` | `/blog/[slug]` | Single post layout |
| `Alpha Journal - Changelog.html` | `/changelog` | Timeline of releases with badges |
| `Alpha Journal - Docs.html` | `/docs/[...]` | 3-column: left sidebar + content + TOC |
| `Alpha Journal - Roadmap.html` | `/roadmap` | Roadmap timeline |

All "Alpha Journal" references in designs = **Ampliterm**.

---

## OG Images (social share cards)

**When asked to create an OG image for any page or blog post, read
`design/og/README.md` first and follow it exactly.** Short version: author a
1200×630 plain SVG in `design/og/` (JetBrains Mono only, weights 400/600/700,
absolute positioning, the shared shell — topbar, corner crosshairs, footer pills),
run `npm run og:generate` (renders 2x retina PNGs to `public/og/` via
@resvg/resvg-js with bundled fonts), **view the generated PNG to check for
overlaps**, then wire it: `ogImage: "/og/<name>-og.png"` frontmatter on blog/docs
pages, or `useSeoMeta` on standalone pages. Blog posts without an `ogImage` fall
back to the dynamic template (`app/components/OgImage/Ampliterm.takumi.vue`);
docs pages without one default to `/og/docs-og.png`. Existing SVGs in `design/og/`
are the reference examples — `blog.svg` is the simplest shell, `home.svg` and
`blog-sec-filings.svg` show data panels.

---

## Component Reference

### Navigation

Fixed top bar, `52px` height, `background: rgba(10,10,10,0.92)` with `backdrop-filter: blur(12px)`. Logo wordmark on the left, nav links center, CTA button (`--green` fill, black text) on the right. Active nav link uses `--green` color + `border-bottom: 2px solid --green` (or `--cyan` on docs pages).

### Buttons

All buttons: sharp corners, `font-family: --font`, `text-transform: uppercase`, `letter-spacing: 0.06em`.

| Variant | Class | Style |
|---------|-------|-------|
| Primary | `btn-primary` | `background: --green; color: #000` |
| Secondary | `btn-secondary` | `color: --green; border: --green; transparent bg` |
| Ghost | `btn-ghost` | `color: --text-1; border: --border-2` |
| Danger | `btn-danger` | `color: --red; border: --red` |
| Cyan | `btn-cyan` | `color: --cyan; border: --cyan` |

Sizes: `btn-sm` (10px, 3px 8px padding), default (11px, 5px 12px), `btn-lg` (12px, 7px 18px).

### Badges / Tags

Inline, bordered, sharp. Variants: `badge-green`, `badge-red`, `badge-cyan`, `badge-amber`, `badge-neutral`. Font-size 10px, padding `2px 6px`.

### Inputs & Selects

- Background: `--bg-2`; border: `--border-1`; focus border: `--cyan`
- Font: `--font`, 12px
- No border radius
- Prefix variant: left-side `--bg-3` prefix cell with `--border-1` right border

### Alerts

4 types, all with a bold prefix label + message text:

| Type | Border/Color | Prefix |
|------|-------------|--------|
| Green | `--green` | `SIGNAL` |
| Red | `--red` | `RISK` |
| Amber | `--amber` | `WATCH` |
| Cyan | `--cyan` | `INFO` |

### Data Tables

`border-collapse: collapse`. Header: `--bg-2`, 9px/600/uppercase/+0.12em, `--text-2`. Rows: `border-bottom: --border-0`. Hover: `--bg-2`. Numbers: positive = `--green`, negative = `--red`.

### Stat Cards

Grid layout with `1px` gaps on `--border-0` background. Each card: `--bg-1`, label (9px/uppercase/`--text-2`), value (18px/700), delta (10px). Value color variants: `up` = `--green`, `dn` = `--red`, `cy` = `--cyan`, `am` = `--amber`.

### Progress Bar

Wrap: `--bg-3`, 4px height, `--border-0` border. Bar fill: `--green` (default).

### Ticker Strip

Flex row, `--bg-2`, each item separated by `--border-0`. Symbol bold/`--text-0`, price `--text-1`, change `--green` (up) or `--red` (down).

### Breadcrumbs

10px, `--text-2`. Separator `/` in `--text-3`. Active crumb `--text-0`. Hover `--cyan`.

### Keyboard Shortcuts

Use `<kbd>` with `background: --bg-3; border: --border-2; font-size: 10px; padding: 1px 5px`.

---

## Design Principles

1. **Terminal aesthetic** — everything looks like a data terminal, not a consumer app
2. **Zero-radius** — sharp corners everywhere, no exceptions
3. **Dark mode only** — never design for light mode
4. **Single typeface** — JetBrains Mono for all text
5. **Border-based elevation** — no box shadows, only progressively lighter bg + border colors
6. **Semantic color** — green = up/success/primary, red = down/error, cyan = interactive/links, amber = alerts/warnings
7. **Dense information** — compact padding, small label text, lots of data visible at once
