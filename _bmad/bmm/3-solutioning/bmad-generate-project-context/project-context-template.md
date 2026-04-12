---
project_name: '{{project_name}}'
user_name: '{{user_name}}'
date: '{{date}}'
sections_completed: []
existing_patterns_found: 0
status: 'draft'
optimized_for_llm: true
---

# Project Context for AI Agents

_File này là rule thực thi cho AI/dev. Bước 1 (discover) copy từ `project-context-template.md`; bước 2 điền stack và merge rule theo từng § — không tạo heading trùng._

---

## 1) Tech Stack Snapshot

- Backend: _Điền sau discovery (framework, ngôn ngữ, ORM/DB lib)._
- Frontend: _Điền sau discovery (framework, build tool, UI)._
- Data/Infra chính: _DB, cache/queue._
- Testing/Lint: _Test stack, lint stack._

> Rule: Nếu planning architecture khác codebase hiện tại, ưu tiên rule trong file context này cho implementation hiện thời; cập nhật architecture sau.

---

## 2) Language & Contract Rules

- Bật strict typing; không dùng `any`/cast chữa cháy nếu có thể định nghĩa type chuẩn.
- **HTTP API boundary:** **Request DTO** / input schema cho query, body, params (validate ở edge). **Response DTO** (hoặc output schema tương đương, có tên, có thể document OpenAPI) cho nội dung trong `data` của success envelope — không để contract đầu ra chỉ là `type` nội bộ trong service (trừ khi dự án ghi rõ exception).
- **NestJS:** class trong `src/modules/<domain>/dto/`; list = item DTO + wrapper (`items`, `total`, …); map ORM/entity → Response DTO trước khi trả. Stack khác (Fastify+Zod, tRPC, …): quy định input/output schema tương đương, cùng module domain.
- **Rollout:** endpoint mới bắt buộc đủ cặp request/response contract; legacy migrate khi chạm file/endpoint. Nếu không có HTTP API công khai, ghi `N/A` trong project-context thực tế cho mục này.
- API contract phải nhất quán:
  - Success: `{ data, meta }`
  - Error: `{ error, meta }`
- Không trả raw lỗi từ external provider ra frontend; luôn map về error nội bộ.
- Import theo boundary module/domain; tránh import chéo phá kiến trúc.

> Khi có tài liệu kiến trúc (`bmad-create-architecture`), **copy nguyên** quy tắc Request/Response boundary từ shard **Pattern DTO** vào §2 (và §4 nếu cần).

### Language-specific (merge từ Step 2 — Language category)

_Document sau bước generate._

---

## 3) FE Maintainability Rules

- Màn có nhiều tab/sub-screen phải tách page/section component theo domain, không làm "god page".
- Page chỉ orchestration; business logic chuyển về feature/hook/service phù hợp.
- Side effects bất đồng bộ phải có guard cancel/unmount-safe trước khi setState.
- Không hard-code dữ liệu fix trong JSX.
- Cấu trúc `pages` bắt buộc theo entity/domain, không để thư mục phẳng khó quản lý.

### Pages Structure (Entity-first, Mandatory)

- Chuẩn thư mục: `src/pages/<entity>/<PageName>.tsx`.
- Ví dụ nhóm entity: `dashboard`, `projects`, `clients`, `tasks`, `billing` (điều chỉnh theo domain thực tế).
- `App.tsx`/router import page từ từng entity folder, không import từ `src/pages` phẳng.
- File test đặt gần page theo entity: `src/pages/<entity>/*.test.tsx`.
- Dùng alias `@/...` cho component/module dùng chung để ổn định import khi đổi cấu trúc.

### Constants & UI Metadata

- Tạo kho constants tái sử dụng (`constants` theo domain hoặc global).
- Danh mục hiển thị chuẩn dùng metadata:
  - `value`, `label`
  - `tone`/`badgeColor` (nếu cần trạng thái màu)
- Map `value -> metadata` tại một nơi; không duplicate mapping ở nhiều màn.

### Framework-specific — React/FE (merge từ Step 2 — Framework category)

_Document sau bước generate._

---

## 4) BE Layering & Reuse Rules

