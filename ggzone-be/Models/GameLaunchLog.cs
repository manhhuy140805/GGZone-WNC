using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    public class GameLaunchLog
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        [Required]
        public Guid GameId { get; set; }

        [MaxLength(50)]
        public string? LaunchMethod { get; set; } // desktop, web, mobile

        public DateTime LaunchedAt { get; set; } = DateTime.Now;

        public int? SessionDuration { get; set; } // in minutes

        public DateTime? EndedAt { get; set; }

        // Navigation Properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        [ForeignKey("GameId")]
        public virtual Game Game { get; set; }
    }
}
