# Visual design: decisions

Outcome of the visual-design prototype and the grilling sessions that reviewed it (22–24 Oct 2026). It settles the open questions in `visual-direction.md`, which still holds every shared rule (personality, colour roles, accessibility, shape, motion) except where this file says otherwise. Layout changes to Home and My week that came out of the same review are recorded in `phase-1-screen-designs.md`. Terms follow `GLOSSARY.md`.

New glossary terms from this session: **Appearance**, **Notebook / Studio / Ledger**. Updated entries: **My week**, **Workspace colour**.

## Prototype

- Branch **`prototype/visual-design`** (throwaway; never merged). `git log main..prototype/visual-design` lists its steps.
- **`apps/web/app/prototype-visual/tokens.ts`** is the source of truth for every value below: the three directions, neutral ramps, accents, semantic colours, the 8 workspace colours, radius, density, shadows, fonts and the type scale. Colours are written in OKLCH there and converted to the hex values shown here.
- **`apps/web/app/assets/css/main.css`** maps the tokens to Tailwind.
- **`pnpm prototype:contrast`** prints every WCAG pair per direction and mode (`--fails` shows only failures).
- `pnpm prototype:visual` runs the screens: Home, Lesson page, My week (light and rough dark) and a contrast page.
- The tables in this file were generated from `tokens.ts` on that branch, not typed by hand. If the values change, regenerate them from there.

## Direction: all three ship, chosen per user

- **All three directions ship**: **Notebook** (A), **Studio** (B) and **Ledger** (C).
- Each user picks one for themself in a new **Appearance** user setting. It is account-level (not in workspace settings), applies in every workspace, and nobody can set it for anyone else.
  - Why: each direction changes the whole personality of the app (type, density, radius), so it is personal taste, not a school's branding. And because it is the same in every workspace, the app never changes look partway through a task when the page moves to another workspace.
- **Default for new users: Notebook.** The product owner kept choosing it in review, and its warm paper feel is the furthest from "plain default shadcn".
- **The Appearance setting** shows the three names, each with a one-line description and a small Today-card preview. Choosing one applies straight away; there is no save button.
  - **Notebook**: warm and paper-like
  - **Studio**: bright and friendly
  - **Ledger**: crisp and compact
- **Launch scope**: all three in **light mode**. Dark mode for all three stays the first visual follow-up after launch, as `visual-direction.md` already settled. Dark tokens exist and pass AA (below), but they are rough and not reviewed screen by screen.
- Appearance changes looks only. Layouts, words, colour roles and workspace colours are the same in every appearance.

## Dials per direction

Each direction keeps the dials it was prototyped with: accent (deep teal / indigo / near-black ink), warmth of the neutrals, typeface, radius and density.

| Dial | A. Notebook | B. Studio | C. Ledger |
|---|---|---|---|
| UI typeface | Source Sans 3 | Figtree | Inter |
| Page-title typeface | Newsreader 500, tracking -0.005em | Figtree 600, tracking -0.01em | Inter 600, tracking -0.015em |
| Small steps (xs / sm) | 13 / 15 px | 12 / 14 px | 12 / 14 px |
| Radius (card / control) | 12 / 8 px | 8 / 6 px | 6 / 4 px |
| List row height | 44 px | 40 px | 36 px |
| Card padding | 16 px | 12 px | 12 px |
| Gap between blocks | 16 px | 12 px | 8 px |
| Prose padding | 24 px | 20 px | 16 px |
| Links underlined | no | no | yes |
| Overlay shadow | `0 10px 28px -8px rgb(70 52 24 / 0.20), 0 2px 6px -1px rgb(70 52 24 / 0.08)` | `0 8px 24px -8px rgb(41 37 36 / 0.18), 0 2px 4px -1px rgb(41 37 36 / 0.06)` | `0 6px 18px -6px rgb(28 27 25 / 0.22), 0 1px 3px rgb(28 27 25 / 0.08)` |

- **Notebook keeps Newsreader for page titles only**: one heading per page, the strongest editorial cue, and the font only loads for Notebook users. Everything else in Notebook is Source Sans 3.
- **Notebook's small type steps are 13 / 15 px** instead of 12 / 14, with the same line heights. Source Sans 3 has short lowercase letters and reads small at 14 px. The two small steps are the only per-direction part of the type scale (`--fs-xs`, `--fs-sm`).
- **Ledger underlines links**, because its accent is ink with no hue and links would otherwise look like body text.
- **Shadows**: one level only, `--shadow-overlay`, for menus, popovers, dialogs, sheets and dragged items (as settled in `visual-direction.md`).

## Type scale and spacing

Shared by all three directions, except Notebook's two small steps.

| Token | Size | Line height | Use |
|---|---|---|---|
| `xs` | 12 px (Notebook 13 px) | 16 px | timestamps, badges, captions |
| `sm` | 14 px (Notebook 15 px) | 20 px | UI text: labels, rows, cards, buttons |
| `base` | 16 px | 26 px | prose: report fields, stages, notes (max 70ch) |
| `lg` | 18 px | 26 px | card and section titles |
| `xl` | 24 px | 32 px | page titles |
| `2xl` | 30 px | 38 px | rare: big numbers |

- **Spacing steps** (4 px grid): 4 / 8 / 12 / 16 / 24 / 32 / 48 px.
- Tabular figures for times, dates and hours, as settled in `visual-direction.md`.

## Colour tokens

Components use these semantic tokens, never raw palette values. Semantic colours (danger, warning, success) are the same in every direction.

### Light (launch)

| Token | Notebook | Studio | Ledger |
|---|---|---|---|
| `--page` | `#faf1e4` | `#faf6f1` | `#faf8f6` |
| `--surface` | `#fffdfb` | `#ffffff` | `#ffffff` |
| `--sunken` | `#f1e7d9` | `#f1ece7` | `#f0eeeb` |
| `--hairline` | `#e6ddce` | `#e2ddd8` | `#e0dddb` |
| `--field` | `#867f74` | `#837f7c` | `#82807e` |
| `--ink` | `#27221b` | `#252220` | `#242321` |
| `--muted` | `#696258` | `#66635f` | `#656361` |
| `--accent` | `#146866` | `#5155c4` | `#272320` |
| `--accent-hover` | `#015654` | `#4243b0` | `#403c39` |
| `--accent-on` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--accent-soft` | `#d2efed` | `#e8ecff` | `#ece9e6` |
| `--focus` | `#146866` | `#5155c4` | `#272320` |
| `--danger` | `#b5302c` | `#b5302c` | `#b5302c` |
| `--danger-strong` | `#b12725` | `#b12725` | `#b12725` |
| `--danger-on` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--danger-tint` | `#fef0ee` | `#fef0ee` | `#fef0ee` |
| `--warning` | `#955816` | `#955816` | `#955816` |
| `--warning-tint` | `#fef2d9` | `#fef2d9` | `#fef2d9` |
| `--success` | `#2f7346` | `#2f7346` | `#2f7346` |
| `--success-tint` | `#e8f9eb` | `#e8f9eb` | `#e8f9eb` |

