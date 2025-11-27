# About Tab API Integration Guide

## Overview
Đã tích hợp API để fetch dữ liệu friends, groups, và badges cho tab About trong Profile page.

## Files Created/Modified

### 1. **friendshipService.ts** (NEW)
- **Location**: `ggzone-fe/src/services/friendshipService.ts`
- **Purpose**: Service để gọi Friendship API endpoints
- **Methods**:
  - `getFriends(userId)` - Lấy danh sách bạn bè
  - `getFriendRequests(userId)` - Lấy danh sách yêu cầu kết bạn
  - `getSentRequests(userId)` - Lấy danh sách yêu cầu đã gửi
  - `getFriendSuggestions(userId)` - Lấy gợi ý kết bạn
  - `sendFriendRequest(friendId)` - Gửi yêu cầu kết bạn
  - `acceptFriendRequest(friendshipId)` - Chấp nhận yêu cầu kết bạn
  - `declineFriendRequest(friendshipId)` - Từ chối yêu cầu kết bạn
  - `removeFriend(friendshipId)` - Xóa bạn bè
  - `dismissSuggestion(suggestionId)` - Bỏ qua gợi ý

### 2. **groupService.ts** (NEW)
- **Location**: `ggzone-fe/src/services/groupService.ts`
- **Purpose**: Service để gọi Groups API endpoints
- **Methods**:
  - `getAllGroups()` - Lấy tất cả groups
  - `getGroupById(id)` - Lấy group theo ID
  - `getGroupPosts(groupId, page, pageSize)` - Lấy posts của group
  - `createGroup(name, description, coverImageUrl, iconUrl, visibility)` - Tạo group mới
  - `joinGroup(groupId)` - Tham gia group
  - `leaveGroup(groupId)` - Rời khỏi group

### 3. **badgeService.ts** (NEW)
- **Location**: `ggzone-fe/src/services/badgeService.ts`
- **Purpose**: Service để gọi Badges API endpoints
- **Methods**:
  - `getUserBadges(userId)` - Lấy badges của user
  - `getAllBadges()` - Lấy tất cả badges
  - `awardBadge(userId, badgeName, badgeType, iconUrl)` - Award badge cho user
  - `removeBadge(badgeId)` - Xóa badge

### 4. **Profile.tsx** (MODIFIED)
- **Location**: `ggzone-fe/src/pages/Profile.tsx`
- **Changes**:
  - Import `friendshipService`, `groupService`, `badgeService`
  - Thêm states: `userFriends`, `userGroups`, `userBadges`
  - Thêm `useEffect` hook để load about data khi tab "about" được chọn
  - Thêm `loadAboutData()` function để fetch friends, groups, badges
  - Update `earnedCount` từ `userBadges.length`

### 5. **AboutTab.tsx** (MODIFIED)
- **Location**: `ggzone-fe/src/components/profile/tabs/AboutTab.tsx`
- **Changes**:
  - Thêm `Badge` interface
  - Thêm `userBadges` prop
  - Cập nhật `userFriends` type từ `(User | undefined)[]` thành `User[]`
  - Thêm "Achievements/Badges" section
  - Cải thiện UI với hover effects
  - Hiển thị badge name, type, awarded date

## API Endpoints Used

```
GET /api/friendship/{userId}/friends              - Lấy danh sách bạn bè
GET /api/friendship/{userId}/requests             - Lấy yêu cầu kết bạn
GET /api/friendship/{userId}/sent                 - Lấy yêu cầu đã gửi
GET /api/friendship/{userId}/suggestions          - Lấy gợi ý kết bạn
POST /api/friendship/send                         - Gửi yêu cầu kết bạn
PUT /api/friendship/{id}/accept                   - Chấp nhận yêu cầu
PUT /api/friendship/{id}/decline                  - Từ chối yêu cầu
DELETE /api/friendship/{id}                       - Xóa bạn bè
PUT /api/friendship/suggestion/{id}/dismiss       - Bỏ qua gợi ý

GET /api/groups                                   - Lấy tất cả groups
GET /api/groups/{id}                              - Lấy group theo ID
GET /api/groups/{id}/posts                        - Lấy posts của group
POST /api/groups                                  - Tạo group mới
POST /api/groups/{id}/join                        - Tham gia group
DELETE /api/groups/{id}/leave                     - Rời khỏi group

GET /api/badge/{userId}                           - Lấy badges của user
GET /api/badge/all                                - Lấy tất cả badges
POST /api/badge                                   - Award badge
DELETE /api/badge/{id}                            - Xóa badge
```

## Data Flow

```
Profile.tsx
  ├─ useEffect (activeTab === "about")
  │  └─ loadAboutData()
  │     ├─ friendshipService.getFriends(userId)
  │     │  └─ HttpClient.get(/api/friendship/{userId}/friends)
  │     │     └─ setUserFriends(friends)
  │     │
  │     ├─ groupService.getAllGroups()
  │     │  └─ HttpClient.get(/api/groups)
  │     │     └─ setUserGroups(groups)
  │     │
  │     └─ badgeService.getUserBadges(userId)
  │        └─ HttpClient.get(/api/badge/{userId})
  │           └─ setUserBadges(badges)
  │
  └─ <AboutTab 
       user={currentUser} 
       userFriends={userFriends}
       userGroups={userGroups}
       earnedCount={earnedCount}
       userBadges={userBadges}
     />
     ├─ Display bio
     ├─ Display personal info (location, email, joined date, role)
     ├─ Display gaming profile stats
     ├─ Display friends list (top 6)
     ├─ Display achievements/badges (top 12)
     └─ Display current status
```

## Features

✅ **Fetch Friends**: Tự động load friends khi vào tab "about"
✅ **Fetch Groups**: Load groups data từ API
✅ **Fetch Badges**: Load user achievements/badges từ API
✅ **Display Friends**: Hiển thị top 6 friends với avatar, name, username
✅ **Display Badges**: Hiển thị top 12 badges với icon, name, type, awarded date
✅ **Responsive Design**: Responsive layout cho tất cả devices
✅ **Error Handling**: Xử lý lỗi API gracefully
✅ **Empty State**: Hiển thị message khi không có data

## Sections Displayed

### Bio Section
- User bio text

### Personal Information
- Location (with MapPin icon)
- Email (with Mail icon)
- Joined date (with Calendar icon)
- Role (with Shield icon)

### Gaming Profile
- Total posts
- Photos shared
- Friends count
- Groups joined
- Achievements count

### Friends Section
- Display top 6 friends
- Show avatar, full name, username
- Hover effect

### Achievements Section
- Display top 12 badges
- Show badge icon, name, type, awarded date
- Hover effect

### Status Section
- Current online status (online, in-game, offline)
- Status indicator with color

## Next Steps

1. **Implement Friend Actions**: Thêm buttons để add/remove friends
2. **Implement Group Actions**: Thêm buttons để join/leave groups
3. **Add Pagination**: Implement pagination cho friends list
4. **Add Filters**: Thêm filter by status, joined date, etc.
5. **Add Search**: Thêm search functionality cho friends
6. **Add Leaderboard**: Thêm leaderboard comparison

## Notes

- Friends được fetch từ `/api/friendship/{userId}/friends` endpoint
- Groups được fetch từ `/api/groups` endpoint (public)
- Badges được fetch từ `/api/badge/{userId}` endpoint
- Friends list hiển thị top 6, badges hiển thị top 12
- Earned count được tính từ `userBadges.length`
- Tất cả API calls có authentication check nếu cần
