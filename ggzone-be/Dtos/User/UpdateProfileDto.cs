using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Dtos.User
{
    public class UpdateProfileDto
    {
        [MaxLength(100)]
        public string? FullName { get; set; }

        public string? Bio { get; set; }

        [MaxLength(100)]
        public string? Location { get; set; }

        [MaxLength(500)]
        public string? AvatarUrl { get; set; }

        [MaxLength(500)]
        public string? CoverImageUrl { get; set; }
    }
}