- `--field` is the input border (3:1); `--hairline` is the decorative card and section border (exempt).
- `--sunken` is for hover rows and segmented controls; `--accent-soft` is for the active nav item.
- `--danger-strong` with `--danger-on` was the Needs a substitute strip's fill. The strip is gone (see Colour use below); the pair is kept, still AA, for a solid destructive button where one is needed.

### Dark (rough, first follow-up)

| Token | Notebook | Studio | Ledger |
|---|---|---|---|
| `--page` | `#13100b` | `#12100e` | `#11100f` |
| `--surface` | `#1d1913` | `#1b1917` | `#1a1918` |
| `--sunken` | `#25211b` | `#23211f` | `#222120` |
| `--hairline` | `#34302a` | `#32302e` | `#31302f` |
| `--field` | `#6d6861` | `#6b6866` | `#6a6967` |
| `--ink` | `#ece7e1` | `#eae7e5` | `#e9e8e6` |
| `--muted` | `#a9a49c` | `#a6a4a1` | `#a5a4a3` |
| `--accent` | `#6abbb8` | `#98a3f6` | `#eae7e5` |
| `--accent-hover` | `#87cdc9` | `#adb8fe` | `#cfcdcb` |
| `--accent-on` | `#031a19` | `#11132c` | `#171614` |
| `--accent-soft` | `#113433` | `#262a4b` | `#2f2d2c` |
| `--focus` | `#6abbb8` | `#98a3f6` | `#eae7e5` |
| `--danger` | `#f07f77` | `#f07f77` | `#f07f77` |
| `--danger-strong` | `#bd423a` | `#bd423a` | `#bd423a` |
| `--danger-on` | `#ffffff` | `#ffffff` | `#ffffff` |
| `--danger-tint` | `#421c18` | `#421c18` | `#421c18` |
| `--warning` | `#e7b369` | `#e7b369` | `#e7b369` |
| `--warning-tint` | `#372508` | `#372508` | `#372508` |
| `--success` | `#7cc08f` | `#7cc08f` | `#7cc08f` |
| `--success-tint` | `#172c1d` | `#172c1d` | `#172c1d` |

## Workspace colours

**One shared set of 8 colour families, in the same slot order, in every direction.** A teacher recognises a workspace by its colour, so switching Appearance must not change it.

| Slot | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
|---|---|---|---|---|---|---|---|---|
| Family | slate-blue | olive | plum | ochre-brown | rose | sky | violet | moss |

- **Directions only change strength** (chroma and lightness): Notebook earthy, Studio clear, Ledger muted. The hue of each family is the same everywhere. Ledger's earlier +8° hue shift is gone, because it pushed moss toward success green.
- **Removed from the illustrative set**: teal, because it is Notebook's accent, and cocoa, which was too close to ochre-brown.
- **How the hues were picked**: inside the gaps `visual-direction.md` leaves (away from both hued accents, pure red, amber and success green), by maximising the smallest dot-to-dot difference (ΔE in OKLab) across the three directions. The closest pair went from 0.027 (ochre-brown vs cocoa) to 0.037 or better in light mode (closest pair per direction and mode):
  - Notebook light: 0.040 (plum vs violet)
  - Notebook dark: 0.038 (plum vs rose)
  - Studio light: 0.056 (olive vs ochre-brown)
  - Studio dark: 0.052 (plum vs violet)
  - Ledger light: 0.037 (plum vs violet)
  - Ledger dark: 0.035 (plum vs violet)

- **Colour blindness**: slate-blue and violet still look alike to deuteranopes. This is acceptable because the workspace name is always next to the colour.
- **Ochre-brown** is a little darker and less saturated than the other dots, because brown only reads as brown that way. Its dark-mode dot is darker too.
- Each colour has three tokens: **dot** (switcher, My week legend, anywhere a workspace is named), **tint** (My week lesson block fill) and **text** (text on the tint). The block's left edge uses the dot shade.

### Light (launch)

| Slot | Family | Notebook dot / tint / text | Studio dot / tint / text | Ledger dot / tint / text |
|---|---|---|---|---|
| 1 | slate-blue | `#53789f` / `#e3effd` / `#324f6f` | `#487eb6` / `#e2f0ff` / `#234f7c` | `#55779d` / `#e4effc` / `#344f6d` |
| 2 | olive | `#82743f` / `#f2eedd` / `#584d21` | `#8e7923` / `#f4eed7` / `#5c4c02` | `#817443` / `#f2eede` / `#574d25` |
| 3 | plum | `#8e6489` / `#f7e9f5` / `#61405d` | `#9e6297` / `#fbe7f8` / `#683963` | `#8d6588` / `#f7e9f4` / `#60415c` |
| 4 | ochre-brown | `#846542` / `#f7ece0` / `#60482b` | `#936733` / `#faebdb` / `#684519` | `#836645` / `#f6ece1` / `#5f482e` |
| 5 | rose | `#996271` / `#fce8ec` / `#6a3e4a` | `#ad5e75` / `#ffe7ec` / `#743649` | `#976371` / `#fbe8ed` / `#683f4a` |
| 6 | sky | `#37808e` / `#def2f7` / `#185661` | `#008a9d` / `#d7f4fa` / `#005764` | `#3d7f8c` / `#dff2f6` / `#1e5660` |
| 7 | violet | `#7b6a9a` / `#f0ebfb` / `#52456b` | `#846baf` / `#f0eafe` / `#554176` | `#7b6b98` / `#f0ebfa` / `#524669` |
| 8 | moss | `#637e50` / `#e8f1e2` / `#3f5530` | `#618744` / `#e6f3dd` / `#395720` | `#647e53` / `#e8f1e3` / `#405432` |

### Dark (rough)

| Slot | Family | Notebook dot / tint / text | Studio dot / tint / text | Ledger dot / tint / text |
|---|---|---|---|---|
| 1 | slate-blue | `#7da2ca` / `#222f3d` / `#d2e0ef` | `#6ea3db` / `#1c2f43` / `#cde0f6` | `#80a2c7` / `#232f3c` / `#d3e0ee` |
| 2 | olive | `#ac9e6b` / `#332e1b` / `#e3decb` | `#b29e51` / `#352e12` / `#e5dec3` | `#ab9e6f` / `#322e1d` / `#e3decc` |
| 3 | plum | `#b98fb3` / `#372835` / `#e9d8e6` | `#c287bb` / `#3b2538` / `#edd6e9` | `#b790b2` / `#372835` / `#e8d8e6` |
| 4 | ochre-brown | `#ab8c6a` / `#372b1f` / `#e8dccf` | `#b48957` / `#3a2a18` / `#ecdbc8` | `#a98c6d` / `#362c20` / `#e7dcd0` |
| 5 | rose | `#c58c9b` / `#3b272c` / `#eed7dc` | `#d28499` / `#40242c` / `#f4d4dc` | `#c28d9b` / `#3b282d` / `#edd8dd` |
| 6 | sky | `#67abb8` / `#1a3237` / `#cbe3e8` | `#44afc2` / `#0d343b` / `#c3e5ec` | `#6caab7` / `#1b3236` / `#cde3e7` |
| 7 | violet | `#a595c5` / `#302a3b` / `#e0daed` | `#a890d3` / `#312941` / `#e1d9f3` | `#a495c2` / `#302b3b` / `#e0dbec` |
| 8 | moss | `#8da87b` / `#283121` / `#d7e2d0` | `#86ac6b` / `#25331b` / `#d5e4cb` | `#8ea87d` / `#283122` / `#d8e2d1` |

