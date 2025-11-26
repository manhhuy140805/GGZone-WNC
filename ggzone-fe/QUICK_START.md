# 🚀 Quick Start - Authentication API

## Chạy nhanh trong 3 bước

### Bước 1: Chạy Backend
```bash
cd ggzone-be
dotnet run
```

Đợi đến khi thấy:
```
Now listening on: http://localhost:5000
Now listening on: https://localhost:5001
```

### Bước 2: Chạy Frontend
```bash
cd ggzone-fe
npm run dev
```

Mở browser: `http://localhost:5173`

### Bước 3: Test Authentication

#### Đăng ký tài khoản mới
1. Click "Create Account" hoặc vào `/register`
2. Nhập:
   - Username: `testuser`
   - Email: `test@example.com`
   - Password: `123456`
   - Confirm Password: `123456`
   - ✓ Agree to Terms
3. Click "Create Account"
4. ✅ Thành công → Tự động đăng nhập → Về trang chủ

#### Đăng nhập
1. Click "Sign In" hoặc vào `/login`
2. Nhập:
   - Email: `test@example.com`
   - Password: `123456`
3. Click "Sign In"
4. ✅ Thành công → Về trang chủ

## ✅ Checklist

- [ ] Backend đang chạy tại port 7009
- [ ] Frontend đang chạy tại port 5173
- [ ] File `.env` có `VITE_API_URL=http://localhost:7009`
- [ ] Có thể đăng ký tài khoản mới
- [ ] Có thể đăng nhập
- [ ] Sau login, user info hiển thị ở header

## 🐛 Nếu gặp lỗi

### Backend không chạy
```bash
cd ggzone-be
dotnet restore
dotnet run
```

### Frontend không chạy
```bash
cd ggzone-fe
npm install
npm run dev
```

### CORS Error
Kiểm tra backend `Program.cs` có config:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});
```

### API không connect
1. Kiểm tra `.env` file:
   ```env
   VITE_API_URL=http://localhost:7009
   ```
2. Restart frontend: `Ctrl+C` → `npm run dev`

## 📚 Tài liệu chi tiết

- `AUTH_API_COMPLETE.md` - Tổng quan hoàn chỉnh
- `API_INTEGRATION_GUIDE.md` - Hướng dẫn tích hợp API
- `MIGRATION_NOTES.md` - Chi tiết migration

---

**Chúc em thành công! 💕**
