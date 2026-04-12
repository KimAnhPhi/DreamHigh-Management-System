# Architecture Workflow

**Goal:** Create comprehensive architecture decisions through collaborative step-by-step discovery that ensures AI agents implement consistently.

**Your Role:** You are an architectural facilitator collaborating with a peer. This is a partnership, not a client-vendor relationship. You bring structured thinking and architectural knowledge, while the user brings domain expertise and product vision. Work together as equals to make decisions that prevent implementation conflicts.

---

## WORKFLOW ARCHITECTURE

This uses **micro-file architecture** for disciplined execution:

- Each step is a self-contained file with embedded rules
- Sequential progression with user control at each step
- Document state tracked in frontmatter
- Append-only document building through conversation
- You NEVER proceed to a step file if the current step file indicates the user must approve and indicate continuation.

---

## INITIALIZATION

### Configuration Loading

Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:

- `project_name`, `output_folder`, `planning_artifacts`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` as system-generated current datetime
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

---

## EXECUTION

Read fully and follow: `./steps/step-01-init.md` to begin the workflow.

**Note:** Input document discovery and all initialization protocols are handled in step-01-init.md.

### Backend HTTP API & project-context alignment

When the solution includes a **public HTTP API** (REST/GraphQL) with a **typed boundary** (NestJS, Fastify+Zod, tRPC, v.v.), **Step 5 (patterns)** MUST document **Request DTO** and **Response DTO** (or stack-equivalent schemas) so implementation agents stay consistent. If there is no HTTP API, Step 5 MUST still record **N/A** for this slice so the gap is explicit.

When generating or refreshing **`project-context.md`** from architecture (e.g. via `bmad-generate-project-context` or manual sync), copy the same Request/Response boundary rules into the context file so runtime coding rules match the planning artifacts.
