---
name: ba-stakeholder-doc-analysis
description: |
  Hỗ trợ Business Analyst đọc và phân tích tài liệu từ stakeholder một cách có hệ thống và toàn diện. Tự động extract các thông tin quan trọng gồm: quy trình nghiệp vụ E2E, danh sách stakeholder, quy định & chính sách, khái niệm & glossary, concept model (entity & quan hệ), pain point hiện tại, hệ thống tích hợp, ràng buộc, và danh sách câu hỏi cần clarify.

  Sử dụng skill này bất cứ khi nào BA nhận được tài liệu từ stakeholder và cần phân tích, khi người dùng nói "đọc tài liệu stakeholder", "phân tích tài liệu nghiệp vụ", "extract thông tin từ tài liệu", "tài liệu yêu cầu", "BA đọc tài liệu", "phân tích requirement từ tài liệu", "tài liệu từ khách hàng", "hiểu nghiệp vụ từ tài liệu". Luôn dùng skill này khi có tài liệu đầu vào từ stakeholder dù người dùng không nói rõ từ "skill".
---

<!-- Version: 1.0.0 -->
<!-- Author: M2MBA -->
<!-- Last Updated: 2026-04-06 -->
<!-- Description: Skill hỗ trợ BA đọc và phân tích tài liệu stakeholder theo framework 8 nhóm thông tin cốt lõi, output ra bản phân tích có cấu trúc sẵn sàng dùng để viết BRD/SRS hoặc chuẩn bị buổi họp tiếp theo. -->

# BA Stakeholder Document Analysis Skill

---

## Bước 0 — Xác định đầu vào

Trước khi phân tích, xác định:
- **Loại tài liệu**: Email / Word / PDF / Excel / Swagger / PowerPoint / Ghi chú họp / Ảnh chụp màn hình
- **Nguồn gốc**: Stakeholder nội bộ / đối tác / khách hàng / quy định nhà nước
- **Ngôn ngữ & domain**: Tài chính / Y tế / Logistics / HR / ERP...

> ⚠️ Nếu tài liệu chưa được cung cấp, hỏi người dùng paste nội dung vào trước khi tiếp tục.

---

## Bước 1 — Quick Scan (Đọc lướt)

Đọc toàn bộ tài liệu một lượt để:
- Xác định **chủ đề chính** của tài liệu
- Nhận diện **cấu trúc**: có mục lục? có sơ đồ? có bảng biểu?
- Đánh dấu các **section quan trọng** cần đào sâu

---

## Bước 2 — Extract theo 8 nhóm thông tin cốt lõi

Nếu tài liệu **không đề cập** đến nhóm nào → ghi rõ: `⚠️ Không có thông tin — cần hỏi thêm`

---

### 🎯 Nhóm 1: Mục tiêu & Bối cảnh
- Business goal của dự án / chức năng là gì?
- KPI hoặc kết quả kỳ vọng?
- Lý do cần làm (trigger)?
- Scope: trong / ngoài phạm vi?

---

### 🔄 Nhóm 2: Quy trình nghiệp vụ (Business Process)
- Luồng E2E từ bước đầu đến bước cuối
- Actor + action ở từng bước
- Điểm handoff giữa các bộ phận / hệ thống
- Luồng ngoại lệ (exception flow) nếu có
- Bước nào thủ công / bước nào tự động?

> Output gợi ý: trình bày dạng bảng (Bước | Actor | Hành động | Ghi chú)

---

### 👥 Nhóm 3: Stakeholder liên quan
- Danh sách đầy đủ các bên tham gia (người dùng, phê duyệt, vận hành, IT...)
- Role & trách nhiệm từng bên
- Ai là decision maker?
- Ma trận RACI sơ bộ nếu đủ thông tin

---

### 📜 Nhóm 4: Quy định, Chính sách & Tuân thủ
- Chính sách nội bộ cần tuân theo?
- Quy định pháp lý / nghị định / thông tư liên quan?
- Tiêu chuẩn ngành (ISO, PCI-DSS, HIPAA, Basel...)?
- SLA / OLA cam kết dịch vụ?
- Business invariants (quy tắc nghiệp vụ bất biến)?

---

### 📖 Nhóm 5: Glossary (Thuật ngữ quan trọng)
- Liệt kê thuật ngữ domain-specific xuất hiện trong tài liệu
- Định nghĩa theo ngữ cảnh tài liệu
- Đánh dấu thuật ngữ **dễ nhầm lẫn** hoặc **chưa được định nghĩa rõ**
- Gợi ý tên chuẩn hóa nếu cần

---

### 🗂️ Nhóm 6: Concept Model (Domain Model sơ bộ)
- Các **entity chính** (đối tượng nghiệp vụ quan trọng)
- **Thuộc tính cốt lõi** của từng entity
- **Quan hệ** giữa các entity (1-1, 1-N, N-N)
- Phân biệt entity vs. trạng thái (status/state)

