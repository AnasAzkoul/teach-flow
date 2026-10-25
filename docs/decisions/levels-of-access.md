# Levels of access: decisions

Outcome of the levels-of-access grilling session (19 Oct 2026) and its follow-up on the parked items (20–21 Oct 2026). Terms follow `GLOSSARY.md`. This refines the role rules in `phase-1-features.md` and the "agreed for now" Members settings page from the screen-design session; where they differ, this file and the glossary win.

New glossary terms: **Senior teacher**, **Team**, **Plan note**, **Report note**, **Substitute request**, **Renewal recommendation**, and from the follow-up **Timetable change request** and **Availability**. Updated: Member, Teacher (role), Level, Invite, Overdue report. The cancellation-rules session (24–25 Oct 2026) split the Move / cancel row and added Workspace rules and Close school; see "Moving, cancelling and ending lessons" below.

## Shape

- **Fixed roles, strict ladder**: super-admin ⊃ admin ⊃ senior teacher ⊃ teacher. Each role can do everything the roles below it can. The software adapts to a school's structure through teams, not through custom roles. School-defined custom roles are a later feature.
- Mapping to how schools talk: the school's owner is a **super-admin** (later also commercial and financial matters), the director of teachers is an **admin**, and a senior teacher with 3–5 teachers under them is a **senior teacher** leading a **team**.
- A **personal workspace** has no restrictions: its teacher is its only super-admin. Everything below is about school workspaces.

## Teams

- A team has exactly one senior teacher. A teacher is in at most one team. Teachers in no team answer directly to admins. Teams never contain other teams.
- Admins create teams, rename them and move teachers between them.
- A senior teacher can also be an assigned teacher of their own classes.
- **The team's classes** are classes where an assigned teacher is in the team (or is its senior teacher).
- When a team's senior teacher is removed or demoted, the admin doing it must, in the same step, either name a new senior teacher (often by promoting a teacher from the team) or dissolve the team. Teachers can be promoted to senior teacher and senior teachers demoted to teacher.

## Grants

- **Can set levels**: given to individual teachers by admins, or by a senior teacher for their own team. Senior teachers can always set levels for their team's students; admins can for any student.
- **Can manage classes**: given to senior teachers only, by admins. It covers the team's classes: create classes (which become the team's) and students, choose assigned teachers from their own team, archive classes, and change timetables. It does not cover adding hours or recording "won't renew", which are a sales job and stay with admins. Teachers can never manage classes.

## Guiding teachers

- **Plan note**: a senior teacher or admin leaves a note on a lesson's plan copy (or one of its stages). The teacher can reply and marks it resolved. Only the lesson's teacher, their senior teacher and admins see it. Senior teachers don't edit plan copies themselves.
- **Report note**: the same thing on a lesson report. Senior teachers don't edit reports; admins still can.
- **Overdue reports**: shown to the teacher, to their senior teacher (as a "Reports overdue" block on Home for their team) and to admins (whole school). **Send reminder** emails the teacher and adds "Reminded by X" to that To do item, at most once a day per report. No notification centre is needed.

## Substitutes

- A teacher raises a **substitute request** for one of their lessons and can suggest a teacher. Their senior teacher (or an admin, for a teacher in no team) approves the suggestion or picks someone else. Requests appear on the senior teacher's Home alongside "Lessons without a teacher".

## Renewal

- When a class is ending soon, its assigned teacher writes a **renewal recommendation**: needs more hours (with reasons) or ready to finish (e.g. ready for the exam, goal reached). It's one per class for now; in a group class the reasons can name students.
- The senior teacher (or an admin, for a teacher in no team) can discuss it in replies until they agree.
- Admins see the recommendations next to **Add hours** / **Won't renew** on their "Classes ending soon" block. Only admins resolve it.

## Past students

- When a student or class leaves a teacher, the teacher keeps only the lessons they taught (reports and participant notes included). The portfolio, later lessons and new notes are hidden from that day. A substitute keeps only the lesson they substituted.

## Library (school)

- Everyone can see and use every item, create items, and bring personal items in as a library copy.
- Edit or archive: teachers their own items, senior teachers their own and their team's, admins all.

## Members settings page

Replaces the "agreed for now" version.