## Colour use: what changed

- **There is no solid-colour alert fill anywhere.** `visual-direction.md` made the Needs a substitute strip the one exception; the strip has been removed from Home (`phase-1-screen-designs.md`), so the exception is gone.
- **To do** shows urgency as a coloured icon plus a coloured type label only. Timings ("Tomorrow", "2 days overdue") are ink, not red. To do has no filled buttons: outlined for the main action, ghost for secondary ones.
- **Team items you can only nudge** (Send reminder, Discuss, or already handled) are grey, never red. Red means only what the viewer must decide or do themself.
- **The one filled "do this next" button** is the main button on Today cards (and the same button on the My week lesson card).

## Motion

- **Mark done gets a 200 ms drawn check**, only when marking a report done. Under "reduce motion" the check simply appears. Everything else stays as settled: 150–200 ms fades and slides, nothing bouncy.

## Contrast results

`pnpm prototype:contrast` on `prototype/visual-design`: **282 pairs, 0 failures** across all 6 combinations (3 directions × light and dark). The pairs are the Accessibility list in `visual-direction.md`: text, muted text, input borders, accent (links, button labels, fills, active nav), focus ring, semantic colours, and for each workspace colour the text on its tint, the dot on the surface (switcher, My week legend) and the red clash outline on its tint.

Lowest ratio in each group, against its minimum (4.5 for text, 3 for UI parts):

| Group (lowest ratio / minimum) | Notebook light | Notebook dark | Studio light | Studio dark | Ledger light | Ledger dark |
|---|---|---|---|---|---|---|
| Text | 14.10 / 4.5 | 14.23 / 4.5 | 14.69 / 4.5 | 14.24 / 4.5 | 14.82 / 4.5 | 14.34 / 4.5 |
| Muted text | 4.92 / 4.5 | 6.46 / 4.5 | 5.09 / 4.5 | 6.45 / 4.5 | 5.17 / 4.5 | 6.46 / 4.5 |
| Inputs | 3.54 / 3 | 3.17 / 3 | 3.69 / 3 | 3.17 / 3 | 3.71 / 3 | 3.20 / 3 |
| Accent | 5.41 / 4.5 | 6.02 / 4.5 | 5.19 / 4.5 | 5.88 / 4.5 | 10.92 / 4.5 | 11.13 / 4.5 |
| Focus | 5.86 / 3 | 7.84 / 3 | 5.66 / 3 | 7.43 / 3 | 14.71 / 3 | 14.26 / 3 |
| Semantic | 5.13 / 4.5 | 5.24 / 4.5 | 5.13 / 4.5 | 5.24 / 4.5 | 5.13 / 4.5 | 5.24 / 4.5 |
| Workspace colours | 4.46 / 3 | 5.15 / 3 | 4.10 / 3 | 5.10 / 3 | 4.52 / 3 | 5.15 / 3 |
| **Failures** | 0 | 0 | 0 | 0 | 0 | 0 |

<details>
<summary>Every pair</summary>

#### Notebook · light

| Pair | Colours | Ratio | Min |
|---|---|---|---|
| Text: Ink on surface | `#27221b` on `#fffdfb` | 15.55 | 4.5 |
| Text: Ink on page | `#27221b` on `#faf1e4` | 14.10 | 4.5 |
| Muted text: Muted on surface | `#696258` on `#fffdfb` | 5.93 | 4.5 |
| Muted text: Muted on page | `#696258` on `#faf1e4` | 5.38 | 4.5 |
| Muted text: Muted on sunken (hover, segmented) | `#696258` on `#f1e7d9` | 4.92 | 4.5 |
| Inputs: Input border on surface | `#867f74` on `#fffdfb` | 3.90 | 3 |
| Inputs: Input border on page | `#867f74` on `#faf1e4` | 3.54 | 3 |
| Accent: Link text on surface | `#146866` on `#fffdfb` | 6.46 | 4.5 |
| Accent: Link text on page | `#146866` on `#faf1e4` | 5.86 | 4.5 |
| Accent: Button label on accent fill | `#ffffff` on `#146866` | 6.56 | 4.5 |
| Accent: Button label on accent hover | `#ffffff` on `#015654` | 8.54 | 4.5 |
| Accent: Accent fill against surface | `#146866` on `#fffdfb` | 6.46 | 3 |
| Accent: Accent fill against page | `#146866` on `#faf1e4` | 5.86 | 3 |
| Accent: Active nav text on accent-soft | `#146866` on `#d2efed` | 5.41 | 4.5 |
| Focus: Focus ring on surface | `#146866` on `#fffdfb` | 6.46 | 3 |
| Focus: Focus ring on page | `#146866` on `#faf1e4` | 5.86 | 3 |
| Semantic: Danger text on surface | `#b5302c` on `#fffdfb` | 6.04 | 4.5 |
| Semantic: Danger text on danger tint | `#b5302c` on `#fef0ee` | 5.52 | 4.5 |
| Semantic: Text on solid substitute strip | `#ffffff` on `#b12725` | 6.59 | 4.5 |
| Semantic: Warning text on surface | `#955816` on `#fffdfb` | 5.62 | 4.5 |
| Semantic: Warning text on warning tint | `#955816` on `#fef2d9` | 5.13 | 4.5 |
| Semantic: Success text on surface | `#2f7346` on `#fffdfb` | 5.65 | 4.5 |
| Semantic: Success text on success tint | `#2f7346` on `#e8f9eb` | 5.24 | 4.5 |
| Workspace 1 · slate-blue: Text on tint (lesson block) | `#324f6f` on `#e3effd` | 7.26 | 4.5 |
| Workspace 1 · slate-blue: Dot on surface (switcher, My week legend) | `#53789f` on `#fffdfb` | 4.54 | 3 |
| Workspace 1 · slate-blue: Clash outline (danger) on tint | `#b5302c` on `#e3effd` | 5.27 | 3 |
| Workspace 2 · olive: Text on tint (lesson block) | `#584d21` on `#f2eedd` | 7.22 | 4.5 |
| Workspace 2 · olive: Dot on surface (switcher, My week legend) | `#82743f` on `#fffdfb` | 4.58 | 3 |
| Workspace 2 · olive: Clash outline (danger) on tint | `#b5302c` on `#f2eedd` | 5.27 | 3 |
| Workspace 3 · plum: Text on tint (lesson block) | `#61405d` on `#f7e9f5` | 7.47 | 4.5 |
| Workspace 3 · plum: Dot on surface (switcher, My week legend) | `#8e6489` on `#fffdfb` | 4.77 | 3 |
| Workspace 3 · plum: Clash outline (danger) on tint | `#b5302c` on `#f7e9f5` | 5.24 | 3 |
| Workspace 4 · ochre-brown: Text on tint (lesson block) | `#60482b` on `#f7ece0` | 7.33 | 4.5 |
| Workspace 4 · ochre-brown: Dot on surface (switcher, My week legend) | `#846542` on `#fffdfb` | 5.28 | 3 |
| Workspace 4 · ochre-brown: Clash outline (danger) on tint | `#b5302c` on `#f7ece0` | 5.27 | 3 |
| Workspace 5 · rose: Text on tint (lesson block) | `#6a3e4a` on `#fce8ec` | 7.45 | 4.5 |
| Workspace 5 · rose: Dot on surface (switcher, My week legend) | `#996271` on `#fffdfb` | 4.77 | 3 |
| Workspace 5 · rose: Clash outline (danger) on tint | `#b5302c` on `#fce8ec` | 5.23 | 3 |
| Workspace 6 · sky: Text on tint (lesson block) | `#185661` on `#def2f7` | 7.14 | 4.5 |
| Workspace 6 · sky: Dot on surface (switcher, My week legend) | `#37808e` on `#fffdfb` | 4.46 | 3 |
| Workspace 6 · sky: Clash outline (danger) on tint | `#b5302c` on `#def2f7` | 5.30 | 3 |
| Workspace 7 · violet: Text on tint (lesson block) | `#52456b` on `#f0ebfb` | 7.42 | 4.5 |
| Workspace 7 · violet: Dot on surface (switcher, My week legend) | `#7b6a9a` on `#fffdfb` | 4.74 | 3 |
| Workspace 7 · violet: Clash outline (danger) on tint | `#b5302c` on `#f0ebfb` | 5.25 | 3 |
| Workspace 8 · moss: Text on tint (lesson block) | `#3f5530` on `#e8f1e2` | 7.09 | 4.5 |
| Workspace 8 · moss: Dot on surface (switcher, My week legend) | `#637e50` on `#fffdfb` | 4.47 | 3 |
| Workspace 8 · moss: Clash outline (danger) on tint | `#b5302c` on `#e8f1e2` | 5.29 | 3 |

