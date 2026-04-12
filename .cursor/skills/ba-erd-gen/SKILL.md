---
name: BA ERD Generation
description: Trợ lý Business Analyst chuyên thiết kế ERD (Entity-Relationship Diagram), tạo Mermaid.js chart và định nghĩa Data Dictionary từ yêu cầu nghiệp vụ, hỗ trợ cập nhật từ kết quả khơi gợi yêu cầu. Dùng khi BA cần phân tích dữ liệu, thiết kế ERD hệ thống, vẽ sơ đồ thực thể hoặc định nghĩa cấu trúc dữ liệu lưu trữ.
---

# HƯỚNG DẪN SKILL: BA ERD GENERATION

**Version:** 1.1.0
**Author:** M2MBA
**Last Updated:** 2026-04-10
**Description:** Skill phân tích tài liệu để thiết kế/cập nhật Entity-Relationship Diagram (ERD). Phân tích cấu trúc dữ liệu, đề xuất thuộc tính, và tạo file .md chứa Mermaid chart + Data Dictionary.

## 🎯 MỤC ĐÍCH & NGỮ CẢNH
Skill này giúp định nghĩa cấu trúc phân tích dữ liệu và vẽ sơ đồ ERD dựa trên:
1. Kết quả khơi gợi yêu cầu (Meeting notes, interview docs).
2. Các quy trình nghiệp vụ (TO-BE).
3. Thông tin input/output cần thiết để quản lý.

## 🚨 NGUYÊN TẮC HOẠT ĐỘNG (BAT COMPLIANCE)
```markdown
1. **Kiểm tra thông tin:** ĐỌC KỸ dữ liệu input. Nếu thiếu thông tin quan trọng để xác định thuộc tính (attributes, relations), BẮT BUỘC phải yêu cầu người dùng làm rõ và xác nhận.
    - Nếu người dùng cung cấp thông tin: Bắt buộc cập nhật lại vào file Tóm tắt Khơi gợi yêu cầu (Elicitation Summary) liên quan.
    - Nếu chưa có câu trả lời: Hỏi người dùng có cần lưu vào danh sách Q&A không, và xác nhận muốn tạo danh sách mới hay cập nhật vào danh sách cũ hiện có.
```
2. **Mermaid.js Format:** Sử dụng ngôn ngữ Mermaid để vẽ ERD và State Diagram. Tuyệt đối không dùng dạng text thô.
3. **State Diagram (Sơ đồ trạng thái):** Xác định các thực thể có luồng trạng thái (VD: Order, Ticket) để vẽ `stateDiagram-v2`.
    - **Bắt buộc:** Cú pháp chuyển trạng thái phải hiển thị rõ `Actor + Hành động [Điều kiện]`. Vd: `Khách hàng Hủy [Chưa thanh toán]`.
    - **Bắt buộc:** Mọi trạng thái (trừ Start/End) đều phải có ít nhất 1 mũi tên đi **vào** và 1 mũi tên đi **ra**. Có thể bắt đầu từ `[*]`, hoặc đi ra `[*]`.
4. **Incremental Update:** Sử dụng incremental output (sinh kết quả từng phần) để tránh quá tải dung lượng file.
5. **Chuẩn đầu ra:** Áp dụng chặt chẽ `erd-template.md`.

## 📂 REFERENCES & TEMPLATES
Trước khi bắt đầu, Agent **BẮT BUỘC** phải đọc các file reference sau bằng tool `view_file` (KHÔNG tự tưởng tượng định dạng):
- `references\erd-template.md`: Chứa cấu trúc file chuẩn và ví dụ Mermaid.

---

## 🛠️ QUY TRÌNH THỰC THI

### Bước 1: 🕵️ Phân Tích Sự Đầy Đủ (Gap Analysis)
Nhận input từ người dùng (File Word, Markdown, nội dung text về hệ thống).
Tiến hành phân tích:
- **Thực thể (Entities):** Đã xác định được các đối tượng chính cần lưu trữ chưa?
- **Thuộc tính (Attributes):** Đã có đủ thông tin chi tiết các trường, kiểu dữ liệu, các ràng buộc (required, unique)?
- **Mối quan hệ (Relationships):** Rõ ràng liên kết 1-1, 1-N, N-N chưa?

🚦 **ĐIỀU KIỆN RẼ NHÁNH:**
- **NẾU THIẾU THÔNG TIN:** Agent **dừng ngay**, không sinh ERD. Đưa ra danh sách các câu hỏi gợi ý cho Stakeholder (ví dụ: "Thực thể 'Customer' cần lưu thẻ thành viên không? Mối quan hệ giữa Order và Product là gì?"). Chờ User trả lời bổ sung.
- **NẾU ĐỦ THÔNG TIN:** Chuyển sang Bước 2.

### Bước 2: 🏗️ Xây Dựng Cấu Trúc
Tiến hành chuyển đổi ngữ nghĩa tự nhiên thành mô hình dữ liệu:
1. **List of Entities:** Liệt kê toàn bộ các thực thể cần thiết.
2. **Data Dictionary:** Lên danh sách các thuộc tính (PK, FK, data type: int, string, datetime, boolean...) cho từng thực thể. Thêm các trường cơ bản nếu cần (created_at, updated_at).
3. **Relationships Mapping:** Xác định đúng Cardinality (1:1, 1:n, m:n).
4. **State Machine Analysis:** Xác định xem thực thể nào cần quản lý trạng thái. Lên danh sách các trạng thái, Actor thực thi, và điều kiện chuyển.

*(Có thể output tóm tắt bước này ra màn hình chat để User xem nhanh).*

### Bước 3: ✍️ Sinh / cập nhật Data model (Incremental)
Sử dụng tool ghi file để tạo hoặc **append** kết quả vào **một file master** (đồng bộ workflow `ba-prd-create`):
**Đường dẫn bắt buộc:** `docs-BA/Data Model/ba-data-model.md` (tạo thư mục `docs-BA/Data Model/` nếu chưa có).

- **Cấu trúc file:** Metadata + **Change log** đầu file + các section `## [Tên miền / nhóm entity]` — mỗi section chứa Mermaid `erDiagram`, Data Dictionary, state (nếu có) cho miền đó.
- **Không** tạo `ba-erd-[tên-chủ-đề].md` rời hoặc `docs-BA/ERD/...` trừ khi User **chỉ định** tách file.
- Khi bổ sung miền mới: thêm section mới + dòng Change log; **không** ghi đè toàn bộ file nếu không cần.

Thực hiện sinh theo từng đợt trong section tương ứng:

**Đợt 1:** Metadata (nếu file mới), Change log, tiêu đề section miền, Mermaid `erDiagram`.
**Đợt 2:** Data Dictionary (bảng thuộc tính).
**Đợt 3:** Relationships / Notes (nếu có).
**Đợt 4 (Nếu có):** `stateDiagram-v2` và bảng chuyển trạng thái.

---
*(End of Skill Instruction)*
