using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Xml.Linq;

namespace ggzone_be.Models
{
    [Table("PostMedia")]
    public class PostMedia
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid PostId { get; set; }

        [Required]
        [MaxLength(500)]
        public string MediaUrl { get; set; }

        [MaxLength(20)]
        public string? MediaType { get; set; }

        public int OrderIndex { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        [ForeignKey("PostId")]
        public virtual Post Post { get; set; }
    }
}