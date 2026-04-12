---
description: "Workflow to summarize meetings, create Jira tasks, and send email notifications."
---

# Workflow Tổng Hợp Biên Bản Họp (BBH)

Workflow này giúp tự động hóa quy trình từ lúc kết thúc cuộc họp đến khi gửi biên bản cho các bên liên quan.

## Quy trình thực hiện

1.  **Tổng hợp nội dung**:
    - Sử dụng skill `@[.agent/skills/meeting_summarizer]` để xử lý transcript hoặc hình ảnh cuộc họp.
    - AI sẽ tạo ra:
        - File tóm tắt: `Meeting Note/[YYYY-MM-DD]_[Meeting_Content].md`
        - Danh sách task: `Meeting Note/Task Jira/[YYYY-MM-DD]_[Meeting_Content]_tasks.md`

2.  **Người dùng xác nhận**:
    - AI sẽ hiển thị nội dung tóm tắt và danh sách task Jira dự kiến.
    - **Yêu cầu**: Người dùng kiểm tra và phản hồi "OK" hoặc yêu cầu chỉnh sửa.

3.  **Tạo task trên Jira**:
    - Sau khi người dùng xác nhận, AI sử dụng `atlassian-mcp-server` để quét file task và tạo issue tương ứng trên Jira.
    - AI sẽ phản hồi danh sách các link task vừa tạo thành công.

4.  **Chuyển đổi sang file .docx**:
    // turbo
    - AI thực hiện lệnh: `py .agent/scripts/md_to_docx.py "Meeting Note/[File_Tóm_Tắt].md" "Meeting Note/[File_Tóm_Tắt].docx"`
    - Đảm bảo định dạng chuyên nghiệp và không lỗi font tiếng Việt.

5.  **Gửi Email thông báo**:
    - AI hỏi người dùng danh sách email bổ sung (nếu có) ngoài danh sách thành viên tham gia họp.
    - AI soạn email bằng `gmail` MCP server:
        - **Tiêu đề**: Định dạng chuẩn, không lỗi font (ví dụ: `[BBH] - Tên Cuộc Họp - YYYY-MM-DD`).
        - **Nội dung (Body)**: Viết bằng HTML format đẹp, tóm tắt các ý chính và liệt kê link các task Jira đã tạo.
        - **Đính kèm**: File `.docx` vừa tạo ở bước 4.

---

### Lệnh kích hoạt
`/summarize_meeting`