#### Notebook · dark

| Pair | Colours | Ratio | Min |
|---|---|---|---|
| Text: Ink on surface | `#ece7e1` on `#1d1913` | 14.23 | 4.5 |
| Text: Ink on page | `#ece7e1` on `#13100b` | 15.44 | 4.5 |
| Muted text: Muted on surface | `#a9a49c` on `#1d1913` | 7.06 | 4.5 |
| Muted text: Muted on page | `#a9a49c` on `#13100b` | 7.66 | 4.5 |
| Muted text: Muted on sunken (hover, segmented) | `#a9a49c` on `#25211b` | 6.46 | 4.5 |
| Inputs: Input border on surface | `#6d6861` on `#1d1913` | 3.17 | 3 |
| Inputs: Input border on page | `#6d6861` on `#13100b` | 3.44 | 3 |
| Accent: Link text on surface | `#6abbb8` on `#1d1913` | 7.84 | 4.5 |
| Accent: Link text on page | `#6abbb8` on `#13100b` | 8.51 | 4.5 |
| Accent: Button label on accent fill | `#031a19` on `#6abbb8` | 8.08 | 4.5 |
| Accent: Button label on accent hover | `#031a19` on `#87cdc9` | 9.96 | 4.5 |
| Accent: Accent fill against surface | `#6abbb8` on `#1d1913` | 7.84 | 3 |
| Accent: Accent fill against page | `#6abbb8` on `#13100b` | 8.51 | 3 |
| Accent: Active nav text on accent-soft | `#6abbb8` on `#113433` | 6.02 | 4.5 |
| Focus: Focus ring on surface | `#6abbb8` on `#1d1913` | 7.84 | 3 |
| Focus: Focus ring on page | `#6abbb8` on `#13100b` | 8.51 | 3 |
| Semantic: Danger text on surface | `#f07f77` on `#1d1913` | 6.67 | 4.5 |
| Semantic: Danger text on danger tint | `#f07f77` on `#421c18` | 5.68 | 4.5 |
| Semantic: Text on solid substitute strip | `#ffffff` on `#bd423a` | 5.24 | 4.5 |
| Semantic: Warning text on surface | `#e7b369` on `#1d1913` | 9.20 | 4.5 |
| Semantic: Warning text on warning tint | `#e7b369` on `#372508` | 7.72 | 4.5 |
| Semantic: Success text on surface | `#7cc08f` on `#1d1913` | 8.16 | 4.5 |
| Semantic: Success text on success tint | `#7cc08f` on `#172c1d` | 6.92 | 4.5 |
| Workspace 1 · slate-blue: Text on tint (lesson block) | `#d2e0ef` on `#222f3d` | 10.15 | 4.5 |
| Workspace 1 · slate-blue: Dot on surface (switcher, My week legend) | `#7da2ca` on `#1d1913` | 6.57 | 3 |
| Workspace 1 · slate-blue: Clash outline (danger) on tint | `#f07f77` on `#222f3d` | 5.19 | 3 |
| Workspace 2 · olive: Text on tint (lesson block) | `#e3decb` on `#332e1b` | 10.07 | 4.5 |
| Workspace 2 · olive: Dot on surface (switcher, My week legend) | `#ac9e6b` on `#1d1913` | 6.54 | 3 |
| Workspace 2 · olive: Clash outline (danger) on tint | `#f07f77` on `#332e1b` | 5.17 | 3 |
| Workspace 3 · plum: Text on tint (lesson block) | `#e9d8e6` on `#372835` | 10.17 | 4.5 |
| Workspace 3 · plum: Dot on surface (switcher, My week legend) | `#b98fb3` on `#1d1913` | 6.37 | 3 |
| Workspace 3 · plum: Clash outline (danger) on tint | `#f07f77` on `#372835` | 5.28 | 3 |
| Workspace 4 · ochre-brown: Text on tint (lesson block) | `#e8dccf` on `#372b1f` | 10.19 | 4.5 |
| Workspace 4 · ochre-brown: Dot on surface (switcher, My week legend) | `#ab8c6a` on `#1d1913` | 5.57 | 3 |
| Workspace 4 · ochre-brown: Clash outline (danger) on tint | `#f07f77` on `#372b1f` | 5.24 | 3 |
| Workspace 5 · rose: Text on tint (lesson block) | `#eed7dc` on `#3b272c` | 10.17 | 4.5 |
| Workspace 5 · rose: Dot on surface (switcher, My week legend) | `#c58c9b` on `#1d1913` | 6.33 | 3 |
| Workspace 5 · rose: Clash outline (danger) on tint | `#f07f77` on `#3b272c` | 5.29 | 3 |
| Workspace 6 · sky: Text on tint (lesson block) | `#cbe3e8` on `#1a3237` | 10.09 | 4.5 |
| Workspace 6 · sky: Dot on surface (switcher, My week legend) | `#67abb8` on `#1d1913` | 6.74 | 3 |
| Workspace 6 · sky: Clash outline (danger) on tint | `#f07f77` on `#1a3237` | 5.15 | 3 |
| Workspace 7 · violet: Text on tint (lesson block) | `#e0daed` on `#302a3b` | 10.15 | 4.5 |
| Workspace 7 · violet: Dot on surface (switcher, My week legend) | `#a595c5` on `#1d1913` | 6.42 | 3 |
| Workspace 7 · violet: Clash outline (danger) on tint | `#f07f77` on `#302a3b` | 5.27 | 3 |
| Workspace 8 · moss: Text on tint (lesson block) | `#d7e2d0` on `#283121` | 10.11 | 4.5 |
| Workspace 8 · moss: Dot on surface (switcher, My week legend) | `#8da87b` on `#1d1913` | 6.68 | 3 |
| Workspace 8 · moss: Clash outline (danger) on tint | `#f07f77` on `#283121` | 5.16 | 3 |

