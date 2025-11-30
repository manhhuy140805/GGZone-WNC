using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrendingController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TrendingController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/trending/games
        [HttpGet("games")]
        public async Task<ActionResult<IEnumerable<object>>> GetTrendingGames([FromQuery] int limit = 10)
        {
            var trendingGames = await _context.TrendingItems
                .Where(t => t.ContentType == "game" && t.TrendingDate >= DateTime.Now.Date.AddDays(-7))
                .OrderByDescending(t => t.EngagementScore)
                .Take(limit)
                .Select(t => new
                {
                    t.Id,
                    t.ContentId,
                    t.ViewsCount,
                    t.EngagementScore,
                    Game = _context.Games
                        .Where(g => g.Id == t.ContentId)
                        .Select(g => new
                        {
                            g.Id,
                            g.Name,
                            g.Slug,
                            g.CoverImageUrl,
                            g.IconUrl,
                            g.Genre,
                            g.Platform
                        })
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(trendingGames);
        }

        // GET: api/trending/players
        [HttpGet("players")]
        public async Task<ActionResult<IEnumerable<object>>> GetTrendingPlayers([FromQuery] int limit = 10)
        {
            var trendingPlayers = await _context.TrendingPlayers
                .Where(tp => tp.TrendingDate >= DateTime.Now.Date.AddDays(-7))
                .OrderByDescending(tp => tp.Score)
                .Take(limit)
                .Include(tp => tp.User)
                .Include(tp => tp.Game)
                .Select(tp => new
                {
                    tp.Id,
                    tp.Score,
                    tp.WinRate,
                    tp.TotalMatches,
                    User = new
                    {
                        tp.User!.Id,
                        tp.User.Username,
                        tp.User.FullName,
                        tp.User.AvatarUrl
                    },
                    Game = tp.Game != null ? new
                    {
                        tp.Game.Id,
                        tp.Game.Name,
                        tp.Game.IconUrl
                    } : null
                })
                .ToListAsync();

            return Ok(trendingPlayers);
        }

        // GET: api/trending/videos
        [HttpGet("videos")]
        public async Task<ActionResult<IEnumerable<object>>> GetTrendingVideos([FromQuery] int limit = 10)
        {
            var trendingVideos = await _context.TrendingItems
                .Where(t => t.ContentType == "video" && t.TrendingDate >= DateTime.Now.Date.AddDays(-7))
                .OrderByDescending(t => t.EngagementScore)
                .Take(limit)
                .Select(t => new
                {
                    t.Id,
                    t.ContentId,
                    t.ViewsCount,
                    t.EngagementScore,
                    Video = _context.Videos
                        .Where(v => v.Id == t.ContentId)
                        .Select(v => new
                        {
                            v.Id,
                            v.Title,
                            v.ThumbnailUrl,
                            v.ViewsCount,
                            v.LikesCount,
                            User = new
                            {
                                v.User.Id,
                                v.User.Username,
                                v.User.AvatarUrl
                            }
                        })
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(trendingVideos);
        }

        // GET: api/trending/posts
        [HttpGet("posts")]
        public async Task<ActionResult<IEnumerable<object>>> GetTrendingPosts([FromQuery] int limit = 10)
        {
            var trendingPosts = await _context.TrendingItems
                .Where(t => t.ContentType == "post" && t.TrendingDate >= DateTime.Now.Date.AddDays(-7))
                .OrderByDescending(t => t.EngagementScore)
                .Take(limit)
                .Select(t => new
                {
                    t.Id,
                    t.ContentId,
                    t.ViewsCount,
                    t.EngagementScore,
                    Post = _context.Posts
                        .Where(p => p.Id == t.ContentId)
                        .Select(p => new
                        {
                            p.Id,
                            p.Content,
                            p.LikesCount,
                            p.CommentsCount,
                            p.CreatedAt,
                            User = new
                            {
                                p.User.Id,
                                p.User.Username,
                                p.User.AvatarUrl
                            }
                        })
                        .FirstOrDefault()
                })
                .ToListAsync();

            return Ok(trendingPosts);
        }
    }
}
