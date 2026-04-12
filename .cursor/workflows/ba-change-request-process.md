---
description: "Workflow xử lý yêu cầu thay đổi: phân tích impact → sinh câu hỏi làm rõ → tạo tracking list cho CR."
---

# Workflow: BA Change Request Process

> **Version:** 1.0.0
> **Author:** M2MBA
> **Last Updated:** 2026-04-12
> **Description:** Xử lý yêu cầu thay đổi khép kín từ phân tích ảnh hưởng (Impact Analysis) đến tạo bộ câu hỏi làm rõ và tracking list có thể truy vết.

> **Nguyên tắc vàng:** Hiểu impact trước → Xác định khoảng trống → Sinh câu hỏi làm rõ chính xác → Tracking đầy đủ.

---

## BƯỚC 1 — Thu Thập Input Từ User

Agent hỏi User để xác định đầu vào **trước khi thực hiện bất kỳ bước nào**:

1. **Nội dung thay đổi** là gì? (Mô tả ngắn về yêu cầu)
2. **Ngữ cảnh hệ thống** hiện có:
   - File ERD / Data Model liên quan (nếu có)
   - Danh sách Use Case / User Story liên quan (nếu có)
   - Quy trình nghiệp vụ AS-IS liên quan (nếu có)
3. **Dự án / Module** áp dụng là gì?
4. **Stakeholder** yêu cầu thay đổi này là ai? Lý do / Mục tiêu?

> ⚠️ Nếu thiếu thông tin quan trọng (nội dung thay đổi, ngữ cảnh hệ thống), Agent **BẮT BUỘC hỏi lại** tối đa 1–2 câu trước khi tiếp tục. Nếu User yêu cầu giả định, ghi rõ `Giả định: ...` trong output.

---

## BƯỚC 2 — Phân Tích Impact (Impact Analysis)

**Kích hoạt Skill:** `ba-impact-analysis`

Agent thực hiện theo đúng quy trình của skill (9 bước):

1. **Tóm tắt yêu cầu** theo khuôn mẫu `cái gì - cho ai - để làm gì - vì sao`.
2. **Phân tích impact 6 nhóm**: Chức năng/UC/US, Quy trình nghiệp vụ, Dữ liệu & báo cáo, Giao diện/UX, Tích hợp, Stakeholder/bộ phận.
3. **Lập bảng Impact Analysis** với mức độ (Cao/Trung bình/Thấp) + lý do đánh giá.
4. **Lập danh sách việc BA cần làm** (cập nhật tài liệu, soạn mới, hỗ trợ Dev/Test).
5. **Xác định Risk & Dependency** (tối thiểu 3–5 ý về nghiệp vụ/compliance/scope).
6. **Liệt kê Câu hỏi cần làm rõ ban đầu** (Bước 6.5 của skill — 5 nhóm: Lý do, Data, Process, Công thức, Tuân thủ).
7. **Tạo 2 file output bắt buộc** trong `Docs-BA/Elicitation/Change request/`:
   - `CR_[slug]_[YYYYMMDD].md`
   - `CR_Draft_Impact_[slug]_[YYYYMMDD].md`
8. **Lập Danh sách Yêu cầu Thay đổi** (A/M/D) → **Xin confirm từ User**.
9. Sau confirm: Tạo US Draft (Add) hoặc cập nhật US hiện có (Modify) kèm Change Log.

> ✅ **Hoàn thành Bước 2** khi: 2 file CR đã được tạo, Danh sách A/M/D đã được User confirm.

---

## BƯỚC 3 — Tổng Hợp Khoảng Trống Cần Làm Rõ

> Bước phân tích trung gian — Agent tự thực hiện, **không cần User làm gì**.

Agent thu thập và hợp nhất **tất cả câu hỏi chưa có câu trả lời** từ:

| Nguồn | Nội dung cần thu thập |
|:--|:--|
| Bước 6.5 của Impact Analysis | Danh sách câu hỏi cần làm rõ đã sinh trong CR |
| Giả định trong CR | Mọi dòng `Giả định: ...` cần xác nhận với Stakeholder |
| Risk & Dependency | Các dependency chưa được chốt (ai, cái gì, khi nào) |
| Thực thể dữ liệu | Trường mới, enum mới, rule validate chưa rõ |
| Chức năng A/M/D | Nghiệp vụ chi tiết/edge case chưa được mô tả đủ |

