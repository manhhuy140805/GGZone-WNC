using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ForumController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/forum/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<object>>> GetCategories()
        {
            var categories = await _context.ForumCategories
                .OrderBy(c => c.CreatedAt)
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description,
                    c.IconUrl,
                    c.TopicsCount,
                    c.PostsCount,
                    c.CreatedAt
                })
                .ToListAsync();

            return Ok(categories);
        }

        // GET: api/forum/categories/{id}
        [HttpGet("categories/{id}")]
        public async Task<ActionResult<object>> GetCategory(Guid id)
        {
            var category = await _context.ForumCategories
                .Where(c => c.Id == id)
                .Select(c => new
                {
                    c.Id,
                    c.Name,
                    c.Description,
                    c.IconUrl,
                    c.TopicsCount,
                    c.PostsCount,
                    c.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (category == null)
                return NotFound();

            return Ok(category);
        }

        // GET: api/forum/categories/{id}/topics
        [HttpGet("categories/{id}/topics")]
        public async Task<ActionResult<IEnumerable<object>>> GetTopicsByCategory(
            Guid id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var topics = await _context.ForumTopics
                .Where(t => t.CategoryId == id)
                .Include(t => t.User)
                .OrderByDescending(t => t.IsPinned)
                .ThenByDescending(t => t.LastReplyAt ?? t.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.IsPinned,
                    t.IsLocked,
                    t.ViewsCount,
                    t.RepliesCount,
                    t.CreatedAt,
                    t.LastReplyAt,
                    Author = new
                    {
                        t.User.Id,
                        t.User.Username,
                        t.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(topics);
        }

        // GET: api/forum/topics/{id}
        [HttpGet("topics/{id}")]
        public async Task<ActionResult<object>> GetTopic(Guid id)
        {
            var topic = await _context.ForumTopics
                .Include(t => t.User)
                .Include(t => t.Category)
                .Where(t => t.Id == id)
                .Select(t => new
                {
                    t.Id,
                    t.Title,
                    t.Content,
                    t.IsPinned,
                    t.IsLocked,
                    t.ViewsCount,
                    t.RepliesCount,
                    t.CreatedAt,
                    t.LastReplyAt,
                    Author = new
                    {
                        t.User.Id,
                        t.User.Username,
                        t.User.FullName,
                        t.User.AvatarUrl
                    },
                    Category = new
                    {
                        t.Category!.Id,
                        t.Category.Name
                    }
                })
                .FirstOrDefaultAsync();

            if (topic == null)
                return NotFound();

            // Increment view count
            var topicEntity = await _context.ForumTopics.FindAsync(id);
            if (topicEntity != null)
            {
                topicEntity.ViewsCount++;
                await _context.SaveChangesAsync();
            }

            return Ok(topic);
        }

        // POST: api/forum/topics
        [HttpPost("topics")]
        [Authorize]
        public async Task<ActionResult<ForumTopic>> CreateTopic([FromBody] ForumTopic topic)
        {
            topic.Id = Guid.NewGuid();
            topic.CreatedAt = DateTime.UtcNow;
            topic.ViewsCount = 0;
            topic.RepliesCount = 0;

            _context.ForumTopics.Add(topic);

            // Update category counts
            var category = await _context.ForumCategories.FindAsync(topic.CategoryId);
            if (category != null)
            {
                category.TopicsCount++;
                category.PostsCount++;
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTopic), new { id = topic.Id }, topic);
        }

        // GET: api/forum/topics/{id}/replies
        [HttpGet("topics/{id}/replies")]
        public async Task<ActionResult<IEnumerable<object>>> GetReplies(
            Guid id,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var replies = await _context.ForumReplies
                .Where(r => r.TopicId == id)
                .Include(r => r.User)
                    .ThenInclude(a => a.UserStats)
                .OrderBy(r => r.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(r => new
                {
                    r.Id,
                    r.Content,
                    r.CreatedAt,
                    r.UpdatedAt,
                    Author = new
                    {
                        r.User.Id,
                        r.User.Username,
                        r.User.FullName,
                        r.User.AvatarUrl,
                        Level = r.User.UserStats != null ? r.User.UserStats.Level : 1
                    }
                })
                .ToListAsync();

            return Ok(replies);
        }

        // POST: api/forum/topics/{id}/replies
        [HttpPost("topics/{id}/replies")]
        [Authorize]
        public async Task<ActionResult<ForumReply>> CreateReply(Guid id, [FromBody] ForumReply reply)
        {
            var topic = await _context.ForumTopics.FindAsync(id);
            if (topic == null)
                return NotFound();

            if (topic.IsLocked)
                return BadRequest("Topic is locked");

            reply.Id = Guid.NewGuid();
            reply.TopicId = id;
            reply.CreatedAt = DateTime.UtcNow;

            _context.ForumReplies.Add(reply);

            // Update topic
            topic.RepliesCount++;
            topic.LastReplyAt = DateTime.UtcNow;

            // Update category
            var category = await _context.ForumCategories.FindAsync(topic.CategoryId);
            if (category != null)
            {
                category.PostsCount++;
            }

            await _context.SaveChangesAsync();

            return Ok(reply);
        }

        // PUT: api/forum/replies/{id}
        [HttpPut("replies/{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateReply(Guid id, [FromBody] ForumReply updatedReply)
        {
            var reply = await _context.ForumReplies.FindAsync(id);
            if (reply == null)
                return NotFound();

            reply.Content = updatedReply.Content;
            reply.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(reply);
        }

        // DELETE: api/forum/replies/{id}
        [HttpDelete("replies/{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteReply(Guid id)
        {
            var reply = await _context.ForumReplies.FindAsync(id);
            if (reply == null)
                return NotFound();

            var topic = await _context.ForumTopics.FindAsync(reply.TopicId);
            
            _context.ForumReplies.Remove(reply);

            if (topic != null)
            {
                topic.RepliesCount--;
            }

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // PUT: api/forum/topics/{id}/pin
        [HttpPut("topics/{id}/pin")]
        [Authorize]
        public async Task<ActionResult> PinTopic(Guid id)
        {
            var topic = await _context.ForumTopics.FindAsync(id);
            if (topic == null)
                return NotFound();

            topic.IsPinned = !topic.IsPinned;
            await _context.SaveChangesAsync();

            return Ok();
        }

        // PUT: api/forum/topics/{id}/lock
        [HttpPut("topics/{id}/lock")]
        [Authorize]
        public async Task<ActionResult> LockTopic(Guid id)
        {
            var topic = await _context.ForumTopics.FindAsync(id);
            if (topic == null)
                return NotFound();

            topic.IsLocked = !topic.IsLocked;
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
