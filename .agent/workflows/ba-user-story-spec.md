---
description: Quy trình đặc tả User Story hoàn chỉnh từ giao diện đến nghiệp vụ chi tiết.
---

# Workflow: Đặc tả User Story Chi tiết

Workflow này hướng dẫn Business Analyst thực hiện đặc tả chi tiết cho một User Story, đảm bảo tính nhất quán giữa giao diện (UI), luồng xử lý (Sequence) và quy tắc nghiệp vụ (Activity Rules).

## Quy trình thực hiện

1. **Bước 1: Đặc tả màn hình (UI Specification)**
   - Sử dụng skill `ba-ui-spec` để mô tả chi tiết các control, trường dữ liệu và logic hiển thị trên màn hình.
   - Đầu ra: File `.md` chứa bảng đặc tả UI chi tiết.
   - Lưu file output vào thư mục User Story tương ứng, trong `reference/`.

2. **Bước 2: Phân tích luồng (Sequence Diagram)**
   - Sử dụng skill `ba-sequence-spec` để vẽ sơ đồ tương tác giữa User - Frontend - Backend - Database/Đối tác.
   - Đầu ra: Sơ đồ Mermaid sequence và đặc tả API liên quan.
   - Lưu file output vào thư mục User Story tương ứng, trong `reference/`.

3. **Bước 3: Đặc tả quy tắc nghiệp vụ (Activity Rule)**
   - Sử dụng skill `ba-activity-rule-spec` để mô tả các điều kiện ranh giới, logic tính toán và các case xử lý lỗi/thành công.
   - Đầu ra: Bảng Activity Rules hoặc sơ đồ Activity.
   - Lưu file output vào thư mục User Story tương ứng, trong `reference/`.

4. **Bước 4: Quality Gate bắt buộc trước khi tổng hợp US (Reference Completeness Gate)**
   - **Không được phép tạo/chốt file User Story cuối nếu chưa có đủ 3 file tham chiếu trong `reference/`:**
     - `UI_Spec_<slug>_<YYYYMMDD>.md`
     - `Sequence_<slug>_<YYYYMMDD>.md`
     - `Activity_Rules_<slug>_<YYYYMMDD>.md`
   - **Checklist pass/fail bắt buộc:**
     - [ ] Có file UI Spec trong `reference/`
     - [ ] Có file Sequence trong `reference/`
     - [ ] Có file Activity Rules trong `reference/`
     - [ ] 3 file cùng phạm vi nghiệp vụ (cùng chức năng/user story), không lệch ngữ cảnh
   - Nếu còn bất kỳ mục nào chưa đạt:
     - Dừng bước tổng hợp US.
     - Tạo bổ sung file còn thiếu trước.
     - Chỉ được chuyển Bước 5 khi checklist đạt 100%.
   - Không chấp nhận trạng thái “tạo US trước, bổ sung reference sau”.

5. **Bước 5: Tổng hợp tài liệu User Story**
   - Không sử dụng thêm skill tổng hợp.
   - Chỉ cần lấy thông tin từ 3 bước trên và gom lại thành 1 file User Story hoàn chỉnh.
   - **Bắt buộc tổng hợp Rule-based AC đầy đủ từ file Activity Rules theo đúng format bảng chuẩn:**
     - Lấy toàn bộ rule trong `reference/Activity_Rules_*.md` (bao gồm nhóm 1-6 và FE-only), không được chọn lọc thiếu.
     - Mỗi rule trong Activity Rules phải có ít nhất 1 dòng tương ứng trong phần Rule-based AC của User Story.
     - **Bảng Rule-based AC bắt buộc có đúng 5 cột:**
       - `Mã rule`
       - `API`
       - `Tên rule`
       - `Mô tả rule cụ thể`
       - `Lỗi thông báo/Xử lý nếu không thỏa mãn rule`
     - Với rule lặp ý, được phép gộp nhưng phải đảm bảo không mất phạm vi kiểm thử.
     - Mỗi dòng rule phải ghi rõ hành vi khi fail: mã lỗi/thông báo hoặc cách xử lý fallback.
   - **Bắt buộc kiểm tra chéo (traceability) trước khi chốt file:**
     - Không còn rule nào trong Activity Rules chưa được map sang Rule-based AC.
     - Không có Rule-based AC nào không truy vết được về UI Spec/Sequence/Activity Rules.
   - Đầu ra: File đặc tả User Story cuối cùng (Ready for Dev/QC).

## Template User Story (chuẩn đầu ra)

Tài liệu User Story cuối cùng cần có đủ 6 phần sau, và viết bằng tiếng việt

1. **Mô tả chung**
2. **Màn hình**
3. **Mô tả màn hình chi tiết**
   - Nội dung theo đầu ra của skill `ba-ui-spec` (chi tiết control, trường dữ liệu, logic hiển thị).
4. **Sequence Diagram**
5. **Danh sách API liên quan**
6. **Acceptance Criteria** (trình bày dạng bảng, gồm 2 loại):
   - **Rule-based**
   - **Scenario-based**

### Chuẩn bảng Rule-based (bắt buộc)

| Mã rule | API | Tên rule | Mô tả rule cụ thể | Lỗi thông báo/Xử lý nếu không thỏa mãn rule |
|---|---|---|---|---|
| R-01 | `GET /...` | ... | ... | ... |

### Chuẩn bảng Scenario-based (bắt buộc)

| ID | Given | When | Then |
|---|---|---|---|
| AC-S01 | ... | ... | ... |

## Kiểm soát chất lượng bắt buộc trước khi bàn giao

1. **Gate reference đã pass trước khi có US:**
   - Có đủ 3 file `reference` bắt buộc (UI Spec, Sequence, Activity Rules).
   - Nếu thiếu bất kỳ file nào, trạng thái tài liệu là **chưa đạt**, không được bàn giao US.
2. **Đối soát Rule đầy đủ:**
   - Đảm bảo Rule-based AC được tổng hợp đủ từ Activity Rules.
   - Đảm bảo không thiếu cột nào trong bảng Rule-based chuẩn 5 cột.
3. **Không rơi mất rule bảo mật/biên lỗi:**
   - Bắt buộc rà các rule nhóm 1, 3, 5, 6 và các lỗi chính (ví dụ: sai PIN, không đủ số dư, vượt hạn mức, không tìm thấy giao dịch).
4. **Đảm bảo nhất quán liên tài liệu:**
   - API trong Sequence, Activity Rules, Rule-based AC phải cùng tên/endpoint/ngữ nghĩa.
   - Nếu Sequence đổi, phải cập nhật lại Activity Rules, Rule-based AC và Scenario-based AC trước khi đóng tài liệu.
