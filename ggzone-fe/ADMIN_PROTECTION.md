# Admin Route Protection

## Tổng quan
Hệ thống bảo vệ route admin đã được triển khai để đảm bảo chỉ người dùng có role `admin` mới có thể truy cập vào các trang quản trị.

## Cách hoạt động

### Frontend Protection

1. **AdminRoute Component** (`src/routes/index.tsx`)
   - Kiểm tra user đã đăng nhập chưa
   - Kiểm tra user có role `admin` không
   - Redirect đến `/login` nếu chưa đăng nhập
   - Redirect đến `/unauthorized` nếu không có quyền admin

2. **Unauthorized Page** (`src/pages/Unauthorized.tsx`)
   - Hiển thị thông báo khi user không có quyền truy cập
   - Cung cấp nút quay về trang chủ

3. **Header Component**
   - Chỉ hiển thị link "Admin Panel" cho user có role `admin`
   - Ẩn hoàn toàn với user thường

### Backend Protection

1. **AdminController** (`ggzone-be/Controllers/AdminController.cs`)
   - Sử dụng `[Authorize(Roles = "admin")]` attribute
   - Tất cả endpoints trong controller yêu cầu role admin
   - Trả về 403 Forbidden nếu user không có quyền

## Cách test

### Test với user thường:
1. Đăng nhập với tài khoản không có role admin
2. Thử truy cập trực tiếp: `http://localhost:5173/admin`
3. Kết quả: Redirect đến `/unauthorized`

### Test với admin:
1. Đăng nhập với tài khoản có role `admin`
2. Truy cập: `http://localhost:5173/admin`
3. Kết quả: Hiển thị trang admin dashboard

### Test backend:
1. Gọi API admin endpoint mà không có token: `DELETE /api/admin/groups/{id}`
2. Kết quả: 401 Unauthorized

3. Gọi API admin endpoint với token user thường
4. Kết quả: 403 Forbidden

5. Gọi API admin endpoint với token admin
6. Kết quả: 200 OK (hoặc response tương ứng)

## Cấu trúc User

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  role?: string; // 'admin' | 'user' | undefined
  // ... other fields
}
```

## Lưu ý

- Role được lưu trong JWT token và User object
- Frontend check role để UX tốt hơn (ẩn UI không cần thiết)
- Backend check role để bảo mật thực sự (không thể bypass)
- Cả frontend và backend đều cần có protection
