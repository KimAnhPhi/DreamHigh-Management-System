# QA Generate E2E Tests Workflow

**Goal:** Generate automated API and E2E tests for implemented code.

**Your Role:** You are a QA automation engineer. You generate tests ONLY — no code review or story validation (use the `bmad-code-review` skill for that).

---

## INITIALIZATION

### Configuration Loading

Load config from `{project-root}/_bmad/bmm/config.yaml` and resolve:

- `project_name`, `user_name`
- `communication_language`, `document_output_language`
- `implementation_artifacts`
- `date` as system-generated current datetime
- YOU MUST ALWAYS SPEAK OUTPUT in your Agent communication style with the config `{communication_language}`

### Paths

- `test_dir` = `{project-root}/tests`
- `source_dir` = `{project-root}`
- `default_output_file` = `{implementation_artifacts}/tests/test-summary.md`
- `testcase_table_file` = `{implementation_artifacts}/tests/testcases-{feature-slug}.md`  
  - `{feature-slug}`: chữ thường, gạch ngang, rút gọn từ story/feature (vd. `1-5-tao-moi-project`, `projects-create`).

### Context

- `project_context` = `**/project-context.md` (load if exists)

---

## EXECUTION

### Step 0: Detect Test Framework

Check project for existing test framework:

- Look for `package.json` dependencies (playwright, jest, vitest, cypress, etc.)
- Check for existing test files to understand patterns
- Use whatever test framework the project already has
- If no framework exists:
  - Analyze source code to determine project type (React, Vue, Node API, etc.)
  - Search online for current recommended test framework for that stack
  - Suggest the meta framework and use it (or ask user to confirm)

### Step 1: Identify Features

Ask user what to test:

- Specific feature/component name
- Directory to scan (e.g., `src/components/`)
- Or auto-discover features in the codebase
- Nếu user đính kèm story/artifact (vd. `1-5-*.md`), dùng làm nguồn AC và đặt `{feature-slug}` phù hợp.

### Step 2: Generate Test Case Table (bắt buộc trước code)

**Trước khi tạo hoặc sửa bất kỳ file test code nào:**

1. Lập **bảng testcase** theo phạm vi đã chọn (API / UI / cả hai).
2. Ghi file Markdown tại `testcase_table_file` (tạo thư mục `tests` nếu chưa có).
3. Trong chat, tóm tắt ngắn và (tuỳ chọn) hỏi user có cần chỉnh TC trước khi code — nếu user không phản hồi, tiếp tục implement theo bảng đã ghi.

**Khung cột bắt buộc (đúng thứ tự):**  
`TC ID` · `Loại` · `Mô tả` · `Điều kiện` · `Bước` · `Kết quả mong đợi` · `Trace (AC / endpoint)` · **`Đã gen test`** · **`Kết quả (chạy)`**

**Khung bảng (Markdown — copy làm header):**

| TC ID | Loại | Mô tả | Điều kiện | Bước | Kết quả mong đợi | Trace (AC / endpoint) | Đã gen test | Kết quả (chạy) |
|-------|------|-------|-----------|------|------------------|----------------------|-------------|----------------|
| TC-01 | Positive | … | … | … | … | … | Chưa | — |
| TC-02 | Negative | … | … | … | … | … | Chưa | — |

- **Kết quả mong đợi:** hành vi kỳ vọng (thiết kế testcase).
- **Kết quả (chạy):** kết quả **sau khi chạy** lệnh test tự động — cập nhật **sau Step 6 (Run tests)**. Giá trị: **`Pass`** · **`Fail`** · **`—`** (chưa chạy hoặc chưa áp dụng). TC **`N/A`** không gen code: giữ **`—`** hoặc ghi **`N/A`**.
- **Đã gen test:** khi mới lập bảng **`Chưa`**. Cập nhật **`Rồi`** / **`N/A`** **ngay sau Step 4** (đã gen xong API + E2E test code), **trước** khi Run tests — không đợi Pass/Fail.
- **Loại:** Positive / Negative / Boundary (hoặc tương đương).
- **Điều kiện:** tiên quyết dữ liệu / trạng thái hệ thống trước khi thực hiện.
- **Bước:** các bước thao tác hoặc gọi API chính (có thể gộp ngắn trong một ô).
- **Trace:** tham chiếu AC story, mã endpoint, hoặc màn hình.
- **TC ID:** bất biến để map vào `it('TC-01 …')` hoặc comment `// TC-01` trong code test.

