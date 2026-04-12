# Bước 1: Business Model Canvas

## 🎯 Mục tiêu bước này

Phân tích domain theo mô hình Business Model Canvas (9 yếu tố), với trọng tâm chi tiết vào:
- **Key Activities** - Hoạt động chính
- **Key Partners** - Đối tác chính
- **Cost Structure** - Cấu trúc chi phí
- **Revenue Streams** - Nguồn doanh thu

Đồng thời **mapping hệ thống phần mềm cần có** để hỗ trợ từng yếu tố.

---

---

## 📝 Cấu trúc Business Model Canvas

> [!IMPORTANT]
> Bắt buộc sử dụng bảng (table) để tóm lược 9 yếu tố của BMC trước khi đi vào phân tích chi tiết.

| Key Partners | Key Activities | Value Propositions | Customer Relationships | Customer Segments |
|:---:|:---:|:---:|:---:|:---:|
| [Đối tác] | [Hoạt động] | [Giá trị] | [Mối quan hệ] | [Khách hàng] |
| **Key Resources** | | **Channels** | | |
| [Nguồn lực] | | [Kênh] | | |

| Cost Structure | Revenue Streams |
|:---:|:---:|
| [Chi phí vận hành] | [Nguồn thu] |

---


## 🔴 Phần 1: Key Activities (QUAN TRỌNG - CHI TIẾT NHẤT)

### Hướng dẫn

- Xác định **3-7 hoạt động chính** của domain
- **MỖI hoạt động trình bày RIÊNG BIỆT**, không gộp bảng
- Mỗi hoạt động phải có đầy đủ các mục dưới đây

### Cấu trúc cho MỖI hoạt động

#### Hoạt động X: [Tên hoạt động chính]

**Ai tham gia:**
_Liệt kê tất cả vai trò tham gia vào hoạt động này_

**Các bước thực hiện:**

| Ai | Làm gì | Mục đích/Đầu ra | Phần mềm liên quan | Tính năng cần có |
|----|--------|-----------------|--------------------|--------------------|
| [Vai trò] | [Hành động cụ thể] | [Kết quả mong đợi] | [Tên phần mềm/Module] | • Tính năng 1<br>• Tính năng 2 |
| ... | ... | ... | ... | ... |

**Kết quả mong đợi / Giá trị tạo ra:**
_Mô tả output cuối cùng của hoạt động, giá trị mang lại cho business_

**Nhận xét hoặc điểm cải tiến (nếu có):**
_Vấn đề hiện tại, điểm nghẽn, cơ hội tối ưu_

---

### Ví dụ mẫu

#### Hoạt động 1: Quản lý đơn hàng

**Ai tham gia:**
- Khách hàng
- Nhân viên bán hàng
- Nhân viên kho
- Nhân viên giao hàng

**Các bước thực hiện:**

| Ai | Làm gì | Mục đích/Đầu ra | Phần mềm liên quan | Tính năng cần có |
|----|--------|-----------------|--------------------|--------------------|
| Khách hàng | Tạo đơn hàng trên website | Đơn hàng mới (trạng thái: Pending) | E-commerce Platform | • Giỏ hàng<br>• Checkout<br>• Thanh toán online |
| NV Bán hàng | Xác nhận đơn hàng | Đơn hàng được xác nhận (trạng thái: Confirmed) | Order Management System | • Dashboard đơn hàng mới<br>• Xác nhận đơn<br>• Kiểm tra tồn kho |
| NV Kho | Đóng gói sản phẩm | Kiện hàng sẵn sàng xuất (trạng thái: Packed) | WMS (Warehouse Mgmt) | • Picking list<br>• Scan barcode<br>• Đóng gói |
| NV Giao hàng | Giao hàng cho khách | Đơn hàng hoàn thành (trạng thái: Delivered) | Delivery Management | • Tối ưu tuyến đường<br>• GPS tracking<br>• POD (Proof of Delivery) |

**Kết quả mong đợi / Giá trị tạo ra:**
- Đơn hàng được xử lý nhanh chóng (< 24h)
- Khách hàng nhận hàng đúng hẹn
- Tỷ lệ đơn hàng thành công > 95%
- Tăng trải nghiệm khách hàng

