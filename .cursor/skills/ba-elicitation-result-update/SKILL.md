---
name: ba-elicitation-result-update
description: "Chuyên trách cập nhật kết quả khơi gợi yêu cầu từ Meeting Notes hoặc Stakeholder files."
---

# HƯỚNG DẪN SKILL: CẬP NHẬT KẾT QUẢ KHƠI GỢI YÊU CẦU

**Version:** 1.4.1  
**Author:** M2MBA  
**Last Updated:** 2026-04-10  
**Description:** Cập nhật kết quả khơi gợi từ meeting / stakeholder → tracking, history, summary.

## Mục đích
Cập nhật trạng thái đã làm rõ từ input BA. **Atomic:** chỉ cập nhật kết quả, không sinh câu hỏi mới.

## Nguyên tắc
1. **Phân tích input**: Trích I/O, quy trình, công thức (meeting notes, tài liệu stakeholder).
2. **Ground truth**: Chỉ đánh ✅ khi là kết quả **làm việc trực tiếp với stakeholder** — **không** đánh ✅ từ “file tìm hiểu domain” của BA.
3. **Module**: Gán đúng nhóm nghiệp vụ (Bán hàng, Mua hàng, Kho, Tổng quan…).
4. **Tracking** `docs-BA/Elicitation/listQA/`: đúng file; một ý chạm nhiều module → cập nhật **tất cả** file liên quan.
5. **Summary** `docs-BA/Elicitation/`: **tên file = chủ đề**; trong file **phải link** tới (các) history liên quan; đã có summary cùng chủ đề → **chỉ update** (thêm link buổi mới nếu cần); chủ đề mới → **file mới**. Khi input có quy tắc/ràng buộc: **bắt buộc** mục **Business Rule** (NB + ràng buộc dữ liệu) — cơ sở ERD.
6. **History** `docs-BA/Elicitation/history/YYYYMMDD_[stakeholder]_[chu_de].md`: **không** là bảng tick đúng/sai; viết **như tài liệu vận hành** (đọc là hiểu As-Is / muốn gì, không cần transcript):
   - Bảng bước: STT, Ai, Việc, Hệ thống/tool (mail, Excel, PM cũ…), mô tả, I/O, tình huống phát sinh, công thức/logic, quy định, quyền, template, báo cáo, trao đổi bộ phận khác qua kênh nào
   - Tham số cố định; **Hiện trạng** vs **Định hướng**; Pain (🔴/🟠/🟡) + đối tượng; tài liệu cần thêm + câu mở + stakeholder follow-up
7. **Tag ngày**: Câu mới/follow-up trong tracking — cột Mục: `[FOLLOW-UP · YYYY-MM-DD]` (vd. `[FOLLOW-UP · 2026-03-01]`).
8. **Incremental**: Sửa từng đoạn nhỏ; không ghi đè cả file lớn một lần.
9. **Cuối mỗi `listQA` đã sửa**: luôn có/cập nhật:

   `## Danh sách các câu hỏi cần follow-up`

   — tổng hợp nhanh câu **mới** hoặc **còn follow-up** lần này (có thể kèm ID dòng/bảng); các câu **vẫn** nằm đúng nhóm phía trên. Không có follow-up mới: *Không có follow-up mới trong lần cập nhật này.*

## Guard (bắt buộc trước khi kết thúc phiên — trừ user chỉ định ngoại lệ)

| # | Đầu ra | Yêu cầu |
|---|--------|---------|
| **1** | **History** | ≥1 file `docs-BA/Elicitation/history/YYYYMMDD_[stakeholder]_[chu_de].md` (Nguyên tắc #6). |
| **2** | **Summary** | File trong `docs-BA/Elicitation/`, tên theo chủ đề (vd. `YYYYMMDD_summary_<slug>.md`), **link** history buổi này. Cùng chủ đề → update; chủ đề mới → file mới. |
| **3** | **Tracking** | Đã sửa `listQA` + mục cuối `## Danh sách các câu hỏi cần follow-up` (#9). |

## Quy trình
**Input** → **Quét** `listQA/` → **Phân loại** module/chủ đề → **Sửa tracking** (incremental: ⬜→✅, cột kết quả, #7, #9) → **History** (#6) → **Summary** (#5): update hoặc tạo + link history + Business Rule nếu có; summary quá lớn có thể **tách theo chủ đề** (không trùng tên hai chủ đề khác nhau).
