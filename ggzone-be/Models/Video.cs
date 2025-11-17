using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class Video
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid UserId { get; set; }
        public Guid? GameId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        public string? Description { get; set; }

        [Required]
        [MaxLength(500)]
        public string VideoUrl { get; set; }

        [MaxLength(500)]
        public string? ThumbnailUrl { get; set; }

        public int? Duration { get; set; } // in seconds

        public int ViewsCount { get; set; } = 0;
        public int LikesCount { get; set; } = 0;
        public int CommentsCount { get; set; } = 0;

        [MaxLength(50)]
        public string? Category { get; set; } // 'gameplay', 'tutorial', 'highlight', 'review'

        public bool IsPublic { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual User User { get; set; }
        public virtual Game? Game { get; set; }
        public virtual ICollection<VideoComment> VideoComments { get; set; } = new List<VideoComment>();
        public virtual ICollection<VideoLike> VideoLikes { get; set; } = new List<VideoLike>();
    }
}
