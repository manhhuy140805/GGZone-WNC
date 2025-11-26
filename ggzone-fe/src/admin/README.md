# Admin Panel - Hướng dẫn sử dụng

## 🚀 Truy cập Admin Panel

### Cách 1: Qua giao diện
1. Đăng nhập với tài khoản admin
2. Click vào avatar ở góc phải trên
3. Chọn "Admin Panel"

### Cách 2: Truy cập trực tiếp
- URL: `http://localhost:5173/admin`
- Yêu cầu: Đã đăng nhập với role `admin`

### Demo Account
- Email: `admin@ggzone.com`
- Password: `admin123`
- Hoặc click "Try Demo Accounts" trên trang login

---

## 📊 Các chức năng chính

### 1. Dashboard
**Mục đích**: Xem tổng quan hệ thống

**Tính năng**:
- 📈 Thống kê tổng quan:
  - Tổng người dùng
  - Người dùng hoạt động
  - Tổng bài viết
  - Thông báo đã gửi
- 📋 Hoạt động gần đây
- 📊 Thống kê nhanh theo ngày

**Hiển thị**:
- Cards thống kê với màu sắc phân biệt
- Phần trăm thay đổi so với kỳ trước
- Timeline hoạt động realtime

---

### 2. Quản lý người dùng
**Mục đích**: Quản lý tất cả người dùng trong hệ thống

**Tính năng**:
- ✅ Xem danh sách người dùng
- 🔍 Tìm kiếm theo tên, email, username
- 🎯 Lọc theo vai trò (Admin, Moderator, User)
- ✏️ Chỉnh sửa thông tin người dùng
- 🚫 Cấm người dùng
- 🗑️ Xóa người dùng

**Thông tin hiển thị**:
- Avatar
- Tên đầy đủ & Username
- Email
- Vai trò (Role)
- Trạng thái hoạt động

**Chức năng chỉnh sửa**:
- Cập nhật tên đầy đủ
- Thay đổi email
- Thay đổi vai trò (User → Moderator → Admin)

---

### 3. Quản lý thông báo
**Mục đích**: Gửi thông báo đến người dùng

**Tính năng**:
- ➕ Tạo thông báo mới
- 📝 Xem danh sách thông báo đã gửi
- 🗑️ Xóa thông báo

**Loại thông báo**:
- 💙 **Info**: Thông tin chung
- ✅ **Success**: Thông báo thành công
- ⚠️ **Warning**: Cảnh báo
- ❌ **Error**: Thông báo lỗi

**Tùy chọn gửi**:
- 👥 Tất cả người dùng
- 🎯 Người dùng cụ thể

**Form tạo thông báo**:
```
- Tiêu đề: Tối đa 100 ký tự
- Nội dung: Mô tả chi tiết
- Loại: Info/Success/Warning/Error
- Gửi đến: All/Specific users
```

---

### 4. Cài đặt trang web
**Mục đích**: Quản lý cấu hình hệ thống

#### 4.1 Thông tin chung
- 🏷️ Tên trang web
- 📝 Mô tả trang web
- 📧 Email liên hệ

#### 4.2 Cài đặt người dùng
- ✅ Cho phép đăng ký tài khoản mới
- 📧 Yêu cầu xác thực email
- 🔐 Cài đặt bảo mật

#### 4.3 Cài đặt hệ thống
- 🔧 **Chế độ bảo trì**: 
  - Khi bật: Chỉ admin có thể truy cập
  - Hiển thị trang maintenance cho user thường
- 📦 **Kích thước upload tối đa**: 
  - Giới hạn file upload (1-100 MB)
  - Áp dụng cho ảnh, video, tài liệu

**Lưu ý**: Mọi thay đổi sẽ được lưu ngay lập tức và hiển thị thông báo thành công.

---

## 🎨 Giao diện

### Màu sắc
- **Primary**: Gradient tím (#667eea → #764ba2)
- **Background**: Light gray (#f5f7fa)
- **Sidebar**: Dark gradient (#1a202c → #2d3748)
- **Cards**: White với shadow nhẹ

### Layout
- **Sidebar**: 280px, fixed bên trái
- **Content**: Flexible, responsive
- **Cards**: Border radius 12px, shadow subtle

### Responsive
- **Desktop**: Sidebar cố định
- **Tablet**: Sidebar thu gọn
- **Mobile**: Sidebar chuyển thành horizontal menu

---

## 🔐 Bảo mật

### Kiểm tra quyền truy cập
```typescript
useEffect(() => {
  if (!isAuthenticated || user?.role !== 'admin') {
    navigate('/');
    return;
  }
}, [isAuthenticated, user, navigate]);
```

### Xác nhận hành động quan trọng
- Xóa người dùng: Confirm dialog
- Cấm người dùng: Confirm dialog
- Xóa thông báo: Confirm dialog
- Bật chế độ bảo trì: Warning message

---

## 📱 Tính năng nổi bật

### 1. Real-time Updates
- Dashboard tự động cập nhật stats
- Hoạt động gần đây realtime

### 2. Search & Filter
- Tìm kiếm nhanh người dùng
- Lọc theo nhiều tiêu chí

### 3. Modal Forms
- Form chỉnh sửa người dùng
- Form tạo thông báo
- Validation đầy đủ

### 4. Notifications
- Toast messages khi thành công
- Error handling rõ ràng

---

## 🚧 Tính năng sắp tới

- [ ] Export dữ liệu (CSV, Excel)
- [ ] Thống kê chi tiết với biểu đồ
- [ ] Quản lý báo cáo từ người dùng
- [ ] Quản lý nội dung (Posts, Comments)
- [ ] Activity logs chi tiết
- [ ] Bulk actions (xóa nhiều items)
- [ ] Email templates
- [ ] Backup & Restore
- [ ] API rate limiting
- [ ] Two-factor authentication

---

## 💡 Tips

1. **Tìm kiếm nhanh**: Dùng Ctrl+F trong bảng
2. **Keyboard shortcuts**: Đang phát triển
3. **Dark mode**: Đang phát triển
4. **Export data**: Đang phát triển

---

## 🐛 Troubleshooting

### Không thể truy cập admin panel?
- Kiểm tra đã đăng nhập chưa
- Kiểm tra role có phải `admin` không
- Clear cache và thử lại

### Không thấy dữ liệu?
- Kiểm tra backend API đang chạy
- Kiểm tra console log để xem lỗi
- Thử refresh trang

### Modal không hiển thị?
- Kiểm tra z-index
- Kiểm tra CSS đã load chưa
- Thử hard refresh (Ctrl+Shift+R)

---

## 📞 Hỗ trợ

Nếu gặp vấn đề, liên hệ:
- Email: support@ggzone.com
- Discord: GGZone Community
- GitHub Issues: [Link]
