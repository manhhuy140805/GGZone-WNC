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
                .Include(g => g.Creator)
                .OrderByDescending(g => g.MembersCount)
                .ToListAsync();

            return Ok(groups);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetGroupById(Guid id)
        {
            var group = await _context.Groups
                .Include(g => g.Creator)
                .Include(g => g.Members)
                    .ThenInclude(gm => gm.User)
                .FirstOrDefaultAsync(g => g.Id == id);

            if (group == null) return NotFound();

            return Ok(group);
        }

        [HttpGet("{id}/posts")]
        public async Task<IActionResult> GetGroupPosts(Guid id, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            var posts = await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Media)
                .Where(p => p.GroupId == id)
                .OrderByDescending(p => p.IsPinned)
                .ThenByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
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
