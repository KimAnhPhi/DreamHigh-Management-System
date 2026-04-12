---
name: ba-elicitation-review
description: "Review và đánh giá chất lượng file summary/output sau buổi khơi gợi yêu cầu (elicitation). Chấm điểm theo 8 tiêu chí (gồm thực thể nghiệp vụ & vòng đời), phát hiện gap (tag P/S/E/C/D), mơ hồ/mâu thuẫn, sinh câu hỏi follow-up; lưu báo cáo + file QA dưới docs-BA. Dùng khi BA review summary, kiểm tra elicitation đủ chưa, gap yêu cầu, thực thể trạng thái, ERD/readiness, hoặc hỏi đã ổn chưa sau phỏng vấn."
---

# BA Elicitation Review Skill

Đánh giá chất lượng output sau buổi khơi gợi — **scorecard 8 tiêu chí** (có **thực thể & vòng đời**) + **rubric 4 trụ** + tag **D** khi gap là dữ liệu nghiệp vụ/trạng thái; phát hiện gap, mâu thuẫn, giả định ẩn; sinh câu hỏi follow-up và **ghi file** theo quy ước dự án.

**Version:** 1.1.0 | **Author:** M2MBA | **Last Updated:** 2026-04-10  
**Description:** Như trên.

**Atomic:** chỉ review + sinh output (chat + 2 file markdown); không cập nhật `listQA`/history/summary (skill khác).

**Bắt buộc đọc trước khi chấm:**

- `resources/ba-elicitation-review-8criteria.md` — 8 tiêu chí & ngưỡng ✅/⚠️/❌
- `resources/ba-elicitation-review-entity-lifecycle.md` — danh mục thực thể & vòng đời (bổ sung cho tiêu chí 8)
- `resources/ba-elicitation-gap-rubric.md` — 4 trụ P/S/E/C, tag **D**, severity

**Nguyên tắc:** Nhận xét dựa trên **bằng chứng trong tài liệu**; không bịa số liệu; không đánh “đủ” khi chưa ghi — ghi **gap** + câu hỏi.

**Đường dẫn `resources/`:** tương đối từ thư mục chứa `SKILL.md`.

---

## Đầu vào

Một trong các dạng:

- File markdown/text ghi chú sau buổi phỏng vấn stakeholder  
- Biên bản họp / raw requirement notes  
- Bản tóm tắt elicitation (summary) — **khuyến nghị**  
- Output từ skill questioning khác (vd. `ba-elicitation-qna-gen`) nếu có  

**Khuyến nghị thêm:** `docs-BA/Elicitation/history/…` nếu summary rút gọn; `docs-BA/Elicitation/listQA/…` để tránh trùng câu hỏi.

**Clarify tối đa 1 câu** trước khi review nếu chưa rõ **domain** hoặc **mục tiêu bước tiếp** (viết spec, MVP, ước lượng…).

---

## Quy trình thực hiện

### Bước 1 — Đọc và phân loại

Phân tích nhanh: domain; chủ đề buổi elicitation; stakeholder nào đã tham gia; mục tiêu BA bước tiếp (nếu đã biết).

### Bước 2 — Chấm 8 tiêu chí

Theo `ba-elicitation-review-8criteria.md`: mỗi tiêu chí **✅ / ⚠️ / ❌** + nhận xét **1 câu** (trích bằng chứng hoặc nêu thiếu). Tiêu chí **8 (Entity & Lifecycle)** bắt buộc đối chiếu `ba-elicitation-review-entity-lifecycle.md`.

**Tổng hợp:** `Tổng: X/8 Đạt` (đếm số ✅).

### Bước 2B — Bảng thực thể & vòng đời (bắt buộc trong file review)

Tổng hợp **danh sách thực thể trọng yếu** suy ra từ tài liệu (không bịa thêm tên gọi nếu không có ngữ cảnh). Với mỗi thực thể **core**: ghi **trạng thái / chuyển trạng** đã rõ hay **gap** (kèm GAP-ID). Có thể dùng bảng trong mục Format output.

### Bước 3 — Áp dụng rubric 4 trụ & gán gap

Theo `ba-elicitation-gap-rubric.md`: mỗi gap có **GAP-00n**, **mức độ** (Critical/High/Medium/Low), **tag P/S/E/C** và **D** khi liên quan **thực thể, trạng thái, vòng đời, master data** (có thể nhiều tag).

Ưu tiên **3–5 gap quan trọng nhất** trong mục Critical (không liệt kê dài vô hạn).

### Bước 4 — Mâu thuẫn & giả định

Đồng bộ với tiêu chí 4 và 5: mâu thuẫn / tension → Critical hoặc High; giả định ẩn → câu hỏi xác nhận.

### Bước 5 — Xuất output

1. **Trong chat:** paste **Scorecard** + **Critical / Minor gaps** + **Kết luận** (🟢/🟡/🔴) — cùng format với file review.  
2. **Ghi file** (incremental): báo cáo + file QA — như mục dưới.

**Ánh xạ kết luận (điều chỉnh theo Critical gap):**

