using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Models
{
    public class ForumCategory
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

        public int DisplayOrder { get; set; } = 0;
        public int TopicsCount { get; set; } = 0;
        public int TopicCount { get; set; } = 0;
        public int PostsCount { get; set; } = 0;
        public int PostCount { get; set; } = 0;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        // Navigation Properties
        public virtual Game? Game { get; set; }
        public virtual ICollection<ForumTopic> ForumTopics { get; set; } = new List<ForumTopic>();
    }
}
