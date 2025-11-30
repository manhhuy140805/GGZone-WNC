namespace ggzone_be.Constants
{
    public static class AppConstants
    {
        public static class Pagination
        {
            public const int DefaultPageSize = 10;
            public const int MaxPageSize = 100;
            public const int MinPageSize = 1;
        }

        public static class Upload
        {
            public const int MaxImageSizeMB = 10;
            public const int MaxVideoSizeMB = 100;
            public const long MaxImageSizeBytes = MaxImageSizeMB * 1024 * 1024;
            public const long MaxVideoSizeBytes = MaxVideoSizeMB * 1024 * 1024;

            public static readonly string[] AllowedImageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
            public static readonly string[] AllowedVideoExtensions = { ".mp4", ".mov", ".avi", ".mkv", ".webm" };
        }

        public static class Cache
        {
            public const int DefaultExpirationMinutes = 30;
            public const int ShortExpirationMinutes = 5;
            public const int LongExpirationMinutes = 120;
        }

        public static class Validation
        {
            public const int MinUsernameLength = 3;
            public const int MaxUsernameLength = 50;
            public const int MinPasswordLength = 6;
            public const int MaxPasswordLength = 100;
            public const int MaxBioLength = 500;
            public const int MaxPostContentLength = 5000;
            public const int MaxCommentLength = 1000;
        }

        public static class Messages
        {
            public const string Unauthorized = "Unauthorized access";
            public const string NotFound = "Resource not found";
            public const string BadRequest = "Invalid request";
            public const string InternalError = "Internal server error";
            public const string Success = "Operation completed successfully";
        }
    }
}
