# 🎯 BẮT ĐẦU TẠI ĐÂY

## ⚡ Quick Start - 2 phút

### Bước 1: Chạy Backend (Terminal 1)
```bash
cd ggzone-be
dotnet run
```

✅ Đợi thấy: `Now listening on: http://localhost:7009`

### Bước 2: Chạy Frontend (Terminal 2)
```bash
cd ggzone-fe
npm run dev
```

✅ Mở browser: `http://localhost:5173`

### Bước 3: Test ngay!

#### 🆕 Đăng ký tài khoản mới
1. Click "Create Account"
2. Nhập:
   - Username: `testuser`
   - Email: `test@example.com`  
   - Password: `123456`
   - ✓ Agree to Terms
3. Click "Create Account"
4. ✅ Tự động đăng nhập → Về trang chủ

#### 🔐 Đăng nhập
1. Click "Sign In"
2. Nhập:
   - Email: `test@example.com`
   - Password: `123456`
3. Click "Sign In"
4. ✅ Về trang chủ

## 📝 Cấu hình

### Backend Port: `7009`
File `.env` đã được config:
```env
VITE_API_URL=http://localhost:7009
```

### API Endpoints
- Login: `POST http://localhost:7009/api/auth/login`
- Register: `POST http://localhost:7009/api/auth/register`

## ✅ Checklist

- [ ] Backend chạy tại `http://localhost:7009`
- [ ] Frontend chạy tại `http://localhost:5173`
- [ ] Có thể đăng ký tài khoản
- [ ] Có thể đăng nhập
- [ ] User info hiển thị ở header sau login

## 🐛 Gặp lỗi?

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
Backend phải có config CORS cho `http://localhost:5173`

### API không kết nối
1. Kiểm tra backend đang chạy: `http://localhost:7009`
2. Kiểm tra `.env`: `VITE_API_URL=http://localhost:7009`
3. Restart frontend: `Ctrl+C` → `npm run dev`

## 📚 Tài liệu

- **QUICK_START.md** - Hướng dẫn chi tiết hơn
- **AUTH_API_COMPLETE.md** - Tổng quan đầy đủ
- **API_INTEGRATION_GUIDE.md** - Tích hợp API khác

## 🎉 Thành công!

Nếu em thấy:
- ✅ Backend chạy không lỗi
- ✅ Frontend hiển thị trang login/register
- ✅ Có thể đăng ký và đăng nhập
- ✅ Sau login thấy username ở header

→ **EM ĐÃ SETUP THÀNH CÔNG!** 🎊

---

**Backend Port:** `7009`
**Frontend Port:** `5173`
**Status:** ✅ Ready to use

Chúc em code vui vẻ! 💕