**Ngoại lệ:** Chỉ bỏ qua bước này nếu user **explicitly** yêu cầu (vd. “chỉ sửa test có sẵn, không cần bảng”).

### Step 3: Generate API Tests (if applicable)

For API endpoints/services, generate tests that:

- Test status codes (200, 400, 404, 500)
- Validate response structure
- Cover happy path + 1-2 error cases
- Use project's existing test framework patterns

### Step 4: Generate E2E Tests (if UI exists)

For UI features, generate tests that:

- Test user workflows end-to-end
- Use semantic locators (roles, labels, text)
- Focus on user interactions (clicks, form fills, navigation)
- Assert visible outcomes
- Keep tests linear and simple
- Follow project's existing test patterns

### Step 5: Sync testcase — cột **Đã gen test** (ngay sau khi gen code)

**Ngay sau khi đã gen hết test code trong phạm vi lần chạy** — tức sau **Step 4** nếu có E2E; nếu chỉ API thì sau **Step 3**. Lúc này **chưa** cần chạy test:

1. Mở `testcase_table_file`.
2. Với mỗi `TC ID` đã có test tương ứng trong code (comment `// TC-…` hoặc tiền tố trong `it('TC-…')`), đặt **`Đã gen test`** = **`Rồi`**.
3. TC không implement lần này: **`Chưa`** hoặc **`N/A`** (kèm lý do ở Trace hoặc ghi chú).
4. (Khuyến nghị) Thêm block **Mapping TC → file test** dưới bảng.

Cột **`Kết quả (chạy)`** vẫn là **`—`** cho tới sau Step 6.

### Step 6: Run tests

Chạy lệnh test của project (`npm run test`, v.v.).

- Nếu fail: sửa code/test cho đến khi pass **hoặc** ghi nhận Fail ở bước sync sau (ưu tiên sửa rồi chạy lại).

### Step 7: Sync testcase — cột **Kết quả (chạy)** (Pass / Fail)

**Sau Step 6:**

1. Mở lại `testcase_table_file`.
2. Với mỗi dòng có **`Đã gen test`** = **`Rồi`**, điền **`Kết quả (chạy)`**:
   - **`Pass`** — test map với `TC ID` đó đã pass trong lần chạy cuối.
   - **`Fail`** — còn fail hoặc chưa sửa xong (ghi thêm ghi chú ngắn dưới bảng nếu cần).
3. Dòng **`N/A`** / **`Chưa`**: giữ **`—`** (hoặc `N/A` cho cột kết quả chạy).

Ánh xạ TC ↔ kết quả: dựa trên output Vitest/Jest (file + tên case), hoặc mapping ở Step 5.

Không coi workflow **hoàn tất** cho đến khi đã cập nhật **Kết quả (chạy)** (trừ khi user **explicitly** bỏ qua).

### Step 8: Create Summary

Output markdown summary:

```markdown
# Test Automation Summary

## Test case design

- [x] `{implementation_artifacts}/tests/testcases-{feature-slug}.md` (**Đã gen test** sau Step 5 · **Kết quả (chạy)** sau Step 7)

## Generated Tests

### API Tests
- [x] tests/api/endpoint.spec.ts - Endpoint validation

### E2E Tests
- [x] tests/e2e/feature.spec.ts - User workflow

## Coverage
- API endpoints: 5/10 covered
- UI features: 3/8 covered

## Next Steps
- Run tests in CI
- Add more edge cases as needed
```

## Keep It Simple

**Do:**

- Use standard test framework APIs
- Focus on happy path + critical errors
- Write readable, maintainable tests
- Run tests to verify they pass

**Avoid:**

- Complex fixture composition
- Over-engineering
- Unnecessary abstractions

**For Advanced Features:**

If the project needs:

- Risk-based test strategy
- Test design planning
- Quality gates and NFR assessment
- Comprehensive coverage analysis
- Advanced testing patterns and utilities

> **Install Test Architect (TEA) module**: <https://bmad-code-org.github.io/bmad-method-test-architecture-enterprise/>

## Output

- Save testcase table to: `testcase_table_file`  
  - Lần đầu (Step 2): **Đã gen test** = `Chưa`, **Kết quả (chạy)** = `—`  
  - Sau Step 5: **Đã gen test** = `Rồi` / `N/A`  
  - Sau Step 7: **Kết quả (chạy)** = `Pass` / `Fail` / `—`
- Save summary to: `{default_output_file}`

**Done!** Code generated, **Đã gen test** synced, tests run, **Kết quả (chạy)** synced. Validate against `./checklist.md`.
