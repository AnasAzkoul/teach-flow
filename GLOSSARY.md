# Teach Flow

A connected home for an ESL teacher's work: students, classes, lesson plans, lessons, reports and assessments, all linked together.

## Language

**Workspace**:
The space that owns all teaching data (students, classes, library, lessons). Every teacher has a personal workspace; a school has a school workspace that teachers join as members.
_Avoid_: Organisation, tenant, account, team

**Personal workspace**:
The workspace every teacher gets automatically, holding their own library and private students. The teacher is its only super-admin.
_Avoid_: Private account, freelance workspace

**School workspace**:
A workspace owned by a language school, holding the school's classes, students, results and shared library.
_Avoid_: Organisation, company

**Member**:
A user who belongs to a workspace with one role in it: super-admin, admin, senior teacher or teacher. Each role can do everything the roles below it can.
_Avoid_: User (when the workspace role matters), staff

**Former member**:
A user whose membership of a workspace has ended. They lose all access, but the lessons, reports, assessments and library items they created stay with the workspace, still credited to them.
_Avoid_: Deleted user, ex-teacher

**Invite**:
An email invitation to join a workspace with a given role, sent by a super-admin or admin and valid for 7 days. Super-admins and admins can invite teachers, senior teachers and admins; only super-admins can invite or appoint super-admins.
_Avoid_: Join link, invitation code

**Super-admin**:
A member with full control of a workspace, including billing and deleting it. A workspace has one or more super-admins and must always keep at least one. Only super-admins can remove or demote admins. A super-admin can remove or demote another super-admin; the affected person is notified and the change is recorded in the audit history.
_Avoid_: Owner

**Audit history**:
A workspace's permanent record of sensitive actions: who did what and when (e.g. role changes, removals, record edits).
_Avoid_: Activity feed, log

**Admin**:
A member who runs a school workspace: creates students and classes, assigns teachers, and manages all classes and teachers, but cannot remove or demote other admins.
_Avoid_: Manager, coordinator

**Senior teacher**:
A member who leads a team of teachers in a school workspace, on top of everything a teacher (role) can do. Sits between admin and teacher.
_Avoid_: Team lead, supervisor, head teacher

**Team**:
A group of teachers in a school workspace led by exactly one senior teacher. Admins create teams and move teachers between them; a teacher is in at most one team, and teachers in no team answer directly to admins. Teams never contain other teams. When a team's senior teacher is removed or demoted, the admin doing it either names a new one (often promoting a teacher from the team) or dissolves the team, whose teachers then answer directly to admins.
_Avoid_: Department, group (a group of students is a class)

**Teacher** (role):
A member who works only inside the classes they are assigned to (or the single lessons they substitute), and sees only those classes' current students. After a student or class leaves them, they keep only the lessons they taught.

**Class**:
A group of one or more students taught together. A private 1:1 student is a class with a single member.
_Avoid_: Group, course, 1:1 (as a separate concept)

**Class level**:
The CEFR level a class is taught at (e.g. B1), required on every class and set by whoever manages the class. It is the default for level filters (e.g. when attaching a plan) and never changes the students' own levels.
_Avoid_: Course level, group level, average level

**Class hours**:
The total number of teaching hours a class runs for (e.g. 60 h), required on every class; for a private 1:1 student it is the hours they bought, and renewing adds hours to it.
_Avoid_: Course hours, package, course (a class is never called a course)

**Class ending soon**:
The state of a class with 25% or less of its class hours left. Its assigned teachers are told at 25%, 12.5% and 2 hours left; admins see it until one of them resolves it, either by adding hours or by recording that it won't renew, with a reason (finishing, taking the exam, moving to another class, or other with a note). The timetable never creates lessons beyond the class hours.
_Avoid_: Expiring, running out

**Renewal recommendation**:
An assigned teacher's opinion, given when their class is ending soon, on whether it needs more hours (and why) or is ready to finish (e.g. ready for the exam, goal reached). Their senior teacher (or an admin, for a teacher in no team) can discuss it with them in replies until they agree. Admins see it when deciding to add hours or record that the class won't renew. Its reason is for staff only and never reaches the student.
_Avoid_: Renewal note, sales note

**Hours taught**:
The hours of a class's lessons that have taken place so far, worked out from those lessons (cancelled lessons don't count). **Hours left** is class hours minus hours taught.
_Avoid_: Hours used, hours consumed

**Student**:
A learner record owned by one workspace, belonging to one or more of that workspace's classes. The same person in two workspaces is two separate students, and students are never copied or moved between workspaces. A student is not a user and has no login.
_Avoid_: Learner, client, pupil

**Lesson**:
A single dated teaching session for exactly one class, held in person (with a location) or online (with a meeting link); the timetable gives the default and a single lesson can override it.
_Avoid_: Session, scheduled lesson, appointment

**Assigned teacher**:
A teacher responsible for a class; a class has one or more.
_Avoid_: Class owner, class teacher, instructor