#### Studio · light

| Pair | Colours | Ratio | Min |
|---|---|---|---|
| Text: Ink on surface | `#252220` on `#ffffff` | 15.81 | 4.5 |
| Text: Ink on page | `#252220` on `#faf6f1` | 14.69 | 4.5 |
| Muted text: Muted on surface | `#66635f` on `#ffffff` | 5.97 | 4.5 |
| Muted text: Muted on page | `#66635f` on `#faf6f1` | 5.55 | 4.5 |
| Muted text: Muted on sunken (hover, segmented) | `#66635f` on `#f1ece7` | 5.09 | 4.5 |
| Inputs: Input border on surface | `#837f7c` on `#ffffff` | 3.97 | 3 |
| Inputs: Input border on page | `#837f7c` on `#faf6f1` | 3.69 | 3 |
| Accent: Link text on surface | `#5155c4` on `#ffffff` | 6.09 | 4.5 |
| Accent: Link text on page | `#5155c4` on `#faf6f1` | 5.66 | 4.5 |
| Accent: Button label on accent fill | `#ffffff` on `#5155c4` | 6.09 | 4.5 |
| Accent: Button label on accent hover | `#ffffff` on `#4243b0` | 7.89 | 4.5 |
| Accent: Accent fill against surface | `#5155c4` on `#ffffff` | 6.09 | 3 |
| Accent: Accent fill against page | `#5155c4` on `#faf6f1` | 5.66 | 3 |
| Accent: Active nav text on accent-soft | `#5155c4` on `#e8ecff` | 5.19 | 4.5 |
| Focus: Focus ring on surface | `#5155c4` on `#ffffff` | 6.09 | 3 |
| Focus: Focus ring on page | `#5155c4` on `#faf6f1` | 5.66 | 3 |
| Semantic: Danger text on surface | `#b5302c` on `#ffffff` | 6.13 | 4.5 |
| Semantic: Danger text on danger tint | `#b5302c` on `#fef0ee` | 5.52 | 4.5 |
| Semantic: Text on solid substitute strip | `#ffffff` on `#b12725` | 6.59 | 4.5 |
| Semantic: Warning text on surface | `#955816` on `#ffffff` | 5.70 | 4.5 |
| Semantic: Warning text on warning tint | `#955816` on `#fef2d9` | 5.13 | 4.5 |
| Semantic: Success text on surface | `#2f7346` on `#ffffff` | 5.74 | 4.5 |
| Semantic: Success text on success tint | `#2f7346` on `#e8f9eb` | 5.24 | 4.5 |
| Workspace 1 · slate-blue: Text on tint (lesson block) | `#234f7c` on `#e2f0ff` | 7.31 | 4.5 |
| Workspace 1 · slate-blue: Dot on surface (switcher, My week legend) | `#487eb6` on `#ffffff` | 4.26 | 3 |
| Workspace 1 · slate-blue: Clash outline (danger) on tint | `#b5302c` on `#e2f0ff` | 5.30 | 3 |
| Workspace 2 · olive: Text on tint (lesson block) | `#5c4c02` on `#f4eed7` | 7.25 | 4.5 |
| Workspace 2 · olive: Dot on surface (switcher, My week legend) | `#8e7923` on `#ffffff` | 4.28 | 3 |
| Workspace 2 · olive: Clash outline (danger) on tint | `#b5302c` on `#f4eed7` | 5.27 | 3 |
| Workspace 3 · plum: Text on tint (lesson block) | `#683963` on `#fbe7f8` | 7.60 | 4.5 |
| Workspace 3 · plum: Dot on surface (switcher, My week legend) | `#9e6297` on `#ffffff` | 4.52 | 3 |
| Workspace 3 · plum: Clash outline (danger) on tint | `#b5302c` on `#fbe7f8` | 5.22 | 3 |
| Workspace 4 · ochre-brown: Text on tint (lesson block) | `#684519` on `#faebdb` | 7.32 | 4.5 |
| Workspace 4 · ochre-brown: Dot on surface (switcher, My week legend) | `#936733` on `#ffffff` | 4.97 | 3 |
| Workspace 4 · ochre-brown: Clash outline (danger) on tint | `#b5302c` on `#faebdb` | 5.25 | 3 |
| Workspace 5 · rose: Text on tint (lesson block) | `#743649` on `#ffe7ec` | 7.56 | 4.5 |
| Workspace 5 · rose: Dot on surface (switcher, My week legend) | `#ad5e75` on `#ffffff` | 4.53 | 3 |
| Workspace 5 · rose: Clash outline (danger) on tint | `#b5302c` on `#ffe7ec` | 5.23 | 3 |
| Workspace 6 · sky: Text on tint (lesson block) | `#005764` on `#d7f4fa` | 7.15 | 4.5 |
| Workspace 6 · sky: Dot on surface (switcher, My week legend) | `#008a9d` on `#ffffff` | 4.10 | 3 |
| Workspace 6 · sky: Clash outline (danger) on tint | `#b5302c` on `#d7f4fa` | 5.32 | 3 |
| Workspace 7 · violet: Text on tint (lesson block) | `#554176` on `#f0eafe` | 7.45 | 4.5 |
| Workspace 7 · violet: Dot on surface (switcher, My week legend) | `#846baf` on `#ffffff` | 4.47 | 3 |
| Workspace 7 · violet: Clash outline (danger) on tint | `#b5302c` on `#f0eafe` | 5.23 | 3 |
| Workspace 8 · moss: Text on tint (lesson block) | `#395720` on `#e6f3dd` | 7.13 | 4.5 |
| Workspace 8 · moss: Dot on surface (switcher, My week legend) | `#618744` on `#ffffff` | 4.15 | 3 |
| Workspace 8 · moss: Clash outline (danger) on tint | `#b5302c` on `#e6f3dd` | 5.32 | 3 |

