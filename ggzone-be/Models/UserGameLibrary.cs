using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("UserGameLibrary")]
    public class UserGameLibrary
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid GameId { get; set; }

        public bool IsInstalled { get; set; } = false;

        [MaxLength(500)]
        public string? InstallPath { get; set; }

        public DateTime? LastPlayed { get; set; }

        public int TotalPlayTime { get; set; } = 0; // in minutes

        public bool IsFavorite { get; set; } = false;

        public DateTime AddedAt { get; set; } = DateTime.Now;

        // Navigation Properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("GameId")]
        public virtual Game Game { get; set; }
    }
}
