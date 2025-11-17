using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class VideoComment
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid VideoId { get; set; }
        public Guid UserId { get; set; }

        [Required]
        public string Content { get; set; }

        public int LikesCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual Video Video { get; set; }
        public virtual User User { get; set; }
    }
}
