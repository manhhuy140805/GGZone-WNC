# Mock Data Documentation

This directory contains comprehensive mock data for the GGZone gaming platform, aligned with the database schema.

## Overview

All mock data is structured to match the SQL Server database schema defined in `DB/SQLQuery1.sql`. The data includes realistic relationships between entities and follows the same constraints and data types.

## Data Files

### Core Entities

#### 1. **users.ts**
- **mockUsers**: 6 primary users with complete profiles
- **additionalMockUsers**: 5 additional users for extended testing
- Includes user stats (friends, wins, tournaments, posts, photos)
- User roles: user, admin, moderator
- User statuses: online, offline, in-game

#### 2. **games.ts**
- **mockGames**: 6 popular games (Valorant, LoL, CS2, DOTA 2, Overwatch 2, Minecraft)
- **additionalMockGames**: 5 more games (Apex Legends, Fortnite, Rocket League, Rainbow Six Siege, Among Us)
- Complete game metadata with cover images and icons

#### 3. **groups.ts**
- **mockGroups**: 5 gaming communities
- Group types: public and private
- Includes member counts and post counts

#### 4. **groupMembers.ts**
- **mockGroupMembers**: 19 group membership records
- Roles: admin, moderator, member
- Links users to groups with join dates

### Social Features

#### 5. **posts.ts**
- **mockPosts**: 5 primary posts
- **additionalMockPosts**: 5 more posts
- Post types: text, video, image, gallery
- Includes engagement metrics (likes, comments, shares)

#### 6. **comments.ts**
- **mockComments**: 3 primary comments
- **additionalMockComments**: 3 more comments
- Supports nested comments (parent-child relationships)

#### 7. **friendships.ts**
- **mockFriendships**: 10 friendship connections
- Statuses: pending, accepted, blocked
- Bidirectional relationships between users

#### 8. **photos.ts**
- **mockPhotos**: 10 user-uploaded photos
- Linked to games and users
- Includes captions and like counts

### Marketplace & Store

#### 9. **marketplace.ts**
- **mockMarketplaceItems**: 5 user-to-user marketplace items
- **mockMarketplaceReviews**: 4 item reviews
- Categories: gear, equipment
- Includes buyer information and ratings

#### 10. **storeProducts.ts**
- **mockStoreProducts**: 8 official store products
- **mockStoreOrders**: 5 purchase orders
- Categories: in-game-currency, dlc, subscription, gift-card
- Order statuses: pending, completed, cancelled

### Gaming Features

#### 11. **achievements.ts**
- **mockAchievements**: 8 primary achievements
- **additionalMockAchievements**: 5 more achievements
- **mockUserAchievements**: 4 user progress records
- **additionalMockUserAchievements**: 2 more progress records
- Badge types: bronze, silver, gold
- Progress tracking with completion status

#### 12. **tournaments.ts**
- **mockTournaments**: 4 primary tournaments
- **additionalMockTournaments**: 3 more tournaments
- **mockTournamentParticipants**: 4 participant records
- Tournament statuses: upcoming, ongoing, completed
- Includes prize pools and participant limits

#### 13. **liveChannels.ts**
- **mockLiveChannels**: 4 streaming channels
- Channel statuses: live, offline, scheduled
- Includes viewer counts and stream metadata

### Communication

#### 14. **messages.ts**
- **mockMessages**: 12 direct messages between users
- Read/unread status tracking
- Helper function: `getConversationsForUser()` to get user conversations

#### 15. **notifications.ts**
- **mockNotifications**: 12 notifications
- Notification types:
  - friend_request
  - post_like
  - comment
  - tournament
  - achievement
  - group_invite
  - message
  - stream_live
  - marketplace
  - tournament_result
  - friend_online
  - system

### Analytics

#### 16. **trending.ts**
- **mockTrendingItems**: 11 trending content items
- Content types: game, post, video, stream
- Includes view counts and engagement scores
- Date-based trending data

### Miscellaneous

#### 17. **categories.ts**
- **mockCategories**: 2 game categories
- Used for browsing and filtering

## Data Relationships

### User Relationships
```
Users
├── UserStats (1:1)
├── Friendships (M:M via Friendships table)
├── Posts (1:M)
├── Comments (1:M)
├── Photos (1:M)
├── Messages (1:M as sender/receiver)
├── Notifications (1:M)
├── GroupMembers (M:M via GroupMembers table)
├── UserAchievements (M:M via UserAchievements table)
├── TournamentParticipants (M:M via TournamentParticipants table)
├── MarketplaceItems (1:M as seller)
├── StoreOrders (1:M)
└── LiveChannels (1:M)
```

### Game Relationships
```
Games
├── Posts (1:M)
├── Photos (1:M)
├── Achievements (1:M)
├── Tournaments (1:M)
├── LiveChannels (1:M)
├── MarketplaceItems (1:M)
├── StoreProducts (1:M)
└── TrendingItems (1:M)
```

### Group Relationships
```
Groups
├── GroupMembers (1:M)
└── Posts (1:M)
```

## Usage Examples

### Import All Mock Data
```typescript
import {
  mockUsers,
  mockGames,
  mockGroups,
  mockPosts,
  mockAchievements,
  mockTournaments,
  mockMarketplaceItems,
  mockNotifications,
  mockMessages,
  mockPhotos,
  mockFriendships,
  mockStoreProducts,
  mockTrendingItems,
} from '@/assets/mock';
```

### Get User with Stats
```typescript
const user = mockUsers.find(u => u.id === 'user-id');
console.log(user.stats); // { friendsCount, winningCount, ... }
```

### Get User's Friends
```typescript
const userId = 'user-id';
const friendships = mockFriendships.filter(
  f => (f.userId === userId || f.friendId === userId) && f.status === 'accepted'
);
```

### Get User's Conversations
```typescript
import { getConversationsForUser } from '@/assets/mock/messages';
const conversations = getConversationsForUser('user-id');
```

### Get Trending Games
```typescript
const trendingGames = mockTrendingItems
  .filter(t => t.contentType === 'game')
  .sort((a, b) => b.engagementScore - a.engagementScore);
```

## Data Statistics

- **Users**: 11 total (6 primary + 5 additional)
- **Games**: 11 total (6 primary + 5 additional)
- **Groups**: 5
- **Group Members**: 19
- **Posts**: 10 (5 primary + 5 additional)
- **Comments**: 6 (3 primary + 3 additional)
- **Friendships**: 10
- **Photos**: 10
- **Achievements**: 13 (8 primary + 5 additional)
- **User Achievements**: 6 (4 primary + 2 additional)
- **Tournaments**: 7 (4 primary + 3 additional)
- **Tournament Participants**: 4
- **Live Channels**: 4
- **Marketplace Items**: 5
- **Marketplace Reviews**: 4
- **Store Products**: 8
- **Store Orders**: 5
- **Messages**: 12
- **Notifications**: 12
- **Trending Items**: 11

## Notes

- All IDs follow UUID format matching SQL Server UNIQUEIDENTIFIER
- Dates are in ISO 8601 format
- Image URLs use placeholder services or real gaming images
- Vietnamese locations are used for regional authenticity
- Prices are in Vietnamese Dong (VND)
- All data maintains referential integrity

## Future Enhancements

Consider adding:
- More diverse user profiles
- Additional game genres
- More complex tournament brackets
- Streaming schedule data
- Marketplace transaction history
- User preferences and settings
- Moderation logs
- Analytics data
