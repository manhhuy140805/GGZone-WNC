using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("TrendingPlayers")]
    public class TrendingPlayer
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        public Guid? GameId { get; set; }

        public int Rank { get; set; } = 0;

        public int Score { get; set; } = 0;

        [Column(TypeName = "decimal(5,2)")]
        public decimal WinRate { get; set; } = 0.0m;

        public int TotalMatches { get; set; } = 0;

        [Column(TypeName = "date")]
        public DateTime TrendingDate { get; set; } = DateTime.Now.Date;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation properties
        [ForeignKey("UserId")]
        public User? User { get; set; }

        [ForeignKey("GameId")]
        public Game? Game { get; set; }
    }
}
