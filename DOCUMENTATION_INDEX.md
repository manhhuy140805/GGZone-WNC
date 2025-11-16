# GGZone Documentation Index

Welcome to the GGZone gaming platform documentation. This index will help you find the information you need.

## 📚 Quick Navigation

### Getting Started
- [Main README](README.md) - Project overview and setup
- [Mock Data Quick Start](ggzone-fe/MOCK_DATA_QUICK_START.md) - Start using mock data in 5 minutes
- [Demo Accounts](ggzone-fe/DEMO_ACCOUNTS.txt) - Test user credentials
- [Login Guide](ggzone-fe/LOGIN_GUIDE.md) - How to use the authentication system

### Mock Data Documentation
- [Mock Data Summary](MOCK_DATA_SUMMARY.md) - Overview of all mock data
- [Mock Data Guide](MOCK_DATA_GUIDE.md) - Comprehensive guide with examples
- [Mock Data API Reference](ggzone-fe/src/assets/mock/README.md) - Detailed API documentation

### Database
- [Database Schema](DB/SQLQuery1.sql) - Complete SQL Server schema
- [Sample Data](DB/SQLQuery2_SampleData.sql) - SQL INSERT statements

## 📖 Documentation by Topic

### Authentication & Users
**What you'll learn**: User authentication, profiles, roles, and permissions

**Files**:
- [Login Guide](ggzone-fe/LOGIN_GUIDE.md) - Authentication flow
- [Demo Accounts](ggzone-fe/DEMO_ACCOUNTS.txt) - Test credentials
- [Users Mock Data](ggzone-fe/src/assets/mock/users.ts) - User data structure

**Quick Example**:
```typescript
import { getUserById, getUserFriends } from '@/assets/mock';
const user = getUserById('user-id');
const friends = getUserFriends('user-id');
```

### Games & Browse
**What you'll learn**: Game catalog, filtering, sorting, and display

**Files**:
- [Games Mock Data](ggzone-fe/src/assets/mock/games.ts) - Game data
- [Browse Page](ggzone-fe/src/pages/Browse.tsx) - Implementation example

**Quick Example**:
```typescript
import { mockGames } from '@/assets/mock';
const fpsgames = mockGames.filter(g => g.genre === 'FPS');
```

### Communities & Groups
**What you'll learn**: Group management, memberships, and social features

**Files**:
- [Groups Mock Data](ggzone-fe/src/assets/mock/groups.ts) - Group data
- [Group Members](ggzone-fe/src/assets/mock/groupMembers.ts) - Membership data
- [Groups Page](ggzone-fe/src/pages/Groups.tsx) - Implementation example

**Quick Example**:
```typescript
import { getUserGroups, getGroupMembers } from '@/assets/mock';
const myGroups = getUserGroups('user-id');
const members = getGroupMembers('group-id');
```

### Social Features
**What you'll learn**: Posts, comments, likes, and social interactions

**Files**:
- [Posts Mock Data](ggzone-fe/src/assets/mock/posts.ts) - Post data
- [Photos Mock Data](ggzone-fe/src/assets/mock/photos.ts) - Photo gallery
- [Friendships](ggzone-fe/src/assets/mock/friendships.ts) - Friend connections

**Quick Example**:
```typescript
import { getUserFeed, getUserPosts } from '@/assets/mock';
const feed = getUserFeed('user-id');
const posts = getUserPosts('user-id');
```

### Achievements & Progress
**What you'll learn**: Achievement system, progress tracking, badges

**Files**:
- [Achievements Mock Data](ggzone-fe/src/assets/mock/achievements.ts) - Achievement data
- [Achievements Page](ggzone-fe/src/pages/Achievements.tsx) - Implementation example

**Quick Example**:
```typescript
import { getUserAchievementsWithDetails } from '@/assets/mock';
const achievements = getUserAchievementsWithDetails('user-id');
```

### Tournaments & Esports
**What you'll learn**: Tournament system, participants, rankings

**Files**:
- [Tournaments Mock Data](ggzone-fe/src/assets/mock/tournaments.ts) - Tournament data

