using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("FriendSuggestions")]
    public class FriendSuggestion
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid SuggestedUserId { get; set; }

        [MaxLength(100)]
        public string? Reason { get; set; }

        [Column(TypeName = "decimal(5,2)")]
        public decimal Score { get; set; } = 0.0m;

        public bool IsShown { get; set; } = false;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation properties
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("SuggestedUserId")]
        public User? SuggestedUser { get; set; }
    }
}
