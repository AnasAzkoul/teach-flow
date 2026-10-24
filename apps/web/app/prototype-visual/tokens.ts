// PROTOTYPE (prototype/visual-design branch). Source of truth for the three visual directions.
// Every colour is written as OKLCH (easy to tune by eye) and converted to hex here, so the CSS,
// the contrast page and the contrast CLI all read the exact same values.
// Single file with no imports so `node contrast-cli.ts` can load it directly.

export type DirKey = 'A' | 'B' | 'C'
export type Mode = 'light' | 'dark'

// ---------- colour maths ----------

function oklchToLinear(L: number, C: number, h: number): [number, number, number] {
  const a = C * Math.cos((h * Math.PI) / 180)
  const b = C * Math.sin((h * Math.PI) / 180)
  const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3
  const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3
  const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3
  return [
    4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s,
    -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s,
    -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s,
  ]
}

const inGamut = (rgb: number[]) => rgb.every((v) => v >= -1e-4 && v <= 1 + 1e-4)

/** oklch → hex, lowering chroma until it fits sRGB. */
export function oklch(L: number, C: number, h: number): string {
  let c = C
  let rgb = oklchToLinear(L, c, h)
  while (!inGamut(rgb) && c > 0) {
    c = Math.max(0, c - 0.002)
    rgb = oklchToLinear(L, c, h)
  }
  const enc = (v: number) => {
    v = Math.min(1, Math.max(0, v))
    const s = v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055
    return Math.round(s * 255).toString(16).padStart(2, '0')
  }
  return '#' + rgb.map(enc).join('')
}

export function luminance(hex: string): number {
  const n = hex.replace('#', '')
  const ch = [0, 2, 4].map((i) => parseInt(n.slice(i, i + 2), 16) / 255)
  const lin = ch.map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
  return 0.2126 * lin[0]! + 0.7152 * lin[1]! + 0.0722 * lin[2]!
}

export function contrast(a: string, b: string): number {
  const [x, y] = [luminance(a), luminance(b)].sort((p, q) => q - p)
  return (x! + 0.05) / (y! + 0.05)
}

// ---------- workspace colours ----------

// One set of 8 colour families, in the same slot order, for every direction: a teacher's workspace
// keeps its colour family whichever direction they pick. Directions only change strength (chroma,
// dot lightness). Hue angles (OKLCH) sit inside the gaps visual-direction.md leaves: away from both
// accents (teal 192, indigo 277), pure red (27), amber (62) and success green (152). They were picked
// by maximising the smallest dot-to-dot ΔE (OKLab) across all three directions: 0.040, up from 0.027
// (ochre-brown vs cocoa, now gone). Blue/violet still merge for deuteranopes; the workspace name is
// always next to the colour, so colour is never the only signal.
const HUES = {
  'slate-blue': 251,
  olive: 95,
  plum: 331,
  'ochre-brown': 69,
  rose: 2,
  sky: 212,
  violet: 300,
  moss: 133,
} as const
export const WS_FAMILIES = Object.keys(HUES) as HueName[]
export type HueName = keyof typeof HUES

export interface WsColour {
  slot: number
  name: HueName
  light: { dot: string; tint: string; text: string }
  dark: { dot: string; tint: string; text: string }
}

function wsPalette(names: HueName[], chroma: number, hueShift: number, dotL: number): WsColour[] {
  return names.map((name, i) => {
    const h = HUES[name] + hueShift
    // Brown reads as brown only when darker and less saturated.
    const c = name === 'ochre-brown' ? chroma * 0.85 : chroma
    const L = name === 'ochre-brown' ? dotL - 0.03 : dotL
    return {
      slot: i + 1,
      name,
      light: {
        dot: oklch(L, c, h),
        tint: oklch(0.948, c * 0.3, h),
        text: oklch(0.42, c * 0.85, h),
      },
      dark: {
        dot: oklch(name === 'ochre-brown' ? 0.66 : 0.7, c * 0.95, h),
        tint: oklch(0.3, c * 0.42, h),
        text: oklch(0.9, c * 0.35, h),
      },
    }
  })
}

// ---------- directions ----------

export interface Direction {
  key: DirKey
  name: string
  feel: string
  fonts: { ui: string; title: string; titleWeight: number; titleTracking: string }
  /** the two small type steps; default 12 / 14. Source Sans 3 runs small, so Notebook uses 13 / 15. */
  small?: { xs: number; sm: number }
  radius: { card: number; control: number }
  density: { row: number; cardPad: number; gap: number; prosePad: number }
  shadow: string
  linkUnderline: boolean
  colours: Record<Mode, Record<string, string>>
  workspaces: WsColour[]
}

