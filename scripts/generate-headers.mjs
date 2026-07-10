/**
 * Blog header image pipeline: renders every SVG in design/headers/*.svg to
 * public/headers/<name>-header.png at 2x (2880×1200) for retina, using the same
 * bundled JetBrains Mono fonts as the OG pipeline (design/og/fonts/).
 *
 * Header canvases are 1440×600. The image is shown with object-fit: cover in
 * three placements (post hero ~3.4:1, index card ~2.4:1, featured slot ~1.8:1),
 * so keep meaningful content inside the crop-safe zone: x 190–1250, y 100–500.
 *
 * Usage: npm run headers:generate  (or: node scripts/generate-headers.mjs [name])
 */
import { Resvg } from '@resvg/resvg-js'
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs'
import { join, dirname, basename } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const srcDir = join(root, 'design/headers')
const outDir = join(root, 'public/headers')
const fontDir = join(root, 'design/og/fonts')

const SCALE_WIDTH = 2880 // 2x of the 1440×600 canvas

const only = process.argv[2]
const svgs = readdirSync(srcDir)
  .filter((f) => f.endsWith('.svg'))
  .filter((f) => !only || basename(f, '.svg') === only)

if (!svgs.length) {
  console.error(only ? `No SVG named "${only}" in design/headers/` : 'No SVGs found in design/headers/')
  process.exit(1)
}

mkdirSync(outDir, { recursive: true })

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
  const out = join(outDir, `${name}-header.png`)
  writeFileSync(out, png)
  console.log(`✓ ${file} → public/headers/${name}-header.png (${resvg.width}×${resvg.height} @2x, ${(png.length / 1024).toFixed(0)} KB)`)
}
