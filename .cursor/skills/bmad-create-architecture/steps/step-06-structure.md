# Step 6: Project Structure & Boundaries

## MANDATORY EXECUTION RULES (READ FIRST):

- 🛑 NEVER generate content without user input

- 📖 CRITICAL: ALWAYS read the complete step file before taking any action - partial understanding leads to incomplete decisions
- 🔄 CRITICAL: When loading next step with 'C', ensure the entire file is read and understood before proceeding
- ✅ ALWAYS treat this as collaborative discovery between architectural peers
- 📋 YOU ARE A FACILITATOR, not a content generator
- 💬 FOCUS on defining complete project structure and clear boundaries
- 🗺️ MAP requirements/epics to architectural components
- ⚠️ ABSOLUTELY NO TIME ESTIMATES - AI development speed has fundamentally changed
- ✅ YOU MUST ALWAYS SPEAK OUTPUT In your Agent communication style with the config `{communication_language}`

## EXECUTION PROTOCOLS:

- 🎯 Show your analysis before taking any action
- 🗺️ Create complete project tree, not generic placeholders
- ⚠️ Present A/P/C menu after generating project structure
- 💾 ONLY save when user chooses C (Continue)
- 📖 Update frontmatter `stepsCompleted: [1, 2, 3, 4, 5, 6]` before loading next step
- 🚫 FORBIDDEN to load next step until C is selected

## COLLABORATION MENUS (A/P/C):

This step will generate content and present choices:

- **A (Advanced Elicitation)**: Use discovery protocols to explore innovative project organization approaches
- **P (Party Mode)**: Bring multiple perspectives to evaluate project structure trade-offs
- **C (Continue)**: Save the project structure and proceed to validation

## PROTOCOL INTEGRATION:

- When 'A' selected: Invoke the `bmad-advanced-elicitation` skill
- When 'P' selected: Invoke the `bmad-party-mode` skill
- PROTOCOLS always return to display this step's A/P/C menu after the A or P have completed
- User accepts/rejects protocol changes before proceeding

## CONTEXT BOUNDARIES:

- All previous architectural decisions are complete
- Implementation patterns and consistency rules are defined
- Focus on physical project structure and component boundaries
- Map requirements to specific files and directories

## YOUR TASK:

Define the complete project structure and architectural boundaries based on all decisions made, creating a concrete implementation guide for AI agents.

**HTTP API / NestJS (and similar):** Per-domain module trees MUST reflect `dto/` (or stack-equivalent) for **Request + Response** boundary types, consistent with Step 5 — not input-only.

## PROJECT STRUCTURE SEQUENCE:

### 1. Analyze Requirements Mapping

Map project requirements to architectural components:

**From Epics (if available):**
"Epic: {{epic_name}} → Lives in {{module/directory/service}}"

- User stories within the epic
- Cross-epic dependencies
- Shared components needed

**From FR Categories (if no epics):**
"FR Category: {{fr_category_name}} → Lives in {{module/directory/service}}"

- Related functional requirements
- Shared functionality across categories
- Integration points between categories

### 1.5 Backend Module Classification (MANDATORY)

Before generating BE tree, classify each module with these questions:

| # | Question | If YES -> Add |
|---|----------|---------------|
| Q1 | Module has **status field** and business transition rules? | `state-machine/` |
| Q2 | Important events in this module require **other modules to react**? | `events/` |
| Q3 | Module calls **external APIs** (QBO, SSO, email gateway, etc.)? | `src/integrations/<vendor>/` |

**BASE anatomy (all modules):**
```
<module>/
├── dto/
├── routes/
├── controllers/
├── services/
├── repositories/
└── <module>.module.ts
```

**DTO naming convention (recommended default):**
- Request body DTO: `create-<entity>.request.dto.ts`, `update-<entity>.request.dto.ts`
- Query DTO: `get-<entity>.query.dto.ts`, `search-<entity>.query.dto.ts`
- Response DTO: `<entity>.response.dto.ts`, `<entity>-list.response.dto.ts`
- Keep Request/Query/Response contracts in the same module `dto/` folder; split into `dto/requests`, `dto/queries`, `dto/responses` when module becomes large.

**Concrete module example (NestJS):**
```
billing/
├── dto/
│   ├── create-invoice.request.dto.ts
│   ├── get-invoices.query.dto.ts
│   ├── invoice.response.dto.ts
│   └── invoices-list.response.dto.ts
├── billing.controller.ts
├── billing.service.ts
├── billing.repository.ts
└── billing.module.ts
```

