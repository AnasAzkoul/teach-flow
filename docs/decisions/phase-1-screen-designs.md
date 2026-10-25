# Phase 1 screen designs: decisions

Outcome of the Phase 1 screen-design grilling session (18–19 Oct 2026). Terms follow `GLOSSARY.md`. This file covers layouts and screen behaviour. Who-can-do-what is settled in `levels-of-access.md` (19 Oct 2026), which added the **senior teacher** role, **teams**, plan and report notes, substitute requests and renewal recommendations. This file has been updated to match it, and it remains the source for permissions.

New glossary terms from this session: **Follow-up**, **Overdue report**, **Clash**, **Class level**, **Class hours**, **Hours taught / Hours left**, **Class ending soon**. Updated entries: **Library copy** (remembers its source), **Homework** (done / partly done / not done).

The cancellation-rules session (24–25 Oct 2026) added **No-show**, **Cancellation allowance**, **Charged cancellation**, **Restore**, **Make-up lesson**, **Ended early**, **Hours used**, **Workspace rules**, and (billing phase) **Paid hours** and **Contracted hours**. It updated **Cancelled lesson**, **Hours taught**, **Overdue report** and **Attendance**, and added the sections "Cancelling, moving and ending lessons early" and "Workspace rules".

## App shell

- The sidebar has two zones:
  - **You** (Home, My week): always across all the user's workspaces.
  - **Workspace** (switcher, then Classes, Students, Library, Members): scoped to the workspace picked in the switcher.
- **The page decides the workspace.** Opening a Bright School lesson (e.g. from My week) moves the switcher to Bright School, so the sidebar always matches the page.
- No notification centre (bell) in Phase 1. "Notified" means a To do item, an admin block on Home, or email where the glossary already promises one.

## Home

Three personal blocks, for the lessons the user teaches (as assigned teacher or substitute) in every workspace:

- **Today**: one card per lesson. Each card has one main button that changes with the lesson's state:
  1. **Attach plan** if the lesson has no plan copy.
  2. **Open plan** once it has one.
  3. **Join meeting** for online lessons, from 10 minutes before the start until the end.
  4. **Write report** (or **Finish report** if a draft exists) from the lesson's start.

  The rest of the card opens the Lesson page. Moving or cancelling a lesson happens on the Lesson page, not on Home.
- **To do** gets items from two places:
  - **Automatic** (worked out by the app, never stored, gone once fixed): report missing, report draft, overdue report, no plan for a lesson in the next 48 h, and the class-hours steps (see Class page).
  - **Follow-ups**: personal reminders the member writes, visible only to their creator.
- **Coming up**: the next 7 days after today, grouped by day, with a workspace colour dot and a "no plan" flag on each lesson. No cap on items. Ends with a link to My week.
- **Pending invites**: a banner above Home (and in the workspace switcher).

**Needs a substitute strip**: a red strip at the very top of a senior teacher's Home (their team) and an admin's Home (whole school), above their own Today. It lists lessons in the next 48 hours that have no teacher or an open substitute request, with one-tap **Approve** or **Choose**. Later requests stay in the blocks below.

**Team and school blocks**: one group per school workspace where the user leads a team or runs the school, placed below the personal blocks. Senior teachers see them for **their team's classes**; admins and super-admins see them for the **whole school**.

