/**
 * Emits one OG-card SVG per docs page into design/og/, named docs-<basename>.svg,
 * built from each page's real frontmatter (title, description, section).
 * Layout follows design/og/README.md's docs-card shell.
 *
 * Usage:
 *   node scripts/generate-docs-og-svgs.mjs      # write/refresh all docs SVGs
 *   npm run og:generate                          # then render them to PNGs
 *
 * Idempotent — re-run whenever a docs page is added or retitled.
 */
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const docsDir = join(root, 'content/docs')
const outDir = join(root, 'design/og')

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/** Monospace advance ≈ 0.6em; letter-spacing added per gap. */
const lineWidth = (chars, fontSize, ls) => chars * fontSize * 0.6 + Math.max(0, chars - 1) * ls

/** Split a title into 1–2 lines, balancing lengths when it's too wide for one. */
function splitTitle(title, maxChars = 24) {
  if (title.length <= maxChars) return [title]
  const words = title.split(' ')
  let best = null
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ')
    const b = words.slice(i).join(' ')
    const worst = Math.max(a.length, b.length)
    if (!best || worst < best.worst) best = { worst, lines: [a, b] }
  }
  return best.lines
}

/** Wrap a description at ~word boundaries into lines of ≤ maxChars. */
function wrapSub(text, maxChars = 92, maxLines = 2) {
  const words = text.split(' ')
  const lines = ['']
  for (const w of words) {
    const cur = lines[lines.length - 1]
    if ((cur + ' ' + w).trim().length <= maxChars) {
      lines[lines.length - 1] = (cur + ' ' + w).trim()
    } else {
      if (lines.length === maxLines) {
        lines[maxLines - 1] = lines[maxLines - 1].replace(/[,;]?$/, ' …')
        return lines
      }
      lines.push(w)
    }
  }
  return lines
}

function frontmatter(md) {
  const get = (key) => {
    const m = md.match(new RegExp(`^${key}:\\s*"?(.+?)"?\\s*$`, 'm'))
    return m ? m[1] : ''
  }
  return { title: get('title'), description: get('description'), section: get('section') }
}

