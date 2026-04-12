---
name: ba-activity-rule-spec
description: "Validate từng API: một file, Mermaid flowchart + bảng 4 cột ngay sau mô tả từng API; ưu tiên cập nhật file Sequence; Mermaid nghiệp vụ, SQL minh họa (data model hoặc ghi suy đoán)."
---

Version: 2.4.1  
Author: M2MBA  
Last Updated: 2026-04-10  
Description: Phân tích rule validate theo từng API — **một file**; **luồng + bảng ngay sau từng API** (không gom mục riêng cuối file); file Sequence → sửa đúng file đó; Mermaid chỉ nghiệp vụ; SQL minh họa theo model hoặc ghi rõ suy đoán.

# BA API VALIDATION & DATA FLOW (MERMAID)

## Đầu ra (mỗi API)

1. **`flowchart` Mermaid** — tiếng Việt có dấu; **mỗi nút bắt đầu bằng số bước** (`1. …`, `2. …`; nhánh lỗi `3b.` …). Nội dung: lấy/kiểm tra gì, điều kiện nhánh, ghi nhận nghiệp vụ, mã lỗi nếu spec có. **Cấm** SQL/câu lệnh DB trong nhãn; token chỉ cần «xác thực token» / «lấy định danh từ token» — chi tiết ở bảng. **Cấm** «vì sao có rule» trên sơ đồ.

2. **Bảng 4 cột** (ngay dưới Mermaid, phủ hết bước BE của API đó):

| Bước | Mô tả bước | SQL tương ứng | Vì sao có rule đó |

- **Bước:** thứ tự BE; **mỗi API đánh lại từ 1** (tránh nhầm giữa các API).
- **Mô tả:** đầu vào, điều kiện, nhánh — tiếng Việt có dấu.
- **SQL:** minh họa SELECT/INSERT/UPDATE… — **căn cứ:** có ERD/Prisma → ghi «dựa trên data model đã cung cấp» (thường **một dòng** dưới `## Đặc tả API`); không có model → **một lần** câu kiểu *«SQL minh họa suy đoán — chưa có data model chính thức»* + vẫn nêu bảng/cột giả định trong ô (không thay thế DB chính thức).
- **Vì sao:** nhóm rule ([validation-6-groups.md](reference/validation-6-groups.md)), rủi ro hoặc căn cứ nghiệp vụ.

**Gợi ý đầu vào:** endpoint/method, request/response, mã lỗi, ERD hoặc Prisma nếu có, auth, luật nghiệp vụ, tích hợp đối tác. Thiếu thông tin **bắt buộc** → **hỏi user**. Không tự thêm số nghiệp vụ không có căn cứ.

## Cấu trúc file

- **Một file** chứa mọi API (trừ khi user bảo tách).
- **Vị trí:** sau đặc tả từng API (thường sau **Status Code**), chèn `#### Luồng xử lý BE & rule — {METHOD} \`{path}\`` → ` ```mermaid ` … ` ``` ` → bảng. **Không** dùng mục kiểu `## Phân tích validate API` gom ở cuối.
- **File Sequence** (`*sequence*.md`): **cập nhật đúng file** — xen vào từng `### API` trong `## Đặc tả API`; **không** tạo `*-api-validation.md` khi đã làm trên Sequence.
- **Chưa có Sequence:** tạo một file (ví dụ `docs-BA/API/*-api-validation.md`), cùng thứ tự: tiêu đề API → đặc tả → `####` → Mermaid → bảng.

## Quy tắc Mermaid (bổ sung)

Số trên nút **khớp** cột Bước; nhãn nghiệp vụ ngắn; nhánh ghi hậu quả/mã lỗi; không `%%` dày giữa cạnh; không dòng trống giữa các dòng cạnh liên tiếp trong cùng khối; hạn chế `:` trong label nếu preview lỗi; `flowchart TD`/`LR` tùy độ dài.

**Preview mờ — tùy chọn (không bắt buộc):** thêm **một dòng** `%%{init: …}%%` ngay sau mở fence, trước `flowchart` — tăng `fontSize`, đặt `primaryTextColor` / `primaryBorderColor` / `lineColor` / `arrowheadColor` tối (ví dụ `#0f172a`, `#334155`) để chữ và nét nhìn đậm hơn; `theme: base` để `themeVariables` áp dụng ổn. Mermaid **không** có bold toàn sơ đồ; muốn đậm hơn nữa: phóng preview (`Ctrl` + `+`) hoặc CSS local (`.mermaid svg text { font-weight: 600 }` qua `markdown.styles`).

## Tham chiếu & phạm vi

- **6 nhóm rule:** [validation-6-groups.md](reference/validation-6-groups.md) — dùng cho cột «Vì sao», không chép vào nhãn Mermaid.
- **Ví dụ:** [examples-registration-flow.md](reference/examples-registration-flow.md).
- **Không** thay thế migration/SQL production — cột SQL chỉ phục vụ **review**.
