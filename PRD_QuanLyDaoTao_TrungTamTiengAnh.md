# Product Requirements Document - Phần mềm Quản lý Đào tạo Trung tâm Tiếng Anh

| Trường thông tin | Chi tiết |
|---|---|
| **Phiên bản** | 1.1 |
| **Ngày tạo** | 29/03/2026 |
| **Trạng thái** | In Progress |
| **Người soạn** | Product Manager / BMad-Create-PRD |
| **Đơn vị yêu cầu** | Trung tâm Tiếng Anh |
| **Nguồn tham chiếu** | BRD v1.0 |

---

## Mục lục

1. [Tổng quan sản phẩm](#1-tổng-quan-sản-phẩm)
2. [Mục tiêu & Chỉ số thành công (Success Criteria)](#2-mục-tiêu--chỉ-số-thành-công-success-criteria)
3. [Đối tượng người dùng (Personas)](#3-đối-tượng-người-dùng-personas)
4. [Hành trình người dùng (User Journeys)](#4-hành-trình-người-dùng-user-journeys)
5. [Phạm vi dự án (Project Scoping & Phased Development)](#5-phạm-vi-dự-án-project-scoping--phased-development)
6. [Yêu cầu chức năng (Functional Requirements)](#6-yêu-cầu-chức-năng-functional-requirements)
7. [Yêu cầu phi chức năng (Non-Functional Requirements)](#7-yêu-cầu-phi-chức-năng-non-functional-requirements)
8. [Giả định & Ràng buộc](#8-giả-định--ràng-buộc)

---

## 1. Tổng quan sản phẩm

### 1.1. Bối cảnh
Trung tâm Tiếng Anh hiện đang vận hành bằng nhiều công cụ rời rạc (Excel, giấy tờ, phần mềm đơn lẻ). Điều này gây khó khăn trong việc theo dõi học viên, quản lý lớp học, kiểm soát học phí và tổng hợp báo cáo theo thời gian thực.

### 1.2. Vấn đề cần giải quyết
- Dữ liệu học viên phân tán, khó tổng hợp và tra cứu
- Xếp lớp, theo dõi tiến độ học tập còn thủ công
- Khó kiểm soát học phí và tình trạng công nợ
- Báo cáo tốn nhiều thời gian, không có dữ liệu realtime cho Ban Giám đốc

### 1.3. Giải pháp đề xuất
Xây dựng nền tảng Web app / SaaS tập trung, số hóa toàn bộ quy trình đào tạo từ tuyển sinh đến khi học viên hoàn thành khóa học, bao gồm 13 module nghiệp vụ chính, hỗ trợ đa chi nhánh và phân quyền theo vai trò.

---

## 2. Mục tiêu & Chỉ số thành công (Success Criteria)

### 2.1. User Success
- **Học viên & Phụ huynh:** Nhận thông báo kịp thời, theo dõi được tiến độ học tập (điểm số, chuyên cần, nhận xét của giáo viên) minh bạch, nhanh chóng. **Aha! moment:** Phụ huynh nhận report card của con và thông tin học phí tức thì qua app Notification/Email mà không cần gọi điện hỏi trung tâm.
- **Giáo viên:** Tiết kiệm thời gian chuẩn bị và quản lý lớp học nhờ lịch giảng dạy rõ ràng, dễ dàng nhập điểm và điểm danh trên một màn hình duy nhất. **Aha! moment:** Giáo viên xem được file syllabus và danh sách học viên trực tiếp trên điện thoại/laptop trước buổi học.
- **Nhân viên học vụ/Tuyển sinh:** Giảm thiểu tối đa thời gian nhập liệu tay, tra cứu hồ sơ tự động từ Lead sang Học viên nhanh chóng.

### 2.2. Business Success
- **Tăng trưởng & Giữ chân học viên:** Cải thiện tỷ lệ tái đăng ký (retention rate) nhờ trải nghiệm phụ huynh tốt hơn và hệ thống chăm sóc tự động.
- **Tối ưu Vận hành:** Thay thế 100% báo cáo thủ công bằng báo cáo trực tuyến realtime, giúp Ban Giám đốc ra quyết định ngay lập tức dựa trên số lượng lớp trống, giáo viên available.
- **Kiểm soát Tài chính:** Giảm sai sót học phí và công nợ xuống < 5%, rút ngắn thời gian xử lý dòng tiền thu/chi.

### 2.3. Technical Success
- Kiến trúc hệ thống và Database xử lý mượt mà cho ≥ 10.000 học viên.
- Uptime 99.5% trong giờ hành chính, thời gian response các thao tác tìm kiếm hay truy xuất báo cáo < 5 giây.
- Đảm bảo bảo mật toàn vẹn dữ liệu cho thông tin cá nhân và học phí.

### 2.4. Measurable Outcomes
- Tỷ lệ người dùng nội bộ (giáo viên, vận hành) active và sử dụng hệ thống hàng ngày đạt ≥ 90% sau 1 tháng go-live.
- Giảm 30% thời gian đăng ký và xử lý thủ tục đầu vào cho mỗi học viên mới.
- 100% hóa đơn/phiếu thu được xuất trực tiếp từ hệ thống.

---

## 3. Đối tượng người dùng (Personas)

| Persona (Actor) | Ghi chú & Đặc điểm | Nhu cầu cốt lõi (Core Needs) |
|---|---|---|
| **Ban Giám đốc** | Người phê duyệt, định hướng chiến lược. Rất bận rộn. | Dashboard tổng quan, báo cáo doanh thu & KPIs tự động. |
| **Quản lý đào tạo** | Điều hành các nghiệp vụ về giáo viên, lớp học. | Tính tự động hóa công việc xếp lịch, tránh xung đột. |
| **Nhân viên học vụ** | Operation chính. Cần nhập liệu nhiều, xử lý học phí. | Giao diện tiện lợi, báo cáo công nợ tự động, cảnh báo. |
| **Tư vấn tuyển sinh** | Sale & Customer rep. Định hướng bán khóa học. | Quản lý Leads CRM tốt, chuyển đổi lead thành HV liền mạch. |
| **Giáo viên** | Người trực tiếp mang lại giá trị dịch vụ. | Xem lịch, giáo án, nhập điểm, check-in học sinh tiện lợi. |
| **Học viên/Phụ huynh** | Người thụ hưởng dịch vụ và người thanh toán. | Nắm bắt tiến độ học, báo cáo điểm số định kỳ, nhắc nhớ đóng phí. |

---

## 4. Hành trình người dùng (User Journeys)

### 4.1. Hành trình đăng ký và phân lớp (Nhân viên Tư vấn & Học vụ)
- **Tình huống:** Có một phụ huynh đưa con đến kiểm tra năng lực để xếp lớp tiếng Anh Kids.
- **Bắt đầu (Opening):** Tư vấn viên mở hệ thống, nhập thông tin Lead mới kèm số điện thoại của phụ huynh. Ghi chú lịch test đầu vào.
- **Kịch tính (Rising Action):** Học viên nhí thực hiện bài test. Giáo viên hoặc Tư vấn viên lấy kết quả (Speaking/Writing) và nhập điểm vào hệ thống. Hệ thống lập tức đối chiếu barem điểm và đề xuất lộ trình "Cambridge Starters".
- **Đỉnh điểm (Climax):** Phụ huynh xem bài phân tích kết quả, đồng ý đóng tiền khóa học. Nhân viên tư vấn "Chuyển đổi" Lead thành Học viên, tạo phiếu thu học phí chỉ với 1 click. Hệ thống tự cập nhật trạng thái "Đã thanh toán" và gán học viên vào lớp "Starters-01" đang còn trống.
- **Kết thúc (Resolution):** Phụ huynh nhận SMS cảm ơn & Xóa bỏ biên lai giấy. Tư vấn viên đã xử lý xong cả đăng ký, thu tiền và xếp lớp trong vỏn vẹn 5 phút.
- **Capabilities Revealed:** CRM Lead Management, Placement Test Logging, Automated Level Recommendation, Invoice/Payment processing, Class Auto-Assignment, SMS Notification.

### 4.2. Hành trình vận hành lớp học hàng ngày (Giáo viên)
- **Tình huống:** Teacher John cần dạy lớp Flyers-02 lúc 18h tối nay.
- **Bắt đầu (Opening):** John đăng nhập hệ thống từ iPad lúc 17h, ấn vào tab "Lịch giảng dạy hôm nay". Anh thấy lớp Flyers-02 ở phòng 301.
- **Kịch tính (Rising Action):** Tại lớp học, anh mở danh sách lớp và tick nhanh "Có mặt/Vắng mặt/Đi trễ" cho 15 học sinh. Trong danh sách có cảnh báo 1 học sinh (Mary) đã vắng 2 buổi liên tiếp.
- **Đỉnh điểm (Climax):** Cuối giờ, John vào form đánh giá nhanh, chọn Grade/Nhận xét từ dropdown list cho từng bé. Bấm Submit.
- **Kết thúc (Resolution):** John kết thúc công việc không cần nộp giấy tờ điểm danh cho bộ phận Học vụ. Thông báo chuyên cần tự động gửi tới bộ phận Học vụ để gọi điện cho gia đình Mary.
- **Capabilities Revealed:** Teacher Schedule View, Quick Attendance Tracker, Absence Warning System, Fast Grading & Feedback Form, Automated internal alerting.

### 4.3. Hành trình theo dõi và thanh toán (Phụ huynh)
- **Tình huống:** Mẹ của Tony muốn theo dõi tình hình học tập và nhận nhắc nhở học phí.
- **Bắt đầu (Opening):** Mẹ Tony nhận được Zalo/App Notification thông báo tháng này học phí của Tony đã gần đến hạn.
- **Kịch tính (Rising Action):** Chị click vào link tra cứu hồ sơ (hoặc đăng nhập App). Chị vừa thấy học phí cần nộp, vừa tiện xem "Sổ liên lạc điện tử" điểm số kỳ thi Mid-term của Tony.
- **Đỉnh điểm (Climax):** Có đánh giá tốt từ giáo viên, mẹ Tony hài lòng, thực hiện quét mã QR Code để đóng học phí ngay trên màn hình. 
- **Kết thúc (Resolution):** Hệ thống thông báo "Thanh toán thành công" lập tức. Nhân viên trung tâm không cần gọi giục nợ.
- **Capabilities Revealed:** Parent Portal/Query Link, Grade Report View, Payment Notification Engine, QR Code Payment Integration.

---

## 5. Phạm vi dự án (Project Scoping & Phased Development)

### 5.1. MVP Strategy & Philosophy
**Cách tiếp cận MVP:** Operational MVP (Phục vụ vận hành nội bộ trung tâm là ưu tiên cao nhất trước khi cung cấp cổng tương tác cho khách hàng). Sản phẩm phải giải quyết được tính đúng đắn của dữ liệu: Quản lý được Danh mục, Học viên, Lớp học, Điểm danh và Thu học phí.

### 5.2. MVP Feature Set (Phase 1)
**Core User Journeys Supported:**
- Đăng nhập & cấu hình hệ thống
- Tuyển sinh đăng ký mới (chưa có CRM phễu phức tạp, chỉ ghi nhận thông tin)
- Xếp lớp, Điểm danh, Đánh giá năng lực của Giáo viên
- Cấn trừ học phí và in hóa đơn của Học vụ

**Must-Have Capabilities:**
- Module Quản lý Danh mục (Chương trình, Cấp độ, Phòng học...)
- Module Quản lý Học viên
- Module Quản lý Lớp học & Thời khóa biểu
- Module Quản lý Giáo viên (lịch dạy, lương theo giờ)
- Module Học phí & Tài chính cơ bản
- Authentication & Phân quyền RBAC.

### 5.3. Post-MVP Features (Phase 2 & Phase 3)
**Phase 2: Growth & CRM (Mở rộng & Tối ưu chuyển đổi)**
- Phễu CRM Tuyển sinh (Lead tracking, báo cáo tỷ lệ chuyển đổi).
- Hệ thống Automation Notification (Nhạc nợ học phí, thông báo lịch vắng tự động qua Email/SMS/Zalo).
- Reporting Dashboard nâng cao trực quan.
- Kho Tài liệu / Syllabus online.

**Phase 3: Vision (Trải nghiệm vượt trội)**
- Portal / Mobile App Native dành riêng cho Học viên & Phụ huynh.
- Tích hợp Payment Gateway thanh toán online & Hóa đơn điện tử VAT.
- Tính năng AI/Audit đánh giá hiệu suất giáo viên và học viên.
- Tính năng Chat/Tin nhắn nội bộ trên App.

### 5.4. Risk Mitigation Strategy
- **Technical Risks:** Data queries chậm khi vượt 10,000 học sinh. -> *Mitigation:* Chuẩn hóa CSDL từ đầu và tối ưu index; report dùng Pagination, không render biểu đồ phức tạp ở Phase 1.
- **Market/Adoption Risks:** Người dùng kháng cự do thao tác chậm hơn Excel. -> *Mitigation:* Focus UX/UI vào Data Entry (màn hình lưới, phím tắt), cho phép import Excel hàng loạt để xử lý dữ liệu cũ.
- **Resource/Cost Risks:** SMS/Zalo API tốn phí vận hành và tích hợp. -> *Mitigation:* Ở Phase 1 MVP, dùng Internal Alert nội bộ màn hình Admin thay vì automation API; dời automation API sang Phase 2.

---

## 6. Yêu cầu chức năng (Functional Requirements)

*Đây là "Hợp đồng năng lực" (Capability Contract). Chỉ những tính năng dưới đây mới được Designer vẽ UI và Developer code ở Phase 1 MVP.*

### Khía cạnh 1: Admin & Phân loại cấu hình (System Configuration & Danh mục)
- **FR-01:** Admin có thể tạo, sửa, ngừng áp dụng các danh mục dùng chung (Chương trình, Cấp độ, Loại lớp học, Phòng học).
- **FR-02:** Admin có thể tạo tài khoản, phân quyền Role-Based Access Control (RBAC) (Admin, Quản lý, Học vụ, Giáo viên).
- **FR-03:** Admin có thể thay đổi cấu hình hệ thống cho đa chi nhánh để quản lý độc lập dữ liệu chi nhánh.
- **FR-04:** Admin có thể xem ghi log (Audit Trail) cho các thao tác tác động đến tài chính/dữ liệu học viên.

### Khía cạnh 2: Quản lý Hồ sơ & Vòng đời học tập (Student Lifecycle)
- **FR-05:** Bộ phận Học vụ có thể tạo và tìm kiếm hồ sơ từ thông tin định danh học viên và thông tin liên lạc của phụ huynh.
- **FR-06:** Bộ phận Học vụ có thể thay đổi trạng thái lộ trình học tập của học viên (Lead -> Đang học -> Bảo lưu/Nghỉ học -> Tốt nghiệp).
- **FR-07:** Quản lý đào tạo có thể tạo thông tin Khóa học (thời lượng, sĩ số) kết nối logic với Hệ thống Danh mục.

### Khía cạnh 3: Quản lý Lịch giảng dạy & Lớp học (Scheduling & Teacher Ops)
- **FR-08:** Quản lý đào tạo có thể tạo lớp học, xếp lịch học theo mốc thời gian và gắn phòng học/Giáo viên hợp lệ (không bị trùng lịch).
- **FR-09:** Quản lý đào tạo có thể tiến hành dời lịch hoặc đổi giáo viên/đổi phòng cho các học phần khẩn cấp.
- **FR-10:** Giáo viên có thể truy cập hệ thống để xem Lịch giảng dạy (Thời khóa biểu cá nhân của bản thân).
- **FR-11:** Hệ thống có thể tự động thống kê số giờ dạy thực tế của giáo viên để bộ phận học vụ chốt lương theo giờ.

### Khía cạnh 4: Quản lý Học thuật (Academic Assessment)
- **FR-12:** Giáo viên/Học vụ có thể ghi nhận kết quả điểm Placement Test để hệ thống xuất đề xuất Cấp độ phù hợp.
- **FR-13:** Giáo viên có thể điểm danh vắng/có mặt/có phép trên danh sách học viên từng buổi học theo lịch.
- **FR-14:** Hệ thống có thể xuất cảnh báo vi phạm chuyên cần (vắng học liên tiếp) trên UI bảng lớp học.
- **FR-15:** Giáo viên có thể nhập điểm số định kỳ (giữa kỳ/cuối kỳ) và thêm comment nhận xét cho từng cá nhân lên hệ thống bảng điểm.

### Khía cạnh 5: Quản lý Thu chi Học phí (Financial Tracking)
- **FR-16:** Bộ phận Học vụ có thể thiết lập mức khung học phí gốc cho từng Khóa học/Lớp học.
- **FR-17:** Bộ phận Học vụ có thể thiết lập cấn trừ học phí ưu đãi (% hoặc fix amount) cho riêng lẻ học viên.
- **FR-18:** Bộ phận Học vụ có thể ghi log giao dịch đóng tiền (Tiền mặt/Chuyển khoản) và cập nhật số dư công nợ của học viên.
- **FR-19:** Bộ phận Học vụ có thể kết xuất Phiếu thu thanh toán của giao dịch học phí ra file PDF để in.
- **FR-20:** Quản lý có thể xem Dashboard/Báo cáo danh sách công nợ quá hạn và danh sách học viên đang còn nợ học phí.

---

## 7. Yêu cầu phi chức năng (Non-Functional Requirements)

### 7.1. Hiệu năng & Khả năng đáp ứng (Performance & Usability)
- UI/UX hướng dữ liệu Data-centric UI chuẩn Dashboard. Responsive tương thích Desktop & Tablet (do giáo viên thường dùng tablet trên lớp).
- Thao tác filter, search thông tin ở lưới grid mất < 2 giây tải trang.
- Hỗ trợ Import/Export file Excel (.xlsx) mượt mà cho các danh sách dài.

### 7.2. Bảo mật & Authorization (Security)
- Thông tin login mã hóa, kết nối ứng dụng bằng https (SSL/TLS).
- Kiến trúc Role-based Access, bảo đảm tính ranh giới. Người dùng thuộc "Chi nhánh A" không được quyền can thiệp hay nhìn thấy dữ liệu "Chi nhánh B" (Ngoại trừ Admin/Ban Giám đốc).
- Timeout tự khóa màn hình khi idle quá 30 phút.

### 7.3. Khả năng tích hợp (Interoperability)
- Không yêu cầu API tích hợp với ERP hay CRM thứ 3 ở Phase 1.
- Xây dựng DB linh hoạt và Backend API-First chuẩn bị cho Phase 2 (gắn SMS gateway) và Phase 3 (App Mobile Data sync). 

---

## 8. Giả định & Ràng buộc

- **Giả định:** Người dùng được đào tạo sử dụng phần mềm ít nhất 1 buổi trước khi go-live. Dữ liệu lịch sử (trên Excel cũ) đã được làm sạch (data cleansing) theo chuẩn định dạng import của dev team cung cấp. Trung tâm cam kết cung cấp đủ mạng WiFi tối thiểu cho nhân viên vận hành trên thiết bị.
- **Ràng buộc:** Không giải quyết các bài toán Kế toán tài chính pháp lý/kế toán thuế của doanh nghiệp, không giải quyết module tính lương toàn diện cho khối nhân viên Backoffice (chi làm Lương Giáo viên dựa trên giờ check-in dạy học đơn thuần). Ngân sách dự án Phase 1 phải cố định và scope được lock đúng như FR-01 -> FR-20.

---
*Tài liệu này được soạn theo chuẩn **BMad-Create-PRD Workflow**.*
