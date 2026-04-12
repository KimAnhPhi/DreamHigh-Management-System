---
name: ba-process-proposal
description: "Skill dùng để phân tích định hướng và thiết kế quy trình đề xuất (TO-BE) dựa trên phân tích AS-IS."
---

# HƯỚNG DẪN SKILL: BA PROCESS PROPOSAL

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Phân tích định hướng và đưa ra quy trình đề xuất (TO-BE) dựa trên phân tích AS-IS. Đầu ra bao gồm bảng so sánh, bảng quy trình 6 cột và các yếu tố cấu thành.

Bạn là một Business Analyst chuyên nghiệp. Người dùng muốn bắt đầu quá trình phân tích tương lai và đưa ra thiết kế quy trình TO-BE từ kết quả phân tích quy trình AS-IS.

> **Cảnh báo (Incremental Update):** Đây là quá trình sinh ra tài liệu dài. Phải sinh nội dung theo từng đoạn (segment) và phản hồi dần qua từng bước. Tuyệt đối không tạo file tổng với dung lượng lớn trong một lần phản hồi để tránh tình trạng lỗi ngắt quãng.

## CẤU TRÚC LƯU TRỮ VÀ TÊN FILE
Tất cả phân tích TO-BE bắt buộc phải ghi vào file có cấu trúc tên và thư mục sau:
- Thư mục lưu: `docs-BA/Processs/[Tên Quy Trình]/` (Lưu ý: "Processs" viết với 3 chữ 's')
- Tên file lưu: `[tên_quy_trình]_to_be.md`
Nếu thư mục chưa tồn tại, Agent phải tạo thư mục trước khi ghi tập tin.

---

## CẤU TRÚC FILE OUTPUT STANDARD

File MD được sinh ra phải bám sát cấu trúc dưới đây. Vui lòng sinh ra chính xác các heading và placeholder để bạn hoặc User có thể điền dần:

# Phân tích đề xuất & Thiết kế quy trình TO-BE: [Tên quy trình]

## 1. Phân tích định hướng & Tác động

**(Lưu ý Agent: Cần đặt câu hỏi với người dùng (BA/Stakeholder) trên giao diện chat hoặc sử dụng thông tin từ file input/context nếu có để điền vào phần này, thay vì tự bịa số liệu).**

### 1.1. Định hướng kinh doanh
- **Mục tiêu trong thời gian tới:** [Điền mục tiêu kinh doanh, ví dụ 6-12 tháng tới]
- **Thay đổi đối với mô hình kinh doanh:** [Có kế hoạch mở rộng hay thay đổi nào không?]
- **Chiến lược, Hiệu quả mong đợi:** [Kỳ vọng về tăng trưởng, giảm lãng phí, hiệu suất]

### 1.2. Định hướng sản phẩm / Chuyển đổi số
- **Chuyển đổi số:** [Mức độ ưu tiên để tự động hóa/chuyển đổi số]
- **Công nghệ mới áp dụng:** [AI, IoT, Hệ thống CRM/ERP mới...]
- **Tích hợp:** [Các hệ thống dự kiến sẽ liên kết/tích hợp]

### 1.3. Năng lực, Ngân sách và Tuân thủ (Compliance)
- **Năng lực tổ chức:** [Số lượng nhân sự dự kiến, kỹ năng cần có, kế hoạch đào tạo]
- **Ngân sách:** [Dự trù hoặc ràng buộc về kinh phí triển khai]
- **Compliance & Bảo mật:** [Yêu cầu về kiểm toán (audit trail), bảo mật dữ liệu, tuân thủ PCI-DSS, GDPR...]

### 1.4. Yếu tố ảnh hưởng & Roadmap
- **Mức độ ưu tiên:**
  - Cao (Cần ngay): [Yếu tố 1], [Yếu tố 2]
  - Trung bình: [Yếu tố 3]
  - Thấp: [Yếu tố 4]
- **Roadmap triển khai (Dự kiến):**
  - Giai đoạn 1: [Mục tiêu ngắn hạn, ROI nhanh]
  - Giai đoạn 2: [Cải tiến tiếp theo]
  - Giai đoạn 3: [Định hướng dài hạn]

---

## 2. Bảng So sánh AS-IS và TO-BE

Lập bảng so sánh, nêu bật sự khác biệt giữa hiện tại và tương lai.

| Hạng mục / Tiêu chí | Quy trình AS-IS | Quy trình TO-BE | Lợi ích / Cải tiến |
|---------------------|-----------------|-----------------|--------------------|
| [Tiêu chí 1] | [Thực trạng] | [Đề xuất TO-BE] | [Lợi ích mang lại] |
| [Tiêu chí 2] | [Thực trạng] | [Đề xuất TO-BE] | [Lợi ích mang lại] |

---

## 3. Thiết kế quy trình TO-BE

### 3.1. Lưu đồ BPMN (Placeholder)

*Mặc định tạo placeholder cho hình ảnh lưu đồ BPMN. Khi được approve, cần sử dụng tính năng tạo BPMN để xuất file SVG kèm XML.*

![Lưu đồ TO-BE]([tên-quy-trình]-to-be.svg)

*Lưu ý: Mã nguồn lưu đồ được đính kèm ở file `[tên-quy-trình]-to-be.bpmn` dùng cho các chỉnh sửa tiếp theo.*

### 3.2. Bảng mô tả chi tiết các bước quy trình 6 cột

| Bước | Người thực hiện | Tên bước | Thủ công / Hệ thống | Mô tả chi tiết | Ràng buộc |
|------|----------------|----------|-------------------|----------------|-----------|
| 1 | [Actor] | [Tên bước] | [Thủ công / Hệ thống] | [Giải thích ngắn gọn cách bước thao tác diễn ra trên quy trình TO-BE] | [Điều kiện, rule, validation] |
| 2 | [Actor] | [Tên bước] | [Thủ công / Hệ thống] | [...] | [...] |

---

## QUY TRÌNH THỰC HIỆN CỦA AGENT (WORKFLOW)

Để đảm bảo chất lượng, khi kích hoạt Skill, Agent cần thực hiện tuần tự như sau:
1. **Khảo sát:** Đặt một số câu hỏi (chia nhỏ không quá 3 câu một lúc) để lấy key inputs cho phần `Định hướng kinh doanh`, `Ngân sách & Compliance`.
2. **Thiết kế sơ bộ:** Khi có đủ thông tin, Agent sẽ sinh bảng so sánh `AS-IS vs TO-BE` và bảng `6 cột` và yêu cầu người dùng xác nhận.
3. **Draft tài liệu (Phần 1):** Sinh ra phần nội dung markdown của tài liệu vào file đầu ra và báo cáo kết quả tiến độ (Incremental Update).
4. **Draft BPMN (Placeholder) (Phần 2):** Bổ sung phần thiết kế TO-BE với cấu trúc chuẩn. Nếu BA yêu cầu sinh XML/SVG, Agent sẽ chuyển sang sinh XML/SVG từ bảng thiết kế và link về tài liệu.
