# Stats Tab API Integration Guide

## Overview
Đã tích hợp API để fetch dữ liệu games và stats cho tab Stats trong Profile page.

## Files Created/Modified

### 1. **gameService.ts** (NEW)
- **Location**: `ggzone-fe/src/services/gameService.ts`
- **Purpose**: Service để gọi Games API endpoints
- **Methods**:
  - `getAllGames()` - Lấy tất cả games
  - `getGameById(id)` - Lấy game theo ID
  - `getGameBySlug(slug)` - Lấy game theo slug
  - `getTrendingGames(limit)` - Lấy trending games

### 2. **trendingService.ts** (NEW)
- **Location**: `ggzone-fe/src/services/trendingService.ts`
- **Purpose**: Service để gọi Trending API endpoints
- **Methods**:
  - `getTrendingGames(limit)` - Lấy trending games
  - `getTrendingPlayers(limit)` - Lấy trending players
  - `getTrendingVideos(limit)` - Lấy trending videos
  - `getTrendingPosts(limit)` - Lấy trending posts

### 3. **Profile.tsx** (MODIFIED)
- **Location**: `ggzone-fe/src/pages/Profile.tsx`
- **Changes**:
  - Import `gameService` và `Game` type
  - Thêm state `games` để lưu danh sách games
  - Thêm `useEffect` hook để load games khi tab "stats" được chọn
  - Gọi `gameService.getAllGames()` để fetch dữ liệu
  - Update `totalPoints` từ `user.stats.totalPoints`

### 4. **StatsTab.tsx** (MODIFIED)
- **Location**: `ggzone-fe/src/components/profile/tabs/StatsTab.tsx`
- **Changes**:
  - Thêm `GameStats` interface với `hoursPlayed` property
  - Thêm helper functions: `getLevel()`, `getWinRate()`
  - Cải thiện UI với 4 stat cards thay vì 3
  - Thêm "Games Played" section với danh sách games từ API
  - Thêm "User Stats" section hiển thị user statistics
  - Thêm "Gaming Stats" section hiển thị gaming statistics
  - Xóa hardcoded "Recent Activity" section
  - Sử dụng `game.hoursPlayed` từ props thay vì gọi function

## API Endpoints Used

```
GET /api/games                    - Lấy tất cả games
GET /api/games/{id}               - Lấy game theo ID
GET /api/games/slug/{slug}        - Lấy game theo slug
GET /api/games/trending?limit=10  - Lấy trending games

GET /api/trending/games           - Lấy trending games
GET /api/trending/players         - Lấy trending players
GET /api/trending/videos          - Lấy trending videos
GET /api/trending/posts           - Lấy trending posts
```

## Data Flow

```
Profile.tsx
  ├─ useEffect (activeTab === "stats")
  │  └─ loadGames()
  │     └─ gameService.getAllGames()
  │        └─ HttpClient.get(/api/games)
  │           └─ setGames(response.data)
  │
  └─ <StatsTab games={games} user={currentUser} totalPoints={totalPoints} />
     ├─ Display overall stats (wins, tournaments, points, level)
     ├─ Display games played list
     ├─ Display user stats (friends, posts, photos, videos, groups)
     └─ Display gaming stats (wins, tournaments, win rate, level, points)
```

## Features

✅ **Fetch Games**: Tự động load games khi vào tab "stats"
✅ **Display Stats**: Hiển thị user stats từ API
✅ **Calculate Metrics**: Tính toán win rate, level từ stats
✅ **Responsive Design**: Responsive layout cho tất cả devices
✅ **Error Handling**: Xử lý lỗi API gracefully
✅ **Empty State**: Hiển thị message khi không có games

## Stats Displayed

### Overall Stats (4 Cards)
- **Total Wins**: Từ `user.stats.winningCount`
- **Tournaments**: Từ `user.stats.tournamentsCount`
- **Achievement Points**: Từ `totalPoints`
- **Games Played**: Từ `user.stats.postsCount`

### Games Played
- Danh sách top 5 games từ API
- Hiển thị game icon, name, genre
- Mock data cho hours played

### User Stats
- Friends count
- Posts count
- Photos count
- Videos count
- Groups count

### Gaming Stats
- Total wins
- Tournaments participated
- Win rate (calculated)
- Level (calculated)
- Total points

## Calculations

### Win Rate
```typescript
const getWinRate = () => {
  if (!user?.stats?.winningCount) return 0;
  const estimatedMatches = Math.max(user.stats.winningCount * 2, 10);
  return Math.round((user.stats.winningCount / estimatedMatches) * 100);
};
```

### Level
```typescript
const getLevel = () => {
  return user?.stats?.level || Math.floor(totalPoints / 100) + 1;
};
```

## Next Steps

1. **Implement Real Hours Played**: Fetch actual hours played data từ backend
2. **Implement Recent Activity**: Fetch recent activity từ API
3. **Add Filters**: Thêm filter by game, date range, etc.
4. **Add Charts**: Thêm charts để visualize stats
5. **Add Achievements**: Thêm achievements/badges section
6. **Add Leaderboard**: Thêm leaderboard comparison

## Notes

- Games được fetch từ `/api/games` endpoint (public)
- Stats được lấy từ `user.stats` object (từ getCurrentUser)
- Hours played được tạo một lần khi games được load (stable data)
- Win rate được tính từ winning count
- Level được tính từ total points hoặc từ user.stats.level
- `GameStats` interface mở rộng `Game` interface với `hoursPlayed` property

## Bug Fix

**Issue**: Games Played chạy liên tục không ngừng (random numbers thay đổi mỗi render)

**Root Cause**: `getHoursPlayed()` function được gọi mỗi lần component render, tạo random numbers mới

**Solution**: 
1. Tạo `GameStats` interface với `hoursPlayed` property
2. Tính toán `hoursPlayed` một lần khi games được load trong `loadGames()`
3. Lưu stable data vào state
4. Sử dụng `game.hoursPlayed` từ props thay vì gọi function
