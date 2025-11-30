using ggzone_be.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [ApiController]
    [Route("api/games")]
    public class GameController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GameController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGames()
        {
            var games = await _context.Games
                .Where(g => g.IsActive)
                .OrderBy(g => g.Name)
                .ToListAsync();

            return Ok(games);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGameById(Guid id)
        {
            var game = await _context.Games
                .FirstOrDefaultAsync(g => g.Id == id);

            if (game == null) return NotFound();

            return Ok(game);
        }

        [HttpGet("slug/{slug}")]
        public async Task<IActionResult> GetGameBySlug(string slug)
        {
            var game = await _context.Games
                .FirstOrDefaultAsync(g => g.Slug == slug);

            if (game == null) return NotFound();

            return Ok(game);
        }

        [HttpGet("trending")]
        public async Task<IActionResult> GetTrendingGames([FromQuery] int limit = 10)
        {
            var trendingGames = await _context.TrendingItems
                .Where(t => t.ContentType == "game" && t.TrendingDate >= DateTime.Now.AddDays(-7))
                .OrderByDescending(t => t.EngagementScore)
                .Take(limit)
                .Select(t => t.GameId)
                .ToListAsync();

            var games = await _context.Games
                .Where(g => trendingGames.Contains(g.Id))
                .ToListAsync();

            return Ok(games);
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchGames(
            [FromQuery] string q,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 12)
        {
            if (string.IsNullOrWhiteSpace(q))
                return BadRequest("Search query is required");

            var query = _context.Games
                .Where(g => g.IsActive && (
                    g.Name.Contains(q) ||
                    g.Description.Contains(q) ||
                    g.Genre.Contains(q)
                ))
                .OrderBy(g => g.Name);

            var total = await query.CountAsync();
            var games = await query
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                games,
                total,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling((double)total / pageSize)
            });
        }

        [HttpGet("filter")]
        public async Task<IActionResult> FilterGames(
            [FromQuery] string? genre,
            [FromQuery] string? platform,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 12)
        {
            var query = _context.Games.Where(g => g.IsActive);

            if (!string.IsNullOrWhiteSpace(genre))
                query = query.Where(g => g.Genre == genre);

            if (!string.IsNullOrWhiteSpace(platform))
                query = query.Where(g => g.Platform == platform);

            var total = await query.CountAsync();
            var games = await query
                .OrderBy(g => g.Name)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return Ok(new
            {
                games,
                total,
                page,
                pageSize,
                totalPages = (int)Math.Ceiling((double)total / pageSize)
            });
        }

        [HttpGet("genres")]
        public async Task<IActionResult> GetGenres()
        {
            var genres = await _context.Games
                .Where(g => g.IsActive)
                .Select(g => g.Genre)
                .Distinct()
                .OrderBy(g => g)
                .ToListAsync();

            return Ok(genres);
        }

        [HttpGet("platforms")]
        public async Task<IActionResult> GetPlatforms()
        {
            var platforms = await _context.Games
                .Where(g => g.IsActive)
                .Select(g => g.Platform)
                .Distinct()
                .OrderBy(p => p)
                .ToListAsync();

            return Ok(platforms);
        }
    }
}
