# Backend Quick Reference Guide

## Common Patterns

### 1. Controller Setup
```csharp
using ggzone_be.Controllers;
using ggzone_be.Data;
using ggzone_be.Mappers;
using ggzone_be.Extensions;
using ggzone_be.Constants;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class MyController : BaseApiController
{
    private readonly AppDbContext _context;

    public MyController(AppDbContext context)
    {
        _context = context;
    }
}
```

### 2. Get Current User
```csharp
[HttpGet("my-data")]
[Authorize]
public async Task<IActionResult> GetMyData()
{
    var userId = GetCurrentUserId();
    if (!userId.HasValue)
        return Unauthorized(ApiResponse.ErrorResponse(AppConstants.Messages.Unauthorized));
    
    // Use userId...
}
```

### 3. Pagination
```csharp
[HttpGet]
public async Task<IActionResult> GetItems(
    int page = 1,
    int pageSize = AppConstants.Pagination.DefaultPageSize)
{
    // Validate
    if (pageSize > AppConstants.Pagination.MaxPageSize)
        pageSize = AppConstants.Pagination.MaxPageSize;

    // Query with pagination
    var result = await _context.Items
        .Where(i => i.IsActive)
        .OrderByDescending(i => i.CreatedAt)
        .ToPaginatedResultAsync(page, pageSize);

    return Ok(new
    {
        success = true,
        data = new
        {
            items = result.Items,
            total = result.Total,
            page = result.Page,
            pageSize = result.PageSize,
            totalPages = result.TotalPages
        }
    });
}
```

### 4. Using Mappers
```csharp
// Single post
var postDto = PostMapper.ToDto(post, currentUserId, isLiked);

// List of posts
var postsDto = PostMapper.ToDtoList(posts, currentUserId, isLikedFunc);

// User with stats
var userDto = UserMapper.ToDto(user, includeStats: true);

// Public user info
var publicUserDto = UserMapper.ToPublicDto(user);
```

### 5. Claims Extensions
```csharp
// In any method with User (ClaimsPrincipal)
var userId = User.GetUserId();
var username = User.GetUsername();
var email = User.GetEmail();
var role = User.GetRole();
var isAdmin = User.IsAdmin();
```

### 6. Error Handling
```csharp
try
{
    // Your code
    return Ok(ApiResponse<object>.SuccessResponse(data, "Success message"));
}
catch (Exception ex)
{
    return BadRequest(ApiResponse.ErrorResponse(ex.Message));
}
```

### 7. Validation
```csharp
// Using constants
if (content.Length > AppConstants.Validation.MaxPostContentLength)
    return BadRequest(ApiResponse.ErrorResponse("Content too long"));

if (username.Length < AppConstants.Validation.MinUsernameLength)
    return BadRequest(ApiResponse.ErrorResponse("Username too short"));
```

### 8. Include Related Data
```csharp
var posts = await _context.Posts
    .Include(p => p.User)
    .Include(p => p.Media)
    .Include(p => p.Comments)
        .ThenInclude(c => c.User)
    .ToListAsync();
```

### 9. Check Existence
```csharp
var exists = await _context.Posts.AnyAsync(p => p.Id == id);
if (!exists)
    return NotFound(ApiResponse.ErrorResponse("Post not found"));
```

### 10. Sorting
```csharp
var query = _context.Posts.AsQueryable();

query = sortBy?.ToLower() switch
{
    "trending" => query.OrderByDescending(p => p.LikesCount)
                      .ThenByDescending(p => p.CreatedAt)
                      .ThenByDescending(p => p.Id),
    "oldest" => query.OrderBy(p => p.CreatedAt)
                    .ThenBy(p => p.Id),
    _ => query.OrderByDescending(p => p.CreatedAt)
              .ThenByDescending(p => p.Id)
};
```

## Constants Reference

### Pagination
```csharp
AppConstants.Pagination.DefaultPageSize    // 10
AppConstants.Pagination.MaxPageSize        // 100
AppConstants.Pagination.MinPageSize        // 1
```

### Upload
```csharp
AppConstants.Upload.MaxImageSizeMB         // 10
AppConstants.Upload.MaxVideoSizeMB         // 100
AppConstants.Upload.MaxImageSizeBytes      // 10 * 1024 * 1024
AppConstants.Upload.MaxVideoSizeBytes      // 100 * 1024 * 1024
AppConstants.Upload.AllowedImageExtensions // [".jpg", ".jpeg", ".png", ".gif", ".webp"]
AppConstants.Upload.AllowedVideoExtensions // [".mp4", ".mov", ".avi", ".mkv", ".webm"]
```

### Validation
```csharp
AppConstants.Validation.MinUsernameLength      // 3
AppConstants.Validation.MaxUsernameLength      // 50
AppConstants.Validation.MinPasswordLength      // 6
AppConstants.Validation.MaxPasswordLength      // 100
AppConstants.Validation.MaxBioLength           // 500
AppConstants.Validation.MaxPostContentLength   // 5000
AppConstants.Validation.MaxCommentLength       // 1000
```

### Messages
```csharp
AppConstants.Messages.Unauthorized     // "Unauthorized access"
AppConstants.Messages.NotFound         // "Resource not found"
AppConstants.Messages.BadRequest       // "Invalid request"
AppConstants.Messages.InternalError    // "Internal server error"
AppConstants.Messages.Success          // "Operation completed successfully"
```

## Response Format

### Success Response
```csharp
return Ok(new
{
    success = true,
    data = yourData,
    message = "Optional success message"
});
```

### Error Response
```csharp
return BadRequest(ApiResponse.ErrorResponse("Error message"));
// or
return NotFound(ApiResponse.ErrorResponse("Not found message"));
// or
return Unauthorized(ApiResponse.ErrorResponse("Unauthorized message"));
```

## Common Queries

### Get with Filter
```csharp
var items = await _context.Items
    .Where(i => i.UserId == userId && i.IsActive)
    .ToListAsync();
```

### Get Single or Default
```csharp
var item = await _context.Items
    .FirstOrDefaultAsync(i => i.Id == id);

if (item == null)
    return NotFound();
```

### Count
```csharp
var count = await _context.Items
    .Where(i => i.IsActive)
    .CountAsync();
```

### Any (Check Existence)
```csharp
var exists = await _context.Items
    .AnyAsync(i => i.Id == id);
```

### Update
```csharp
var item = await _context.Items.FindAsync(id);
if (item == null)
    return NotFound();

item.Name = dto.Name;
item.UpdatedAt = DateTime.Now;

_context.Items.Update(item);
await _context.SaveChangesAsync();
```

### Delete
```csharp
var item = await _context.Items.FindAsync(id);
if (item == null)
    return NotFound();

_context.Items.Remove(item);
await _context.SaveChangesAsync();
```

## Tips

1. **Always validate user input**
2. **Use constants instead of magic numbers**
3. **Use mappers for DTO conversion**
4. **Use extension methods for common operations**
5. **Always include related data when needed**
6. **Use async/await for database operations**
7. **Handle exceptions properly**
8. **Return consistent response format**
9. **Use BaseApiController for common functionality**
10. **Follow the established patterns**