**Nhận xét hoặc điểm cải tiến:**
- **Vấn đề:** Xác nhận đơn thủ công chậm (peak giờ)
- **Cải tiến:** Tự động xác nhận nếu tồn kho đủ + thanh toán thành công
- **Công nghệ:** Áp dụng AI dự đoán nhu cầu để tối ưu tồn kho

---

## 🟠 Phần 2: Key Partners (CHI TIẾT)

### Hướng dẫn

- Xác định **3-5 nhóm đối tác chính**
- **MỖI đối tác trình bày RIÊNG BIỆT**
- Tập trung vào **quy trình phối hợp** và **tin học hóa**

### Cấu trúc cho MỖI đối tác

#### Đối tác X: [Tên đối tác / Nhóm đối tác]

**Mục đích hợp tác / Giá trị mang lại:**
_Tại sao cần đối tác này? Họ đóng góp gì?_

**Quy trình phối hợp:**

| Ai | Làm gì | Đầu ra | Tần suất | Kênh tương tác |
|----|--------|--------|----------|----------------|
| [Bên A] | [Hành động] | [Kết quả] | [Hàng ngày/tuần/tháng] | [Email/API/Portal] |
| ... | ... | ... | ... | ... |

**Tin học hóa liên quan:**

- **Chức năng phần mềm cần có:**
  - Chức năng 1
  - Chức năng 2

- **Tích hợp cần thiết:**
  - API: [Mô tả API cần có]
  - EDI/Portal: [Mô tả kênh trao đổi dữ liệu]
  - SLA: [Service Level Agreement]

- **Dữ liệu trao đổi:**
  - Loại dữ liệu 1: [Format, tần suất]
  - Loại dữ liệu 2: ...

- **Bảo mật:**
  - [Yêu cầu bảo mật, mã hóa, xác thực]

---

### Ví dụ mẫu

#### Đối tác 1: Đơn vị vận chuyển (3PL - Third-Party Logistics)

**Mục đích hợp tác / Giá trị mang lại:**
- Giao hàng cho khách hàng (last-mile delivery)
- Mở rộng phạm vi giao hàng toàn quốc
- Giảm chi phí đầu tư hạ tầng logistics

**Quy trình phối hợp:**

| Ai | Làm gì | Đầu ra | Tần suất | Kênh tương tác |
|----|--------|--------|----------|----------------|
| Hệ thống | Gửi thông tin đơn hàng cần giao | Order data (JSON) | Real-time | API POST |
| 3PL | Nhận đơn, phân shipper, giao hàng | Tracking updates | Real-time | Webhook callback |
| 3PL | Cập nhật trạng thái giao hàng | Status: Picked up, In transit, Delivered | Real-time | Webhook callback |
| Hệ thống | Đối soát phí vận chuyển | Báo cáo chi phí | Cuối ngày | API GET |

**Tin học hóa liên quan:**

- **Chức năng phần mềm cần có:**
  - Tạo order gửi cho 3PL (push order API)
  - Nhận webhook cập nhật trạng thái
  - Hiển thị tracking cho khách hàng
  - Đối soát phí vận chuyển tự động
  - Quản lý SLA (tỷ lệ giao đúng hẹn)

- **Tích hợp cần thiết:**
  - **API:** RESTful API với authentication (OAuth 2.0 hoặc API Key)
  - **Webhook:** Nhận callback khi có update trạng thái
  - **Portal:** Dashboard theo dõi đơn hàng cho team operations
  - **SLA:** Giao hàng nội thành < 24h, ngoại thành < 48h

- **Dữ liệu trao đổi:**
  - **Order data (push):** Order ID, địa chỉ, SĐT, COD amount, sản phẩm (JSON, real-time)
  - **Tracking updates (receive):** Tracking number, status, timestamp, location (JSON, real-time)
  - **POD (Proof of Delivery):** Hình ảnh, chữ ký, người nhận (Image + metadata, sau khi giao)
  - **Reconciliation report:** Phí ship, COD thu được (CSV/JSON, hàng ngày)

- **Bảo mật:**
  - HTTPS cho tất cả API calls
  - API key rotation hàng quý
  - Mã hóa thông tin khách hàng nhạy cảm (SĐT, địa chỉ)
  - IP whitelist cho webhook endpoints

