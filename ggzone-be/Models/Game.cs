using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class Game
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        [Required]
        [MaxLength(100)]
        public string Slug { get; set; }

        public string? Description { get; set; }

        [MaxLength(500)]
        public string? CoverImageUrl { get; set; }

        [MaxLength(500)]
        public string? IconUrl { get; set; }

        [MaxLength(50)]
        public string? Genre { get; set; }

        [MaxLength(50)]
        public string? Platform { get; set; }

        public DateTime? ReleaseDate { get; set; }

        [MaxLength(100)]
        public string? Publisher { get; set; }

        public bool IsActive { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual ICollection<Photo> Photos { get; set; } = new List<Photo>();
        public virtual ICollection<LiveChannel> LiveChannels { get; set; } = new List<LiveChannel>();
        public virtual ICollection<MarketplaceItem> MarketplaceItems { get; set; } = new List<MarketplaceItem>();
        public virtual ICollection<StoreProduct> StoreProducts { get; set; } = new List<StoreProduct>();
        public virtual ICollection<Achievement> Achievements { get; set; } = new List<Achievement>();
        public virtual ICollection<Tournament> Tournaments { get; set; } = new List<Tournament>();
        public virtual ICollection<TrendingItem> TrendingItems { get; set; } = new List<TrendingItem>();
    }
}