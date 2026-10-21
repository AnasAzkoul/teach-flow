# Home and the personal-library picker read across workspaces, own data only

Amends the Consequences of ADR 0003 (already amended by ADR 0006). The Phase 1 screen designs put Home in the "You" zone of the sidebar: Today, To do and Coming up cover every workspace the user teaches in, so a teacher with two schools and private students sees one day, not three. And while attaching a plan to a school lesson, a teacher can pick from their own personal library. Both need to read outside the current workspace, so two more narrow, read-only paths cross workspaces, and each returns only the signed-in user's own data:

1. **Home**: the user's own lessons (the ones they teach as assigned teacher or substitute) with lesson basics plus plan status (attached or not) and report status (missing, draft, overdue or done); the class-hours to-do steps for classes they are an assigned teacher of (class name, hours left); and the user's own follow-ups. No student details, participants, notes, report contents or plan contents leave their workspace.
2. **Personal-library picker**: inside a school lesson, the user's own personal library, read only while the Attach plan picker is open. The school receives nothing unless a plan is picked, and then only that plan as a library copy (with the activities and materials it uses), made through the normal library copy flow after the user confirms.

## Considered Options

- **Home follows the current workspace**: keeps ADR 0003 untouched, but a teacher must switch workspace to see their 18:00 private lesson, and the to-do list splits by workspace. That breaks the main reason to have Home.
- **Widen the My week function to return everything Home shows**: one path instead of two, but My week and Home would grow together and the function would no longer be "lesson basics only".
- **Personal library opened by switching to the personal workspace**: no cross read, but the teacher loses the school lesson they were planning and has to come back to it.

## Consequences

- ADR 0003's rule becomes: only My week, availability (ADR 0006), Home and the personal-library picker read across workspaces, each through its own narrow, read-only database function scoped to the signed-in user.
- Team and school blocks on Home (Needs a substitute, Reports overdue, Classes ending soon and so on) are not cross-workspace reads: each block is loaded separately inside its own workspace, with `app.workspace_id` set as for any request.
- Opening anything from Home (a lesson, a follow-up's linked record) goes through the normal per-workspace request, and the page decides the workspace.
- Each new path must have its own tenant-isolation test proving that only the user's own data, in the fields listed above, comes out.
