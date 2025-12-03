using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    [Table("FeaturedContent")]
    public class FeaturedContent
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        [MaxLength(50)]
        public string ContentType { get; set; } = string.Empty;

        [Required]
        public Guid ContentId { get; set; }

        [MaxLength(200)]
        public string? Title { get; set; }

        public string? Description { get; set; }

        [MaxLength(500)]
        public string? ImageUrl { get; set; }

        public int DisplayOrder { get; set; } = 0;

        public DateTime? StartDate { get; set; }

        public DateTime? EndDate { get; set; }

        public bool IsActive { get; set; } = true;

        public Guid? CreatedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;

        // Navigation property
        [ForeignKey("CreatedBy")]
        public User? Creator { get; set; }
    }
}
