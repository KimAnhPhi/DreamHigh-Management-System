---
name: skill-creator
description: "Hỗ trợ tạo mới, chỉnh sửa và cải thiện các Agent Skill, cũng như đo lường hiệu suất của chúng. Sử dụng khi người dùng muốn tạo skill mới từ đầu, cập nhật hoặc tối ưu hóa skill hiện có, chạy đánh giá (evals) để kiểm tra skill, hoặc tối ưu hóa phần mô tả (description) để tăng độ chính xác khi kích hoạt skill."
---

# HƯỚNG DẪN SKILL: SKILL CREATOR

**Version:** 1.1.1
**Author:** M2MBA
**Last Updated:** 2026-03-17
**Description:** Hệ thống hỗ trợ thiết kế, phát triển và tối ưu hóa các Agent Skill chuyên biệt cho hệ thống Antigravity.

# Skill Creator (Trình tạo Skill)

Một kỹ năng chuyên dùng để tạo mới các skill và cải thiện chúng thông qua các vòng lặp.

Ở mức độ tổng quát, quy trình tạo một skill diễn ra như sau:

- Xác định bạn muốn skill đó làm gì và cách thức thực hiện cơ bản.
- Viết bản nháp cho skill.
- Tạo một vài test prompt (câu lệnh kiểm thử) và chạy thử Claude với quyền truy cập vào skill đó.
- Hỗ trợ người dùng đánh giá kết quả cả về định tính và định lượng.
  - Trong khi các lượt chạy thử diễn ra ngầm, hãy dự thảo một số tiêu chí đánh giá định lượng nếu chưa có (nếu đã có, bạn có thể sử dụng nguyên trạng hoặc điều chỉnh nếu cần). Sau đó giải thích chúng cho người dùng.
  - Sử dụng script `eval-viewer/generate_review.py` để hiển thị kết quả cho người dùng xem xét, đồng thời cho phép họ kiểm tra các số liệu định lượng.
- Viết lại skill dựa trên phản hồi từ việc đánh giá kết quả của người dùng (và từ các lỗi rõ ràng xuất hiện trong các mốc kiểm thử định lượng).
- Lặp lại cho đến khi hài lòng.
- Mở rộng tập kiểm thử và thử lại ở quy mô lớn hơn.

Nhiệm vụ của bạn khi sử dụng skill này là xác định xem người dùng đang ở bước nào trong quy trình này và nhảy vào hỗ trợ họ tiến triển qua các giai đoạn đó. Ví dụ, nếu họ nói "Tôi muốn tạo một skill cho X", bạn có thể giúp họ làm rõ ý tưởng, viết bản nháp, viết các ca kiểm thử, xác định cách đánh giá và thực hiện các lượt chạy thử.

Mặt khác, nếu họ đã có bản nháp, bạn có thể chuyển ngay sang phần đánh giá/lặp lại để tối ưu.

Tất nhiên, bạn luôn cần linh hoạt. Nếu người dùng nói "Tôi không cần chạy một đống đánh giá, chỉ cần làm thử cho biết thôi", bạn cũng có thể làm theo cách đó.

Sau khi skill hoàn thành (thứ tự có thể linh hoạt), bạn cũng có thể chạy công cụ cải thiện mô tả skill (có script riêng) để tối ưu hóa việc kích hoạt skill chính xác hơn.

# Quy trình tạo một skill

### Nắm bắt ý định (Capture Intent)
Bắt đầu bằng cách hiểu ý định của người dùng. Cuộc hội thoại hiện tại có thể đã chứa một quy trình mà người dùng muốn chuyển hóa thành skill (ví dụ: họ nói "hãy biến luồng này thành một skill"). Nếu vậy, hãy trích xuất thông tin từ lịch sử hội thoại trước — các công cụ đã dùng, trình tự các bước, các điểm chỉnh sửa của người dùng, định dạng input/output đã quan sát được. Người dùng có thể cần bổ sung các vùng còn trống và nên xác nhận trước khi chuyển sang bước tiếp theo.

