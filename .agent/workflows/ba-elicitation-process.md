---
description: "A closed-loop requirement elicitation process: intake, update tracking, and Q&A generation."
---

# Workflow: BA Elicitation Process (Khép Kín)

> **Mục tiêu:** Biến kết quả buổi họp/transcript thành bộ câu hỏi làm rõ thông minh, có truy vết đầy đủ.  
> **Nguyên tắc vàng:** Update trước → Phân tích khoảng trống → Sinh câu hỏi làm rõ → Ghi changelog.

---

## BƯỚC 1 — Nhận Input từ User

Agent hỏi User để xác định đầu vào:

- **Nguồn input** là gì?
  - `[A]` File đính kèm (meeting notes, transcript, tài liệu stakeholder)
  - `[B]` Nội dung chat trực tiếp (User paste vào cửa sổ chat)
- **Phạm vi cập nhật**: Thuộc dự án nào? Liên quan module/nghiệp vụ gì?
- **File question tracking** đang dùng cho dự án này (trong `Elicitation/listQA/`) để Agent định vị đúng file.

> ⚠️ Nếu User không cung cấp đủ thông tin, Agent **BẮT BUỘC hỏi lại** trước khi tiếp tục.

---

## BƯỚC 2 — Cập Nhật Kết Quả Khơi Gợi

**Kích hoạt Skill:** `ba-elicitation-result-update`

Agent thực hiện theo đúng quy trình của skill:

1. Phân tích input → Xác định thông tin nào đã được Stakeholder xác nhận (Ground Truth).
2. Quét tất cả file tracking `Elicitation/listQA/*.md` → Xác định các file liên quan đến nội dung input.
3. Với mỗi ý đã xác nhận:
   - Đổi `⬜` → `✅`.
   - Ghi kết quả thực tế vào cột "Câu trả lời tham khảo/kết quả".
4. Đồng bộ kiến thức mới vào `Elicitation/summary.md` (hoặc file summary nghiệp vụ tương ứng).
5. Lưu lịch sử tóm tắt vào `Elicitation/history/YYYYMMDD_[tên]_[chủ_đề].md`.

> ✅ **Hoàn thành Bước 2** khi: Tất cả file tracking và summary đã được cập nhật.

---

## BƯỚC 3 — Phân Tích Câu Trả Lời & Xác Định Câu Cần Làm Rõ

> Đây là bước phân tích trung gian, Agent tự thực hiện trước khi kích hoạt skill sinh câu hỏi.

Agent thực hiện:

1. **Rà soát các câu trả lời vừa cập nhật** — Phân loại từng câu trả lời theo 3 nhóm:

   | Nhóm | Mô tả | Hành động |
   |:--|:--|:--|
   | 🟢 **Rõ ràng** | Đầy đủ Input/Output/Logic | Giữ nguyên ✅ |
   | 🟡 **Chưa đủ** | Có thông tin nhưng còn mơ hồ, thiếu chi tiết | Sinh câu hỏi **làm rõ (Follow-up)** |
   | 🔴 **Chưa có** | Vẫn còn ⬜ sau khi đối chiếu | Sinh câu hỏi **bổ sung mới (New)** |

2. **Ghi nhanh danh sách** các ID câu hỏi cần xử lý (🟡 và 🔴) → Đây là đầu vào cho Bước 4.

---

## BƯỚC 4 — Sinh Câu Hỏi Làm Rõ & Bổ Sung

**Kích hoạt Skill:** `ba-elicitation-qna-gen`

Agent thực hiện với **2 loại câu hỏi**:

### 4A. Câu hỏi Làm Rõ (Follow-up / Drill-down)
- **Đối tượng:** Nhóm 🟡 từ Bước 3 (câu đã trả lời nhưng chưa đủ chi tiết).
- **Nguyên tắc:** Đặt câu hỏi Xác Nhận, dạng: *"Anh/Chị đề cập [X], ý là [giả định cụ thể] đúng không? Nếu không, quy trình thực tế là...?"*
- Ưu tiên làm rõ: Dữ liệu Input/Output, điều kiện xử lý, ngoại lệ, công thức tính, quy định cần tuân thủ quyền hạn, xin các artifact liên quan thông tin quản lý hiện t.

