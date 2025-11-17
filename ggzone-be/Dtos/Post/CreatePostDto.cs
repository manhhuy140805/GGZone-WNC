using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Dtos.Post
{
    public class CreatePostDto
    {
        public Guid? GroupId { get; set; }

        [Required]
        public string Content { get; set; }

        [MaxLength(20)]
        public string PostType { get; set; } = "text"; // 'text', 'video', 'image', 'gallery'

        [MaxLength(500)]
        public string? VideoUrl { get; set; }

        public List<string>? MediaUrls { get; set; } // For gallery
    }
}
