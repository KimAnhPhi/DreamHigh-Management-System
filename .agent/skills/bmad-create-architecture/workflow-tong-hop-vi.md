# Tổng hợp luồng BMAD — Create Architecture (`bmad-create-architecture`)

Tài liệu tóm tắt cách skill hoạt động, các bước và ví dụ minh họa. Chi tiết đầy đủ nằm trong `workflow.md`, `SKILL.md` và từng file `steps/step-*.md`.

---

## 1. Skill làm gì và kích hoạt thế nào?

- **File:** `SKILL.md` chỉ dẫn: làm theo `./workflow.md`.
- **Mục tiêu:** Tạo **bộ quyết định kiến trúc (architecture decisions)** qua khám phá có kiểm soát, để **các AI agent implement thống nhất**, tránh mâu thuẫn.
- **Vai trò agent:** **Facilitator / đồng sự kiến trúc** với user — không phải tự “đổ” nội dung khi chưa có input và xác nhận.
- **Kích hoạt (mô tả skill):** Ví dụ *"lets create architecture"*, *"create technical architecture"*, *"create a solution design"*.

---

## 2. Khởi đầu: cấu hình

Đọc `{project-root}/_bmad/bmm/config.yaml` và resolve (trong số các trường):

- `project_name`, `output_folder`, `planning_artifacts`, `user_name`
- `communication_language`, `document_output_language`, `user_skill_level`
- `date` (thời điểm hệ thống)

**Bắt buộc:** Giao tiếp với user theo `communication_language` trong config.

---

## 3. Kiến trúc thực thi (micro-file)

- Mỗi bước = **một file** trong `steps/` — đọc **trọn vẹn** trước khi hành động.
- Tiến trình **tuần tự**; **không** sang bước sau nếu bước hiện tại yêu cầu user **phê duyệt / chọn Continue**.
- Tài liệu đầu ra: **frontmatter** theo dõi trạng thái (`stepsCompleted`, `inputDocuments`, …), nội dung **bổ sung dần** qua hội thoại.
- **Không** ước lượng thời gian (theo quy tắc trong các step).

---

## 4. Bước 1 — Khởi tạo

| File | `step-01-init.md` — nếu đã có document + `stepsCompleted` thì chuyển `step-01b-continue.md` |
|------|---------------------------------------------------------------------------------------------|
| **Mục đích** | Phát hiện workflow cũ/mới; discover tài liệu đầu vào; tạo hoặc resume `*architecture*.md`. |
| **Input discovery** | `planning_artifacts`, `output_folder`, `project_knowledge`, `docs/`, v.v.; hỗ trợ **thư mục shard** (folder + `index.md`). Tìm PRD, brief, UX, research, `project-context.md`, … |
| **Ràng buộc** | **Bắt buộc có PRD**; xác nhận với user danh sách file trước khi load đầy đủ. |
| **Output** | Thường tạo `{planning_artifacts}/architecture.md` từ `architecture-decision-template.md`, ghi `inputDocuments`. |
| **Ví dụ** | Tìm được `prd.md`, `ux-design.md`; user xác nhận không thêm file; khởi tạo `_bmad-output/planning-artifacts/architecture.md`. Nếu file đã có `stepsCompleted: [1,2,3]` → `step-01b` resume từ bước 4. |

Sau setup, user chọn **[C] Continue** (khi mô tả trong step-01) rồi mới sang bước 2 — agent phải đọc hết `step-02-context.md`.

---

## 5. Bảy bước chính (Bước 2 → 8)

### Bước 2 — Phân tích ngữ cảnh dự án

| | |
|---|---|
| **File** | `step-02-context.md` |
| **Mục đích** | Từ PRD/UX: FR, NFR, quy mô, ràng buộc — **hệ quả kiến trúc**, **chưa** chọn công nghệ chi tiết. |
| **Output điển hình** | Phân tích scope trong `architecture.md`; cập nhật `stepsCompleted` có bước 2 khi user chọn **C**. |
| **Ví dụ** | PRD: real-time thông báo, 500 concurrent users, audit log → ghi: cần kênh real-time, logging kiểm toán, **chưa** khẳng định React/Vue. |

### Bước 3 — Starter / nền tảng

| | |
|---|---|
| **File** | `step-03-starter.md` |
| **Mục đích** | Chọn template/CLI/monorepo phù hợp; **verify phiên bản qua web** (không tin version cứng). |
| **Output** | Starter + lý do + version (Vite, framework, package manager, …). |
| **Ví dụ** | Web PMS: `Vite + React + TypeScript`, `pnpm`, ESLint flat — tránh starter đã deprecated. |

