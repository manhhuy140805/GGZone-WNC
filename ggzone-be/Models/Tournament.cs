using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    public class Tournament
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        public Guid? GameId { get; set; }

        [Required]
        [MaxLength(200)]
        public string Name { get; set; }

        public string? Description { get; set; }

        [MaxLength(500)]
        public string? CoverImageUrl { get; set; }

        [Required]
        public DateTime StartDate { get; set; }

        [Required]
        public DateTime EndDate { get; set; }

        public int? MaxParticipants { get; set; }

        public int CurrentParticipants { get; set; } = 0;

        [Column(TypeName = "decimal(10,2)")]
        public decimal? PrizePool { get; set; }

        [MaxLength(20)]
        public string Status { get; set; } = "upcoming";

        public Guid? CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("GameId")]
        public virtual Game? Game { get; set; }

        [ForeignKey("CreatedBy")]
        public virtual User? Creator { get; set; }

        public virtual ICollection<TournamentParticipant> Participants { get; set; } = new List<TournamentParticipant>();
    }
}