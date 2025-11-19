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
    public class FriendshipController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FriendshipController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/friendship/{userId}/friends
        [HttpGet("{userId}/friends")]
        public async Task<ActionResult<IEnumerable<object>>> GetFriends(Guid userId)
        {
            var friends = await _context.Friendships
                .Where(f => (f.UserId == userId || f.FriendId == userId) && f.Status == "accepted")
                .Include(f => f.User)
                .Include(f => f.Friend)
                .Select(f => new
                {
                    FriendshipId = f.Id,
                    Friend = f.UserId == userId ? 
                        new
                        {
                            f.Friend!.Id,
                            f.Friend.Username,
                            f.Friend.FullName,
                            f.Friend.AvatarUrl,
                            f.Friend.Status
                        } :
                        new
                        {
                            f.User.Id,
                            f.User.Username,
                            f.User.FullName,
                            f.User.AvatarUrl,
                            f.User.Status
                        },
                    f.CreatedAt
                })
                .ToListAsync();

            return Ok(friends);
        }

        // GET: api/friendship/{userId}/requests
        [HttpGet("{userId}/requests")]
        public async Task<ActionResult<IEnumerable<object>>> GetFriendRequests(Guid userId)
        {
            var requests = await _context.Friendships
                .Where(f => f.FriendId == userId && f.Status == "pending")
                .Include(f => f.User)
                .Select(f => new
                {
                    f.Id,
                    f.CreatedAt,
                    User = new
                    {
                        f.User.Id,
                        f.User.Username,
                        f.User.FullName,
                        f.User.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(requests);
        }

        // GET: api/friendship/{userId}/sent
        [HttpGet("{userId}/sent")]
        public async Task<ActionResult<IEnumerable<object>>> GetSentRequests(Guid userId)
        {
            var sentRequests = await _context.Friendships
                .Where(f => f.UserId == userId && f.Status == "pending")
                .Include(f => f.Friend)
                .Select(f => new
                {
                    f.Id,
                    f.CreatedAt,
                    Friend = new
                    {
                        f.Friend!.Id,
                        f.Friend.Username,
                        f.Friend.FullName,
                        f.Friend.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(sentRequests);
        }

        // POST: api/friendship/send
        [HttpPost("send")]
        public async Task<ActionResult> SendFriendRequest([FromBody] Friendship friendship)
        {
            var existing = await _context.Friendships
                .FirstOrDefaultAsync(f => 
                    (f.UserId == friendship.UserId && f.FriendId == friendship.FriendId) ||
                    (f.UserId == friendship.FriendId && f.FriendId == friendship.UserId));

            if (existing != null)
                return BadRequest("Friendship already exists");

            friendship.Id = Guid.NewGuid();
            friendship.Status = "pending";
            friendship.CreatedAt = DateTime.UtcNow;

            _context.Friendships.Add(friendship);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Friend request sent" });
        }

        // PUT: api/friendship/{id}/accept
        [HttpPut("{id}/accept")]
        public async Task<ActionResult> AcceptFriendRequest(Guid id)
        {
            var friendship = await _context.Friendships.FindAsync(id);
            if (friendship == null)
                return NotFound();

            friendship.Status = "accepted";
            await _context.SaveChangesAsync();

            return Ok(new { message = "Friend request accepted" });
        }

        // PUT: api/friendship/{id}/decline
        [HttpPut("{id}/decline")]
        public async Task<ActionResult> DeclineFriendRequest(Guid id)
        {
            var friendship = await _context.Friendships.FindAsync(id);
            if (friendship == null)
                return NotFound();

            _context.Friendships.Remove(friendship);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/friendship/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveFriend(Guid id)
        {
            var friendship = await _context.Friendships.FindAsync(id);
            if (friendship == null)
                return NotFound();

            _context.Friendships.Remove(friendship);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/friendship/{userId}/suggestions
        [HttpGet("{userId}/suggestions")]
        public async Task<ActionResult<IEnumerable<object>>> GetFriendSuggestions(Guid userId)
        {
            var suggestions = await _context.FriendSuggestions
                .Where(fs => fs.UserId == userId && !fs.IsShown)
                .Include(fs => fs.SuggestedUser)
                .OrderByDescending(fs => fs.Score)
                .Take(10)
                .Select(fs => new
                {
                    fs.Id,
                    fs.Reason,
                    fs.Score,
                    User = new
                    {
                        fs.SuggestedUser!.Id,
                        fs.SuggestedUser.Username,
                        fs.SuggestedUser.FullName,
                        fs.SuggestedUser.AvatarUrl
                    }
                })
                .ToListAsync();

            return Ok(suggestions);
        }

        // PUT: api/friendship/suggestion/{id}/dismiss
        [HttpPut("suggestion/{id}/dismiss")]
        public async Task<ActionResult> DismissSuggestion(Guid id)
        {
            var suggestion = await _context.FriendSuggestions.FindAsync(id);
            if (suggestion == null)
                return NotFound();

            suggestion.IsShown = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
