/**
 * OG image pipeline: renders every SVG in design/og/*.svg to public/og/<name>-og.png
 * at 2x (2400×1260) for retina, using the design system's JetBrains Mono weights
 * bundled in design/og/fonts/ (no system-font dependence — renders identically anywhere).
 *
 * Usage: npm run og:generate  (or: node scripts/generate-og.mjs [name])
 */
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, readdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'design/og')
const outDir = join(root, 'public/og')
const fontDir = join(srcDir, 'fonts')

const SCALE_WIDTH = 2400 // 2x of the 1200×630 canvas

const only = process.argv[2]
const svgs = readdirSync(srcDir)
  .filter((f) => f.endsWith('.svg'))
  .filter((f) => !only || basename(f, '.svg') === only)

if (!svgs.length) {
  console.error(only ? `No SVG named "${only}" in design/og/` : 'No SVGs found in design/og/')
  process.exit(1)
}

for (const file of svgs) {
  const name = basename(file, '.svg')
  const svg = readFileSync(join(srcDir, file), 'utf8')

  const resvg = new Resvg(svg, {
    fitTo: { mode: 'width', value: SCALE_WIDTH },
    background: '#0a0a0a',
    font: {
      loadSystemFonts: false,
      defaultFontFamily: 'JetBrains Mono',
      fontFiles: [
        join(fontDir, 'JetBrains_Mono-400-normal.ttf'),
        join(fontDir, 'JetBrains_Mono-600-normal.ttf'),
        join(fontDir, 'JetBrains_Mono-700-normal.ttf'),
      ],
    },
  })

  const png = resvg.render().asPng()
  const out = join(outDir, `${name}-og.png`)
  writeFileSync(out, png)
  console.log(`✓ ${file} → public/og/${name}-og.png (${resvg.width}×${resvg.height} @2x, ${(png.length / 1024).toFixed(0)} KB)`)
}
