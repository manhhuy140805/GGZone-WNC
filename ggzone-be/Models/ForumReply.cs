using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class ForumReply
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid TopicId { get; set; }
        public Guid UserId { get; set; }

        [Required]
        public string Content { get; set; }

        public int LikesCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual ForumTopic Topic { get; set; }
        public virtual User User { get; set; }
        public virtual User Author => User;
    }
}
