using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "admin")]
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
            item.ReviewedAt = DateTime.Now;

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
                    u.AvatarUrl,
                    u.Status,
                    Level = u.UserStats != null ? u.UserStats.Level : 1,
                    u.CreatedAt,
                    IsBanned = _context.UserBans.Any(ub => ub.UserId == u.Id && ub.IsActive && (ub.EndDate == null || ub.EndDate > DateTime.Now))
                })
                .ToListAsync();

            return Ok(users);
        }

        // PUT: api/admin/users/{userId}
        [HttpPut("users/{userId}")]
        public async Task<ActionResult> UpdateUser(Guid userId, [FromBody] UpdateUserRequest request)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound(new { message = "User not found" });

            // Update only provided fields
            if (!string.IsNullOrEmpty(request.Email))
                user.Email = request.Email;

            if (request.FullName != null)
                user.FullName = request.FullName;

            user.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();

            return Ok(new { message = "User updated successfully" });
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
                StartDate = DateTime.Now,
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
                .Where(ub => ub.UserId == userId && ub.IsActive && (ub.EndDate == null || ub.EndDate > DateTime.Now))
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
            log.CreatedAt = DateTime.Now;

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
            announcement.CreatedAt = DateTime.Now;

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
            content.CreatedAt = DateTime.Now;

            _context.FeaturedContents.Add(content);
            await _context.SaveChangesAsync();

            return Ok(content);
        }

        // DELETE: api/admin/posts/{postId}
        [HttpDelete("posts/{postId}")]
        public async Task<ActionResult> DeletePost(Guid postId)
        {
            var post = await _context.Posts.FindAsync(postId);
            if (post == null)
                return NotFound(new { message = "Post not found" });

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Post deleted successfully" });
        }

        // GET: api/admin/orders
        [HttpGet("orders")]
        public async Task<ActionResult<IEnumerable<object>>> GetOrders(
            [FromQuery] string? status = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.StoreOrders.AsQueryable();

            if (!string.IsNullOrEmpty(status))
                query = query.Where(o => o.Status == status);

            var orders = await query
                .Include(o => o.User)
                .OrderByDescending(o => o.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(o => new
                {
                    o.Id,
                    o.UserId,
                    o.TotalAmount,
                    o.Status,
                    o.CreatedAt,
                    User = new
                    {
                        o.User!.Id,
                        o.User.Username,
                        o.User.Email
                    }
                })
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/admin/orders/{orderId}
        [HttpGet("orders/{orderId}")]
        public async Task<ActionResult<object>> GetOrderDetail(Guid orderId)
        {
            var order = await _context.StoreOrders
                .Include(o => o.User)
                .Where(o => o.Id == orderId)
                .Select(o => new
                {
                    o.Id,
                    o.UserId,
                    o.TotalAmount,
                    o.Status,
                    o.CreatedAt,
                    User = new
                    {
                        o.User!.Id,
                        o.User.Username,
                        o.User.Email
                    }
                })
                .FirstOrDefaultAsync();

            if (order == null)
                return NotFound(new { message = "Order not found" });

            var items = await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .Include(oi => oi.Product)
                .Select(oi => new
                {
                    oi.Id,
                    oi.Quantity,
                    oi.UnitPrice,
                    oi.TotalPrice,
                    Product = new
                    {
                        oi.Product!.Id,
                        oi.Product.Name,
                        oi.Product.CoverImageUrl
                    }
                })
                .ToListAsync();

            return Ok(new { order, items });
        }

        // PUT: api/admin/orders/{orderId}/status
        [HttpPut("orders/{orderId}/status")]
        public async Task<ActionResult> UpdateOrderStatus(Guid orderId, [FromBody] UpdateOrderStatusRequest request)
        {
            var order = await _context.StoreOrders.FindAsync(orderId);
            if (order == null)
                return NotFound(new { message = "Order not found" });

            order.Status = request.Status;
            await _context.SaveChangesAsync();

            return Ok(new { message = "Order status updated successfully" });
        }

        // DELETE: api/admin/groups/{groupId}
        [HttpDelete("groups/{groupId}")]
        public async Task<ActionResult> DeleteGroup(Guid groupId)
        {
            var group = await _context.Groups.FindAsync(groupId);
            if (group == null)
                return NotFound(new { message = "Group not found" });

            _context.Groups.Remove(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Group deleted successfully" });
        }
    }

    public class UpdateOrderStatusRequest
    {
        public string Status { get; set; } = string.Empty;
    }

    public class ReviewRequest
    {
        public string Status { get; set; } = string.Empty;
        public Guid ReviewerId { get; set; }
    }

    public class UpdateUserRequest
    {
        public string? Email { get; set; }
        public string? FullName { get; set; }
    }

    public class BanRequest
    {
        public string Reason { get; set; } = string.Empty;
        public Guid BannedBy { get; set; }
        public string? BanType { get; set; } // temporary, permanent
        public DateTime? EndDate { get; set; }
    }
}
