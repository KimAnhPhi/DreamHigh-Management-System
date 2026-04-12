# PRD: [Tên sản phẩm / Feature]

**Version:** 1.0  
**Ngày tạo:** [DD/MM/YYYY]  
**PO/PM / BA:** [Tên người lập]  
**Status:** Draft  

---

## 1. Tổng quan (Overview)

### 1.1 Problem Statement
[Vấn đề gì đang xảy ra? Ai đang gặp vấn đề này? Tại sao cần giải quyết ngay?]

### 1.2 Product Vision
[Sản phẩm này sẽ là gì sau 1-2 năm? Mô tả bức tranh lớn.]

### 1.3 Mục tiêu (Goals)
- **Business goal:** [Mục tiêu kinh doanh]
- **User goal:** [Mục tiêu người dùng]
- **Non-goal:** [Những gì KHÔNG phải mục tiêu]

### 1.4 Success Metrics (KPIs)
| Metric | Baseline | Target | Thời hạn |
|--------|----------|--------|----------|
| [Metric 1] | [Hiện tại] | [Mục tiêu] | [Khi nào] |
| [Metric 2] | | | |
| [Metric 2] | | | |

---

## 2. Quy trình nghiệp vụ (Business Processes)

### 2.1 Hiện trạng (AS-IS Process)
* Tóm lược nhanh cách hệ thống/quy trình hiện tại hoạt động.
* **Pain points gốc rễ**: [Liệt kê các vấn đề lớn nhất ở quy trình cũ]
* Đính kèm Mermaid BPMN flow hoặc link: [Link tới file phân tích AS-IS]

### 2.2 Quy trình đề xuất (TO-BE Process)
* Sơ đồ Flow/BPMN quy trình mới (Mermaid.js).
* Giải thích ngắn gọn cách quy trình TO-BE giải quyết các pain points phía trên.

---

## 3. Stakeholders & Users

### 3.1 Stakeholders
| Vai trò | Tên/Team | Trách nhiệm |
|---------|----------|-------------|
| Product Owner | | Quyết định cuối về product |
| Tech Lead | | Đánh giá feasibility |
| /... | | |

### 3.2 Target Users / Personas
**Persona 1: [Tên]**
- **Mô tả:** [Ai là họ?]
- **Pain points:** [Họ đang gặp vấn đề gì?]
- **Goals:** [Họ muốn đạt được gì?]
- **Behavior:** [Họ thường làm gì?]

### 3.3 User Journey (Happy Path)
1. [Bước 1: Người dùng truy cập ứng dụng...]
2. [Bước 2: Tìm kiếm thông tin...]
3. [...]

---

## 4. Mô hình tổng quan sản phẩm (Product Overview Model)

![Mô hình tổng quan sản phẩm](assets/pms_infographic.png)
*Mô tả: Sơ đồ bối cảnh và các thành phần ứng dụng, đối tượng sử dụng của hệ thống được minh họa dưới dạng Infographic.*

| Tên thành phần | Ý nghĩa / Vai trò |
|----------------|-------------------|
| [Tên hệ thống/Actor] | [Mô tả chi tiết ý nghĩa hoặc vai trò trong hệ thống] |
| [Ví dụ: Admin] | [Người quản trị cấu hình hệ thống] |

---

## 5. Phạm vi dự án & Lộ trình (Scope & Roadmap)

### 4.1 Deployment Roadmap (Lộ trình triển khai tổng thể)
*Mô tả ngắn gọn các giai đoạn dự kiến của sản phẩm.*
| Phase | Tên giai đoạn / Mục tiêu chính | Thời gian dự kiến |
|-------|--------------------------------|-------------------|
| Phase 1 (MVP) | [Giá trị cốt lõi / Core features] | [Q1/202x] |
| Phase 2 | [Mở rộng tính năng nâng cao] | [Q2/202x] |
| Phase 3 | [Tích hợp hệ sinh thái...] | [Q3/202x] |

