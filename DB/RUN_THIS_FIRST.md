# 🚀 Hướng dẫn Update Database

## Vấn đề hiện tại
Tất cả posts trong database có cùng CreatedAt timestamp, dẫn đến:
- Không sắp xếp được theo thời gian
- Hiển thị "just now" cho tất cả posts
- Không có thứ tự rõ ràng

## Giải pháp
Chạy SQL script để update timestamps cho mỗi post.

## Cách 1: SQL Server Management Studio (SSMS)

### Bước 1: Mở SSMS
1. Mở SQL Server Management Studio
2. Connect đến server của bạn
3. Chọn database `GGZone`

### Bước 2: Chạy Script
1. File → Open → File
2. Chọn file `DB/3_Fix_Post_Timestamps.sql`
3. Nhấn F5 hoặc Execute
4. Xem kết quả trong Messages tab

### Bước 3: Verify
```sql
-- Check top 10 posts
SELECT TOP 10
    Id,
    LEFT(Content, 50) as ContentPreview,
    CreatedAt,
    DATEDIFF(MINUTE, CreatedAt, GETDATE()) as MinutesAgo
FROM Posts
ORDER BY CreatedAt DESC;
```

Kết quả mong đợi:
```
Post 1: 5 minutes ago
Post 2: 15 minutes ago
Post 3: 30 minutes ago
...
```

## Cách 2: Command Line (sqlcmd)

### Bước 1: Mở Command Prompt
```cmd
cd D:\1.University\1.HK125\5.2.WNC\GGZone\GGZone-WNC
```

### Bước 2: Chạy Script
```cmd
sqlcmd -S localhost -d GGZone -i DB\3_Fix_Post_Timestamps.sql
```

Hoặc nếu cần authentication:
```cmd
sqlcmd -S localhost -U sa -P YourPassword -d GGZone -i DB\3_Fix_Post_Timestamps.sql
```

### Bước 3: Verify
```cmd
sqlcmd -S localhost -d GGZone -Q "SELECT TOP 5 LEFT(Content, 30), CreatedAt FROM Posts ORDER BY CreatedAt DESC"
```

## Cách 3: Visual Studio / Rider

### Visual Studio
1. View → SQL Server Object Explorer
2. Expand server → Databases → GGZone
3. Right-click GGZone → New Query
4. Copy nội dung từ `3_Fix_Post_Timestamps.sql`
5. Paste và Execute

### Rider
1. Database tool window
2. Right-click GGZone → New → Query Console
3. Copy nội dung từ `3_Fix_Post_Timestamps.sql`
4. Paste và Execute (Ctrl+Enter)

## Sau khi chạy script

### 1. Restart Backend
```bash
# Stop backend (Ctrl+C)
cd ggzone-be
dotnet run
```

### 2. Refresh Frontend
```bash
# Trong browser
F5 hoặc Ctrl+R
```

### 3. Kiểm tra kết quả
- Mở trang Feed
- Posts sẽ hiển thị thời gian khác nhau:
  - "5m ago"
  - "15m ago"
  - "30m ago"
  - "1h ago"
  - "2h ago"
  - etc.

## Troubleshooting

### Lỗi: "Cannot open database"
**Giải pháp:**
```sql
-- Check database exists
SELECT name FROM sys.databases WHERE name = 'GGZone';

-- If not exists, run schema first
-- Execute: DB/1_GGZone_Schema.sql
-- Then: DB/2_GGZone_SampleData.sql
-- Finally: DB/3_Fix_Post_Timestamps.sql
```

### Lỗi: "Invalid object name 'Posts'"
**Giải pháp:**
```sql
-- Check if Posts table exists
SELECT * FROM INFORMATION_SCHEMA.TABLES 
WHERE TABLE_NAME = 'Posts';

-- If not exists, run schema first
```

### Lỗi: "Login failed"
**Giải pháp:**
- Check connection string trong `appsettings.json`
- Verify SQL Server is running
- Check authentication mode (Windows/SQL Server)

## Verify Script Đã Chạy

### Check trong Database
```sql
-- Should show different timestamps
SELECT 
    Id,
    LEFT(Content, 40) as Content,
    CreatedAt,
    DATEDIFF(MINUTE, CreatedAt, GETDATE()) as MinutesAgo
FROM Posts
ORDER BY CreatedAt DESC;
```

### Check trong API
```bash
# Call API
curl http://localhost:7009/api/posts/feed

# Or open in browser
http://localhost:7009/api/posts/feed
```

Response should show different `createdAt` values:
```json
{
  "posts": [
    { "createdAt": "2025-11-30T23:55:00", ... },
    { "createdAt": "2025-11-30T23:45:00", ... },
    { "createdAt": "2025-11-30T23:30:00", ... }
  ]
}
```

### Check trong UI
1. Mở http://localhost:5173/feed
2. Xem thời gian của mỗi post
3. Phải khác nhau: "5m ago", "15m ago", "1h ago", etc.

## Nếu vẫn không work

### Option 1: Manual Update
```sql
-- Update một post cụ thể
UPDATE Posts 
SET CreatedAt = DATEADD(MINUTE, -10, GETDATE())
WHERE Id = 'your-post-id';
```

### Option 2: Re-run Sample Data
```sql
-- Delete all posts
DELETE FROM PostLikes;
DELETE FROM PostMedia;
DELETE FROM Comments;
DELETE FROM Posts;

-- Re-run sample data
-- Execute: DB/2_GGZone_SampleData.sql
-- Then: DB/3_Fix_Post_Timestamps.sql
```

### Option 3: Check Backend Logs
```bash
# In backend terminal, look for:
"Like: Old count = X, New count = Y"
"Unlike: Old count = X, New count = Y"
```

## Summary Checklist

- [ ] SQL script đã chạy thành công
- [ ] Backend đã restart
- [ ] Frontend đã refresh
- [ ] Posts hiển thị thời gian khác nhau
- [ ] Thứ tự posts đúng (mới nhất trước)
- [ ] "just now" chỉ hiển thị cho posts thực sự mới

## Liên hệ

Nếu vẫn gặp vấn đề, cung cấp:
1. Screenshot của error message
2. Output của query verify
3. Backend console logs
4. Browser console logs
