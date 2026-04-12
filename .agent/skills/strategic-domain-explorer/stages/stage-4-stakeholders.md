# Bước 4: Stakeholder & Vai trò

## 🎯 Mục tiêu bước này

- Xác định **TẤT CẢ các bên liên quan** (stakeholders) trong domain
- Mô tả **vai trò & trách nhiệm** của từng stakeholder
- Liệt kê **công việc chính** của từng vai trò
- **Mapping phần mềm** hỗ trợ cho từng vai trò

---

## 📝 Các công việc cần làm

### 1. Vẽ Mindmap hoặc Sơ đồ Stakeholder

Sử dụng **mermaid mindmap** để hiển thị tất cả stakeholders.

#### Template Mindmap

```mermaid
mindmap
  root((Domain Name))
    Internal Stakeholders
      Vai trò 1
      Vai trò 2
      Vai trò 3
    External Stakeholders
      Đối tác 1
      Đối tác 2
    End Users
      Khách hàng nhóm A
      Khách hàng nhóm B
```

#### Hoặc sử dụng Graph

```mermaid
graph TB
    DOMAIN[Domain Name]

    subgraph Internal
        ROLE1[Vai trò 1]
        ROLE2[Vai trò 2]
        ROLE3[Vai trò 3]
    end

    subgraph External
        PARTNER1[Đối tác 1]
        PARTNER2[Đối tác 2]
    end

    subgraph Users
        CUSTOMER1[Khách hàng A]
        CUSTOMER2[Khách hàng B]
    end

    DOMAIN --> Internal
    DOMAIN --> External
    DOMAIN --> Users
```

---

### 2. Tạo bảng chi tiết Stakeholder

Với MỖI stakeholder, mô tả chi tiết:

| Stakeholder | Vai trò | Công việc chính | Phần mềm hỗ trợ | Chức năng cần có |
|-------------|---------|-----------------|-----------------|------------------|
| [Tên] | [Mô tả vai trò] | • Công việc 1<br>• Công việc 2<br>• Công việc 3 | [Phần mềm/Module] | • Chức năng 1<br>• Chức năng 2 |

---

### 3. Nhóm Stakeholder

Chia stakeholders thành các nhóm:

#### 🔵 Internal Stakeholders (Nội bộ tổ chức)
- Nhân viên, quản lý, bộ phận khác nhau

#### 🟢 External Stakeholders (Bên ngoài)
- Đối tác, nhà cung cấp, cơ quan quản lý

#### 🟠 End Users (Người dùng cuối)
- Khách hàng, người dùng sản phẩm/dịch vụ

---

## 📊 Ví dụ mẫu (E-commerce)

### 1. Mindmap Stakeholder

```mermaid
mindmap
  root((E-commerce Platform))
    Internal Stakeholders
      Management
        CEO/Founder
        Operations Manager
        Finance Manager
      Operations Team
        Customer Service
        Warehouse Staff
        Pickers & Packers
        Inventory Manager
      Marketing Team
        Digital Marketing Manager
        Content Creator
        Social Media Manager
      Technology Team
        Product Manager
        Developers
        DevOps Engineer
        Data Analyst
    External Stakeholders
      Partners
        3PL Delivery Partner
        Payment Gateway Provider
        Suppliers/Vendors
        Marketing Agencies
      Regulatory
        Tax Authority
        Consumer Protection Agency
    End Users
      Customers
        B2C Individual Shoppers
        B2B Corporate Buyers
      Sellers (if marketplace)
        Small Business Sellers
        Brand Stores
```

---

### 2. Bảng chi tiết Stakeholder

#### 🔵 Internal Stakeholders

