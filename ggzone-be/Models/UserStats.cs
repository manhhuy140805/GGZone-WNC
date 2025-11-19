using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ggzone_be.Models
{
    public class UserStats
    {
        [Key]
        public Guid Id { get; set; } = Guid.NewGuid();

        [Required]
        public Guid UserId { get; set; }

        public int FriendsCount { get; set; } = 0;

        public int WinningCount { get; set; } = 0;

        public int TournamentsCount { get; set; } = 0;

        public int PostsCount { get; set; } = 0;

        public int PhotosCount { get; set; } = 0;

        public int VideosCount { get; set; } = 0;

        public int ForumsCount { get; set; } = 0;

        public int GroupsCount { get; set; } = 0;

        public int TotalPoints { get; set; } = 0;

        public int Level { get; set; } = 1;

        // Navigation Properties
        [ForeignKey("UserId")]
        public virtual User User { get; set; }
    }
}