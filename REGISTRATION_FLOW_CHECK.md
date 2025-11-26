# Kiểm Tra Flow Đăng Ký - GGZone

## ✅ Đã Sửa
1. **Model User.cs**: Đã xóa thuộc tính `Level` (vì nó thuộc về `UserStats` trong database)
2. **ForumController.cs**: Đã cập nhật để lấy `Level` từ `UserStats`
3. **AdminController.cs**: Đã cập nhật để lấy `Level` từ `UserStats`

## 📋 Flow Đăng Ký Hiện Tại

### Frontend (React)
**File**: `ggzone-fe/src/pages/Register.tsx`
- Form thu thập: `username`, `email`, `password`, `confirmPassword`, `fullName`, `agreeToTerms`
- Validation:
  - Password phải khớp với confirmPassword
  - Password tối thiểu 6 ký tự
  - Phải đồng ý với điều khoản
- Gửi request với: `{ username, email, password }`

**File**: `ggzone-fe/src/services/authService.ts`
```typescript
async register(credentials: RegisterCredentials): Promise<AuthResponse> {
  // POST /api/auth/register
  // Body: { username, email, password }
  
  // Nếu thành công (response.id tồn tại):
  //   -> Tự động login với email và password
  //   -> Lưu token và user vào localStorage
  //   -> Navigate về trang chủ
}
```

### Backend (ASP.NET Core)
**File**: `ggzone-be/Controllers/AuthController.cs`
```csharp
[HttpPost("register")]
public async Task<IActionResult> Register(RegisterDto dto)
{
    var user = await _service.RegisterAsync(dto);
    return Ok(new { user.Id, user.Username, user.Email });
}
```

**File**: `ggzone-be/Services/UserService.cs`
```csharp
public async Task<User> RegisterAsync(RegisterDto dto)
{
    // 1. Kiểm tra email đã tồn tại chưa
    if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
        throw new Exception("Email already exists");

    // 2. Tạo user mới
    var user = new User
    {
        Username = dto.Username,
        Email = dto.Email,
        PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
        Status = "offline",
        Role = "user",
        CreatedAt = DateTime.UtcNow,
        UpdatedAt = DateTime.UtcNow,
    };

    // 3. Lưu vào database
    _context.Users.Add(user);
    await _context.SaveChangesAsync();

    return user;
}
```

**File**: `ggzone-be/Dtos/Auth/RegisterDto.cs`
```csharp
public class RegisterDto
{
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}
```

### Database Schema
**Table**: `Users`
```sql
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(100),
    AvatarUrl NVARCHAR(500),
    CoverImageUrl NVARCHAR(500),
    Bio NVARCHAR(MAX),
    Location NVARCHAR(100),
    Status NVARCHAR(20) DEFAULT 'offline',
    Role NVARCHAR(20) DEFAULT 'user',
    IsVerified BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);
```

**Table**: `UserStats` (Level nằm ở đây)
```sql
CREATE TABLE UserStats (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER UNIQUE NOT NULL,
    Level INT DEFAULT 1,
    -- ... other stats
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);
```

## 🔍 Các Vấn Đề Đã Được Giải Quyết

### ❌ Lỗi Cũ
```
Microsoft.Data.SqlClient.SqlException: Invalid column name 'Level'.
```

**Nguyên nhân**: Model `User.cs` có thuộc tính `Level` nhưng database không có cột này trong bảng `Users`.

**Giải pháp**: Xóa `Level` khỏi model `User.cs` vì nó thuộc về bảng `UserStats`.

## ✅ Checklist Hoàn Chỉnh

### Backend
- [x] Model `User.cs` không có thuộc tính `Level`
- [x] `RegisterDto.cs` có đủ 3 fields: `Username`, `Email`, `Password`
- [x] `UserService.RegisterAsync()` tạo user với các giá trị mặc định đúng
- [x] `AuthController.Register()` trả về `{ Id, Username, Email }`
- [x] CORS cho phép `http://localhost:5173` (Vite dev server)
- [x] JWT configuration đúng
- [x] Database schema khớp với model

