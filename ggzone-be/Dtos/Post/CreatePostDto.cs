namespace ggzone_be.Dtos.Post
{
    public class CreatePostDto
    {
        public required string Content { get; set; }
        public Guid? GroupId { get; set; }
        public List<MediaUrlDto>? MediaUrls { get; set; }
    }

    public class MediaUrlDto
    {
        public required string Url { get; set; }
        public string Type { get; set; } = "image";
    }
}
