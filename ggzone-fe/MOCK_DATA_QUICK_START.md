# Mock Data Quick Start Guide

## Installation

No installation needed! Mock data is already included in the project.

## Basic Usage

### Import Mock Data

```typescript
// Import specific data
import { mockUsers, mockGames, mockPosts } from '@/assets/mock';

// Import helper functions
import { getUserById, getUserFriends, getUserFeed } from '@/assets/mock';
```

## Common Use Cases

### 1. Display User Profile

```typescript
import { getUserById } from '@/assets/mock';

function UserProfile({ userId }: { userId: string }) {
  const user = getUserById(userId);
  
  if (!user) return <div>User not found</div>;
  
  return (
    <div>
      <img src={user.avatarUrl} alt={user.fullName} />
      <h1>{user.fullName}</h1>
      <p>@{user.username}</p>
      <p>{user.bio}</p>
      <div>
        <span>Friends: {user.stats?.friendsCount}</span>
        <span>Posts: {user.stats?.postsCount}</span>
      </div>
    </div>
  );
}
```

### 2. Show User's Friends

```typescript
import { getUserFriends } from '@/assets/mock';

function FriendsList({ userId }: { userId: string }) {
  const friends = getUserFriends(userId);
  
  return (
    <div>
      <h2>Friends ({friends.length})</h2>
      {friends.map(friend => (
        <div key={friend?.id}>
          <img src={friend?.avatarUrl} alt={friend?.fullName} />
          <span>{friend?.fullName}</span>
          <span className={friend?.status}>{friend?.status}</span>
        </div>
      ))}
    </div>
  );
}
```

### 3. Display User Feed

```typescript
import { getUserFeed, getUserById } from '@/assets/mock';

function Feed({ userId }: { userId: string }) {
  const posts = getUserFeed(userId);
  
  return (
    <div>
      {posts.map(post => {
        const author = getUserById(post.userId);
        return (
          <div key={post.id}>
            <div>
              <img src={author?.avatarUrl} alt={author?.fullName} />
              <span>{author?.fullName}</span>
            </div>
            <p>{post.content}</p>
            <div>
              <span>❤️ {post.likesCount}</span>
              <span>💬 {post.commentsCount}</span>
              <span>🔄 {post.sharesCount}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

### 4. Show Games List

```typescript
import { mockGames } from '@/assets/mock';

function GamesList() {
  return (
    <div className="games-grid">
      {mockGames.map(game => (
        <div key={game.id} className="game-card">
          <img src={game.coverImageUrl} alt={game.name} />
          <h3>{game.name}</h3>
          <p>{game.genre} • {game.platform}</p>
          <p>{game.description}</p>
        </div>
      ))}
    </div>
  );
}
```

### 5. Display Groups

```typescript
import { getUserGroups, getGroupMembers } from '@/assets/mock';

function MyGroups({ userId }: { userId: string }) {
  const groups = getUserGroups(userId);
  
  return (
    <div>
      <h2>My Groups</h2>
      {groups.map(group => {
        if (!group) return null;
        const members = getGroupMembers(group.id);
        
        return (
          <div key={group.id}>
            <img src={group.coverImageUrl} alt={group.name} />
            <h3>{group.name}</h3>
            <p>{group.description}</p>
            <span>{members.length} members</span>
          </div>
        );
      })}
    </div>
  );
}
```

### 6. Show Notifications

```typescript
import { mockNotifications, getUnreadNotificationsCount } from '@/assets/mock';