1. Skill này giúp Claude làm được việc gì?
2. Khi nào skill này nên được kích hoạt? (các cụm từ/ngữ cảnh của người dùng)
3. Định dạng output mong đợi là gì?
4. Chúng ta có nên thiết lập các ca kiểm thử (test cases) để xác minh skill hoạt động không? Các skill có output có thể xác minh khách quan (chuyển đổi file, trích xuất dữ liệu, viết code, quy trình cố định) sẽ được hưởng lợi từ các câu lệnh kiểm thử. Các skill có output mang tính chủ quan (phong cách viết, nghệ thuật) thường không cần. Hãy gợi ý lựa chọn mặc định phù hợp tùy theo loại skill, nhưng để người dùng quyết định.

### Phỏng vấn và Nghiên cứu (Interview and Research)
Chủ động đặt câu hỏi về các trường hợp biên (edge cases), định dạng input/output, file mẫu, tiêu chí thành công và các phụ thuộc. Đợi cho đến khi các phần này được làm rõ rồi mới viết các test prompt.

Kiểm tra các MCP hiện có - nếu hữu ích cho việc nghiên cứu (tìm tài liệu, tìm các skill tương tự, tra cứu best practices), hãy nghiên cứu song song thông qua subagents nếu có, nếu không thì thực hiện trực tiếp. Hãy chuẩn bị sẵn ngữ cảnh để giảm bớt gánh nặng trả lời cho người dùng.

### Viết file SKILL.md
Dựa trên kết quả phỏng vấn người dùng, điền đầy đủ các thành phần sau:

- **name**: Định danh của skill (ID).
- **description**: Khi nào kích hoạt, skill đó làm gì. Đây là cơ chế kích hoạt chính - bao gồm cả chức năng của skill VÀ các ngữ cảnh cụ thể khi nên sử dụng nó. Toàn bộ thông tin "khi nào sử dụng" nằm ở đây, không nằm trong thân bài. Lưu ý: Hiện tại Claude có xu hướng "ngại" dùng skill ngay cả khi chúng hữu ích. Để khắc phục, hãy viết phần mô tả mang tính "gợi ý mạnh mẽ". Ví dụ: Thay vì "Cách xây dựng dashboard đơn giản...", hãy viết "Cách xây dựng dashboard đơn giản. Hãy đảm bảo sử dụng skill này bất cứ khi nào người dùng nhắc đến dashboard, trực quan hóa dữ liệu, số liệu nội bộ, hoặc muốn hiển thị bất kỳ loại dữ liệu nào của công ty, ngay cả khi họ không yêu cầu rõ ràng một 'dashboard'."
- **Phần còn lại của skill :)**

### Hướng dẫn viết nội dung Skill
Tuân thủ các nguyên tắc sau để viết hướng dẫn hiệu quả cho skill:

#### Phong cách viết
- Sử dụng ngôn ngữ rõ ràng, chuyên nghiệp nhưng vẫn mang tính hỗ trợ.
- Cấu trúc hướng dẫn logic bằng cách sử dụng tiêu đề, danh sách gạch đầu dòng và bảng biểu.
- Tập trung vào các bước có thể thực hiện được và các ràng buộc rõ ràng.
- Tránh sự mơ hồ. Nếu cần một công cụ hoặc định dạng cụ thể, hãy nêu rõ.

#### Các ca kiểm thử (Test Cases)
Nếu người dùng chọn tạo test cases, hãy tạo một vài test prompt ban đầu trong `scripts/test_prompts.json` (hoặc tương tự). Những test này nên bao gồm trường hợp sử dụng chính và ít nhất một trường hợp biên.

# Chạy và đánh giá các ca kiểm thử
(Hướng dẫn chi tiết về việc chạy đánh giá, dự thảo các khẳng định (assertions) và sử dụng `eval-viewer` nằm trong thư mục `eval-viewer`.)

# Cải thiện skill
(Hướng dẫn chi tiết về vòng lặp cải tiến và tối ưu hóa mô tả bằng các script đi kèm.)

# Các file tham chiếu
- `references/`: Các ví dụ chất lượng cao về các skill hiện có và tài liệu hướng dẫn.
- `scripts/`: Các script Python để tối ưu hóa mô tả skill và đánh giá hiệu năng.
