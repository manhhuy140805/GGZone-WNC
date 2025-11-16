# GGZone Mock Data Guide

## Overview

This guide provides comprehensive documentation for all mock data in the GGZone gaming platform. The mock data is designed to match the SQL Server database schema and provide realistic test data for development.

## Project Structure

```
ggzone/
├── DB/
│   ├── SQLQuery1.sql              # Database schema
│   └── SQLQuery2_SampleData.sql   # Sample data inserts
├── ggzone-fe/
│   └── src/
│       └── assets/
│           └── mock/
│               ├── README.md              # Mock data documentation
│               ├── index.ts               # Central export file
│               ├── users.ts               # User data
│               ├── games.ts               # Game catalog
│               ├── groups.ts              # Gaming groups
│               ├── groupMembers.ts        # Group memberships
│               ├── posts.ts               # Social posts & comments
│               ├── friendships.ts         # User connections
│               ├── photos.ts              # User gallery
│               ├── achievements.ts        # Achievements & progress
│               ├── tournaments.ts         # Tournaments & participants
│               ├── liveChannels.ts        # Live streams
│               ├── marketplace.ts         # User marketplace
│               ├── storeProducts.ts       # Official store
│               ├── notifications.ts       # User notifications
│               ├── messages.ts            # Direct messages
│               ├── trending.ts            # Trending content
│               └── categories.ts          # Browse categories
└── MOCK_DATA_GUIDE.md             # This file
```

## Database Schema Alignment

All mock data follows the database schema defined in `DB/SQLQuery1.sql`:

### Core Tables
- ✅ Users & UserStats
- ✅ Friendships
- ✅ Groups & GroupMembers
- ✅ Games
- ✅ Posts, PostMedia, PostLikes, Comments
- ✅ Photos
- ✅ LiveChannels
- ✅ MarketplaceItems & MarketplaceReviews
- ✅ StoreProducts & StoreOrders
- ✅ Achievements & UserAchievements
- ✅ Tournaments & TournamentParticipants
- ✅ Notifications
- ✅ Messages
- ✅ TrendingItems

## Mock Data Files

### 1. Users (`users.ts`)

**Primary Users (6)**
- alice - Gaming enthusiast, Valorant player
- bob - CS2 competitive player, Moderator
- charlie - League of Legends player
- david - FPS lover
- emma - Casual gamer, Streamer
- frank - Admin, Community manager

**Additional Users (5)**
- grace - Minecraft builder
- henry - DOTA 2 pro player
- isabel - Overwatch support main
- jack - Casual gamer
- kate - Content creator, Moderator

**Features:**
- Complete user profiles with avatars
- User stats (friends, wins, tournaments, posts, photos)
- Different roles: user, admin, moderator
- Various statuses: online, offline, in-game
- Verified/unverified accounts

### 2. Games (`games.ts`)

**Primary Games (6)**
- Valorant (FPS)
- League of Legends (MOBA)
- Counter-Strike 2 (FPS)
- DOTA 2 (MOBA)
- Overwatch 2 (FPS)
- Minecraft (Sandbox)

**Additional Games (5)**
- Apex Legends (Battle Royale)
- Fortnite (Battle Royale)
- Rocket League (Sports)
- Rainbow Six Siege (FPS)
- Among Us (Party)

### 3. Groups (`groups.ts`)

**5 Gaming Communities:**
- Gamers VN (156 members) - General Vietnamese gaming
- FPS Lovers (234 members) - FPS enthusiasts
- Competitive Esports (45 members) - Private, competitive
- MOBA Players Unite (89 members) - LoL & DOTA 2
- Casual Gamers Squad (512 members) - Casual players

### 4. Social Features

**Posts (`posts.ts`)**
- 10 posts total (5 primary + 5 additional)
- Types: text, video, image, gallery
- Engagement metrics: likes, comments, shares
- Pinned posts support

**Comments (`comments.ts`)**
- 6 comments (3 primary + 3 additional)
- Nested comment support
- User information included

**Friendships (`friendships.ts`)**
- 10 friendship connections
- Statuses: pending, accepted, blocked
- Bidirectional relationships

**Photos (`photos.ts`)**
- 10 user-uploaded photos
- Linked to games and users
- Captions and like counts

### 5. Marketplace & Store

**Marketplace (`marketplace.ts`)**
- 5 user-to-user items (gaming gear)
- 4 reviews with ratings
- Categories: gear, equipment
- Buyer information

**Store Products (`storeProducts.ts`)**
- 8 official products
- Categories: in-game-currency, dlc, subscription, gift-card
- 5 order records
- Order statuses: pending, completed, cancelled

### 6. Gaming Features

**Achievements (`achievements.ts`)**
- 13 achievements (8 primary + 5 additional)
- Badge types: bronze, silver, gold
- 6 user progress records
- Progress tracking with completion status

