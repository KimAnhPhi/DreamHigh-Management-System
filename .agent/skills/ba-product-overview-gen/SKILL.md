---
name: ba-product-overview-gen
description: "Skill đưa ra mô hình tổng quan sản phẩm, bao gồm đối tượng người dùng, ứng dụng tương tác, hệ thống tích hợp và mô hình giao tiếp tổng thể."
---

# HƯỚNG DẪN SKILL: BA PRODUCT OVERVIEW GEN

**Version:** 1.0.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill phân tích và đưa ra mô hình bối cảnh (System Context) của sản phẩm, xác định các actor, ứng dụng, hệ thống tích hợp và luồng giao tiếp chính.

Bạn là một Business Analyst chuyên nghiệp. Nhiệm vụ của bạn là tổng hợp thông tin từ kết quả khơi gợi yêu cầu (Elicitation Results) và quy trình đề xuất (TO-BE Process) để tạo ra mô hình tổng quan sản phẩm.

## CÁC BƯỚC THỰC HIỆN:

### 1. Phân tích đối tượng và ứng dụng (Actors & Apps)
- Xác định những ai (User/Actor) sẽ sử dụng hệ thống.
- **Gom nhóm & Xác định Platform:**
    - **Nhóm di động (Mobility):** Các đối tượng thường xuyên di chuyển (ví dụ: Tài xế, Nhân viên kỹ thuật hiện trường) -> Cần Mobile App hoặc Web Responsive riêng biệt để tối ưu thao tác trên thiết bị cầm tay.
    - **Nhóm nội bộ (Office/Back-office):** Các đối tượng làm việc tại văn phòng (ví dụ: Admin, Kế toán, CSKH) -> Gom nhóm vào một hệ thống Back-office (Web Portal) duy nhất, phân quyền theo vai trò (RBAC) để dễ quản lý.
- **Phân tích ứng dụng Dùng chung vs Chuyên biệt (Shared vs Dedicated):**
    - **Dùng chung (Shared App):** Ưu tiên nếu các đối tượng có luồng nghiệp vụ tương đồng (ví dụ: Tài xế công ty và Tài xế đối tác dùng chung 1 Driver App, chỉ khác về cách tính lương/chiết khấu ẩn bên trong).
    - **Chuyên biệt (Dedicated App):** Cần thiết khi đối tượng có mục đích sử dụng hoàn toàn khác biệt, yêu cầu bảo mật cao, hoặc cần trải nghiệm UX/UI đặc thù (ví dụ: App dành riêng cho Khách hàng B2B lớn với branding riêng).
- Xác định ứng dụng cụ thể dựa trên nhu cầu tương tác và tối ưu hóa chi phí phát triển.

### 2. Phân tích hệ thống tích hợp (External Systems)
- Xác định các hệ thống bên ngoài mà hệ thống mới cần giao tiếp (ví dụ: Cổng thanh toán, Đơn vị vận chuyển, SSO, ERP).
- **Gom nhóm:** Nếu có nhiều đối tác cùng chung mục đích, hãy gom chúng lại (ví dụ: "Đối tác Thanh toán: VNPay, MoMo").

### 3. Phân tích mô hình giao tiếp (Communication Model)
- Mô tả cách các thành phần tương tác: User sử dụng App -> App gọi API Backend -> Backend xử lý và gọi các hệ thống tích hợp.

### 4. Sinh sơ đồ bối cảnh (System Context Diagram)
- Sử dụng Mermaid.js (C4 Model - Context hoặc flowchart) để mô tả tổng quan.

## ĐẦU RA YÊU CẦU:

- File `.md` sinh ra bắt buộc phải được lưu trong thư mục `docs-BA/Analysis/` với định dạng tên file là `ba-product-overview-gen.md`.
- Nếu thư mục `docs-BA/Analysis/` chưa tồn tại, hãy tạo nó.

### Cấu trúc file đầu ra:

---
# Tổng quan sản phẩm: [Tên Sản phẩm]

## 1. Đối tượng sử dụng & Ứng dụng tương tác
| Đối tượng (User/Actor) | Ứng dụng (Interface/App) | Mục đích chính |
|-------------------------|--------------------------|----------------|
| [Ví dụ: Khách hàng] | [Mobile App] | [Đặt hàng và thanh toán] |

## 2. Hệ thống tích hợp (External Systems)
| Nhóm hệ thống | Tên hệ thống cụ thể | Mục đích tích hợp |
|---------------|---------------------|-------------------|
| [Ví dụ: Vận chuyển] | [GHTK, GrabExpress] | [Đẩy mã vận đơn, theo dõi lộ trình] |

## 3. Mô hình giao tiếp hệ thống
- **Người dùng:** [Mô tả luồng tương tác của người dùng]
- **Ứng dụng:** [Mô tả các loại ứng dụng hỗ trợ]
- **Hệ thống Backend:** [Mô tả vai trò xử lý trung tâm]
- **Tích hợp:** [Mô tả cách kết nối với các đối tác]

## 4. Sơ đồ bối cảnh sản phẩm (System Context)
```mermaid
graph TB
    subgraph Users
        U1[Khách hàng]
        U2[Nhân viên]
    end
    
    subgraph Apps
        A1[Mobile App]
        A2[Web Admin]
    end
    
    subgraph Core_System
        BE[Backend API]
        DB[(Database)]
    end
    
    subgraph External_Systems
        subgraph Payment_Gateways
            P1[VNPay]
            P2[MoMo]
        end
        subgraph Shipping_Partners
            S1[GHTK]
        end
    end
    
    U1 --> A1
    U2 --> A2
    A1 --> BE
    A2 --> BE
    BE --> DB
    BE --> Payment_Gateways
    BE --> Shipping_Partners
```
---
