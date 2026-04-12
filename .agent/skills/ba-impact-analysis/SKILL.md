---
name: ba-impact-analysis
description: "Skill phân tích tính khả thi và phạm vi ảnh hưởng khi có yêu cầu thay đổi từ stakeholder; output gồm CR, draft impact, danh sách change và cập nhật US."
---

# HƯỚNG DẪN SKILL: BA IMPACT ANALYSIS (COMPACT)

**Version:** 2.0.0  
**Author:** M2MBA  
**Last Updated:** 2026-03-23

## Mục tiêu

Khi có change request, skill này phải:
- Phân tích impact theo 6 nhóm BA chuẩn
- Đánh giá mức độ `Cao/Trung bình/Thấp` + lý do
- Liệt kê việc BA cần làm, risk/dependency, câu hỏi cần làm rõ
- Tạo bộ file đầu ra để dùng ngay cho review/triển khai

Skill tập trung góc nhìn nghiệp vụ, không đi sâu kỹ thuật.

## Input tối thiểu cần thu thập

1. **Yêu cầu thay đổi**: thay đổi gì, cho ai, mục tiêu, lý do (pain/risk/opportunity).  
2. **Ngữ cảnh hệ thống**: ERD/entity-field, UC/US liên quan, flow/process liên quan.  
3. **Thiếu dữ liệu**: hỏi lại tối đa 1-2 câu; nếu user yêu cầu giả định thì ghi rõ `Giả định: ...`.

## Quy trình chuẩn (9 bước)

### Bước 1 - Tóm tắt yêu cầu
- Tóm tắt 3-7 bullet theo mẫu: `cái gì - cho ai - để làm gì - vì sao`.

### Bước 2 - Xác định impact 6 nhóm
1. Chức năng/UC/US  
2. Quy trình nghiệp vụ  
3. Dữ liệu & báo cáo  
4. Giao diện/UX  
5. Tích hợp (API/Batch/Message)  
6. Stakeholder/bộ phận tác động

### Bước 3 - Mô tả impact từng đối tượng
Mỗi đối tượng phải có:
- Ảnh hưởng cụ thể (thêm/sửa/xóa gì)
- Mức độ (`Cao/Trung bình/Thấp`)
- Lý do đánh giá

### Bước 4 - Lập bảng Impact Analysis

```markdown
## Bảng Impact Analysis
| Nhóm | Đối tượng bị ảnh hưởng | Ảnh hưởng cụ thể (BA view) | Mức độ | Lý do |
|------|------------------------|----------------------------|--------|-------|
| ...  | ...                    | ...                        | ...    | ...   |
```

### Bước 5 - Danh sách việc BA phải làm
Phân nhóm:
- Cập nhật tài liệu hiện có (BRD/SRS/UC/flow/rule/report definition)
- Soạn tài liệu mới (form/guideline/training/communication)
- Hỗ trợ Dev/Test/Ops (scope chỉnh sửa, business case, edge case)

### Bước 6 - Risk & dependency (BA view)
Tối thiểu 3-5 ý:
- Rủi ro nghiệp vụ/compliance/KPI
- Rủi ro hiểu sai requirement/scope
- Dependency cần chốt (ai, cái gì, khi nào)

### Bước 6.5 - Câu hỏi cần làm rõ với stakeholder
Tạo câu hỏi cụ thể theo 5 nhóm, mỗi câu có mục đích hỏi:
1. Lý do/vấn đề  
2. Data input/output  
3. Process  
4. Công thức tính  
5. Quy định tuân thủ

### Bước 7 - Tạo file output bắt buộc
Phải tạo **2 file** trong cùng lần chạy:
- `CR_[slug_yeu_cau]_[YYYYMMDD].md`
- `CR_Draft_Impact_[slug_yeu_cau]_[YYYYMMDD].md`

Thư mục lưu: `Docs-BA/Elicitation/Change request/` (tự tạo nếu chưa có).

#### Khung tối thiểu cho CR (full-template)
1. Nội dung và lý do thay đổi  
2. Mục tiêu, phạm vi, giả định  
3. AS-IS vs TO-BE  
4. Phạm vi ảnh hưởng (process, entity/field, chức năng A/M/D)  
5. Business Rules + Integration/RBAC/NFR  
6. Risk/Dependency + UAT + kế hoạch triển khai

