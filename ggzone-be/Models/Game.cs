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

        // Play Now Feature Fields
        [MaxLength(20)]
        public string GameType { get; set; } = "desktop"; // desktop, web, mobile, browser

        [MaxLength(500)]
        public string? LaunchUrl { get; set; } // steam://, epic://, custom protocol

        [MaxLength(500)]
        public string? DownloadUrl { get; set; }

        [MaxLength(500)]
        public string? WebPlayUrl { get; set; }

        public long? InstallSize { get; set; } // Size in MB

        public string? MinimumRequirements { get; set; } // JSON format

        public string? RecommendedRequirements { get; set; } // JSON format

        [MaxLength(50)]
        public string? LauncherType { get; set; } // steam, epic, origin, custom, web

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation Properties
        public virtual ICollection<Photo> Photos { get; set; } = new List<Photo>();
        public virtual ICollection<StoreProduct> StoreProducts { get; set; } = new List<StoreProduct>();
        public virtual ICollection<Tournament> Tournaments { get; set; } = new List<Tournament>();
        public virtual ICollection<TrendingItem> TrendingItems { get; set; } = new List<TrendingItem>();
        public virtual ICollection<UserGameLibrary> UserGameLibraries { get; set; } = new List<UserGameLibrary>();
        public virtual ICollection<GameLaunchLog> GameLaunchLogs { get; set; } = new List<GameLaunchLog>();
        public virtual ICollection<GameReview> GameReviews { get; set; } = new List<GameReview>();
        public virtual ICollection<Video> Videos { get; set; } = new List<Video>();
        public virtual ICollection<TrendingPlayer> TrendingPlayers { get; set; } = new List<TrendingPlayer>();
    }
}