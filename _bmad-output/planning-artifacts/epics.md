---
stepsCompleted: ["step-01-validate-prerequisites"]
inputDocuments: ["PRD_QuanLyDaoTao_TrungTamTiengAnh.md", "architecture/01-project-context-analysis.md", "architecture/02-core-architectural-decisions.md", "architecture/03-implementation-patterns-api-contracts.md", "architecture/04-project-structure-boundaries.md"]
uiSyncNote: "2026-04 — Dong bo epic/stories voi FE dreamhigh-web: /hr/teachers (Teacher HR), /admin/users IAM (SystemUserModal da vai tro & chi nhanh), Design System midnight/gold."
---

# DreamHigh PMS - Epic Breakdown

## Overview

This document provides the complete epic and story breakdown for DreamHigh PMS, decomposing the requirements from the PRD, UX Design if it exists, and Architecture requirements into implementable stories.

## Requirements Inventory

### Functional Requirements

FR1: Admin có thể tạo, sửa, ngừng áp dụng các danh mục dùng chung (Chương trình, Cấp độ, Loại lớp học, Phòng học).
FR2: Admin có thể tạo tài khoản, phân quyền Role-Based Access Control (RBAC) (Admin, Quản lý, Học vụ, Giáo viên).
FR3: Admin có thể thay đổi cấu hình hệ thống cho đa chi nhánh để quản lý độc lập dữ liệu chi nhánh.
FR4: Admin có thể xem ghi log (Audit Trail) cho các thao tác tác động đến tài chính/dữ liệu học viên.
FR5: Bộ phận Học vụ có thể tạo và tìm kiếm hồ sơ từ thông tin định danh học viên và thông tin liên lạc của phụ huynh.
FR6: Bộ phận Học vụ có thể thay đổi trạng thái lộ trình học tập của học viên (Lead -> Đang học -> Bảo lưu/Nghỉ học -> Tốt nghiệp).
FR7: Quản lý đào tạo có thể tạo thông tin Khóa học (thời lượng, sĩ số) kết nối logic với Hệ thống Danh mục.
FR8: Quản lý đào tạo có thể tạo lớp học, xếp lịch học theo mốc thời gian và gắn phòng học/Giáo viên hợp lệ (không bị trùng lịch).
FR9: Quản lý đào tạo có thể tiến hành dời lịch hoặc đổi giáo viên/đổi phòng cho các học phần khẩn cấp.
FR10: Giáo viên có thể truy cập hệ thống để xem Lịch giảng dạy (Thời khóa biểu cá nhân của bản thân).
FR11: Hệ thống có thể tự động thống kê số giờ dạy thực tế của giáo viên để bộ phận học vụ chốt lương theo giờ.
FR12: Giáo viên/Học vụ có thể ghi nhận kết quả điểm Placement Test để hệ thống xuất đề xuất Cấp độ phù hợp.
FR13: Giáo viên có thể điểm danh vắng/có mặt/có phép trên danh sách học viên từng buổi học theo lịch.
FR14: Hệ thống có thể xuất cảnh báo vi phạm chuyên cần (vắng học liên tiếp) trên UI bảng lớp học.
FR15: Giáo viên có thể nhập điểm số định kỳ (giữa kỳ/cuối kỳ) và thêm comment nhận xét cho từng cá nhân lên hệ thống bảng điểm.
FR16: Bộ phận Học vụ có thể thiết lập mức khung học phí gốc cho từng Khóa học/Lớp học.
FR17: Bộ phận Học vụ có thể thiết lập cấn trừ học phí ưu đãi (% hoặc fix amount) cho riêng lẻ học viên.
FR18: Bộ phận Học vụ có thể ghi log giao dịch đóng tiền (Tiền mặt/Chuyển khoản) và cập nhật số dư công nợ của học viên.
FR19: Bộ phận Học vụ có thể kết xuất Phiếu thu thanh toán của giao dịch học phí ra file PDF để in.
FR20: Quản lý có thể xem Dashboard/Báo cáo danh sách công nợ quá hạn và danh sách học viên đang còn nợ học phí.

### NonFunctional Requirements