**Substitute**:
A teacher who teaches a single lesson in place of an assigned teacher and has access to that lesson only.
_Avoid_: Cover teacher, replacement

**Substitute request**:
A teacher's request for a substitute for one of their lessons, optionally suggesting a teacher. Their senior teacher (or an admin, for a teacher in no team) approves the suggestion or chooses someone else.
_Avoid_: Cover request, absence request

**Lesson plan**:
A reusable teaching template kept in a workspace's library. Editing it never changes lessons that already used it.
_Avoid_: Template, lesson (a lesson is the dated session)

**Library**:
A workspace's collection of reusable teaching content: lesson plans, activities and materials.
_Avoid_: Bank, repository, resources

**Library copy**:
An independent copy of a library item (with the activities and materials it uses) made into another workspace's library; the copy belongs to the receiving workspace. Copies go from a personal library to a school library, either directly or by picking a personal lesson plan while attaching a plan to a school lesson; copying from a school library into a personal one is a later feature that schools may switch off. A copy remembers the item it came from, so picking the same personal plan again reuses the existing copy rather than making another.
_Avoid_: Share, import, export

**Topic tag**:
A free-form label on a library item describing its subject or theme (e.g. travel, Halloween), alongside its fixed level range, skills and optional exam.
_Avoid_: Category, keyword, label

**Stage**:
One ordered step of a lesson plan (e.g. warm-up, reading, speaking), which may reference activities and materials.
_Avoid_: Section, step, phase

**Activity**:
A reusable, described classroom task (e.g. "find someone who") kept in the library and referenced by stages.
_Avoid_: Exercise, game, task

**Material**:
A reusable file or link (e.g. a reading text, an audio clip) kept in the library and referenced by stages or activities.
_Avoid_: Resource, attachment, handout

**Plan copy**:
A lesson's own copy of a lesson plan, made when the plan is attached to that lesson and adjustable for that class alone. It remembers which lesson plan it came from.
_Avoid_: Version, instance

**Plan note**:
A note a senior teacher or admin leaves on a lesson's plan copy (or one of its stages) to guide the teacher. The teacher can reply and marks it resolved; only the lesson's teacher, their senior teacher and admins see it.
_Avoid_: Comment, coaching note, feedback

**Lesson report**:
The record of what happened in one lesson: what was covered, the homework set, general notes, and per-participant attendance, homework check and notes. Written by the teacher who taught the lesson; only that teacher and admins can edit it. It is either draft or done.
_Avoid_: Lesson log, summary, feedback

