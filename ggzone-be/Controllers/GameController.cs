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
                .Where(t => t.ContentType == "game" && t.TrendingDate >= DateTime.UtcNow.AddDays(-7))
                .OrderByDescending(t => t.EngagementScore)
                .Take(limit)
                .Select(t => t.GameId)
                .ToListAsync();

            var games = await _context.Games
                .Where(g => trendingGames.Contains(g.Id))
                .ToListAsync();

            return Ok(games);
        }
    }
}
