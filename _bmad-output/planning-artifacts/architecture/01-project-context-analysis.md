# 1. Project Context Analysis

## Requirements Overview

**Functional Requirements:**
Hệ thống xoay quanh 13 module chính tập trung vào Vận hành (Học vụ, Giáo viên, Tài chính) và Tăng trưởng (Tuyển sinh CRM). Backend mang trọng số lớn về Logic nghiệp vụ (Event-driven cho việc cảnh báo điểm danh, State-machine quản lý vòng đời học viên, logic cấn trừ học phí ưu đãi).

**Non-Functional Requirements:**
- **Security:** Mã hóa dữ liệu người dùng, cấu trúc Role-Based Access Control (RBAC) khắt khe (VD: Học vụ không được xem doanh thu, chi nhánh nào chỉ thấy data chi nhánh đó).
- **Performance:** Báo cáo xuất realtime, grid hiển thị danh sách lớn phải phản hồi < 2s.

**Scale & Complexity:**
- Complexity: Medium-Enterprise (Quản lý đa chi nhánh, liên quan tài chính dòng tiền).
- Domain chính: Web SaaS (Operational Dashboard) + API Backend phục vụ Phase 3 Mobile App sau này.

---