NFR1: UI/UX hướng dữ liệu Data-centric UI chuẩn Dashboard. Responsive tương thích Desktop & Tablet (do giáo viên thường dùng tablet trên lớp).
NFR2: Thao tác filter, search thông tin ở lưới grid mất < 2 giây tải trang.
NFR3: Hỗ trợ Import/Export file Excel (.xlsx) mượt mà cho các danh sách dài.
NFR4: Thông tin login mã hóa, kết nối ứng dụng bằng https (SSL/TLS).
NFR5: Kiến trúc Role-based Access, bảo đảm tính ranh giới. Người dùng thuộc "Chi nhánh A" không được quyền can thiệp hay nhìn thấy dữ liệu "Chi nhánh B" (Ngoại trừ Admin/Ban Giám đốc).
NFR6: Timeout tự khóa màn hình khi idle quá 30 phút.
NFR7: Uptime 99.5% trong giờ hành chính, thời gian response < 5 giây.
NFR8: Kiến trúc hệ thống và Database xử lý mượt mà cho ≥ 10.000 học viên.

### Additional Requirements

- Frontend Framework: React + Vite + TypeScript, dùng Zustand cho global state, React Query cho server state. UI dùng Tailwind CSS + Shadcn UI.
- Backend Framework: NestJS + Prisma + PostgreSQL.
- API Design: Mọi response API luôn bọc trong `{ statusCode, message, data, meta }`. Dùng class-validator cho Request DTO.
- Project Structure: Starter Template đã được khởi tạo (pms-eng-api và dreamhigh-web). Điều này ảnh hưởng đến Epic 1 Story 1 (không cần setup từ đầu mà chỉnh sửa/mở rộng repos hiện tại).
- Logic Implementation: Sử dụng Event-driven cho các cảnh báo, State-machine cho vòng đời học viên. Database Multi-tenancy thông qua `branchId`.

### UX Design Requirements

- NFR1: Data-centric Dashboard; responsive Desktop & Tablet.
- **Brand & DS:** DreamHigh Gold & Midnight; layout module chu��n `AppLayout` + `PageHeader`, thông báo toast qua `NotificationPortal`.
- **Màn hình đã làm rõ trên FE (mock/API sau):**
  - **`/admin/users`** — Quản trị hệ thống: tab Ngư��i dùng, Vai trò & quyền, Log thao tác, Chi nhánh, Cấu hình; modal tài khoản IAM (tạo/sử� đọc).
  - **`/hr/teachers`** — Quản lý giáo viên: danh sách + bảng kê lư�; chi tiết giáo viên (tab h�� sơ, nhật ký dạy, bảng lương); modal h�� sơ GV; điều ch��nh thù lao & phiếu lương (lu��ng vận hành học vụ).
  - **Dashboard:** tile Giáo viên tr�� tới `/hr/teachers` (vai trò ADMIN / MANAGER / STAFF).

### FR Coverage Map

FR1: Epic 1 - Cấu hình danh mục dùng chung
FR2: Epic 1 - Tính năng Role-Based Access Control (RBAC)
FR3: Epic 1 - Cấu hình hệ thống lưu trữ đa chi nhánh
FR4: Epic 1 - Theo dõi và ghi log Audit Trail
FR5: Epic 2 - Tạo và quản lý hồ sơ học viên
FR6: Epic 2 - Thay đổi trạng thái nhập học viên
FR7: Epic 1 - Cấu hình Khóa học chung
FR8: Epic 3 - Tạo lớp và xếp lịch học
FR9: Epic 3 - Cập nhật dời lịch giảng dạy
FR10: Epic 3 - Tra cứu Thời khóa biểu cá nhân
FR11: Epic 3 - Thống kê giờ làm việc thực tế của Giáo viên
FR12: Epic 2 - Nhập điểm bài thi xếp hạng
FR13: Epic 4 - Quản lý điểm danh trên lớp
FR14: Epic 4 - Cảnh báo hệ thống về chuyên cần
FR15: Epic 4 - Cập nhật bảng điểm và đưa nhận xét
FR16: Epic 5 - Thiết lập khung mức học phí cơ bản
FR17: Epic 5 - Xác định chính sách cấn trừ ưu đãi
FR18: Epic 5 - Ghi nhận thanh toán và công nợ
FR19: Epic 5 - Phát hành phiếu in PDF
FR20: Epic 5 - Báo cáo nợ thu quá hạn trực quan

