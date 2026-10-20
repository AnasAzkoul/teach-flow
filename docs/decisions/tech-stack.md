# Phase 1 tech stack: decisions

Outcome of the tech-stack and architecture grilling session (19–20 Oct 2026). Terms follow `GLOSSARY.md`. Who may do what per role is decided by the levels-of-access session; this file only covers how it is implemented. The hard-to-reverse choices have their own ADRs:

- ADR 0002: long-running Node + Postgres on Render (EU), not Cloudflare Workers
- ADR 0003: workspace isolation enforced by app filter + Postgres RLS + composite foreign keys
- ADR 0004: Better Auth for identity only; the workspace model is our own code
- ADR 0005: pg-boss job queue in Postgres

Assumptions agreed: the UI is English-only in Phase 1; Phase 2 AI agents run as worker jobs, with details decided in Phase 2.

## Hosting and repo

- **Hosting**: Render, Frankfurt (EU). One Docker image runs as three services: `web` (Nuxt), `api` (Hono, private) and `worker` (jobs), plus Render managed Postgres with backups and point-in-time restore. Moving host later is cheap (plain container, plain Postgres).
- **Repo**: pnpm workspaces monorepo, TypeScript strict everywhere. Turborepo only if builds get slow.

```
apps/web        Nuxt
apps/api        Hono (HTTP entry)
apps/worker     pg-boss job runner
packages/core       services, policy, data access, Drizzle schema (used by api + worker)
packages/contracts  Zod schemas + shared types (used by api + web)
```

## Testing

- Vitest. Mostly integration tests (route → service → real Postgres in Docker or a CI service container), with no DB mocks.
- **Tenant-isolation suite**: for every endpoint, a member of workspace A asking for workspace B's data gets 404.
- Unit tests for pure logic (hours left, clash detection, policy rules as a role × action table). TDD for services and policy.
- Playwright for 5–10 critical flows (e.g. login → attach plan → write report).

## Backend

- **API style**: REST + OpenAPI via `@hono/zod-openapi`. Zod schemas in `contracts` give validation, types and generated docs (`/docs`) from one source. Nuxt calls the API through Hono's typed `hc` client.
- **Errors**: RFC 9457 problem details (`type`, `title`, `status`, field `errors`). 401 = not logged in; 403 = visible but not allowed; 404 = not found **or in another workspace** (existence is never revealed). Known `DomainError`s map to these; anything else is a 500 with a reference ID.
- **Layers**: route (thin: parse, call, shape) → service (business rules + policy checks, the only place rules live) → data access (Drizzle). A `ctx` `{ user, workspaceId, membership }` is built per request by middleware, and the same way per job by the worker.
- **ORM**: Drizzle + drizzle-kit migrations.
- **Workspace isolation** (ADR 0003): `workspace_id` on every tenant row; each request runs in a transaction with `SET LOCAL app.workspace_id`; RLS policy per table; the app's DB role cannot bypass RLS (migrations use an admin role); composite foreign keys include the workspace. **My week** reads through one narrow, read-only DB function returning only lesson basics.
- **Workspace in requests**: URL path `/api/workspaces/:workspaceId/…`. Cross-workspace routes live under `/api/me/…` (week, home, invites, workspaces). The web uses `/w/:slug/…`.
- **Auth** (ADR 0004): Better Auth for users, sessions, verification and password reset only. Phase 1 sign-in: email + password (with verification) and Google. DB-backed HTTP-only cookie sessions (revocable). Workspace, Member, Invite, Team and grants are our own tables under RLS. Later: authenticator-app two-factor (TOTP), passkeys, magic link / email code, Microsoft and Apple, school single sign-on. WorkOS was considered and rejected for now (US data storage, per-school single sign-on fees); revisit if schools demand single sign-on.
- **Authorisation**: a hand-written `policy` module in `core` (`policy.lessonReport.canEdit(ctx, report)`) plus scope helpers (`scope.visibleClasses(ctx)`) used inside queries. The role ladder is Super-admin > Admin > Senior teacher > Teacher; scopes cover team, assigned classes and single lessons as Substitute. Extra grants (e.g. can set levels) live in a `member_grant` table. Records return `allowedActions` so the UI never re-implements rules.
- **Audit history**: explicit `audit.record(ctx, action, details)` in the same transaction as the change; an append-only `audit_event` table (app role: INSERT + SELECT only) under RLS; a fixed list of audited actions; IDs only (no personal data) for Student deletion entries. Tests check that sensitive actions write an event.
- **Files** (Materials, Student files): Cloudflare R2, EU-jurisdiction private bucket. Uploads and downloads use short-lived presigned URLs after a policy check. Keys are prefixed `workspaces/{workspaceId}/…`, with metadata rows in Postgres. Limits: 25 MB and a file-type allow-list. All of this sits behind an S3-compatible `storage` interface.
- **Jobs** (ADR 0005): pg-boss in `apps/worker`. Jobs are enqueued in the same transaction as the data change. Every job is idempotent. Retries use backoff (≈1m, 5m, 30m…), then go to a failed-job queue with an alert. Cron jobs: class-hours checks, overdue reports, nightly timetable lesson generation.
- **Caching**: browser (TanStack Query), HTTP (ETag, `Cache-Control: private`), CDN for static assets, and Postgres indexes (`workspace_id` first). No server cache in Phase 1; Redis (Render Key Value) only for a measured slow query, behind a `cache` interface, with keys prefixed by workspace. Membership and permissions are never cached.
- **Search**: Postgres full-text search + `pg_trgm` (typo tolerance) with GIN indexes, in the same query as the filters and under RLS. pgvector later for AI similarity.
- **Email**: Resend behind a `mailer` interface; Vue Email templates; sent only from worker jobs; Mailpit locally; SPF/DKIM/DMARC. Student details never appear in email bodies. Resend's EU region is to be verified at setup.
- **GDPR**:
  - Student export: a job builds a ZIP (portfolio JSON + student files) in R2; the link is valid for 7 days, then the ZIP is deleted.
  - Student deletion: one cascading transaction + a job deleting R2 files + an IDs-only audit event; lessons stay, minus that participant.
  - Workspace deletion: 30-day undo window, then a job erases everything including the R2 prefix.
  - Account deletion: the Personal workspace is erased; the user's school work stays, credited to "Former member (deleted account)".
  - Backups keep deleted data for the point-in-time-restore window (stated in the privacy policy).