Agent phân loại từng khoảng trống:

| Nhóm | Mô tả | Hành động |
|:--|:--|:--|
| 🔴 **Bắt buộc làm rõ** | Ảnh hưởng trực tiếp đến thiết kế / dev | Sinh câu hỏi ưu tiên cao |
| 🟡 **Cần xác nhận** | Đã có giả định, cần Stakeholder chốt | Sinh câu hỏi xác nhận |
| 🟢 **Đã đủ** | Rõ ràng từ input ban đầu | Không cần hỏi |

> Agent ghi nhanh summary danh sách khoảng trống (🔴 và 🟡) vào chat trước khi sang Bước 4.

---

## BƯỚC 4 — Sinh Câu Hỏi Làm Rõ Cho Change Request

**Kích hoạt Skill:** `ba-elicitation-qna-gen`

Agent sinh câu hỏi **tập trung đặc thù cho Change Request** (khác với elicitation greenfield):

### 4A. Câu hỏi Lý do & Mục tiêu Thay đổi
- Vì sao cần thay đổi ở điểm này? Pain point cụ thể là gì?
- Mục tiêu định lượng sau thay đổi (KPI, tỷ lệ lỗi, thời gian xử lý...)?
- Nếu không thay đổi thì hậu quả cụ thể là gì?

### 4B. Câu hỏi Dữ liệu & Thực thể
- Trường mới cần thêm: kiểu dữ liệu, bắt buộc hay tuỳ chọn, giá trị mặc định?
- Enum / tập giá trị mới: danh sách đầy đủ? Có thể mở rộng thêm sau không?
- Dữ liệu lịch sử cần xử lý thế nào sau khi thay đổi?

### 4C. Câu hỏi Quy trình & Logic Nghiệp vụ
- Quy trình TO-BE chi tiết từng bước: ai làm gì, điều kiện gì, kết quả gì?
- Điều kiện trigger: khi nào chức năng mới được kích hoạt?
- Xử lý ngoại lệ & edge case: tình huống nào không đi theo luồng chuẩn?

### 4D. Câu hỏi Công thức & Rule Tính Toán
- Công thức tính, logic phân loại, điều kiện rẽ nhánh?
- Rule validate: giá trị tối thiểu/tối đa, format, ràng buộc chéo giữa các trường?

### 4E. Câu hỏi Quy định & Phân Quyền
- Ai có quyền thực hiện chức năng thay đổi? RBAC thay đổi thế nào?
- Quy định nội bộ / pháp lý nào cần tuân thủ sau thay đổi?
- Audit log: hành động nào cần ghi lại, ghi gì, xem được bởi ai?

### 4F. Thu thập Artifacts liên quan
- Biểu mẫu / báo cáo / template bị ảnh hưởng bởi thay đổi → **xin mẫu thực tế**.
- Màn hình / dashboard cần cập nhật → xin ảnh chụp hiện tại (nếu có).

---

## BƯỚC 5 — Tạo File Tracking Câu Hỏi Cho Change Request

Agent tạo **1 file tracking duy nhất** theo chuẩn `ba-elicitation-qna-gen`:

- **Đường dẫn:** `Docs-BA/Elicitation/Change request/QA_Tracking_[slug_CR]_[YYYYMMDD].md`
- **Cơ chế:** Incremental Update — tạo file với phần đầu tiên, append từng phần tiếp theo.

### Template file tracking CR

