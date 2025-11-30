using ggzone_be.Models;

namespace ggzone_be.Mappers
{
    public static class UserMapper
    {
        public static object ToDto(User user, bool includeStats = false)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            var dto = new
            {
                id = user.Id,
                username = user.Username,
                email = user.Email,
                fullName = user.FullName,
                avatarUrl = user.AvatarUrl,
                coverImageUrl = user.CoverImageUrl,
                bio = user.Bio,
                location = user.Location,
                isVerified = user.IsVerified,
                createdAt = user.CreatedAt,
                stats = includeStats && user.UserStats != null ? new
                {
                    friendsCount = user.UserStats.FriendsCount,
                    postsCount = user.UserStats.PostsCount,
                    photosCount = user.UserStats.PhotosCount,
                    videosCount = user.UserStats.VideosCount,
                    groupsCount = user.UserStats.GroupsCount,
                    totalPoints = user.UserStats.TotalPoints,
                    level = user.UserStats.Level
                } : null
            };

            return dto;
        }

        public static object ToPublicDto(User user)
        {
            if (user == null)
                throw new ArgumentNullException(nameof(user));

            return new
            {
                id = user.Id,
                username = user.Username,
                fullName = user.FullName,
                avatarUrl = user.AvatarUrl,
                bio = user.Bio,
                isVerified = user.IsVerified
            };
        }

        public static async Task<IEnumerable<object>> ToDtoListAsync(IEnumerable<User> users, bool includeStats = false)
        {
            return await Task.FromResult(users.Select(u => ToDto(u, includeStats)));
        }

        public static IEnumerable<object> ToDtoList(IEnumerable<User> users, bool includeStats = false)
        {
            return users.Select(u => ToDto(u, includeStats));
        }
    }
}
