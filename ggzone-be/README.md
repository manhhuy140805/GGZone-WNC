# GGZone Backend API

ASP.NET 8 Web API cho nền tảng mạng xã hội game thủ GGZone.

## 🚀 Công nghệ

- **ASP.NET 8** - Web API Framework
- **Entity Framework Core 8** - ORM
- **SQL Server** - Database
- **JWT Authentication** - Xác thực người dùng
- **BCrypt** - Mã hóa mật khẩu
- **Swagger/OpenAPI** - API Documentation

## 📁 Cấu trúc Project

```
ggzone-be/
├── Controllers/         # API Controllers
├── Models/             # Entity Models
├── Dtos/               # Data Transfer Objects
├── Data/               # DbContext
├── Interfaces/         # Service Interfaces
├── Repositorys/        # Data Access Layer
├── Services/           # Business Logic
├── Helpers/            # Utility Classes
└── Mappers/            # AutoMapper Profiles
```

## 🔧 Cài đặt

### 1. Cài đặt dependencies

```bash
dotnet restore
```

### 2. Cấu hình Database

Cập nhật connection string trong `appsettings.json`:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Data Source=YOUR_SERVER;Initial Catalog=GGZone;Integrated Security=True;Trust Server Certificate=True"
  }
}
```

### 3. Chạy Migrations (nếu cần)

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

### 4. Chạy ứng dụng

```bash
dotnet run
```

API sẽ chạy tại: `https://localhost:7xxx` hoặc `http://localhost:5xxx`

## 📚 API Endpoints

### Authentication

- `POST /api/auth/register` - Đăng ký tài khoản mới
- `POST /api/auth/login` - Đăng nhập

### Users

- `GET /api/users` - Lấy danh sách users
- `GET /api/users/{id}` - Lấy thông tin user
- `PUT /api/users/{id}` - Cập nhật thông tin user

### Posts

- `GET /api/posts` - Lấy tất cả posts
- `GET /api/posts/feed` - Lấy feed của user (yêu cầu auth)
- `GET /api/posts/{id}` - Lấy chi tiết post
- `POST /api/posts` - Tạo post mới (yêu cầu auth)
- `POST /api/posts/{id}/like` - Like post (yêu cầu auth)
- `DELETE /api/posts/{id}/like` - Unlike post (yêu cầu auth)
- `DELETE /api/posts/{id}` - Xóa post (yêu cầu auth)

### Games

- `GET /api/games` - Lấy danh sách games
- `GET /api/games/{id}` - Lấy thông tin game
- `GET /api/games/slug/{slug}` - Lấy game theo slug
- `GET /api/games/trending` - Lấy games trending

### Groups

- `GET /api/groups` - Lấy danh sách groups
- `GET /api/groups/{id}` - Lấy thông tin group
- `GET /api/groups/{id}/posts` - Lấy posts trong group
- `POST /api/groups` - Tạo group mới (yêu cầu auth)
- `POST /api/groups/{id}/join` - Tham gia group (yêu cầu auth)
- `DELETE /api/groups/{id}/leave` - Rời group (yêu cầu auth)

## 🔐 Authentication

API sử dụng JWT Bearer Token. Để sử dụng các endpoint yêu cầu authentication:

1. Đăng nhập qua `/api/auth/login` để nhận token
2. Thêm token vào header:
   ```
   Authorization: Bearer YOUR_TOKEN_HERE
   ```

## 📖 Swagger Documentation

Truy cập Swagger UI tại: `https://localhost:7xxx/swagger`

## 🗄️ Database Schema

Database được tạo từ file `DB/SQLQuery1.sql` với các bảng chính:

- Users & UserStats
- Posts, Comments, Likes
- Groups & GroupMembers
- Games
- Tournaments
- Marketplace
- LiveChannels
- Videos
- Forums
- Achievements
- Messages & Notifications

## 🔄 CORS Configuration

API đã được cấu hình CORS cho phép frontend chạy tại:
- `http://localhost:5173` (Vite)
- `http://localhost:3000` (React)

## 📝 TODO

- [ ] Thêm các controllers còn lại (Videos, Forums, Tournaments, etc.)
- [ ] Implement SignalR cho real-time chat
- [ ] Thêm file upload service
- [ ] Implement caching với Redis
- [ ] Thêm rate limiting
- [ ] Viết unit tests
- [ ] Thêm logging với Serilog
- [ ] Implement background jobs với Hangfire

## 🤝 Contributing

1. Fork the project
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License
