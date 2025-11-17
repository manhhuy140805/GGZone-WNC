using ggzone_be.Dtos.Post;
using ggzone_be.Interfaces;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ggzone_be.Controllers
{
    [ApiController]
    [Route("api/posts")]
    public class PostController : ControllerBase
    {
        private readonly IPostRepository _postRepo;

        public PostController(IPostRepository postRepo)
        {
            _postRepo = postRepo;
        }

        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Guid.Parse(userIdClaim ?? Guid.Empty.ToString());
        }

        [HttpGet]
        public async Task<IActionResult> GetAllPosts()
        {
            var posts = await _postRepo.GetAllPostsAsync();
            var currentUserId = User.Identity?.IsAuthenticated == true ? GetCurrentUserId() : Guid.Empty;

            var response = posts.Select(p => new PostResponseDto
            {
                Id = p.Id,
                UserId = p.UserId,
                Username = p.User.Username,
                FullName = p.User.FullName,
                AvatarUrl = p.User.AvatarUrl,
                GroupId = p.GroupId,
                GroupName = p.Group?.Name,
                Content = p.Content,
                PostType = p.PostType,
                VideoUrl = p.VideoUrl,
                LikesCount = p.LikesCount,
                CommentsCount = p.CommentsCount,
                SharesCount = p.SharesCount,
                IsPinned = p.IsPinned,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt,
                MediaUrls = p.Media?.Select(pm => pm.MediaUrl).ToList(),
                IsLikedByCurrentUser = currentUserId != Guid.Empty && _postRepo.IsPostLikedByUserAsync(p.Id, currentUserId).Result
            }).ToList();

            return Ok(response);
        }

        [HttpGet("feed")]
        [Authorize]
        public async Task<IActionResult> GetUserFeed([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var userId = GetCurrentUserId();
            var posts = await _postRepo.GetUserFeedAsync(userId, page, pageSize);

            var response = posts.Select(p => new PostResponseDto
            {
                Id = p.Id,
                UserId = p.UserId,
                Username = p.User.Username,
                FullName = p.User.FullName,
                AvatarUrl = p.User.AvatarUrl,
                GroupId = p.GroupId,
                GroupName = p.Group?.Name,
                Content = p.Content,
                PostType = p.PostType,
                VideoUrl = p.VideoUrl,
                LikesCount = p.LikesCount,
                CommentsCount = p.CommentsCount,
                SharesCount = p.SharesCount,
                IsPinned = p.IsPinned,
                CreatedAt = p.CreatedAt,
                UpdatedAt = p.UpdatedAt,
                MediaUrls = p.Media?.Select(pm => pm.MediaUrl).ToList(),
                IsLikedByCurrentUser = _postRepo.IsPostLikedByUserAsync(p.Id, userId).Result
            }).ToList();

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPostById(Guid id)
        {
            var post = await _postRepo.GetPostByIdAsync(id);
            if (post == null) return NotFound();

            var currentUserId = User.Identity?.IsAuthenticated == true ? GetCurrentUserId() : Guid.Empty;

            var response = new PostResponseDto
            {
                Id = post.Id,
                UserId = post.UserId,
                Username = post.User.Username,
                FullName = post.User.FullName,
                AvatarUrl = post.User.AvatarUrl,
                GroupId = post.GroupId,
                GroupName = post.Group?.Name,
                Content = post.Content,
                PostType = post.PostType,
                VideoUrl = post.VideoUrl,
                LikesCount = post.LikesCount,
                CommentsCount = post.CommentsCount,
                SharesCount = post.SharesCount,
                IsPinned = post.IsPinned,
                CreatedAt = post.CreatedAt,
                UpdatedAt = post.UpdatedAt,
                MediaUrls = post.Media?.Select(pm => pm.MediaUrl).ToList(),
                IsLikedByCurrentUser = currentUserId != Guid.Empty && await _postRepo.IsPostLikedByUserAsync(post.Id, currentUserId)
            };

            return Ok(response);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreatePost([FromBody] CreatePostDto dto)
        {
            var userId = GetCurrentUserId();

            var post = new Post
            {
                UserId = userId,
                GroupId = dto.GroupId,
                Content = dto.Content,
                PostType = dto.PostType,
                VideoUrl = dto.VideoUrl
            };

            var createdPost = await _postRepo.CreatePostAsync(post);

            // Add media if gallery type
            if (dto.PostType == "gallery" && dto.MediaUrls != null && dto.MediaUrls.Any())
            {
                // You would add PostMedia here
            }

            return CreatedAtAction(nameof(GetPostById), new { id = createdPost.Id }, createdPost);
        }

        [HttpPost("{id}/like")]
        [Authorize]
        public async Task<IActionResult> LikePost(Guid id)
        {
            var userId = GetCurrentUserId();
            var result = await _postRepo.LikePostAsync(id, userId);

            if (!result) return BadRequest("Already liked or post not found");

            return Ok(new { message = "Post liked successfully" });
        }

        [HttpDelete("{id}/like")]
        [Authorize]
        public async Task<IActionResult> UnlikePost(Guid id)
        {
            var userId = GetCurrentUserId();
            var result = await _postRepo.UnlikePostAsync(id, userId);

            if (!result) return BadRequest("Not liked or post not found");

            return Ok(new { message = "Post unliked successfully" });
        }

        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeletePost(Guid id)
        {
            var userId = GetCurrentUserId();
            var post = await _postRepo.GetPostByIdAsync(id);

            if (post == null) return NotFound();
            if (post.UserId != userId) return Forbid();

            var result = await _postRepo.DeletePostAsync(id);
            if (!result) return BadRequest("Failed to delete post");

            return Ok(new { message = "Post deleted successfully" });
        }
    }
}