| Block | Senior teacher | Admin / super-admin |
|---|---|---|
| Reports overdue, with **Send reminder** | team | school |
| Substitute requests (approve the suggested teacher or pick another) | team | school (and teachers in no team) |
| Lessons without a teacher | team | school |
| Classes ending soon, with renewal recommendations | team (view and discuss) | school (resolve with Add hours / Won't renew) |
| Cancelled this week (counted by who cancelled; ended early on its own line) | – | school |
| Pending invites (flagging ones about to expire) | – | school |

- **Send reminder** emails the teacher and adds "Reminded by X" to that item in the teacher's To do, at most once a day per report. Still no notification centre.
- **Cancelled this week** covers Mon–Sun by the lesson's date and shows what is cancelled now (restored lessons drop out). Counts: School · Teacher · Student (with notice · late · no-show, and how many were charged). Clicking a count lists those lessons, each opening its Lesson page. "Ended early: 2" sits on its own line underneath and isn't added in, because those lessons took place. No senior-teacher version for now.
- A user who teaches nothing in a workspace sees an empty Today ("No lessons today") and only that workspace's blocks. Nobody sees other teachers' lessons as Today cards.

## My week

- **Desktop:** a time grid. **Phones:** a day list.
- **Clashes** are outlined: two lessons that overlap, or two in-person lessons at different places less than 30 minutes apart.
- Each lesson shows only the basics: time, class, workspace, place.
- **Workspace colours belong to each teacher**, not to the workspace. One is assigned automatically from 8 fixed colours when the teacher joins a workspace, and the teacher can change it by clicking the colour dot in the workspace switcher.
- Clicking a lesson opens its Lesson page, and the switcher follows to that lesson's workspace.
- A lesson card offers **Move** and **Cancel** before the start, and **Ended early** and **Cancel** (for no-shows) from the start, to whoever may do them (see "Cancelling, moving and ending lessons early").

## Library

- **Tabs:** Lesson plans · Activities · Materials.
- **Filter bar:** search, Level (finds items whose level range covers the chosen level), Skills, Exam, Topic tags, Created by, Show archived.
- **Layout:** list rows, not cards. Each row shows title, level range, skills, topic tags and usage ("used 12×, last 3 Oct"). Usage counts every lesson in the workspace whose plan copy came from that plan.

### Attach plan picker

- Opens from the Lesson page or from a Today card.
- The level filter starts at the class level.
- A plan already used with this class gets a badge: "Used with this class · 3 Oct". Choosing it shows one confirm step with a useful fact ("3 of today's 9 participants weren't in that lesson"). The warning never blocks.
- In a school lesson, a source toggle switches between **School library** and **Your personal library**. Picking a personal plan:
  1. Shows a confirm step that spells out what becomes the school's ("…and its 2 activities and 3 materials become Bright School's").
  2. Makes a library copy in the school.
  3. Attaches it to the lesson as a plan copy.

  Picking the same personal plan again reuses the existing school copy instead of making a new one.

## Lesson page

- **Header:** class, date and time, place or meeting link, teacher, participant count. Before the start it offers **Move** and **Cancel lesson**; from the start, **Ended early** and **Cancel lesson** (for no-shows). A cancelled lesson shows who cancelled, the kind and the reason, with **Restore** and **Edit cancellation** where allowed. See "Cancelling, moving and ending lessons early".
- **Tabs:** **Plan** | **Report**. The page opens on Plan before the lesson starts and on Report from its start time.
- **Plan tab:**
  - The plan copy's stages, editable for this class only.
  - A side column with participants (plus "add guest") and last lesson's homework, so the teacher remembers to check it.
- **Report tab** (available from the lesson's start time, so attendance can be taken at the beginning of class):
  - Whole-lesson fields: what was covered, homework set, general notes.
  - One row per participant:
    - **Attendance**: present, late, absent (excused) or absent (unexcused). Everyone starts as Present, with an "All present" shortcut.
    - **Homework check** on last lesson's homework: done, partly done or not done. Only for participants who were in the lesson where it was set.
    - **Participant note**, with a "+ Follow-up" link.
  - **Save draft** and **Mark done** buttons. When every participant is absent (excused or unexcused, nobody present or late), Mark done becomes **Record as cancelled** (see below).
  - The homework check skips cancelled lessons: it shows the homework from the last lesson that took place.
- **Plan notes and report notes**: a senior teacher (for their team) or an admin can leave a note on the plan copy (or one of its stages) or on the lesson report. The teacher replies and marks it resolved. Only the lesson's teacher, their senior teacher and admins see these notes. Senior teachers don't edit plan copies or reports; admins can still edit reports.
- **Substitute request**: the lesson's teacher can request a substitute for the lesson and suggest a teacher. It goes to the "Substitute requests" block of their senior teacher, or of admins for a teacher in no team.
- An overdue report shows in the teacher's own To do, and in the "Reports overdue" block for their senior teacher and admins.

## Student portfolio

- **Header:**
  - Name, age group, current level (with the date it was set).
  - Each of the student's classes as *name · level · 1:1 or group · hours used / class hours*. "1:1" isn't stored; it just means the class has one member.
  - Active goal.
  - Attendance over the last 30 days.
- **Tabs:**
  - **Overview** (background, level history, latest participant notes)
  - **Lessons** (the student's lesson history: attendance, homework check and participant note per lesson)
  - **Assessments** (with skill scores and "+ Assessment")
  - **Notes and files** (student notes and student files on one timeline)

## Class page

- **Header:** name, **class level**, current timetable, place, assigned teachers, student count, and a **class hours** progress bar ("14 of 20 h used · 6 left"). The line underneath breaks it down: "12.5 taught · 1 charged cancellation · 0.5 counted from an ended-early lesson · Allowance: 1 of 2 h used".
- **Tabs:**
  - **Lessons** (opens first): next lessons with plan status, then past lessons with attendance and report status. Cancelled lessons are greyed out, with a tag ("Cancelled · Student · late · charged 1 h", or "· free"). Ended-early lessons are normal rows tagged "Ended early 17:35 · Student · used 1 h". Make-up lessons are tagged "Make-up for Thu 19 Nov".
  - **Students**: current members with their own levels, linked to their portfolios. Past members sit in a collapsed list.
  - **Timetable**: the current pattern, "Change from date…", and timetable history. Admins, super-admins and senior teachers with Can manage classes change it directly; the assigned teachers get a To do item and an email ("Changed by Sara"). An assigned teacher instead sends a **timetable change request**, which a senior teacher with the grant (otherwise an admin) approves or declines.
- **Teacher pickers** (assigned teacher, substitute, timetable change) show each teacher's **availability** across all their workspaces, as free or busy only (ADR 0006). They check the exact slots over the class's whole expected run and show partial availability ("free from 24 Nov", "busy 2 of 28 lessons").
  - **Goal**: the class goal that new members start with.

### Class level and class hours

- **Class level** is required on every class. For a 1:1 class, the create form pre-fills it from the student's level. It never changes the students' own levels.
- **Class hours** are required on every class: every class (group or 1:1) is sold as a definite number of hours. A private student renews by buying more hours, which are added to the class.
- **Hours taught** is the time actually taught (ended-early lessons only up to their end; cancelled lessons never). **Hours used** is what comes off the class hours: lessons that took place, counted per the Workspace rules, plus charged cancellations. **Hours left** = class hours − hours used.
- The timetable never creates lessons beyond the class hours. So any cancellation that isn't charged (teacher, school, or a free student cancellation) frees hours, and the timetable adds a **make-up lesson** after the current last one. The assigned teachers get a To do item ("Mon 21 Dec added to make up 1.5 h (cancelled Mon 9 Nov)"). Part-hours left by ended-early lessons build up in hours left until a whole lesson fits. A class with no timetable gets nothing added. A make-up lesson on a slot where the teacher is busy is created without a teacher and goes through the substitute flow. Restoring the cancelled lesson removes its make-up lesson if that hasn't started.
- **Class ending soon** starts when 25% or less of the class hours are left (hours left uses hours used, so a charged cancellation can trigger it sooner). A remainder smaller than a lesson at the end shows here too, for an admin to add hours or schedule a shorter last lesson by hand:
  - **Assigned teachers** get To do items at 25%, 12.5% and 2 h left (10 h, 5 h and 2 h for a 40 h class). Each one replaces the previous one. They only inform; the teacher has nothing to resolve.
  - The assigned teacher writes a **renewal recommendation** (one per class): needs more hours, with reasons, or ready to finish (e.g. ready for the exam, goal reached). In a group class the reasons can name students. The senior teacher (or an admin, for a teacher in no team) can discuss it in replies until they agree.
  - **Admins** see the class in the "Classes ending soon" block from 25% left, with the renewal recommendation next to the actions, until an admin resolves it, either with **Add hours** (resolves automatically) or **Won't renew** with a reason: finishing, taking the exam, moving to another class, or other plus a note. Only admins resolve it; senior teachers see their team's classes there to view and discuss.
- Naming: a class is always "class", never "course". The word "course" is kept free for a possible school catalogue later.

## Cancelling, moving and ending lessons early

Outcome of the cancellation-rules grilling (24–25 Oct 2026). Who may do what is in `levels-of-access.md`; terms in the glossary.

### Cancel

- A lesson can be cancelled until its report is marked done (a done report means "this lesson happened"). To cancel after that, someone undoes Mark done first. The one exception is Record as cancelled (below).
- **Cancelling never deletes a report.** A draft or done report stays on the cancelled lesson's Report tab, visible and editable as before. A cancelled lesson needs no report: no To do item, never overdue.
- **The cancel box**, top to bottom:
  1. A warning naming the class, date and time ("Cancel Omar · Thu 22 Oct, 17:00–18:00?") and how it counts towards hours; if a draft exists, "The report draft stays on the lesson."
  2. **Who cancelled**: Student / Teacher / School (required).
  3. **Reason** (required).
  4. **Typed confirmation**: the day and date as the box shows them ("Type Thu 22 Oct to confirm"), ignoring capitals and spaces; paste allowed. It catches cancelling the right class on the wrong day, which typing the class name wouldn't.
  5. A red **Cancel lesson** button, disabled until 2–4 are filled in, with **Keep lesson** beside it.
- The person who clicked Cancel is recorded separately, in the audit history.
- **Kinds of student cancellation**, worked out from when it was recorded: **with notice** (at least the notice period ahead), **late** (less), **no-show** (at or after the start). Each kind is free, uses the allowance, or is always taken off, per the Workspace rules. "Uses the allowance" is free while the class's cancellation allowance lasts, then charged. Teacher and school cancellations are never charged.
- **The same model for every class**: a 1:1 is a class of one. If some students are absent, the lesson goes ahead and counts normally; their absences are attendance only. Only a whole-class cancellation is a student cancellation, using the class's allowance.
- **Record as cancelled**: when every participant on a report is absent, Mark done becomes Record as cancelled. A short confirm ("Everyone was absent, so this lesson will be recorded as cancelled by the students") saves the report as done and cancels the lesson as a no-show, reason "All students absent" (editable), with no typed confirmation. Each student's absence stays in their portfolio. Undoing Mark done restores the lesson.
- **Close school** (admins and super-admins, school workspaces): on the workspace's Classes page, pick a day and a time range (or all day). It lists the affected lessons, all ticked; untick any that can go ahead (e.g. online). One reason and one typed confirmation (the date) cancel them all as School. Teachers are told and make-up lessons are added as usual.

### Restore and edit

- **Restore** brings the lesson back with whatever report it had. The cancellation stays in the audit history. It works until the scheduled start, or until the scheduled end for a no-show (the student walks in late). It removes the make-up lesson the cancellation added, if that hasn't started.
- **Edit cancellation** changes who cancelled and the reason, at any time. It recounts the hours under the current Workspace rules and goes in the audit history.

### Ended early

- A lesson that took place but stopped before its scheduled end (a power cut, the only student leaving). It still needs a report.
- Available from the start until the report is done, on the Lesson page header and the My week card.
- **The box**: actual end time (defaults to now, rounded to 5 min; between the start and the scheduled end), who ended it (Student / Teacher / School), reason (required), and a preview line ("Omar's class will use 1 h (full lesson, ended by the student)"). No typed confirmation. **Ended early** and **Keep as taught** buttons.
- The report shows a banner ("Ended early at 17:35 · Student · laptop died") with **Edit** and **Undo ended early** until the report is done. Every change goes in the audit history.
- How it counts towards hours used is a Workspace rule per who ended it: time taught, full lesson, or nothing.

### Move

- **The Move box**: new date and start time (the length stays), the place or meeting link (prefilled, changeable), **who asked** (Student / Teacher / School, required), reason (optional). No typed confirmation.
- It checks the teacher's **availability** across all their workspaces as they pick (the clash rule); a busy slot is blocked. Students aren't checked.
- Moves are always free: never charged and never using the allowance, even late. After the move cutoff, the only option is to cancel.
- A substitute stays if they're free at the new time; otherwise the lesson goes back to the assigned teacher, who can raise a new substitute request.
- Every move goes in the audit history. The lesson keeps its identity, plan copy and report draft.

### Who gets told

- When someone other than the lesson's teacher (the assigned teacher, or the substitute if set) cancels, restores, moves or edits a cancellation, that teacher gets a To do item and an email ("Cancelled by Noura · school closed").
- A no-show recorded by a substitute goes to the assigned teacher ("Omar no-show, recorded by Daniel").
- Nobody is told about their own changes or about Ended early. Make-up lessons tell the assigned teachers (see Class page). Students aren't told (no contact details in Phase 1).

## Workspace switcher

- **Order:** Personal first, then school workspaces A–Z. Each entry shows the user's role and their colour dot (click the dot to change the colour).
- **Pending invites** appear here with **Accept / Decline**. Accepting switches the user into that workspace.
- **Create school workspace** at the bottom. Anyone can create one and becomes its first super-admin. Billing comes later.

## Members settings (school workspaces only)

Final version from `levels-of-access.md`, which replaces the "agreed for now" draft from this session.

- **Tabs:** Members · **Teams** · Invites · Former members · Audit history.
- **Member rows:** name, role, team, assigned classes, grants (**Can set levels**, **Can manage classes**).
- **The ⋯ menu** shows only the actions the viewer's role allows (change role, remove, grants). A senior teacher's ⋯ on their own team's teachers offers only Can set levels. Removing someone asks for confirmation and states what stays behind ("their 140 lessons and reports stay, credited to them").
- **Who sees what:**
  - Teachers and senior teachers can open Members and Teams read-only.
  - Invites, Former members and Audit history are for admins and super-admins only.
- **Invites:** email, role, expiry, Resend / Revoke.
- Personal workspaces have no Members page.

## Workspace rules (every workspace)

- A **Workspace rules** page in settings, next to Members, in school and personal workspaces. Every member can read it; only super-admins change it (in a personal workspace, the teacher). The name works for personal workspaces and can hold rules that aren't about lessons later.
- **Sections and values:**

  | Section | Rule | Allowed values | Default |
  |---|---|---|---|
  | Moving lessons | Teacher move cutoff | none · 15 min · 30 min · 1 h · 2 h · 24 h | 30 min |
  | Student cancellations | Notice period | none · 12 h · 24 h · 48 h | 24 h |
  | | Cancellation allowance | 0–50% of class hours (rounded down to the half hour) | 10% |
  | | With notice / Late / No-show | free · uses the allowance · always taken off | free / uses the allowance / uses the allowance |
  | Ended early | Ended by Student / Teacher / School | time taught · full lesson · nothing | full lesson / time taught / time taught |
  | Reports | Report becomes overdue after | 12 h · 24 h · 48 h · 72 h | 24 h |
  | Teacher pay (billing phase, school workspaces only) | see `levels-of-access.md` | | |

- Invite validity (7 days) stays fixed: it's a security setting, not school policy.
- **Changes apply from then on** (ADR 0009): each cancellation and ended-early lesson keeps the counting it got when recorded, unless its record is edited. A lower allowance never takes back allowance already used. Every change goes in the audit history ("Sami changed No-show from uses the allowance to always taken off"), and the page shows "Last changed 1 Dec by Sami". Nobody is notified.
- Accepted consequence: in a personal workspace the move cutoff never applies to the teacher.

## Parking lot

Deferred on purpose, to revisit later:

- ~~**Admin view of overdue reports, with "Send reminder" to the teacher.**~~ Resolved in `levels-of-access.md`: senior teachers (for their team) and admins (whole school) see a "Reports overdue" block, and Send reminder emails the teacher and tags their To do item.
- ~~**Members settings page**~~ (agreed only "for now"): replaced in `levels-of-access.md`, which adds a Teams tab and read-only access for teachers.
- ~~**Home priority for senior teachers**~~: resolved in `levels-of-access.md` as the **Needs a substitute** strip at the top of Home.
- **Team week view** for senior teachers and admins: not in Phase 1 (availability in the pickers covers the need). My week stays personal.
- ~~**Cross-workspace reads for Home and the personal-library toggle**~~: resolved by ADR 0008, which allows both as narrow, read-only reads of the user's own data only.
- **Per-student hour packages** (students who join mid-way, whether absences use up hours, pricing): later billing phase. Phase 1 keeps hours on the class.
- **"Course"** as a school catalogue or product above classes: the word is kept for that.
- **Choosing Workspace rules when a school is first opened**: part of the school onboarding topic. Until then, new workspaces start with the defaults.
- **Teacher pay rules and paid hours**: shaped in `levels-of-access.md`, built in the billing phase.
- **May be revisited during development**: the three kinds of student cancellation with their defaults, and group classes using the same model as 1:1.
- **Cancelling a lesson that actually happened** (with its edge cases): not in Phase 1.
- **A senior-teacher version of Cancelled this week**: add if teams ask.
