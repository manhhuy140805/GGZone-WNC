# 📚 GGZone API - Usage Examples

## 🔐 Authentication Flow

### 1. Register New User
```http
POST /api/auth/register
Content-Type: application/json

{
  "username": "gamer123",
  "email": "gamer@ggzone.com",
  "password": "SecurePass123!",
  "fullName": "John Gamer"
}
```

### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "gamer@ggzone.com",
  "password": "SecurePass123!"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "guid-here",
    "username": "gamer123",
    "email": "gamer@ggzone.com"
  }
}
```

### 3. Use Token in Requests
```http
GET /api/user/{userId}
Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
```

## 👥 Social Features

### Create Post
```http
POST /api/post
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "content": "Just finished an epic gaming session! 🎮",
  "visibility": "public"
}
```

### Like Post
```http
POST /api/post/{postId}/like
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid"
}
```

### Add Comment
```http
POST /api/post/{postId}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "content": "Awesome! What game were you playing?"
}
```

## 👫 Friend System

### Send Friend Request
```http
POST /api/friendship/send
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "your-user-guid",
  "friendId": "friend-user-guid"
}
```

### Accept Friend Request
```http
PUT /api/friendship/{friendshipId}/accept
Authorization: Bearer {token}
```

### Get Friends List
```http
GET /api/friendship/{userId}/friends
Authorization: Bearer {token}
```

### Get Friend Suggestions
```http
GET /api/friendship/{userId}/suggestions
Authorization: Bearer {token}
```

## 💬 Messaging

### Get Conversations
```http
GET /api/message/{userId}/conversations
Authorization: Bearer {token}
```

### Send Message
```http
POST /api/message
Authorization: Bearer {token}
Content-Type: application/json

{
  "senderId": "your-user-guid",
  "receiverId": "friend-user-guid",
  "content": "Hey! Want to play together?"
}
```

### Get Messages with User
```http
GET /api/message/{userId}/with/{otherUserId}?page=1&pageSize=50
Authorization: Bearer {token}
```

### Get Unread Count
```http
GET /api/message/{userId}/unread-count
Authorization: Bearer {token}
```

## 🔔 Notifications

### Get Notifications
```http
GET /api/notification/{userId}?isRead=false&page=1&pageSize=20
Authorization: Bearer {token}
```

### Mark as Read
```http
PUT /api/notification/{notificationId}/read
Authorization: Bearer {token}
```

### Mark All as Read
```http
PUT /api/notification/{userId}/read-all
Authorization: Bearer {token}
```

### Get Unread Count
```http
GET /api/notification/{userId}/unread-count
Authorization: Bearer {token}
```

## 🎮 Games & Tournaments

### Get Games List
```http
GET /api/game?genre=FPS&page=1&pageSize=20
```

### Get Game Details
```http
GET /api/game/{gameId}
```

### Create Tournament
```http
POST /api/tournament
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "Summer Championship 2024",
  "description": "Epic tournament for the best players",
  "gameId": "game-guid",
  "creatorId": "user-guid",
  "startDate": "2024-07-01T10:00:00Z",
  "endDate": "2024-07-15T18:00:00Z",
  "maxParticipants": 64,
  "prizePool": 10000,
  "status": "upcoming"
}
```

### Join Tournament
```http
POST /api/tournament/{tournamentId}/join
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid"
}
```

### Get Tournament Participants
```http
GET /api/tournament/{tournamentId}/participants
```

## 🎥 Videos

### Upload Video
```http
POST /api/video
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "title": "Epic Gameplay Highlights",
  "description": "My best moments from today's stream",
  "url": "https://video-url.com/video.mp4",
  "thumbnailUrl": "https://video-url.com/thumb.jpg",
  "gameId": "game-guid"
}
```

### Like Video
```http
POST /api/video/{videoId}/like
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid"
}
```

### Add Video Comment
```http
POST /api/video/{videoId}/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "content": "Amazing plays! 🔥"
}
```

## 🛒 Shopping & Marketplace

### Get Store Products
```http
GET /api/store/products?category=Gaming&page=1&pageSize=20
```

### Add to Cart
```http
POST /api/shoppingcart
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "productId": "product-guid",
  "quantity": 2
}
```

### Get Cart
```http
GET /api/shoppingcart/{userId}
Authorization: Bearer {token}
```

### Create Order
```http
POST /api/order
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "totalAmount": 99.99,
  "shippingAddress": "123 Gaming St, City, Country",
  "paymentMethod": "credit_card",
  "items": [
    {
      "productId": "product-guid-1",
      "quantity": 1,
      "price": 59.99
    },
    {
      "productId": "product-guid-2",
      "quantity": 2,
      "price": 19.99
    }
  ]
}
```

### Get User Orders
```http
GET /api/order/{userId}
Authorization: Bearer {token}
```

## 🔍 Search

### Search Everything
```http
GET /api/search?q=valorant&type=all&limit=10
```

### Search Specific Type
```http
GET /api/search?q=pro&type=users&limit=20
GET /api/search?q=fps&type=games&limit=10
GET /api/search?q=esports&type=groups&limit=15
```

## 📊 Statistics

### Dashboard Stats
```http
GET /api/statistics/dashboard
Authorization: Bearer {token}
```

### User Stats
```http
GET /api/statistics/user/{userId}
Authorization: Bearer {token}
```

### Game Stats
```http
GET /api/statistics/game/{gameId}
Authorization: Bearer {token}
```

### Daily Stats
```http
GET /api/statistics/daily?days=7
Authorization: Bearer {token}
```

## 📸 Photos

### Upload Photo
```http
POST /api/photo
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "url": "https://photo-url.com/image.jpg",
  "caption": "My gaming setup! 🎮"
}
```

### Get User Photos
```http
GET /api/photo/{userId}?page=1&pageSize=20
Authorization: Bearer {token}
```

## 🏆 Badges

### Get User Badges
```http
GET /api/badge/{userId}
Authorization: Bearer {token}
```

### Award Badge
```http
POST /api/badge
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "badgeName": "First Victory",
  "badgeDescription": "Won your first tournament",
  "badgeIconUrl": "https://badges.com/first-victory.png"
}
```

## 📈 Trending

### Get Trending Games
```http
GET /api/trending/games?limit=10
```

### Get Trending Players
```http
GET /api/trending/players?limit=10
```

### Get Trending Videos
```http
GET /api/trending/videos?limit=10
```

### Get Trending Posts
```http
GET /api/trending/posts?limit=10
```

## 🎯 Activity Feed

### Get User Activities
```http
GET /api/activity/{userId}?page=1&pageSize=20
Authorization: Bearer {token}
```

### Get Activity Feed (Friends)
```http
GET /api/activity/feed/{userId}?page=1&pageSize=20
Authorization: Bearer {token}
```

### Log Activity
```http
POST /api/activity/log
Authorization: Bearer {token}
Content-Type: application/json

