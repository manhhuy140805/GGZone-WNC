using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VideoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VideoController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/video
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetVideos(
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20,
            [FromQuery] string? category = null,
            [FromQuery] Guid? gameId = null)
        {
            var query = _context.Videos
                .Where(v => v.IsPublic)
                .AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(v => v.Category == category);

            if (gameId.HasValue)
                query = query.Where(v => v.GameId == gameId);

            var videos = await query
                .OrderByDescending(v => v.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(v => v.User)
                .Include(v => v.Game)
                .Select(v => new
                {
                    v.Id,
                    v.Title,
                    v.Description,
                    v.VideoUrl,
                    v.ThumbnailUrl,
                    v.Duration,
                    v.ViewsCount,
                    v.LikesCount,
                    v.CommentsCount,
                    v.Category,
                    v.CreatedAt,
                    User = new
                    {
                        v.User.Id,
                        v.User.Username,
                        v.User.FullName,
                        v.User.AvatarUrl
                    },
                    Game = v.Game != null ? new
                    {
                        v.Game.Id,
                        v.Game.Name,
                        v.Game.IconUrl
                    } : null
                })
                .ToListAsync();

            return Ok(videos);
        }

        // GET: api/video/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetVideo(Guid id)
        {
            var video = await _context.Videos
                .Include(v => v.User)
                .Include(v => v.Game)
                .Where(v => v.Id == id)
                .Select(v => new
                {
                    v.Id,
                    v.Title,
                    v.Description,
                    v.VideoUrl,
                    v.ThumbnailUrl,
                    v.Duration,
                    v.ViewsCount,
                    v.LikesCount,
                    v.CommentsCount,
                    v.Category,
                    v.IsPublic,
                    v.CreatedAt,
                    User = new
                    {
                        v.User.Id,
                        v.User.Username,
                        v.User.FullName,
                        v.User.AvatarUrl
                    },
                    Game = v.Game != null ? new
                    {
                        v.Game.Id,
                        v.Game.Name,
                        v.Game.IconUrl
                    } : null
                })
                .FirstOrDefaultAsync();

            if (video == null)
                return NotFound();

            // Increment view count
            var videoEntity = await _context.Videos.FindAsync(id);
            if (videoEntity != null)
            {
                videoEntity.ViewsCount++;
                await _context.SaveChangesAsync();
            }

            return Ok(video);
        }

        // POST: api/video
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Video>> CreateVideo([FromBody] Video video)
        {
            video.Id = Guid.NewGuid();
            video.CreatedAt = DateTime.UtcNow;
            video.UpdatedAt = DateTime.UtcNow;

            _context.Videos.Add(video);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVideo), new { id = video.Id }, video);
        }

        // GET: api/video/{id}/comments
        [HttpGet("{id}/comments")]
        public async Task<ActionResult<IEnumerable<object>>> GetVideoComments(Guid id)
        {
            var comments = await _context.VideoComments
                .Where(vc => vc.VideoId == id)
                .Include(vc => vc.User)
                .OrderByDescending(vc => vc.CreatedAt)
                .Select(vc => new
                {
                    vc.Id,
                    vc.Content,
                    vc.LikesCount,
                    vc.CreatedAt,
                    User = new
                    {
                        vc.User.Id,
                        vc.User.Username,
                        vc.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(comments);
        }

        // POST: api/video/{id}/comments
        [HttpPost("{id}/comments")]
        [Authorize]
        public async Task<ActionResult<VideoComment>> AddComment(Guid id, [FromBody] VideoComment comment)
        {
            comment.Id = Guid.NewGuid();
            comment.VideoId = id;
            comment.CreatedAt = DateTime.UtcNow;

            _context.VideoComments.Add(comment);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetVideoComments), new { id }, comment);
        }

        // POST: api/video/{id}/like
        [HttpPost("{id}/like")]
        [Authorize]
        public async Task<ActionResult> LikeVideo(Guid id, [FromBody] VideoLike like)
        {
            var existing = await _context.VideoLikes
                .FirstOrDefaultAsync(vl => vl.VideoId == id && vl.UserId == like.UserId);

            if (existing != null)
                return BadRequest("Already liked");

            like.Id = Guid.NewGuid();
            like.VideoId = id;
            like.CreatedAt = DateTime.UtcNow;

            _context.VideoLikes.Add(like);
            await _context.SaveChangesAsync();

            return Ok();
        }

        // DELETE: api/video/{id}/like
        [HttpDelete("{id}/like")]
        [Authorize]
        public async Task<ActionResult> UnlikeVideo(Guid id, [FromQuery] Guid userId)
        {
            var like = await _context.VideoLikes
                .FirstOrDefaultAsync(vl => vl.VideoId == id && vl.UserId == userId);

            if (like == null)
                return NotFound();

            _context.VideoLikes.Remove(like);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