**Quick Example**:
```typescript
import { mockTournaments, getUserTournaments } from '@/assets/mock';
const upcoming = mockTournaments.filter(t => t.status === 'upcoming');
```

### Marketplace & Store
**What you'll learn**: E-commerce features, products, orders

**Files**:
- [Marketplace Mock Data](ggzone-fe/src/assets/mock/marketplace.ts) - User marketplace
- [Store Products](ggzone-fe/src/assets/mock/storeProducts.ts) - Official store
- [Marketplace Page](ggzone-fe/src/pages/Marketplace.tsx) - Implementation example

**Quick Example**:
```typescript
import { mockMarketplaceItems, mockStoreProducts } from '@/assets/mock';
const gearItems = mockMarketplaceItems.filter(i => i.category === 'gear');
```

### Live Streaming
**What you'll learn**: Live channels, streaming, viewers

**Files**:
- [Live Channels Mock Data](ggzone-fe/src/assets/mock/liveChannels.ts) - Stream data

**Quick Example**:
```typescript
import { mockLiveChannels } from '@/assets/mock';
const liveNow = mockLiveChannels.filter(c => c.status === 'live');
```

### Communication
**What you'll learn**: Messages, notifications, conversations

**Files**:
- [Messages Mock Data](ggzone-fe/src/assets/mock/messages.ts) - Direct messages
- [Notifications](ggzone-fe/src/assets/mock/notifications.ts) - User notifications

**Quick Example**:
```typescript
import { getConversationsForUser, getUnreadMessagesCount } from '@/assets/mock';
const conversations = getConversationsForUser('user-id');
const unread = getUnreadMessagesCount('user-id');
```

### Analytics & Trending
**What you'll learn**: Trending content, analytics, engagement

**Files**:
- [Trending Mock Data](ggzone-fe/src/assets/mock/trending.ts) - Trending items

**Quick Example**:
```typescript
import { mockTrendingItems } from '@/assets/mock';
const trending = mockTrendingItems
  .sort((a, b) => b.engagementScore - a.engagementScore);
```

## 🛠️ Technical Documentation

