# Levels of access: decisions

Outcome of the levels-of-access grilling session (19 Oct 2026). Terms follow `GLOSSARY.md`. This refines the role rules in `phase-1-features.md` and the "agreed for now" Members settings page from the screen-design session; where they differ, this file and the glossary win.

New glossary terms: **Senior teacher**, **Team**, **Plan note**, **Report note**, **Substitute request**, **Renewal recommendation**. Updated: Member, Teacher (role), Level, Invite, Overdue report.

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

✓ can · view = read only · – can't · "own" = assigned classes or lessons taught · "team" = the team's classes · ★ = needs a grant · (assumed) = not discussed; confirmed as part of the whole matrix.

| Screen / action | Teacher | Senior teacher | Admin | Super-admin |
|---|---|---|---|---|
| **Home** | | | | |
| Today, To do, Coming up (own lessons) | ✓ | ✓ | ✓ | ✓ |
| Blocks: reports overdue, substitute requests, classes ending soon | – | team | school | school |
| Send reminder on an overdue report | – | team | ✓ | ✓ |
| Pending invites block | – | – | ✓ | ✓ |
| **My week** | | | | |
| Own lessons across workspaces | ✓ | ✓ | ✓ | ✓ |
| Team or school calendar (assumed) | – | – | – | – |
| **Classes** | | | | |
| See class, its lessons and students | own | team | all | all |
| Create class, choose assigned teachers, archive | – | team ★ | all | all |
| Change timetable (assumed) | – | team ★ | all | all |
| Add hours / record won't renew | – | – | ✓ | ✓ |
| Renewal recommendation | write | discuss | view, discuss | view, discuss |
| **Lesson** | | | | |
| Edit plan copy | taught | view | ✓ | ✓ |
| Plan note / report note | – | team | all | all |
| Write lesson report | taught | view | edit | edit |
| Move / cancel lesson | own | team | all | all |
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

## Parked for later

- **School-defined custom roles**: a school names its own roles and picks their permissions, alongside the fixed ones.
- **Home priority for senior teachers**: substitute requests and lessons without a teacher should rank high on a senior teacher's Home so they can act early (screen-layout follow-up).
- **Salesperson role**: acts on classes ending soon using teachers' renewal recommendations when calling the student. Optional; a school may have no salespeople.
- **Automated renewal email and online payment**: a school can choose to email the student when a class is ending soon (hours left plus the renewal recommendation) with a link to buy more hours. Billing phase; students have no login today.
- **Team or school calendar** for senior teachers and admins.
- **Per-student renewal recommendations**, together with the already-parked per-student hour packages.
