---
name: ba-data-system-questioning
description: "Hỗ trợ Business Analyst tạo bộ câu hỏi khơi gợi yêu cầu chuyên sâu cho các dự án hệ thống dữ liệu (DWH, BI, Analytics, ETL)."
---

# HƯỚNG DẪN SKILL: BA DATA SYSTEM QUESTIONING

**Version:** 1.1.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Hỗ trợ Business Analyst tạo bộ câu hỏi khơi gợi yêu cầu chuyên sâu cho các dự án hệ thống dữ liệu gồm Data Warehouse, BI/Reporting, Analytics, Data Pipeline, Dashboard, ETL, Data Platform.

> **Tại sao cần skill riêng?** Hệ thống data khác hệ thống nghiệp vụ: yêu cầu không nằm ở "người dùng làm gì" mà nằm ở "số liệu được tính thế nào". Một câu hỏi bị bỏ sót về định nghĩa metric có thể dẫn đến toàn bộ dashboard sai mà không ai phát hiện trong nhiều tháng.

---

## 📁 Cấu trúc resources

| File | Phạm vi | Khi nào load |
|------|---------|-------------|
| `resources/ref-discovery-questions.md` | **Tầng 0–3.5**: Nguyên nhân gốc rễ → Data Source → Business Logic → Data Lineage → Quy trình nghiệp vụ | **Luôn load** — đây là lõi của skill |
| `resources/ref-delivery-questions.md` | **Tầng 4–6**: Output/Báo cáo → Phân tích → Vận hành → Tích hợp → Tăng trưởng → Rebuild | Load thêm khi cần output/ops |

---

## 🎯 Nguyên tắc cốt lõi

1. **Ưu tiên Tầng 0 và Tầng 2 trước** — không hiểu "tại sao" và "tính thế nào" thì mọi thứ phía sau là phỏng đoán.
2. **Xin artifact ngay** — file Excel/báo cáo Word hiện tại thường chứa 80% yêu cầu thực tế.
3. **Hỏi bằng ví dụ số cụ thể** — *"Nếu tháng này doanh thu là 100 triệu, con số đó được tính từ những giao dịch nào?"* — lộ ra logic ẩn hiệu quả hơn câu hỏi trừu tượng.
4. **Không dừng lại ở câu trả lời bằng lời** — hỏi đến khi stakeholder chỉ vào con số thực tế và giải thích từng bước tính.
5. **Phân biệt "muốn có" vs "cần có"** — *"Nếu chỉ có 3 con số trên dashboard, anh/chị chọn cái nào?"*

---

## 🚀 Quy trình thực thi

### BƯỚC 1: Nhận diện loại hệ thống

| Loại | Dấu hiệu | Nhóm ưu tiên trong ref-discovery |
|------|----------|----------------------------------|
| **BI / Dashboard** | "dashboard", "báo cáo", "KPI", "visualize" | Tầng 0, 2, 3.5c + ref-delivery Tầng 4 |
| **Data Warehouse** | "kho dữ liệu", "tích hợp nhiều nguồn", "lịch sử" | Tầng 0, 1 toàn bộ, 2, 3 |
| **Data Pipeline / ETL** | "pipeline", "đồng bộ", "đẩy dữ liệu" | Tầng 0, 1a, 3 + ref-delivery Tầng 5c, 5d |
| **Analytics / Reporting** | "phân tích", "insight", "báo cáo định kỳ" | Tầng 0, 1, 2 + ref-delivery Tầng 4, 5a |
| **Compliance / Regulatory** | "quy định", "audit", "nộp báo cáo", "CORSIA" | Tất cả Tầng 0–3.5 + ref-delivery 5b đặc biệt kỹ |
| **Rebuild / Migration** | "hệ thống cũ", "làm lại", "nâng cấp" | Tất cả + ref-delivery Tầng 6b |

### BƯỚC 2: Load reference đúng phạm vi

```
Luôn đọc: resources/ref-discovery-questions.md
Đọc thêm nếu cần output/vận hành: resources/ref-delivery-questions.md
```

### BƯỚC 3: Phân tích bối cảnh (ghi vào section 🔎 Phân tích sơ bộ)

- Xác định **loại hệ thống** (Bước 1).
- Xác định **các metric/KPI** stakeholder đã đề cập (dù mơ hồ).
- Xác định **nguồn dữ liệu** được nhắc đến.
- Phác thảo **Ambiguity Zones** — vùng định nghĩa chưa rõ, nhiều khả năng gây tranh luận.
- Liệt kê **artifact cần xin trước buổi họp**: File Excel/báo cáo đang dùng, mẫu report, query/code hệ thống cũ (nếu Rebuild).

### BƯỚC 4: Sinh câu hỏi từ reference theo thứ tự ưu tiên

