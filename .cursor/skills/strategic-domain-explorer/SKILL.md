---
name: strategic-domain-explorer
description: "Trợ lý phân tích domain chuyên sâu. Quy trình 8 bước: BModel, Lean Canvas, E2E, Stakeholder, Deep Dive, Application, ERD, Competitors. Hỗ trợ WebSearch và xuất Word (.docx)."
---

# HƯỚNG DẪN SKILL: STRATEGIC DOMAIN EXPLORER

**Version:** 1.2.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Trợ lý phân tích domain chuyên sâu theo quy trình 8 bước chuẩn BA, hỗ trợ nghiên cứu thị trường và xuất tài liệu.

## 🎯 Mục đích
Đồng hành cùng BA khám phá toàn diện bất kỳ domain/subdomain nào theo quy trình có cấu trúc, tạo tài liệu đầu ra chuyên nghiệp.

## 📋 Quy trình 8 bước
- **B0: Tổng quan**: Thuật ngữ, giới thiệu, hiện trạng nghiệp vụ.
- **B1: Business Model Canvas**: 9 yếu tố kinh doanh & mapping phần mềm.
- **B2: Lean Canvas**: Vấn đề, giải pháp, khách hàng & tính năng.
- **B3: Quy trình End-to-End**: Luồng nghiệp vụ cốt lõi, thực thể & chức năng.
- **B4: Stakeholder**: Danh sách vai trò & mapping phần mềm hỗ trợ.
- **B5: Deep Dive**: Phân tích chi tiết 1 quy trình trọng yếu (Rule, I/O).
- **B6: Ứng dụng**: Danh sách Module & bảng chức năng chi tiết.
- **B7: ERD**: Thực thể & sơ đồ quan hệ (Mermaid).
- **B8: Đối thủ**: Phân tích thị trường, đối thủ & xu hướng công nghệ.

## 🤖 Hướng dẫn cho AI Agent (Proactive)
1. **Làm tuần tự**: Thực hiện từng bước (0 -> 8). Hỏi xác nhận trước khi chuyển bước.
2. **Cập nhật File**: Liên tục cập nhật nội dung vào file .md output sau mỗi bước.
3. **Chủ động nghiên cứu**: Tại B0 và B8, ĐỀ XUẤT dùng `search_web` để lấy dữ liệu thực tế.
4. **Tư vấn AI**: Gợi ý các điểm AI có thể tối ưu hóa cho domain đang phân tích.
5. **Cấu trúc lưu trữ**: 
   - Mọi file phân tích `.md` phải được lưu trong thư mục `docs-BA/Elicitation/` (tạo nếu chưa có).
   - Định dạng tên file: `Tìm hiểu <tên domain>.md`.

## � Kích hoạt
- "Phân tích/Tìm hiểu domain [tên domain]"
- "Chạy /strategic-domain-explorer"

## 📂 Chi tiết Stage
- [Stage 0: Tổng quan](stages/stage-0-overview.md)
- [Stage 1: Business Canvas](stages/stage-1-business-canvas.md)
- [Stage 2: Lean Canvas](stages/stage-2-lean-canvas.md)
- [Stage 3: E2E Process](stages/stage-3-end-to-end.md)
- [Stage 4: Stakeholders](stages/stage-4-stakeholders.md)
- [Stage 5: Deep Dive](stages/stage-5-deep-dive.md)
- [Stage 6: Applications](stages/stage-6-applications.md)
- [Stage 7: ERD](stages/stage-7-erd.md)
- [Stage 8: Competitors](stages/stage-8-competitors.md) [Template Output](templates/domain-analysis-template.md)

## 📄 Xuất báo cáo Word
Khi user yêu cầu, sử dụng script:
`python .agent/scripts/md_to_docx.py <file>.md <file>.docx`

## 📝 Nguyên tắc (Mandatory)
- Sử dụng **Bảng** cho danh sách và **Mermaid** cho biểu đồ. RIÊNG Business Model Canvas (BMC) bắt buộc sử dụng bảng (table) để trình bày thay vì chỉ dùng Mermaid.
- Tuyệt đối không làm gộp các bước trừ khi user yêu cầu.
- File .docx phải dùng font chuyên nghiệp (Times New Roman).
