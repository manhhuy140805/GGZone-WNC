# 🔧 GGZone Backend - Manual Fix Guide

## ⚠️ Vấn đề

Các controllers đang sử dụng properties không tồn tại trong models, gây ra compilation errors. Autofix liên tục revert các thay đổi.

## 📋 Giải pháp

Có 2 cách để sửa:

### Cách 1: Chạy PowerShell Script (Khuyến nghị)

```powershell
cd ggzone-be
.\fix-all-errors.ps1
```

### Cách 2: Sửa thủ công

Dưới đây là danh sách đầy đủ các thay đổi cần thực hiện:

---

## 🔧 Chi tiết các lỗi cần sửa

### 1. PhotoController.cs

**Lỗi**: `Photo.Url`, `Photo.UploadedAt` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
p.Url → p.ImageUrl
p.UploadedAt → p.CreatedAt
photo.UploadedAt → photo.CreatedAt
```

**Vị trí**: Lines 30, 35, 50, 65, 80

---

### 2. BadgeController.cs

**Lỗi**: `UserBadge.EarnedAt`, `BadgeDescription`, `BadgeIconUrl` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
b.EarnedAt → b.AwardedAt
b.BadgeDescription → b.BadgeType
b.BadgeIconUrl → b.IconUrl
badge.EarnedAt → badge.AwardedAt
```

**Vị trí**: Lines 25, 30, 35, 55, 70

---

### 3. ActivityController.cs

**Lỗi**: `UserActivityLog.Timestamp`, `Description`, `IpAddress` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
a.Timestamp → a.CreatedAt
a.Description → a.RelatedType
a.IpAddress → (xóa dòng này)
activity.Timestamp → activity.CreatedAt
```

**Vị trí**: Lines 30, 35, 40, 60, 80, 100

---

### 4. TrendingController.cs

**Lỗi**: `TrendingItem.Rank` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
.OrderBy(t => t.Rank) → .OrderByDescending(t => t.EngagementScore)
.OrderBy(tp => tp.Rank) → .OrderByDescending(tp => tp.Score)
t.Rank, → (xóa dòng này)
tp.Rank, → (xóa dòng này)
Rank = t.Rank → (xóa dòng này)
Rank = tp.Rank → (xóa dòng này)
```

**Vị trí**: Lines 25, 30, 35, 60, 65, 70, 95, 100, 105, 130, 135, 140

---

### 5. OrderController.cs

**Lỗi**: `StoreOrder.OrderDate`, `ShippingAddress`, `PaymentMethod` không tồn tại
**Lỗi**: `OrderItem.Price` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
o.OrderDate → o.CreatedAt
o.ShippingAddress, → (xóa dòng này)
o.PaymentMethod, → (xóa dòng này)
OrderDate = → CreatedAt =
ShippingAddress = → // ShippingAddress = (comment out)
PaymentMethod = → // PaymentMethod = (comment out)
oi.Price → oi.UnitPrice
Price = item.Price → UnitPrice = item.Price, TotalPrice = item.Price * item.Quantity
```

**Vị trí**: Lines 25, 30, 35, 60, 65, 70, 95, 100, 105, 130

---

### 6. StoreController.cs

**Lỗi**: `StoreProduct.ImageUrl`, `Stock`, `IsAvailable` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
p.ImageUrl → p.CoverImageUrl
p.Stock, → (xóa dòng này)
p.IsAvailable → p.Status
product.ImageUrl → product.CoverImageUrl
product.Stock → (xóa dòng này)
product.IsAvailable → product.Status
```

**Vị trí**: Lines 30, 35, 40, 60, 65, 70, 95, 100, 105

---

### 7. SearchController.cs

**Lỗi**: `Group.MemberCount`, `Video.Views` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
g.MemberCount → g.MembersCount
v.Views → v.ViewsCount
```

**Vị trí**: Lines 60, 85

---

### 8. StatisticsController.cs

**Lỗi**: `DailyStatistic.Date`, `NewPosts`, `NewVideos`, `TotalLogins` không tồn tại
**Lỗi**: `_context.UserGameLibrary` không tồn tại

**Sửa**:
```csharp
// Thay đổi:
ds.Date → ds.StatDate
ds.NewPosts → ds.TotalPosts
ds.NewVideos → ds.TotalVideos
ds.TotalLogins → (xóa dòng này)
_context.UserGameLibrary → _context.UserGameLibraries
```

**Vị trí**: Lines 80, 85, 90, 95, 120

---

## 🎯 Tóm tắt thay đổi

| Model | Wrong Property | Correct Property |
|-------|---------------|------------------|
| Photo | Url | ImageUrl |
| Photo | UploadedAt | CreatedAt |
| UserBadge | EarnedAt | AwardedAt |
| UserBadge | BadgeDescription | BadgeType |
| UserBadge | BadgeIconUrl | IconUrl |
| UserActivityLog | Timestamp | CreatedAt |
| UserActivityLog | Description | RelatedType |
| UserActivityLog | IpAddress | (remove) |
| TrendingItem | Rank | (remove, use EngagementScore) |
| StoreOrder | OrderDate | CreatedAt |
| StoreOrder | ShippingAddress | (remove) |
| StoreOrder | PaymentMethod | (remove) |
| OrderItem | Price | UnitPrice, TotalPrice |
| StoreProduct | ImageUrl | CoverImageUrl |
| StoreProduct | Stock | (remove) |
| StoreProduct | IsAvailable | Status |
| Group | MemberCount | MembersCount |
| Video | Views | ViewsCount |
| DailyStatistic | Date | StatDate |
| DailyStatistic | NewPosts | TotalPosts |
| DailyStatistic | NewVideos | TotalVideos |
| DailyStatistic | TotalLogins | (remove) |
| AppDbContext | UserGameLibrary | UserGameLibraries |

---

## ✅ Sau khi sửa

1. Build project:
```bash
dotnet build
```

2. Kiểm tra errors:
```bash
dotnet build 2>&1 | Select-String "error"
```

3. Nếu không còn errors, chạy project:
```bash
dotnet run
```

---

## 🚀 Kết quả mong đợi

- ✅ 0 compilation errors
- ✅ Project build thành công
- ✅ Tất cả controllers hoạt động
- ✅ APIs sẵn sàng test

---

## 📝 Lưu ý

- Autofix có thể revert các thay đổi, nên sửa tất cả cùng lúc
- Sau khi sửa, commit ngay để tránh mất thay đổi
- Nếu vẫn có lỗi, kiểm tra lại models trong thư mục `Models/`

---

*Last Updated: November 19, 2025*
