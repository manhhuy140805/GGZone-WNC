# 🔄 GGZone Backend Migration Guide

## ✅ Đã hoàn thành

### 1. Models mới đã tạo (14 models)
- ✅ `TrendingPlayer.cs` - Trending players tracking
- ✅ `OrderItem.cs` - Order line items
- ✅ `DailyStatistic.cs` - Daily analytics
- ✅ `EmailTemplate.cs` - Email templates management
- ✅ `FeaturedContent.cs` - Featured content system
- ✅ `AdminAuditLog.cs` - Admin action logging
- ✅ `UserBadge.cs` - User badges system
- ✅ `UserActivityLog.cs` - User activity tracking
- ✅ `Announcement.cs` - System announcements
- ✅ `FriendSuggestion.cs` - Friend recommendations
- ✅ `ShoppingCart.cs` - Shopping cart
- ✅ `UserBan.cs` - User ban management
- ✅ `UserPreference.cs` - User preferences
- ✅ `ModerationQueue.cs` - Content moderation

### 2. AppDbContext đã cập nhật
- ✅ Thêm 14 DbSets mới
- ✅ Xóa DbSets cũ (LiveChannel, Achievement, StreamChatMessage, StreamFollower)
- ✅ Thêm relationships và constraints mới

### 3. Models đã có sẵn (26 models)
- User, UserStats, Friendship
- Group, GroupMember
- Post, PostLike, PostMedia, Comment, Photo
- Game, GameReview, UserGameLibrary, GameLaunchLog
- Tournament, TournamentParticipant
- MarketplaceItem, MarketplaceReview
- StoreProduct, StoreOrder
- Message, Notification
- TrendingItem
- Video, VideoComment, VideoLike
- ForumCategory, ForumTopic, ForumReply

## 📊 Tổng kết

**Tổng số models: 40 models** (khớp với 40 tables trong database)

## 🚀 Các bước tiếp theo

### Bước 1: Xóa các models cũ không còn dùng

Cần xóa các file sau (nếu tồn tại):
```bash
rm ggzone-be/Models/Achievement.cs
rm ggzone-be/Models/UserAchievement.cs
rm ggzone-be/Models/LiveChannel.cs
rm ggzone-be/Models/StreamChatMessage.cs
rm ggzone-be/Models/StreamFollower.cs
```

### Bước 2: Cập nhật connection string

Trong `appsettings.json`:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GGZone;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

### Bước 3: Tạo database từ SQL script

```bash
# Chạy schema script
sqlcmd -S localhost -i DB/1_GGZone_Schema.sql

# Chạy sample data script
sqlcmd -S localhost -i DB/2_GGZone_SampleData.sql
```

### Bước 4: Scaffold DbContext từ database (Optional)

Nếu muốn EF Core tự động tạo models từ database:

```bash
cd ggzone-be

# Scaffold từ database
dotnet ef dbcontext scaffold "Server=localhost;Database=GGZone;Trusted_Connection=True;TrustServerCertificate=True" Microsoft.EntityFrameworkCore.SqlServer -o Models -c AppDbContext --context-dir Data --force
```

**Lưu ý**: Cách này sẽ overwrite các models hiện tại.

### Bước 5: Hoặc tạo Migration từ models hiện tại

```bash
cd ggzone-be

# Xóa migrations cũ (nếu có)
rm -rf Migrations

# Tạo migration mới
dotnet ef migrations add InitialCreate

# Apply migration (nếu database chưa có)
dotnet ef database update
```

### Bước 6: Build và test

```bash
cd ggzone-be

# Restore packages
dotnet restore

# Build project
dotnet build

# Run project
dotnet run
```

## 🔧 Troubleshooting

### Lỗi: "Table already exists"

Nếu database đã tồn tại, có 2 cách:

**Cách 1**: Drop và recreate database
```sql
USE MASTER;
DROP DATABASE GGZone;
-- Sau đó chạy lại schema script
```

**Cách 2**: Sử dụng database hiện có
- Không chạy migrations
- Chỉ cần đảm bảo models khớp với database

### Lỗi: "Foreign key constraint"

Đảm bảo các relationships trong `OnModelCreating` khớp với database schema.

### Lỗi: "Column not found"

Kiểm tra:
1. Tên properties trong models khớp với tên columns trong database
2. Data types khớp nhau
3. Nullable/Required attributes đúng

## 📝 Checklist

- [ ] Xóa models cũ không dùng
- [ ] Cập nhật connection string
- [ ] Chạy database scripts
- [ ] Build project thành công
- [ ] Test API endpoints
- [ ] Verify data trong database

## 🎯 Recommended Approach

**Cách tốt nhất**: Sử dụng database đã có từ SQL scripts

1. ✅ Chạy `1_GGZone_Schema.sql` để tạo tables
2. ✅ Chạy `2_GGZone_SampleData.sql` để insert data
3. ✅ Models đã được tạo sẵn khớp với database
4. ✅ Chỉ cần build và run backend

**Không cần chạy migrations** vì database đã được tạo từ SQL scripts.

## 📚 Next Steps

Sau khi backend chạy thành công:

1. **Tạo Controllers mới** cho các entities mới:
   - TrendingPlayerController
   - ShoppingCartController
   - UserBadgeController
   - AnnouncementController
   - etc.

2. **Tạo DTOs** cho request/response:
   - TrendingPlayerDto
   - ShoppingCartDto
   - UserBadgeDto
   - etc.

3. **Tạo Repositories** cho data access:
   - ITrendingPlayerRepository
   - IShoppingCartRepository
   - etc.

4. **Tạo Services** cho business logic:
   - TrendingPlayerService
   - ShoppingCartService
   - etc.

5. **Test APIs** với Swagger hoặc Postman

## 🔗 Related Files

- `DB/1_GGZone_Schema.sql` - Database schema
- `DB/2_GGZone_SampleData.sql` - Sample data
- `ggzone-be/Data/AppDbContext.cs` - EF Core context
- `ggzone-be/Models/` - All entity models
