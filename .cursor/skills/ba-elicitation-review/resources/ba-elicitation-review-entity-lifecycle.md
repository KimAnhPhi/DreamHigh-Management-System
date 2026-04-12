# Thực thể cần quản lý & vòng đời (Entity–Lifecycle) — đủ để khơi gợi đầy đủ

**Dùng kèm skill:** `ba-elicitation-review`  
**Mục đích:** Đảm bảo review chỉ ra được **danh mục thực thể (aggregate/domain)** cần quản lý trong phạm vi dự án và **vòng đời hoạt động** (trạng thái, chuyển trạng, điều kiện) — làm cơ sở ERD, use case, rule.

**Tag gap liên quan:** **D** (Domain / dữ liệu nghiệp vụ & vòng đời). Có thể kèm **P** (luồng gắn bước), **S** (ai chuyển trạng), **E** (ngoại lệ đổi trạng), **C** (tuân thủ trên thực thể: retention, chứng từ).

---

## 1. Danh sách thực thể (Entity inventory)

Từ summary/history, kiểm tra:

| Kiểm tra | Gap khi… |
|:--|:--|
| **Đủ “đối tượng kinh doanh”** trong scope | Chỉ mô tả chữ chung (“quản lý khóa học”) mà không liệt kê được các **loại đối tượng** cần lưu/quản (vd. Khóa, Lớp, Đơn, Thanh toán, Hợp đồng…) |
| **Phân biệt thực thể vs thuộc tính** | Nhầm một khái niệm là thuộc tính của thực thể khác khi nghiệp vụ cần **bản ghi độc lập** (vd. “lớp” gắn khóa vs chỉ “tên lớp” là text) |
| **Phạm vi in/out** | Thực thể nằm ngoài scope nhưng vẫn **ảnh hưởng luồng** (vd. CRM) — cần ghi nhận là **biên** hoặc tích hợp |
| **Đối tượng tham chiếu (lookup)** | Danh mục cần chuẩn hóa (trạng thái đơn, loại thanh toán…) — có nhắc nguồn chân lý hay chưa |

**Không** tự thêm thực thể không có bóng dáng trong tài liệu — chỉ **suy ra có kiểm chứng** từ câu stakeholder hoặc ghi **gap “chưa đủ để liệt kê”**.

---

## 2. Vòng đời hoạt động (per entity)

Với **mỗi** thực thể **trọng yếu** (ảnh hưởng tiền, pháp lý, quyền, hoặc luồng chính), cần bằng chứng tối thiểu:

| Thành phần | Ý nghĩa | Gap khi… |
|:--|:--|:--|
| **Trạng thái (states)** | Các trạng thái nghiệp vụ có tên | Chỉ nói “đang xử lý” chung chung |
| **Chuyển trạng (transitions)** | Từ trạng thái A → B được phép khi nào | Không biết điều kiện hoặc ai kích hoạt |
| **Sự kiện kích hoạt** | User, hệ thống, batch, webhook… | “Tự động” không rõ trigger |
| **Trạng thái kết thúc / terminal** | Hoàn tất, hủy, hết hạn… | Không có hoặc nhầm với “xóa dữ liệu” |
| **Ngoại lệ đổi trạng** | Không đạt điều kiện, rollback, chờ bổ sung | Chỉ happy path |

**Gộp vòng đời:** Nếu hai thực thể luôn đi cặp (vd. Chi tiết đơn & dòng đơn), có thể mô tả trong **một** khối với mối quan hệ — miễn **không bỏ sót** trạng thái then chốt.

---

## 3. Liên kết với tiêu chí scorecard khác

| Tiêu chí | Liên hệ |
|:--|:--|
| **Coverage** | Có nhóm “đối tượng nghiệp vụ & trạng thái” trong phạm vi |
| **Depth** | Vòng đời có bước/điều kiện cụ thể |
| **Actionability** | Có thể viết state machine / bảng trạng thái nháp |
| **P / E** | Luồng = chuyển trạng; exception = nhánh trạng thái |

---

## 4. Ngưỡng chấm tiêu chí 8 (Entity & Lifecycle)

- **✅ Đạt:** Đã liệt kê được **các thực thể trọng yếu** trong scope và với **mỗi** thực thể đó có **trạng thái + chuyển trạng chính** (hoặc ghi rõ **một** vòng đời tập trung nếu nghiệp vụ là single main entity).  
- **⚠️ Cần bổ sung:** Có danh mục thực thể nhưng **một số** thiếu trạng thái/điều kiện chuyển; hoặc thiếu **một** thực thể then chốt đã lộ trong luồng tiền/pháp lý.  
- **❌ Thiếu:** Không suy ra được danh sách thực thể; hoặc không có vòng đời cho thực thể **core** (đơn, thanh toán, hợp đồng, đăng ký… — tùy domain).
