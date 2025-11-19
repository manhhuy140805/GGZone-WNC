using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class ForumTopic
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid CategoryId { get; set; }
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        public string? Content { get; set; }

        public int ViewsCount { get; set; } = 0;
        public int ViewCount { get; set; } = 0;
        public int RepliesCount { get; set; } = 0;
        public int ReplyCount { get; set; } = 0;

        public bool IsPinned { get; set; } = false;
        public bool IsLocked { get; set; } = false;

        public DateTime? LastReplyAt { get; set; }
        public Guid? LastReplyBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual ForumCategory Category { get; set; }
        public virtual User User { get; set; }
        public virtual User Author => User;
        public virtual User? LastReplyUser { get; set; }
        public virtual ICollection<ForumReply> ForumReplies { get; set; } = new List<ForumReply>();
    }
}
