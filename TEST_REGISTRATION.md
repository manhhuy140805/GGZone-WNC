# 🧪 Hướng Dẫn Test Đăng Ký

## ✅ Các Thay Đổi Đã Thực Hiện

### 1. Sửa Lỗi "Invalid column name 'Level'"
- ❌ **Trước**: Model `User.cs` có thuộc tính `Level` nhưng database không có cột này
- ✅ **Sau**: Đã xóa `Level` khỏi `User.cs` (vì nó thuộc về `UserStats`)

### 2. Cập Nhật Controllers
- ✅ `ForumController.cs`: Lấy `Level` từ `UserStats` thay vì `User`
- ✅ `AdminController.cs`: Lấy `Level` từ `UserStats` thay vì `User`

### 3. Thêm FullName Support
- ✅ `RegisterDto.cs`: Thêm thuộc tính `FullName`
- ✅ `UserService.cs`: Lưu `FullName` khi đăng ký
- ✅ Frontend: Gửi `fullName` trong request

### 4. Tự Động Tạo UserStats
- ✅ Khi đăng ký, tự động tạo record `UserStats` với `Level = 1`

### 5. Kiểm Tra Username Trùng
- ✅ Thêm validation kiểm tra username đã tồn tại

## 🚀 Các Bước Test

### Bước 1: Dừng Backend Đang Chạy
Nếu backend đang chạy, bạn cần dừng nó lại (Ctrl+C trong terminal)

### Bước 2: Khởi Động Lại Backend
```bash
cd ggzone-be
dotnet run
```

Đợi cho đến khi thấy:
```
Now listening on: https://localhost:7009
Now listening on: http://localhost:7009
```

### Bước 3: Khởi Động Frontend (nếu chưa chạy)
```bash
cd ggzone-fe
npm run dev
```

### Bước 4: Test Đăng Ký
1. Mở trình duyệt: `http://localhost:5173/register`
2. Điền form:
   ```
   Username: testuser123
   Full Name: Test User
   Email: test123@example.com
   Password: 123456
   Confirm Password: 123456
   ✓ Đồng ý điều khoản
   ```
3. Click "Create Account"

### Bước 5: Kiểm Tra Kết Quả

#### ✅ Thành Công
- Không có lỗi "Invalid column name 'Level'"
- Hiển thị "Creating Account..." trong giây lát
- Tự động chuyển về trang chủ
- Đã đăng nhập (có thông tin user ở góc trên)

#### ❌ Nếu Có Lỗi
Kiểm tra Console trong trình duyệt (F12) và terminal backend để xem lỗi cụ thể.

### Bước 6: Kiểm Tra Database
Mở SQL Server Management Studio và chạy:

```sql
-- Kiểm tra user vừa tạo
SELECT * FROM Users WHERE Email = 'test123@example.com';

-- Kiểm tra UserStats đã được tạo
SELECT u.Username, u.Email, u.FullName, us.Level, us.TotalPoints
FROM Users u
LEFT JOIN UserStats us ON u.Id = us.UserId
WHERE u.Email = 'test123@example.com';
```

**Kết quả mong đợi**:
- User có đầy đủ thông tin: Username, Email, FullName, PasswordHash
- UserStats có Level = 1, TotalPoints = 0

## 🔍 Các Trường Hợp Test

### Test Case 1: Đăng Ký Thành Công
**Input**:
- Username: `newuser`
- Email: `new@example.com`
- Password: `123456`
- Full Name: `New User`

**Expected**: Đăng ký thành công, tự động login, chuyển về trang chủ

### Test Case 2: Email Đã Tồn Tại
**Input**:
- Email đã được sử dụng trước đó

**Expected**: Hiển thị lỗi "Email already exists"

### Test Case 3: Username Đã Tồn Tại
**Input**:
- Username đã được sử dụng trước đó

**Expected**: Hiển thị lỗi "Username already exists"

### Test Case 4: Password Không Khớp
**Input**:
- Password: `123456`
- Confirm Password: `654321`

**Expected**: Hiển thị lỗi "Mật khẩu không khớp" (frontend validation)

### Test Case 5: Password Quá Ngắn
**Input**:
- Password: `123`

**Expected**: Hiển thị lỗi "Mật khẩu phải có ít nhất 6 ký tự" (frontend validation)

### Test Case 6: Không Đồng Ý Điều Khoản
**Input**:
- Không check vào checkbox "I agree to..."

**Expected**: Hiển thị lỗi "Bạn phải đồng ý với Điều khoản và Điều kiện" (frontend validation)

## 📊 API Request/Response

### Request
```http
POST http://localhost:7009/api/auth/register
Content-Type: application/json

{
  "username": "testuser123",
  "email": "test123@example.com",
  "password": "123456",
  "fullName": "Test User"
}
```

### Response (Success)
```json
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "username": "testuser123",
  "email": "test123@example.com"
}
```

### Response (Error - Email Exists)
```json
{
  "message": "Email already exists"
}
```

## 🐛 Troubleshooting

### Lỗi: "Invalid column name 'Level'"
**Nguyên nhân**: Backend cũ vẫn đang chạy

**Giải pháp**: 
1. Dừng backend (Ctrl+C)
2. Khởi động lại: `dotnet run`

### Lỗi: CORS
**Triệu chứng**: Console hiển thị "Access-Control-Allow-Origin"

**Giải pháp**: Kiểm tra `Program.cs` có:
```csharp
app.UseCors("AllowFrontend");
```

### Lỗi: Cannot connect to database
**Triệu chứng**: "Cannot open database" hoặc "Login failed"

**Giải pháp**: 
1. Kiểm tra SQL Server đang chạy
2. Kiểm tra connection string trong `appsettings.json`
3. Chạy script tạo database: `DB/1_GGZone_Schema.sql`

### Lỗi: Token không được tạo
**Triệu chứng**: Sau khi đăng ký, không tự động login

**Giải pháp**: Kiểm tra JWT configuration trong `appsettings.json`

## ✨ Tóm Tắt

**Đã sửa**:
1. ✅ Lỗi "Invalid column name 'Level'" - Xóa `Level` khỏi model `User`
2. ✅ Thêm support cho `FullName` trong đăng ký
3. ✅ Tự động tạo `UserStats` khi đăng ký
4. ✅ Kiểm tra username trùng lặp
5. ✅ Cập nhật controllers để lấy `Level` từ `UserStats`

**Cần làm**:
1. 🔄 Restart backend để áp dụng thay đổi
2. 🧪 Test đăng ký với các trường hợp khác nhau
3. ✅ Xác nhận không còn lỗi "Invalid column name 'Level'"
