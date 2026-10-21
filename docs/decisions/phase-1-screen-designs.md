# Phase 1 screen designs: decisions

Outcome of the Phase 1 screen-design grilling session (18–19 Oct 2026). Terms follow `GLOSSARY.md`. This file covers layouts and screen behaviour. Who-can-do-what is settled in `levels-of-access.md` (19 Oct 2026), which added the **senior teacher** role, **teams**, plan and report notes, substitute requests and renewal recommendations. This file has been updated to match it, and it remains the source for permissions.

New glossary terms from this session: **Follow-up**, **Overdue report**, **Clash**, **Class level**, **Class hours**, **Hours taught / Hours left**, **Class ending soon**. Updated entries: **Library copy** (remembers its source), **Homework** (done / partly done / not done).

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
| Cancelled this week (counted by who cancelled) | – | school |
| Pending invites (flagging ones about to expire) | – | school |

- **Send reminder** emails the teacher and adds "Reminded by X" to that item in the teacher's To do, at most once a day per report. Still no notification centre.
- A user who teaches nothing in a workspace sees an empty Today ("No lessons today") and only that workspace's blocks. Nobody sees other teachers' lessons as Today cards.

## My week

- **Desktop:** a time grid. **Phones:** a day list.
- **Clashes** are outlined: two lessons that overlap, or two in-person lessons at different places less than 30 minutes apart.
- Each lesson shows only the basics: time, class, workspace, place.
- **Workspace colours belong to each teacher**, not to the workspace. One is assigned automatically from 8 fixed colours when the teacher joins a workspace, and the teacher can change it by clicking the colour dot in the workspace switcher.
- Clicking a lesson opens its Lesson page, and the switcher follows to that lesson's workspace.

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

- **Header:** class, date and time, place or meeting link, teacher, participant count. **Move** and **Cancel lesson** live here.
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
  - **Save draft** and **Mark done** buttons.
- **Plan notes and report notes**: a senior teacher (for their team) or an admin can leave a note on the plan copy (or one of its stages) or on the lesson report. The teacher replies and marks it resolved. Only the lesson's teacher, their senior teacher and admins see these notes. Senior teachers don't edit plan copies or reports; admins can still edit reports.
- **Substitute request**: the lesson's teacher can request a substitute for the lesson and suggest a teacher. It goes to the "Substitute requests" block of their senior teacher, or of admins for a teacher in no team.
- An overdue report shows in the teacher's own To do, and in the "Reports overdue" block for their senior teacher and admins.

## Student portfolio

- **Header:**
  - Name, age group, current level (with the date it was set).
  - Each of the student's classes as *name · level · 1:1 or group · hours taught / class hours*. "1:1" isn't stored; it just means the class has one member.
  - Active goal.
  - Attendance over the last 30 days.
- **Tabs:**
  - **Overview** (background, level history, latest participant notes)
  - **Lessons** (the student's lesson history: attendance, homework check and participant note per lesson)
  - **Assessments** (with skill scores and "+ Assessment")
  - **Notes and files** (student notes and student files on one timeline)

## Class page

- **Header:** name, **class level**, current timetable, place, assigned teachers, student count, and a **class hours** progress bar ("34 of 60 class hours taught · 26 left").
- **Tabs:**
  - **Lessons** (opens first): next lessons with plan status, then past lessons with attendance and report status. Cancelled lessons are greyed out.
  - **Students**: current members with their own levels, linked to their portfolios. Past members sit in a collapsed list.
  - **Timetable**: the current pattern, "Change from date…", and timetable history. Admins, super-admins and senior teachers with Can manage classes change it directly; the assigned teachers get a To do item and an email ("Changed by Sara"). An assigned teacher instead sends a **timetable change request**, which a senior teacher with the grant (otherwise an admin) approves or declines.
- **Teacher pickers** (assigned teacher, substitute, timetable change) show each teacher's **availability** across all their workspaces, as free or busy only (ADR 0006). They check the exact slots over the class's whole expected run and show partial availability ("free from 24 Nov", "busy 2 of 28 lessons").
  - **Goal**: the class goal that new members start with.

### Class level and class hours

- **Class level** is required on every class. For a 1:1 class, the create form pre-fills it from the student's level. It never changes the students' own levels.
- **Class hours** are required on every class: every class (group or 1:1) is sold as a definite number of hours. A private student renews by buying more hours, which are added to the class.
- **Hours taught** is worked out from lessons that took place (cancelled lessons don't count). **Hours left** = class hours − hours taught.
- The timetable never creates lessons beyond the class hours.
- **Class ending soon** starts when 25% or less of the class hours are left:
  - **Assigned teachers** get To do items at 25%, 12.5% and 2 h left (10 h, 5 h and 2 h for a 40 h class). Each one replaces the previous one. They only inform; the teacher has nothing to resolve.
  - The assigned teacher writes a **renewal recommendation** (one per class): needs more hours, with reasons, or ready to finish (e.g. ready for the exam, goal reached). In a group class the reasons can name students. The senior teacher (or an admin, for a teacher in no team) can discuss it in replies until they agree.
  - **Admins** see the class in the "Classes ending soon" block from 25% left, with the renewal recommendation next to the actions, until an admin resolves it, either with **Add hours** (resolves automatically) or **Won't renew** with a reason: finishing, taking the exam, moving to another class, or other plus a note. Only admins resolve it; senior teachers see their team's classes there to view and discuss.
- Naming: a class is always "class", never "course". The word "course" is kept free for a possible school catalogue later.

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

## Parking lot

Deferred on purpose, to revisit later:

- ~~**Admin view of overdue reports, with "Send reminder" to the teacher.**~~ Resolved in `levels-of-access.md`: senior teachers (for their team) and admins (whole school) see a "Reports overdue" block, and Send reminder emails the teacher and tags their To do item.
- ~~**Members settings page**~~ (agreed only "for now"): replaced in `levels-of-access.md`, which adds a Teams tab and read-only access for teachers.
- ~~**Home priority for senior teachers**~~: resolved in `levels-of-access.md` as the **Needs a substitute** strip at the top of Home.
- **Team week view** for senior teachers and admins: not in Phase 1 (availability in the pickers covers the need). My week stays personal.
- **Cross-workspace reads for Home and the personal-library toggle** (open): ADR 0003 (as amended by 0006) allows only My week and availability to read across workspaces. Home's Today, To do and Coming up (plan and report status, class-hours items, follow-ups) and the picker's "Your personal library" toggle also need such a read. ADR 0003 needs an amendment before these are built.
- **Per-student hour packages** (students who join mid-way, whether absences use up hours, pricing): later billing phase. Phase 1 keeps hours on the class.
- **"Course"** as a school catalogue or product above classes: the word is kept for that.
