using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("EmailTemplates")]
    public class EmailTemplate
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(100)]
        public string TemplateName { get; set; } = string.Empty;

        [Required]
        [MaxLength(200)]
        public string Subject { get; set; } = string.Empty;

        [Required]
        public string HtmlBody { get; set; } = string.Empty;

        public string? TextBody { get; set; }

        [MaxLength(50)]
        public string? Category { get; set; }

        public string? Variables { get; set; } // JSON string

        public bool IsActive { get; set; } = true;

        public Guid? UpdatedBy { get; set; }

        public DateTime UpdatedAt { get; set; } = DateTime.Now;

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("UpdatedBy")]
        public User? Updater { get; set; }
    }
}