/** Neutral ramp: one warm hue, chroma decides "how warm". */
function neutrals(h: number, c: number, surfaceL: number, pageL: number) {
  return {
    page: oklch(pageL, c, h),
    surface: oklch(surfaceL, c * 0.35, h),
    sunken: oklch(pageL - 0.03, c * 1.1, h),
    hairline: oklch(0.9, c * 1.1, h),
    field: oklch(0.6, c * 0.9, h),
    ink: oklch(0.255, c * 0.7, h),
    muted: oklch(0.5, c * 0.9, h),
  }
}
function darkNeutrals(h: number, c: number) {
  return {
    page: oklch(0.175, c * 0.6, h),
    surface: oklch(0.215, c * 0.6, h),
    sunken: oklch(0.25, c * 0.6, h),
    hairline: oklch(0.31, c * 0.6, h),
    field: oklch(0.52, c * 0.6, h),
    ink: oklch(0.93, c * 0.5, h),
    muted: oklch(0.72, c * 0.6, h),
  }
}

// Semantic colours are shared; only their tints pick up a little of the page warmth.
const semanticLight = {
  danger: oklch(0.515, 0.17, 27),
  'danger-strong': oklch(0.5, 0.175, 27),
  'danger-on': '#ffffff',
  'danger-tint': oklch(0.965, 0.018, 27),
  warning: oklch(0.52, 0.11, 62),
  'warning-tint': oklch(0.965, 0.035, 85),
  success: oklch(0.5, 0.1, 152),
  'success-tint': oklch(0.965, 0.025, 152),
}
const semanticDark = {
  danger: oklch(0.72, 0.14, 25),
  'danger-strong': oklch(0.55, 0.16, 27),
  'danger-on': '#ffffff',
  'danger-tint': oklch(0.28, 0.06, 27),
  warning: oklch(0.8, 0.11, 75),
  'warning-tint': oklch(0.28, 0.05, 75),
  success: oklch(0.75, 0.1, 152),
  'success-tint': oklch(0.27, 0.04, 152),
}

const A_HUE = 78
const A: Direction = {
  key: 'A',
  name: 'Notebook',
  feel: 'Warm, editorial, a paper planner',
  fonts: { ui: "'Source Sans 3'", title: "'Newsreader'", titleWeight: 500, titleTracking: '-0.005em' },
  small: { xs: 13, sm: 15 },
  radius: { card: 12, control: 8 },
  density: { row: 44, cardPad: 16, gap: 16, prosePad: 24 },
  shadow: '0 10px 28px -8px rgb(70 52 24 / 0.20), 0 2px 6px -1px rgb(70 52 24 / 0.08)',
  linkUnderline: false,
  colours: {
    light: {
      ...neutrals(A_HUE, 0.02, 0.995, 0.962),
      accent: oklch(0.47, 0.075, 192),
      'accent-hover': oklch(0.41, 0.07, 192),
      'accent-on': '#ffffff',
      'accent-soft': oklch(0.93, 0.03, 192),
      focus: oklch(0.47, 0.075, 192),
      ...semanticLight,
    },
    dark: {
      ...darkNeutrals(A_HUE, 0.02),
      accent: oklch(0.74, 0.08, 192),
      'accent-hover': oklch(0.8, 0.07, 192),
      'accent-on': oklch(0.2, 0.03, 192),
      'accent-soft': oklch(0.3, 0.04, 192),
      focus: oklch(0.74, 0.08, 192),
      ...semanticDark,
    },
  },
  // Earthy: low chroma.
  workspaces: wsPalette(WS_FAMILIES, 0.075, 0, 0.56),
}

