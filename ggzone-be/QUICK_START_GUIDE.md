# 🚀 GGZone Backend - Quick Start Guide

## ⚡ Khởi động nhanh trong 5 phút

### 1️⃣ Cài đặt Dependencies

```bash
cd ggzone-be
dotnet restore
```

### 2️⃣ Cấu hình Database

Mở `appsettings.json` và cập nhật connection string:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GGZone;Trusted_Connection=True;TrustServerCertificate=True;"
  }
}
```

### 3️⃣ Chạy Migrations

```bash
dotnet ef database update
```

Hoặc chạy SQL scripts:
```bash
# Chạy file DB/1_GGZone_Schema.sql
# Chạy file DB/2_GGZone_SampleData.sql
```

### 4️⃣ Chạy Backend

```bash
dotnet run
```

hoặc

```bash
dotnet watch run
```

### 5️⃣ Test APIs

Mở browser và truy cập:
```
https://localhost:7xxx/swagger
```

---

## 🧪 Test nhanh các API chính

### Test 1: Health Check
```bash
curl https://localhost:7xxx/api/user
```

### Test 2: Login
```bash
curl -X POST https://localhost:7xxx/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "alice@ggzone.com",
    "password": "password123"
  }'
```

### Test 3: Get Games
```bash
curl https://localhost:7xxx/api/game
```

### Test 4: Get Trending
```bash
curl https://localhost:7xxx/api/trending/games?limit=10
```

---

## 📋 Checklist kiểm tra

### Backend Setup
- [ ] Dependencies installed (`dotnet restore`)
- [ ] Database created
- [ ] Migrations applied
- [ ] Sample data loaded
- [ ] Backend running (`dotnet run`)
- [ ] Swagger UI accessible

### API Testing
- [ ] Auth endpoints working (login/register)
- [ ] User endpoints working
- [ ] Post endpoints working
- [ ] Game endpoints working
- [ ] Tournament endpoints working
- [ ] Message endpoints working
- [ ] Notification endpoints working

### Database
- [ ] All tables created
- [ ] Sample data inserted
- [ ] Relationships working
- [ ] Queries optimized

---

## 🔧 Troubleshooting

### Lỗi: Database connection failed
```bash
# Kiểm tra SQL Server đang chạy
# Kiểm tra connection string trong appsettings.json
# Thử: Trusted_Connection=True hoặc User Id=sa;Password=...
```

### Lỗi: Migration failed
```bash
# Xóa migrations cũ
dotnet ef migrations remove

# Tạo migration mới
dotnet ef migrations add InitialCreate

# Apply migration
dotnet ef database update
```

### Lỗi: Port already in use
```bash
# Thay đổi port trong Properties/launchSettings.json
# Hoặc kill process đang dùng port
```

### Lỗi: JWT token invalid
```bash
# Kiểm tra JwtSettings trong appsettings.json
# Đảm bảo SecretKey đủ dài (>= 32 characters)
```

---

## 📚 Tài liệu tham khảo

### API Documentation
- `API_COMPLETE_GUIDE.md` - Danh sách đầy đủ endpoints
- `API_USAGE_EXAMPLES.md` - Ví dụ sử dụng
- `FINAL_API_SUMMARY.md` - Tổng kết dự án

### Swagger UI
```
https://localhost:7xxx/swagger
```

### Sample Accounts
```
Email: alice@ggzone.com
Password: password123

Email: bob@ggzone.com
Password: password123
```

---

## 🎯 Các bước tiếp theo

### 1. Development
- [ ] Test tất cả endpoints
- [ ] Fix bugs nếu có
- [ ] Add validation rules
- [ ] Implement error handling

### 2. Frontend Integration
- [ ] Setup API service layer
- [ ] Implement authentication flow
- [ ] Connect to endpoints
- [ ] Handle responses

### 3. Testing
- [ ] Write unit tests
- [ ] Write integration tests
- [ ] Performance testing
- [ ] Security testing

### 4. Deployment
- [ ] Setup production database
- [ ] Configure environment variables
- [ ] Deploy to server
- [ ] Setup monitoring

---

## 💡 Tips

### Development
- Dùng `dotnet watch run` để auto-reload khi code thay đổi
- Dùng Swagger UI để test APIs nhanh
- Check logs trong console để debug

### Database
- Backup database thường xuyên
- Dùng migrations cho version control
- Index các columns thường query

### Security
- Không commit secrets vào Git
- Dùng environment variables cho production
- Enable HTTPS trong production
- Implement rate limiting

### Performance
- Dùng async/await cho tất cả DB operations
- Implement caching cho data ít thay đổi
- Optimize queries với Include và Select
- Dùng pagination cho large datasets

---

## 🆘 Support

### Issues?
1. Check console logs
2. Check Swagger UI errors
3. Check database connections
4. Review API documentation

### Common Commands
```bash
# Restore packages
dotnet restore

# Build project
dotnet build

# Run project
dotnet run

# Watch mode (auto-reload)
dotnet watch run

# Create migration
dotnet ef migrations add MigrationName

# Update database
dotnet ef database update

# Remove last migration
dotnet ef migrations remove

# Clean build
dotnet clean
```

---

## ✅ Ready to Go!

Sau khi hoàn thành các bước trên, backend của bạn đã sẵn sàng để:

- ✅ Phục vụ frontend
- ✅ Xử lý requests
- ✅ Quản lý database
- ✅ Authenticate users
- ✅ Scale up khi cần

**Happy Coding! 🎮**
