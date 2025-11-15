# Mock Data API Documentation

Based on your GameCO database schema, I've created comprehensive mock data files that can be used as sample API responses. These files follow the database structure exactly.

## 📁 Mock Data Files Created

### 1. **Users** (`src/assets/mock/users.ts`)

- **Interface**: `User`, `UserStats`
- **Data**: 6 mock users with realistic profiles
- **Fields**: id, username, email, fullName, avatarUrl, bio, location, status, role, isVerified, createdAt, stats
- **Sample**: alice, bob, charlie, david, emma, frank

### 2. **Games** (`src/assets/mock/games.ts`)

- **Interface**: `Game`
- **Data**: 6 popular games (Valorant, League of Legends, CS2, DOTA 2, Overwatch 2, Minecraft)
- **Fields**: id, name, slug, description, coverImageUrl, iconUrl, genre, platform, releaseDate, publisher, isActive
- **Use Case**: Display games in Browse, Trending, and Game detail pages

### 3. **Groups** (`src/assets/mock/groups.ts`)

- **Interface**: `Group`
- **Data**: 5 gaming communities
- **Fields**: id, name, description, coverImageUrl, iconUrl, visibility (public/private), membersCount, createdBy, timestamps
- **Examples**: "Gamers VN", "FPS Lovers", "Competitive Esports", "MOBA Players Unite"

### 4. **Achievements** (`src/assets/mock/achievements.ts`)

- **Interfaces**: `Achievement`, `UserAchievement`
- **Data**: 8 achievements with 4 user achievement progress records
- **Fields**: id, name, description, iconUrl, gameId, badgeType (bronze/silver/gold), points, maxProgress
- **Use Case**: Achievement badges and progress tracking

### 5. **Marketplace** (`src/assets/mock/marketplace.ts`)

- **Interfaces**: `MarketplaceItem`, `MarketplaceReview`
- **Data**: 5 gaming gear items with 4 customer reviews
- **Fields**:
  - Items: id, sellerId, title, description, coverImageUrl, category, price, rating, reviewsCount, status
  - Reviews: id, itemId, userId, rating, comment, createdAt
- **Categories**: gear, equipment
- **Example Items**: Gaming Mouse, Mechanical Keyboard, Gaming Headset, Monitor, PC Case

### 6. **Posts** (`src/assets/mock/posts.ts`)

- **Interfaces**: `Post`, `PostMedia`, `Comment`
- **Data**: 5 posts with media and 3 comments
- **Fields**:
  - Posts: id, userId, groupId, content, postType (text/video/image/gallery), videoUrl, likes, comments, shares, isPinned
  - Media: id, postId, mediaUrl, mediaType, orderIndex
  - Comments: id, postId, userId, parentCommentId, content, likesCount, timestamps
- **Use Case**: Social feed and community discussions

### 7. **Tournaments** (`src/assets/mock/tournaments.ts`)

- **Interfaces**: `Tournament`, `TournamentParticipant`, `LiveChannel`
- **Data**:
  - 4 tournaments (Vietnam Valorant Cup, LoL Finals, CS2 Weekly, etc.)
  - 4 tournament participants
  - 4 live streaming channels
- **Fields**:
  - Tournaments: id, gameId, name, description, coverImageUrl, startDate, endDate, maxParticipants, currentParticipants, prizePool, status
  - Participants: id, tournamentId, userId, rank, score, joinedAt
  - Channels: id, userId, gameId, title, description, thumbnailUrl, streamUrl, viewersCount, status
- **Statuses**: upcoming, ongoing, completed (tournaments); live, offline, scheduled (channels)

## 🔗 How to Use Mock Data in Components

### Example 1: Display Games List

```typescript
import { mockGames } from "../assets/mock";

export const BrowsePage = () => {
  return (
    <div className="space-y-6">
      {mockGames.map((game) => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
};
```

### Example 2: Display User Profile

```typescript
import { mockUsers, mockUserAchievements } from "../assets/mock";

export const ProfilePage = ({ userId }: { userId: string }) => {
  const user = mockUsers.find((u) => u.id === userId);
  const achievements = mockUserAchievements.filter((a) => a.userId === userId);

  return (
    <div>
      <h1>{user?.fullName}</h1>
      {/* render achievements */}
    </div>
  );
};
```

### Example 3: Feed with Comments

```typescript
import { mockPosts, mockComments } from "../assets/mock";

export const FeedPage = () => {
  return mockPosts.map((post) => {
    const postComments = mockComments.filter((c) => c.postId === post.id);
    return <PostCard key={post.id} post={post} comments={postComments} />;
  });
};
```

## 📊 Data Structure Overview

```
Users (6)
├── UserStats (each user has stats)
└── User Achievements (tracked via UserAchievement)

Games (6)
├── Referenced in Tournaments
├── Referenced in Achievements
└── Referenced in Live Channels

Groups (5)
└── Contains posts and members

Posts (5)
├── PostMedia (gallery/images)
└── Comments (3 total)

Tournaments (4)
├── Participants (4)
└── Prize pool & dates

Live Channels (4)
└── Real-time streaming info

Marketplace Items (5)
└── Reviews (4)

Achievements (8)
└── User Progress (4 records)
```

## 🔄 Integration with Backend API

When your backend is ready, you can replace mock data imports with actual API calls:

```typescript
// Before (using mock)
import { mockUsers } from "../assets/mock";
const users = mockUsers;

// After (using API)
import { useUsers } from "../hooks/useApi";
const { users, loading, error } = useUsers();
```

## 📝 Mock Data Statistics

| Entity            | Count | Relationships                            |
| ----------------- | ----- | ---------------------------------------- |
| Users             | 6     | Stats, Achievements, Posts               |
| Games             | 6     | Tournaments, Achievements, Live Channels |
| Groups            | 5     | Posts, Members                           |
| Posts             | 5     | Comments, Media                          |
| Tournaments       | 4     | Participants, Prize Pool                 |
| Achievements      | 8     | User Progress Tracking                   |
| Marketplace Items | 5     | Reviews, Seller                          |
| Live Channels     | 4     | Streamer, Game, Viewers                  |

## ✨ Next Steps

1. **Add more test data**: Feel free to add more users, games, posts as needed
2. **Connect to API**: Replace mock data with real backend endpoints
3. **Add data generators**: Use libraries like Faker.js to generate random realistic data
4. **Database seeding**: Use these mock files as reference for database seeding scripts
5. **Type safety**: All interfaces are TypeScript-typed for full IDE support

All mock data files are properly typed and ready to use in your React components!