const B_HUE = 70
const B: Direction = {
  key: 'B',
  name: 'Studio',
  feel: 'Friendly, bright and calm, Things-like',
  fonts: { ui: "'Figtree'", title: "'Figtree'", titleWeight: 600, titleTracking: '-0.01em' },
  radius: { card: 8, control: 6 },
  density: { row: 40, cardPad: 12, gap: 12, prosePad: 20 },
  shadow: '0 8px 24px -8px rgb(41 37 36 / 0.18), 0 2px 4px -1px rgb(41 37 36 / 0.06)',
  linkUnderline: false,
  colours: {
    light: {
      ...neutrals(B_HUE, 0.008, 1, 0.975),
      accent: oklch(0.51, 0.17, 277),
      'accent-hover': oklch(0.45, 0.17, 277),
      'accent-on': '#ffffff',
      'accent-soft': oklch(0.945, 0.03, 277),
      focus: oklch(0.51, 0.17, 277),
      ...semanticLight,
    },
    dark: {
      ...darkNeutrals(B_HUE, 0.008),
      accent: oklch(0.74, 0.12, 277),
      'accent-hover': oklch(0.8, 0.1, 277),
      'accent-on': oklch(0.2, 0.05, 277),
      'accent-soft': oklch(0.3, 0.06, 277),
      focus: oklch(0.74, 0.12, 277),
      ...semanticDark,
    },
  },
  // Clear: more chroma, a touch lighter.
  workspaces: wsPalette(WS_FAMILIES, 0.105, 0, 0.58),
}

const C_HUE = 70
const C: Direction = {
  key: 'C',
  name: 'Ledger',
  feel: 'Crisp, precise, a warm Linear',
  fonts: { ui: "'Inter'", title: "'Inter'", titleWeight: 600, titleTracking: '-0.015em' },
  radius: { card: 6, control: 4 },
  density: { row: 36, cardPad: 12, gap: 8, prosePad: 16 },
  shadow: '0 6px 18px -6px rgb(28 27 25 / 0.22), 0 1px 3px rgb(28 27 25 / 0.08)',
  linkUnderline: true,
  colours: {
    light: {
      ...neutrals(C_HUE, 0.004, 1, 0.98),
      accent: oklch(0.26, 0.008, C_HUE),
      'accent-hover': oklch(0.36, 0.008, C_HUE),
      'accent-on': '#ffffff',
      'accent-soft': oklch(0.935, 0.005, C_HUE),
      focus: oklch(0.26, 0.008, C_HUE),
      ...semanticLight,
    },
    dark: {
      ...darkNeutrals(C_HUE, 0.004),
      accent: oklch(0.93, 0.004, C_HUE),
      'accent-hover': oklch(0.85, 0.004, C_HUE),
      'accent-on': oklch(0.2, 0.004, C_HUE),
      'accent-soft': oklch(0.3, 0.004, C_HUE),
      focus: oklch(0.93, 0.004, C_HUE),
      ...semanticDark,
    },
  },
  // Muted: low chroma. No hue nudge any more (it moved moss toward success green); the near-neutral
  // page already makes Ledger read cooler.
  workspaces: wsPalette(WS_FAMILIES, 0.07, 0, 0.56),
}

export const DIRECTIONS: Record<DirKey, Direction> = { A, B, C }
export const DIR_KEYS: DirKey[] = ['A', 'B', 'C']

// Shared by all directions.
export const TYPE_SCALE = [
  { token: 'xs', size: 12, line: 16, use: 'timestamps, badges, captions' },
  { token: 'sm', size: 14, line: 20, use: 'UI text: labels, rows, cards, buttons' },
  { token: 'base', size: 16, line: 26, use: 'prose: report fields, stages, notes (max 70ch)' },
  { token: 'lg', size: 18, line: 26, use: 'card and section titles' },
  { token: 'xl', size: 24, line: 32, use: 'page titles' },
  { token: '2xl', size: 30, line: 38, use: 'rare: big numbers' },
]
export const SPACING = [4, 8, 12, 16, 24, 32, 48]

// ---------- CSS output ----------

function block(d: Direction, mode: Mode): string {
  const lines = Object.entries(d.colours[mode]).map(([k, v]) => `--${k}:${v};`)
  for (const w of d.workspaces) {
    const c = w[mode]
    lines.push(`--ws${w.slot}-dot:${c.dot};--ws${w.slot}-tint:${c.tint};--ws${w.slot}-text:${c.text};`)
  }
  return lines.join('')
}

