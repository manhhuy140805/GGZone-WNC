# GGZone Backend - Architecture

## Project Structure

```
ggzone-be/
├── Controllers/          # API Controllers
│   ├── BaseApiController.cs    # Base controller với common methods
│   ├── PostController.cs
│   ├── UserController.cs
│   └── ...
├── Models/              # Entity models
├── Data/                # Database context
├── Services/            # Business logic services
├── Repositories/        # Data access layer (typo: currently "Repositorys")
├── Mappers/            # DTO mapping logic (NEW)
├── Extensions/         # Extension methods (NEW)
├── Constants/          # Application constants (NEW)
├── Dtos/               # Data Transfer Objects
├── Helpers/            # Helper classes
├── Middleware/         # Custom middleware
└── Interfaces/         # Service interfaces
```

## New Components

### 1. BaseApiController
Base class cho tất cả controllers với common functionality:
- `GetCurrentUserId()` - Lấy user ID từ JWT
- `GetCurrentUsername()` - Lấy username từ JWT
- `GetCurrentUserEmail()` - Lấy email từ JWT
- `IsAuthenticated()` - Check authentication status
- `GetCurrentUserRole()` - Lấy role từ JWT

**Usage:**
```csharp
public class PostController : BaseApiController
{
    [HttpGet("my-posts")]
    [Authorize]
    public async Task<IActionResult> GetMyPosts()
    {
        var userId = GetCurrentUserId();
        // ...
    }
}
```

### 2. Mappers
Centralized mapping logic cho DTOs:

#### PostMapper
- `ToDto(Post, userId?, isLiked)` - Map Post entity to DTO
- `ToDtoList(IEnumerable<Post>, userId?, isLikedFunc)` - Map list of posts

#### UserMapper
- `ToDto(User, includeStats)` - Map User entity to DTO
- `ToPublicDto(User)` - Map User to public DTO (limited info)
- `ToDtoList(IEnumerable<User>, includeStats)` - Map list of users

**Usage:**
```csharp
var postDto = PostMapper.ToDto(post, currentUserId, isLiked);
var userDto = UserMapper.ToDto(user, includeStats: true);
```

### 3. Extensions

#### QueryableExtensions
- `Paginate<T>(page, pageSize)` - Apply pagination
- `ToPaginatedResultAsync<T>(page, pageSize)` - Get paginated result with metadata

**Usage:**
```csharp
var result = await query
    .Where(p => p.IsActive)
    .OrderByDescending(p => p.CreatedAt)
    .ToPaginatedResultAsync(page, pageSize);
```

#### ClaimsPrincipalExtensions
- `GetUserId()` - Get user ID from claims
- `GetUsername()` - Get username from claims
- `GetEmail()` - Get email from claims
- `GetRole()` - Get role from claims
- `IsAdmin()` - Check if user is admin

**Usage:**
```csharp
var userId = User.GetUserId();
var isAdmin = User.IsAdmin();
```

### 4. Constants
Centralized constants để tránh magic numbers:

#### AppConstants.Pagination
- `DefaultPageSize = 10`
- `MaxPageSize = 100`
- `MinPageSize = 1`

#### AppConstants.Upload
- `MaxImageSizeMB = 10`
- `MaxVideoSizeMB = 100`
- `AllowedImageExtensions`
- `AllowedVideoExtensions`

#### AppConstants.Validation
- `MinUsernameLength = 3`
- `MaxUsernameLength = 50`
- `MinPasswordLength = 6`
- `MaxPostContentLength = 5000`

#### AppConstants.Messages
- Common error/success messages

**Usage:**
```csharp
if (pageSize > AppConstants.Pagination.MaxPageSize)
    pageSize = AppConstants.Pagination.MaxPageSize;

if (username.Length < AppConstants.Validation.MinUsernameLength)
    return BadRequest("Username too short");
```

## Benefits

### 1. Code Reusability
- Common logic trong BaseApiController
- Mapping logic tập trung trong Mappers
- Extension methods có thể dùng ở mọi nơi

### 2. Maintainability
- Dễ tìm và sửa bugs
- Consistent code style
- Clear separation of concerns

### 3. Testability
- Dễ mock và test
- Isolated logic
- Clear dependencies

### 4. Scalability
- Dễ thêm features mới
- Reusable components
- Consistent patterns

## Migration Guide

### Before (Old Code)
```csharp
public class PostController : ControllerBase
{
    private object MapPostToDto(Post p, Guid? currentUserId = null)
    {
        // Mapping logic here...
    }

    [HttpGet("feed")]
    [Authorize]
    public async Task<IActionResult> GetFeed()
    {
        var userId = User.FindFirst("id")?.Value;
        if (string.IsNullOrEmpty(userId))
            return Unauthorized();
        
        var posts = await _context.Posts
            .Skip((page - 1) * pageSize)
            .Take(pageSize)
            .ToListAsync();
        
        var postsDto = posts.Select(p => MapPostToDto(p, Guid.Parse(userId)));
        // ...
    }
}
```

### After (New Code)
```csharp
public class PostController : BaseApiController
{
    [HttpGet("feed")]
    [Authorize]
    public async Task<IActionResult> GetFeed(int page = 1, int pageSize = 10)
    {
        var userId = GetCurrentUserId();
        if (!userId.HasValue)
            return Unauthorized();
        
        var result = await _context.Posts
            .Include(p => p.User)
            .Include(p => p.Media)
            .ToPaginatedResultAsync(page, pageSize);
        
        var postsDto = PostMapper.ToDtoList(result.Items, userId);
        
        return Ok(new
        {
            success = true,
            data = new
            {
                posts = postsDto,
                total = result.Total,
                page = result.Page,
                pageSize = result.PageSize,
                totalPages = result.TotalPages
            }
        });
    }
}
```

## Next Steps

1. ✅ Create base classes and helpers
2. ⏳ Refactor PostController to use new structure
3. ⏳ Refactor UserController to use new structure
4. ⏳ Refactor other controllers
5. ⏳ Rename "Repositorys" to "Repositories"
6. ⏳ Add unit tests
7. ⏳ Add API documentation (Swagger)
8. ⏳ Add logging
9. ⏳ Add caching
10. ⏳ Performance optimization
