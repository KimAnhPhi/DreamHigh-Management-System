---
name: ba-elicitation-result-update
description: "Chuyên trách cập nhật kết quả khơi gợi yêu cầu từ Meeting Notes hoặc Stakeholder files."
---

# HƯỚNG DẪN SKILL: CẬP NHẬT KẾT QUẢ KHƠI GỢI YÊU CẦU

**Version:** 1.3.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Chuyên trách cập nhật kết quả khơi gợi yêu cầu từ Meeting Notes hoặc Stakeholder files.

## 🎯 Mục đích
Xử lý thông tin mới từ BA cung cấp để cập nhật trạng thái đã làm rõ của các yêu cầu.
**Atomic**: Chỉ cập nhật kết quả, không sinh câu hỏi mới.

## 📋 Nguyên tắc
1. **Đọc hiểu chi tiết**: Phân tích Input (Meeting notes, tài liệu từ stakeholder) để trích xuất Input/Output, Process, Công thức.
2. **Xác thực Nguồn (Ground Truth)**: Chỉ cập nhật ✅ vào Tracking khi input là kết quả làm việc trực tiếp với Stakeholder. **⚠️ TUYỆT ĐỐI KHÔNG** cập nhật ✅ dựa trên "File tìm hiểu Domain" của BA.
3. **Nhận diện Module**: Phải xác định thông tin thuộc nhóm nghiệp vụ nào (Bán hàng, Mua hàng, Kho, Tổng quan...).
4. **Cập nhật Thông minh**: Tìm đúng file tracking tương ứng trong `docs-BA/Elicitation/listQA/` để update. Nếu thông tin liên quan đến nhiều module, cập nhật vào tất cả các file liên quan.
5. **Đồng bộ Summary**: Cập nhật kiến thức mới vào các file summary nghiệp vụ tương ứng trong `docs-BA/Elicitation/`.
6. **Viết History như Tài liệu Vận hành**: File history KHÔNG phải bảng tick "đúng/sai". Phải viết như tài liệu mô tả thực tế — người đọc hiểu ngay stakeholder đang làm gì / muốn làm gì mà không cần đọc lại transcript. Cụ thể:
   - Mô tả **quy trình theo bước dạng bảng** (theo dạng STT bước, Ai thực hiện, Thực hiện gì,Hệ thống thực hiện (Gmail/excel/phần mềm cũ...) Mô tả chi tiết, Thông tin dữ liệu đầu vào, Dữ liệu đầu ra, Tình huống phát sinh có thể có, Công thức/logic tính toán, Quy định/quy trình cần tuân thủ, Quyền hạn của stakeholder, Template/biểu mẫu đang dùng, Báo cáo đang xem, Dữ liệu trao đổi với bộ phận khác qua kênh nào)
   - Ghi rõ **con số/tham số cụ thể** (X ngày, Y triệu giới hạn, Z phút/giao dịch...)
   - Phân biệt rõ **Hiện trạng** (đang thực hiện thế nào) vs **Định hướng** (muốn hệ thống mới làm gì)
   - Tổng hợp **Pain Points** với mức độ ảnh hưởng (🔴/🟠/🟡) và đối tượng bị tác động
   - Liệt kê **tài liệu cần xin thêm** và **câu hỏi còn mở** kèm tên stakeholder cần follow-up
7. **Tag ngày cho câu hỏi mới/follow-up**: Khi bổ sung câu hỏi mới hoặc follow-up vào file tracking, **BẮT BUỘC** ghi ngày vào cột Mục theo ký hiệu chuẩn: `[FOLLOW-UP · YYYY-MM-DD]`. Ví dụ: `[FOLLOW-UP · 2026-03-01]`. Giúp truy vết thời điểm bổ sung mà không cần thêm cột vào bảng.
8. **Incremental Update**: Cập nhật từng file theo từng đoạn nhỏ, không ghi đè toàn bộ file lớn một lần.

---

## 🚀 Quy trình
1. **Đọc Input**: Phân tích nội dung mới BA vừa cung cấp.
2. **Quét File Tracking**: Liệt kê tất cả file trong thư mục `docs-BA/Elicitation/listQA/` để xác định file cần cập nhật.
3. **Phân loại nội dung**: Xác định các ý trong input thuộc về module nào.
4. **Cập nhật từng file** *(Incremental – từng đoạn nhỏ)*:
   - Với mỗi ý, tìm file tracking của module tương ứng.
   - Chuyển ⬜ thành ✅ nếu thông tin đã đủ.
   - Ghi kết quả thực tế vào cột "Câu trả lời tham khảo/kết quả".
   - Với câu hỏi **Follow-up hoặc mới bổ sung**, dùng ký hiệu `[FOLLOW-UP · YYYY-MM-DD]` trong cột Mục.
5. **Lưu lịch sử**: Tạo file `docs-BA/Elicitation/history/YYYYMMDD_[stakeholder]_[chu_de].md`. Viết theo định dạng **tài liệu vận hành thực tế** (xem Nguyên tắc #6), KHÔNG viết dạng bảng tick xác nhận.
6. **Cập nhật Summary**: Mỗi file summary tương ứng 1 nhóm nghiệp vụ (ví dụ: `YYYYMMDD_nghiep_vu_ban_hang_summary.md`), lưu tại `docs-BA/Elicitation/` (KHÔNG phải `history/`). Tự động tách thành nhiều file summary nếu file quá lớn. Luôn cập nhật file summary tương ứng sau mỗi lần có kết quả khơi gợi yêu cầu.

