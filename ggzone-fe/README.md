# 🎮 GGZone Frontend

GGZone là ứng dụng web về game được phát triển với **ReactJS + Vite + TailwindCSS**.  
Đây là phần **Frontend (FE)** trong hệ thống **GGZone** gồm 2 phần:

- **Frontend:** ReactJS (hiển thị giao diện người dùng)
- **Backend:** ASP.NET Core API (xử lý logic và dữ liệu)

---

## 🚀 Công nghệ sử dụng

| Công nghệ               | Mục đích                                   |
| ----------------------- | ------------------------------------------ |
| **ReactJS (Vite)**      | Framework frontend nhanh và hiện đại       |
| **TailwindCSS**         | Thiết kế giao diện nhanh, gọn, tùy biến dễ |
| **Axios**               | Gọi API từ backend                         |
| **React Router DOM**    | Quản lý điều hướng giữa các trang          |
| **Context API / Hooks** | Quản lý state toàn cục, logic tái sử dụng  |

---

## 🛠️ Cài đặt & Khởi chạy dự án

### 1️⃣ Cài đặt Node.js

Tải và cài [Node.js LTS](https://nodejs.org/).

### 2️⃣ Clone project

```bash
git clone https://github.com/your-username/ggzone-fe.git
cd ggzone-fe
3️⃣ Cài đặt dependencies
bash
Copy code
npm install
4️⃣ Chạy project
bash
Copy code
npm run dev
Truy cập tại: http://localhost:5173

🧩 Cấu trúc thư mục
csharp
Copy code
ggzone-fe/
├── public/
│   ├── favicon.ico
│   └── index.html
│
├── src/
│   ├── assets/                # Hình ảnh, icon, fonts, video
│   │   ├── images/
│   │   └── icons/
│   │
│   ├── components/            # Các component dùng chung (Button, Navbar, ...)
│   │   ├── common/
│   │   └── layout/
│   │
│   ├── pages/                 # Các trang chính (Home, Login, Register, ...)
│   │   ├── Home/
│   │   │   └── Home.jsx
│   │   ├── Auth/
│   │   │   ├── Login.jsx
│   │   │   └── Register.jsx
│   │   └── Game/
│   │       └── GameList.jsx
│   │
│   ├── layouts/               # Khung giao diện (Header, Footer, Sidebar)
│   │   ├── MainLayout.jsx
│   │   └── AdminLayout.jsx
│   │
│   ├── hooks/                 # Custom hooks (useAuth, useFetch, useTheme)
│   │   └── useAuth.js
│   │
│   ├── context/               # React Contexts (AuthContext, ThemeContext)
│   │   └── AuthContext.jsx
│   │
│   ├── services/              # Gọi API (axios)
│   │   ├── api.js
│   │   └── gameService.js
│   │
│   ├── utils/                 # Hàm tiện ích (formatDate, validateEmail, ...)
│   │   └── helpers.js
│   │
│   ├── routes/                # Quản lý định tuyến
│   │   ├── AppRouter.jsx
│   │   └── ProtectedRoute.jsx
│   │
│   ├── styles/                # CSS toàn cục
│   │   └── global.css
│   │
│   ├── App.jsx                # Component gốc
│   ├── main.jsx               # Điểm khởi động React
│   └── index.css              # Import Tailwind
│
├── .gitignore
├── package.json
├── tailwind.config.js
├── postcss.config.js
└── vite.config.js
📦 Scripts hữu ích
Lệnh	Mô tả
npm run dev	Chạy môi trường phát triển
npm run build	Build dự án cho production
npm run preview	Xem bản build trước khi deploy
npm install	Cài đặt tất cả dependencies

🌈 Hướng phát triển tiếp theo
 Kết nối với Backend ASP.NET Core API

 Thêm trang Trang chủ (Home) hiển thị danh sách game

 Tích hợp đăng nhập / đăng ký người dùng

 Giao diện Admin quản lý game

 Thêm dark mode với Tailwind theme

🧑‍💻 Tác giả
GGZone Team
📍 Đại học — Khoa CNTT
🌐 Dự án môn học: Web nâng cao (WNC)
🕹️ Frontend: ReactJS — Backend: ASP.NET Core

© 2025 GGZone. All rights reserved.
```
