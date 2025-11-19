# 🔧 GGZone Backend - Update Guide

## 📋 Cần làm gì?

Backend hiện tại có models cũ không khớp với database mới. Cần:

### ❌ XÓA các models không còn dùng:
1. `Models/Achievement.cs`
2. `Models/UserAchievement.cs`
3. `Models/LiveChannel.cs`

### ✅ THÊM models mới (Play Now + Admin):
1. `Models/UserGameLibrary.cs`
2. `Models/GameLaunchLog.cs`
3. `Models/AdminAuditLog.cs`
4. `Models/UserReport.cs`
5. `Models/UserBan.cs`
6. `Models/ModerationQueue.cs`
7. `Models/SystemSetting.cs`
8. `Models/DailyStatistic.cs`
9. `Models/FeaturedContent.cs`
10. `Models/Announcement.cs`
11. `Models/EmailTemplate.cs`
12. `Models/UserPreference.cs`
13. `Models/UserBadge.cs`
14. `Models/FriendSuggestion.cs`
15. `Models/GameScreenshot.cs`
16. `Models/GameVideo.cs`
17. `Models/GameReview.cs`
18. `Models/UserActivityLog.cs`
19. `Models/ShoppingCart.cs`
20. `Models/OrderItem.cs`
21. `Models/TrendingPlayer.cs`

### 🔄 CẬP NHẬT models hiện có:
1. `Models/User.cs` - Thêm fields mới
2. `Models/UserStats.cs` - Xóa AchievementsCount
3. `Models/Game.cs` - Thêm Play Now fields
4. `Data/AppDbContext.cs` - Update DbSets

---

## 🚀 Quick Start

### Option 1: Tự động (Recommended)

Sử dụng EF Core Migrations để tự động sync:

```bash
cd ggzone-be

# Xóa migrations cũ (nếu có)
rm -rf Migrations

# Tạo migration mới từ database
dotnet ef migrations add InitialCreate

# Apply vào database
dotnet ef database update
```

### Option 2: Thủ công

Tôi sẽ tạo tất cả models mới cho bạn.

---

## 📝 Chi tiết từng bước

### Bước 1: Xóa models cũ

```bash
rm ggzone-be/Models/Achievement.cs
rm ggzone-be/Models/UserAchievement.cs
rm ggzone-be/Models/LiveChannel.cs
```

### Bước 2: Cập nhật UserStats.cs

Xóa property `AchievementsCount`

### Bước 3: Cập nhật Game.cs

Thêm Play Now properties:
- GameType
- LaunchUrl
- DownloadUrl
- WebPlayUrl
- InstallSize
- MinimumRequirements
- RecommendedRequirements
- LauncherType

### Bước 4: Tạo models mới

Tôi sẽ tạo tất cả files mới.

### Bước 5: Cập nhật AppDbContext.cs

Thêm DbSets cho tất cả models mới.

### Bước 6: Test

```bash
dotnet build
dotnet run
```

---

## 🎯 Bạn muốn tôi làm gì?

**A) Tạo tất cả models mới thủ công** (Recommended)
- Tôi sẽ tạo từng file model
- Cập nhật AppDbContext
- Sẵn sàng để build

**B) Hướng dẫn dùng EF Migrations**
- Tự động sync từ database
- Nhanh hơn nhưng cần setup

Cho tôi biết bạn chọn option nào?