| Stakeholder | Vai trò | Công việc chính | Phần mềm hỗ trợ | Chức năng cần có |
|-------------|---------|-----------------|-----------------|------------------|
| **CEO/Founder** | Lãnh đạo doanh nghiệp | • Đặt chiến lược kinh doanh<br>• Giám sát KPI tổng thể<br>• Quyết định đầu tư lớn | **BI Dashboard** | • KPI summary (revenue, profit, growth)<br>• Real-time metrics<br>• Custom reports |
| **Operations Manager** | Quản lý vận hành | • Giám sát quy trình đơn hàng<br>• Tối ưu hiệu suất giao hàng<br>• Quản lý nhân sự operations | **OMS + WMS Dashboard** | • Order fulfillment rate<br>• Warehouse efficiency<br>• Team performance<br>• Bottleneck alerts |
| **Customer Service** | Hỗ trợ khách hàng | • Trả lời thắc mắc (phone/chat/email)<br>• Xử lý khiếu nại<br>• Hỗ trợ đổi trả hàng<br>• Escalate vấn đề phức tạp | **CRM + Helpdesk** | • Ticketing system<br>• Customer history view<br>• Live chat<br>• Knowledge base<br>• Canned responses |
| **Warehouse Staff** | Quản lý kho hàng | • Nhập/xuất hàng<br>• Đóng gói đơn hàng<br>• Kiểm kê định kỳ<br>• Sắp xếp hàng hóa | **WMS** | • Picking list<br>• Barcode scanning<br>• Packing station<br>• Inventory count<br>• Location management |
| **Inventory Manager** | Quản lý tồn kho | • Theo dõi tồn kho<br>• Đặt hàng nhập thêm<br>• Xử lý hàng hết hạn/hư hỏng<br>• Tối ưu stock levels | **IMS (Inventory Management)** | • Stock level alerts<br>• Reorder point automation<br>• ABC analysis<br>• Stock aging report<br>• Demand forecasting |
| **Digital Marketing Manager** | Quản lý marketing online | • Lập kế hoạch campaigns<br>• Phân tích ROI quảng cáo<br>• A/B testing<br>• Budget allocation | **Marketing Automation** | • Campaign dashboard<br>• Ads performance tracking<br>• Attribution modeling<br>• Promo code management |
| **Data Analyst** | Phân tích dữ liệu | • Phân tích hành vi khách hàng<br>• Dự đoán xu hướng<br>• Báo cáo insights cho management<br>• Build dashboards | **BI Tools (Tableau/Power BI)** | • Data warehouse access<br>• SQL query tool<br>• Visualization builder<br>• Scheduled reports |

---

#### 🟢 External Stakeholders

| Stakeholder | Vai trò | Công việc chính | Phần mềm hỗ trợ | Chức năng cần có |
|-------------|---------|-----------------|-----------------|------------------|
| **3PL Delivery Partner** | Vận chuyển hàng hóa | • Nhận đơn hàng cần giao<br>• Phân công shipper<br>• Giao hàng cho khách<br>• Cập nhật trạng thái<br>• Thu COD và chuyển tiền | **TMS + 3PL Portal** | • API nhận orders<br>• Tracking updates webhook<br>• POD upload<br>• COD reconciliation<br>• SLA monitoring |
| **Payment Gateway** | Xử lý thanh toán | • Xử lý giao dịch thẻ/ví điện tử<br>• Chuyển tiền vào tài khoản merchant<br>• Xác thực thanh toán<br>• Phát hiện gian lận | **Payment Integration** | • Payment API (charge, refund)<br>• Webhook payment status<br>• Fraud detection callback<br>• Settlement report |
| **Suppliers/Vendors** | Cung cấp sản phẩm | • Cung cấp hàng hóa<br>• Cập nhật giá & tồn kho<br>• Xử lý đơn đặt hàng<br>• Giao hàng đến kho | **Supplier Portal** | • PO (Purchase Order) management<br>• Inventory sync<br>• Pricing updates<br>• Invoice submission |
| **Tax Authority** | Quản lý thuế | • Yêu cầu báo cáo thuế<br>• Kiểm tra tuân thủ<br>• Thu thuế | **Accounting/ERP** | • Tax calculation<br>• VAT invoice generation<br>• Tax report export<br>• E-invoice integration |

---

#### 🟠 End Users

| Stakeholder | Vai trò | Công việc chính | Phần mềm hỗ trợ | Chức năng cần có |
|-------------|---------|-----------------|-----------------|------------------|
| **B2C Individual Shoppers** | Khách hàng cá nhân | • Duyệt & tìm kiếm sản phẩm<br>• Đặt hàng<br>• Thanh toán<br>• Theo dõi đơn hàng<br>• Đánh giá sản phẩm | **E-commerce Website/App** | • Product catalog<br>• Search & filter<br>• Shopping cart<br>• Checkout<br>• Order tracking<br>• Reviews & ratings |
| **B2B Corporate Buyers** | Khách hàng doanh nghiệp | • Mua số lượng lớn<br>• Yêu cầu báo giá<br>• Thanh toán sau (credit)<br>• Quản lý nhiều người dùng<br>• Theo dõi lịch sử mua hàng | **B2B Portal** | • Bulk order<br>• Quote request<br>• Multi-user accounts<br>• Credit terms<br>• Purchase history<br>• Approval workflow |
| **Sellers (nếu là marketplace)** | Người bán hàng | • Đăng sản phẩm lên platform<br>• Quản lý giá & tồn kho<br>• Xử lý đơn hàng<br>• Theo dõi doanh thu<br>• Rút tiền về tài khoản | **Seller Center** | • Product listing tool<br>• Order management<br>• Inventory sync<br>• Revenue dashboard<br>• Payout management<br>• Commission report |

