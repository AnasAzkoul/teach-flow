// PROTOTYPE. Prints every Accessibility token pair per direction with its WCAG 2.2 ratio.
// Run from the repo root: pnpm prototype:contrast  (add --fails to show only failures)
import { contrast, contrastPairs, DIR_KEYS, DIRECTIONS } from './tokens.ts'

const onlyFails = process.argv.includes('--fails')
let failures = 0
for (const k of DIR_KEYS) {
  const d = DIRECTIONS[k]
  for (const mode of ['light', 'dark'] as const) {
    console.log(`\n${k}. ${d.name} · ${mode}`)
    for (const p of contrastPairs(d, mode)) {
      const r = contrast(p.fg, p.bg)
      const ok = r >= p.min
      if (!ok) failures++
      if (onlyFails && ok) continue
      console.log(
        `  ${ok ? 'PASS' : 'FAIL'}  ${r.toFixed(2).padStart(5)} / ${p.min}  ${p.group.padEnd(26)} ${p.label.padEnd(38)} ${p.fg} on ${p.bg}`,
      )
    }
  }
}
console.log(`\n${failures} failing pair(s)`)
