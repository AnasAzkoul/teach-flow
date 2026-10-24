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

Updated 24 Oct 2026 after the visual-design prototype review (`visual-design.md`). The Needs a substitute strip, Coming up and the separate team blocks for substitute requests, lessons without a teacher, overdue reports and classes ending soon are gone; their items now live in To do.

Two personal blocks, for the lessons the user teaches (as assigned teacher or substitute) in every workspace, plus team items in To do for senior teachers and admins:

- **Today**: one card per lesson. Each card has at most one main button, the one filled "do this next" button on Home. It follows the **main button rule**, shared with the My week lesson card. Apply the first that matches:
  1. **Join meeting**: an online lesson, from **15 minutes** before the start until the end (was 10).
  2. **Write report** (or **Finish report** if a draft exists): an **in-person lesson once it has started**, or **any lesson that has ended**, while the report isn't done. Attendance is part of the report and is taken at the start of class.
  3. **Attach plan**: the lesson has no plan copy.
  4. Otherwise, **no main button**. **Open plan is dropped**: the card itself opens the lesson.

  A lesson whose report is done shows "✓ Report done · 14:32" instead of a button. The rest of the card opens the Lesson page. Home has no Move or Cancel.
- **Next line**: when the user has no lessons today, or every lesson today is done, Today ends with one line, for example "Next: Fri 23 Oct, 09:00 · Business English ›", which opens that lesson. It isn't shown mid-day.
- **To do** gets items from three places:
  - **Automatic** (worked out by the app, never stored, gone once fixed): report missing, report draft, overdue report, no plan for a lesson in the next 48 h, and the class-hours steps (see Class page).
  - **Follow-ups**: personal reminders the member writes, visible only to their creator.
  - **Team items**, for senior teachers (their team) and admins (whole school, and teachers in no team): lessons that need a substitute (no teacher, or an open substitute request, with **Approve** or **Choose**), reports overdue (with **Send reminder**), and classes ending soon (with the renewal recommendation; senior teachers view and discuss, admins resolve with **Add hours** / **Won't renew**). Each is tagged with a muted "Team" word.
- **Pending invites**: a banner above Home (and in the workspace switcher).

### To do: the list

- **One list sorted by urgency**, with quiet in-list labels and no filled bands:
  - **Needs action now**: due within 48 h or already late.
  - **This week**: the next 7 days (replaces "Soon").
  - **Later**.
- **Types**: Needs a substitute, Report overdue, No plan, Class ending soon, Report draft, Follow-up.
- **Team items you can only nudge** (your only action is Send reminder or Discuss, or someone already handled it) are grey and never in Needs action now. Red means only what the viewer must decide or do themself.
- **Rows**:
  - Urgency shows as an icon plus a coloured type label. Timings ("Tomorrow", "2 days overdue") are ink, not red.
  - Each fact appears once per row. "Team" is a muted word, not a badge.
  - On wide screens, timings and actions line up in columns. On phones a row stacks: type, title, details, then the timing next to the buttons.
  - Buttons are outlined (main action) or ghost (secondary), never filled.
  - A follow-up's circle is a real **Mark done** button.

### To do: filters ("Filter rail")

- **All / Mine / My team** sits in the To do header. It's a full-width row on phones.
- A **rail on the right, outside the list card**, filters **by type only**. It's quiet until used, "All" is the reset, and below about 1024 px it collapses to one select.
- No urgency filter: the list is already sorted and labelled by urgency.
- **Clear filters** shows when any filter is on. Types with no matches are greyed out, not hidden.
- Empty states: "No items match these filters. Show all" when filters hide everything; "All caught up." when there is nothing.

### Team and school blocks

Only the admin-only blocks remain as blocks, below To do, one group per school workspace the user runs:

| Block | Admin / super-admin |
|---|---|
| Cancelled this week (counted by who cancelled) | school |
| Pending invites (flagging ones about to expire) | school |

- **Open**: these two weren't redesigned in the prototype review. They stay as settled until a later review.
- **Send reminder** emails the teacher and adds "Reminded by X" to that item in the teacher's To do, at most once a day per report. Still no notification centre.
- A user who teaches nothing in a workspace sees an empty Today ("No lessons today") and only that workspace's team items and blocks. Nobody sees other teachers' lessons as Today cards.

## My week

- **Desktop:** a time grid. **Phones:** a day list.
- **Clashes** are outlined: two lessons that overlap, or two in-person lessons at different places less than 30 minutes apart.
- Each lesson shows only the basics: time, class, workspace, place. One exception:
  - **No plan mark**: an upcoming lesson with no plan copy shows a small clock (no fill, in the workspace text colour, read out as "No plan"). On phones it's a "No plan" line. It never shows on past or cancelled lessons. This took over Coming up's one unique job, warning about a missing plan 3–7 days ahead; To do keeps its 48-hour No plan item as the safety net.
- **Workspace colours belong to each teacher**, not to the workspace. One is assigned automatically from 8 fixed colours when the teacher joins a workspace, and the teacher can change it by clicking the colour dot in the workspace switcher.
- **Lesson card**: clicking a lesson on desktop opens a popover (click, not hover; Esc or a click outside closes it). Tapping a lesson on a phone opens the same card as a bottom sheet. Top to bottom:
  1. Class (a link to the Lesson page) and date and time.
  2. Workspace and place.
  3. Participants.
  4. Plan status.
  5. Report status, once the lesson has started.
  6. Clash, naming the other lesson.
  7. On a cancelled lesson: who cancelled and why.
  8. Buttons: the main button (the main button rule under Home), **Move** (only while the move cutoff allows), and **Cancel lesson**, which becomes **Restore lesson** on a cancelled lesson. The rules for these actions are the Lesson page's.
- This reverses "moving or cancelling happens on the Lesson page, not on Home" for My week only. Home still has no Move or Cancel.
- Following the class link opens the Lesson page, and the switcher follows to that lesson's workspace.

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
- ~~**Home priority for senior teachers**~~: resolved in `levels-of-access.md` as the **Needs a substitute** strip at the top of Home, then replaced (24 Oct 2026, `visual-design.md` review) by team items inside To do, sorted by urgency.
- **Team week view** for senior teachers and admins: not in Phase 1 (availability in the pickers covers the need). My week stays personal.
- ~~**Cross-workspace reads for Home and the personal-library toggle**~~: resolved by ADR 0008, which allows both as narrow, read-only reads of the user's own data only.
- **Per-student hour packages** (students who join mid-way, whether absences use up hours, pricing): later billing phase. Phase 1 keeps hours on the class.
- **"Course"** as a school catalogue or product above classes: the word is kept for that.