- **Security baseline**: single origin (Nuxt proxies `/api/*` to the private Hono service, so no CORS); cookies HttpOnly + Secure + SameSite=Lax; Better Auth origin check; changes only via POST/PATCH/DELETE; rate limits on login, invite, password reset and upload; `secureHeaders()` + a strict CSP; Zod on every route with unknown fields rejected; UUIDv7 IDs; Renovate + `pnpm audit`.
- **Time**: a timetable is stored as local wall time + an IANA time zone (workspace default, overridable per timetable); lessons are stored as UTC instants (`timestamptz`); display uses the viewer's time zone (profile, default browser). My week and Clash checks compare instants.

## Frontend

- **Framework**: Nuxt 4. Marketing pages are prerendered; the app (`/w/**`, `/me/**`) is client-only (`ssr: false`); Nitro proxies `/api/**`.
- **UI**: shadcn-vue (Reka UI, components owned in `components/ui/`) + Tailwind v4; domain components in `components/domain/`; design tokens include the 8 workspace colours. Lucide icons, date-fns + date-fns-tz, Unovis for later charts. My week is a custom CSS grid, not a calendar library.
- **Server data**: TanStack Query (Vue Query) with the `hc` client. Query keys always start with the workspace ID (`['ws', wsId, …]`); mutations invalidate keys; optimistic updates for small ticks.
- **Client state**: the current workspace comes from the URL, never stored. Composables for UI state; Pinia only if a real shared need appears.
- **Forms**: VeeValidate + Zod schemas from `contracts`; API 422 errors are mapped onto fields. Lesson report drafts autosave to the API (with a local backup).
- **Permissions in the UI**: `auth` middleware (no session → `/login?next=…`); `workspace` middleware loads `/me` for the slug (membership + capabilities; not a member → "Not found"); `useWorkspace()` gives id, role, colour and `can()`. Disallowed actions are hidden. The API always re-checks. The switcher lists `/api/me/workspaces` + pending invites, and switching is just navigation.

## Cross-cutting

- **Logging**: pino JSON with `requestId`, `workspaceId`, `memberId`, route, duration and status. Never personal data (student names, notes, emails, report text). `X-Request-Id` is returned on every response.
- **Errors and monitoring**: Sentry (EU data region) for API, worker and web, with personal data scrubbed; `/healthz` + `/readyz`; external uptime ping; alert when the failed-job queue is non-empty. OpenTelemetry later if needed.
- **CI**: GitHub Actions: lint (ESLint + Prettier), typecheck, unit + integration tests, the tenant-isolation suite and Playwright E2E. A Render preview environment per pull request with seeded fake data. Merge to main → migrations as a pre-deploy step (admin role) → deploy.
- **Environments**: local (`docker compose`: Postgres, Mailpit, MinIO standing in for R2; seed script), preview per pull request, production. No staging in Phase 1. Real student data never leaves production.
- **Secrets**: `.env` (git-ignored) + committed `.env.example`; Render environment groups; GitHub Actions secrets; env vars validated with Zod at startup (the app refuses to start if one is missing or invalid).
- **Migrations**: expand → migrate → contract, so a deploy never breaks the running version.
