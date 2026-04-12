# 3. Implementation Patterns (API Contracts)

Để đảm bảo đồng bộ khi AI code (Backend và Frontend), chúng ta quy định chung chuẩn biên DTO như sau:

**1. Request DTO:**
Sử dụng `class-validator` (cho NestJS) ở Backend. Mọi payload từ Client phải match với DTO này.
```typescript
// VD: create-student.dto.ts
export class CreateStudentDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;
  
  // ...
}
```

**2. Standardized Response Format:**
API luôn wrap dữ liệu trả về theo Response Interface dưới đây:
```typescript
{
  "statusCode": 200,
  "message": "Lấy danh sách thành công",
  "data": [ { "id": 1, "name": "Mary" } ],
  "meta": {
    "page": 1,
    "limit": 10,
    "total": 50
  }
}
```
Frontend bắt buộc gọi thông qua abstraction layer `api-client.ts` để đọc field `data`.

---
