# Issue tracker: Linear

Issues and specs for this repo live in Linear: team **ANA**, project **Teach Flow** (`P-ANA-4`, https://linear.app/anasazkoul/project/teach-flow-9a1feb2f36ed). Use the Linear MCP tools (`list_issues`, `get_issue`, `save_issue`, `save_comment`, …) for all operations. Never use `gh` or `.scratch/` for this repo.

## Conventions

- **Create an issue**: `save_issue` with `team: "ANA"`, `project: "Teach Flow"`, a title, and a markdown description (real newlines, no escaped `\n`).
- **Read an issue**: `get_issue` by identifier (e.g. `ANA-42`), plus `list_comments` for the thread.
- **List issues**: `list_issues` with `team: "ANA"`, `project: "Teach Flow"`, and `label` / `state` filters as needed.
- **Comment**: `save_comment` on the issue.
- **Apply / remove labels**: `save_issue` with the updated `labels` list. If a triage label doesn't exist yet, create it on the ANA team with `create_issue_label` before applying it.
- **Close**: comment with the reason first, then `save_issue` with state `Done` (or `Canceled` for wontfix).

## When a skill says "publish to the issue tracker"

Create a Linear issue in team ANA, project Teach Flow.

## When a skill says "fetch the relevant ticket"

`get_issue` with the identifier the user gives (e.g. `ANA-42`), then `list_comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single issue with **child** issues as tickets.

- **Map**: an issue labelled `wayfinder:map` holding the Notes / Decisions-so-far / Fog body.
- **Child ticket**: a Linear sub-issue of the map (`parentId` = map), labelled `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`).
- **Blocking**: Linear's native "blocked by" relation. A ticket is unblocked when every blocker is Done/Canceled.
- **Frontier**: the map's open sub-issues with no open blocker and no assignee; first in sub-issue order wins.
- **Claim**: assign the issue to `me`, the session's first write.
- **Resolve**: comment the answer, set state Done, then append a context pointer (gist + link) to the map's Decisions-so-far.
