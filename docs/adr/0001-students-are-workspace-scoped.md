# Students are workspace-scoped and never cross workspaces

A student is a record owned by exactly one workspace, not a platform-wide identity or a user account. The same person taught in a school workspace and in a teacher's personal workspace is two unrelated students, and students are never moved, copied or merged between workspaces, either automatically or manually. Student data is personal data (sometimes special-category, e.g. learning needs), and schools must be able to trust that it never leaves their workspace; keeping every student query inside one workspace also upholds the platform's most important security rule, strict workspace isolation.

## Considered Options

- **One shared student identity linked across workspaces**: convenient for a teacher who sees the same person at a school and privately, but every portfolio read would cross workspace boundaries and expose one tenant's data to another.
- **Manual copy of basic details (name, level, goal)**: saves a teacher ~30 seconds of typing, but still lets school personal data leave the school without the school's consent, which is exactly what schools will ask about when evaluating the product. May return later as a school-controlled setting, off by default.

## Consequences

- Duplicate-looking students across workspaces are expected and must not be "deduplicated".
- Library content may be copied between workspaces (see Library copy in `GLOSSARY.md`); students may not.
- Student deletion and export operate within a single workspace.
