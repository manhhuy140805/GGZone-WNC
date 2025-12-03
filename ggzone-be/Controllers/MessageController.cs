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
    public class MessageController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MessageController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/message/{userId}/conversations
        [HttpGet("{userId}/conversations")]
        public async Task<ActionResult<IEnumerable<object>>> GetConversations(Guid userId)
        {
            var conversations = await _context.Messages
                .Where(m => m.SenderId == userId || m.ReceiverId == userId)
                .GroupBy(m => m.SenderId == userId ? m.ReceiverId : m.SenderId)
                .Select(g => new
                {
                    UserId = g.Key,
                    LastMessage = g.OrderByDescending(m => m.CreatedAt).First(),
                    UnreadCount = g.Count(m => m.ReceiverId == userId && !m.IsRead)
                })
                .ToListAsync();

            var result = new List<object>();
            foreach (var conv in conversations)
            {
                var user = await _context.Users.FindAsync(conv.UserId);
                if (user != null)
                {
                    result.Add(new
                    {
                        User = new
                        {
                            user.Id,
                            user.Username,
                            user.FullName,
                            user.AvatarUrl,
                            user.Status
                        },
                        LastMessage = new
                        {
                            conv.LastMessage.Id,
                            conv.LastMessage.Content,
                            conv.LastMessage.CreatedAt,
                            conv.LastMessage.IsRead,
                            IsFromMe = conv.LastMessage.SenderId == userId
                        },
                        conv.UnreadCount
                    });
                }
            }

            return Ok(result.OrderByDescending(r => ((dynamic)r).LastMessage.CreatedAt));
        }

        // GET: api/message/{userId}/with/{otherUserId}
        [HttpGet("{userId}/with/{otherUserId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetMessages(
            Guid userId, 
            Guid otherUserId,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 50)
        {
            var messages = await _context.Messages
                .Where(m => 
                    (m.SenderId == userId && m.ReceiverId == otherUserId) ||
                    (m.SenderId == otherUserId && m.ReceiverId == userId))
                .OrderByDescending(m => m.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Include(m => m.Sender)
                .Include(m => m.Receiver)
                .Select(m => new
                {
                    m.Id,
                    m.Content,
                    m.IsRead,
                    m.CreatedAt,
                    IsFromMe = m.SenderId == userId,
                    Sender = new
                    {
                        m.Sender.Id,
                        m.Sender.Username,
                        m.Sender.AvatarUrl
                    },
                    Receiver = new
                    {
                        m.Receiver.Id,
                        m.Receiver.Username,
                        m.Receiver.AvatarUrl
                    }
                })
                .ToListAsync();

            // Mark messages as read
            var unreadMessages = await _context.Messages
                .Where(m => m.SenderId == otherUserId && m.ReceiverId == userId && !m.IsRead)
                .ToListAsync();

            foreach (var message in unreadMessages)
            {
                message.IsRead = true;
            }

            if (unreadMessages.Any())
            {
                await _context.SaveChangesAsync();
            }

            return Ok(messages.OrderBy(m => m.CreatedAt));
        }

        // POST: api/message
        [HttpPost]
        public async Task<ActionResult<Message>> SendMessage([FromBody] Message message)
        {
            message.Id = Guid.NewGuid();
            message.CreatedAt = DateTime.Now;
            message.IsRead = false;

            _context.Messages.Add(message);
            await _context.SaveChangesAsync();

            // Create notification for receiver
            var sender = await _context.Users.FindAsync(message.SenderId);
            if (sender != null)
            {
                var notification = new Notification
                {
                    Id = Guid.NewGuid(),
                    UserId = message.ReceiverId,
                    Type = "message",
                    Title = "New Message",
                    Content = $"{sender.Username} sent you a message",
                    RelatedId = message.Id,
                    RelatedType = "message",
                    IsRead = false,
                    CreatedAt = DateTime.Now
                };

                _context.Notifications.Add(notification);
                await _context.SaveChangesAsync();
            }

            return CreatedAtAction(nameof(GetMessages), 
                new { userId = message.SenderId, otherUserId = message.ReceiverId }, message);
        }

        // PUT: api/message/{id}/read
        [HttpPut("{id}/read")]
        public async Task<ActionResult> MarkAsRead(Guid id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
                return NotFound();

            message.IsRead = true;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/message/{userId}/unread-count
        [HttpGet("{userId}/unread-count")]
        public async Task<ActionResult<int>> GetUnreadCount(Guid userId)
        {
            var count = await _context.Messages
                .CountAsync(m => m.ReceiverId == userId && !m.IsRead);

            return Ok(new { count });
        }

        // DELETE: api/message/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessage(Guid id)
        {
            var message = await _context.Messages.FindAsync(id);
            if (message == null)
                return NotFound();

            _context.Messages.Remove(message);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
