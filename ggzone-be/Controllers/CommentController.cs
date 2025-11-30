using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CommentController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/comment/post/{postId}
        [HttpGet("post/{postId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetPostComments(
            Guid postId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var comments = await _context.Comments
                .Where(c => c.PostId == postId)
                .Include(c => c.User)
                .OrderByDescending(c => c.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(c => new
                {
                    c.Id,
                    c.Content,
                    c.CreatedAt,
                    User = new
                    {
                        c.User.Id,
                        c.User.Username,
                        c.User.FullName,
                        c.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(comments);
        }

        // POST: api/comment
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Comment>> CreateComment([FromBody] Comment comment)
        {
            comment.Id = Guid.NewGuid();
            comment.CreatedAt = DateTime.Now;

            _context.Comments.Add(comment);

            // Update post comment count
            var post = await _context.Posts.FindAsync(comment.PostId);
            if (post != null)
            {
                post.CommentsCount++;
            }

            await _context.SaveChangesAsync();

            // Create notification for post author
            if (post != null && post.UserId != comment.UserId)
            {
                var notification = new Notification
                {
                    Id = Guid.NewGuid(),
                    UserId = post.UserId,
                    Type = "comment",
                    Title = "New Comment",
                    Content = $"Someone commented on your post",
                    IsRead = false,
                    RelatedEntityId = comment.Id,
                    RelatedEntityType = "Comment",
                    CreatedAt = DateTime.Now
                };

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();
            }

            return Ok(comment);
        }

        // PUT: api/comment/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateComment(Guid id, [FromBody] Comment updatedComment)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
                return NotFound();

            comment.Content = updatedComment.Content;
            await _context.SaveChangesAsync();

            return Ok(comment);
        }

        // DELETE: api/comment/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteComment(Guid id)
        {
            var comment = await _context.Comments.FindAsync(id);
            if (comment == null)
                return NotFound();

            // Update post comment count
            var post = await _context.Posts.FindAsync(comment.PostId);
            if (post != null && post.CommentsCount > 0)
            {
                post.CommentsCount--;
            }

            _context.Comments.Remove(comment);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/comment/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetComment(Guid id)
        {
            var comment = await _context.Comments
                .Include(c => c.User)
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.Content,
                    c.CreatedAt,
                    User = new
                    {
                        c.User.Id,
                        c.User.Username,
                        c.User.FullName,
                        c.User.AvatarUrl
                    }
                })
                .FirstOrDefaultAsync();

            if (comment == null)
                return NotFound();

            return Ok(comment);
        }
    }
}
