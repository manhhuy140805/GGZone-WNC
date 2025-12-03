using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("Announcements")]
    public class Announcement
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        [MaxLength(20)]
        public string? Type { get; set; } // info, warning, maintenance, update, event

        [MaxLength(20)]
        public string Priority { get; set; } = "normal"; // low, normal, high

        [MaxLength(20)]
        public string TargetAudience { get; set; } = "all"; // all, users, premium, moderators

        public bool IsActive { get; set; } = true;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public Guid? CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("CreatedBy")]
        public User? Creator { get; set; }
    }
}