#### Template output bắt buộc (chi tiết)
```markdown
# Change Request - [Tên yêu cầu thay đổi]

## 1) Nội dung và lý do thay đổi
- **Nội dung thay đổi:** [Mô tả ngắn gọn thay đổi]
- **Lý do thay đổi:** [Pain point / rủi ro hiện tại / mục tiêu]
- **Đối tượng tác động chính:** [Bộ phận/role]

## 2) Phạm vi ảnh hưởng

### 2.1 Quy trình bị ảnh hưởng (AS-IS / TO-BE)
| Quy trình | AS-IS (hiện tại) | TO-BE (sau thay đổi) | Mức ảnh hưởng |
|----------|-------------------|----------------------|---------------|
| [Tên quy trình] | [Mô tả hiện trạng] | [Mô tả sau thay đổi] | [Cao/Trung bình/Thấp] |

### 2.2 Thực thể dữ liệu bị ảnh hưởng
| Thực thể | Loại ảnh hưởng | Trường/Tập dữ liệu | Mô tả thay đổi |
|---------|-----------------|--------------------|----------------|
| [Entity] | [Thêm mới/Bổ sung trường/Bổ sung tập dữ liệu của 1 trường/Chỉnh sửa] | [Tên field hoặc tập giá trị] | [Mô tả chi tiết] |

> **ERD liên quan đến thay đổi:** [Link hoặc mô tả ERD cập nhật]

### 2.3 Danh sách chức năng bị ảnh hưởng (tập trung theo chức năng)
| Tên chức năng | Loại thay đổi (A/D/M) | Hiện trạng | Nội dung cần thay đổi |
|---------------|-----------------------|------------|------------------------|
| [Tên chức năng cấp nghiệp vụ] | [A/D/M] | [Mô tả hiện tại của chức năng] | [Mô tả thay đổi ở mức chức năng] |
```

**Quy tắc bắt buộc cho bảng chức năng:**
- Liệt kê theo **chức năng/Use Case cấp nghiệp vụ**, không tách thành rule lẻ.
- Mỗi dòng phải trả lời rõ: **chức năng nào bị đổi**.
- Cột `Loại thay đổi` chỉ dùng 3 giá trị: `A` (Add), `D` (Delete), `M` (Modify).
- Nếu một chức năng có nhiều rule thay đổi, gộp vào **một dòng chức năng** và mô tả trong cột `Nội dung cần thay đổi`.

### Bước 8 - Danh sách yêu cầu thay đổi + xin confirm
Dựa trên impact + UC baseline, lập bảng:

```markdown
## Danh sách Yêu cầu Thay đổi
| Tên chức năng | Loại thay đổi (A/D/M) | Hiện trạng | Nội dung cần thay đổi |
|---------------|------------------------|------------|------------------------|
| ...           | A/M/D                  | ...        | ...                    |
```

Sau đó bắt buộc hỏi user confirm trước khi sang Bước 9.

### Bước 9 - Xử lý sau confirm
- **Add**: tạo `User Story Draft` cho từng chức năng mới.
- **Modify**:
  - Tạo file tổng hợp: `Change_Request_Modify_[slug]_[YYYYMMDD].md`
  - Tìm và cập nhật file US tương ứng
  - Thêm `Lịch sử thay đổi` (ngày, lý do, reference, nội dung đổi)
  - Nếu không tìm thấy file US: hỏi user trước khi tạo mới

## Guardrails bắt buộc

### Phải làm
- Luôn phân tích đủ 6 nhóm impact
- Mọi mức độ ảnh hưởng phải có lý do
- Mọi giả định phải ghi rõ `Giả định: ...`
- Luôn tạo đủ 2 file ở Bước 7
- Luôn xin confirm user trước khi thực thi Bước 9
- Luôn có mục `ERD liên quan đến thay đổi` trong CR và Draft
- Bảng chức năng chỉ dùng enum `A`, `D`, `M`
- Bảng thực thể dữ liệu chỉ dùng enum `Thêm mới`, `Bổ sung trường`, `Bổ sung tập dữ liệu của 1 trường`, `Chỉnh sửa`

### QA checklist trước khi trả output
- Không có ký tự rác, dòng thừa hoặc nội dung đứt đoạn.
- Không lặp tiêu đề section (trùng `##` cùng ý nghĩa).
- Đủ các khối bắt buộc: `Nội dung và lý do`, `AS-IS/TO-BE quy trình`, `Thực thể dữ liệu`, `ERD liên quan`, `Danh sách chức năng A/D/M`.
- Bảng chức năng chỉ liệt kê **chức năng cấp nghiệp vụ**; mỗi dòng phải trả lời rõ "chức năng nào bị đổi".
- Nếu không có chức năng bị xóa, ghi note ngoài bảng: `Không có chức năng loại D trong phạm vi CR này`.

### Không được
- Bỏ qua thu thập ERD/UC/flow (hoặc bỏ qua hỏi làm rõ khi thiếu)
- Mô tả chung chung, không mapping được đối tượng bị ảnh hưởng
- Đưa phân tích lệch sang technical deep-dive
- Update US Modify mà không thêm Change Log
- Liệt kê thay đổi theo rule rời rạc mà không chỉ ra chức năng bị ảnh hưởng
- Đưa dòng không phải chức năng vào bảng chức năng (ví dụ: `Không áp dụng`, `N/A`, ghi chú tổng quát)

## Chuẩn hóa enum đầu ra

### Enum bắt buộc cho bảng dữ liệu
- `Thêm mới`
- `Bổ sung trường`
- `Bổ sung tập dữ liệu của 1 trường`
- `Chỉnh sửa`

### Enum bắt buộc cho bảng chức năng
- `A` = Add
- `D` = Delete
- `M` = Modify

## Snippet thông báo hoàn tất

```markdown
✅ Đã tạo file Change Request: [path]
✅ Đã tạo file Draft phân tích: [path]
✅ Đã xử lý yêu cầu thay đổi:
- User Story Draft (Add): [n file]
- File tổng hợp Modify: [path]
- User Story đã update (Modify): [n file]
```