export function cssFor(d: Direction): string {
  const shape = [
    `--font-ui:${d.fonts.ui}, ui-sans-serif, system-ui, sans-serif;`,
    `--font-title-family:${d.fonts.title}, ${d.fonts.ui}, ui-serif, serif;`,
    `--title-weight:${d.fonts.titleWeight};--title-tracking:${d.fonts.titleTracking};`,
    `--fs-xs:${d.small?.xs ?? 12}px;--fs-sm:${d.small?.sm ?? 14}px;`,
    `--r-card:${d.radius.card}px;--r-control:${d.radius.control}px;`,
    `--row-h:${d.density.row}px;--card-pad:${d.density.cardPad}px;--block-gap:${d.density.gap}px;--prose-pad:${d.density.prosePad}px;`,
    `--shadow-overlay:${d.shadow};`,
    `--link-decoration:${d.linkUnderline ? 'underline' : 'none'};`,
  ].join('')
  const sel = `[data-dir="${d.key}"]`
  return (
    `${sel}{${shape}${block(d, 'light')}color-scheme:light}` +
    `${sel}[data-theme="dark"],${sel} [data-theme="dark"]{${block(d, 'dark')}color-scheme:dark}`
  )
}

export const ALL_CSS = DIR_KEYS.map((k) => cssFor(DIRECTIONS[k])).join('\n')

// ---------- contrast pairs (the Accessibility list in visual-direction.md) ----------

export interface Pair {
  group: string
  label: string
  fg: string
  bg: string
  fgToken: string
  bgToken: string
  min: number // 4.5 text, 3 large text / UI parts
  kind: 'text' | 'ui'
}

export function contrastPairs(d: Direction, mode: Mode): Pair[] {
  const c = d.colours[mode]
  const p = (group: string, label: string, fgToken: string, bgToken: string, kind: 'text' | 'ui'): Pair => ({
    group,
    label,
    fgToken,
    bgToken,
    fg: c[fgToken]!,
    bg: c[bgToken]!,
    kind,
    min: kind === 'text' ? 4.5 : 3,
  })
  const pairs: Pair[] = [
    p('Text', 'Ink on surface', 'ink', 'surface', 'text'),
    p('Text', 'Ink on page', 'ink', 'page', 'text'),
    p('Muted text', 'Muted on surface', 'muted', 'surface', 'text'),
    p('Muted text', 'Muted on page', 'muted', 'page', 'text'),
    p('Muted text', 'Muted on sunken (hover, segmented)', 'muted', 'sunken', 'text'),
    p('Inputs', 'Input border on surface', 'field', 'surface', 'ui'),
    p('Inputs', 'Input border on page', 'field', 'page', 'ui'),
    p('Accent', 'Link text on surface', 'accent', 'surface', 'text'),
    p('Accent', 'Link text on page', 'accent', 'page', 'text'),
    p('Accent', 'Button label on accent fill', 'accent-on', 'accent', 'text'),
    p('Accent', 'Button label on accent hover', 'accent-on', 'accent-hover', 'text'),
    p('Accent', 'Accent fill against surface', 'accent', 'surface', 'ui'),
    p('Accent', 'Accent fill against page', 'accent', 'page', 'ui'),
    p('Accent', 'Active nav text on accent-soft', 'accent', 'accent-soft', 'text'),
    p('Focus', 'Focus ring on surface', 'focus', 'surface', 'ui'),
    p('Focus', 'Focus ring on page', 'focus', 'page', 'ui'),
    p('Semantic', 'Danger text on surface', 'danger', 'surface', 'text'),
    p('Semantic', 'Danger text on danger tint', 'danger', 'danger-tint', 'text'),
    p('Semantic', 'Text on solid substitute strip', 'danger-on', 'danger-strong', 'text'),
    p('Semantic', 'Warning text on surface', 'warning', 'surface', 'text'),
    p('Semantic', 'Warning text on warning tint', 'warning', 'warning-tint', 'text'),
    p('Semantic', 'Success text on surface', 'success', 'surface', 'text'),
    p('Semantic', 'Success text on success tint', 'success', 'success-tint', 'text'),
  ]
  for (const w of d.workspaces) {
    const ws = w[mode]
    const g = `Workspace ${w.slot} · ${w.name}`
    pairs.push(
      { group: g, label: 'Text on tint (lesson block)', fgToken: `ws${w.slot}-text`, bgToken: `ws${w.slot}-tint`, fg: ws.text, bg: ws.tint, kind: 'text', min: 4.5 },
      { group: g, label: 'Dot on surface (switcher, My week legend)', fgToken: `ws${w.slot}-dot`, bgToken: 'surface', fg: ws.dot, bg: c.surface!, kind: 'ui', min: 3 },
      { group: g, label: 'Clash outline (danger) on tint', fgToken: 'danger', bgToken: `ws${w.slot}-tint`, fg: c.danger!, bg: ws.tint, kind: 'ui', min: 3 },
    )
  }
  return pairs
}
