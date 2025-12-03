namespace ggzone_be.Dtos.User
{
    public class UserProfileDto
    {
        public Guid Id { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string? FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public string? CoverImageUrl { get; set; }
        public string? Bio { get; set; }
        public string? Location { get; set; }
        public string Status { get; set; }
        public string Role { get; set; }
        public bool IsVerified { get; set; }
        public DateTime CreatedAt { get; set; }
        public UserStatsDto? Stats { get; set; }
    }

    public class UserStatsDto
    {
        public int FriendsCount { get; set; }
        public int WinningCount { get; set; }
        public int TournamentsCount { get; set; }
        public int PostsCount { get; set; }
        public int PhotosCount { get; set; }
        public int VideosCount { get; set; }
        public int GroupsCount { get; set; }
        public int TotalPoints { get; set; }
        public int Level { get; set; }
    }
}
