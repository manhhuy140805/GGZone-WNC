using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace ggzone_be.Controllers
{
    [ApiController]
    [Route("api/groups")]
    public class GroupController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GroupController(AppDbContext context)
        {
            _context = context;
        }

        private Guid GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            return Guid.Parse(userIdClaim ?? Guid.Empty.ToString());
        }

        [HttpGet]
        public async Task<IActionResult> GetAllGroups()
        {
            var groups = await _context.Groups
                .OrderByDescending(g => g.MembersCount)
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.Description,
                    g.CoverImageUrl,
                    g.IconUrl,
                    g.Visibility,
                    g.MembersCount,
                    g.CreatedAt,
                    Creator = new
                    {
                        g.Creator!.Id,
                        g.Creator.Username,
                        g.Creator.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(groups);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            var group = await _context.Groups
                .Where(g => g.Id == id)
                .Select(g => new
                {
                    g.Id,
                    g.Name,
                    g.Description,
                    g.CoverImageUrl,
                    g.IconUrl,
                    g.Visibility,
                    g.MembersCount,
                    g.CreatedAt,
                    g.UpdatedAt,
                    Creator = new
                    {
                        g.Creator!.Id,
                        g.Creator.Username,
                        g.Creator.AvatarUrl
                    },
                    Members = g.Members.Select(gm => new
                    {
                        gm.Id,
                        gm.Role,
                        gm.JoinedAt,
                        User = new
                        {
                            gm.User.Id,
                            gm.User.Username,
                            gm.User.AvatarUrl
                        }
                    }).ToList()
                })
                .FirstOrDefaultAsync();

            if (group == null) return NotFound();

            return Ok(group);
        }

        [HttpGet("{id}/posts")]
        public async Task<IActionResult> GetGroupPosts(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var posts = await _context.Posts
                .Where(p => p.GroupId == id)
                .OrderByDescending(p => p.IsPinned)
                .ThenByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new
                {
                    p.Id,
                    p.Content,
                    p.PostType,
                    p.VideoUrl,
                    p.LikesCount,
                    p.CommentsCount,
                    p.SharesCount,
                    p.IsPinned,
                    p.CreatedAt,
                    p.UpdatedAt,
                    User = new
                    {
                        p.User.Id,
                        p.User.Username,
                        p.User.AvatarUrl
                    },
                    Media = p.Media.Select(m => new
                    {
                        m.Id,
                        m.MediaUrl,
                        m.MediaType,
                        m.OrderIndex
                    }).ToList()
                })
                .ToListAsync();

            return Ok(posts);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> CreateGroup([FromBody] CreateGroupDto dto)
        {
            var userId = GetCurrentUserId();

            var group = new Group
            {
                Name = dto.Name,
                Description = dto.Description,
                CoverImageUrl = dto.CoverImageUrl,
                IconUrl = dto.IconUrl,
                Visibility = dto.Visibility ?? "public",
                CreatedBy = userId,
                MembersCount = 1
            };

            _context.Groups.Add(group);

            // Add creator as admin
            var membership = new GroupMember
            {
                GroupId = group.Id,
                UserId = userId,
                Role = "admin"
            };

            _context.GroupMembers.Add(membership);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetGroupById), new { id = group.Id }, group);
        }

        [HttpPost("{id}/join")]
        [Authorize]
        public async Task<IActionResult> JoinGroup(Guid id)
        {
            var userId = GetCurrentUserId();

            var existingMember = await _context.GroupMembers
                .FirstOrDefaultAsync(gm => gm.GroupId == id && gm.UserId == userId);

            if (existingMember != null)
                return BadRequest("Already a member");

            var membership = new GroupMember
            {
                GroupId = id,
                UserId = userId,
                Role = "member"
            };

            _context.GroupMembers.Add(membership);

            var group = await _context.Groups.FindAsync(id);
            if (group != null)
            {
                group.MembersCount++;
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Joined group successfully" });
        }

        [HttpDelete("{id}/leave")]
        [Authorize]
        public async Task<IActionResult> LeaveGroup(Guid id)
        {
            var userId = GetCurrentUserId();

            var membership = await _context.GroupMembers
                .FirstOrDefaultAsync(gm => gm.GroupId == id && gm.UserId == userId);

            if (membership == null)
                return BadRequest("Not a member");

            _context.GroupMembers.Remove(membership);

            var group = await _context.Groups.FindAsync(id);
            if (group != null && group.MembersCount > 0)
            {
                group.MembersCount--;
            }

            await _context.SaveChangesAsync();

            return Ok(new { message = "Left group successfully" });
        }
    }

    public class CreateGroupDto
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? CoverImageUrl { get; set; }
        public string? IconUrl { get; set; }
        public string? Visibility { get; set; }
    }
}
