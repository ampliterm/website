/**
 * Scaffolds one OG-card SVG per blog post into design/og/, built from each post's
 * real frontmatter AND body. Layout follows design/og/README.md's blog-card shell:
 * topbar, lockup, category pill, AUTHOR · DATE · READ TIME meta line, title with the
 * green period + cursor, one-line description, and a row of TOPIC CHIPS distilled from
 * the post's own section headings (so the card is representative of the content while
 * staying low-text).
 *
 * Chips: the post's H2 (`##`) headings, with the intro-hook and conclusion headings
 * dropped, each shortened to a keyword. Auto-distillation is best-effort — override it
 * per post with an `ogChips:` frontmatter field (YAML list or comma string), e.g.
 *   ogChips: [Filing Sync, AI Analysis, Fundamentals]
 *
 * SCAFFOLD, NOT OVERWRITE. Blog cards get hand-tuned per post. By default this writes
 * ONLY for posts with no SVG yet — a published card is never touched. --force overrides.
 *
 * Target SVG name: from the post's `ogImage` frontmatter when set
 * ("/og/blog-sec-filings-og.png" → blog-sec-filings.svg), else blog-<basename>.
 *
 * Usage:
 *   node scripts/generate-blog-og-svgs.mjs           # scaffold missing blog SVGs only
 *   node scripts/generate-blog-og-svgs.mjs --force    # regenerate every blog SVG
 *   npm run og:generate                               # then render SVGs → PNGs
 */
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const blogDir = join(root, 'content/blog')
const outDir = join(root, 'design/og')
const force = process.argv.includes('--force')

const esc = (s) => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')

/** Blog tag variants → the design system's accent tokens. */
const ACCENT = { cyan: '#00b8d4', green: '#00e676', amber: '#f5a623', red: '#ff4444', neutral: '#606060' }
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

/** Monospace advance ≈ 0.6em; letter-spacing added per gap. */
const lineWidth = (chars, fontSize, ls) => chars * fontSize * 0.6 + Math.max(0, chars - 1) * ls

/** "2026-05-25" → "MAY 25, 2026" (string-parsed; no Date, so no timezone drift). */
function fmtDate(iso) {
  const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(iso)
  if (!m) return iso.toUpperCase()
  const [, y, mo, d] = m
  return `${MONTHS[Number(mo) - 1]} ${Number(d)}, ${y}`
}

/** Pack words greedily into lines of ≤ maxChars. */
function greedyWrap(words, maxChars) {
  const lines = ['']
  for (const w of words) {
    const cur = lines[lines.length - 1]
    if (!cur) lines[lines.length - 1] = w
    else if ((cur + ' ' + w).length <= maxChars) lines[lines.length - 1] = cur + ' ' + w
    else lines.push(w)
  }
  return lines
}

/** Rebalance a 2-line split so the two lines are as even as possible. */
function balance2(words) {
  let best = null
  for (let i = 1; i < words.length; i++) {
    const a = words.slice(0, i).join(' ')
    const b = words.slice(i).join(' ')
    const worst = Math.max(a.length, b.length)
    if (!best || worst < best.worst) best = { worst, lines: [a, b] }
  }
  return best.lines
}

/** Split a title into 1–3 balanced lines that fit the card width. */
function splitTitle(title) {
  if (title.length <= 22) return [title]
  const words = title.split(' ')
  let target = 24
  let lines = greedyWrap(words, target)
  while (lines.length > 3 && target < 40) {
    target += 3
    lines = greedyWrap(words, target)
  }
  if (lines.length === 2) return balance2(words)
  return lines.slice(0, 3)
}

/** First sentence of the excerpt, trimmed to one card line. */
function oneLine(text, maxChars = 64) {
  const first = (text.split(/(?<=[.!?])\s/)[0] || text).trim()
  if (first.length <= maxChars) return first
  const words = first.split(/\s+/)
  let out = ''
  for (const w of words) {
    if ((out + ' ' + w).trim().length > maxChars) break
    out = (out + ' ' + w).trim()
  }
  return out.replace(/[,;:.]?$/, ' …')
}

const LEAD = new Set(['the', 'a', 'an', 'what', 'how', 'why', 'your', 'our', 'automatic',
  'building', 'build', 'using', 'introducing', 'meet', 'stop', 'every', 'on', 'from'])
