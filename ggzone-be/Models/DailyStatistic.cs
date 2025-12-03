using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("DailyStatistics")]
    public class DailyStatistic
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [Column(TypeName = "date")]
        public DateTime StatDate { get; set; }

        public int NewUsers { get; set; } = 0;

        public int ActiveUsers { get; set; } = 0;

        public int TotalPosts { get; set; } = 0;

        public int TotalComments { get; set; } = 0;

        public int TotalVideos { get; set; } = 0;

        public int TotalGameLaunches { get; set; } = 0;

        [Column(TypeName = "decimal(10,2)")]
        public decimal TotalRevenue { get; set; } = 0;

        public int TotalOrders { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.Now;
    }
}