```markdown
# Tracking Câu Hỏi: [Tên Change Request]

**Ngày tạo:** YYYY-MM-DD
**Liên kết CR:** [CR_[slug]_[YYYYMMDD].md]
**Stakeholder:** [Tên / Bộ phận yêu cầu]
**Phạm vi:** [Module / Chức năng bị ảnh hưởng]

---

## 🔎 Tóm Tắt Khoảng Trống (từ Impact Analysis)
> **Yêu cầu thay đổi:** [1 câu mô tả]
> **Khoảng trống cần làm rõ:** [2–3 vùng chính]
> **Rủi ro nếu bỏ qua:** [Điều gì có thể sai nếu không hỏi kỹ]

---

## PHẦN A: LÝ DO & MỤC TIÊU THAY ĐỔI
| ID | Câu hỏi | Loại | Ưu tiên | Status |
|:--|:--|:--|:--|:--:|
| CR-A1 | ... | XÁC NHẬN / KHÁM PHÁ | 🔴/🟡 | ⬜ |

## PHẦN B: DỮ LIỆU & THỰC THỂ
| ID | Câu hỏi | Loại | Ưu tiên | Status |
|:--|:--|:--|:--|:--:|
| CR-B1 | ... | | | ⬜ |

## PHẦN C: QUY TRÌNH & LOGIC NGHIỆP VỤ
| ID | Câu hỏi | Loại | Ưu tiên | Status |
|:--|:--|:--|:--|:--:|
| CR-C1 | ... | | | ⬜ |

## PHẦN D: CÔNG THỨC & RULE TÍNH TOÁN
| ID | Câu hỏi | Loại | Ưu tiên | Status |
|:--|:--|:--|:--|:--:|
| CR-D1 | ... | | | ⬜ |

## PHẦN E: QUY ĐỊNH & PHÂN QUYỀN
| ID | Câu hỏi | Loại | Ưu tiên | Status |
|:--|:--|:--|:--|:--:|
| CR-E1 | ... | | | ⬜ |

## PHẦN F: ARTIFACTS CẦN THU THẬP
| ID | Loại Artifact | Câu hỏi xin mẫu | Ưu tiên | Status |
|:--|:--|:--|:--|:--:|
| CR-F1 | | | | ⬜ |

---

*Ghi chú: ⬜ = Chờ xác nhận | ✅ = Đã xác nhận | 🔴 = Bắt buộc làm rõ | 🟡 = Cần xác nhận*

## 📋 Changelog
| Ngày | Hành động | Nội dung tóm tắt |
|:--|:--|:--|
| YYYY-MM-DD | Tạo file | Sinh câu hỏi từ Impact Analysis CR [slug] |
```

---

## BƯỚC 6 — Tổng Kết & Chuyển Giao

Agent tạo báo cáo tổng kết ngay trong chat:

```
✅ ĐÃ HOÀN THÀNH IMPACT ANALYSIS:
  - File CR:          Docs-BA/Elicitation/Change request/CR_[slug]_[YYYYMMDD].md
  - File Draft:       Docs-BA/Elicitation/Change request/CR_Draft_Impact_[slug]_[YYYYMMDD].md
  - Danh sách A/M/D: [N] chức năng thay đổi (đã confirm)

❓ BỘ CÂU HỎI LÀM RÕ:
  - File Tracking:    Docs-BA/Elicitation/Change request/QA_Tracking_[slug]_[YYYYMMDD].md
  - Tổng số câu hỏi: [N] câu ([🔴 bắt buộc] / [🟡 cần xác nhận])
  - Phân bổ: A([n]) | B([n]) | C([n]) | D([n]) | E([n]) | F([n])

➡️ GỢI Ý BUỔI LÀM VIỆC VỚI STAKEHOLDER:
  Ưu tiên làm rõ (🔴): [Top 3 câu hỏi quan trọng nhất có ID]
```

---

## Ghi Chú Vận Hành

- **Luồng chuẩn**: Bước 1 → 2 → 3 → 4 → 5 → 6. Không bỏ bước, không đảo thứ tự.
- **Incremental Update**: Tất cả file đều được ghi từng phần nhỏ — không ghi toàn bộ 1 lần để tránh lỗi ngắt quãng.
- **Phân biệt scope**: Câu hỏi trong workflow này **tập trung vào CR cụ thể**, không phải elicitation toàn bộ hệ thống — giữ đúng ngữ cảnh thay đổi.
- **Truy vết**: Mọi câu hỏi đều có ID (`CR-[phần][số]`) để dễ dàng tham chiếu trong bước confirm với Stakeholder.
- **Tích hợp sau này**: File Tracking này có thể được dùng làm đầu vào cho workflow `ba-elicitation-process` nếu CR phát triển thành một module yêu cầu mới hoàn toàn.
