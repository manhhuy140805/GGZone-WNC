using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class PhotoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public PhotoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/photo/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUserPhotos(
            Guid userId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var photos = await _context.Photos
                .Where(p => p.UserId == userId)
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(p => p.User)
                .Select(p => new
                {
                    p.Id,
                    p.ImageUrl,
                    p.Caption,
                    p.CreatedAt,
                    User = new
                    {
                        p.User.Id,
                        p.User.Username,
                        p.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(photos);
        }

        // GET: api/photo/detail/{id}
        [HttpGet("detail/{id}")]
        public async Task<ActionResult<object>> GetPhoto(Guid id)
        {
            var photo = await _context.Photos
                .Include(p => p.User)
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.ImageUrl,
                    p.Caption,
                    p.CreatedAt,
                    User = new
                    {
                        p.User.Id,
                        p.User.Username,
                        p.User.AvatarUrl
                    }
                })
                .FirstOrDefaultAsync();

            if (photo == null)
                return NotFound();

            return Ok(photo);
        }

        // POST: api/photo
        [HttpPost]
        public async Task<ActionResult<Photo>> UploadPhoto([FromBody] Photo photo)
        {
            photo.Id = Guid.NewGuid();
            photo.CreatedAt = DateTime.UtcNow;

            _context.Photos.Add(photo);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPhoto), new { id = photo.Id }, photo);
        }

        // PUT: api/photo/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePhoto(Guid id, [FromBody] Photo updatedPhoto)
        {
            var photo = await _context.Photos.FindAsync(id);
            if (photo == null)
                return NotFound();

            photo.Caption = updatedPhoto.Caption;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/photo/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePhoto(Guid id)
        {
            var photo = await _context.Photos.FindAsync(id);
            if (photo == null)
                return NotFound();

            _context.Photos.Remove(photo);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