- Boundary chuẩn: route/controller nhận request -> service xử lý nghiệp vụ -> repository/data access.
- Mỗi module domain có HTTP API: colocate **Request + Response** boundary artifacts (`dto/` hoặc convention tương đương); controller/service trả đúng Response contract, không expose raw persistence model làm public shape.
- Không truy cập DB trực tiếp trong controller.
- Logic lặp từ 2 nơi trở lên phải tách shared function/module.
- Shared function:
  - typed input/output rõ ràng
  - ưu tiên pure function
  - có unit test nếu là nghiệp vụ quan trọng.
- Với module trạng thái: transition tập trung một nơi (service/state-machine), không ghi đè status trực tiếp ad hoc.

### Framework-specific — NestJS/BE (merge từ Step 2 — Framework category)

_Document sau bước generate._

---

## 5) Data, Security, Integration Constraints

- DB chính là system of record; thay đổi schema đi qua migration chuẩn.
- Nếu có cache/queue: key/queue phải namespaced theo domain.
- Tích hợp ngoài mặc định theo async pattern: enqueue -> worker -> retry/backoff -> reconciliation.
- Tác vụ ghi qua tích hợp ngoài cần idempotency key.
- AuthN/AuthZ theo SSO/OIDC + RBAC/policy (hoặc tương đương dự án); không bypass quyền ở service/controller.
- Audit trail cho thao tác nhạy cảm (đổi trạng thái, dữ liệu tài chính, quyền truy cập...).
- Giữ correlation/request id xuyên suốt flow để trace lỗi.

---

## 6) Code Size Guardrails (Soft Limits)

- FE page/container: <= 500 lines (warning 500-650, ưu tiên refactor nếu > 650).
- FE component: <= 220 lines (cảnh báo > 280).
- BE service/controller: <= 280 lines (cảnh báo > 340).
- Function: <= 40 lines (nên tách nếu > 60).

> Rule: vượt soft limit thì ghi lý do + kế hoạch refactor trong PR/technical note.

### Code Quality & Style (merge từ Step 2 — Quality category)

_Bổ sung project-specific nếu có._

---

## 7) Testing Rules

- Unit test bắt buộc cho mapper/helper/shared logic có business rule.
- Test tối thiểu cho API contract success/error envelope.
- FE test đặt gần module (`*.test.ts(x)` hoặc convention thống nhất của team).
- Tránh flaky test: mock rõ ràng, không phụ thuộc timing ngẫu nhiên.

### Testing (merge từ Step 2 — Testing category)

_Document sau bước generate._

---

## 8) Delivery Quality Gates (Mandatory)

- Trước push/merge phải pass:
  - `lint`
  - `typecheck`
  - `test`
  - `build`
- Thiết lập pre-commit/pre-push hook để chặn lỗi sớm.
- CI phải enforce các gate trên; fail thì không merge.

### Development Workflow (merge từ Step 2 — Workflow category)

_Document sau bước generate._

---

## 9) Anti-Patterns (Do Not)

- Hard-code status/badge text-color rải rác trong UI.
- Gom nhiều tab/screen/logic vào một file page dài.
- Để `src/pages` dạng phẳng hoặc group không theo entity khiến khó tìm/khó scale.
- Duplicate logic BE giữa nhiều service.
- Chỉ có Request DTO mà không có Response contract rõ ràng cho payload public (để response shape "chìm" trong service).
- Đổi API contract một phía (FE hoặc BE) mà không cập nhật đồng bộ.
- Dùng `as any` để né lỗi type.

### Critical Don't-Miss (merge từ Step 2 — Gotchas category)

_Document sau bước generate._

---

## 10) How To Use

**For AI Agents**

- Đọc file này trước khi implement.
- Ưu tiên phương án typed rõ ràng, ít rủi ro, dễ maintain.
- Nếu phát sinh pattern lặp mới, cập nhật file này.

**For Humans**

- Giữ file ngắn gọn, chỉ rule không hiển nhiên.
- Cập nhật khi stack/contract/convention thay đổi lớn.
- Dùng làm checklist review PR.

Last Updated: {{date}}