Thứ tự ưu tiên: **Tầng 0 → Tầng 1 (1a→1e) → Tầng 2 → Tầng 3 → Tầng 3.5 → Tầng 4 → Tầng 5 → Tầng 6**

Với mỗi nhóm, chọn **3–7 câu hỏi** phù hợp ngữ cảnh dự án (không cần hỏi tất cả).

### BƯỚC 5: Lưu file (Incremental Update)

- **Đường dẫn:** `docs-BA/Elicitation/listQA/questions_data_YYYYMMDD_[tênDựÁn].md`
- **Cơ chế Incremental:** Append từng tầng câu hỏi vào file — không tạo toàn bộ một lần.

---

## � Kỹ thuật hỏi hiệu quả

**"Tính tay cùng tôi"** — Thay vì "công thức là gì?", hãy nói:
> *"Anh/chị mở file ra, mình cùng tính con số tháng trước từ đầu — bước đầu tiên mình lọc những dòng nào?"*

**"Tại sao hai số này khác nhau?"** — Khi có hai báo cáo cho cùng metric:
> *"Báo cáo A ra 100 triệu, báo cáo B ra 105 triệu — mình cùng tìm 5 triệu chênh đó đến từ đâu nhé?"*

**"Cho tôi xem exception"** — Lộ business rule quan trọng nhất:
> *"Có record nào trong lịch sử mà kết quả tính ra khác với kỳ vọng không? Mình cùng xem tại sao?"*

---

## ⚠️ Dấu hiệu chưa đủ thông tin — cần hỏi thêm

| Stakeholder nói | Vấn đề | Hỏi lại |
|-----------------|--------|---------|
| "Cứ lấy tất cả rồi tính" | Chưa rõ filter/exclusion | "Có giao dịch nào KHÔNG tính vào không?" |
| "Giống như hệ thống cũ" | Logic ẩn trong hệ thống cũ | "Mình có thể xem query/code của hệ thống cũ không?" |
| "Team kỹ thuật biết" | BA chưa nắm business logic | "Anh/chị giải thích mà không nhắc đến kỹ thuật được không?" |
| "Thường thường là..." | Logic không nhất quán | "Khi KHÔNG 'thường thường', xử lý thế nào?" |
| "Số ra đúng thì được" | Không có tiêu chí kiểm tra | "Đúng là so với đâu? Làm sao biết đúng?" |
| Mô tả chung chung bằng lời | Thiếu precision | "Anh/chị tính thử một ví dụ thực tế cho tôi xem được không?" |

---

## 📄 Format file output (Template bắt buộc)

```markdown
# Câu hỏi Data System: [Tên dự án]
**Ngày tạo:** YYYY-MM-DD | **Loại hệ thống:** [BI/DWH/Pipeline/Analytics/Compliance/Rebuild]

## 🔎 Phân tích sơ bộ
> **Loại hệ thống:** [Xác định ở Bước 1]
> **Metric chính đã đề cập:** [Liệt kê — dù còn mơ hồ]
> **Nguồn dữ liệu đã biết:** [Liệt kê]
> **Ambiguity Zones:** [Vùng định nghĩa chưa rõ, dễ tranh luận]
> **Rủi ro cao nhất:** [Ví dụ: Metric mơ hồ? Freshness kỳ vọng cao? Compliance deadline?]
> **Artifact cần xin trước:** [File Excel/báo cáo/query/code hệ thống cũ]

---

## ❓ Bộ câu hỏi phỏng vấn stakeholder

### 🌱 Tầng 0 — Nguyên nhân gốc rễ & Bối cảnh dự án
| # | Câu hỏi | Lý do hỏi |
|---|---------|-----------|

### �️ Tầng 1 — Data Source & Data Discovery
#### 1a: Kiểm kê nguồn & Xin artifact
#### 1b: Cấu trúc Excel/File *(nếu applicable)*
#### 1c: Cấu trúc Database *(nếu applicable)*
#### 1d: Data Profiling — chất lượng thực tế
#### 1e: Mapping — trường nào dùng để tính gì

### 📐 Tầng 2 — Công thức & Business Logic ⭐
### ✅ Tầng 2b — Kiểm chứng bằng số thực
### 🗺️ Tầng 3 — Data Lineage
### 🔁 Tầng 3.5 — Quy trình nghiệp vụ xung quanh data

### 📋 Tầng 4 — Output & Nhu cầu người dùng *(từ ref-delivery)*
### ⏱️ Tầng 5 — Vận hành & Kỹ thuật *(từ ref-delivery)*
### 🔄 Tầng 6 — Rebuild *(từ ref-delivery, nếu applicable)*

---

## 💡 Lưu ý khi phỏng vấn
> [2–3 tip cụ thể cho dự án này: artifact cần xin, ai nên phỏng vấn riêng, rủi ro đặc thù, câu hỏi vàng cần đặt]
```