**Layer mapping note (MANDATORY for backend outputs):**
- In structure narrative, explicitly map:
  - `Route` -> declared in `*.controller.ts` decorators
  - `Controller` -> HTTP entry/boundary only
  - `DTO` -> Request/Response contracts at HTTP boundary (`dto/` or stack-equivalent schema location)
  - `Service` -> business logic and orchestration
  - `Repository` -> data access / ORM queries
  - `Database` -> ORM service + schema/migrations
- If current project has no separate repository files yet, structure output must say "repository role currently inside service (legacy)" and include phased extraction plan.

**When Q1 = YES (stateful domain):**
```
├── state-machine/
│   ├── <module>.state-machine.ts
│   └── <module>.transitions.ts
```

**When Q2 = YES (cross-module reactions):**
```
├── events/
│   ├── <domain>-<past-tense-verb>.event.ts
│   └── ...
```

Event naming examples: `task-completed.event.ts`, `po-submitted.event.ts`.

**When Q3 = YES (external integration):**
- Do not call vendor SDK directly inside business module.
- Place adapters under `src/integrations/<vendor>/`.
- Modules interact via interfaces/adapters.

### 2. Define Project Directory Structure

Based on technology stack and patterns, create the complete project structure:

**Root Configuration Files:**

- Package management files (package.json, requirements.txt, etc.)
- Build and development configuration
- Environment configuration files
- CI/CD pipeline files
- Documentation files

**Source Code Organization:**

- Application entry points
- Core application structure
- Feature/module organization
- Frontend pages must be organized by entity/domain (`src/pages/<entity>/*Page.tsx`), not flat grouping
- Shared utilities and libraries
- Configuration and environment files

**Test Organization:**

- Unit test locations and structure
- Integration test organization
- End-to-end test structure
- Test utilities and fixtures

**Build and Distribution:**

- Build output directories
- Distribution files
- Static assets
- Documentation build

### 3. Define Integration Boundaries

Map how components communicate and where boundaries exist:

**API Boundaries:**

- External API endpoints
- Internal service boundaries
- Authentication and authorization boundaries
- Data access layer boundaries

**Component Boundaries:**

- Frontend component communication patterns
- State management boundaries
- Service communication patterns
- Event-driven integration points

**Data Boundaries:**

- Database schema boundaries
- Data access patterns
- Caching boundaries
- External data integration points

### 4. Create Complete Project Tree

Generate a comprehensive directory structure showing all files and directories:

**Concise default examples (prefer independent FE/BE repos):**

**Frontend (Next.js) skeleton:**
```
pms-ins-web/
├── src/
│   ├── app/
│   ├── pages/<entity>/
│   ├── features/<domain>/{components,hooks,schemas}
│   ├── design-system/{tokens,components,utils}
│   └── lib/{api-client,query-keys,auth,constants}
└── public/
```

**Backend (NestJS) skeleton:**
```
pms-ins-api/
├── prisma/{schema.prisma,migrations/}
├── src/
│   ├── common/{filters,guards,interceptors,pipes}
│   ├── prisma/prisma.service.ts
│   ├── integrations/<vendor>/
│   └── modules/<domain>/
│       ├── dto/
│       ├── controllers/
│       ├── services/
│       ├── repositories/
│       ├── state-machine/   # when Q1 = YES
│       ├── events/          # when Q2 = YES
│       └── <domain>.module.ts
└── test/{unit,integration,e2e}
```

**Default recommendation rules:**
- Prefer two independent repositories unless user explicitly requests monorepo.
- Backend modules must include `dto/` for request/query/response contracts (or stack-equivalent).
- For state-driven domains, add `state-machine/`; for cross-module reactions, add `events/`.
- Always run Q1/Q2/Q3 classification before finalizing the backend tree.
- NestJS trees in this step are reference examples only; for non-NestJS backends, output native framework structure while preserving equivalent layer boundaries (route/handler, contract/schema, business logic, data access, database).

### 5. Map Requirements to Structure

Create explicit mapping from project requirements to specific files/directories:

**Epic/Feature Mapping:**
"Epic: User Management

- Components: src/features/users/components/
- Services: src/modules/users/services/
- API Routes: src/modules/users/routes/
- Database: prisma/migrations/_*users*_
- Tests: test/unit/users/ and test/integration/users/"

**Cross-Cutting Concerns:**
"Authentication System

- Components: src/app/(auth)/ and src/features/auth/components/
- Services: src/modules/auth/services/
- Middleware: src/middleware.ts (web) / src/common/guards (api)
- Guards: src/common/guards/auth.guard.ts
- Tests: test/unit/auth/ and test/integration/auth/"

