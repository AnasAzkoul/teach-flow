# Background jobs run on pg-boss, a queue stored in Postgres

Background work (invite and reminder emails, generating timetabled lessons ahead, Class ending soon checks, overdue report detection, GDPR exports, and Phase 2's AI agents) runs through pg-boss in a separate worker process (`apps/worker`), with Postgres as the queue. A job is enqueued inside the same transaction as the data change that caused it, so a change and its follow-up work either both happen or neither does (no "invite saved but email never sent").

## Considered Options

- **BullMQ + Redis**: much higher throughput and a popular choice, but it needs an extra Redis service and can't enqueue atomically with a Postgres write. Teach Flow's expected load (roughly one job per minute) is far below what pg-boss handles.
- **Hosted workflow services (Inngest, Trigger.dev)**: good dashboards and durable steps, but they add a third-party dependency that would see workspace data, and they can't enqueue in the same transaction either.

## Consequences

- Every job must be idempotent (safe to run twice).
- Retries use backoff, and jobs that keep failing go to a failed-job queue with an alert.
- The worker builds the same request `ctx` and sets `app.workspace_id` before running a service, so jobs obey RLS and the policy rules (ADR 0003).
- If throughput ever outgrows Postgres, the queue sits behind a small interface and can move to BullMQ.
