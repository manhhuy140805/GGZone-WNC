using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    public class MarketplaceItem
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid SellerId { get; set; }

        public Guid? GameId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Title { get; set; }

        public string? Description { get; set; }

        [MaxLength(500)]
        public string? CoverImageUrl { get; set; }

        [MaxLength(50)]
        public string? Category { get; set; }

        [Required]
        [Column(TypeName = "decimal(10,2)")]
        public decimal Price { get; set; }

        [Column(TypeName = "decimal(3,2)")]
        public decimal Rating { get; set; } = 0.0m;

        public int ReviewsCount { get; set; } = 0;

        [MaxLength(20)]
        public string Status { get; set; } = "online";

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        // Navigation Properties
        [ForeignKey("SellerId")]
        public virtual User Seller { get; set; }

        [ForeignKey("GameId")]
        public virtual Game? Game { get; set; }

        public virtual ICollection<MarketplaceReview> Reviews { get; set; } = new List<MarketplaceReview>();
    }
}