#### Studio · dark

| Pair | Colours | Ratio | Min |
|---|---|---|---|
| Text: Ink on surface | `#eae7e5` on `#1b1917` | 14.24 | 4.5 |
| Text: Ink on page | `#eae7e5` on `#12100e` | 15.42 | 4.5 |
| Muted text: Muted on surface | `#a6a4a1` on `#1b1917` | 7.05 | 4.5 |
| Muted text: Muted on page | `#a6a4a1` on `#12100e` | 7.64 | 4.5 |
| Muted text: Muted on sunken (hover, segmented) | `#a6a4a1` on `#23211f` | 6.45 | 4.5 |
| Inputs: Input border on surface | `#6b6866` on `#1b1917` | 3.17 | 3 |
| Inputs: Input border on page | `#6b6866` on `#12100e` | 3.43 | 3 |
| Accent: Link text on surface | `#98a3f6` on `#1b1917` | 7.43 | 4.5 |
| Accent: Link text on page | `#98a3f6` on `#12100e` | 8.05 | 4.5 |
| Accent: Button label on accent fill | `#11132c` on `#98a3f6` | 7.72 | 4.5 |
| Accent: Button label on accent hover | `#11132c` on `#adb8fe` | 9.59 | 4.5 |
| Accent: Accent fill against surface | `#98a3f6` on `#1b1917` | 7.43 | 3 |
| Accent: Accent fill against page | `#98a3f6` on `#12100e` | 8.05 | 3 |
| Accent: Active nav text on accent-soft | `#98a3f6` on `#262a4b` | 5.88 | 4.5 |
| Focus: Focus ring on surface | `#98a3f6` on `#1b1917` | 7.43 | 3 |
| Focus: Focus ring on page | `#98a3f6` on `#12100e` | 8.05 | 3 |
| Semantic: Danger text on surface | `#f07f77` on `#1b1917` | 6.68 | 4.5 |
| Semantic: Danger text on danger tint | `#f07f77` on `#421c18` | 5.68 | 4.5 |
| Semantic: Text on solid substitute strip | `#ffffff` on `#bd423a` | 5.24 | 4.5 |
| Semantic: Warning text on surface | `#e7b369` on `#1b1917` | 9.22 | 4.5 |
| Semantic: Warning text on warning tint | `#e7b369` on `#372508` | 7.72 | 4.5 |
| Semantic: Success text on surface | `#7cc08f` on `#1b1917` | 8.17 | 4.5 |
| Semantic: Success text on success tint | `#7cc08f` on `#172c1d` | 6.92 | 4.5 |
| Workspace 1 · slate-blue: Text on tint (lesson block) | `#cde0f6` on `#1c2f43` | 10.14 | 4.5 |
| Workspace 1 · slate-blue: Dot on surface (switcher, My week legend) | `#6ea3db` on `#1b1917` | 6.61 | 3 |
| Workspace 1 · slate-blue: Clash outline (danger) on tint | `#f07f77` on `#1c2f43` | 5.21 | 3 |
| Workspace 2 · olive: Text on tint (lesson block) | `#e5dec3` on `#352e12` | 10.04 | 4.5 |
| Workspace 2 · olive: Dot on surface (switcher, My week legend) | `#b29e51` on `#1b1917` | 6.60 | 3 |
| Workspace 2 · olive: Clash outline (danger) on tint | `#f07f77` on `#352e12` | 5.16 | 3 |
| Workspace 3 · plum: Text on tint (lesson block) | `#edd6e9` on `#3b2538` | 10.21 | 4.5 |
| Workspace 3 · plum: Dot on surface (switcher, My week legend) | `#c287bb` on `#1b1917` | 6.24 | 3 |
| Workspace 3 · plum: Clash outline (danger) on tint | `#f07f77` on `#3b2538` | 5.31 | 3 |
| Workspace 4 · ochre-brown: Text on tint (lesson block) | `#ecdbc8` on `#3a2a18` | 10.19 | 4.5 |
| Workspace 4 · ochre-brown: Dot on surface (switcher, My week legend) | `#b48957` on `#1b1917` | 5.56 | 3 |
| Workspace 4 · ochre-brown: Clash outline (danger) on tint | `#f07f77` on `#3a2a18` | 5.25 | 3 |
| Workspace 5 · rose: Text on tint (lesson block) | `#f4d4dc` on `#40242c` | 10.15 | 4.5 |
| Workspace 5 · rose: Dot on surface (switcher, My week legend) | `#d28499` on `#1b1917` | 6.26 | 3 |
| Workspace 5 · rose: Clash outline (danger) on tint | `#f07f77` on `#40242c` | 5.31 | 3 |
| Workspace 6 · sky: Text on tint (lesson block) | `#c3e5ec` on `#0d343b` | 10.02 | 4.5 |
| Workspace 6 · sky: Dot on surface (switcher, My week legend) | `#44afc2` on `#1b1917` | 6.81 | 3 |
| Workspace 6 · sky: Clash outline (danger) on tint | `#f07f77` on `#0d343b` | 5.10 | 3 |
| Workspace 7 · violet: Text on tint (lesson block) | `#e1d9f3` on `#312941` | 10.12 | 4.5 |
| Workspace 7 · violet: Dot on surface (switcher, My week legend) | `#a890d3` on `#1b1917` | 6.34 | 3 |
| Workspace 7 · violet: Clash outline (danger) on tint | `#f07f77` on `#312941` | 5.25 | 3 |
| Workspace 8 · moss: Text on tint (lesson block) | `#d5e4cb` on `#25331b` | 10.07 | 4.5 |
| Workspace 8 · moss: Dot on surface (switcher, My week legend) | `#86ac6b` on `#1b1917` | 6.78 | 3 |
| Workspace 8 · moss: Clash outline (danger) on tint | `#f07f77` on `#25331b` | 5.11 | 3 |

#### Ledger · light