---

## 🟢 Phần 3: Cost Structure (CHI TIẾT CÔNG THỨC)

### Hướng dẫn

- Liệt kê **5-10 loại chi phí** chính
- **MỖI chi phí phải có công thức tính CHI TIẾT**
- Công thức phải mô tả **từng tham số nhỏ nhất**

### Cấu trúc cho MỖI chi phí: CHỈ TẬP TRUNG CHI PHÍ LIÊN QUAN TỚI VẬN HÀNH DỊCH VỤ TƯƠNG ỨNG, BỎ QUA CÁC CHI PHÍ CHUNG CỦA CTY NHƯ LƯƠNG CỦA NV HAY CHI PHÍ THUÊ VĂN PHÒNG, ĐIỆN NƯỚC... 

#### Chi phí X: [Tên chi phí]

**Công thức tính:**

```
[Tên chi phí] = [Công thức toán học chi tiết]

Trong đó:
- [Tham số 1]:
  - Mô tả: [Giải thích tham số]
  - Kiểu dữ liệu: [Number/Decimal/Integer]
  - Đơn vị: [VND/USD/%/unit]
  - Nguồn dữ liệu: [Lấy từ đâu? Module nào?]
  - Phạm vi giá trị: [Min-Max hoặc điều kiện]

- [Tham số 2]: ...
```

**Ví dụ tính toán cụ thể:**
_[Tính với số liệu thực tế]_

**Liên kết với phần mềm kế toán / ERP:**

| Thông tin | Giá trị |
|-----------|---------|
| Module quản lý | [Tên module] |
| Mã GL (General Ledger) | [Mã tài khoản kế toán] |
| Thời điểm ghi nhận | [Khi nào ghi nhận? Real-time/End of day/End of month] |
| Loại chi phí | [Cố định/Biến đổi/Bán biến đổi] |
| Quy tắc phân bổ | [Cách phân bổ chi phí nếu có nhiều phòng ban/sản phẩm] |

---

### Ví dụ mẫu

#### Chi phí 1: Chi phí vận chuyển

**Công thức tính:**

```
Chi phí vận chuyển = Σ (Shipping_Fee_i × Quantity_i) + Return_Shipping_Cost

Trong đó:
- Shipping_Fee_i:
  - Mô tả: Phí ship cho đơn hàng thứ i
  - Kiểu dữ liệu: Decimal(10,2)
  - Đơn vị: VND
  - Nguồn dữ liệu: Bảng Orders, cột shipping_fee (từ 3PL API)
  - Phạm vi giá trị: 15,000 - 200,000 VND (tùy khoảng cách & khối lượng)
  - Công thức tính Shipping_Fee_i:
    - Base_Fee + (Distance × Distance_Rate) + (Weight × Weight_Rate)
    - Base_Fee: 15,000 VND (nội thành), 25,000 VND (ngoại thành)
    - Distance: km (lấy từ API Google Maps)
    - Distance_Rate: 1,000 VND/km (>10km)
    - Weight: kg (từ thông tin sản phẩm)
    - Weight_Rate: 2,000 VND/kg (>1kg)

- Quantity_i:
  - Mô tả: Số lượng đơn hàng được giao
  - Kiểu dữ liệu: Integer
  - Đơn vị: Đơn
  - Nguồn dữ liệu: Đếm Orders có status = 'Delivered'
  - Phạm vi giá trị: ≥ 0

- Return_Shipping_Cost:
  - Mô tả: Chi phí ship cho đơn trả hàng
  - Kiểu dữ liệu: Decimal(10,2)
  - Đơn vị: VND
  - Nguồn dữ liệu: Bảng Returns, cột return_shipping_cost
  - Phạm vi giá trị: 0 - 100,000 VND
  - Quy tắc: Doanh nghiệp chịu 100% nếu lỗi sản phẩm
```

**Ví dụ tính toán cụ thể:**

```
Tháng 10/2024:
- Tổng đơn giao thành công: 1,000 đơn
- Phí ship trung bình: 30,000 VND/đơn
- Đơn trả hàng: 50 đơn × 25,000 VND = 1,250,000 VND

Chi phí vận chuyển tháng 10 = (30,000 × 1,000) + 1,250,000 = 31,250,000 VND
```