## Epic List

### Epic 1: Thiết lập Hệ thống & Danh mục Đào tạo
Cung cấp khả năng cấu hình toàn diện cho trung tâm để định nghĩa cơ sở hoạt động, cấu hình quản trị RBAC và kiểm soát rủi ro thông qua Audit Log.
**FRs covered:** FR1, FR2, FR3, FR4, FR7

### Epic 2: Tuyển sinh & Quản lý vòng đời Học viên
Tự động luồng nhân sự (Học vụ/Tuyển sinh) tiếp nhận Lead, hoàn thành Test đầu vào và cập nhật trạng thái học viên để đảm bảo học sinh sẵn sàng nhập học. 
**FRs covered:** FR5, FR6, FR12

### Epic 3: Điều phối Thời khóa biểu & Lịch dạy
Tối ưu hóa quá trình xếp lịch tự động, chống trùng lấn cho lịch/phòng/giáo viên. Giúp giáo viên chủ yếu cập nhật TKB cá nhân và hỗ trợ tính số giờ làm cho bộ phận chi lương.
**FRs covered:** FR8, FR9, FR10, FR11

### Epic 4: Vận hành học thuật tại lớp
Trao quyền cho giáo viên thao tác hệ thống tức thì để điểm danh, cho điểm ngay tại buổi học và gửi các tín hiệu cảnh báo về chuyên cần học sinh một cách hệ thống.
**FRs covered:** FR13, FR14, FR15

### Epic 5: Xử lý Học phí & Thu hồi Công nợ
Quản trị dòng tiền một cách chuẩn xác: tự động hóa quy trình cấn trừ học phí ưu đãi, xuất phiếu thu PDF và liên tục đo lường/cảnh báo công nợ trên Dashboard.
**FRs covered:** FR16, FR17, FR18, FR19, FR20

## Epic 1: Thiết lập Hệ thống & Danh mục Đào tạo
Cung cấp khả năng cấu hình toàn diện hệ thống.

### Story 1.1: Xác thực & Quản lý Tài khoản (Auth & Profile)

As a Người dùng (Admin/Giáo viên/Học vụ/Phụ huynh),
I want thực hiện Đăng ký, Đăng nhập, Xem chi tiết tài khoản và Thay đổi/Reset mật khẩu,
So that tôi bảo vệ được thông tin cá nhân và truy cập đúng quyền hạn của mình.

**Acceptance Criteria:**

**Given** Chưa đăng nhập
**When** thực hiện Register, Login, Mất mật khẩu (Forgot Password)
**Then** hệ thống xác thực user, cung cấp JWT token (nếu login) hoặc email reset link, ngăn chặn truy cập trái phép.

**Given** Đang đăng nhập (Authenticated User)
**When** truy cập `/profile`
**Then** hiển thị thông tin chi tiết tài khoản và cho phép đổi mật khẩu.

### Story 1.2: Định nghĩa Danh mục Đào tạo & Khóa học (FR1, FR7)

As an Admin hoặc Quản lý Đào tạo,
I want tạo, sửa, xóa, ngừng áp dụng các Danh mục cốt lõi (Chương trình, Cấp độ, Loại lớp học, Phòng học, Khóa học),
So that hệ thống có dữ liệu gốc (Master Data) để các bộ phận khác vận hành lớp học sau này.

**Acceptance Criteria:**

**Given** Admin hoặc Quản lý đã đăng nhập
**When** truy cập trang Quản lý Danh mục hoặc Quản lý Khóa học
**Then** hệ thống hiển thị lưới (grid) grid dữ liệu có khả năng phân trang, cho phép thêm mới/sửa thông tin.
**And** khi lưu, dữ liệu được ghi vào Data Model chính xác và hỗ trợ thay đổi Status (Active/Inactive) để ngừng áp dụng mà không bị lỗi ràng buộc dữ liệu cũ.

