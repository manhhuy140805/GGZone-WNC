using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BadgeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public BadgeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/badge/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUserBadges(Guid userId)
        {
            var badges = await _context.UserBadges
                .Where(b => b.UserId == userId)
                .OrderByDescending(b => b.AwardedAt)
                .Select(b => new
                {
                    b.Id,
                    b.BadgeName,
                    b.BadgeType,
                    b.IconUrl,
                    b.AwardedAt
                })
                .ToListAsync();

            return Ok(badges);
        }

        // GET: api/badge/all
        [HttpGet("all")]
        public async Task<ActionResult<IEnumerable<object>>> GetAllBadges()
        {
            var badges = await _context.UserBadges
                .Select(b => new { b.BadgeName, b.BadgeType, b.IconUrl })
                .Distinct()
                .ToListAsync();

            return Ok(badges);
        }

        // POST: api/badge
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<UserBadge>> AwardBadge([FromBody] UserBadge badge)
        {
            badge.Id = Guid.NewGuid();
            badge.AwardedAt = DateTime.UtcNow;

            _context.UserBadges.Add(badge);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUserBadges), new { userId = badge.UserId }, badge);
        }

        // DELETE: api/badge/{id}
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> RemoveBadge(Guid id)
        {
            var badge = await _context.UserBadges.FindAsync(id);
            if (badge == null)
                return NotFound();

            _context.UserBadges.Remove(badge);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