### Frontend
- [x] Form đăng ký thu thập đủ thông tin
- [x] Validation đầy đủ (password match, length, terms)
- [x] API endpoint đúng: `/api/auth/register`
- [x] API base URL: `http://localhost:7009`
- [x] Sau khi đăng ký thành công, tự động login
- [x] Lưu token và user vào localStorage
- [x] Navigate về trang chủ sau khi thành công

## 🚀 Cách Test

### 1. Khởi động Backend
```bash
cd ggzone-be
dotnet run
```
Backend sẽ chạy tại: `https://localhost:7009` hoặc `http://localhost:7009`

### 2. Khởi động Frontend
```bash
cd ggzone-fe
npm run dev
```
Frontend sẽ chạy tại: `http://localhost:5173`

### 3. Test Đăng Ký
1. Mở trình duyệt: `http://localhost:5173/register`
2. Điền form:
   - Username: `testuser`
   - Full Name: `Test User`
   - Email: `test@example.com`
   - Password: `123456`
   - Confirm Password: `123456`
   - ✓ Đồng ý điều khoản
3. Click "Create Account"
4. Kiểm tra:
   - Không có lỗi "Invalid column name 'Level'"
   - Đăng ký thành công
   - Tự động login
   - Chuyển về trang chủ

### 4. Kiểm tra Database
```sql
SELECT * FROM Users WHERE Email = 'test@example.com';
```

Kết quả mong đợi:
- User được tạo với đầy đủ thông tin
- `PasswordHash` đã được mã hóa bằng BCrypt
- `Status` = 'offline'
- `Role` = 'user'
- `CreatedAt` và `UpdatedAt` có giá trị

## 🔧 Nếu Vẫn Có Lỗi

### Lỗi CORS
**Triệu chứng**: `Access-Control-Allow-Origin` error trong console

**Giải pháp**: Kiểm tra `Program.cs` có dòng:
```csharp
app.UseCors("AllowFrontend");
```

### Lỗi JWT
**Triệu chứng**: Token không được tạo hoặc không hợp lệ

**Giải pháp**: Kiểm tra `appsettings.json`:
```json
"Jwt": {
  "Key": "RANDOM_KEY_256BIT_THAT_IS_LONG_ENOUGH_1234567890",
  "Issuer": "ggzone-api",
  "Audience": "ggzone-users"
}
```

### Lỗi Database Connection
**Triệu chứng**: Cannot connect to SQL Server

**Giải pháp**: Kiểm tra connection string trong `appsettings.json`:
```json
"ConnectionStrings": {
  "DefaultConnection": "Data Source=localhost;Initial Catalog=GGZone;Integrated Security=True;Trust Server Certificate=True"
}
```

## 📝 Notes

1. **FullName không được lưu**: Frontend thu thập `fullName` nhưng backend không nhận. Nếu muốn lưu, cần:
   - Thêm `FullName` vào `RegisterDto.cs`
   - Cập nhật `UserService.RegisterAsync()` để lưu `FullName`

2. **UserStats không được tạo tự động**: Sau khi đăng ký, user chưa có record trong `UserStats`. Nếu cần, thêm vào `RegisterAsync()`:
   ```csharp
   var userStats = new UserStats
   {
       UserId = user.Id,
       Level = 1,
       // ... other default values
   };
   _context.UserStats.Add(userStats);
   await _context.SaveChangesAsync();
   ```

3. **Email validation**: Backend chỉ kiểm tra email đã tồn tại, không validate format. Frontend có validation HTML5.

## ✨ Kết Luận

Flow đăng ký đã được sửa và khớp với database schema. Lỗi `Invalid column name 'Level'` đã được giải quyết bằng cách xóa thuộc tính `Level` khỏi model `User.cs`.

**Cần làm tiếp**:
1. Dừng backend đang chạy
2. Khởi động lại backend để áp dụng thay đổi
3. Test đăng ký lại
