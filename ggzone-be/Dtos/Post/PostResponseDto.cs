namespace ggzone_be.Dtos.Post
{
    public class PostResponseDto
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Username { get; set; }
        public string? FullName { get; set; }
        public string? AvatarUrl { get; set; }
        public Guid? GroupId { get; set; }
        public string? GroupName { get; set; }
        public string Content { get; set; }
        public string PostType { get; set; }
        public string? VideoUrl { get; set; }
        public int LikesCount { get; set; }
        public int CommentsCount { get; set; }
        public int SharesCount { get; set; }
        public bool IsPinned { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public List<string>? MediaUrls { get; set; }
        public bool IsLikedByCurrentUser { get; set; }
    }
}