const TRAIL = new Set(['is', 'are', 'was', 'the', 'a', 'an', 'of', 'for', 'to', 'that', 'it',
  'at', 'in', 'on', 'into', 'and', 'with', 'as', 'not', 'built', 'made', 'designed',
  'powered', 'driven', 'based'])

/** A section heading → a short uppercase keyword chip. Best-effort. */
function distill(heading) {
  let s = heading
    .replace(/`([^`]*)`/g, '$1')
    .replace(/\*\*?([^*]*)\*\*?/g, '$1')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .split(/[:.,—–?!]/)[0]
    .trim()
  let words = s.split(/\s+/).filter(Boolean)
  while (words.length && LEAD.has(words[0].toLowerCase())) words.shift()
  while (words.length && TRAIL.has(words[words.length - 1].toLowerCase())) words.pop()
  const out = []
  let len = 0
  for (const w of words) {
    const add = (out.length ? 1 : 0) + w.length
    if (out.length && len + add > 18) break
    out.push(w)
    len += add
  }
  // Re-trim trailing filler that the budget cut may have left dangling ("… BUILT").
  while (out.length > 1 && TRAIL.has(out[out.length - 1].toLowerCase())) out.pop()
  return out.join(' ').toUpperCase()
}

/** Choose up to 3 representative chips: explicit override → distilled sections → tags. */
function chooseChips(sections, ogChips, tags) {
  if (ogChips.length) return ogChips.map((c) => c.toUpperCase()).slice(0, 3)
  let all = [...new Set(sections.map(distill))].filter((c) => c.length >= 3 && c.length <= 20)
  // Drop the intro-hook (first) and conclusion (last) headings when there are enough.
  let cands = all.length >= 5 ? all.slice(1, -1) : all
  if (!cands.length) cands = all
  const chips = cands.slice(0, 3)
  if (chips.length >= 2) return chips
  return tags.map((t) => t.label.toUpperCase()).slice(0, 3)
}

/** Read the fields + section headings + ogChips the card needs. */
function parseMd(md) {
  const parts = md.split(/^---\s*$/m)
  const block = parts[1] ?? ''
  const body = parts.slice(2).join('---\n')
  const scalar = (key) => {
    const m = block.match(new RegExp(`^${key}:\\s*"?(.*?)"?\\s*$`, 'm'))
    return m ? m[1] : ''
  }
  const author = (block.match(/^\s*name:\s*"?(.*?)"?\s*$/m) || [])[1] || ''
  const tags = []
  const tagRe = /-\s*label:\s*"?(.*?)"?\s*[\r\n]+\s*variant:\s*"?(.*?)"?\s*$/gm
  let t
  while ((t = tagRe.exec(block))) tags.push({ label: t[1], variant: t[2] })

  // ogChips: inline flow list / comma string, or a block `- item` list.
  let ogChips = []
  const inline = block.match(/^ogChips:\s*(.+)$/m)
  if (inline && inline[1].trim()) {
    ogChips = inline[1].replace(/^\[|\]$/g, '').split(',').map((s) => s.trim().replace(/^"|"$/g, '')).filter(Boolean)
  } else if (/^ogChips:\s*$/m.test(block)) {
    const after = block.slice(block.search(/^ogChips:\s*$/m))
    for (const line of after.split('\n').slice(1)) {
      const m = line.match(/^\s*-\s*"?(.*?)"?\s*$/)
      if (m) ogChips.push(m[1])
      else break
    }
  }

  // Section headings from the body (skip fenced code blocks).
  const sections = []
  let fenced = false
  for (const line of body.split('\n')) {
    if (/^\s*```/.test(line)) fenced = !fenced
    if (!fenced) {
      const m = line.match(/^##\s+(.*\S)\s*$/)
      if (m) sections.push(m[1])
    }
  }

  return {
    title: scalar('title'),
    excerpt: scalar('excerpt'),
    date: scalar('date'),
    category: scalar('category'),
    readTime: scalar('readTime'),
    ogImage: scalar('ogImage'),
    author,
    tags,
    sections,
    ogChips,
  }
}

