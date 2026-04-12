# PMS BA Knowledge (Sample)

## Product Scope
- Product: PMS (Project Management System) for internal teams.
- Core modules: Project, Task, Approval, User/Role.
- Main goals: track progress, assign ownership, improve approval turnaround.

## Business Terms
- Project: a top-level work container with owner, timeline, and status.
- Task: actionable item within a project, can be assigned and tracked.
- Approval: decision workflow for submitted items (approve/reject/request change).
- Approver: user who has authority to decide on approval requests.

## Typical Status Values
- Project: Draft, Active, On Hold, Completed, Cancelled.
- Task: Todo, In Progress, Blocked, Done.
- Approval: Pending, Approved, Rejected, Returned.

## Common Rules
- Only project owner or admin can archive/cancel a project.
- Completed tasks are read-only except for admin correction.
- Rejection in approval flow must include a reason.
- Returned approvals must include change request notes.

## API and UI Assumptions
- FE stack: React + TypeScript.
- API style: REST JSON.
- Date/time standard: store UTC, display local timezone.

## Writing/Analysis Conventions
- Use consistent terms: "Project", "Task", "Approval" (no mixed synonyms).
- Prefer Vietnamese labels for end-user UI text.
- For specs: include happy path + validation + error cases.

## Usage Notes For Agent
- Use this file when user asks about BA docs, UI spec, user stories, or process rules in PMS.
- If user request conflicts with this file, follow explicit user request and call out the conflict.