**Report note**:
A note a senior teacher or admin leaves on a lesson report to guide the teacher, working the same way as a plan note.
_Avoid_: Comment, feedback, participant note (that is the teacher's own observation about a participant)

**Overdue report**:
A lesson report that is not done (missing or still draft) 24 hours after its lesson ended. Shown to the teacher who taught the lesson, to their senior teacher, and to admins, who can send that teacher a reminder (at most once a day per report).
_Avoid_: Late report, missing report (missing is only one way to be overdue)

**Attendance**:
Whether a participant was present, late, absent (excused) or absent (unexcused) in a lesson that took place. A lesson called off in advance is a cancelled lesson, not an absence.
_Avoid_: Presence, check-in

**Homework**:
Work set once for a whole lesson, optionally with an extra note for an individual participant. Whether each participant completed it (done, partly done or not done) is recorded on the next lesson's report, for participants who were in the lesson where it was set.
_Avoid_: Assignment, task

**Follow-up**:
A personal reminder a member writes for themself (e.g. "writing feedback for Ali by Friday"), optionally linked to a lesson, lesson report, student or class, with an optional due date, and ticked off when done. Only its creator sees it; it lives in the workspace of what it is linked to (or their personal workspace if unlinked) and goes with their access when they leave that workspace.
_Avoid_: Task, to-do (the to-do list also shows items the app works out itself, like missing reports)

**Participant note**:
A teacher's observation about one participant in one lesson (e.g. "struggles with irregular verbs").
_Avoid_: Comment, feedback

**Portfolio**:
Everything recorded about one student: background, level history, goals, student notes, student files, assessments and their lesson history.
_Avoid_: Profile, record, file

**Background**:
A short, mostly free-text "about this student" section in the portfolio: age group, reason for learning, struggles and learning needs, interests. It never holds level or goal, which have their own records.
_Avoid_: Bio, profile, intake form

**Age group**:
Whether a student is a child, a teen or an adult. Recorded instead of an exact age or date of birth.
_Avoid_: Age, date of birth

**Archived**:
The state of a class, student or library item that is no longer active: hidden from active lists and the schedule, with all history kept and still searchable. It can be undone. Not the same as deletion.
_Avoid_: Inactive, closed, deleted

**Student deletion**:
The permanent, deliberate removal of a student and all their data within a workspace, done by an admin (e.g. for a right-to-be-forgotten request).
_Avoid_: Archiving, removal

**Student export**:
A downloadable copy of everything in one student's portfolio (data and student files), made by an admin (e.g. for a data-access request) and available for 7 days.
_Avoid_: Backup, download, report

**Workspace deletion**:
A super-admin's permanent removal of a school workspace and all its data. It can be undone for 30 days, after which everything is erased.
_Avoid_: Archiving, closing

**Account deletion**:
A user's permanent removal of their own Teach Flow account. Their personal workspace is erased; in school workspaces they become a former member and their work stays, credited to "Former member (deleted account)" instead of their name.
_Avoid_: Leaving a workspace (that only ends one membership)

**Student note**:
A dated note about a student that isn't tied to a lesson, credited to the member who wrote it.
_Avoid_: Comment (see also Participant note)

**Student file**:
A file kept in a student's portfolio (e.g. a writing sample or a certificate), with who uploaded it and when, optionally linked to an assessment.
_Avoid_: Attachment, document, material (materials belong to the library)

**Level**:
A student's overall CEFR level (A1, A2, A2+, B1, B1+, B2, B2+, C1, C2), set by a member allowed to set levels, and kept as a dated history of who set it. In a school workspace, super-admins and admins can set any student's level and senior teachers their team's students'; admins (and senior teachers, for their own team) can grant this to individual teachers.
_Avoid_: Grade, band, score

**Goal**:
What a student is working toward, described in the teacher's words, with an optional target CEFR level, target date and named exam. A student has one active goal at a time; earlier goals are kept as history. A class may also have a goal, which new members take as their starting goal.
_Avoid_: Objective, target, outcome

**Skill**:
An area of language ability from a fixed list: Reading, Writing, Listening, Speaking, Grammar, Vocabulary.
_Avoid_: Paper, component, area

**Assessment**:
A recorded test result for one student, either a quiz or an official exam. It may optionally be linked to the lesson it took place in.
_Avoid_: Test, exam result, grade

**Skill score**:
The score for one skill tested in an assessment (e.g. Writing 26/40). An assessment holds one or more skill scores.
_Avoid_: Mark, sub-score

**Cancelled lesson**:
A lesson that did not take place. It stays on record with a reason and who cancelled it (student, teacher or school). A moved lesson is the same lesson with a new date, not a cancellation.
_Avoid_: Deleted lesson, no-show

**My week**:
A teacher's personal view of every lesson they teach across all their workspaces, showing only lesson basics (time, class, workspace, place), colour-coded by workspace, with clashes highlighted and upcoming lessons that have no plan marked "No plan". Opening a lesson there shows a lesson card with its details and quick actions (the main button, Move, Cancel lesson or Restore lesson).
_Avoid_: Combined calendar, agenda

**Workspace colour**:
The colour a teacher gives one of their workspaces, picked from 8 fixed colour families (slate-blue, olive, plum, ochre-brown, rose, sky, violet, moss), used to tell their workspaces apart in My week and the workspace switcher. It belongs to the teacher, not the workspace: two teachers can see the same school in different colours. It is the same family in every appearance. Each new workspace gets the next colour the teacher isn't using yet, and the teacher can change it.
_Avoid_: School colour, brand colour, theme

**Appearance**:
A user's own choice of how the app looks: Notebook, Studio or Ledger. It belongs to the user, applies in every workspace they belong to, and nobody else can set it. New users start on Notebook.
_Avoid_: Theme, skin, style

**Notebook / Studio / Ledger**:
The three appearances. Notebook is warm and paper-like, Studio is bright and friendly, Ledger is crisp and compact. They change only how the app looks, never what it shows or what a workspace colour is.
_Avoid_: Direction A / B / C (the prototype names)

**Clash**:
Two of a teacher's lessons that overlap in time, or two in-person lessons at different places less than 30 minutes apart. Flagged in My week across all the teacher's workspaces.
_Avoid_: Conflict, double-booking

**Availability**:
Whether a teacher is free at a given time across all their workspaces, judged by the same rule as a clash (including the 30-minute gap between in-person lessons at different places) and, for a new or changed timetable, over the class's whole expected run. A workspace sees only "free" or "busy" for times outside its own lessons, never why, and cannot give a teacher a lesson at a busy time.
_Avoid_: Free/busy, schedule

**Timetable**:
A class's repeating weekly pattern of lesson times (e.g. Mon & Wed 18:00–19:30), from which lessons are created a few weeks ahead. A timetable change takes effect from a chosen date and moves the future lessons, keeping their plan copies; a class keeps a history of its timetables. Admins, and senior teachers allowed to manage the class, change it directly and the assigned teachers are told; an assigned teacher proposes changes through a timetable change request.
_Avoid_: Schedule, recurrence, calendar

**Timetable change request**:
An assigned teacher's proposal of a new timetable for their class from a chosen date. A senior teacher allowed to manage the team's classes, or otherwise an admin, approves or declines it.
_Avoid_: Reschedule request, timetable proposal

**Participant**:
A student recorded on a specific lesson. Until the lesson takes place, participants follow the class's current members; once it takes place, they are locked and stay fixed even when the class's membership later changes. A guest may be added to a single lesson.
_Avoid_: Attendee (attendance is a separate fact about a participant)