### 4.2 Triển khai trong Giai đoạn gần nhất (In-Scope - [Tên Phase])
*Các tính năng/module CHẮC CHẮN sẽ làm trong Phase này.*
- [Tính năng 1: Mô tả ngắn gọn giá trị mang lại]
- [Tính năng 2]
- [Tính năng N]

### 4.3 Những Hạng mục CHƯA Triển khai (Out-of-Scope & Postponed)
*Các hạng mục được cất vào backlog, không làm trong Phase này.*
| Tính năng/Hạng mục | Lý do hoãn (Nguyên nhân) | Dự kiến Phase tiếp theo |
|--------------------|---------------------------|-------------------------|
| [Ví dụ: Thanh toán VNPay] | Tốn thời gian làm việc đối tác pháp lý, MVP chưa ưu tiên | Phase 2 |
| [Ví dụ: Login bằng Apple] | Đối tượng persona hiện tại chủ yếu dùng Windows PC | Chưa rõ, Review sau |

### 4.4 Assumptions & Dependencies
- **Assumptions (Giả định):** [Giả định 1, Giả định 2...]
- **Dependencies (Phụ thuộc):** [Hệ thống / API thứ 3 / team bên ngoài cần có để dự án chạy]

---

## 6. Functional Requirements & Business Rules

> **Ưu tiên theo MoSCoW:** M = Must Have | S = Should Have | C = Could Have | W = Won't Have

### 5.1 [Epic/Module 1]

**Mô tả Epic:** [Mô tả ngắn gọn]

| ID | User Story | Acceptance Criteria | Priority |
|----|------------|---------------------|----------|
| FR-001 | As a [user], I want to [action] so that [benefit] | [Điều kiện để coi là done] | M |
| FR-002 | ... | ... | S |

**Business Rules & Workflows logic cho [Epic 1]:**
- *Tính toán:* [Công thức tính nếu có, ví dụ thuế, phí]
- *Validation cứng:* [Ràng buộc pháp lý, giới hạn ký tự, format data...]
- *Trạng thái:* [Điều kiện chuyển state đơn hàng, user...]

*(Lặp lại cho các Epic/Module tiếp theo)*

---

## 7. Data & Technical Considerations

### 6.1 Architecture Notes
- [Ghi chú kỹ thuật quan trọng]

### 6.2 Integrations
| Hệ thống | Loại tích hợp | Mục đích |
|----------|---------------|----------|
| [API/Service] | REST API/Webhook | [Để làm gì] |

---

## 8. Non-Functional Requirements

### 7.1 Non-Functional Requirements (NFRs)
| Loại | Yêu cầu | Ghi chú |
|------|---------|---------|
| **Performance** | Page load < 3s, API response < 500ms | |
| **Availability** | 99.9% uptime | |
| **Security** | Mã hóa data in-transit và at-rest. Phân quyền role-based. | |
| **Scalability** | | |

### 7.2 Analytics & Tracking Events
| Event Name | Parameter / Thuộc tính cần track | Nền tảng ghi nhận |
|------------|----------------------------------|-------------------|
| Clicks CTAs | User_ID, Time, Button_ID | Google Analytics |

---

## 9. Risks & Open Q&A

### 8.1 Risks & Mitigation
| Rủi ro | Khả năng xảy ra | Mức độ ảnh hưởng | Cách giảm thiểu |
|--------|-----------------|------------------|-----------------|
| [Rủi ro 1] | Cao/Trung/Thấp | Cao/Trung/Thấp | [Hành động] |

### 8.2 Open Questions
| # | Câu hỏi | Owner | Deadline | Status |
|---|---------|-------|----------|--------|
| 1 | [Điều chưa rõ cần confirm] | [Ai trả lời] | [Khi nào] | Open |

---

## 10. Appendix (Phụ lục)
[Tài liệu tham khảo, Links file Meeting Note, Reference documents]