> Output gợi ý: ERD text hoặc Mermaid ER diagram

---

### 😣 Nhóm 7: Pain Point & Hệ thống hiện tại
- Vấn đề / bất cập hiện tại là gì?
- Đang làm thủ công ở đâu? Tốn thời gian / dễ sai ở chỗ nào?
- Hệ thống đang dùng là gì? (Excel, phần mềm A, B...)
- Tích hợp nào đang có / cần có?
- Dữ liệu từ đâu vào, đi đâu ra?

---

### 🚧 Nhóm 8: Ràng buộc & Giả định
- **Constraint**: Deadline, ngân sách, tech stack, nhân sự hạn chế
- **Assumption**: BA đang giả định gì mà chưa được confirm?
- **Dependency**: Phụ thuộc vào team / hệ thống / bên nào khác?
- **Risk**: Rủi ro tiềm ẩn cần theo dõi?

---

## Bước 3 — Danh sách câu hỏi cần clarify

Tổng hợp câu hỏi cần hỏi lại stakeholder, phân loại theo mức độ ưu tiên:

| Mức độ | Ký hiệu | Ý nghĩa |
|--------|---------|---------|
| Cao | 🔴 | Blockers — chưa rõ thì không thể tiếp tục |
| Trung bình | 🟡 | Cần biết trước khi thiết kế |
| Thấp | 🟢 | Nice-to-know, có thể hỏi sau |

Với mỗi câu hỏi, ghi rõ:
- **Câu hỏi**: Nội dung cụ thể
- **Lý do hỏi**: Tại sao thông tin này quan trọng
- **Gợi ý nguồn hỏi**: Hỏi ai / ở đâu

---

## Bước 4 — Output tổng hợp

Lưu kết quả vào file theo đường dẫn:
`docs-BA/ba-stakeholder-doc-analysis/ba-stakeholder-[tên-tài-liệu]-analysis.md`

Trình bày theo format:

```
# 📄 Phân tích tài liệu: [Tên tài liệu]
**Ngày phân tích**: [Date]
**Loại tài liệu**: [Loại]
**BA phân tích**: [Tên nếu có]

---
## TÓM TẮT NHANH (Executive Summary)
[2-3 câu mô tả: về cái gì, ai liên quan, mục tiêu chính]

---
## 1. Mục tiêu & Bối cảnh
...

## 2. Quy trình nghiệp vụ
...

## 3. Stakeholder
...

## 4. Quy định & Chính sách
...

## 5. Glossary
...

## 6. Concept Model
...

## 7. Pain Point & Hệ thống hiện tại
...

## 8. Ràng buộc & Giả định
...

---
## ❓ DANH SÁCH CÂU HỎI CẦN CLARIFY
[Bảng câu hỏi ưu tiên]

---
## 📌 BƯỚC TIẾP THEO GỢI Ý
[Gợi ý 3-5 hành động tiếp theo cho BA]
```

---

## Nguyên tắc khi phân tích

1. **Không suy diễn quá mức** — Chỉ extract những gì có trong tài liệu; đánh dấu rõ khi nào là suy luận của BA
2. **Ưu tiên ngôn ngữ của stakeholder** — Giữ nguyên thuật ngữ domain, không tự ý đổi tên
3. **Phân biệt "what" vs "how"** — Stakeholder nói "what", BA không áp đặt "how"
4. **Highlight mâu thuẫn** — Nếu thông tin mâu thuẫn trong tài liệu, đánh dấu rõ ràng
5. **Completeness check** — Sau khi phân tích, tự hỏi: "Còn thiếu gì để viết được BRD?"

---

## Xử lý tài liệu đặc thù

| Loại tài liệu | Hướng xử lý |
|---------------|-------------|
| **Email** | Focus vào implicit request, context đằng sau, tone, commitment/deadline |
| **SOP / Quy trình AS-IS** | Vẽ lại luồng hiện tại; tìm bước "thủ công/Excel" → cơ hội tự động hóa |
| **Swagger / OpenAPI** | Tham chiếu skill `ba-integration-spec` để phân tích chi tiết hơn |
| **Biên bản họp** | Tham chiếu skill `meeting_summarizer` để tổng hợp |
| **Thông tư / Nghị định** | Focus điều khoản bắt buộc (mandatory) vs khuyến nghị; ghi số điều/khoản để trace back; extract deadline tuân thủ |

---

## Tips nâng cao

- Dùng **Concept Model** làm nền để vẽ ERD chi tiết hơn (skill `ba-erd-gen`)
- Dùng **Danh sách câu hỏi** để chuẩn bị agenda cho buổi clarification tiếp theo
- **Glossary** nên được maintain trong một file chung cho cả dự án
- So sánh tài liệu stakeholder với tài liệu cũ (nếu có) để tìm **delta / thay đổi**