### Story 1.3: Quản lý Người dùng & Phân quyền RBAC nâng cao (FR2, FR3)

As an Admin,
I want phân quyền truy cập cho user theo Role và cấu hình chi nhánh (Branch),
So that dữ liệu được bảo mật chuẩn theo ranh giới chức danh và ranh giới địa lý.

**Acceptance Criteria:**

**Given** Admin đăng nhập vào hệ thống
**When** truy cập `/admin/users`
**Then** Admin có thể thay đổi Role của `SystemUser` (Mặc định `STUDENT` -> `TEACHER`/`MANAGER`/`ADMIN`).
**And** cấu hình quyền được lưu vào JWT Payload trong mỗi phiên đăng nhập tiếp theo.

### Story 1.4: Triển khai Hệ thống Ghi vết (Audit Log) (FR4)

As an Admin,
I want theo dõi lịch sử thao tác của tất cả các User, đặc biệt liên quan đến Tài chính và xoá dữ liệu,
So that tôi có thể kiểm soát rủi ro, truy vết lỗi người dùng để xử lý sự cố.

**Acceptance Criteria:**

**Given** Một user thực hiện hành động DELETE hoặc UPDATE các thực thể quan trọng
**When** dữ liệu bị thay đổi trên API
**Then** hệ thống lưu tự động vào bảng `AuditLog` với `userId`, `action`, `resource`, `ipAddress` và JSON mô tả chi tiết thay đổi `oldValue -> newValue`.

## Epic 2: Tuyển sinh & Quản lý vòng đời Học viên
Luồng nhân sự tạo hồ sơ, test đầu vào, nhập học.

### Story 2.1: Quản lý Hồ sơ & Tìm kiếm Học viên (FR5)
As a Nhân viên Học vụ, I want tạo và tìm kiếm hồ sơ học viên, So that tôi có thể dễ dàng quản lý thông tin liên lạc và cập nhật thông tin tư vấn.
**Given** Học vụ truy cập trang danh sách Học viên
**When** họ thêm mới bằng Info của phụ huynh/học viên hoặc tìm bằng số điện thoại
**Then** hệ thống sẽ khởi tạo hoặc hiển thị Profile của họ lập tức với các tab Data.

### Story 2.2: Thay đổi trạng thái Lộ trình (FR6)
As a Học vụ, I want chuyển đổi trạng thái học viên (Lead -> Học), So that hệ thống tracking luồng vòng đời chính xác.
**Given** Một Học viên đang là Lead
**When** Học viên ra quyết định đóng tiền/nhập học
**Then** hệ thống chuyển Status thành 'Đang học' và lưu dấu thời gian chuyển đổi.

### Story 2.3: Ghi nhận Placement Test (FR12)
As a Tư vấn viên, I want ghi nhận điểm thi xếp hạng đầu vào, So that hệ thống có thể gợi ý lớp học phù hợp tự động.
**Given** Học sinh thi xong Placement test
**When** nhập điểm Listening/Reading/Writing vào hệ thống
**Then** hệ thống khớp barem với cấu hình Danh mục Level để gợi ý Cấp độ Phân lớp.

## Epic 3: Điều phối Thời khóa biểu & Lịch dạy
Tối ưu hóa xếp lịch lớp học và cập nhật thông tin tổng quan lớp.

### Story 3.1: Xếp lịch Lớp học (FR8)
As a Quản lý đào tạo, I want tạo lớp từ Khóa học và ghép Giáo viên/Phòng học, So that lớp có thể được vận hành.
**Given** Thời khóa biểu đang trống
**When** Quản lý gán Giáo viên A dắt lớp Starters lúc 18h phòng 101 (Nhưng giáo viên hoặc phòng đã bận)
**Then** hệ thống block và bắn cảnh báo Validation.