| Pair | Colours | Ratio | Min |
|---|---|---|---|
| Text: Ink on surface | `#242321` on `#ffffff` | 15.70 | 4.5 |
| Text: Ink on page | `#242321` on `#faf8f6` | 14.82 | 4.5 |
| Muted text: Muted on surface | `#656361` on `#ffffff` | 5.98 | 4.5 |
| Muted text: Muted on page | `#656361` on `#faf8f6` | 5.65 | 4.5 |
| Muted text: Muted on sunken (hover, segmented) | `#656361` on `#f0eeeb` | 5.17 | 4.5 |
| Inputs: Input border on surface | `#82807e` on `#ffffff` | 3.93 | 3 |
| Inputs: Input border on page | `#82807e` on `#faf8f6` | 3.71 | 3 |
| Accent: Link text on surface | `#272320` on `#ffffff` | 15.58 | 4.5 |
| Accent: Link text on page | `#272320` on `#faf8f6` | 14.71 | 4.5 |
| Accent: Button label on accent fill | `#ffffff` on `#272320` | 15.58 | 4.5 |
| Accent: Button label on accent hover | `#ffffff` on `#403c39` | 10.92 | 4.5 |
| Accent: Accent fill against surface | `#272320` on `#ffffff` | 15.58 | 3 |
| Accent: Accent fill against page | `#272320` on `#faf8f6` | 14.71 | 3 |
| Accent: Active nav text on accent-soft | `#272320` on `#ece9e6` | 12.89 | 4.5 |
| Focus: Focus ring on surface | `#272320` on `#ffffff` | 15.58 | 3 |
| Focus: Focus ring on page | `#272320` on `#faf8f6` | 14.71 | 3 |
| Semantic: Danger text on surface | `#b5302c` on `#ffffff` | 6.13 | 4.5 |
| Semantic: Danger text on danger tint | `#b5302c` on `#fef0ee` | 5.52 | 4.5 |
| Semantic: Text on solid substitute strip | `#ffffff` on `#b12725` | 6.59 | 4.5 |
| Semantic: Warning text on surface | `#955816` on `#ffffff` | 5.70 | 4.5 |
| Semantic: Warning text on warning tint | `#955816` on `#fef2d9` | 5.13 | 4.5 |
| Semantic: Success text on surface | `#2f7346` on `#ffffff` | 5.74 | 4.5 |
| Semantic: Success text on success tint | `#2f7346` on `#e8f9eb` | 5.24 | 4.5 |
| Workspace 1 · slate-blue: Text on tint (lesson block) | `#344f6d` on `#e4effc` | 7.26 | 4.5 |
| Workspace 1 · slate-blue: Dot on surface (switcher, My week legend) | `#55779d` on `#ffffff` | 4.65 | 3 |
| Workspace 1 · slate-blue: Clash outline (danger) on tint | `#b5302c` on `#e4effc` | 5.27 | 3 |
| Workspace 2 · olive: Text on tint (lesson block) | `#574d25` on `#f2eede` | 7.24 | 4.5 |
| Workspace 2 · olive: Dot on surface (switcher, My week legend) | `#817443` on `#ffffff` | 4.65 | 3 |
| Workspace 2 · olive: Clash outline (danger) on tint | `#b5302c` on `#f2eede` | 5.27 | 3 |
| Workspace 3 · plum: Text on tint (lesson block) | `#60415c` on `#f7e9f4` | 7.44 | 4.5 |
| Workspace 3 · plum: Dot on surface (switcher, My week legend) | `#8d6588` on `#ffffff` | 4.83 | 3 |
| Workspace 3 · plum: Clash outline (danger) on tint | `#b5302c` on `#f7e9f4` | 5.23 | 3 |
| Workspace 4 · ochre-brown: Text on tint (lesson block) | `#5f482e` on `#f6ece1` | 7.34 | 4.5 |
| Workspace 4 · ochre-brown: Dot on surface (switcher, My week legend) | `#836645` on `#ffffff` | 5.31 | 3 |
| Workspace 4 · ochre-brown: Clash outline (danger) on tint | `#b5302c` on `#f6ece1` | 5.26 | 3 |
| Workspace 5 · rose: Text on tint (lesson block) | `#683f4a` on `#fbe8ed` | 7.45 | 4.5 |
| Workspace 5 · rose: Dot on surface (switcher, My week legend) | `#976371` on `#ffffff` | 4.84 | 3 |
| Workspace 5 · rose: Clash outline (danger) on tint | `#b5302c` on `#fbe8ed` | 5.22 | 3 |
| Workspace 6 · sky: Text on tint (lesson block) | `#1e5660` on `#dff2f6` | 7.11 | 4.5 |
| Workspace 6 · sky: Dot on surface (switcher, My week legend) | `#3d7f8c` on `#ffffff` | 4.55 | 3 |
| Workspace 6 · sky: Clash outline (danger) on tint | `#b5302c` on `#dff2f6` | 5.31 | 3 |
| Workspace 7 · violet: Text on tint (lesson block) | `#524669` on `#f0ebfa` | 7.37 | 4.5 |
| Workspace 7 · violet: Dot on surface (switcher, My week legend) | `#7b6b98` on `#ffffff` | 4.77 | 3 |
| Workspace 7 · violet: Clash outline (danger) on tint | `#b5302c` on `#f0ebfa` | 5.25 | 3 |
| Workspace 8 · moss: Text on tint (lesson block) | `#405432` on `#e8f1e3` | 7.16 | 4.5 |
| Workspace 8 · moss: Dot on surface (switcher, My week legend) | `#647e53` on `#ffffff` | 4.52 | 3 |
| Workspace 8 · moss: Clash outline (danger) on tint | `#b5302c` on `#e8f1e3` | 5.29 | 3 |

#### Ledger · dark

