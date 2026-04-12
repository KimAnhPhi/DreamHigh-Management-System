---
name: ba-activity-rule-spec
description: "Skill chuyên nghiệp chuẩn hoá Sequence Diagram thành bảng các bước và sinh Activity Flowchart (Draw.io) + Validation Flow (Mermaid)."
---

# HƯỚNG DẪN SKILL: BA ACTIVITY RULE SPECIFICATION

**Version:** 1.0.0
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill chuyên nghiệp chuẩn hoá Sequence Diagram thành bảng các bước và sinh Activity Flowchart (Draw.io) + Validation Flow (Mermaid).

## Mô tả ngắn

Skill này nhận **Sequence Diagram** và sinh ra 3 loại output, **mỗi output sẽ được ghi ra 1 file riêng** theo thứ tự sau:
- **(1) File draft `.md` để confirm với user trước khi vẽ Activity Flowchart**  
  → Từ Sequence, skill sẽ chuẩn hoá thành **bảng các bước** với cấu trúc cột:  
  `Bước | Lane | Mô tả bước | Loại task (task / decision / event / note / ... )`  
  → Bảng này được ghi vào file riêng (ví dụ: `*-steps.md`) để BA/user **review & chỉnh sửa/confirm**.  
  → **Tên file steps sẽ dùng cùng basename với file sequence và được lưu cùng thư mục với file sequence nguồn** (nếu sequence đã có trong repo). **Khi tạo file mới không gắn với sequence có sẵn**, mặc định lưu vào `docs-BA/Sequence/` (giữ basename khớp với sequence).  
  → Với các bước BE chỉ thực hiện **truy vấn + trả kết quả** (không có thêm logic nghiệp vụ phức tạp), skill sẽ **gom thành 1 bước duy nhất** kiểu: `"BE xử lý yêu cầu ... và trả kết quả về FE"`, không tách riêng bước "query" và "trả về".  
  → Với các bước FE **chỉ “Nhận kết quả ...”** (không có xử lý UI/logic đi kèm), skill **không tạo bước riêng**, mà coi việc nhận kết quả là tiền đề cho bước FE xử lý/hiển thị ngay sau đó (bước FE tiếp theo sẽ mô tả luôn hành vi sử dụng kết quả đó).  
  → Chỉ sau khi user xác nhận bảng bước này, skill mới dùng danh sách bước đã confirm để vẽ Activity Flowchart.
- **(2) Activity Flowchart full luồng thao tác** ở dạng **Draw.io XML**  
  → ghi ra file riêng (ví dụ: `*-activity.drawio.xml`), phần generate XML sẽ **ủy quyền cho skill** [ba-bpmn-doc-gen](mdc:.agent/skills/ba-bpmn-doc-gen/SKILL.md) ở chế độ **flowchart draw.io**, chỉ truyền vào danh sách tasks/decision/lanes đã chuẩn hóa theo **bảng bước đã được confirm** ở trên.
- **(3) Flow chi tiết cho từng API** ở dạng **Mermaid code**, tập trung vào **6 nhóm rule validate trên BE**  
  → ghi ra file riêng (ví dụ: `*-validation-flow.mmd`), mỗi API 1 file.

### Lưu ý khi generate Mermaid `flowchart`

- **Không dùng comment dài/ngắt dòng quá phức tạp**: Mermaid có thể lỗi nếu có nhiều `%%` comment xen giữa các edge, nên gom comment thành block ngắn ở đầu section, tránh chèn giữa 2 cạnh liền nhau.
- **Hạn chế HTML phức tạp trong label**:  
  - Có thể dùng `<br/>` nhưng tránh lồng HTML phức tạp hoặc entity không cần thiết.  
  - Ưu tiên text thuần + xuống dòng bằng `\n` nếu có thể.
- **Không để dòng trống giữa các cạnh liên tiếp** trong cùng 1 cụm logic, vì một số parser/previewer nhạy cảm với khoảng trắng thừa.
- **Label của edge nên ngắn, không chứa `:` hoặc ký tự đặc biệt lạ**; nếu cần, giữ ở dạng text đơn giản (VD: `-- Không hợp lệ -->` là OK).
- **Escape entity HTML tối thiểu**: chỉ dùng `&gt;`, `&lt;`, `&amp;` khi thực sự cần, không mix vừa dấu thật vừa entity cho cùng ký tự trong một biểu thức.

Chi tiết rule xem thêm:
- Mapping Sequence → Activity: [mapping-sequence-to-activity.md](mdc:.agent/skills/ba-activity-rule-spec/mapping-sequence-to-activity.md)
- Layout & style Draw.io (ở mức business step, trước khi giao cho ba-bpmn-doc-gen render XML): [drawio-layout-rules.md](mdc:.agent/skills/ba-activity-rule-spec/drawio-layout-rules.md)
- 6 nhóm rule validation BE: [validation-6-groups.md](mdc:.agent/skills/ba-activity-rule-spec/validation-6-groups.md)
- Ví dụ minh hoạ: [examples-registration-flow.md](mdc:.agent/skills/ba-activity-rule-spec/examples-registration-flow.md)

