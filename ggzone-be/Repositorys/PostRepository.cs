using ggzone_be.Data;
using ggzone_be.Interfaces;
using ggzone_be.Models;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Repositorys
{
    public class PostRepository : IPostRepository
    {
        private readonly AppDbContext _context;

        public PostRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<Post>> GetAllPostsAsync()
        {
            return await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Group)
                .Include(p => p.Media)
                .OrderByDescending(p => p.CreatedAt)
                .ToListAsync();
        }

        public async Task<List<Post>> GetUserFeedAsync(Guid userId, int page = 1, int pageSize = 20)
        {
            // Get user's friends
            var friendIds = await _context.Friendships
                .Where(f => (f.UserId == userId || f.FriendId == userId) && f.Status == "accepted")
                .Select(f => f.UserId == userId ? f.FriendId : f.UserId)
                .ToListAsync();

            friendIds.Add(userId); // Include user's own posts

            return await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Group)
                .Include(p => p.Media)
                .Where(p => friendIds.Contains(p.UserId))
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<Post?> GetPostByIdAsync(Guid id)
        {
            return await _context.Posts
                .Include(p => p.User)
                .Include(p => p.Group)
                .Include(p => p.Media)
                .Include(p => p.Comments)
                    .ThenInclude(c => c.User)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<Post> CreatePostAsync(Post post)
        {
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<Post> UpdatePostAsync(Post post)
        {
            post.UpdatedAt = DateTime.Now;
            _context.Posts.Update(post);
            await _context.SaveChangesAsync();
            return post;
        }

        public async Task<bool> DeletePostAsync(Guid id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null) return false;

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> LikePostAsync(Guid postId, Guid userId)
        {
            var existingLike = await _context.PostLikes
                .FirstOrDefaultAsync(pl => pl.PostId == postId && pl.UserId == userId);

            if (existingLike != null) return false;

            var like = new PostLike
            {
                PostId = postId,
                UserId = userId
            };

            _context.PostLikes.Add(like);

            var post = await _context.Posts.FindAsync(postId);
            if (post != null)
            {
                post.LikesCount++;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UnlikePostAsync(Guid postId, Guid userId)
        {
            var like = await _context.PostLikes
                .FirstOrDefaultAsync(pl => pl.PostId == postId && pl.UserId == userId);

            if (like == null) return false;

            _context.PostLikes.Remove(like);

            var post = await _context.Posts.FindAsync(postId);
            if (post != null && post.LikesCount > 0)
            {
                post.LikesCount--;
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> IsPostLikedByUserAsync(Guid postId, Guid userId)
        {
            return await _context.PostLikes
                .AnyAsync(pl => pl.PostId == postId && pl.UserId == userId);
        }
    }
}
