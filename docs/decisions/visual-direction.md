# Visual direction: decisions

Outcome of the visual-design grilling session (21–22 Oct 2026). Covers look and feel only. Layouts are settled in `phase-1-screen-designs.md` and are not reopened here; the stack (shadcn-vue + Tailwind v4, Lucide) is settled in `tech-stack.md`. Terms follow `GLOSSARY.md`.

Items marked **(prototype)** were open on purpose: they could only be settled by seeing them. **All of them are now settled in `visual-design.md`** (24 Oct 2026), which also holds the final token values and contrast results. The rules below still apply except where noted.

New glossary term from this session: **Workspace colour**.

## Personality and tone

- **Design for the "between lessons, in a hurry" moment first**: a teacher with 5–10 minutes before the next class, on a phone or laptop, joining a meeting, attaching a plan, taking attendance. Desk planning (Library, plan copies, reports) and school triage (admin and senior-teacher blocks) must still work, but they don't set the tone.
- **Feel**: calm, medium density, warm but professional, serious with a little friendliness.
  - *Calm*, because users are already stretched; the app should lower stress, not add energy.
  - *Warm*, because the work is about people (students, notes, levels); a cold enterprise look feels wrong.
  - *Serious*, because it holds levels, assessments and GDPR-sensitive notes; cartoonish EdTech feels wrong.
  - *Medium density*: scanning pages (Home, My week) show a lot at a glance; reading and writing pages (Lesson page, portfolio) get room.

## References

- **Like**: Things 3 (calm, one confident accent, great on phones), Notion (quiet, comfortable for long text), Cron / Notion Calendar (clean time grid, restrained colour dots).
- **Borrow from Linear**: density and precision. Not its coldness or dark-first look.
- **Avoid**: Google Classroom and ClassDojo (bright, many colours, childish), plain default shadcn (zinc and black, looks like every SaaS app).

## Colour

### Neutrals

- **Warm grey (Tailwind `stone`-like)**. The page is a slightly warm off-white; cards and surfaces are white on top of it.
- Why: warm-but-professional, easy on the eyes during long writing, clearly different from default shadcn zinc, and calm next to all 8 workspace colours (a hue-tinted neutral would fight some of them).
- How warm (subtle vs clearly beige): **(prototype)**. Settled: per Appearance (`visual-design.md`).

### Accent

- **One brand hue, used only for interactive things**: primary buttons, links, focus ring, active nav item. Everything else is neutral.
- The accent hue and its neighbours are **kept out of the 8 workspace colours**, so "this is a button" never looks like "this is a Bright School thing".
- Why: gives Teach Flow an identity beyond default shadcn, and "only interactive things are this colour" is easy for a teacher in a hurry to learn.
- Not the workspace colour as accent (the page would change colour per workspace, and workspace colours belong to the teacher, not the brand).
- Not terracotta or other red-orange hues: too close to danger red and warning amber.
- Which hue: **(prototype)**; it is one of the main differences between the three directions. A no-hue near-black accent is tested as direction C. Settled: per Appearance, deep teal / indigo / ink (`visual-design.md`).

### Semantic colours

| Colour | Meaning | Examples |
|---|---|---|
| **Red** (danger) | Needs action now, or destructive | Needs a substitute item, overdue report, clash outline, Cancel lesson, Remove member |
| **Amber** (warning) | Will need action soon | No plan within 48 h, class ending soon, report draft, invite about to expire |
| **Green** (success) | Done / fine, used rarely | Report done, homework done, present |
| **Neutral grey** | Inactive or past | Cancelled lessons, archived items, former members |

- **No blue "info" colour**: blue is too close to the accent and the workspace colours. Info stays neutral.
- **Quiet by default**: coloured icon and text on a neutral surface, or a very light tint. ~~The Needs a substitute strip is the only solid-colour fill in the app.~~ Changed 24 Oct 2026: the strip is gone, so **no alert uses a solid-colour fill**. In To do, red appears only on the icon and type label. The only filled "do this next" button is the main button on Today cards (`visual-design.md`).
- **Green is rare**: "done" mostly means the item disappears (as To do already works), not that it turns green.
- **Clash is red**, not amber.
- Attendance and homework states in report rows are form controls: coloured only when selected, always with a label or icon.
- **Colour is never the only signal** anywhere (accessibility and colour blindness).

### Workspace colours

- **8 muted, mid-saturation hues** spread around the wheel, skipping the accent's neighbourhood and pure red and amber, with green kept far enough from "success" not to read as it. ~~Illustrative set: slate-blue, teal, olive-green, plum, rose, ochre-brown, sky, violet (each direction swaps out whichever is near its accent).~~ Settled: **one shared set for every direction**, in slot order slate-blue, olive, plum, ochre-brown, rose, sky, violet, moss; directions change only their strength (`visual-design.md`).
- Each colour has three tokens: a **dot / edge** shade, a **pale tint**, and a **dark text** shade that passes AA on the tint.
- **Where they appear**:
  - **My week**: lesson blocks get a light tint fill of the workspace colour, a stronger 3–4 px left edge in the same hue, and text in the dark shade. The red clash outline sits on top and stays readable.
  - **Switcher, My week legend, and anywhere else a workspace is named**: a dot only.
  - **Never** on page backgrounds, buttons, the sidebar or the accent's jobs.
