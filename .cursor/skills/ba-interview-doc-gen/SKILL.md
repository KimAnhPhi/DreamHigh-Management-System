---
name: ba-interview-doc-gen
description: "Convert file danh sách câu hỏi khơi gợi yêu cầu (.md) thành file phỏng vấn Word (.docx) sẵn sàng sử dụng, tái sử dụng script md_qna_to_interview.py có sẵn."
---

# HƯỚNG DẪN SKILL: BA INTERVIEW DOC GEN

**Version:** 1.1.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Convert file danh sách câu hỏi khơi gợi yêu cầu Markdown sang DOCX phỏng vấn sử dụng script chuyên biệt md_qna_to_interview.py.

## 🎯 Mục đích

Nhận file `.md` output của skill `ba-elicitation-qna-gen` (trong `docs-BA/Elicitation/listQA/`) và tự động convert thành file Word (`.docx`) phỏng vấn chuyên nghiệp theo **template chuẩn BA Team**, sử dụng script `md_qna_to_interview.py`.

**Script `md_qna_to_interview.py` tạo ra:**
- **Header của tài liệu** nền xanh `#1F4E79` với tên dự án
- **Bảng thông tin phỏng vấn** (có ô điền ngày, BA, stakeholder)
- **Bảng câu hỏi 3 cột**: `#` | `Câu hỏi` | `Ghi chú / Câu trả lời` (trống để ghi tại chỗ)
- **Section header theo Stakeholder** (Giám đốc, Sales, Kho, Kế toán...)
- **Bảng tổng kết** và dòng ký xác nhận

**Atomic Focus:** Skill chỉ làm 1 việc duy nhất — convert `.md` → `.docx`. Không tạo câu hỏi, không cập nhật tracking.

---

## 📋 Nguyên tắc cốt lõi

1. **Script chuyên biệt — không viết lại:** Luôn dùng script tại `.agent/scripts/md_qna_to_interview.py`. Đây là script chuyên phân tích cấu trúc file listQA và render đúng theo template mẫu.
2. **Đường dẫn tuyệt đối:** Tất cả lệnh phải dùng đường dẫn tuyệt đối. Không dùng đường dẫn tương đối.
3. **Output mặc định cùng thư mục input:** Không yêu cầu hỏi thêm nếu user không chỉ định.
4. **Tên file thông minh:** Tự động sinh tên file DOCX từ tên file input.

---

## 🚀 Quy trình thực thi (BẮT BUỘC TUÂN THỦ)

### BƯỚC 1: XÁC ĐỊNH FILE INPUT

**Ưu tiên 1 — User cung cấp đường dẫn rõ ràng:**
- Dùng đường dẫn đó trực tiếp.
- Validate file tồn tại bằng cách đọc 1 dòng đầu (dùng Read).

**Ưu tiên 2 — User không cung cấp đường dẫn:**
- Tìm file mới nhất trong `docs-BA/Elicitation/listQA/` có pattern `questions_tracking_*.md`.
- Hiển thị danh sách tìm được, hỏi user chọn file nào.

**Nếu file không tồn tại:** Báo lỗi rõ ràng, yêu cầu user cung cấp đường dẫn đúng. **Không tiếp tục.**

---

### BƯỚC 2: XÁC ĐỊNH ĐƯỜNG DẪN OUTPUT

**Quy tắc đặt tên file DOCX:**

| Tên file input | → Tên file output |
|:--|:--|
| `questions_tracking_20260301_inventory_order.md` | `Interview_inventory_order_20260301.docx` |
| `questions_tracking_20260228_retail.md` | `Interview_retail_20260228.docx` |
| `questions_tracking_YYYYMMDD_[slug].md` | `Interview_[slug]_YYYYMMDD.docx` |

**Logic trích xuất tên:**
- Regex pattern: `questions_tracking_(\d{8})_(.+)\.md`
- Nhóm 1 = ngày (YYYYMMDD), Nhóm 2 = slug tên dự án
- Output: `Interview_[slug]_[ngày].docx`

**Đường dẫn output mặc định:** **Cùng thư mục với file input**

