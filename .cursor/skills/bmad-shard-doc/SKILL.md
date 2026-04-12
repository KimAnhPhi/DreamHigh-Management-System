---
name: bmad-shard-doc
description: 'Splits large markdown into level-2 shards via markdown-tree-parser explode, then renames to ordered ASCII slugs (01-slug.md, 02-…). Use if the user says perform shard document'
---

# Shard Document

**Goal:** Split large markdown documents into smaller, organized files based on level 2 sections using `npx @kayvan/markdown-tree-parser explode`, then **rename shards** so filenames are safe on all platforms, **include document order as a numeric prefix**, and match the project language rules from BMAD config (ASCII slugs, no mojibake in names).

## CRITICAL RULES

- MANDATORY: Execute ALL steps in the EXECUTION section IN EXACT ORDER
- DO NOT skip steps or change the sequence
- HALT immediately when halt-conditions are met
- Each action within a step is a REQUIRED action to complete that step
- **Shard filenames MUST follow [Naming convention for shard files](#naming-convention-for-shard-files)** after the explode step — including the **ordered numeric prefix** — do not leave tool-only names (e.g. `phn-tch-…`) unless the user explicitly opts out

## Naming convention for shard files

Use this for every `.md` file created in the destination **except** `index.md` (keep `index.md` as the standard name).

### Read project language from BMAD config

- Resolve `{project-root}` (workspace root of the project).
- Read, in order, until a value is found: `document_output_language`, then `communication_language`:
  - Primary: `{project-root}/_bmad/bmm/config.yaml`
  - Fallback: `{project-root}/_bmad/core/config.yaml`
- If no config file exists or both fields are missing: **ask the user** whether document titles are primarily Vietnamese or English, then treat that as the effective language.

### Classify language mode

Treat as **Vietnamese context** when the configured (or user-stated) language matches any of these (case-insensitive, trim whitespace):

- Contains `vietnam` or `vietnamese`
- Contains `tiếng` or `tieng`
- Is exactly `vi` or `vn`

Otherwise treat as **English context** (and other Latin document languages: use the same rules as English — ASCII slug from the heading text).

### Build the slug from the section heading

Use the **level-2 section title** (in **source document order**, top to bottom) as the source string. The **final basename** is always **`{order}-{slug}.md`** (see **Ordered numeric prefix** below), not bare `slug.md`.

### Ordered numeric prefix (mandatory)

- Assign each shard an index **k = 1, 2, 3, …** matching the **order of `##` headings in the original source file** (before explode).
- Let **N** = total number of level-2 sections. **Zero-pad** `k` to a fixed width **W = max(2, number of digits in N)** so lexicographic sort matches document order (e.g. N = 6 → `01`…`06`; N = 120 → `001`…`120`).
- **Separator:** use a **hyphen** between index and slug — `01-giai-phap-ky-thuat.md`. Do **not** use `1.` / `2.` plus a dot before the slug (ambiguous with extensions; poor cross-tool behavior). The “1, 2, …” reading order is the **numeric prefix**.
- **Final pattern:** `{padded-k}-{slug}.md` where the slug segment contains only `[a-z0-9-]` as in the rules below.

### Slug body (after the prefix)

From the level-2 title, build `slug` (filename segment only; file content unchanged):

**Vietnamese context**

- **Unsign** the title for filename use only (file content stays unchanged):
  - Map `đ` → `d`, `Đ` → `D`
  - Unicode normalize to NFD, remove combining marks (Mn), then normalize to NFC (or equivalent) so remaining letters are base Latin
- Lowercase, trim
- Replace spaces and underscores with `-`
- Remove characters that are not `[a-z0-9-]` — **no Vietnamese diacritics in filenames**
- Collapse multiple `-`, strip leading/trailing `-`
- Ensure non-empty; if empty after slugify, use fallback `section-{k}` using the same **k** as the ordered prefix
- **Example:** section 3 of 6, title `Giải pháp kỹ thuật` → `03-giai-phap-ky-thuat.md`

**English context**

- Lowercase, trim
- Replace spaces and underscores with `-`
- Keep ASCII letters, digits, hyphens only (same cleanup as above)
- **Example:** section 1 of 9, `Technical Decisions` → `01-technical-decisions.md`

### Rename shards and fix `index.md`

- After `explode`, determine section **order** and titles from the **source** `.md` file (`##` lines in order); use the source as authority if anything disagrees with tool output.
- For each shard in order **k**: compute **target filename** `{padded-k}-{slug}.md` per sections above. If two **titles** yield the same `slug`, append **`-2`, `-3`, …** to the **slug segment only** (e.g. `04-foo.md`, `05-foo-2.md`).
- Rename each shard file from the tool’s name to the **target** name.
- **Open `index.md`** and update every relative link so it points to the **new** filenames (the explode tool often writes links to old names).
- Do not change link text unless needed for clarity.

## EXECUTION

### Step 1: Get Source Document

- Ask user for the source document path if not provided already
- Verify file exists and is accessible
- Verify file is markdown format (.md extension)
- If file not found or not markdown: HALT with error message

### Step 2: Get Destination Folder

- Determine default destination: same location as source file, folder named after source file without .md extension
  - Example: `/path/to/architecture.md` --> `/path/to/architecture/`
- Ask user for the destination folder path (`[y]` to confirm use of default: `[suggested-path]`, else enter a new path)
- If user accepts default: use the suggested destination path
- If user provides custom path: use the custom destination path
- Verify destination folder exists or can be created
- Check write permissions for destination
- If permission denied: HALT with error message

### Step 3: Execute Sharding

- Inform user that sharding is beginning
- Execute command: `npx @kayvan/markdown-tree-parser explode [source-document] [destination-folder]`
- Capture command output and any errors
- If command fails: HALT and display error to user

### Step 3a: Normalize shard filenames (MANDATORY)

- Apply **[Naming convention for shard files](#naming-convention-for-shard-files)** in full: load config (or ask user), classify Vietnamese vs English, rename section files, update `index.md` links
- If normalization fails (e.g. cannot parse `index.md`): HALT and report

### Step 4: Verify Output

- Check that destination folder contains sharded files
- Verify `index.md` was created in destination folder and that relative links resolve to renamed shard files
- Confirm each shard filename (excluding `index.md`): **ordered prefix** `\d+` then `-` then slug — only **`[0-9a-z-].md`**, zero-padded width consistent for all shards, **no** diacritics or mojibake
- Count the number of files created
- If no files created: HALT with error message

### Step 5: Report Completion

- Display completion report to user including:
  - Source document path and name
  - Destination folder path
  - Number of section files created
  - Confirmation that `index.md` was created and links were updated after **filename normalization** (language mode taken from BMAD config or user)
  - Brief note: filenames are **`01-slug.md`, `02-…`** (zero-padded order + hyphen + slug); Vietnamese context → unsign/slug rules; English context → English kebab-case
  - Any tool output or warnings
- Inform user that sharding completed successfully

### Step 6: Handle Original Document

> **Critical:** Keeping both the original and sharded versions defeats the purpose of sharding and can cause confusion.

Present user with options for the original document:

> What would you like to do with the original document `[source-document-name]`?
>
> Options:
> - `[d]` Delete - Remove the original (recommended - shards can always be recombined)
> - `[m]` Move to archive - Move original to a backup/archive location
> - `[k]` Keep - Leave original in place (NOT recommended - defeats sharding purpose)
>
> Your choice (d/m/k):

#### If user selects `d` (delete)

- Delete the original source document file
- Confirm deletion to user: "Original document deleted: [source-document-path]"
- Note: The document can be reconstructed from shards by concatenating all section files in order

#### If user selects `m` (move)

- Determine default archive location: same directory as source, in an `archive` subfolder
  - Example: `/path/to/architecture.md` --> `/path/to/archive/architecture.md`
- Ask: Archive location (`[y]` to use default: `[default-archive-path]`, or provide custom path)
- If user accepts default: use default archive path
- If user provides custom path: use custom archive path
- Create archive directory if it does not exist
- Move original document to archive location
- Confirm move to user: "Original document moved to: [archive-path]"

#### If user selects `k` (keep)

- Display warning to user:
  - Keeping both original and sharded versions is NOT recommended
  - The discover_inputs protocol may load the wrong version
  - Updates to one will not reflect in the other
  - Duplicate content taking up space
  - Consider deleting or archiving the original document
- Confirm user choice: "Original document kept at: [source-document-path]"

## HALT CONDITIONS

- HALT if npx command fails or produces no output files
- HALT if mandatory filename normalization cannot be completed (e.g. broken `index.md`, unresolved renames)
