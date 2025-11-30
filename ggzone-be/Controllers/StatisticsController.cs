using ggzone_be.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class StatisticsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StatisticsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/statistics/dashboard
        [HttpGet("dashboard")]
        public async Task<ActionResult<object>> GetDashboardStats()
        {
            var stats = new
            {
                TotalUsers = await _context.Users.CountAsync(),
                TotalGames = await _context.Games.CountAsync(),
                TotalGroups = await _context.Groups.CountAsync(),
                TotalPosts = await _context.Posts.CountAsync(),
                TotalVideos = await _context.Videos.CountAsync(),
                TotalTournaments = await _context.Tournaments.CountAsync(),
                ActiveUsers = await _context.Users.CountAsync(u => u.Status == "online"),
                OngoingTournaments = await _context.Tournaments.CountAsync(t => t.Status == "ongoing")
            };

            return Ok(stats);
        }

        // GET: api/statistics/user/{userId}
        [HttpGet("user/{userId}")]
        public async Task<ActionResult<object>> GetUserStats(Guid userId)
        {
            var user = await _context.Users.FindAsync(userId);
            if (user == null)
                return NotFound();

            var stats = new
            {
                PostCount = await _context.Posts.CountAsync(p => p.UserId == userId),
                VideoCount = await _context.Videos.CountAsync(v => v.UserId == userId),
                FriendCount = await _context.Friendships
                    .CountAsync(f => (f.UserId == userId || f.FriendId == userId) && f.Status == "accepted"),
                GroupCount = await _context.GroupMembers.CountAsync(gm => gm.UserId == userId),
                TournamentCount = await _context.TournamentParticipants.CountAsync(tp => tp.UserId == userId),
                BadgeCount = await _context.UserBadges.CountAsync(b => b.UserId == userId),
                PhotoCount = await _context.Photos.CountAsync(p => p.UserId == userId)
            };

            return Ok(stats);
        }

        // GET: api/statistics/game/{gameId}
        [HttpGet("game/{gameId}")]
        public async Task<ActionResult<object>> GetGameStats(Guid gameId)
        {
            var game = await _context.Games.FindAsync(gameId);
            if (game == null)
                return NotFound();

            var stats = new
            {
                TournamentCount = await _context.Tournaments.CountAsync(t => t.GameId == gameId),
                PlayerCount = await _context.UserGameLibraries.CountAsync(ugl => ugl.GameId == gameId),
                ReviewCount = await _context.GameReviews.CountAsync(gr => gr.GameId == gameId),
                AverageRating = await _context.GameReviews
                    .Where(gr => gr.GameId == gameId)
                    .AverageAsync(gr => (double?)gr.Rating) ?? 0
            };

            return Ok(stats);
        }

        // GET: api/statistics/daily
        [HttpGet("daily")]
        public async Task<ActionResult<IEnumerable<object>>> GetDailyStats([FromQuery] int days = 7)
        {
            var startDate = DateTime.Now.AddDays(-days);

            var stats = await _context.DailyStatistics
                .Where(ds => ds.StatDate >= startDate)
                .OrderByDescending(ds => ds.StatDate)
                .Select(ds => new
                {
                    ds.StatDate,
                    ds.NewUsers,
                    ds.ActiveUsers,
                    ds.TotalPosts,
                    ds.TotalVideos
                })
                .ToListAsync();

            return Ok(stats);
        }
    }
}