- The **workspace name is always in the text** next to the colour, so colour blindness doesn't hide which school a lesson belongs to.
- **Default assignment in a fixed order**: Personal always gets colour 1, and each new workspace takes the next unused colour. This keeps one teacher's colours predictable. The teacher can still change it from the switcher (as already settled).
- Exact hues: **(prototype)**, after the accent is chosen. Settled in `visual-design.md`.

## Typography

- **One humanist sans for everything**, no second display face by default. Warmth comes from the letterforms. Shortlist: **Figtree** (friendly), **Inter** (neutral), **Source Sans 3** (bookish). Which one: **(prototype)**, varied across directions. Direction A also tests a serif for page titles only. Settled: per Appearance (Source Sans 3 with Newsreader page titles / Figtree / Inter).
- **Tabular figures** for times, dates and hours (18:00, "34 of 60 class hours"), so My week and the class hours bar line up.
- **Two body sizes by role**:
  - **14 px for UI text**: labels, list rows, cards, table cells, buttons.
  - **16 px for prose**: anything a teacher writes or reads at length, such as report fields, plan stages, participant and student notes, background. Line height about 1.6, lines capped at about 70 characters.
  - Inputs on phones are at least 16 px anyway, which stops iOS from zooming in on focus.
- **Small, restrained scale**, roughly 12 / 14 / 16 / 18 / 24 / 30. Page titles are modest (24 px); no hero headings inside the app.
- **Hierarchy comes from weight and colour** (medium vs regular, ink vs muted grey) more than from size jumps.
- Exact steps and line heights: fine-tuned in the prototype. Settled in `visual-design.md`; Notebook's two small steps are 13 / 15 px instead of 12 / 14, because Source Sans 3 reads small.

## Shape and depth

- **Radius**: 8 px on cards, 6 px on buttons and inputs, fully round only for dots and avatars. Softer than Linear, less bubbly than EdTech. No pill buttons. Directions vary this (12 / 8 / 6 px cards). Settled: each Appearance keeps its own radius (`visual-design.md`).
- **Borders for structure, shadows only for things that float**: 1 px warm-grey hairlines separate cards and sections; one soft shadow level is used only for menus, popovers, dialogs and dragged items. A white card with a hairline on the off-white page is enough to read as a card, and keeping shadows for overlays gives them meaning.
- **Input borders are darker than card borders** (they must reach 3:1, see Accessibility).

## Spacing and touch targets

- **4 px grid** with a short list of steps actually used: 4 / 8 / 12 / 16 / 24 / 32 / 48.
- **Two densities by role**, matching the type split, with no user-facing density toggle:
  - **Compact** on scanning pages (Home, My week, Library rows, Members): list rows about 40 px tall, 12 px card padding.
  - **Comfortable** on reading and writing pages (Lesson page, portfolio): 16–24 px padding, more space between report fields.
- **Touch targets at least 44 × 44 px on phones** for anything tappable. Desktop controls can look smaller (32–36 px) but keep a generous hit area.
- The **attendance and homework controls** in the Report tab get the biggest targets (full-width segmented controls on phones rather than small dropdowns), because teachers tap them fast at the start of class.

## Light and dark mode

- **Light only at launch**, for all three appearances. Getting one theme right, with all 8 workspace colours, the semantic colours and the accent passing contrast, matters more than two half-tuned themes. The warm off-white direction is a light-mode idea first.
- **Semantic tokens from day one** (`--surface`, `--ink`, `--muted`, `--accent`, `--danger`, per-workspace-colour tokens, and so on, never raw `stone-100` in components), so dark mode is a token swap, not a rewrite.
- **Dark mode is the first visual follow-up after launch**, not "someday". The product owner wanted both modes at launch and agreed to defer it only on that basis.
- The prototype renders a **rough dark My week** to prove the 8 workspace colours can work in dark mode (deep, muted fills), so we don't pick hues that are impossible to darken later.

## Accessibility

- **WCAG 2.2 AA is a hard requirement**, checked on every token pair in the prototype. No AAA targets: 7:1 body text would push the design toward black-on-white and away from the calm, warm feel.
- What AA means here:
  - Text contrast 4.5:1 (3:1 for large text).
  - 3:1 for UI parts that carry meaning: input borders, focus rings, meaningful icons.
  - A visible focus indicator (accent ring, 2 px offset).
  - Minimum target size 24 px (we use 44 px on phones).
  - Full keyboard use; "reduce motion" respected.
- **Risk points the prototype must check**:
  - **Muted grey text** (timestamps, "used 12×"): where warm-grey designs usually fail. It must be darker than looks natural.
  - **Input borders** at 3:1, darker than the decorative card hairlines (which are exempt).
  - **Workspace tints**: each dark text shade at 4.5:1 on its pale tint.
  - **Accent** on white and on the off-white page, for both text links and button fills.
  - **Colour never alone**: workspace name in text, labels or icons on attendance and homework states, icons alongside semantic colours.

