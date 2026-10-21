# Fixed roles and teams; custom roles later as presets over the permission matrix

Schools are structured differently (owner, director, senior teachers with 3–5 teachers each, or none of that), and the software should fit the school rather than the reverse. In Phase 1 we use four fixed roles on a strict ladder (super-admin, admin, senior teacher, teacher), with optional **teams** led by a senior teacher and two grants (Can set levels, Can manage classes). Schools fit their structure by making teams, not by designing permissions. Permissions are defined as the rows of one permission matrix (see `docs/decisions/levels-of-access.md`), each row scoped to own, team or all. That lets school-defined custom roles arrive later as named copies of a fixed role, with rows switched on or off, without reworking the model.

## Considered Options

- **Custom roles from the start**: the most flexible, but every school has to design permissions before using the product, and every screen has to handle any combination.
- **Senior teacher as a "leads a team" grant on teacher**: fewer roles, but the role column would hide who looks after whom.

## Consequences

- Custom roles can go up to admin level, never further; super-admin-only rows (billing, deleting the workspace, appointing super-admins) can't be customised.
- A later **sales** role sits beside the ladder rather than on it. It sees renewal information but not teaching records, and is the one exception to "each role includes the ones below".
