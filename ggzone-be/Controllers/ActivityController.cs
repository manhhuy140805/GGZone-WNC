using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ActivityController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ActivityController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/activity/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUserActivities(
            Guid userId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var activities = await _context.UserActivityLogs
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(a => new
                {
                    a.Id,
                    a.ActivityType,
                    a.RelatedType,
                    a.CreatedAt
                })
                .ToListAsync();

            return Ok(activities);
        }

        // POST: api/activity/log
        [HttpPost("log")]
        public async Task<ActionResult> LogActivity([FromBody] UserActivityLog activity)
        {
            activity.Id = Guid.NewGuid();
            activity.CreatedAt = DateTime.Now;

            _context.UserActivityLogs.Add(activity);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Activity logged" });
        }

        // GET: api/activity/{userId}/recent
        [HttpGet("{userId}/recent")]
        public async Task<ActionResult<IEnumerable<object>>> GetRecentActivities(Guid userId, [FromQuery] int limit = 10)
        {
            var activities = await _context.UserActivityLogs
                .Where(a => a.UserId == userId)
                .OrderByDescending(a => a.CreatedAt)
                .Take(limit)
                .Select(a => new
                {
                    a.ActivityType,
                    a.RelatedType,
                    a.CreatedAt
                })
                .ToListAsync();

            return Ok(activities);
        }

        // GET: api/activity/feed/{userId}
        [HttpGet("feed/{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetActivityFeed(
            Guid userId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var friendIds = await _context.Friendships
                .Where(f => (f.UserId == userId || f.FriendId == userId) && f.Status == "accepted")
                .Select(f => f.UserId == userId ? f.FriendId : f.UserId)
                .ToListAsync();

            friendIds.Add(userId);

            var activities = await _context.UserActivityLogs
                .Where(a => friendIds.Contains(a.UserId))
                .OrderByDescending(a => a.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(a => a.User)
                .Select(a => new
                {
                    a.Id,
                    a.ActivityType,
                    a.RelatedType,
                    a.CreatedAt,
                    User = new
                    {
                        a.User!.Id,
                        a.User.Username,
                        a.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(activities);
        }
    }
}