**Monorepo Wrapper (only if user explicitly requests monorepo):**
```
<project-root>/
├── README.md
├── package.json
├── pnpm-workspace.yaml
├── .gitignore
├── .env.example
├── docker-compose.yml
├── .github/workflows/ci.yml
├── apps/
│   ├── api/                        # NestJS structure above
│   └── web/                        # Next.js structure above
├── packages/
│   └── shared-types/               # optional
└── infra/
    └── docker/
        ├── Dockerfile.api
        └── Dockerfile.web
```

### 6. Generate Structure Content

Prepare the content to append to the document:

#### Content Structure:

```markdown
## Project Structure & Boundaries

### Complete Project Directory Structure
```

{{complete_project_tree_with_all_files_and_directories}}

```

### Architectural Boundaries

**API Boundaries:**
{{api_boundary_definitions_and_endpoints}}

**Component Boundaries:**
{{component_communication_patterns_and_boundaries}}

**Service Boundaries:**
{{service_integration_patterns_and_boundaries}}

**Data Boundaries:**
{{data_access_patterns_and_boundaries}}

### Requirements to Structure Mapping

**Feature/Epic Mapping:**
{{mapping_of_epics_or_features_to_specific_directories}}

**Cross-Cutting Concerns:**
{{mapping_of_shared_functionality_to_locations}}

### Integration Points

**Internal Communication:**
{{how_components_within_the_project_communicate}}

**External Integrations:**
{{third_party_service_integration_points}}

**Data Flow:**
{{how_data_flows_through_the_architecture}}

### File Organization Patterns

**Configuration Files:**
{{where_and_how_config_files_are_organized}}

**Source Organization:**
{{how_source_code_is_structured_and_organized}}

**Test Organization:**
{{how_tests_are_structured_and_organized}}

**Asset Organization:**
{{how_static_and_dynamic_assets_are_organized}}

### Development Workflow Integration

**Development Server Structure:**
{{how_the_project_is organized_for_development}}

**Build Process Structure:**
{{how_the_build_process_uses_the_project_structure}}

**Deployment Structure:**
{{how_the_project_structure_supports_deployment}}
```

### 7. Present Content and Menu

Show the generated project structure content and present choices:

"I've created a complete project structure based on all our architectural decisions.

**Here's what I'll add to the document:**

[Show the complete markdown content from step 6]

**What would you like to do?**
[A] Advanced Elicitation - Explore innovative project organization approaches
[P] Party Mode - Review structure from different development perspectives
[C] Continue - Save this structure and move to architecture validation"

### 8. Handle Menu Selection

#### If 'A' (Advanced Elicitation):

- Invoke the `bmad-advanced-elicitation` skill with current project structure
- Process enhanced organizational insights that come back
- Ask user: "Accept these changes to the project structure? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'P' (Party Mode):

- Invoke the `bmad-party-mode` skill with project structure context
- Process collaborative insights about organization trade-offs
- Ask user: "Accept these changes to the project structure? (y/n)"
- If yes: Update content, then return to A/P/C menu
- If no: Keep original content, then return to A/P/C menu

#### If 'C' (Continue):

- Append the final content to `{planning_artifacts}/architecture.md`
- Update frontmatter: `stepsCompleted: [1, 2, 3, 4, 5, 6]`
- Load `./step-07-validation.md`

## APPEND TO DOCUMENT:

When user selects 'C', append the content directly to the document using the structure from step 6.

## SUCCESS METRICS:

✅ Complete project tree defined with all files and directories
✅ All architectural boundaries clearly documented
✅ Requirements/epics mapped to specific locations
✅ Integration points and communication patterns defined
✅ Project structure aligned with chosen technology stack
✅ A/P/C menu presented and handled correctly
✅ Content properly appended to document when C selected
✅ Backend outputs clearly map route/controller/service/repository/database layers (or explicit N/A)

## FAILURE MODES:

❌ Creating generic placeholder structure instead of specific, complete tree
❌ Not mapping requirements to specific files and directories
❌ Missing important integration boundaries
❌ Not considering the chosen technology stack in structure design
❌ Not defining how components communicate across boundaries
❌ Not presenting A/P/C menu after content generation

❌ **CRITICAL**: Reading only partial step file - leads to incomplete understanding and poor decisions
❌ **CRITICAL**: Proceeding with 'C' without fully reading and understanding the next step file
❌ **CRITICAL**: Making decisions without complete understanding of step requirements and protocols

## NEXT STEP:

After user selects 'C' and content is saved to document, load `./step-07-validation.md` to validate architectural coherence and completeness.

Remember: Do NOT proceed to step-07 until user explicitly selects 'C' from the A/P/C menu and content is saved!
