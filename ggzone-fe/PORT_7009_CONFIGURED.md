# ✅ Đã cấu hình Backend Port 7009

## 🎯 Cấu hình hoàn tất

### Backend Configuration
- **Port:** `7009` (HTTP)
- **Port:** `7010` (HTTPS - nếu có)
- **Base URL:** `http://localhost:7009`

### Files đã cập nhật

#### 1. Environment Variables
```env
# .env
VITE_API_URL=http://localhost:7009
VITE_ENV=development
```

```env
# .env.example
VITE_API_URL=http://localhost:7009
VITE_ENV=development
```

#### 2. API Configuration
```typescript
// src/config/api.ts
export const API_CONFIG = {
  BASE_URL: (import.meta as any).env?.VITE_API_URL || 'http://localhost:7009',
  // ...
};
```

#### 3. Documentation
- ✅ `START_HERE.md` - Quick start guide
- ✅ `QUICK_START.md` - Updated với port 7009
- ✅ `AUTH_API_COMPLETE.md` - Updated với port 7009
- ✅ `API_INTEGRATION_GUIDE.md` - Updated với port 7009

## 🚀 Cách sử dụng

### 1. Chạy Backend
```bash
cd ggzone-be
dotnet run
```

Backend sẽ chạy tại:
- HTTP: `http://localhost:7009`
- HTTPS: `https://localhost:7010` (nếu có SSL)

### 2. Chạy Frontend
```bash
cd ggzone-fe
npm run dev
```

Frontend sẽ chạy tại: `http://localhost:5173`

### 3. Test API

#### Test Login
```bash
curl -X POST http://localhost:7009/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

#### Test Register
```bash
curl -X POST http://localhost:7009/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"testuser","email":"test@example.com","password":"123456"}'
```

## 📊 Build Status

```
✅ Build: SUCCESS
⏱️  Time: 3.63s
📦 Bundle: 381.29 kB (gzipped: 102.23 kB)
🎨 CSS: 66.22 kB (gzipped: 9.87 kB)
```

## 🔍 Verification Checklist

- [x] `.env` có `VITE_API_URL=http://localhost:7009`
- [x] `.env.example` có `VITE_API_URL=http://localhost:7009`
- [x] `src/config/api.ts` default port là 7009
- [x] Documentation đã update
- [x] Build thành công
- [x] Không có TypeScript errors

## 🎯 API Endpoints

### Authentication
```
POST http://localhost:7009/api/auth/login
POST http://localhost:7009/api/auth/register
```

### Users
```
GET  http://localhost:7009/api/users
GET  http://localhost:7009/api/users/{id}
PUT  http://localhost:7009/api/users/{id}
```

### Posts
```
GET  http://localhost:7009/api/posts
GET  http://localhost:7009/api/posts/feed
POST http://localhost:7009/api/posts
```

### Games
```
GET  http://localhost:7009/api/games
GET  http://localhost:7009/api/games/{id}
GET  http://localhost:7009/api/games/trending
```

### Groups
```
GET  http://localhost:7009/api/groups
GET  http://localhost:7009/api/groups/{id}
POST http://localhost:7009/api/groups/{id}/join
```

## 🐛 Troubleshooting

### Backend không chạy ở port 7009
Kiểm tra file `ggzone-be/Properties/launchSettings.json`:
```json
{
  "profiles": {
    "http": {
      "applicationUrl": "http://localhost:7009"
    },
    "https": {
      "applicationUrl": "https://localhost:7010;http://localhost:7009"
    }
  }
}
```

### Frontend không kết nối được
1. Kiểm tra backend đang chạy: `http://localhost:7009`
2. Kiểm tra CORS config trong backend
3. Restart frontend: `Ctrl+C` → `npm run dev`

### CORS Error
Backend `Program.cs` phải có:
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

app.UseCors("AllowFrontend");
```

## 💡 Tips

1. **Luôn chạy backend trước** rồi mới chạy frontend
2. **Kiểm tra port** bằng cách mở `http://localhost:7009` trong browser
3. **Check console** của cả backend và frontend để debug
4. **Restart frontend** sau khi thay đổi `.env`

## 📚 Next Steps

1. ✅ Backend đã chạy tại port 7009
2. ✅ Frontend đã config đúng port
3. ✅ Authentication API đã hoạt động
4. 🔜 Tích hợp các API khác (Games, Posts, Groups...)

## 🎉 Status

**Configuration:** ✅ COMPLETE
**Backend Port:** 7009
**Frontend Port:** 5173
**Build:** ✅ SUCCESS
**Ready:** ✅ YES

---

**Cấu hình hoàn tất! Em có thể bắt đầu test ngay!** 💕

Xem file `START_HERE.md` để bắt đầu nhanh trong 2 phút! 🚀