function Notifications({ userId }: { userId: string }) {
  const notifications = mockNotifications.filter(n => n.userId === userId);
  const unreadCount = getUnreadNotificationsCount(userId);
  
  return (
    <div>
      <h2>Notifications {unreadCount > 0 && `(${unreadCount})`}</h2>
      {notifications.map(notification => (
        <div 
          key={notification.id}
          className={notification.isRead ? 'read' : 'unread'}
        >
          <h4>{notification.title}</h4>
          <p>{notification.content}</p>
          <span>{new Date(notification.createdAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
}
```

### 7. Display Marketplace

```typescript
import { mockMarketplaceItems } from '@/assets/mock';

function Marketplace() {
  return (
    <div className="marketplace-grid">
      {mockMarketplaceItems.map(item => (
        <div key={item.id} className="marketplace-card">
          <img src={item.coverImageUrl} alt={item.title} />
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <div>
            <span className="price">
              {item.price.toLocaleString('vi-VN')} VND
            </span>
            <span className="rating">⭐ {item.rating}</span>
          </div>
          <span className="category">{item.category}</span>
        </div>
      ))}
    </div>
  );
}
```

### 8. Show Tournaments

```typescript
import { mockTournaments } from '@/assets/mock';

function Tournaments() {
  const upcomingTournaments = mockTournaments.filter(
    t => t.status === 'upcoming'
  );
  
  return (
    <div>
      <h2>Upcoming Tournaments</h2>
      {upcomingTournaments.map(tournament => (
        <div key={tournament.id}>
          <img src={tournament.coverImageUrl} alt={tournament.name} />
          <h3>{tournament.name}</h3>
          <p>{tournament.description}</p>
          <div>
            <span>
              {tournament.currentParticipants}/{tournament.maxParticipants} players
            </span>
            <span>
              Prize: {tournament.prizePool.toLocaleString('vi-VN')} VND
            </span>
          </div>
          <div>
            <span>Start: {new Date(tournament.startDate).toLocaleDateString()}</span>
            <span>End: {new Date(tournament.endDate).toLocaleDateString()}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
```

### 9. Display Achievements

```typescript
import { getUserAchievementsWithDetails } from '@/assets/mock';

function Achievements({ userId }: { userId: string }) {
  const achievements = getUserAchievementsWithDetails(userId);
  
  return (
    <div>
      <h2>Achievements</h2>
      <div className="achievements-grid">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={achievement.completed ? 'completed' : 'in-progress'}
          >
            <span className="icon">{achievement.iconUrl}</span>
            <h4>{achievement.name}</h4>
            <p>{achievement.description}</p>
            <div className="progress">
              <div 
                className="progress-bar"
                style={{ 
                  width: `${(achievement.progress / achievement.maxProgress) * 100}%` 
                }}
              />
              <span>{achievement.progress}/{achievement.maxProgress}</span>
            </div>
            <span className={`badge ${achievement.badgeType}`}>
              {achievement.badgeType}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
```

### 10. Show Live Streams

```typescript
import { mockLiveChannels } from '@/assets/mock';

function LiveStreams() {
  const liveChannels = mockLiveChannels.filter(c => c.status === 'live');
  
  return (
    <div>
      <h2>Live Now 🔴</h2>
      <div className="streams-grid">
        {liveChannels.map(channel => (
          <div key={channel.id} className="stream-card">
            <img src={channel.thumbnailUrl} alt={channel.title} />
            <div className="live-badge">LIVE</div>
            <div className="viewers">{channel.viewersCount} viewers</div>
            <h3>{channel.title}</h3>
            <p>{channel.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
```

## Available Helper Functions

```typescript
// User helpers
getUserById(userId: string)
getUserFriends(userId: string)
getPendingFriendRequests(userId: string)
getUserPosts(userId: string)
getUserGroups(userId: string)
getUserAchievementsWithDetails(userId: string)
getUserTournaments(userId: string)
getUserStatsSummary(userId: string)
searchUsers(query: string)
getOnlineUsers()
areFriends(userId1: string, userId2: string)

// Group helpers
getGroupPosts(groupId: string)
getGroupMembers(groupId: string)

// Feed helpers
getUserFeed(userId: string)

// Notification helpers
getUnreadNotificationsCount(userId: string)
getUnreadMessagesCount(userId: string)

// Message helpers
getConversationsForUser(userId: string) // from messages.ts
```

## Test User IDs

Use these IDs for testing:

```typescript
const TEST_USERS = {
  alice: '550e8400-e29b-41d4-a716-446655440000',
  bob: '550e8400-e29b-41d4-a716-446655440001',
  charlie: '550e8400-e29b-41d4-a716-446655440002',
  david: '550e8400-e29b-41d4-a716-446655440003',
  emma: '550e8400-e29b-41d4-a716-446655440004',
  frank: '550e8400-e29b-41d4-a716-446655440005',
};
```

## Tips

1. **Type Safety**: All mock data is fully typed with TypeScript interfaces
2. **Relationships**: Data maintains referential integrity between entities
3. **Realistic Data**: Use Vietnamese locations and VND currency for authenticity
4. **Helper Functions**: Use helper functions instead of filtering manually
5. **Performance**: Mock data is in-memory, so it's very fast

## Next Steps

- Check `ggzone-fe/src/assets/mock/README.md` for detailed documentation
- See `MOCK_DATA_GUIDE.md` for comprehensive guide
- Review `DB/SQLQuery1.sql` for database schema
- Look at existing components for more examples