| Pair | Colours | Ratio | Min |
|---|---|---|---|
| Text: Ink on surface | `#e9e8e6` on `#1a1918` | 14.34 | 4.5 |
| Text: Ink on page | `#e9e8e6` on `#11100f` | 15.52 | 4.5 |
| Muted text: Muted on surface | `#a5a4a3` on `#1a1918` | 7.05 | 4.5 |
| Muted text: Muted on page | `#a5a4a3` on `#11100f` | 7.64 | 4.5 |
| Muted text: Muted on sunken (hover, segmented) | `#a5a4a3` on `#222120` | 6.46 | 4.5 |
| Inputs: Input border on surface | `#6a6967` on `#1a1918` | 3.20 | 3 |
| Inputs: Input border on page | `#6a6967` on `#11100f` | 3.47 | 3 |
| Accent: Link text on surface | `#eae7e5` on `#1a1918` | 14.26 | 4.5 |
| Accent: Link text on page | `#eae7e5` on `#11100f` | 15.44 | 4.5 |
| Accent: Button label on accent fill | `#171614` on `#eae7e5` | 14.69 | 4.5 |
| Accent: Button label on accent hover | `#171614` on `#cfcdcb` | 11.41 | 4.5 |
| Accent: Accent fill against surface | `#eae7e5` on `#1a1918` | 14.26 | 3 |
| Accent: Accent fill against page | `#eae7e5` on `#11100f` | 15.44 | 3 |
| Accent: Active nav text on accent-soft | `#eae7e5` on `#2f2d2c` | 11.13 | 4.5 |
| Focus: Focus ring on surface | `#eae7e5` on `#1a1918` | 14.26 | 3 |
| Focus: Focus ring on page | `#eae7e5` on `#11100f` | 15.44 | 3 |
| Semantic: Danger text on surface | `#f07f77` on `#1a1918` | 6.69 | 4.5 |
| Semantic: Danger text on danger tint | `#f07f77` on `#421c18` | 5.68 | 4.5 |
| Semantic: Text on solid substitute strip | `#ffffff` on `#bd423a` | 5.24 | 4.5 |
| Semantic: Warning text on surface | `#e7b369` on `#1a1918` | 9.24 | 4.5 |
| Semantic: Warning text on warning tint | `#e7b369` on `#372508` | 7.72 | 4.5 |
| Semantic: Success text on surface | `#7cc08f` on `#1a1918` | 8.19 | 4.5 |
| Semantic: Success text on success tint | `#7cc08f` on `#172c1d` | 6.92 | 4.5 |
| Workspace 1 · slate-blue: Text on tint (lesson block) | `#d3e0ee` on `#232f3c` | 10.15 | 4.5 |
| Workspace 1 · slate-blue: Dot on surface (switcher, My week legend) | `#80a2c7` on `#1a1918` | 6.61 | 3 |
| Workspace 1 · slate-blue: Clash outline (danger) on tint | `#f07f77` on `#232f3c` | 5.19 | 3 |
| Workspace 2 · olive: Text on tint (lesson block) | `#e3decc` on `#322e1d` | 10.09 | 4.5 |
| Workspace 2 · olive: Dot on surface (switcher, My week legend) | `#ab9e6f` on `#1a1918` | 6.56 | 3 |
| Workspace 2 · olive: Clash outline (danger) on tint | `#f07f77` on `#322e1d` | 5.19 | 3 |
| Workspace 3 · plum: Text on tint (lesson block) | `#e8d8e6` on `#372835` | 10.15 | 4.5 |
| Workspace 3 · plum: Dot on surface (switcher, My week legend) | `#b790b2` on `#1a1918` | 6.39 | 3 |
| Workspace 3 · plum: Clash outline (danger) on tint | `#f07f77` on `#372835` | 5.28 | 3 |
| Workspace 4 · ochre-brown: Text on tint (lesson block) | `#e7dcd0` on `#362c20` | 10.11 | 4.5 |
| Workspace 4 · ochre-brown: Dot on surface (switcher, My week legend) | `#a98c6d` on `#1a1918` | 5.57 | 3 |
| Workspace 4 · ochre-brown: Clash outline (danger) on tint | `#f07f77` on `#362c20` | 5.21 | 3 |
| Workspace 5 · rose: Text on tint (lesson block) | `#edd8dd` on `#3b282d` | 10.13 | 4.5 |
| Workspace 5 · rose: Dot on surface (switcher, My week legend) | `#c28d9b` on `#1a1918` | 6.33 | 3 |
| Workspace 5 · rose: Clash outline (danger) on tint | `#f07f77` on `#3b282d` | 5.24 | 3 |
| Workspace 6 · sky: Text on tint (lesson block) | `#cde3e7` on `#1b3236` | 10.11 | 4.5 |
| Workspace 6 · sky: Dot on surface (switcher, My week legend) | `#6caab7` on `#1a1918` | 6.75 | 3 |
| Workspace 6 · sky: Clash outline (danger) on tint | `#f07f77` on `#1b3236` | 5.15 | 3 |
| Workspace 7 · violet: Text on tint (lesson block) | `#e0dbec` on `#302b3b` | 10.11 | 4.5 |
| Workspace 7 · violet: Dot on surface (switcher, My week legend) | `#a495c2` on `#1a1918` | 6.40 | 3 |
| Workspace 7 · violet: Clash outline (danger) on tint | `#f07f77` on `#302b3b` | 5.22 | 3 |
| Workspace 8 · moss: Text on tint (lesson block) | `#d8e2d1` on `#283122` | 10.12 | 4.5 |
| Workspace 8 · moss: Dot on surface (switcher, My week legend) | `#8ea87d` on `#1a1918` | 6.73 | 3 |
| Workspace 8 · moss: Clash outline (danger) on tint | `#f07f77` on `#283122` | 5.16 | 3 |
</details>

## Open questions from `visual-direction.md`, answered

| Question | Answer | Why |
|---|---|---|
| Which direction, or which mix of their dials | **All three ship**, chosen per user in Appearance; **Notebook** by default. No mix. | Each direction changes the whole personality (type, density, radius), so it's personal taste; Notebook was the product owner's repeated pick and is furthest from default shadcn. |
| The accent hue | **Per direction**: deep teal (Notebook), indigo (Studio), near-black ink (Ledger). | Each accent belongs to its direction's personality; all pass AA as text, fill and focus ring. |
| How warm the neutrals are | **Per direction**: clearly beige paper (Notebook), lightly warm stone (Studio), barely warm (Ledger). | Same reason: warmth is one of the dials that makes each direction distinct. |
| The typeface, and whether a serif for page titles earns its place | **Per direction**: Source Sans 3, Figtree, Inter. **Newsreader stays for Notebook page titles only.** | The serif is Notebook's strongest editorial cue; limited to one heading per page and loaded only for Notebook users, it costs little. |
| The exact 8 workspace hues and their shades | **One shared set of 8 families** in a fixed slot order (table above); directions change only strength. | A teacher recognises a workspace by its colour, so changing Appearance must not change it. Hues chosen to maximise the smallest dot-to-dot difference. |
| Card radius | **Per direction**: 12 / 8 / 6 px cards, 8 / 6 / 4 px controls. | Radius is part of each direction's personality. |
| Whether Mark done gets a quiet touch | **Yes**: a 200 ms drawn check, only when marking a report done; it just appears under reduce motion. | Marking a report done is the end of a lesson's work; one small confirmation there is enough, and nowhere else. |
| Exact type steps and line heights | **Shared scale** 12 / 14 / 16 / 18 / 24 / 30 px (lines 16 / 20 / 26 / 26 / 32 / 38); **Notebook's small steps are 13 / 15 px**. | Source Sans 3 reads small at 14 px; the other faces are fine at the shared scale. |
| Whether the workspace colours survive the rough dark My week | **Yes**: all 8 pass AA in dark mode in every direction. Dark mode stays the first follow-up after launch. | Dark tokens prove the hues can darken; the screens themselves still need a proper review before shipping dark mode. |
| Every token pair passing AA | **Yes**: 282 pairs, 0 failures (above). | Checked by script on every token pair, so later tuning can be re-checked the same way. |
