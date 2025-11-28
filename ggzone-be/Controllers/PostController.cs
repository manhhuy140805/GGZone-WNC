using ggzone_be.Data;
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
    public class PostController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PostController(AppDbContext context)
        {
            _context = context;
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
                    .Select(p => new
                    {
                        p.Id,
                        p.Content,
                        p.CreatedAt,
                        p.LikesCount,
                        p.CommentsCount,
                        Author = new
                        {
                            p.User.Id,
                            p.User.Username,
                            p.User.AvatarUrl
                        },
                        p.GroupId
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        posts,
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
                    .Select(p => new
                    {
                        p.Id,
                        p.Content,
                        p.CreatedAt,
                        p.LikesCount,
                        p.CommentsCount,
                        Author = new
                        {
                            p.User.Id,
                            p.User.Username,
                            p.User.AvatarUrl
                        },
                        p.GroupId
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        posts,
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
                    .Select(p => new
                    {
                        p.Id,
                        p.Content,
                        p.CreatedAt,
                        p.LikesCount,
                        p.CommentsCount,
                        Author = new
                        {
                            p.User.Id,
                            p.User.Username,
                            p.User.AvatarUrl
                        }
                    })
                    .ToListAsync();

                return Ok(new
                {
                    success = true,
                    data = new
                    {
                        posts,
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

                var post = new Post
                {
                    Id = Guid.NewGuid(),
                    Content = dto.Content,
                    UserId = Guid.Parse(userId),
                    GroupId = dto.GroupId,
                    CreatedAt = DateTime.UtcNow,
                    LikesCount = 0,
                    CommentsCount = 0
                };

                _context.Posts.Add(post);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<Post>.SuccessResponse(post, "Post created successfully"));
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
                post.UpdatedAt = DateTime.UtcNow;

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

                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (post == null)
                    return NotFound(ApiResponse.ErrorResponse("Post not found"));

                var like = await _context.PostLikes.FirstOrDefaultAsync(l => l.PostId == id && l.UserId == Guid.Parse(userId));
                if (like != null)
                    return BadRequest(ApiResponse.ErrorResponse("Already liked"));

                var newLike = new PostLike
                {
                    Id = Guid.NewGuid(),
                    PostId = id,
                    UserId = Guid.Parse(userId),
                    CreatedAt = DateTime.UtcNow
                };

                post.LikesCount++;
                _context.PostLikes.Add(newLike);
                _context.Posts.Update(post);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<object>.SuccessResponse(new { likeCount = post.LikesCount }, "Post liked"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
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

                var post = await _context.Posts.FirstOrDefaultAsync(p => p.Id == id);
                if (post == null)
                    return NotFound(ApiResponse.ErrorResponse("Post not found"));

                var like = await _context.PostLikes.FirstOrDefaultAsync(l => l.PostId == id && l.UserId == Guid.Parse(userId));
                if (like == null)
                    return BadRequest(ApiResponse.ErrorResponse("Not liked yet"));

                post.LikesCount--;
                _context.PostLikes.Remove(like);
                _context.Posts.Update(post);
                await _context.SaveChangesAsync();

                return Ok(ApiResponse<object>.SuccessResponse(new { likeCount = post.LikesCount }, "Post unliked"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }
    }

    // DTOs
    public class CreatePostDto
    {
        public string Content { get; set; }
        public Guid? GroupId { get; set; }
    }

    public class UpdatePostDto
    {
        public string Content { get; set; }
    }
}