function svgFor(fm) {
  const { title, excerpt, date, category, readTime, author, tags, sections, ogChips } = fm
  const accent = ACCENT[tags[0]?.variant] || ACCENT.amber
  const FONT = 60
  const LS = -0.6
  const lines = splitTitle(title)
  const n = lines.length
  const baselines = { 1: [332], 2: [300, 364], 3: [268, 332, 396] }[n]
  const lastY = baselines[n - 1]
  const last = lines[n - 1]
  const cursorX = Math.round(52 + lineWidth(last.length + 1, FONT, LS) + 20)

  const titleText = lines
    .map((line, i) => {
      const body = i === n - 1 ? `${esc(line)}<tspan fill="#00e676">.</tspan>` : esc(line)
      return `  <text x="52" y="${baselines[i]}" font-size="${FONT}" font-weight="700" letter-spacing="${LS}" fill="#f0f0ee">${body}</text>`
    })
    .join('\n')

  const metaBits = [author.toUpperCase(), fmtDate(date), readTime.toUpperCase()].filter(Boolean)
  const metaTail = metaBits.slice(1).length ? ` · ${metaBits.slice(1).join(' · ')}` : ''
  const catUpper = esc((category || 'from the blog').toUpperCase())
  const crumb = esc((category || 'field-notes').toUpperCase())

  const subY = lastY + 52
  const subText = `  <text x="56" y="${subY}" font-size="14" fill="#a0a09e">${esc(oneLine(excerpt))}</text>`

  // Topic chips: small accent triangle marker + uppercase keyword, laid out in a row.
  const chips = chooseChips(sections, ogChips, tags)
  const chipY = subY + 44
  let cx = 56
  const chipEls = []
  for (const label of chips) {
    const w = 12 + Math.ceil(lineWidth(label.length, 12, 1))
    if (cx + w > 1144) break
    chipEls.push(
      `  <polygon points="${cx},${chipY - 9} ${cx + 8},${chipY - 5} ${cx},${chipY - 1}" fill="${accent}"/>\n` +
        `  <text x="${cx + 16}" y="${chipY}" font-size="12" font-weight="600" letter-spacing="1" fill="#a0a09e">${esc(label)}</text>`,
    )
    cx += w + 34
  }
  const chipRow = chipEls.join('\n')

  // Footer pills: the post's tags (up to 3), else brand defaults.
  const pillDefs = tags.length
    ? tags.slice(0, 3).map((t) => ({ label: t.label.toUpperCase(), color: ACCENT[t.variant] || ACCENT.neutral }))
    : [
        { label: 'SELF-HOSTED', color: ACCENT.green },
        { label: 'YOUR BROKER · YOUR DATA', color: ACCENT.cyan },
        { label: 'NEVER FINANCIAL ADVICE', color: ACCENT.amber },
      ]
  let px = 24
  const pills = pillDefs
    .map(({ label, color }) => {
      const box = `    <rect x="${px}" y="604" width="4" height="4" fill="${color}"/>\n    <text x="${px + 12}" y="612" fill="#a0a09e">${esc(label)}</text>`
      px += 12 + Math.ceil(lineWidth(label.length, 10, 1.4)) + 28
      return box
    })
    .join('\n')

  return `<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg" font-family="JetBrains Mono">
  <defs>
    <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
      <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#ffffff" stroke-opacity="0.02" stroke-width="1"/>
    </pattern>
    <radialGradient id="glow" cx="0.82" cy="0.35" r="0.55">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="vignette" cx="0" cy="1" r="1.4">
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
  <text x="96" y="22" font-size="10" letter-spacing="1.2" fill="#a0a09e">~ / BLOG / ${crumb}</text>
  <text x="1176" y="22" font-size="10" letter-spacing="1.2" text-anchor="end" fill="#606060">AMPLITERM.COM</text>

  <!-- corner crosshairs -->
  <path d="M 24 58 L 24 44 L 38 44" fill="none" stroke="#00e676" stroke-width="1"/>
  <path d="M 1162 44 L 1176 44 L 1176 58" fill="none" stroke="#00e676" stroke-width="1"/>
  <path d="M 24 564 L 24 578 L 38 578" fill="none" stroke="#00e676" stroke-width="1"/>
  <path d="M 1176 564 L 1176 578 L 1162 578" fill="none" stroke="#00e676" stroke-width="1"/>

  <!-- header lockup -->
  <g transform="translate(56, 70)">
    <polygon points="24,3 44,40 4,40" fill="none" stroke="#00e676" stroke-width="1.6"/>
    <line x1="12" y1="29" x2="36" y2="29" stroke="#00e676" stroke-width="1" opacity="0.45"/>
    <line x1="24" y1="40" x2="24" y2="51" stroke="#00e676" stroke-width="1" stroke-dasharray="2,2.5" opacity="0.55"/>
    <line x1="18" y1="51" x2="30" y2="51" stroke="#00e676" stroke-width="1" opacity="0.35"/>
  </g>
  <text x="120" y="94" font-size="16" font-weight="700" letter-spacing="3.5" fill="#f0f0ee">AMPLITERM</text>
  <text x="120" y="112" font-size="10" letter-spacing="3" fill="#606060">FIELD NOTES</text>

  <rect x="984" y="86" width="160" height="28" fill="${accent}11" stroke="${accent}" stroke-width="1"/>
  <text x="1064" y="104" font-size="10" font-weight="600" letter-spacing="2" text-anchor="middle" fill="${accent}">${catUpper}</text>

  <!-- meta line -->
  <text x="56" y="212" font-size="11" letter-spacing="1.3" fill="#606060"><tspan fill="#a0a09e" font-weight="600">${esc(metaBits[0] || 'AMPLITERM')}</tspan>${esc(metaTail)}</text>

  <!-- title -->
${titleText}
  <rect x="${cursorX}" y="${lastY - 48}" width="24" height="50" fill="#00e676"/>
  <rect x="${cursorX - 5}" y="${lastY - 53}" width="34" height="60" fill="#00e676" opacity="0.12"/>

  <!-- description -->
${subText}

  <!-- topic chips (distilled from the post's section headings) -->
${chipRow}

  <!-- footer -->
  <rect x="0" y="586" width="1200" height="44" fill="#111111"/>
  <line x1="0" y1="586" x2="1200" y2="586" stroke="#2a2a2a" stroke-width="1"/>
  <g font-size="10" letter-spacing="1.4">
${pills}
    <text x="1176" y="612" font-weight="600" letter-spacing="1.8" text-anchor="end" fill="#00e676">AMPLITERM.COM / BLOG →</text>
  </g>
</svg>
`
}

