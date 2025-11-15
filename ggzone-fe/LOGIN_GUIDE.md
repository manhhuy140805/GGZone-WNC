# 🔐 Hướng Dẫn Đăng Nhập - GGZone

## Tài Khoản Demo

Hệ thống đã được tích hợp với **6 tài khoản demo** để bạn có thể test ngay:

### 📋 Danh Sách Tài Khoản

| Tên đầy đủ      | Email                | Password   | Role      | Verified |
| --------------- | -------------------- | ---------- | --------- | -------- |
| Alice Nguyen    | alice@example.com    | alice123   | user      | ✓        |
| Bob Tran        | bob@example.com      | bob123     | moderator | ✓        |
| Charlie Pham    | charlie@example.com  | charlie123 | user      | ✗        |
| David Le        | david@example.com    | david123   | user      | ✓        |
| Emma Vo         | emma@example.com     | emma123    | user      | ✓        |
| Frank Duong     | frank@example.com    | frank123   | admin     | ✓        |

## 🚀 Cách Sử Dụng

### Cách 1: Đăng nhập thủ công

1. Mở trang Login
2. Nhập email và password từ bảng trên
3. Click "Log in"

### Cách 2: Đăng nhập nhanh (Quick Login)

1. Mở trang Login
2. Click vào "🔑 Hiển thị tài khoản demo"
3. Click vào bất kỳ tài khoản nào để đăng nhập ngay lập tức

## 🎯 Tính Năng Đã Tích Hợp

### ✅ Auth Service (`src/services/authService.ts`)

- **Login**: Xác thực email/password với dữ liệu mock
- **Logout**: Xóa session và token
- **Get Current User**: Lấy thông tin user từ localStorage
- **Is Authenticated**: Kiểm tra trạng thái đăng nhập
- **Get Demo Accounts**: Lấy danh sách tài khoản demo

### ✅ Auth Context (`src/context/AuthContext.tsx`)

- Quản lý state đăng nhập toàn ứng dụng
- Tự động load user khi refresh trang
- Cung cấp hooks `useAuth()` để sử dụng trong components

### ✅ Login Page (`src/pages/Login.tsx`)

- Form đăng nhập với validation
- Hiển thị lỗi khi đăng nhập sai
- Loading state khi đang xử lý
- Danh sách tài khoản demo có thể click
- Tự động redirect về Home sau khi đăng nhập thành công

### ✅ Header Component (`src/components/layout/Header.tsx`)

- Hiển thị avatar và tên user
- Dropdown menu với thông tin chi tiết
- Nút đăng xuất
- Hiển thị role và verified badge

## 🔧 Cấu Trúc Code

```
ggzone-fe/src/
├── services/
│   └── authService.ts          # Service xử lý authentication
├── context/
│   └── AuthContext.tsx         # Context quản lý auth state
├── pages/
│   └── Login.tsx               # Trang đăng nhập
├── components/
│   └── layout/
│       └── Header.tsx          # Header với user menu
└── assets/
    └── mock/
        └── users.ts            # Dữ liệu user mẫu
```

## 💾 Lưu Trữ Dữ Liệu

Hệ thống sử dụng **localStorage** để lưu:

- `ggzone_auth_token`: Token xác thực
- `ggzone_user`: Thông tin user (JSON)

Dữ liệu sẽ được giữ nguyên khi refresh trang.

## 🧪 Test Các Tình Huống

### ✅ Đăng nhập thành công

```
Email: alice@example.com
Password: alice123
→ Redirect về Home, hiển thị thông tin user trong Header
```

### ❌ Email không tồn tại

```
Email: notexist@example.com
Password: anything
→ Hiển thị lỗi: "Email không tồn tại"
```

### ❌ Mật khẩu sai

```
Email: alice@example.com
Password: wrongpassword
→ Hiển thị lỗi: "Mật khẩu không đúng"
```

### 🔄 Refresh trang

```
Đăng nhập → Refresh trang
→ Vẫn giữ trạng thái đăng nhập
```

### 🚪 Đăng xuất

```
Click avatar → Click "Đăng xuất"
→ Xóa session, redirect về Login
```

## 🎨 UI/UX Features

- ✅ Loading state khi đang đăng nhập
- ✅ Error messages rõ ràng bằng tiếng Việt
- ✅ Disable button khi đang xử lý
- ✅ Quick login với 1 click
- ✅ Avatar và user info trong Header
- ✅ Dropdown menu với animation
- ✅ Role badges (user/moderator/admin)
- ✅ Verified badge cho user đã xác thực

## 🔜 Tích Hợp Backend Thực

Khi có backend API, chỉ cần sửa `authService.ts`:

```typescript
// Thay vì mock data
async login(credentials: LoginCredentials): Promise<AuthResponse> {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  
  const data = await response.json();
  
  if (data.success) {
    localStorage.setItem(this.TOKEN_KEY, data.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify(data.user));
  }
  
  return data;
}
```

## 📝 Notes

- Tất cả password đều có format: `{username}123` (ví dụ: alice123, bob123)
- Mock data được lưu trong `src/assets/mock/users.ts`
- Auth logic hoàn toàn tách biệt, dễ dàng thay thế bằng API thực
- Hỗ trợ TypeScript đầy đủ với type safety

---

**Chúc bạn test vui vẻ! 🎮**
