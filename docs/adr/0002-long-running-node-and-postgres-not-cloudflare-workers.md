# Run on a long-running Node server with managed Postgres, not Cloudflare Workers

Teach Flow's backend is a long-running Node.js process (Hono) plus a separate worker process from the same code, both deployed as one Docker image to Render in the EU (Frankfurt), with Render's managed Postgres. This breaks from the stack of the sister project LearnFlow (Cloudflare Workers, D1, Pages). Workspace isolation is the platform's most important security rule, and only Postgres lets the database itself enforce it (row-level security, see ADR 0003). Phase 2's AI agents run for minutes inside background jobs, which fits a normal worker process and not Workers' CPU limits.

## Considered Options

- **Cloudflare Workers + D1 (LearnFlow's setup)**: near-free at idle and already familiar, but D1 is SQLite (no row-level security), background work is limited to Cloudflare Queues with short CPU limits, KV caching is eventually consistent, and the lock-in is high.
- **Fly.io / Railway / Neon + another host**: all viable for the same Docker image. Render was chosen because it puts the API, the worker and Postgres (with point-in-time restore) in one dashboard, with the least ops work.

## Consequences

- There's a monthly cost even at zero users (roughly $20).
- The API is its own app (`apps/api`), separate from Nuxt's built-in server, so the worker and future clients (the Phase 3 student portal) share one backend core.
- Moving host is cheap because everything is a plain container and plain Postgres.
- Student data stays in the EU, which answers the first question schools ask.