### Architecture
- [Project Structure](README.md#-project-structure) - File organization
- [Tech Stack](README.md#-tech-stack) - Technologies used
- [State Management](README.md#-state-management) - Context API usage

### Database
- [Schema Definition](DB/SQLQuery1.sql) - Complete database schema
- [Sample Data](DB/SQLQuery2_SampleData.sql) - Test data inserts
- [Relationships](ggzone-fe/src/assets/mock/README.md#data-relationships) - Entity relationships

### Development
- [Getting Started](README.md#-getting-started) - Setup instructions
- [Available Scripts](README.md#-available-scripts) - npm commands
- [Mock Data Helpers](ggzone-fe/src/assets/mock/helpers.ts) - Utility functions

## 📊 Reference Tables

### Mock Data Statistics
| Entity | Count | File |
|--------|-------|------|
| Users | 11 | users.ts |
| Games | 11 | games.ts |
| Groups | 5 | groups.ts |
| Posts | 10 | posts.ts |
| Achievements | 13 | achievements.ts |
| Tournaments | 7 | tournaments.ts |
| Messages | 12 | messages.ts |
| Notifications | 12 | notifications.ts |

See [Mock Data Summary](MOCK_DATA_SUMMARY.md) for complete statistics.

### Test User Credentials
| Username | Email | Role |
|----------|-------|------|
| alice | alice@example.com | user |
| bob | bob@example.com | moderator |
| frank | frank@example.com | admin |

See [Demo Accounts](ggzone-fe/DEMO_ACCOUNTS.txt) for all credentials.

### Helper Functions
| Function | Purpose |
|----------|---------|
| getUserById() | Get user by ID |
| getUserFriends() | Get user's friends |
| getUserFeed() | Get personalized feed |
| getGroupMembers() | Get group members |
| getUserAchievementsWithDetails() | Get achievements with progress |

See [Helpers](ggzone-fe/src/assets/mock/helpers.ts) for all functions.

## 🎯 Common Tasks

### I want to...

**...add a new user**
1. Open `ggzone-fe/src/assets/mock/users.ts`
2. Add to `mockUsers` array
3. Follow existing pattern
4. Update `UserStats` if needed

**...create a new page**
1. Create file in `ggzone-fe/src/pages/`
2. Import mock data as needed
3. Use helper functions
4. Add route in `App.tsx`

**...test with different data**
1. Use test user IDs from [Demo Accounts](ggzone-fe/DEMO_ACCOUNTS.txt)
2. Import helper functions
3. See [Quick Start](ggzone-fe/MOCK_DATA_QUICK_START.md) for examples

**...understand the database**
1. Review [Database Schema](DB/SQLQuery1.sql)
2. Check [Mock Data Guide](MOCK_DATA_GUIDE.md)
3. See [API Reference](ggzone-fe/src/assets/mock/README.md)

**...integrate with backend**
1. Run [Database Schema](DB/SQLQuery1.sql)
2. Run [Sample Data](DB/SQLQuery2_SampleData.sql)
3. Match IDs with frontend mock data

## 📱 Component Examples

### Display User Profile
See: [Quick Start - User Profile](ggzone-fe/MOCK_DATA_QUICK_START.md#1-display-user-profile)

### Show Friends List
See: [Quick Start - Friends List](ggzone-fe/MOCK_DATA_QUICK_START.md#2-show-users-friends)

### Display Feed
See: [Quick Start - User Feed](ggzone-fe/MOCK_DATA_QUICK_START.md#3-display-user-feed)

### Show Games
See: [Quick Start - Games List](ggzone-fe/MOCK_DATA_QUICK_START.md#4-show-games-list)

### More Examples
See: [Mock Data Quick Start](ggzone-fe/MOCK_DATA_QUICK_START.md) for 10+ complete examples

## 🔍 Search Tips

**Looking for specific data?**
- User data → `users.ts`
- Game data → `games.ts`
- Social features → `posts.ts`, `friendships.ts`, `photos.ts`
- E-commerce → `marketplace.ts`, `storeProducts.ts`
- Gaming → `achievements.ts`, `tournaments.ts`
- Communication → `messages.ts`, `notifications.ts`

**Need help with implementation?**
- Check existing pages in `ggzone-fe/src/pages/`
- Review components in `ggzone-fe/src/components/`
- See examples in [Quick Start](ggzone-fe/MOCK_DATA_QUICK_START.md)

**Want to understand relationships?**
- See [Data Relationships](ggzone-fe/src/assets/mock/README.md#data-relationships)
- Review [Database Schema](DB/SQLQuery1.sql)
- Check [Mock Data Guide](MOCK_DATA_GUIDE.md)

## 📞 Support

**For questions about:**
- Setup → [Main README](README.md)
- Mock data → [Mock Data Guide](MOCK_DATA_GUIDE.md)
- Quick examples → [Quick Start](ggzone-fe/MOCK_DATA_QUICK_START.md)
- Database → [Schema](DB/SQLQuery1.sql)

## 🎓 Learning Path

### Beginner
1. Read [Main README](README.md)
2. Try [Demo Accounts](ggzone-fe/DEMO_ACCOUNTS.txt)
3. Follow [Quick Start](ggzone-fe/MOCK_DATA_QUICK_START.md)

### Intermediate
1. Review [Mock Data Guide](MOCK_DATA_GUIDE.md)
2. Study [Helper Functions](ggzone-fe/src/assets/mock/helpers.ts)
3. Explore existing pages

### Advanced
1. Review [Database Schema](DB/SQLQuery1.sql)
2. Study [API Reference](ggzone-fe/src/assets/mock/README.md)
3. Implement custom features

---

**Last Updated**: November 2024  
**Version**: 1.0.0  
**Status**: Complete

Need something not listed here? Check the [Main README](README.md) or browse the `ggzone-fe/src/assets/mock/` directory.