| File input | → Output mặc định |
|:--|:--|
| `docs-BA/Elicitation/listQA/questions_tracking_20260301_inventory_order.md` | `docs-BA/Elicitation/listQA/Interview_inventory_order_20260301.docx` |
| `docs-BA/Elicitation/listQA/questions_tracking_20260228_retail.md` | `docs-BA/Elicitation/listQA/Interview_retail_20260228.docx` |

> Nếu user chỉ định nơi khác (ví dụ: "lưu ra Downloads"), dùng đường dẫn họ yêu cầu.

---

### BƯỚC 3: CHẠY SCRIPT CONVERT

Thực thi lệnh sau trong terminal (PowerShell):

```powershell
py "e:\Training Project\Skill BA gg Antigravity\.agent\scripts\md_qna_to_interview.py" "<đường_dẫn_input.md>"
```

> 💡 **Khi không chỉ định output**, script tự đặt tên và lưu vào cùng thư mục input.

> 💡 **Windows note:** Dùng `py` (Python Launcher) thay vì `python` để đảm bảo tương thích. Script tự cài `python-docx` nếu thiếu.

**Ví dụ cụ thể (output mặc định — cùng thư mục input):**
```powershell
py "e:\Training Project\Skill BA gg Antigravity\.agent\scripts\md_qna_to_interview.py" `
  "e:\Training Project\Test bmad\docs-BA\Elicitation\listQA\questions_tracking_20260301_inventory_order.md"
# → Tự tạo: docs-BA/Elicitation/listQA/Interview_inventory_order_20260301.docx
```

**Chỉ định output riêng:**
```powershell
py "e:\Training Project\Skill BA gg Antigravity\.agent\scripts\md_qna_to_interview.py" `
  "<input.md>" `
  "<đường_dẫn_muốn_lưu.docx>"
```

**Xử lý kết quả:**

| Kết quả script | Hành động của Agent |
|:--|:--|
| `✓ Saved: [path]` | Thông báo thành công, hiển thị đường dẫn file |
| `✗ Failed to save` | Hỏi user đóng file Word đang mở → chạy lại |
| `Error: [file] not found` | Báo lỗi file input không tìm thấy |
| Lỗi import python-docx | Script tự cài package, chờ và thử lại |

---

### BƯỚC 4: THÔNG BÁO KẾT QUẢ

Sau khi convert thành công, luôn hiển thị summary ngắn gọn:

```
✅ Đã tạo file phỏng vấn thành công!

📄 File DOCX: C:\Users\Admin\Downloads\Interview_inventory_order_20260301.docx
📝 File nguồn: questions_tracking_20260301_inventory_order.md
📊 Nội dung: [X phần, Y câu hỏi — đếm từ file md nếu có thể]

💡 Bước tiếp theo:
   1. Mở file DOCX để review trước khi phỏng vấn
   2. In ra hoặc chia sẻ với stakeholder
   3. Sau phỏng vấn, dùng skill ba-elicitation-result-update để cập nhật kết quả
```

---

## ⚠️ Xử lý lỗi thường gặp

| Lỗi | Nguyên nhân | Giải pháp |
|:--|:--|:--|
| `Failed to save` | File DOCX đang mở trong Word | Đóng file Word, chạy lại |
| `python: command not found` | `python` không trong PATH | Dùng `py` thay `python` (Python Launcher trên Windows) |
| `[file] not found` | Đường dẫn input sai | Kiểm tra lại đường dẫn, dùng Tab để autocomplete |
| File DOCX tạo ra nhưng bảng bị lỗi | File input có ký tự đặc biệt | Mở file md kiểm tra định dạng bảng |

---

## 📌 Ràng buộc

- **KHÔNG** dùng script `md_to_docx.py` cho task này — script đó chỉ dùng cho meeting minutes generic.
- **KHÔNG** tự sửa script `md_qna_to_interview.py` trừ khi user yêu cầu rõ ràng.
- **KHÔNG** tạo nhiều file output từ 1 lần chạy.
- Giới hạn 500 dòng: file SKILL.md này phải giữ dưới 500 dòng.

