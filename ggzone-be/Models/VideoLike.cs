using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class VideoLike
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid VideoId { get; set; }
        public Guid UserId { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation Properties
        public virtual Video Video { get; set; }
        public virtual User User { get; set; }
    }
}
