# 🎮 GGZone Backend API

<div align="center">

**ASP.NET Core Web API for GGZone Gaming Social Platform**

[![.NET](https://img.shields.io/badge/.NET-8.0-512BD4?logo=dotnet)](https://dotnet.microsoft.com/)
[![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?logo=microsoft-sql-server)](https://www.microsoft.com/sql-server)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black)](https://swagger.io/)

</div>

---

## 📋 Tổng quan

Backend API hoàn chỉnh cho **GGZone** - Nền tảng mạng xã hội dành cho game thủ với **23 Controllers** và **120+ Endpoints**.

---

## ✨ Tính năng chính

### 🔐 Authentication & Security
- JWT-based authentication
- Role-based authorization
- Secure password hashing
- Token refresh mechanism

### 👥 Social Features
- User profiles & stats
- Posts, comments, likes
- Friend system with suggestions
- Activity feed
- Photo gallery
- Badge system

### 💬 Communication
- Direct messaging
- Real-time notifications
- Conversation management
- Unread tracking

### 🎮 Gaming
- Game catalog & reviews
- User game library
- Tournament system
- Leaderboards
- Trending games

### 🛒 E-commerce
- Product catalog
- Shopping cart
- Order management
- Marketplace

### 📊 Analytics
- Dashboard statistics
- User analytics
- Game statistics
- Daily reports

---

## 🚀 Quick Start

### Prerequisites

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [SQL Server](https://www.microsoft.com/sql-server)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) or [VS Code](https://code.visualstudio.com/)

### Installation

```bash
# 1. Restore packages
dotnet restore

# 2. Update connection string in appsettings.json

# 3. Run migrations
dotnet ef database update

# 4. Run application
dotnet run
```

### Access API

- **Swagger UI**: `https://localhost:7xxx/swagger`
- **API Base**: `https://localhost:7xxx/api`

---

## 📊 API Statistics

- **Controllers**: 23
- **Endpoints**: 120+
- **Models**: 40+
- **Features**: 20+

---

## 🎯 API Controllers

| Controller | Endpoints | Description |
|------------|-----------|-------------|
| **Auth** | 4 | Login, Register, Refresh Token |
| **User** | 5+ | User management |
| **Post** | 9+ | Posts, comments, likes |
| **Group** | 8+ | Groups & communities |
| **Game** | 7+ | Games & reviews |
| **Forum** | 7+ | Forum topics & replies |
| **Video** | 8+ | Video sharing |
| **Trending** | 4 | Trending content |
| **Marketplace** | 7+ | Marketplace items |
| **ShoppingCart** | 5 | Shopping cart |
| **Store** | 6 | Store products |
| **Order** | 5 | Order management |
| **Tournament** | 9 | Tournament system |
| **Friendship** | 9 | Friend system |
| **Message** | 6 | Direct messaging |
| **Notification** | 7 | Notifications |
| **Photo** | 5 | Photo gallery |
| **Badge** | 4 | Badge system |
| **Activity** | 4 | Activity tracking |
| **Search** | 1 | Global search |
| **Statistics** | 4 | Analytics |
| **Comment** | 5+ | Comment management |
| **Admin** | 10+ | Admin panel |

---

## 📁 Project Structure

```
ggzone-be/
├── Controllers/          # 23 API Controllers
├── Models/              # 40+ Database Models
├── Data/                # EF Core DbContext
├── Dtos/                # Data Transfer Objects
├── Interfaces/          # Repository Interfaces
├── Repositorys/         # Repository Implementations
├── Services/            # Business Logic
└── Documentation/       # API Documentation
```

---

## 🔧 Tech Stack

- **Framework**: ASP.NET Core 8.0
- **Database**: SQL Server
- **ORM**: Entity Framework Core
- **Authentication**: JWT Bearer Token
- **API Docs**: Swagger/OpenAPI
- **Architecture**: RESTful API
- **Pattern**: Repository Pattern

---

## 📚 Documentation

### Quick Links
- 📖 [Complete API Guide](./API_COMPLETE_GUIDE.md) - Full endpoint list
- 💡 [Usage Examples](./API_USAGE_EXAMPLES.md) - Code examples
- 📊 [Final Summary](./FINAL_API_SUMMARY.md) - Project overview
- 🚀 [Quick Start](./QUICK_START_GUIDE.md) - Get started in 5 minutes

### Swagger UI
Interactive API documentation:
```
https://localhost:7xxx/swagger
```

---

## 🧪 Testing

### Sample Accounts
```
Email: alice@ggzone.com
Password: password123

Email: bob@ggzone.com
Password: password123
```

---

## 🔐 Security

- ✅ JWT authentication
- ✅ Password hashing (BCrypt)
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ CORS configuration
- ✅ Input validation

---

## 🚀 Deployment

### Development
```bash
dotnet run
# or
dotnet watch run
```

### Production
```bash
dotnet publish -c Release
```

---

## 📄 License

MIT License

---

<div align="center">

**Made with ❤️ for the Gaming Community**

</div>