**Tournaments (`tournaments.ts`)**
- 7 tournaments (4 primary + 3 additional)
- Statuses: upcoming, ongoing, completed
- 4 participant records
- Prize pools in VND

**Live Channels (`liveChannels.ts`)**
- 4 streaming channels
- Statuses: live, offline, scheduled
- Viewer counts

### 7. Communication

**Messages (`messages.ts`)**
- 12 direct messages
- Read/unread tracking
- Helper function: `getConversationsForUser()`

**Notifications (`notifications.ts`)**
- 12 notifications
- Types: friend_request, post_like, comment, tournament, achievement, group_invite, message, stream_live, marketplace, tournament_result, friend_online, system

### 8. Analytics

**Trending (`trending.ts`)**
- 11 trending items
- Content types: game, post, video, stream
- View counts and engagement scores

## Usage Examples

### Import Mock Data

```typescript
// Import specific data
import { mockUsers, mockGames, mockGroups } from '@/assets/mock';

// Import all
import * as mockData from '@/assets/mock';
```

### Common Queries

```typescript
// Get user by ID
const user = mockUsers.find(u => u.id === userId);

// Get user's friends
const friends = mockFriendships
  .filter(f => 
    (f.userId === userId || f.friendId === userId) && 
    f.status === 'accepted'
  );

// Get posts for a group
const groupPosts = mockPosts.filter(p => p.groupId === groupId);

// Get user's achievements
const userAchievements = mockUserAchievements
  .filter(ua => ua.userId === userId);

// Get trending games
const trendingGames = mockTrendingItems
  .filter(t => t.contentType === 'game')
  .sort((a, b) => b.engagementScore - a.engagementScore);

// Get user conversations
import { getConversationsForUser } from '@/assets/mock/messages';
const conversations = getConversationsForUser(userId);
```

## Database Integration

### SQL Sample Data

The file `DB/SQLQuery2_SampleData.sql` contains SQL INSERT statements that match the TypeScript mock data. This allows you to:

1. Test with real database
2. Verify data integrity
3. Test stored procedures and triggers
4. Performance testing

### Running SQL Sample Data

```sql
-- 1. Create database schema
USE master;
GO
-- Run SQLQuery1.sql

-- 2. Insert sample data
USE GameCO;
GO
-- Run SQLQuery2_SampleData.sql
```

## Data Statistics

| Entity | Count |
|--------|-------|
| Users | 11 |
| Games | 11 |
| Groups | 5 |
| Group Members | 19 |
| Posts | 10 |
| Comments | 6 |
| Friendships | 10 |
| Photos | 10 |
| Achievements | 13 |
| User Achievements | 6 |
| Tournaments | 7 |
| Tournament Participants | 4 |
| Live Channels | 4 |
| Marketplace Items | 5 |
| Marketplace Reviews | 4 |
| Store Products | 8 |
| Store Orders | 5 |
| Messages | 12 |
| Notifications | 12 |
| Trending Items | 11 |

## Development Workflow

### 1. Frontend Development
```typescript
// Use mock data directly
import { mockUsers } from '@/assets/mock';

function UserProfile({ userId }) {
  const user = mockUsers.find(u => u.id === userId);
  return <div>{user.fullName}</div>;
}
```

### 2. API Development
```typescript
// Simulate API responses
app.get('/api/users/:id', (req, res) => {
  const user = mockUsers.find(u => u.id === req.params.id);
  res.json(user);
});
```

### 3. Testing
```typescript
// Use in tests
import { mockUsers } from '@/assets/mock';

test('should display user name', () => {
  const user = mockUsers[0];
  render(<UserProfile user={user} />);
  expect(screen.getByText(user.fullName)).toBeInTheDocument();
});
```

## Best Practices

1. **Consistency**: Always use the same IDs across related entities
2. **Realism**: Use realistic data that represents actual use cases
3. **Relationships**: Maintain referential integrity between entities
4. **Dates**: Use ISO 8601 format for all dates
5. **IDs**: Use UUID format matching SQL Server UNIQUEIDENTIFIER

## Future Enhancements

### Planned Additions
- [ ] More diverse user profiles
- [ ] Additional game genres
- [ ] Complex tournament brackets
- [ ] Streaming schedule data
- [ ] Transaction history
- [ ] User preferences
- [ ] Moderation logs
- [ ] Analytics data

### Contributing

When adding new mock data:
1. Follow existing patterns
2. Maintain referential integrity
3. Update this documentation
4. Add corresponding SQL inserts
5. Update statistics

## Support

For questions or issues:
- Check `ggzone-fe/src/assets/mock/README.md` for detailed API docs
- Review `DB/SQLQuery1.sql` for schema reference
- See example usage in existing components

## License

This mock data is for development and testing purposes only.
