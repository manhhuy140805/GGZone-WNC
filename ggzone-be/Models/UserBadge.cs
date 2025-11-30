using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("UserBadges")]
    public class UserBadge
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string BadgeName { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? BadgeType { get; set; } // verified, premium, moderator, developer, partner

        [MaxLength(500)]
        public string? IconUrl { get; set; }

        public DateTime AwardedAt { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