## How far from default shadcn

- **Retheme and tune the core set, and carry the identity in domain components.**
  - **Theme**: colours, radius, font, focus ring via tokens.
  - **Tuned core components** (restyled to the rules above: heights, focus ring, quiet badges, muted text): Button, Input, Textarea, Select, Tabs, Badge, Card, Dialog, Dropdown menu, Tooltip, segmented control.
  - **Rarer components** (Calendar, Command, Sheet, and so on) stay themed defaults unless they look wrong.
  - **Domain components carry the personality**: Today card, workspace dot, My week lesson block, attendance row, class hours bar. These aren't shadcn components anyway, and they are what a teacher sees every day.
- Why not theme only: it would still feel like stock shadcn. Why not fully custom: too much for Phase 1, and shadcn-vue's copy-into-the-repo model already makes tuning normal.

## Icons, motion, empty states

- **Lucide at 1.5 px stroke** (lighter and calmer next to a humanist sans), 16 px in UI text, 20 px in nav. Icons sit beside labels; icon-only buttons get a tooltip and an accessible label.
- **Quick, functional motion**: 150–200 ms fades and slides for menus, dialogs, tab changes and items leaving To do. Nothing bouncy, no celebrations, all off under "reduce motion". One quiet touch: marking a report done draws a check in 200 ms (it simply appears under reduce motion). Motion helps a hurried teacher see what just changed.
- **Text-only empty states**: a muted icon, a short line ("No lessons today") and the next action where there is one. No illustrations or mascots.

## The three directions to prototype

**Outcome (24 Oct 2026): all three ship.** Each user picks one in their **Appearance** setting; **Notebook** is the default. See `visual-design.md`.

Everything above is shared by all three. Each direction turns the remaining dials (how warm, accent hue, typeface, radius, density lean, workspace palette character) toward a different personality.

| | **A. Notebook** | **B. Studio** | **C. Ledger** |
|---|---|---|---|
| Feel | Warm, editorial, a paper planner | Friendly, bright and calm, Things-like | Crisp, precise, a warm Linear |
| Neutrals | Clearly warm, beige-leaning paper | Lightly warm stone | Barely warm, close to neutral |
| Accent | Deep teal | Indigo (blue-violet) | Near-black warm ink, no hue |
| Typeface | Source Sans 3, plus a serif (Newsreader) for page titles only | Figtree | Inter |
| Radius | 12 px cards, 8 px controls | 8 px cards, 6 px controls | 6 px cards, 4 px controls |
| Density lean | Most airy | Middle | Most compact |
| Workspace colours | Earthy and muted | Clear, mid-saturation | Muted, slightly cooler |

- **A. Notebook** tests whether a more editorial, paper-like feel (and a serif title) suits the long-text Lesson page better, and whether it still works on a hurried phone Home. Teal and its neighbours leave its workspace palette.
- **B. Studio** is the expected favourite for "between lessons, in a hurry": the settled defaults with a confident indigo accent. Indigo, blue-violet and violet leave its workspace palette.
- **C. Ledger** tests the no-hue accent. Links and primary buttons are ink, so the 8 workspace colours and the semantic colours become the only colour in the app. It needs a clearer link style (underline) and a strong focus ring to stay usable.

All three use the same 3 workspace colour slots in the same data, so they are compared fairly.

## Screens and states to render

Each direction renders the same fixed set with the same fake data. The set is chosen to include every risk named above.

- **Home**, as a **senior teacher in two workspaces** (Personal plus Bright School):
  - The red **Needs a substitute** strip.
  - **Today** with 3 cards in different states: Attach plan, Join meeting, Finish report.
  - **To do** with an overdue report, a "no plan" item, a class ending soon and a follow-up.
  - **Coming up** with workspace dots.
  - One team block: Reports overdue.
- **Lesson page**, both tabs:
  - **Plan tab**: 4–5 stages, the side column (participants, last lesson's homework), and one plan note.
  - **Report tab**: 6 participants in mixed attendance and homework states, long participant notes (to test 16 px prose), Save draft and Mark done.
- **My week**:
  - Desktop time grid with 3 workspaces, about 15 lessons, one clash and one cancelled lesson.
  - Phone day list.
  - The rough **dark version** of the desktop grid (one direction is enough, or all three if cheap).
- **Viewports**: desktop (1440 px) for everything; phone (390 px) for Home and the Report tab, the two "between lessons" screens.

## Open questions for the prototype

**All answered in `visual-design.md`**, with the reason for each.

- Which direction (Notebook, Studio, Ledger), or which mix of their dials.
- The accent hue: deep teal, indigo or no-hue ink.
- How warm the neutrals are: subtle or clearly beige.
- The typeface: Figtree, Inter or Source Sans 3, and whether a serif for page titles earns its place.
- The exact 8 workspace hues and their tint and text shades, after the accent is chosen.
- Card radius: 6, 8 or 12 px.
- Whether "Mark done" gets one quiet touch (for example a check that draws in).
- Exact type steps and line heights.
- Whether the workspace colours survive the rough dark My week.
- Every token pair passing AA, especially muted text, input borders and workspace tints.