### Story 3.2: Dời lịch & Đổi giáo viên (FR9)
As a Quản lý, I want xử lý dời lịch gấp, So that phụ huynh và giáo viên đều được nắm thông tin.
**Given** Lớp diễn ra vào tối nay bị lỗi phòng hoặc giáo viên bệnh
**When** nhấn nút Dời lịch hoặc Swap Giáo viên
**Then** Session đó tự động dời sang ngày khác, các Session sau dời tịnh tiến hoặc cập nhật người phụ trách mới.

### Story 3.3: Tra cứu Thời khóa biểu cá nhân của Giáo viên (FR10)
As a Giáo viên, I want xem danh sách các buổi dạy của mình, So that tôi biết mình cần dạy lớp nào, giờ nào.
**Given** Giáo viên đăng nhập
**When** truy cập Dashboard Home
**Then** thấy hiển thị Widget Calendar liệt kê các Session sắp diễn ra.

### Story 3.4: Thống kê giờ dạy (FR11)
As a Kế toán/Học vụ, I want hệ thống cộng dồn tổng số giờ dạy của GV, So that tôi có thể tính lương tự động.
**Given** Nhiều Session đã diễn ra trong tháng và được check-in hoàn tất.
**When** đến cuối tháng truy cập Báo Cáo
**Then** xuất ra list số giờ thực tế đã dạy của mỗi giáo viên.

## Epic 4: Vận hành học thuật tại lớp
Trao quyền cho giáo viên thao tác hệ thống tức thì để điểm danh, cho điểm ngay tại buổi học.

### Story 4.1: Xem chi tiết lớp học
As a Giáo viên, I want xem chi tiết thông tin lớp học theo đường dẫn `/classes/[id]`, So that tôi biết danh sách học sinh, ghi nhận điểm danh và cập nhật điểm số.
**Given** Teacher đăng nhập vào hệ thống
**When** truy cập `/classes/[id]`
**Then** hiển thị giao diện UI Class Detail gồm các tab: Overview, Students, Attendance, Results.

### Story 4.2: Điểm danh buổi học (FR13)
As a Giáo viên, I want tick điểm danh Present/Absent, So that báo cáo chuyên cần được update.
**Given** Trong tab Attendance của lớp
**When** Giáo viên chọn 1 Session và tick trạng thái từng học viên
**Then** ghi nhận lập tức xuống Database.

### Story 4.3: Nhập bảng điểm (FR15)
As a Giáo viên, I want nhập điểm và lời phê, So that phụ huynh có đánh giá theo dõi.
**Given** Trong tab Results
**When** GV chọn bài test (Mid-term) và điền cột điểm
**Then** hệ thống tự lưu tự động và cho phép xuất cảnh báo điểm thấp.

### Story 4.4: Cảnh báo chuyên cần (FR14)
As a Quản lý, I want hệ thống tự báo động nếu học viên vắng liên tiếp, So that tôi kịp thời gọi chăm sóc.
**Given** Lớp học có học sinh vắng 3 buổi liên tục (Dữ liệu từ module Điểm danh)
**When** Quản lý truy cập Notification/Dashboard
**Then** Thấy danh sách đỏ các học sinh nguy cơ bỏ học.

## Epic 5: Xử lý Học phí & Thu hồi Công nợ
Quản trị dòng tiền và tính toán công nợ.

### Story 5.1: Cấu hình Khung Học phí gốc (FR16)
As a Học vụ, I want định nghĩa giá tiền cơ bản cho mỗi lớp, So that làm mốc thu cho các em học sinh.

### Story 5.2: Thiết lập Gắn ưu đãi (FR17)
As a Tư vấn, I want nhập mã/số tiền giảm giá khi học viên thanh toán, So that tính ra số tiền cần thu.

### Story 5.3: Ghi nhận Giao dịch & Công nợ (FR18)
As a Học vụ, I want bấm thu tiền mặt/CK, So that hệ thống tự trừ vào dư nợ của học sinh.

### Story 5.4: Xuất Phiếu thu PDF (FR19)
As a Học vụ, I want in biên lai sau khi thu tiền, So that trả lại phụ huynh cho chuyên nghiệp.

### Story 5.5: Dashboard Nợ học phí (FR20)
As a Manager, I want nhìn thấy List nợ đọng, So that nhắn nhân viên đi đòi.