/** post's ogImage "/og/blog-x-og.png" → "blog-x"; else "blog-<basename>". */
function svgName(slug, ogImage) {
  const m = /\/og\/(.+?)-og\.png/.exec(ogImage || '')
  return m ? m[1] : `blog-${slug}`
}

function main() {
  let written = 0
  let skipped = 0
  const needsWiring = []
  for (const file of readdirSync(blogDir)) {
    if (!file.endsWith('.md')) continue
    const slug = basename(file, '.md')
    const fm = parseMd(readFileSync(join(blogDir, file), 'utf8'))
    if (!fm.title) {
      console.warn(`⚠ ${file}: no title, skipped`)
      continue
    }
    const name = svgName(slug, fm.ogImage)
    const outPath = join(outDir, `${name}.svg`)
    if (existsSync(outPath) && !force) {
      console.log(`· ${name}.svg exists — skipped (--force to overwrite)`)
      skipped++
      continue
    }
    writeFileSync(outPath, svgFor(fm))
    const chips = chooseChips(fm.sections, fm.ogChips, fm.tags)
    console.log(`✓ ${name}.svg  (${fm.title})  chips: ${chips.join(' · ') || '—'}`)
    written++
    if (!fm.ogImage) needsWiring.push({ file, line: `ogImage: "/og/${name}-og.png"` })
  }

  console.log(`\n${written} written, ${skipped} skipped.`)
  if (written) console.log('Next: npm run og:generate   (renders the new SVGs → public/og/*.png)')
  if (needsWiring.length) {
    console.log('\nAdd the OG image to these posts’ frontmatter so it overrides the dynamic template:')
    for (const w of needsWiring) console.log(`  ${w.file}\n    ${w.line}`)
  }
}

export { svgFor, parseMd, splitTitle, svgName, distill, chooseChips }

// Only run the scan when executed directly, not when imported (e.g. by tests).
if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) main()
