# Better Auth handles identity only; the workspace model is Teach Flow's own code

Better Auth runs inside the API and stores users, sessions and login accounts in Teach Flow's own Postgres (EU). It answers one question: "who is this user?". Workspaces, Members, Invites, Teams and permission grants are ordinary Teach Flow tables and services in `packages/core`, under the same RLS as everything else (ADR 0003). The domain rules there (a workspace always keeps at least one Super-admin, invites last 7 days, Former members keep credit for their work, "can set levels" grants) don't fit a generic organisation plugin, and they need to be plain, testable services.

Phase 1 sign-in: email + password (with email verification) and Google. Sessions are database-backed HTTP-only cookies, so they can be revoked (e.g. when a member is removed).

## Considered Options

- **Better Auth's organization plugin**: less code at the start, but its members, roles and invites would have to be bent to fit Teach Flow's four roles, Teams and grants, and its tables would sit outside the workspace isolation design.
- **WorkOS AuthKit (hosted)**: free up to 1M monthly active users, with polished enterprise single sign-on and directory sync. Rejected for Phase 1 because user identities would be stored by WorkOS and transferred to the US (no EU region found), it adds a vendor dependency, and school single sign-on costs about $125 per connection per month. Worth revisiting if school chains demand their own single sign-on or directory sync.

## Consequences

- Auth is reached only through the request `ctx` middleware, so swapping the provider later touches only that layer.
- Planned later sign-in options, all available as Better Auth plugins: authenticator-app two-factor (TOTP), passkeys, magic link / email code, Microsoft and Apple login, and school single sign-on.
