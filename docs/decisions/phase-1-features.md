# Phase 1 features: decisions

Outcome of the Phase 1 feature grilling session (17–19 Oct 2026). Terms follow `GLOSSARY.md`; where a later session refined a rule (screen designs, levels of access, tech stack), the glossary and the later decision files win.

Source context: the original project handoff (problem, lesson chain, workspaces, roadmap). Phase 2 (AI agents) and Phase 3 (student portal, analytics, billing) are out of scope here.

## Classes and students

- Every lesson belongs to exactly one **class**. A private 1:1 student is a class with one member; the UI can hide the "class" idea for 1:1. A 1:1 class becomes a group simply by adding members.
- A class has one or more **assigned teachers**, an optional **goal**, and can be **archived**.
- A **student** is a record owned by one workspace, not a user (no login in Phase 1). The same person in two workspaces is two students. Students are never moved, copied or merged across workspaces, not even manually (ADR 0001).
- In a school workspace, only super-admins and admins create students and classes and assign teachers. Teachers see only their assigned classes and those classes' students.
- Classes and students are **archived** (hidden, history kept, reversible). **Student deletion** is a separate, permanent admin action for GDPR requests.

## Portfolio

- **Background**: short, mostly free-text section: **age group** (child / teen / adult, not date of birth), reason for learning, struggles and learning needs, interests. It never holds level or goal; the portfolio shows those alongside it from their own records.
- **Level**: one overall CEFR level including plus steps (A1, A2, A2+, B1, B1+, B2, B2+, C1, C2), with dated history of who set it. Only members allowed to set levels can do so: super-admins and admins, plus teachers an admin grants it to. In a personal workspace the teacher sets it.
- **Goal**: teacher's own description plus optional target level, target date and named exam. One active goal per student; earlier goals kept as history. A class may have a goal that new members take as their starting goal (editable per student). Exam-specific skill lists are a later extension.
- **Student notes**: dated, credited to their author, not tied to a lesson. Visible to everyone who can see the student. (Special-category data such as learning needs may appear; deletion and export must include all notes and files.)
- **Student files**: separate list with uploader and date, optionally linked to an assessment.

## Library

- A workspace's **library** holds three item types: **lesson plans**, **activities**, **materials**.
- A lesson plan is made of ordered **stages**; each stage can reference activities and materials. Activities can reference materials.
- Tagging: a **level range** (e.g. B1–B2), one or more **skills** (fixed list of six: Reading, Writing, Listening, Speaking, Grammar, Vocabulary), an optional **exam**, plus free **topic tags** (with suggestions from tags already used in the workspace). Same tagging for all three item types.
- Library items can be archived without breaking past lessons.
- **Library copy**: Phase 1 copies go personal → school only. A copy brings the activities and materials it uses and belongs to the receiving workspace. While attaching a plan to a school lesson, the teacher can browse their personal library in a separate tab; picking a personal plan makes a library copy in the school library first. The school sees only what was picked. Later: school → personal copying, on by default, which a school can switch off.

## Library view (layout detail deferred to the screen-design session)

- Tabs for plans / activities / materials; filters on level range, skill, exam, topic tag, plus text search; sort by recently used (default), newest, A–Z.
- Every item shows usage (count, last class and date); a plan lists every lesson it was used in; activities and materials show "used in these plans".
- Actions: attach to lesson, duplicate, edit, archive; in a personal library, "copy to school…".
- Warn when attaching a plan already used with the same class.

## Scheduling and lessons

- A class has a **timetable** (repeating weekly pattern); the app creates real lessons from it a few weeks ahead. One-off lessons can be added by hand.
- A timetable change takes effect from a chosen date: future, not-yet-held lessons move to the new pattern keeping their plan copies; past lessons are untouched; the class keeps its timetable history. Lessons that can't be mapped cleanly are shown to the teacher rather than guessed.
- **Participants**: each lesson keeps its own list. Until the lesson takes place, it follows the class's current members; once it takes place (date passes or report started), it is locked. A guest can be added to a single lesson.
- Each lesson is **in person** (location, plain text) or **online** (meeting link); the timetable sets the default and a single lesson can override it. Bookable rooms are out of Phase 1.
- **Cancelled lesson**: stays on record with a reason and who cancelled (student, teacher, school). Moving a lesson keeps its identity and changes its date.
- Each lesson records who actually taught it. A **substitute** is set on a single lesson and gets access to that lesson only.
- **My week**: a teacher's view of their own lessons (assigned or substituting) across all workspaces, lesson basics only (time, class, workspace, place/link), no student data, colour-coded by workspace (each teacher picks a colour per workspace, with a default), clashes highlighted. Opening a lesson switches into its workspace. An iCal feed is a later extra.

## Lesson plans on lessons

- A library lesson plan is a template. Attaching it to a lesson creates a **plan copy** owned by that lesson, adjustable for that class only, which remembers its source plan. Editing the library plan never changes past lessons.
- A plan copy copies the stage text; activities and materials stay links to the library.

## Lesson reports

- Written by the teacher who taught the lesson (including a substitute). Only that teacher and admins can edit it; edits keep a change history. Other teachers record their observations as student notes.
- Status: **draft** or **done** (drives "lessons with no report" to-dos).
- Whole-lesson part: what was covered (vs. the plan copy), homework set, general notes.
- Per participant: **attendance** (present, late, absent excused, absent unexcused), homework check, **participant note**.
- **Homework** is set once per lesson, with an optional extra note for one participant. Completion is ticked on the next lesson's report, which shows the previous homework.

## Assessments

- An **assessment** belongs to one student, appears on their portfolio, and is either a **quiz** or an **official exam** (placement tests and mocks count as quizzes for now).
- Optionally linked to the lesson it took place in.
- One simple shape: the teacher picks the skills tested and enters a **skill score** for each. Richer forms (rubric criteria, overall grades) are later.

## Workspaces, roles and membership

- Personal workspace for every teacher automatically; school workspaces owned by a school; UI workspace switcher.
- Roles: **super-admin** (renamed from "owner"; one or more, at least one always), **admin**, **teacher**. A later session added **senior teacher** and **teams**; see the glossary.
- **Invites**: by email, with a role, valid 7 days, resendable/cancellable. Super-admins and admins invite teachers and admins; only super-admins invite or appoint super-admins. Existing users accept and the school appears in their switcher; new users sign up via the link and also get their personal workspace. No shareable links or join codes in Phase 1.
- Only super-admins can remove or demote admins. A super-admin can remove or demote another super-admin; the affected person is emailed and the change is written to the **audit history**. The last super-admin can't leave or be removed without handing over first. A personal workspace has exactly one super-admin.
- **Former member**: when a teacher leaves, they lose all access; their lessons, reports, assessments and library items stay with the school, credited to them. Admins see classes left without a teacher. Their personal workspace is untouched.

## Search

- Scope: current workspace only (follows the switcher).
- Finds: students, classes, lesson plans / activities / materials (title and tags), lesson report text, assessments by student.
- Not in Phase 1: searching inside files (needs background processing; Phase 2 alongside the job queue).

## Home screen

- Follows the current workspace. Three blocks:
  1. **Today**: the teacher's lessons with place/link and whether a plan is attached.
  2. **To do**: lessons with no report, upcoming lessons with no plan, homework to check.
  3. **Coming up**: short preview linking to My week.
- Admins also see classes with no assigned teacher and pending invites.
- Every to-do is a gap in the lesson chain (plan → lesson → report → assessment).
