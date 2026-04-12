# HTML Demo Guidelines

Tài liệu này cung cấp **Cấu trúc HTML Mẫu** và **Danh sách các Section Cần Có** để Agent tạo file HTML Demo.

## 1. Yêu cầu Các Section Hiển Thị
File HTML phải show được đầy đủ các hạng mục:
1. **Brand Overview**: Header tổng quan, Tên Brand, Tagline, Logo (nếu có placeholder).
2. **Color System**: Các ô swatch hiển thị màu sắc Primary, Secondary, Neutral, Semantic. Ghi rõ mã HEX.
3. **Typography**: Bản demo từ Thẻ H1 đến H6, phong cách chữ Body, Caption.
4. **Buttons & Interactive**: Các state của Button (Primary, Secondary, Destructive), Input text box.
5. **Components (Cơ bản)**: Render một số UI Components nổi bật như Card, Breadcrumb, Tabs, Alerts. (Bạn không bắt buộc code 100% 35 components nhưng phải ưu tiên code những core components (Giao diện thẻ Form, Button, Bảng Table, Badge)).

## 2. Format HTML Structure Mẫu

Structure HTML bắt buộc:
```html
<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>[Brand Name] Brand Guideline Demo</title>
    <!-- THÊM FONT GOOGLE Ở ĐÂY DỰA TRÊN GUIDELINE -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <style>
        /* Extract Design Tokens thành CSS Variables */
        :root {
            /* Colors */
            --color-primary: #HEX;
            --color-primary-dark: #HEX;
            --font-heading: 'FontName', sans-serif;
            /* Các tokens khác từ file guideline... */
        }
        
        body {
            font-family: var(--font-heading);
            margin: 0; padding: 0;
            background: #F8F9FA;
            color: #333;
        }

        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 24px;
        }
        
        section {
            background: #fff;
            padding: 24px;
            border-radius: 8px;
            margin-bottom: 24px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.05);
        }

        /* Demo Styles (Colors, Spacing) */
        .color-box {
            width: 80px; height: 80px; border-radius: 8px;
            display: inline-block; margin-right: 16px;
        }
        /* Style cho Button, Form ... */
        
    </style>
</head>
<body>
    <div class="container">
        <!-- Render các khối ở đây -->
        <section id="overview">
            <h1>[Brand Name] Guideline</h1>
        </section>

        <section id="colors">
            <h2>Color System</h2>
            <!-- Vẽ div.color-box -->
        </section>

        <section id="typography">
            <h2>Typography</h2>
            <!-- Render H1 -> H6 -->
        </section>

        <section id="components">
            <h2>Core Components</h2>
            <!-- Render Button, Input, Card -->
        </section>
        
        <!-- Các section khác -->
    </div>
</body>
</html>
```

## 3. Checklist khi Sinh HTML Demo
- [ ] Đã define CSS Variables chuẩn xác.
- [ ] Font chữ import từ Google Fonts đang hoạt động (không bị typo name).
- [ ] Các color boxes hiển thị đúng Background Color khai báo.
- [ ] Layout HTML tuân thủ Responsive Design (Container tự căn giữa).
- [ ] Là một file chạy Standalone độc lập không phụ thuộc file JS/CSS bên ngoài.
