# Membership lookup, the switcher and invites read across workspaces, own data only

Amends the Consequences of ADR 0003 (already amended by ADR 0006 and ADR 0008). Some requests have to read outside one workspace before any workspace is set. A link to `/w/bright-school/…` must be turned into the user's own membership before `app.workspace_id` can be set. The workspace switcher lists every workspace the user belongs to. And the switcher, like an invite link, shows invites to schools the user isn't a member of yet. So three more narrow, read-only paths cross workspaces, and each returns only the signed-in user's own data:

1. **Membership lookup**: given a workspace slug or ID, the user's own active membership there (workspace id, kind, role, team, grants), or nothing. Nothing is answered as 404, so it never reveals whether the workspace exists. The request then sets `app.workspace_id` and continues as normal.
2. **Switcher list**: the user's own active memberships, with workspace id, name, slug, kind, the user's role and the user's own workspace colour. Nothing about other members, classes or students.
3. **Invites for me**: pending, unexpired invites addressed to the user's verified email, with workspace name, role, who invited them and the expiry. Also, an invite looked up by its token from the invite link (the same fields, plus whether it still works). An invite can only be accepted when the user's verified email matches it.

## Considered Options

- **Membership tables outside RLS**: simplest, but the member and invite tables would then hold one more way to list another school's staff, and every query on them would rely on application filters alone.
- **An RLS policy that also shows rows where the user matches**: no extra functions, but every query on these tables, not just these three, would quietly see rows from other workspaces, so a forgotten filter would leak.
- **Put the workspace in the session**: the server would remember a "current workspace". That breaks "the page decides the workspace" and still needs the lookup when the user switches.

## Consequences

- ADR 0003's rule becomes: only My week, availability (ADR 0006), Home and the personal-library picker (ADR 0008), and the membership lookup, switcher list and invites for me (this ADR) read across workspaces, each through its own narrow, read-only database function scoped to the signed-in user.
- Accepting or declining an invite is a write, not a read: once the invite is found, the change runs inside the invite's workspace, with `app.workspace_id` set as for any request.
- An invite token is stored hashed; the lookup takes the token and returns only the fields above.
- Each path must have its own tenant-isolation test proving that only the user's own data, in the fields listed above, comes out, and that a slug for a workspace the user doesn't belong to looks the same as one that doesn't exist.