**Liên kết với phần mềm kế toán / ERP:**

| Thông tin | Giá trị |
|-----------|---------|
| Module quản lý | Cost Management / Logistics Module |
| Mã GL (General Ledger) | 6421 - Chi phí vận chuyển hàng bán |
| Thời điểm ghi nhận | End of day (sau khi đối soát với 3PL) |
| Loại chi phí | Biến đổi (tỷ lệ thuận với số đơn hàng) |
| Quy tắc phân bổ | Phân bổ theo từng đơn hàng, tính vào COGS (Cost of Goods Sold) |

---

## 🔵 Phần 4: Revenue Streams (CHI TIẾT CÔNG THỨC)

### Hướng dẫn

Tương tự Cost Structure, nhưng cho **nguồn doanh thu**.

### Cấu trúc cho MỖI nguồn doanh thu

#### Doanh thu X: [Tên nguồn doanh thu]

**Công thức tính toán chi tiết:**

```
[Tên doanh thu] = [Công thức]

Trong đó:
- [Tham số 1]: [Mô tả chi tiết như Cost Structure]
- [Tham số 2]: ...
```

**Ví dụ tính cụ thể:**
_[Số liệu thực tế]_

**Quy trình ghi nhận doanh thu:**
- **Khi nào ghi nhận:** [Điều kiện]
- **Điều kiện:** [Các điều kiện cần thỏa mãn]
- **Phương thức thanh toán:** [COD/Online/Bank transfer]
- **Thuế, chiết khấu, hoàn tiền:** [Cách tính]

**Tính năng phần mềm cần hỗ trợ:**
- Cấu hình công thức doanh thu
- Quản lý hợp đồng doanh thu (nếu có)
- Đối soát tự động
- Báo cáo lợi nhuận theo sản phẩm/kênh/khu vực

---

### Ví dụ mẫu

_(Tương tự Cost Structure, nhưng cho Revenue)_

---

## 🟡 Phần 5: Các yếu tố còn lại (TÓM TẮT)

Các yếu tố còn lại viết **TÓM TẮT**, không cần chi tiết như 4 phần trên:

### Value Propositions (Giá trị khách hàng)

_Liệt kê 3-5 giá trị cốt lõi mà domain mang lại cho khách hàng_

### Customer Segments (Phân khúc khách hàng)

_Liệt kê 2-4 nhóm khách hàng chính, đặc điểm của từng nhóm_

### Channels (Kênh phân phối)

_Liệt kê các kênh tiếp cận khách hàng (online/offline/partner)_

### Customer Relationships (Quan hệ khách hàng)

_Mô tả cách duy trì quan hệ với khách hàng (self-service/personal/automated)_

### Key Resources (Nguồn lực chính)

_Liệt kê tài sản chính cần có (con người/công nghệ/tài chính/IP)_

---

## 🤖 Phần 6: AI hỗ trợ Business Model

_Mô tả cách AI có thể thay đổi/cải tiến business model:_

- AI hỗ trợ Key Activities như thế nào?
- AI tối ưu Cost Structure ra sao?
- AI tăng Revenue Streams thế nào?
- Các công nghệ AI liên quan: ML, NLP, Computer Vision, Recommendation Engine, v.v.

---

##✅ Checklist hoàn thành

- [x] Key Activities: Đã phân tích chi tiết 3-7 hoạt động, mỗi hoạt động riêng biệt
- [x] Key Partners: Đã phân tích chi tiết 3-5 đối tác, mapping tin học hóa
- [x] Cost Structure: Đã viết công thức chi tiết cho 5-10 chi phí
- [x] Revenue Streams: Đã viết công thức chi tiết cho các nguồn doanh thu
- [x] 5 yếu tố còn lại: Đã viết tóm tắt
- [x] AI hỗ trợ: Đã mô tả
- [x] Đã cập nhật vào file .md
- [x] User xác nhận tiếp tục Bước 2

---

## 🔗 Bước tiếp theo

→ **[Bước 2: Lean Canvas](stage-2-lean-canvas.md)**