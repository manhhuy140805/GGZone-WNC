using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    public class TournamentParticipant
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid TournamentId { get; set; }

        [Required]
        public Guid UserId { get; set; }

        public int? Rank { get; set; }

        public int Score { get; set; } = 0;

        public DateTime JoinedAt { get; set; } = DateTime.Now;

        // Navigation Properties
        [ForeignKey("TournamentId")]
        public virtual Tournament Tournament { get; set; }

        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}