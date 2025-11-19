using ggzone_be.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly AppDbContext _context;

        public SearchController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/search?q=query&type=all
        [HttpGet]
        public async Task<ActionResult<object>> Search(
            [FromQuery] string q,
            [FromQuery] string type = "all",
            [FromQuery] int limit = 10)
        {
            if (string.IsNullOrWhiteSpace(q))
                return BadRequest("Search query is required");

            var result = new
            {
                Users = type == "all" || type == "users" ? await SearchUsers(q, limit) : null,
                Games = type == "all" || type == "games" ? await SearchGames(q, limit) : null,
                Groups = type == "all" || type == "groups" ? await SearchGroups(q, limit) : null,
                Posts = type == "all" || type == "posts" ? await SearchPosts(q, limit) : null,
                Videos = type == "all" || type == "videos" ? await SearchVideos(q, limit) : null
            };

            return Ok(result);
        }

        private async Task<List<object>> SearchUsers(string query, int limit)
        {
            return await _context.Users
                .Where(u => u.Username.Contains(query) || u.FullName.Contains(query))
                .Take(limit)
                .Select(u => new
                {
                    u.Id,
                    u.Username,
                    u.FullName,
                    u.AvatarUrl,
                    Type = "user"
                })
                .ToListAsync<object>();
        }

        private async Task<List<object>> SearchGames(string query, int limit)
        {
            return await _context.Games
                .Where(g => g.Name.Contains(query) || g.Description.Contains(query))
                .Take(limit)
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.IconUrl,
                    g.Genre,
                    Type = "game"
                })
                .ToListAsync<object>();
        }

        private async Task<List<object>> SearchGroups(string query, int limit)
        {
            return await _context.Groups
                .Where(g => g.Name.Contains(query) || g.Description.Contains(query))
                .Take(limit)
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.CoverImageUrl,
                    g.MembersCount,
                    Type = "group"
                })
                .ToListAsync<object>();
        }

        private async Task<List<object>> SearchPosts(string query, int limit)
        {
            return await _context.Posts
                .Where(p => p.Content.Contains(query))
                .Take(limit)
                .Include(p => p.User)
                .Select(p => new
                {
                    p.Id,
                    p.Content,
                    p.CreatedAt,
                    User = new { p.User.Username, p.User.AvatarUrl },
                    Type = "post"
                })
                .ToListAsync<object>();
        }

        private async Task<List<object>> SearchVideos(string query, int limit)
        {
            return await _context.Videos
                .Where(v => v.Title.Contains(query) || v.Description.Contains(query))
                .Take(limit)
                .Include(v => v.User)
                .Select(v => new
                {
                    v.Id,
                    v.Title,
                    v.ThumbnailUrl,
                    v.ViewsCount,
                    User = new { v.User.Username },
                    Type = "video"
                })
                .ToListAsync<object>();
        }
    }
}
