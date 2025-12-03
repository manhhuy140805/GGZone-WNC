using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("UserPreferences")]
    public class UserPreference
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [MaxLength(20)]
        public string Theme { get; set; } = "light"; // light, dark, auto

        [MaxLength(10)]
        public string Language { get; set; } = "en";

        public bool EmailNotifications { get; set; } = true;

        public bool PushNotifications { get; set; } = true;

        [MaxLength(20)]
        public string PrivacyLevel { get; set; } = "public"; // public, friends, private

        public bool ShowOnlineStatus { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("UserId")]
        public User? User { get; set; }
    }
}
