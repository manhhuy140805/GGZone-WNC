using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class StreamFollower
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ChannelId { get; set; }
        public Guid UserId { get; set; }

        public DateTime FollowedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual LiveChannel Channel { get; set; }
        public virtual User User { get; set; }
    }
}
