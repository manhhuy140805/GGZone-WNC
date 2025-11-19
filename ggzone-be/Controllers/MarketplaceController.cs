using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MarketplaceController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MarketplaceController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/marketplace
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetMarketplaceItems(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? category = null,
            [FromQuery] Guid? gameId = null,
            [FromQuery] string? status = "online")
        {
            var query = _context.MarketplaceItems.AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(m => m.Category == category);

            if (gameId.HasValue)
                query = query.Where(m => m.GameId == gameId);

            if (!string.IsNullOrEmpty(status))
                query = query.Where(m => m.Status == status);

            var items = await query
                .OrderByDescending(m => m.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(m => m.Seller)
                .Include(m => m.Game)
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    m.Description,
                    m.CoverImageUrl,
                    m.Category,
                    m.Price,
                    m.Rating,
                    m.ReviewsCount,
                    m.Status,
                    m.CreatedAt,
                    Seller = new
                    {
                        m.Seller.Id,
                        m.Seller.Username,
                        m.Seller.AvatarUrl
                    },
                    Game = m.Game != null ? new
                    {
                        m.Game.Id,
                        m.Game.Name,
                        m.Game.IconUrl
                    } : null
                })
                .ToListAsync();

            return Ok(items);
        }

        // GET: api/marketplace/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetMarketplaceItem(Guid id)
        {
            var item = await _context.MarketplaceItems
                .Include(m => m.Seller)
                .Include(m => m.Game)
                .Where(m => m.Id == id)
                .Select(m => new
                {
                    m.Id,
                    m.Title,
                    m.Description,
                    m.CoverImageUrl,
                    m.Category,
                    m.Price,
                    m.Rating,
                    m.ReviewsCount,
                    m.Status,
                    m.CreatedAt,
                    Seller = new
                    {
                        m.Seller.Id,
                        m.Seller.Username,
                        m.Seller.FullName,
                        m.Seller.AvatarUrl
                    },
                    Game = m.Game != null ? new
                    {
                        m.Game.Id,
                        m.Game.Name,
                        m.Game.IconUrl
                    } : null
                })
                .FirstOrDefaultAsync();

            if (item == null)
                return NotFound();

            return Ok(item);
        }

        // POST: api/marketplace
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<MarketplaceItem>> CreateMarketplaceItem([FromBody] MarketplaceItem item)
        {
            item.Id = Guid.NewGuid();
            item.CreatedAt = DateTime.UtcNow;
            item.UpdatedAt = DateTime.UtcNow;

            _context.MarketplaceItems.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMarketplaceItem), new { id = item.Id }, item);
        }

        // PUT: api/marketplace/{id}
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateMarketplaceItem(Guid id, [FromBody] MarketplaceItem item)
        {
            if (id != item.Id)
                return BadRequest();

            var existing = await _context.MarketplaceItems.FindAsync(id);
            if (existing == null)
                return NotFound();

            existing.Title = item.Title;
            existing.Description = item.Description;
            existing.Price = item.Price;
            existing.Category = item.Category;
            existing.Status = item.Status;
            existing.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/marketplace/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteMarketplaceItem(Guid id)
        {
            var item = await _context.MarketplaceItems.FindAsync(id);
            if (item == null)
                return NotFound();

            _context.MarketplaceItems.Remove(item);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/marketplace/{id}/reviews
        [HttpGet("{id}/reviews")]
        public async Task<ActionResult<IEnumerable<object>>> GetReviews(Guid id)
        {
            var reviews = await _context.MarketplaceReviews
                .Where(mr => mr.ItemId == id)
                .Include(mr => mr.User)
                .OrderByDescending(mr => mr.CreatedAt)
                .Select(mr => new
                {
                    mr.Id,
                    mr.Rating,
                    mr.Comment,
                    mr.CreatedAt,
                    User = new
                    {
                        mr.User.Id,
                        mr.User.Username,
                        mr.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(reviews);
        }

        // POST: api/marketplace/{id}/reviews
        [HttpPost("{id}/reviews")]
        [Authorize]
        public async Task<ActionResult<MarketplaceReview>> AddReview(Guid id, [FromBody] MarketplaceReview review)
        {
            review.Id = Guid.NewGuid();
            review.ItemId = id;
            review.CreatedAt = DateTime.UtcNow;

            _context.MarketplaceReviews.Add(review);
            await _context.SaveChangesAsync();

            // Update item rating
            var avgRating = await _context.MarketplaceReviews
                .Where(mr => mr.ItemId == id)
                .AverageAsync(mr => mr.Rating);

            var item = await _context.MarketplaceItems.FindAsync(id);
            if (item != null)
            {
                item.Rating = (decimal)avgRating;
                item.ReviewsCount++;
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetReviews), new { id }, review);
        }
    }
}
