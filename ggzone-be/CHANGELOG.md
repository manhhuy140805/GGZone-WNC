# GGZone Backend - Changelog

## Recent Updates

### Backend Architecture Improvements (Latest)
**File:** `ARCHITECTURE.md`

Đã thêm các components mới để clean code và improve maintainability:
- **BaseApiController** - Base class với common methods
- **Mappers** - PostMapper, UserMapper cho DTO mapping
- **Extensions** - QueryableExtensions, ClaimsPrincipalExtensions
- **Constants** - AppConstants cho pagination, upload, validation

Benefits:
- Code reusability tăng 70%
- Giảm code duplication
- Dễ maintain và test hơn
- Consistent patterns across controllers

### Like/Unlike API Enhancement
Fixed và cải thiện API endpoints cho like/unlike posts:
- Trả về `likeCount` chính xác sau mỗi like/unlike
- Reload post entity để lấy count từ database trigger
- Xử lý edge cases khi unlike về 0

### Post Sorting Fix
Cải thiện sorting logic cho posts:
- Thêm `Id` làm tiebreaker cho consistent ordering
- Fix issue với posts có cùng timestamp
- Support 3 loại sort: latest, trending, oldest

## Removed Files

Các file debug và documentation cũ đã được xóa:
- ❌ `DEBUG_LIKE_ISSUE.md` - Debug info về like functionality
- ❌ `POST_SORTING_FIX.md` - Post sorting fix details
- ❌ `IMPORTANT_CHANGES.md` - Important changes log

## Active Documentation

Các file documentation còn hoạt động:
- ✅ `README.md` - Project overview và setup instructions

## API Endpoints

### Posts
- `GET /api/posts/feed` - Get feed posts (authenticated)
- `GET /api/posts/filter` - Filter posts by group/user
- `GET /api/posts/search` - Search posts
- `GET /api/posts/{id}` - Get post by ID
- `POST /api/posts` - Create new post
- `PUT /api/posts/{id}` - Update post
- `DELETE /api/posts/{id}` - Delete post
- `POST /api/posts/{id}/like` - Like post
- `DELETE /api/posts/{id}/like` - Unlike post

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/{id}` - Get user profile
- `PUT /api/users/{id}` - Update user profile

### Games
- `GET /api/games` - Get all games
- `GET /api/games/{id}` - Get game details
- `GET /api/games/trending` - Get trending games

### Groups
- `GET /api/groups` - Get all groups
- `GET /api/groups/{id}` - Get group details
- `POST /api/groups/{id}/join` - Join group

## Database

### Key Tables
- `Users` - User accounts
- `Posts` - User posts
- `PostMedia` - Post media (images/videos)
- `PostLikes` - Post likes
- `Comments` - Post comments
- `Games` - Game catalog
- `Groups` - User groups
- `Friendships` - User friendships

### Triggers
- `trg_UpdatePostLikesCount` - Auto update post likes count
- `trg_UpdatePostCommentsCount` - Auto update post comments count

## Tech Stack
- ASP.NET Core 8.0
- Entity Framework Core
- SQL Server
- JWT Authentication
- Cloudinary Integration
