using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class StreamChatMessage
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid ChannelId { get; set; }
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(500)]
        public string Message { get; set; }

        [MaxLength(20)]
        public string MessageType { get; set; } = "text"; // 'text', 'emote', 'system'

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual LiveChannel Channel { get; set; }
        public virtual User User { get; set; }
    }
}
