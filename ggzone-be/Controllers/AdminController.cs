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
            var now = DateTime.Now;
            var currentMonthStart = new DateTime(now.Year, now.Month, 1);
            var previousMonthStart = currentMonthStart.AddMonths(-1);

            // Current totals
            var totalUsers = await _context.Users.CountAsync();
            var totalPosts = await _context.Posts.CountAsync();
            var totalProducts = await _context.StoreProducts.CountAsync();
            var totalOrders = await _context.StoreOrders.CountAsync();

            // Current month counts
            var currentMonthUsers = await _context.Users.Where(u => u.CreatedAt >= currentMonthStart).CountAsync();
            var currentMonthPosts = await _context.Posts.Where(p => p.CreatedAt >= currentMonthStart).CountAsync();
            var currentMonthProducts = await _context.StoreProducts.Where(p => p.CreatedAt >= currentMonthStart).CountAsync();
            var currentMonthOrders = await _context.StoreOrders.Where(o => o.CreatedAt >= currentMonthStart).CountAsync();

            // Previous month counts
            var previousMonthUsers = await _context.Users.Where(u => u.CreatedAt >= previousMonthStart && u.CreatedAt < currentMonthStart).CountAsync();
            var previousMonthPosts = await _context.Posts.Where(p => p.CreatedAt >= previousMonthStart && p.CreatedAt < currentMonthStart).CountAsync();
            var previousMonthProducts = await _context.StoreProducts.Where(p => p.CreatedAt >= previousMonthStart && p.CreatedAt < currentMonthStart).CountAsync();
            var previousMonthOrders = await _context.StoreOrders.Where(o => o.CreatedAt >= previousMonthStart && o.CreatedAt < currentMonthStart).CountAsync();

            // Calculate growth percentages
            var userGrowth = previousMonthUsers > 0 ? Math.Round(((double)(currentMonthUsers - previousMonthUsers) / previousMonthUsers) * 100, 1) : 0;
            var postGrowth = previousMonthPosts > 0 ? Math.Round(((double)(currentMonthPosts - previousMonthPosts) / previousMonthPosts) * 100, 1) : 0;
            var productGrowth = previousMonthProducts > 0 ? Math.Round(((double)(currentMonthProducts - previousMonthProducts) / previousMonthProducts) * 100, 1) : 0;
            var orderGrowth = previousMonthOrders > 0 ? Math.Round(((double)(currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100, 1) : 0;

            var stats = new
            {
                totalUsers = totalUsers,
                totalPosts = totalPosts,
                totalGames = totalProducts,
                totalOrders = totalOrders,
                userGrowth = userGrowth,
                postGrowth = postGrowth,
                productGrowth = productGrowth,
                orderGrowth = orderGrowth,
                totalRevenue = await _context.StoreOrders
                    .Where(o => o.Status == "completed")
                    .SumAsync(o => o.TotalAmount),
                activeUsers = await _context.Users.CountAsync(u => u.Status == "online"),
                pendingModeration = await _context.ModerationQueues.CountAsync(m => m.Status == "pending")
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

        // GET: api/admin/monthly-revenue
        [HttpGet("monthly-revenue")]
        public async Task<ActionResult<IEnumerable<object>>> GetMonthlyRevenue([FromQuery] int year = 0)
        {
            if (year == 0)
                year = DateTime.Now.Year;

            var monthlyRevenue = await _context.StoreOrders
                .Where(o => o.CreatedAt.Year == year && o.Status == "completed")
                .GroupBy(o => o.CreatedAt.Month)
                .Select(g => new
                {
                    Month = g.Key,
                    Revenue = g.Sum(o => o.TotalAmount),
                    OrderCount = g.Count()
                })
                .OrderBy(x => x.Month)
                .ToListAsync();

            // Create array for all 12 months
            var months = new[] { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" };
            var result = months.Select((month, index) =>
            {
                var data = monthlyRevenue.FirstOrDefault(r => r.Month == index + 1);
                return new
                {
                    month = month,
                    value = data != null ? Math.Round(data.Revenue / 1000, 1) : 0, // Convert to thousands
                    orderCount = data?.OrderCount ?? 0
                };
            }).ToList();

            return Ok(result);
        }

        // GET: api/admin/top-products
        [HttpGet("top-products")]
        public async Task<ActionResult<IEnumerable<object>>> GetTopProducts([FromQuery] int limit = 4)
        {
            var topProducts = await _context.OrderItems
                .Include(oi => oi.Product)
                .Where(oi => oi.Product != null)
                .GroupBy(oi => new { oi.ProductId, oi.Product!.Name, oi.Product.CoverImageUrl })
                .Select(g => new
                {
                    id = g.Key.ProductId.ToString(),
                    name = g.Key.Name,
                    sales = g.Sum(oi => oi.Quantity),
                    revenue = g.Sum(oi => oi.TotalPrice),
                    imageUrl = g.Key.CoverImageUrl
                })
                .OrderByDescending(p => p.revenue)
                .Take(limit)
                .ToListAsync();

            // Calculate growth (mock for now - would need historical data)
            var result = topProducts.Select(p => new
            {
                p.id,
                p.name,
                p.sales,
                p.revenue,
                growth = 0, // TODO: Calculate actual growth from historical data
                p.imageUrl
            });

            return Ok(result);
        }

        // GET: api/admin/recent-activities
        [HttpGet("recent-activities")]
        public async Task<ActionResult<IEnumerable<object>>> GetRecentActivities([FromQuery] int limit = 5)
        {
            // Get recent orders
            var recentOrders = await _context.StoreOrders
                .Include(o => o.User)
                .OrderByDescending(o => o.CreatedAt)
                .Take(limit)
                .Select(o => new
                {
                    id = o.Id.ToString(),
                    type = "order",
                    userId = o.UserId.ToString(),
                    userName = o.User!.Username,
                    action = $"placed an order for ${o.TotalAmount:F2}",
                    amount = o.TotalAmount,
                    createdAt = o.CreatedAt
                })
                .ToListAsync();

            return Ok(recentOrders);
        }

        // GET: api/admin/quick-stats
        [HttpGet("quick-stats")]
        public async Task<ActionResult<object>> GetQuickStats()
        {
            // Calculate stats for current month vs previous month
            var now = DateTime.Now;
            var currentMonthStart = new DateTime(now.Year, now.Month, 1);
            var previousMonthStart = currentMonthStart.AddMonths(-1);

            var currentMonthOrders = await _context.StoreOrders
                .Where(o => o.CreatedAt >= currentMonthStart)
                .CountAsync();

            var previousMonthOrders = await _context.StoreOrders
                .Where(o => o.CreatedAt >= previousMonthStart && o.CreatedAt < currentMonthStart)
                .CountAsync();

            var currentMonthPosts = await _context.Posts
                .Where(p => p.CreatedAt >= currentMonthStart)
                .CountAsync();

            var previousMonthPosts = await _context.Posts
                .Where(p => p.CreatedAt >= previousMonthStart && p.CreatedAt < currentMonthStart)
                .CountAsync();

            // Calculate growth percentages
            var orderGrowth = previousMonthOrders > 0 
                ? Math.Round(((double)(currentMonthOrders - previousMonthOrders) / previousMonthOrders) * 100, 1)
                : 0;

            var postGrowth = previousMonthPosts > 0
                ? Math.Round(((double)(currentMonthPosts - previousMonthPosts) / previousMonthPosts) * 100, 1)
                : 0;

            var stats = new
            {
                pageViews = currentMonthOrders * 10, // Mock: estimate 10 views per order
                pageViewsGrowth = orderGrowth,
                comments = currentMonthPosts,
                commentsGrowth = postGrowth,
                conversionRate = currentMonthOrders > 0 ? Math.Round((double)currentMonthOrders / (currentMonthOrders * 10) * 100, 1) : 0,
                conversionRateGrowth = 0 // Mock
            };

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
                    id = u.Id,
                    username = u.Username,
                    email = u.Email,
                    fullName = u.FullName,
                    avatarUrl = u.AvatarUrl,
                    status = u.Status,
                    role = u.Role,
                    level = u.UserStats != null ? u.UserStats.Level : 1,
                    createdAt = u.CreatedAt,
                    isBanned = _context.UserBans.Any(ub => ub.UserId == u.Id && ub.IsActive && (ub.EndDate == null || ub.EndDate > DateTime.Now))
                })
                .ToListAsync();

            return Ok(users);
        }

        // PUT: api/admin/users/{userId}
        [HttpPut("users/{userId}")]
        public async Task<ActionResult> UpdateUser(Guid userId, [FromBody] UpdateUserRequest request)
        {
            Console.WriteLine($"UpdateUser called - UserId: {userId}");
            Console.WriteLine($"Request - Email: {request.Email}, FullName: {request.FullName}, Role: {request.Role}");
            
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
            {
                Console.WriteLine($"User not found: {userId}");
                return NotFound(new { message = "User not found" });
            }

            Console.WriteLine($"Current user - Email: {user.Email}, Role: {user.Role}");

            // Update only provided fields
            if (!string.IsNullOrEmpty(request.Email))
                user.Email = request.Email;

            if (request.FullName != null)
                user.FullName = request.FullName;

            if (!string.IsNullOrEmpty(request.Role))
            {
                // Validate role
                var validRoles = new[] { "user", "moderator", "admin" };
                if (!validRoles.Contains(request.Role.ToLower()))
                {
                    Console.WriteLine($"Invalid role: {request.Role}");
                    return BadRequest(new { message = "Invalid role. Must be user, moderator, or admin" });
                }
                
                user.Role = request.Role.ToLower();
                Console.WriteLine($"Updated role to: {user.Role}");
            }

            user.UpdatedAt = DateTime.Now;

            await _context.SaveChangesAsync();
            
            Console.WriteLine($"User updated successfully - New role: {user.Role}");

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
        public string? Role { get; set; }
    }

    public class BanRequest
    {
        public string Reason { get; set; } = string.Empty;
        public Guid BannedBy { get; set; }
        public string? BanType { get; set; } // temporary, permanent
        public DateTime? EndDate { get; set; }
    }
}
