using ggzone_be.Models;

namespace ggzone_be.Interfaces
{
    public interface IPostRepository
    {
        Task<List<Post>> GetAllPostsAsync();
        Task<List<Post>> GetUserFeedAsync(Guid userId, int page = 1, int pageSize = 20);
        Task<Post?> GetPostByIdAsync(Guid id);
        Task<Post> CreatePostAsync(Post post);
        Task<Post> UpdatePostAsync(Post post);
        Task<bool> DeletePostAsync(Guid id);
        Task<bool> LikePostAsync(Guid postId, Guid userId);
        Task<bool> UnlikePostAsync(Guid postId, Guid userId);
        Task<bool> IsPostLikedByUserAsync(Guid postId, Guid userId);
    }
}
