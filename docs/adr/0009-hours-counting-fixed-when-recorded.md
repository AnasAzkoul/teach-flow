# Hours counting is fixed when a lesson is recorded

How a cancellation or an ended-early lesson counts (free, uses the allowance, charged, full lesson, time taught) is decided by the Workspace rules in force when it is recorded, and stored with the lesson. It is not recalculated from the current rules. A rule change applies only from then on; a past lesson is recounted only when its own record is edited (e.g. who cancelled, or the end time). We chose this because hours used are what a student paid for and, later, what teachers are paid on. Those figures must not shift when a super-admin changes a rule, even though recalculating from the current rules would be simpler.

## Consequences

- Each counted lesson stores the outcome it got (for example, "late, 1 h from the allowance"), not just the inputs.
- Lowering the allowance never takes back allowance already used.
- Teacher paid hours (billing phase) will follow the same rule, so a past month's pay never changes.
