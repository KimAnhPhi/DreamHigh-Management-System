---
name: ba-feature-analyzer-spec
description: "Tìm hiểu luồng chức năng từ Màn hình + Data Model; đầu ra là Sequence và tài liệu User Story tổng hợp (gồm API Spec và bảng mapping Rule)."
---

Version: 1.0.0
Author: M2MBA
Last Updated: 2026-04-12
Description: Phân tích luồng nghiệp vụ dựa trên màn hình và data model. Đầu ra là một file tài liệu User Story duy nhất chứa: Sequence, Đặc tả API (có validate/action), và Bảng mapping Rule tổng hợp.

# HƯỚNG DẪN SKILL: BA FEATURE FLOW ANALYZER

## 🎯 Mục đích
Tạo tài liệu đặc tả User Story (US) hoàn chỉnh cho một chức năng hiện tại hoặc mới, dựa trên phân tích tương tác giữa giao diện và cơ sở dữ liệu.

## 📋 Đầu vào
1. **Màn hình chức năng**: Hình ảnh, code frontend hoặc mô tả chi tiết các trường thông tin/nút bấm.
2. **Data Model**: ERD, Prisma schema hoặc mô tả các bảng dữ liệu liên quan.

## 🚀 Quy trình thực hiện

### Bước 1: Phân tích tương tác (Screen-to-Data)
- Xác định hành động của User trên màn hình (Click, Input, Change).
- Xác định dữ liệu nào cần đọc từ DB (Query) và dữ liệu nào ghi xuống DB (Command).
- Xác định các hệ thống bên thứ ba tham gia (nếu có).

### Bước 2: Sinh Sequence Diagram
- Vẽ Mermaid Sequence (User -> FE -> BE -> Partner).
- **Quy tắc**: Chỉ vẽ Happy Path. Không đưa Database object vào.

### Bước 3: Phân tích Activity Rules & API
- Áp dụng logic của skill `ba-activity-rule-spec` để bóc tách:
    - Rule validate (Nhóm 1-6).
    - Hành động thực thi sau validate (Ghi DB, Gửi mail, Trigger event...).

### Bước 4: Tổng hợp tài liệu User Story
- Lưu vào: `docs-BA/Epics/<Tên Epic>/User story _[Tên chức năng].md`.
- **Định dạng bắt buộc (5 phần)**:
    1. **Tên User Story**: Định danh ngắn gọn.
    2. **Mô tả chung**: Mục đích và ý nghĩa nghiệp vụ.
    3. **Sequence Diagram**: Code Mermaid render luồng.
    4. **Mô tả API**: Bảng chi tiết cho từng API xuât hiện trong Sequence.
        - Cột: Tên API, Request, Response, Rule validate, Hành động thực thi sau validate.
    5. **Tổng hợp Rule & Hành động**: Bảng mapping cho toàn bộ chức năng.
        - Cột: Mã Rule (R-xx), Tên Rule, API áp dụng, Mô tả chi tiết, Hành động thực thi sau validate.

## ✅ Tiêu chuẩn chất lượng
- **Nhất quán**: Tên API trong Sequence phải khớp với phần Đặc tả API.
- **Traceability**: Mọi Rule trong bảng tổng hợp phải tìm được API tương ứng.
- **Ngôn ngữ**: 100% tiếng Việt chuyên ngành BA.
