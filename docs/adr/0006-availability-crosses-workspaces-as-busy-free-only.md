# Availability crosses workspaces as busy/free only

Amends the Consequences of ADR 0003, which allowed My week as the only read across workspaces. When a school assigns a teacher, picks a substitute or changes a timetable, it must not create a clash with that teacher's lessons in their other workspaces (another school, their personal workspace). So a second narrow, read-only path crosses workspaces: **availability**. Given a teacher and a set of time slots, it returns only busy or free for each slot. It does not return why a slot is busy, which workspace caused it, or where the lesson is. The 30-minute travel gap between in-person lessons at different places is worked out inside that path, and places never leave it. This keeps a teacher's work elsewhere private while guaranteeing no clashes.

## Considered Options

- **Check only the school's own lessons**: keeps ADR 0003 untouched, but schools would book teachers into clashes they only discover later in My week.
- **Show clashes with details (workspace, class, time)**: easiest for admins, but tells a school where else its teachers work.
- **Check everywhere but only warn**: still needs the cross-workspace read, and lets clashes through anyway.

## Consequences

- Availability covers each slot of a new or changed timetable over the class's whole expected run (class hours ÷ weekly hours), not just lessons already created.
- A teacher who is busy for some lessons can still be chosen; those lessons start without a teacher and go through the substitute flow.
- Like My week, the path must have its own tenant-isolation test proving that nothing but busy or free comes out.
