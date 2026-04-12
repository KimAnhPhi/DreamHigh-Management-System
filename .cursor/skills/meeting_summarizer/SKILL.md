---
name: meeting_summarizer
description: "Skills for summarizing meeting transcripts or images into structured reports and Jira-compatible task lists."
---

# HƯỚNG DẪN SKILL: MEETING SUMMARIZER

**Version:** 1.1.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill tổng hợp biên bản họp và tạo task list tương thích Jira từ transcript/ảnh.

## 🎯 Mục đích
Phân tích nội dung cuộc họp (transcript, ghi chú, hình ảnh bảng trắng) và sinh ra 2 output:
1. **Biên bản họp** cấu trúc chuẩn.
2. **Danh sách Task** tương thích Jira.

**Atomic**: Chỉ tổng hợp họp, không làm gì khác.

---

## 🚀 Quy trình
1. Đọc/nhận input từ BA (transcript, ảnh, ghi chú thô).
2. Trích xuất: Thời gian, địa điểm, người tham dự, nội dung thảo luận, kết luận, action items.
3. Sinh **Output 1** (Biên bản) trước, lưu file.
4. Sinh **Output 2** (Task Jira) sau, lưu file riêng.
5. *(Incremental)* Mỗi section sinh xong → ghi ngay, không chờ toàn bộ.
6. **Thư mục gốc:** Tạo `docs-BA/Meeting Note/` và (khi cần) `docs-BA/Meeting Note/Task Jira/` nếu chưa tồn tại.

---

## 📄 Output 1: Biên Bản Họp

**Đường dẫn:** `docs-BA/Meeting Note/[YYYY-MM-DD]_[Tên_Cuộc_Họp].md`

```markdown
#### I. THÔNG TIN CHUNG
- **Tên dự án**: [Project Name]
- **Tên cuộc họp**: [Meeting Title]
- **Hình thức họp**: [Online/Offline/Hybrid]
- **Chủ trì**: [Facilitator]

#### II. THỜI GIAN VÀ ĐỊA ĐIỂM
- **Thời gian**: [Date and Time]
- **Địa điểm**: [Location or Meeting Link]

#### III. THÀNH PHẦN THAM GIA
- [List of participants]

#### IV. NỘI DUNG TRAO ĐỔI
| STT | Chủ đề thảo luận | Kết luận |
|-----|------------------|----------|
| 1   | [Topic 1]        | [Conclusion 1] |

#### V. KẾ HOẠCH THỰC HIỆN
| STT | Nội dung công việc | Owner | Deadline | Priority |
|-----|-------------------|-------|----------|----------|
| 1   | [Task Description] | [Person] | [Due Date] | [High/Medium/Low] |
```

---

## 📄 Output 2: Danh sách Task Jira

**Đường dẫn:** `docs-BA/Meeting Note/Task Jira/[YYYY-MM-DD]_[Tên_Cuộc_Họp]_tasks.md`

```markdown
| Tên task | Nội dung thực hiện | Assignee (email) | Mã dự án | Deadline |
|----------|-------------------|------------------|----------|----------|
| [Task Name] | [Detailed steps] | [Email] | [PROJ-KEY] | [YYYY-MM-DD] |
```

**Hướng dẫn điền:**
- **Tên task**: Ngắn gọn, action-oriented (động từ + đối tượng).
- **Assignee**: Dùng email nếu biết, ngược lại để `[TBD]`.
- **Deadline**: Chuẩn hoá sang `YYYY-MM-DD`.
- Thông tin không có → ghi `N/A`.