---

### 3. Phân tích sâu một vai trò quan trọng

#### Vai trò: Customer Service Representative

**Mô tả chi tiết:**
- **Số lượng:** 10-15 người (tùy quy mô)
- **Làm việc:** Shift 8h/ngày, hỗ trợ khách hàng qua phone/chat/email
- **KPI:**
  - First Response Time < 2 phút (chat), < 1 giờ (email)
  - Resolution Rate > 85%
  - Customer Satisfaction (CSAT) > 4.5/5

**Quy trình làm việc hàng ngày:**

1. **Login vào hệ thống CRM** → Xem queue tickets mới
2. **Nhận ticket** → Đọc vấn đề khách hàng
3. **Tra cứu thông tin** → Xem order history, payment status
4. **Giải quyết hoặc escalate:**
   - Trả lời: Tự giải quyết (90% cases)
   - Escalate: Chuyển lên supervisor hoặc technical team (10%)
5. **Đóng ticket** → Gửi survey CSAT
6. **Cuối ca:** Tổng kết số tickets xử lý, CSAT trung bình

**Phần mềm cần có:**

| Phần mềm | Chức năng cụ thể |
|----------|------------------|
| **CRM/Helpdesk** | • Ticketing (create, assign, close)<br>• Customer 360° view (orders, payments, returns)<br>• Canned responses library<br>• Internal notes<br>• SLA tracking |
| **Live Chat** | • Real-time messaging<br>• Chat routing (round-robin/skill-based)<br>• Typing indicator<br>• File attachments |
| **Phone System** | • Click-to-call<br>• Call recording<br>• IVR (Interactive Voice Response)<br>• Call transfer |
| **Knowledge Base** | • FAQ articles<br>• Search internal docs<br>• SOPs (Standard Operating Procedures) |

**Pain points hiện tại:**
- Phải chuyển qua lại nhiều hệ thống (CRM, OMS, WMS) → Cần **unified dashboard**
- Không có suggest response → Cần **AI chatbot hỗ trợ**
- Khó escalate vấn đề phức tạp → Cần **workflow automation**

**AI hỗ trợ:**
- **AI Chatbot:** Tự động trả lời 60-70% câu hỏi thường gặp (tracking order, return policy)
- **Sentiment Analysis:** Phát hiện khách hàng giận dữ → ưu tiên xử lý
- **Response Suggestion:** Gợi ý câu trả lời dựa trên knowledge base

---

## 🤖 AI hỗ trợ Stakeholders

### Internal Stakeholders
- **CEO/Management:** AI-powered BI dashboard với insights tự động
- **Operations:** Predictive analytics dự đoán bottlenecks
- **CS Team:** AI chatbot + response suggestion
- **Warehouse:** Computer vision kiểm tra chất lượng đóng gói

### External Stakeholders
- **3PL Partner:** AI tối ưu route, dự đoán ETA chính xác
- **Suppliers:** Demand forecasting để supplier chuẩn bị hàng trước

### End Users
- **Customers:** Personalization AI, visual search, virtual try-on

---

## ✅ Checklist hoàn thành

- [x] Đã vẽ mindmap/sơ đồ stakeholder
- [x] Đã tạo bảng chi tiết cho TẤT CẢ stakeholders
- [x] Đã phân tích sâu 1-2 vai trò quan trọng
- [x] Đã mapping phần mềm hỗ trợ cho từng vai trò
- [x] Đã mô tả AI hỗ trợ
- [x] Đã cập nhật vào file .md
- [x] User xác nhận tiếp tục Bước 5

---

## 🔗 Bước tiếp theo

→ **[Bước 5: Phân tích sâu quy trình cụ thể](stage-5-deep-dive.md)**