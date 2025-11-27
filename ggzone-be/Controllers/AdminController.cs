using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize] // Should add role-based auth for admin
    public class AdminController : ControllerBase
    {
        private readonly AppDbContext _context;

        public AdminController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/admin/statistics
        [HttpGet("statistics")]
        public async Task<ActionResult<object>> GetStatistics()
        {
            var stats = new
            {
                TotalUsers = await _context.Users.CountAsync(),
                TotalPosts = await _context.Posts.CountAsync(),
                TotalGroups = await _context.Groups.CountAsync(),
                TotalGames = await _context.Games.CountAsync(),
                TotalVideos = await _context.Videos.CountAsync(),
                TotalOrders = await _context.StoreOrders.CountAsync(),
                TotalRevenue = await _context.StoreOrders
                    .Where(o => o.Status == "completed")
                    .SumAsync(o => o.TotalAmount),
                ActiveUsers = await _context.Users.CountAsync(u => u.Status == "online"),
                PendingModeration = await _context.ModerationQueues.CountAsync(m => m.Status == "pending")
            };

            return Ok(stats);
        }

        // GET: api/admin/daily-statistics
        [HttpGet("daily-statistics")]
        public async Task<ActionResult<IEnumerable<DailyStatistic>>> GetDailyStatistics(
            [FromQuery] DateTime? startDate = null,
            [FromQuery] DateTime? endDate = null)
        {
            var query = _context.DailyStatistics.AsQueryable();

            if (startDate.HasValue)
                query = query.Where(ds => ds.StatDate >= startDate.Value);

            if (endDate.HasValue)
                query = query.Where(ds => ds.StatDate <= endDate.Value);

            var stats = await query
                .OrderByDescending(ds => ds.StatDate)
                .Take(30)
                .ToListAsync();

            return Ok(stats);
        }

        // GET: api/admin/moderation-queue
        [HttpGet("moderation-queue")]
        public async Task<ActionResult<IEnumerable<object>>> GetModerationQueue(
            [FromQuery] string? status = null)
        {
            var query = _context.ModerationQueues.AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(m => m.Status == status);

            var items = await query
                .Include(m => m.User)
                .OrderByDescending(m => m.CreatedAt)
                .Select(m => new
                {
                    m.Id,
                    m.ContentType,
                    m.ContentId,
                    m.FlagReason,
                    m.Status,
                    m.CreatedAt,
                    m.ReviewedAt,
                    User = new
                    {
                        m.User!.Id,
                        m.User.Username,
                        m.User.AvatarUrl
                    },
                    Reviewer = m.Reviewer != null ? new
                    {
                        m.Reviewer.Id,
                        m.Reviewer.Username
                    } : null
                })
                .ToListAsync();

            return Ok(items);
        }

        // PUT: api/admin/moderation-queue/{id}/review
        [HttpPut("moderation-queue/{id}/review")]
        public async Task<ActionResult> ReviewContent(Guid id, [FromBody] ReviewRequest request)
        {
            var item = await _context.ModerationQueues.FindAsync(id);
            if (item == null)
                return NotFound();

            item.Status = request.Status;
            item.ReviewedBy = request.ReviewerId;
            item.ReviewedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return Ok(item);
        }

        // GET: api/admin/users
        [HttpGet("users")]
        public async Task<ActionResult<IEnumerable<object>>> GetUsers(
            [FromQuery] string? search = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.Users.AsQueryable();

            if (!string.IsNullOrEmpty(search))
                query = query.Where(u => u.Username.Contains(search) || u.Email.Contains(search));

            var users = await query
                .Include(u => u.UserStats)
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.Email,
                    u.FullName,
                    u.Status,
                    Level = u.UserStats != null ? u.UserStats.Level : 1,
                    u.CreatedAt,
                    IsBanned = _context.UserBans.Any(ub => ub.UserId == u.Id && ub.IsActive && (ub.EndDate == null || ub.EndDate > DateTime.UtcNow))
                })
                .ToListAsync();

            return Ok(users);
        }

        // POST: api/admin/users/{userId}/ban
        [HttpPost("users/{userId}/ban")]
        public async Task<ActionResult> BanUser(Guid userId, [FromBody] BanRequest request)
        {
            var ban = new UserBan
            {
                Id = Guid.NewGuid(),
                UserId = userId,
                Reason = request.Reason,
                BannedBy = request.BannedBy,
                StartDate = DateTime.UtcNow,
                EndDate = request.EndDate,
                BanType = request.BanType
            };

            _context.UserBans.Add(ban);
            await _context.SaveChangesAsync();

            return Ok(ban);
        }

        // DELETE: api/admin/users/{userId}/unban
        [HttpDelete("users/{userId}/unban")]
        public async Task<ActionResult> UnbanUser(Guid userId)
        {
            var bans = await _context.UserBans
                .Where(ub => ub.UserId == userId && ub.IsActive && (ub.EndDate == null || ub.EndDate > DateTime.UtcNow))
                .ToListAsync();

            _context.UserBans.RemoveRange(bans);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/admin/audit-logs
        [HttpGet("audit-logs")]
        public async Task<ActionResult<IEnumerable<AdminAuditLog>>> GetAuditLogs(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 50)
        {
            var logs = await _context.AdminAuditLogs
                .OrderByDescending(l => l.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(logs);
        }

        // POST: api/admin/audit-log
        [HttpPost("audit-log")]
        public async Task<ActionResult> CreateAuditLog([FromBody] AdminAuditLog log)
        {
            log.Id = Guid.NewGuid();
            log.CreatedAt = DateTime.UtcNow;

            _context.AdminAuditLogs.Add(log);
            await _context.SaveChangesAsync();

            return Ok(log);
        }

        // GET: api/admin/announcements
        [HttpGet("announcements")]
        public async Task<ActionResult<IEnumerable<Announcement>>> GetAnnouncements()
        {
            var announcements = await _context.Announcements
                .OrderByDescending(a => a.CreatedAt)
                .ToListAsync();

            return Ok(announcements);
        }

        // POST: api/admin/announcements
        [HttpPost("announcements")]
        public async Task<ActionResult<Announcement>> CreateAnnouncement([FromBody] Announcement announcement)
        {
            announcement.Id = Guid.NewGuid();
            announcement.CreatedAt = DateTime.UtcNow;

            _context.Announcements.Add(announcement);
            await _context.SaveChangesAsync();

            return Ok(announcement);
        }

        // GET: api/admin/featured-content
        [HttpGet("featured-content")]
        public async Task<ActionResult<IEnumerable<FeaturedContent>>> GetFeaturedContent()
        {
            var content = await _context.FeaturedContents
                .Where(fc => fc.IsActive)
                .OrderBy(fc => fc.DisplayOrder)
                .ToListAsync();

            return Ok(content);
        }

        // POST: api/admin/featured-content
        [HttpPost("featured-content")]
        public async Task<ActionResult<FeaturedContent>> CreateFeaturedContent([FromBody] FeaturedContent content)
        {
            content.Id = Guid.NewGuid();
            content.CreatedAt = DateTime.UtcNow;

            _context.FeaturedContents.Add(content);
            await _context.SaveChangesAsync();

            return Ok(content);
        }
    }

    public class ReviewRequest
    {
        public string Status { get; set; } = string.Empty;
        public Guid ReviewerId { get; set; }
    }

    public class BanRequest
    {
        public string Reason { get; set; } = string.Empty;
        public Guid BannedBy { get; set; }
        public string? BanType { get; set; } // temporary, permanent
        public DateTime? EndDate { get; set; }
    }
}
