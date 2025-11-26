using System.ComponentModel.DataAnnotations;

namespace ggzone_be.Dtos.User
{
    public class UpdateStatusDto
    {
        [Required]
        [RegularExpression("^(online|offline|away|busy)$")]
        public string Status { get; set; }
    }
}
