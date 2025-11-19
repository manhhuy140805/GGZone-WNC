using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("ModerationQueue")]
    public class ModerationQueue
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string ContentType { get; set; } = string.Empty;

        [Required]
        public Guid ContentId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        [MaxLength(20)]
        public string Status { get; set; } = "pending"; // pending, approved, rejected

        [MaxLength(20)]
        public string Priority { get; set; } = "normal"; // low, normal, high, urgent

        public bool AutoFlagged { get; set; } = false;

        public string? FlagReason { get; set; }

        public Guid? ReviewedBy { get; set; }

        public DateTime? ReviewedAt { get; set; }

        public string? ReviewNotes { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("ReviewedBy")]
        public User? Reviewer { get; set; }
    }
}