### Bước 4 — Quyết định kiến trúc cốt lõi

| | |
|---|---|
| **File** | `step-04-decisions.md` |
| **Mục đích** | DB, auth, API, tích hợp, hosting, queue, …; verify version; **quyết định cộng tác** theo từng nhóm. |
| **Output** | Các khối quyết định + lý do/ alternative; menu **A/P/C** sau **mỗi nhóm** lớn (theo file). |
| **Ví dụ** | REST + OpenAPI, PostgreSQL, JWT + refresh, object storage, BullMQ + Redis. |

### Bước 5 — Patterns & nhất quán

| | |
|---|---|
| **File** | `step-05-patterns.md` |
| **Mục đích** | Quy ước để **nhiều agent không chọn khác nhau**: naming, API error, logging, layering, … |
| **Output** | Bảng/quy tắc patterns trong document. |
| **Ví dụ** | `/api/v1/...`, body lỗi `{ code, message, traceId }`, DB `snake_case`, FE feature folders. |

### Bước 6 — Cấu trúc project & ranh giới

| | |
|---|---|
| **File** | `step-06-structure.md` |
| **Mục đích** | **Cây thư mục cụ thể**; map epic/story → module/package. |
| **Output** | Tree + giải thích boundary (`apps/`, `packages/`, modules). |
| **Ví dụ** | `apps/web`, `apps/api`, `packages/ui`; epic “Quản lý dự án” → `modules/projects` + `features/projects`. |

### Bước 7 — Kiểm tra (Validation)

| | |
|---|---|
| **File** | `step-07-validation.md` |
| **Mục đích** | So khớp PRD/NFR với kiến trúc; phát hiện mâu thuẫn version/pattern; gap analysis. |
| **Output** | Checklist validation + gap + hành động (nếu cần). |
| **Ví dụ** | PRD yêu cầu export Excel nhưng chưa có quyết định thư viện/flow async → ghi gap. |

### Bước 8 — Hoàn tất & bàn giao

| | |
|---|---|
| **File** | `step-08-complete.md` |
| **Mục đích** | Đóng workflow: frontmatter `status: complete`, tóm tắt, gợi ý bước tiếp (`bmad-help`), Q&A về tài liệu. |
| **Output** | Ví dụ `stepsCompleted: [1,2,3,4,5,6,7,8]`, `workflowType: architecture`, `completedAt`. |
| **Ví dụ** | “Architecture sẵn sàng cho dev story; triển khai theo đúng `architecture.md`.” |

---

## 6. Menu A / P / C (từ bước 2 trở đi)

Sau khi có draft nội dung bước (và các nhóm trong bước 4):

| Ký hiệu | Ý nghĩa |
|---------|---------|
| **A** | Advanced Elicitation — skill `bmad-advanced-elicitation` |
| **P** | Party Mode — skill `bmad-party-mode` |
| **C** | **Continue** — ghi vào document, cập nhật `stepsCompleted`, chỉ sau đó load bước kế (và **đọc hết** file step tiếp theo) |

Sau A hoặc P: quay lại menu A/P/C của **cùng bước** cho đến khi user chọn C (trừ khi step quy định khác).

---

## 7. Sơ đồ luồng (bước 2 → 8)

```mermaid
flowchart LR
  S2[2 Context] --> S3[3 Starter]
  S3 --> S4[4 Decisions]
  S4 --> S5[5 Patterns]
  S5 --> S6[6 Structure]
  S6 --> S7[7 Validation]
  S7 --> S8[8 Complete]
```

Luồng tổng thể: **Config → step-01 (hoặc 01b) → 2 → … → 8**.

---

## 8. Nguyên tắc quan trọng (tóm tắt)

1. **Không** tự sinh kiến trúc đầy đủ khi chưa có input / chưa qua bước thiết lập; ưu tiên **cộng tác** và **xác nhận user**.
2. **Đọc trọn vẹn** từng file step — partial read được cảnh báo là lỗi nghiêm trọng trong các step.
3. Chỉ **chuyển bước** sau **C** (khi step yêu cầu); cập nhật `stepsCompleted` tương ứng.
4. File `architecture.md` (hoặc tương đương trong `planning_artifacts`) là **nguồn sự thật kỹ thuật** cho giai đoạn implement với AI agents.

---

*Tài liệu tổng hợp cho người dùng skill; không thay thế việc đọc đầy đủ `workflow.md` và từng `steps/step-*.md` khi chạy workflow.*