{
  "userId": "user-guid",
  "activityType": "game_launch",
  "description": "Started playing Valorant",
  "ipAddress": "192.168.1.1"
}
```

## 💡 Tips

### Pagination
Hầu hết endpoints hỗ trợ pagination:
```
?page=1&pageSize=20
```

### Filtering
Nhiều endpoints hỗ trợ filters:
```
?status=active&category=FPS&search=valorant
```

### Error Handling
Luôn check status code:
- 200: Success
- 201: Created
- 204: No Content (Success, no data)
- 400: Bad Request
- 401: Unauthorized
- 404: Not Found
- 500: Server Error

### Rate Limiting
Recommend: Implement rate limiting on client side
- Max 100 requests per minute per user
- Use caching for frequently accessed data

## 🚀 Best Practices

1. **Always use HTTPS** in production
2. **Store tokens securely** (HttpOnly cookies or secure storage)
3. **Implement token refresh** before expiration
4. **Handle errors gracefully** with user-friendly messages
5. **Use pagination** for large datasets
6. **Cache static data** (games, categories, etc.)
7. **Implement retry logic** for failed requests
8. **Log important actions** for debugging

## 📱 Frontend Integration Example

```typescript
// API Service
const API_BASE_URL = 'https://localhost:7xxx/api';

const apiClient = {
  async get(endpoint: string, token?: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    });
    return response.json();
  },
  
  async post(endpoint: string, data: any, token?: string) {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return response.json();
  }
};

// Usage
const posts = await apiClient.get('/post', userToken);
const newPost = await apiClient.post('/post', postData, userToken);
```

## ✅ Ready for Production!

All APIs tested and ready for:
- React/Vue/Angular frontend
- Mobile apps (iOS/Android)
- Third-party integrations
- Microservices architecture