function svgFor({ slug, title, description, section }) {
  const FONT = 72
  const LS = -0.7
  const lines = splitTitle(title)
  // Single line sits lower; two lines straddle the same vertical center.
  const baselines = lines.length === 1 ? [392] : [352, 428]
  const last = lines[lines.length - 1]
  const lastY = baselines[lines.length - 1]
  // Cursor block right after the green period on the last line.
  const cursorX = Math.round(52 + lineWidth(last.length + 1, FONT, LS) + 14)

  const titleText = lines
    .map((line, i) => {
      const isLast = i === lines.length - 1
      const body = isLast
        ? `${esc(line)}<tspan fill="#00e676">.</tspan>`
        : esc(line)
      return `  <text x="52" y="${baselines[i]}" font-size="${FONT}" font-weight="700" letter-spacing="${LS}" fill="#f0f0ee">${body}</text>`
    })
    .join('\n')

  const subLines = wrapSub(description)
  const subText = subLines
    .map((line, i) => `  <text x="56" y="${478 + i * 24}" font-size="14" fill="#a0a09e">${esc(line)}</text>`)
    .join('\n')

  const sectionUpper = esc(section.toUpperCase())
  const crumb = esc(slug.toUpperCase())

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="0.2" cy="0.8" r="0.5">
      <stop offset="0%" stop-color="#00b8d4" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#00b8d4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="1" cy="0" r="1.4">
      <stop offset="0%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0.5"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect width="1200" height="630" fill="url(#grid)"/>
  <rect width="1200" height="630" fill="url(#glow)"/>
  <rect width="1200" height="630" fill="url(#vignette)"/>

  <!-- topbar -->
  <rect x="0" y="0" width="1200" height="36" fill="#111111"/>
  <line x1="0" y1="36" x2="1200" y2="36" stroke="#2a2a2a" stroke-width="1"/>
  <rect x="24" y="15" width="6" height="6" fill="#00e676"/>
  <text x="40" y="22" font-size="10" letter-spacing="1.2" fill="#606060">LIVE</text>
  <text x="96" y="22" font-size="10" letter-spacing="1.2" fill="#a0a09e">~ / DOCS / ${crumb}</text>
  <text x="1176" y="22" font-size="10" letter-spacing="1.2" text-anchor="end" fill="#606060">AMPLITERM.COM</text>

  <!-- corner crosshairs -->
  <path d="M 24 58 L 24 44 L 38 44" fill="none" stroke="#00e676" stroke-width="1"/>
  <path d="M 1162 44 L 1176 44 L 1176 58" fill="none" stroke="#00e676" stroke-width="1"/>
  <path d="M 24 564 L 24 578 L 38 578" fill="none" stroke="#00e676" stroke-width="1"/>
  <path d="M 1176 564 L 1176 578 L 1162 578" fill="none" stroke="#00e676" stroke-width="1"/>

  <!-- header: lockup + section tag -->
  <g transform="translate(56, 78)">
    <polygon points="24,3 44,40 4,40" fill="none" stroke="#00e676" stroke-width="1.6"/>
    <line x1="12" y1="29" x2="36" y2="29" stroke="#00e676" stroke-width="1" opacity="0.45"/>
    <line x1="24" y1="40" x2="24" y2="51" stroke="#00e676" stroke-width="1" stroke-dasharray="2,2.5" opacity="0.55"/>
    <line x1="18" y1="51" x2="30" y2="51" stroke="#00e676" stroke-width="1" opacity="0.35"/>
  </g>
  <text x="120" y="102" font-size="16" font-weight="700" letter-spacing="3.5" fill="#f0f0ee">AMPLITERM</text>
  <text x="120" y="120" font-size="10" letter-spacing="3" fill="#606060">RESEARCH TERMINAL</text>

  <rect x="1004" y="86" width="140" height="28" fill="#00b8d411" stroke="#00b8d4" stroke-width="1"/>
  <text x="1074" y="104" font-size="10" font-weight="600" letter-spacing="2" text-anchor="middle" fill="#00b8d4">DOCS</text>

  <!-- eyebrow -->
  <line x1="56" y1="248" x2="80" y2="248" stroke="#00b8d4" stroke-width="1"/>
  <text x="90" y="252" font-size="10" font-weight="600" letter-spacing="2.2" fill="#00b8d4">DOCS · ${sectionUpper}</text>

  <!-- title -->
${titleText}
  <rect x="${cursorX}" y="${lastY - 56}" width="28" height="60" fill="#00e676"/>
  <rect x="${cursorX - 6}" y="${lastY - 62}" width="40" height="72" fill="#00e676" opacity="0.12"/>

  <!-- sub -->
${subText}

  <!-- footer -->
  <rect x="0" y="586" width="1200" height="44" fill="#111111"/>
  <line x1="0" y1="586" x2="1200" y2="586" stroke="#2a2a2a" stroke-width="1"/>
  <g font-size="10" letter-spacing="1.4">
    <rect x="24" y="604" width="4" height="4" fill="#00e676"/>
    <text x="36" y="612" fill="#a0a09e">GETTING STARTED</text>
    <rect x="216" y="604" width="4" height="4" fill="#00b8d4"/>
    <text x="228" y="612" fill="#a0a09e">USER GUIDE</text>
    <rect x="360" y="604" width="4" height="4" fill="#f5a623"/>
    <text x="372" y="612" fill="#a0a09e">CONDITION CATALOG</text>
    <text x="1176" y="612" font-weight="600" letter-spacing="1.8" text-anchor="end" fill="#00e676">AMPLITERM.COM / DOCS →</text>
  </g>
</svg>
`
}

let count = 0
for (const dir of readdirSync(docsDir, { withFileTypes: true })) {
  if (!dir.isDirectory()) continue
  for (const file of readdirSync(join(docsDir, dir.name))) {
    if (!file.endsWith('.md')) continue
    const slug = basename(file, '.md')
    const fm = frontmatter(readFileSync(join(docsDir, dir.name, file), 'utf8'))
    if (!fm.title) {
      console.warn(`⚠ ${dir.name}/${file}: no title, skipped`)
      continue
    }
    const svg = svgFor({ slug, ...fm })
    writeFileSync(join(outDir, `docs-${slug}.svg`), svg)
    console.log(`✓ docs-${slug}.svg  (${fm.title})`)
    count++
  }
}
console.log(`\n${count} docs OG SVGs written. Now run: npm run og:generate`)
