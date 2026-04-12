# 8 tiêu chí chấm điểm chất lượng elicitation (Scorecard)

**Dùng kèm skill:** `ba-elicitation-review`  
**Mỗi tiêu chí:** ✅ Đạt / ⚠️ Cần bổ sung / ❌ Thiếu — dựa trên **bằng chứng trong tài liệu**, không bịa số liệu mong đợi.  
**Chi tiết thực thể & vòng đời:** `ba-elicitation-review-entity-lifecycle.md`.

---

## 1. 📍 Coverage — Độ bao phủ chủ đề

Summary đã đề cập đến:

- [ ] Bối cảnh & quy trình hiện tại (As-Is)
- [ ] Vấn đề & tác động thực tế
- [ ] Mục tiêu & kỳ vọng kết quả
- [ ] Ràng buộc (tech, budget, timeline, pháp lý)
- [ ] Stakeholder & người dùng liên quan
- [ ] Trường hợp ngoại lệ / edge cases

**Đạt:** Có ít nhất **5/6** nhóm có bằng chứng rõ.  
**Cần bổ sung:** **3–4** nhóm.  
**Thiếu:** Dưới **3** nhóm.

*Liên hệ trụ P/S/E/C:* Coverage rộng; **edge + ràng buộc pháp lý** gần **E / C**. *Thực thể & vòng đời:* tiêu chí **8** và tag **D**.

---

## 2. 🔬 Depth — Độ sâu

- Số liệu / ví dụ cụ thể (tần suất, khối lượng, tỷ lệ…) hay chỉ cảm tính?
- Quy trình **theo bước** hay chỉ tổng quan?
- Tiêu chí thành công **đo được** hay chung chung?

**Đạt:** Có **≥ 3 phần** trong tài liệu có chi tiết hành động được (bước, ví dụ, hoặc số liệu stakeholder đã cung cấp).  
**Cần bổ sung:** Có thông tin nhưng mỏng.  
**Thiếu:** Gần như toàn mô tả chung, không gắn ví dụ/bước/số liệu.

*Lưu ý:* Không đánh ❌ Depth chỉ vì “chưa có KPI cụ thể” nếu stakeholder **chưa hứa cung cấp** — ghi **gap** + câu hỏi thu thập.

---

## 3. 🎯 Clarity — Rõ ràng, tránh mơ hồ

Tìm: từ mơ hồ (“thường”, “nhanh hơn”), passive không rõ chủ thể, yêu cầu không đo được.

**Đạt:** **< 2** điểm mơ hồ **quan trọng** (ảnh hưởng scope/ưu tiên).  
**Cần bổ sung:** **3–5** điểm.  
**Thiếu:** Phần lớn không đo được hoặc không gán được owner.

---

## 4. ⚡ Conflict Detection — Mâu thuẫn

Giữa stakeholder, ràng buộc vs kỳ vọng, hiện tại vs tương lai, NFR đối lập (bảo mật vs dễ dùng).

**Đạt:** Không mâu thuẫn, hoặc đã **ghi nhận + trạng thái** (chốt / chờ quyết).  
**Cần bổ sung:** Có tension chưa resolve.  
**Thiếu:** Mâu thuẫn rõ mà không nhắc.

---

## 5. 🧠 Hidden Assumptions — Giả định ẩn

Tech, quyền/vai, volume, “ai cũng biết quy trình”.

**Đạt:** Giả định quan trọng đã được confirm hoặc liệt kê explicit là **giả định cần xác nhận**.  
**Cần bổ sung:** 1–2 giả định cần hỏi.  
**Thiếu:** Nhiều giả định then chốt chưa đặt vấn đề.

---

## 6. 👥 Stakeholder Completeness

End user vs người đặt hàng, vận hành/support, legal/compliance nếu có, IT/dev, bên thứ 3.

**Đạt:** Các bên **ảnh hưởng trực tiếp** đã được đề cập hoặc **có lý do** loại trừ (out of scope).  
**Cần bổ sung:** 1–2 nhóm còn thiếu.  
**Thiếu:** Chủ yếu một góc nhìn.

*Liên hệ trụ S + P (actor theo bước).*

---

## 7. 🚀 Actionability — Đủ bước tiếp?

User story/use case có thể bắt đầu? Happy path? AC có thể nháp? Scope khoanh được?

**Đạt:** Có thể viết spec với risk chấp nhận được.  
**Cần bổ sung:** Cần **một** vòng follow-up ngắn.  
**Thiếu:** Cần elicitation lại có cấu trúc.

---

## 8. 📦 Entity & Lifecycle — Thực thể cần quản lý & vòng đời

Đã **liệt kê** các thực thể nghiệp vụ trọng yếu trong phạm vi và **vòng đời** (trạng thái, chuyển trạng, điều kiện, actor) đủ để không bỏ sót đối tượng cần lưu trữ / rule / tích hợp? Xem chi tiết & ngưỡng trong `ba-elicitation-review-entity-lifecycle.md`.

**Đạt:** Thực thể core + vòng đời chính đã có bằng chứng.  
**Cần bổ sung:** Thiếu trạng thái/điều kiện ở một số thực thể hoặc thiếu một thực thể then chốt đã lộ trong luồng.  
**Thiếu:** Không suy ra được danh mục thực thể; hoặc không có vòng đời cho thực thể **core**.

*Tag gap:* **D** (kèm P/S/E/C khi cần).

---

## Ánh xạ Scorecard → Kết luận (gợi ý)

| Tổng ✅ / 8 | Gợi ý trạng thái |
|:--|:--|
| ≥ 6 ✅ | 🟢 Sẵn sàng spec (nếu không có Critical gap theo rubric P/S/E/C/D) |
| 4–5 ✅ | 🟡 Follow-up ngắn |
| ≤ 3 ✅ | 🔴 Elicitation lại / làm rõ Critical trước |

**Critical gap** (rubric 4 trụ, **D** thiếu thực thể tiền/pháp lý, hoặc mâu thuẫn) có thể kéo xuống 🔴 dù scorecard cao.