### 4B. Câu hỏi Bổ Sung Mới (New Gap Questions)
- **Đối tượng:** Nhóm 🔴 từ Bước 3 (các câu vẫn ⬜ hoặc khoảng trống mới phát hiện).
- **Nguyên tắc:** Bám sát checklist `ba-elicitation-checklist.md`, tự research domain, đặt câu hỏi Xác Nhận thay vì hỏi mở.

### 4C. Lưu vào file tracking
- Các câu hỏi Follow-up được bổ sung trực tiếp vào **file tracking hiện có** của module tương ứng (không tạo file mới, trừ khi User yêu cầu).
- Format thêm vào: gắn tag `[FOLLOW-UP]` ở cột Mục hoặc ID câu hỏi để phân biệt với câu hỏi gốc.

---

## BƯỚC 5 — Ghi Changelog Vào File Câu Hỏi

> Đây là bước **BẮT BUỘC** để đảm bảo truy vết thay đổi.

Agent thêm (hoặc cập nhật) section `## 📋 Changelog` vào **cuối mỗi file tracking** đã chỉnh sửa:

```markdown
## 📋 Changelog

| Ngày       | Hành động                        | Nội dung tóm tắt                              |
|:-----------|:---------------------------------|:----------------------------------------------|
| YYYY-MM-DD | Tạo file                         | Sinh câu hỏi khởi tạo từ BA research          |
| YYYY-MM-DD | Cập nhật từ [Tên source/meeting] | Xác nhận: [tóm tắt ngắn gọn các ý đã confirm] |
| YYYY-MM-DD | Bổ sung follow-up                | Thêm [N] câu hỏi làm rõ cho: [danh sách mục] |
| YYYY-MM-DD | Bổ sung câu hỏi mới              | Thêm [N] câu hỏi mới cho mục: [danh sách mục]|
```

> **Quy tắc Changelog:**  
> - Mỗi lần chạy workflow = 1 dòng changelog mới (không ghi đè dòng cũ).  
> - Tóm tắt nội dung phải đủ ngắn để đọc nhanh, nhưng đủ thông tin để hiểu *lúc nào, thêm gì*.

---

## BƯỚC 6 — Tổng Kết & Chuyển Giao

Agent tạo báo cáo tổng kết nhanh ngay trong chat (không cần tạo file riêng):

```
✅ ĐÃ CẬP NHẬT:
  - [N] câu hỏi được xác nhận (⬜ → ✅)
  - File tracking đã cập nhật: [danh sách file]
  - History: Elicitation/history/YYYYMMDD_...md

❓ CÂU HỎI MỚI SINH RA:
  - [N] câu hỏi làm rõ (Follow-up) cho: [danh sách mục]
  - [N] câu hỏi bổ sung mới cho: [danh sách mục]

📋 CHANGELOG đã ghi vào:
  - [danh sách file tracking đã có thêm dòng changelog]

➡️ GỢI Ý BUỔI TIẾP THEO:
  Ưu tiên làm rõ: [Top 3 mục quan trọng nhất còn 🟡/🔴]
```

---

## Ghi Chú

- **Tính nguyên tử**: Mỗi bước sử dụng đúng skill được chỉ định. Không trộn lẫn.
- **Incremental Update**: Cập nhật từng đoạn nhỏ, không ghi đè toàn bộ file lớn một lần.
- **Ground Truth**: Chỉ đánh dấu ✅ cho thông tin từ Stakeholder trực tiếp. Không ✅ từ file research của BA.
- **Changelog** là xương sống của truy vết — không được bỏ qua ngay cả khi ít thay đổi.