# Workspace isolation is enforced by the database, not only by application code

Every tenant row carries a `workspace_id`, and three independent locks keep one workspace's data away from another:

1. **Application code**: every query filters on the request's workspace.
2. **Postgres row-level security**: each request runs in a transaction that sets `app.workspace_id` (`SET LOCAL`), and every tenant table has a policy that only shows rows of that workspace. The application connects as a database role that cannot bypass RLS; only migrations use an admin role.
3. **Composite foreign keys**: references include the workspace (e.g. `lesson(workspace_id, class_id) → class(workspace_id, id)`), so a row can never point at another workspace's row.

This is deliberate redundancy. The cost is a transaction per request and a policy per table, and the benefit is that one forgotten `WHERE` returns nothing instead of leaking students (ADR 0001).

## Considered Options

- **Application filtering only (middleware + services)**: simpler, but a single missed filter in any query, report or job leaks personal data between schools.
- **A database or schema per workspace**: the strongest isolation, but migrations and connections multiply with every school, and personal workspaces make the count large.

## Consequences

- **My week**, the one view that crosses workspaces, reads through a single narrow, read-only database function that returns only lesson basics for lessons the user teaches. No other code path may read across workspaces, except availability (busy or free only; see ADR 0006), and Home and the personal-library picker (the user's own data only; see ADR 0008).
- Background jobs set `app.workspace_id` the same way as requests.
- A request for a record in another workspace answers 404 (never 403), so its existence isn't revealed.
- An automated tenant-isolation test must pass for every endpoint.
