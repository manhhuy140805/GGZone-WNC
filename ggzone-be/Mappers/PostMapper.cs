using ggzone_be.Models;

namespace ggzone_be.Mappers
{
    public static class PostMapper
    {
        public static object ToDto(Post post, Guid? currentUserId = null, bool isLiked = false)
        {
            if (post == null)
                throw new ArgumentNullException(nameof(post));

            return new
            {
                id = post.Id,
                content = post.Content,
                createdAt = post.CreatedAt,
                likesCount = post.LikesCount,
                commentsCount = post.CommentsCount,
                author = new
                {
                    id = post.User!.Id,
                    username = post.User.Username,
                    avatarUrl = post.User.AvatarUrl
                },
                media = post.Media
                    .OrderBy(m => m.OrderIndex)
                    .Select(m => new
                    {
                        id = m.Id,
                        mediaUrl = m.MediaUrl,
                        mediaType = m.MediaType
                    })
                    .ToList(),
                groupId = post.GroupId,
                isLiked = isLiked
            };
        }

        public static IEnumerable<object> ToDtoList(
            IEnumerable<Post> posts,
            Guid? currentUserId = null,
            Func<Guid, bool>? isLikedFunc = null)
        {
            return posts.Select(p => ToDto(
                p,
                currentUserId,
                isLikedFunc?.Invoke(p.Id) ?? false
            ));
        }
    }
}
