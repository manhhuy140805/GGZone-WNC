using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    public class Achievement
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string Name { get; set; }

        public string? Description { get; set; }

        [MaxLength(500)]
        public string? IconUrl { get; set; }

        public Guid? GameId { get; set; }

        [MaxLength(20)]
        public string? BadgeType { get; set; }

        public int Points { get; set; } = 0;

        public int MaxProgress { get; set; } = 20;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("GameId")]
        public virtual Game? Game { get; set; }

        public virtual ICollection<UserAchievement> UserAchievements { get; set; } = new List<UserAchievement>();
    }
}