| Tín hiệu | Trạng thái |
|:--|:--|
| ≥6 ✅ và không có Critical (rubric, kể cả **D**) | 🟢 Sẵn sàng viết spec |
| Có Critical chưa có plan / câu hỏi | 🔴 Cần elicitation lại hoặc làm rõ trước spec |
| Còn lại | 🟡 Cần follow-up ngắn (có thể gợi ý 30–60 phút nếu phù hợp ngữ cảnh) |

---

## Format output (chat và file review)

File `review-post-elicitation_…md` **phải chứa** các khối sau (có thể thêm ma trận 4 trụ).

```markdown
## 📊 Elicitation Quality Scorecard

| # | Tiêu chí | Mức độ | Nhận xét ngắn |
|---|----------|--------|---------------|
| 1 | Coverage | ✅/⚠️/❌ | [1 câu] |
| 2 | Depth | ✅/⚠️/❌ | [1 câu] |
| 3 | Clarity | ✅/⚠️/❌ | [1 câu] |
| 4 | Conflict Detection | ✅/⚠️/❌ | [1 câu] |
| 5 | Hidden Assumptions | ✅/⚠️/❌ | [1 câu] |
| 6 | Stakeholder Completeness | ✅/⚠️/❌ | [1 câu] |
| 7 | Actionability | ✅/⚠️/❌ | [1 câu] |
| 8 | Entity & Lifecycle | ✅/⚠️/❌ | [1 câu] |

**Tổng: X/8 Đạt**

---

## 🧩 Thực thể & vòng đời (Entity–Lifecycle)

| Thực thể (tên từ tài liệu) | Vai trò (core / phụ / biên) | Trạng thái & chuyển trạng đã rõ? | Gap / GAP-ID |
|:--|:--|:--|:--|

*(Nếu chỉ có một luồng tập trung một đối tượng — ghi rõ và vẫn liệt kê trạng thái terminal / ngoại lệ.)*

---

## Ma trận 4 trụ (P/S/E/C) + D khi áp dụng

| Trụ | Đủ / Thiếu / Một phần | Bằng chứng (trích) | Ghi chú |

---

## 🚨 Critical Gaps

- **[Tên]**: [Mô tả] → *Ảnh hưởng: …* | GAP-ID | P/S/E/C/D

## ⚠️ Minor Gaps

- …

---

## ✅ Kết luận & Khuyến nghị

**Trạng thái:** 🟢 / 🟡 / 🔴 (một trong ba)

**Bước tiếp theo:** [2–3 action cụ thể]
```

---

## Lưu file (bắt buộc)

### A) Báo cáo review

- **Đường dẫn:** `docs-BA/Elicitation/review/review-post-elicitation_YYYYMMDD_<slug-du-an>.md`  
- **Ghi incremental** (header → scorecard → gap → ma trận → kết luận).

### B) Câu hỏi bổ sung (file riêng)

- **Đường dẫn:** `docs-BA/Elicitation/QA/cau-hoi-bo-sung-sau-review-khoi-goi-yeu-cau_YYYYMMDD_<slug-du-an>.md`  
- Bảng: `GAP-ID | Trụ (P/S/E/C/D) | Câu hỏi | Ghi chú`; nhóm **Critical / Nice-to-have** như trong template dưới; link tới file (A).  
- Trùng `listQA` → ghi *Đã có trong tracking: [file + ID]*.

**Metadata đầu file QA:**

```text
Version: 1.0.0
Author: M2MBA
Last Updated: YYYY-MM-DD
Description: Câu hỏi bổ sung sau review kết quả khơi gợi yêu cầu — [Tên dự án]
```

**Trong file QA thêm (rút gọn):**

```markdown
### Câu hỏi bắt buộc (Critical)
| # | Câu hỏi | GAP-ID |
|---|---------|--------|

### Câu hỏi nên hỏi (Nice-to-have)
| # | Câu hỏi | Mục đích |
|---|---------|----------|
```

---

## Nguyên tắc khi review

- Không phán xét chủ quan: mọi nhận xét gắn trích dẫn hoặc “không thấy trong tài liệu”.  
- Cụ thể hóa gap (ví dụ: thiếu team vận hành — không chỉ “thiếu stakeholder”).  
- Câu hỏi follow-up **actionable**, mở, không leading; ưu tiên Critical trước.  
- Nhận diện domain (fintech/compliance, healthcare/privacy…) để nhắc gap phù hợp — không bịa quy định chưa được nêu.

---

## Guard (trước khi kết thúc)

| # | Kiểm tra |
|:--|:--|
| 1 | Đã có scorecard **8** tiêu chí + tổng X/8 |
| 2 | Có mục **Thực thể & vòng đời** (bảng hoặc lý do “chưa suy ra được từ tài liệu”) |
| 3 | Đã ghi **hai** file đúng thư mục & pattern tên |
| 4 | Mỗi gap High+ có câu hỏi hoặc “đã có trong tracking” |
| 5 | Gap có tag P/S/E/C/**D** khi áp dụng được |

---

*Chi tiết ngưỡng 8 tiêu chí, entity–lifecycle và bảng 4 trụ nằm trong `resources/`; không nhân bản dài vào đây.*
