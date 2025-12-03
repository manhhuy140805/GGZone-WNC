using ggzone_be.Data;
using ggzone_be.Dtos.Post;
using ggzone_be.Helpers;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ggzone_be.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : BaseApiController
    {
        private readonly AppDbContext _context;
        private readonly ILogger<PostController> _logger;

        public PostController(AppDbContext context, ILogger<PostController> logger)
        {
            _context = context;
            _logger = logger;
        }

        private object MapPostToDto(Post? p, Guid? currentUserId = null)
        {
            if (p == null)
                throw new ArgumentNullException(nameof(p));

            bool isLiked = false;
            if (currentUserId.HasValue)
            {
                isLiked = _context.PostLikes.Any(pl => pl.PostId == p.Id && pl.UserId == currentUserId.Value);
            }

            return new
            {
                id = p.Id,
                content = p.Content,
                createdAt = p.CreatedAt,
                likesCount = p.LikesCount,
                commentsCount = p.CommentsCount,
                author = new
                {
                    id = p.User!.Id,
                    username = p.User.Username,
                    avatarUrl = p.User.AvatarUrl
                },
                media = p.Media.OrderBy(m => m.OrderIndex).Select(m => new
                {
                    id = m.Id,
                    mediaUrl = m.MediaUrl,
                    mediaType = m.MediaType
                }).ToList(),
                groupId = p.GroupId,
                isLiked = isLiked
            };
        }

        // GET: api/posts/debug-user - Debug current user
        [HttpGet("debug-user")]
        [Authorize]
        public IActionResult DebugUser()
        {
            var userId = User.FindFirst("id")?.Value;
            var username = User.FindFirst("username")?.Value;
            var email = User.FindFirst("email")?.Value;
            
            return Ok(new
            {
                userId,
                username,
                email,
                claims = User.Claims.Select(c => new { c.Type, c.Value }).ToList()
            });
        }

        // GET: api/posts/feed - Lấy feed posts (có phân trang)
        [HttpGet("feed")]
        [Authorize]
        public async Task<IActionResult> GetFeed(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? sortBy = "latest",
            [FromQuery] string? groupId = null)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var query = _context.Posts.AsQueryable();

                // Filter by group
                if (!string.IsNullOrWhiteSpace(groupId) && Guid.TryParse(groupId, out var groupParsed))
                {
                    query = query.Where(p => p.GroupId == groupParsed);
                }

                // Sort - Always use Id as tiebreaker for consistent ordering
                query = sortBy?.ToLower() switch
                {
                    "trending" => query.OrderByDescending(p => p.LikesCount)
                                      .ThenByDescending(p => p.CreatedAt)
                                      .ThenByDescending(p => p.Id),
                    "oldest" => query.OrderBy(p => p.CreatedAt)
                                    .ThenBy(p => p.Id),
                    _ => query.OrderByDescending(p => p.CreatedAt)
                              .ThenByDescending(p => p.Id) // latest - newest first
                };

                var total = await query.CountAsync();
                var posts = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Include(p => p.User)
                    .Include(p => p.Media)
                    .ToListAsync();

                var currentUserId = Guid.Parse(userId);
                var postsDto = posts.Select(p => MapPostToDto(p, currentUserId)).ToList();

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        posts = postsDto,
                        total,
                        page,
                        pageSize,
                        totalPages = (int)Math.Ceiling((double)total / pageSize)
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // GET: api/posts/filter - Lọc posts theo group, user
        [HttpGet("filter")]
        public async Task<IActionResult> FilterPosts(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10,
            [FromQuery] string? groupId = null,
            [FromQuery] string? userId = null,
            [FromQuery] string? sortBy = "latest")
        {
            try
            {
                var query = _context.Posts.AsQueryable();

                // Filter by group
                if (!string.IsNullOrWhiteSpace(groupId) && Guid.TryParse(groupId, out var groupParsed))
                {
                    query = query.Where(p => p.GroupId == groupParsed);
                }

                // Filter by user
                if (!string.IsNullOrWhiteSpace(userId) && Guid.TryParse(userId, out var userParsed))
                {
                    query = query.Where(p => p.UserId == userParsed);
                }

                // Sort
                query = sortBy?.ToLower() switch
                {
                    "trending" => query.OrderByDescending(p => p.LikesCount).ThenByDescending(p => p.CreatedAt),
                    "oldest" => query.OrderBy(p => p.CreatedAt),
                    _ => query.OrderByDescending(p => p.CreatedAt) // latest
                };

                var total = await query.CountAsync();
                var posts = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Include(p => p.User)
                    .Include(p => p.Media)
                    .ToListAsync();

                var postsDto = posts.Select(p => MapPostToDto(p)).ToList();

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        posts = postsDto,
                        total,
                        page,
                        pageSize,
                        totalPages = (int)Math.Ceiling((double)total / pageSize)
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // GET: api/posts/search - Tìm kiếm posts
        [HttpGet("search")]
        public async Task<IActionResult> SearchPosts(
            [FromQuery] string q,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 10)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(q))
                    return BadRequest(ApiResponse.ErrorResponse("Search query is required"));

                var query = _context.Posts
                    .Where(p => p.Content.Contains(q))
                    .OrderByDescending(p => p.CreatedAt);

                var total = await query.CountAsync();
                var posts = await query
                    .Skip((page - 1) * pageSize)
                    .Take(pageSize)
                    .Include(p => p.User)
                    .Include(p => p.Media)
                    .ToListAsync();

                var postsDto = posts.Select(p => MapPostToDto(p)).ToList();

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        posts = postsDto,
                        total,
                        page,
                        pageSize,
                        totalPages = (int)Math.Ceiling((double)total / pageSize)
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // GET: api/posts/{id} - Lấy post theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(Guid id)
        {
            try
            {
                var post = await _context.Posts
                    .Include(p => p.User)
                    .FirstOrDefaultAsync(p => p.Id == id);

                if (post == null)
                    return NotFound(ApiResponse.ErrorResponse("Post not found"));

                return Ok(ApiResponse<Post>.SuccessResponse(post));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // POST: api/posts - Tạo post mới
        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var utcNow = DateTime.Now;
                _logger.LogDebug("Creating post at UTC: {Time}", utcNow);
                
                var post = new Post
                {
                    Id = Guid.NewGuid(),
                    Content = dto.Content,
                    UserId = Guid.Parse(userId),
                    GroupId = dto.GroupId,
                    CreatedAt = utcNow,
                    LikesCount = 0,
                    CommentsCount = 0
                };

                _context.Posts.Add(post);
                await _context.SaveChangesAsync();
                
                _logger.LogDebug("Post saved with CreatedAt: {Time}", post.CreatedAt);

                // Add media if provided
                if (dto.MediaUrls != null && dto.MediaUrls.Count > 0)
                {
                    var mediaList = new List<PostMedia>();
                    for (int i = 0; i < dto.MediaUrls.Count; i++)
                    {
                        var media = new PostMedia
                        {
                            Id = Guid.NewGuid(),
                            PostId = post.Id,
                            MediaUrl = dto.MediaUrls[i].Url,
                            MediaType = dto.MediaUrls[i].Type,
                            OrderIndex = i,
                            CreatedAt = DateTime.Now
                        };
                        mediaList.Add(media);
                    }
                    _context.PostMedia.AddRange(mediaList);
                    await _context.SaveChangesAsync();
                }

                // Reload post with media
                var createdPost = await _context.Posts
                    .Include(p => p.User)
                    .Include(p => p.Media)
                    .FirstOrDefaultAsync(p => p.Id == post.Id);

                return Ok(ApiResponse<object>.SuccessResponse(MapPostToDto(createdPost), "Post created successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // PUT: api/posts/{id} - Cập nhật post
        [HttpPut("{id}")]
        [Authorize]
        public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostDto dto)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (post == null)
                    return NotFound(ApiResponse.ErrorResponse("Post not found"));

                if (post.UserId != Guid.Parse(userId))
                    return Forbid();

                post.Content = dto.Content;
                post.UpdatedAt = DateTime.Now;

                _context.Posts.Update(post);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<Post>.SuccessResponse(post, "Post updated successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // DELETE: api/posts/{id} - Xóa post
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (post == null)
                    return NotFound(ApiResponse.ErrorResponse("Post not found"));

                if (post.UserId != Guid.Parse(userId))
                    return Forbid();

                _context.Posts.Remove(post);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse.SuccessResponse("Post deleted successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // POST: api/posts/{id}/like - Like post
        [HttpPost("{id}/like")]
        [Authorize]
        public async Task<IActionResult> LikePost(Guid id)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var userGuid = Guid.Parse(userId);
                
                // Verify user exists
                var userExists = await _context.Users.AnyAsync(u => u.Id == userGuid);
                if (!userExists)
                    return Unauthorized(ApiResponse.ErrorResponse("User not found"));

                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (post == null)
                    return NotFound(ApiResponse.ErrorResponse("Post not found"));

                var like = await _context.PostLikes.FirstOrDefaultAsync(l => l.PostId == id && l.UserId == userGuid);
                if (like != null)
                    return BadRequest(ApiResponse.ErrorResponse("Already liked"));

                var newLike = new PostLike
                {
                    Id = Guid.NewGuid(),
                    PostId = id,
                    UserId = userGuid,
                    CreatedAt = DateTime.Now
                };

                var oldCount = post.LikesCount;
                _context.PostLikes.Add(newLike);
                await _context.SaveChangesAsync();

                // Reload post to get updated LikesCount from trigger
                await _context.Entry(post).ReloadAsync();
                var newCount = post.LikesCount;
                
                _logger.LogDebug("Like: Old count = {OldCount}, New count = {NewCount}", oldCount, newCount);

                return Ok(ApiResponse<object>.SuccessResponse(new { likeCount = newCount }, "Post liked"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse($"Error: {ex.Message}. Inner: {ex.InnerException?.Message}"));
            }
        }

        // DELETE: api/posts/{id}/like - Unlike post
        [HttpDelete("{id}/like")]
        [Authorize]
        public async Task<IActionResult> UnlikePost(Guid id)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var userGuid = Guid.Parse(userId);
                
                // Verify user exists
                var userExists = await _context.Users.AnyAsync(u => u.Id == userGuid);
                if (!userExists)
                    return Unauthorized(ApiResponse.ErrorResponse("User not found"));

                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (post == null)
                    return NotFound(ApiResponse.ErrorResponse("Post not found"));

                var like = await _context.PostLikes.FirstOrDefaultAsync(l => l.PostId == id && l.UserId == userGuid);
                if (like == null)
                    return BadRequest(ApiResponse.ErrorResponse("Not liked yet"));

                var oldCount = post.LikesCount;
                _context.PostLikes.Remove(like);
                await _context.SaveChangesAsync();

                // Reload post to get updated LikesCount from trigger
                await _context.Entry(post).ReloadAsync();
                var newCount = post.LikesCount;
                
                _logger.LogDebug("Unlike: Old count = {OldCount}, New count = {NewCount}", oldCount, newCount);

                return Ok(ApiResponse<object>.SuccessResponse(new { likeCount = newCount }, "Post unliked"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse($"Error: {ex.Message}. Inner: {ex.InnerException?.Message}"));
            }
        }
    }
}
