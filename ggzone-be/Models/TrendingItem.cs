using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    public class TrendingItem
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string ContentType { get; set; }

        [Required]
        public Guid ContentId { get; set; }

        public Guid? GameId { get; set; }

        public int ViewsCount { get; set; } = 0;

        [Column(TypeName = "decimal(10,2)")]
        public decimal EngagementScore { get; set; } = 0.0m;

        [Column(TypeName = "date")]
        public DateTime TrendingDate { get; set; } = DateTime.UtcNow.Date;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("GameId")]
        public virtual Game? Game { get; set; }
    }
}