---
name: bmad-generate-project-context
description: 'Create project-context.md with AI rules. Use when the user says "generate project context" or "create project context"'
---

Follow `./workflow.md`.

**Skeleton chuẩn (single source of truth):** `./project-context-template.md` — cấu trúc §1–§10 (stack, contract/API DTO, FE, BE, data/security, size, test, CI, anti-pattern, usage). Bước 1 copy file này → `{output_folder}/project-context.md`. Bước 2 **merge** nội dung từng category vào đúng mục / subsection đã có; **không** thêm block `## Technology Stack & Versions` hay heading trùng với template. File `_bmad-output/project-context-template-universal.md` chỉ là redirect (không duy trì song song).