- Tabs: Members · **Teams** (new) · Invites · Former members · Audit history.
- Member rows: name, role, team, classes, grants, ⋯ (shows only the actions the viewer's role allows).
- Teachers and senior teachers can open Members and Teams read-only. A senior teacher's ⋯ on their own team's teachers offers only Can set levels.
- Invites, Former members and Audit history are for admins and super-admins.

## Permission matrix (school workspace)

✓ can · view = read only · – can't · "own" = assigned classes or lessons taught · "team" = the team's classes · ★ = needs a grant.

| Screen / action | Teacher | Senior teacher | Admin | Super-admin |
|---|---|---|---|---|
| **Home** | | | | |
| Today, To do (own lessons) | ✓ | ✓ | ✓ | ✓ |
| Team items in To do: reports overdue, needs a substitute, classes ending soon | – | team | school | school |
| Send reminder on an overdue report | – | team | ✓ | ✓ |
| Pending invites block | – | – | ✓ | ✓ |
| **My week** | | | | |
| Own lessons across workspaces | ✓ | ✓ | ✓ | ✓ |
| Team or school calendar (Phase 1: none; pickers show availability) | – | – | – | – |
| **Classes** | | | | |
| See class, its lessons and students | own | team | all | all |
| Create class, choose assigned teachers, archive | – | team ★ | all | all |
| Change timetable directly (assigned teachers are told) | – | team ★ | all | all |
| Timetable change request | raise | decide (team ★) | decide | decide |
| Add hours / record won't renew | – | – | ✓ | ✓ |
| Renewal recommendation | write | discuss | view, discuss | view, discuss |
| **Lesson** | | | | |
| Edit plan copy | taught | view | ✓ | ✓ |
| Plan note / report note | – | team | all | all |
| Write lesson report | taught | view | edit | edit |
| Move / cancel before the start (teachers only until the move cutoff, default 30 min) | own (assigned) | team | all | all |
| No-show / ended early (from the start) | taught (incl. substitute) | team | all | all |
| Restore, edit cancellation | as for the cancel | team | all | all |
| Substitute request | raise | decide (team) | decide | decide |
| **Students and portfolio** | | | | |
| See portfolio | current students | team | all | all |
| Past students | own lessons only | own lessons only | – | – |
| Create student | – | ★ | ✓ | ✓ |
| Student notes, files, assessments | own | team | all | all |
| Set level | ★ own | team | ✓ | ✓ |
| Student deletion | – | – | ✓ | ✓ |
| **Library (school)** | | | | |
| See, use, create, library copy in | ✓ | ✓ | ✓ | ✓ |
| Edit / archive items | own | own + team | all | all |
| **Members** | | | | |
| Members and Teams tabs | view | view, grant Can set levels (team) | ✓ | ✓ |
| Invites, Former members, Audit history | – | – | ✓ | ✓ |
| Invite, remove, promote or demote teachers and senior teachers | – | – | ✓ | ✓ |
| Teams: create, move teachers, replace senior teacher | – | – | ✓ | ✓ |
| Grant Can manage classes | – | – | ✓ | ✓ |
| Remove or demote admins; appoint super-admins | – | – | – | ✓ |
| Billing, delete workspace | – | – | – | ✓ |
| **Workspace** | | | | |
| Workspace rules | view | view | view | ✓ |
| Close school (cancel many lessons at once) | – | – | ✓ | ✓ |

## Follow-up decisions (20–21 Oct 2026)

- **Timetable changes**: admins, super-admins and senior teachers with Can manage classes change a timetable directly (e.g. a parent phones the school). The assigned teachers get a To do item and an email ("Changed by Sara"). An assigned teacher proposes a change through a **timetable change request**, which a senior teacher with the grant (otherwise an admin) approves or declines.
- **Availability**: every picker that gives a teacher lessons (assigned teacher, substitute, timetable change) checks the teacher's **availability** in all their workspaces, using the same rule as a clash, including the 30-minute gap between in-person lessons at different places. It checks the exact time slots over the class's whole expected run (class hours ÷ weekly hours), not only lessons already created. Outside its own lessons, a school sees only free or busy, never why (ADR 0006). The picker shows partial availability ("free from 24 Nov", "busy 2 of 28 lessons"). If a partly busy teacher is chosen, the clashing lessons start without a teacher and go through the substitute flow.
- **Home priority**: ~~a red **Needs a substitute** strip at the very top of Home~~. Replaced on 24 Oct 2026 (`visual-design.md` review): lessons with no teacher or an open substitute request are team items in To do, with Approve or Choose, and those within 48 hours sort into **Needs action now**. See `phase-1-screen-designs.md`.
- **No team or school calendar in Phase 1**: availability in the pickers covers the need. A team week view stays parked.
- **Decision records**: ADR 0006 (availability crosses workspaces as busy/free only; amends 0003) and ADR 0007 (fixed roles and teams; custom roles later).

## Moving, cancelling and ending lessons (24–25 Oct 2026)

Outcome of the cancellation-rules grilling. Layouts and counting are in `phase-1-screen-designs.md`; terms in the glossary; ADR 0009 covers when counting is fixed.

- **Move**: teachers move their own lessons until the **move cutoff** (a Workspace rule, default 30 min before the start). Senior teachers, admins and super-admins aren't bound by it and can move a lesson until it starts. Nobody moves a lesson that has started. In a personal workspace the teacher is the super-admin, so the cutoff never applies to them.
- **Before the start**, Move and Cancel belong to the assigned teacher (even while a substitute is set), the senior teacher for the team, and admins. A substitute can't move or cancel ahead.
- **From the start**, whoever teaches the lesson (including a substitute), the senior teacher and admins record a **no-show** (Cancel, Student) or **Ended early**, until the report is done.
- **Restore** and **Edit cancellation** go to whoever could cancel the lesson. Restore works until the scheduled start, or until the scheduled end for a no-show.
- **Close school** (cancel every lesson in a time range on one day) is for admins and super-admins.
- **Workspace rules**: every member can read them; only super-admins change them. Changes go in the audit history.
- **Who gets told**: when someone other than the lesson's teacher (the assigned teacher, or the substitute if set) cancels, restores, moves or edits a cancellation, that teacher gets a To do item and an email ("Cancelled by Noura · school closed"). A no-show recorded by a substitute goes to the assigned teacher. Nobody is told about their own changes or about Ended early. Senior teachers and admins see changes through the Cancelled this week block and the audit history.

### Shaped now, built later

- **Teacher pay rules** (billing phase): Phase 1 only records who taught, who cancelled and which kind, so paid hours can be worked out backwards once built. **Paid hours** = hours taught plus cancelled lessons counted as paid; a substitute gets the paid hours for the lesson they cover. Admins set optional weekly **contracted hours** per teacher on the member row. Principle: a teacher is paid for a cancelled lesson when the class's hours are used for it, so a make-up lesson is never paid twice. Pay rules in Workspace rules (school workspaces only):

  | Rule | Default |
  |---|---|
  | Teacher cancellation allowance, for teachers with contracted hours: yes/no + hours per month | no · 2 h |
  | School cancels: teacher still paid? | no |
  | Free student cancellation (with notice or within the allowance): paid? | no |
  | Charged student cancellation: paid? | yes |

  An ended-early lesson pays what the class uses, never less than the time actually taught.

- **Sales role**: sits beside the ladder, not on it. It sees classes ending soon, hours left, renewal recommendations, and the student's contact details, level and goal. It adds hours or records won't renew. It doesn't see lessons, reports, notes or the library. In a school without one, admins do this. The name isn't settled yet. Billing phase.
- **Renewal recommendations follow the hours**: one per class while hours live on the class; one per student once per-student hour packages arrive.
- **Automated renewal email**: a school setting, off by default. A renewal recommendation has a staff-only **reason** and an optional **message for the student**. The email quotes only that message, only after the senior teacher agrees (or for a teacher in no team), and goes to the parent for a child. It includes hours left and a link to buy more hours. This needs student contact details, guardians and payments: billing phase.
- **Custom roles**: a school creates one by choosing a fixed role to base it on, renaming it, and switching permission matrix rows on or off. It can go up to admin level, never further; super-admin-only rows are locked. The fixed roles stay as presets (ADR 0007).

## Parked for later

- **On-call teacher**: many schools keep a teacher on call to cover for missing teachers. Admins would see who's on call and make them the substitute in one step, or ask others.
- **Team week view** for senior teachers and admins (rows per teacher, this school's lessons only), as a planning tool.
- Build of the shaped items above: sales role, per-student renewal recommendations (with per-student hour packages), automated renewal email and online payment, custom roles, teacher pay rules and paid hours.
