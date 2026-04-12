---
name: ba-mcq-gen
description: "Skill này được kích hoạt khi người dùng muốn tạo bộ câu hỏi trắc nghiệm (MCQ) dành cho Business Analyst từ tài liệu. Skill tập trung vào việc cover kiến thức quan trọng, sử dụng ngôn ngữ dễ hiểu và đảm bảo bám sát 100% tài liệu đầu vào."
---

# HƯỚNG DẪN SKILL: BA MCQ GEN

**Version:** 1.1.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Skill sinh bộ câu hỏi trắc nghiệm bám sát tài liệu, ngôn ngữ dễ hiểu cho Business Analyst.

## 🎯 Mục đích
Tạo bộ câu hỏi trắc nghiệm giúp Business Analyst (BA) kiểm soát và nắm vững các kiến thức cốt lõi trong tài liệu. Câu hỏi phải dễ tiếp cận, thực tế và tuyệt đối không lấy kiến thức bên ngoài tài liệu.

---

## 📋 Nguyên tắc cốt lõi

1.  **Bám sát tài liệu (Strictly Document-Based)**: 
    - Chỉ sinh câu hỏi dựa trên thông tin có trong tài liệu được cung cấp.
    - KHÔNG tự bổ sung kiến thức bên ngoài hoặc giả định các nội dung không có trong văn bản.
2.  **Ngôn ngữ BA-friendly**:
    - Sử dụng thuật ngữ chuyên ngành BA một cách chính xác nhưng diễn đạt câu hỏi và đáp án bằng ngôn ngữ dễ hiểu, thực tế.
    - Tránh các câu hỏi quá đánh đố về mặt kỹ thuật chuyên sâu nếu tài liệu không yêu cầu.
3.  **Cover kiến thức quan trọng**:
    - Tập trung vào các phần trọng tâm: Quy trình (Flow), Nghiệp vụ (Business Rules), Đối tượng (Stakeholders), Hệ thống (Systems/Data) và các ràng buộc (Constraints).
4.  **Xáo trộn đáp án (Answer Shuffling)**:
    - Đáp án đúng KHÔNG được mặc định nằm ở một vị trí cố định (ví dụ: luôn là A hoặc luôn là B).
    - Phải xáo trộn vị trí đáp án đúng (A, B, C, D) giữa các câu hỏi để tránh người học đoán mò.
5.  **Phân loại độ khó nhẹ nhàng**:
    - **Cơ bản**: Các định nghĩa, vai trò, hoặc thông tin hiển nhiên.
    - **Quan trọng**: Các quy tắc nghiệp vụ, logic tính toán, hoặc các bước trong quy trình.
    - (Không cần mức độ "Khó" mang tính đánh đố).

6.  **Quy tắc đặt tên bài test (Naming Rules)**:
    - Khi tạo mới một bài test, Agent phải chủ động đề xuất tên bài test.
    - **Yêu cầu tên**: Ngắn gọn, súc tích, toát lên nội dung chính của tài liệu.
    - **Giới hạn**: Tối đa **40 ký tự**.
    - **Quy trình**: Phải gửi tên đề xuất và yêu cầu USER xác nhận/chỉnh sửa trước khi hoàn tất tạo bài.

---

## 🚀 Quy trình thực hiện

### BƯỚC 1: QUÉT KIẾN THỨC TRỌNG TÂM
- Đọc tài liệu và xác định các nội dung mà một BA cần nắm vững để làm dự án (ví dụ: luật chơi, điều kiện cần/đủ, luồng dữ liệu).
- **Đề xuất tên bài test**: Dựa trên nội dung chính, tạo một cái tên dưới 40 ký tự và hỏi ý kiến USER.

### BƯỚC 2: SINH CÂU HỎI & XÁO TRỘN
- Biên soạn nội dung câu hỏi theo ngôn ngữ dễ hiểu.
- Tạo 4 phương án lựa chọn. **Lưu ý**: Trước khi trình bày, hãy chọn ngẫu nhiên vị trí cho đáp án đúng.
- Viết giải thích dựa trực tiếp trên đoạn văn/trang trong tài liệu.

### BƯỚC 3: XUẤT FILE
- Lưu file tại `docs-BA/MCQ/mcq-[tên-tài-liệu]-[YYYYMMDD].md` (tạo thư mục nếu chưa có).
- Sử dụng cơ chế **Incremental Update** nếu số lượng câu hỏi lớn.

---

## 📄 Format file output (Template)

```markdown
# Bộ câu hỏi trắc nghiệm: [Tên tài liệu]
**Ngày tạo:** YYYY-MM-DD
**Nguồn tài liệu:** [Tên file tài liệu]

---

## I. Mức độ: CƠ BẢN
| STT | Câu hỏi | Đáp án | Giải thích |
|:--|:--|:--|:--|
| 1 | [Nội dung câu hỏi dễ hiểu]<br>A. [ ]<br>B. [ ]<br>C. [ ]<br>D. [ ] | **[X]** | [Giải thích ngắn gọn, trích dẫn từ tài liệu] |

---

## II. Mức độ: KIẾN THỨC QUAN TRỌNG
| STT | Câu hỏi | Đáp án | Giải thích |
|:--|:--|:--|:--|
| ... | ... | ... | ... |
```

---
> **Ghi chú**: Đảm bảo các phương án nhiễu phải liên quan đến nghiệp vụ trong tài liệu để kiểm tra độ kỹ lưỡng khi đọc của BA.

