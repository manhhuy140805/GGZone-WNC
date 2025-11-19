using System.Text.RegularExpressions;

namespace ggzone_be.Helpers
{
    public static class ValidationHelper
    {
        public static bool IsValidEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                return false;

            try
            {
                var regex = new Regex(@"^[^@\s]+@[^@\s]+\.[^@\s]+$");
                return regex.IsMatch(email);
            }
            catch
            {
                return false;
            }
        }

        public static bool IsValidUsername(string username)
        {
            if (string.IsNullOrWhiteSpace(username))
                return false;

            if (username.Length < 3 || username.Length > 20)
                return false;

            var regex = new Regex(@"^[a-zA-Z0-9_]+$");
            return regex.IsMatch(username);
        }

        public static bool IsValidUrl(string url)
        {
            if (string.IsNullOrWhiteSpace(url))
                return false;

            return Uri.TryCreate(url, UriKind.Absolute, out var uriResult)
                && (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }

        public static bool IsValidGuid(string guid)
        {
            return Guid.TryParse(guid, out _);
        }

        public static List<string> ValidatePostContent(string content)
        {
            var errors = new List<string>();

            if (string.IsNullOrWhiteSpace(content))
                errors.Add("Content cannot be empty");

            if (content?.Length > 5000)
                errors.Add("Content cannot exceed 5000 characters");

            return errors;
        }

        public static List<string> ValidateUserRegistration(string username, string email, string password)
        {
            var errors = new List<string>();

            if (!IsValidUsername(username))
                errors.Add("Username must be 3-20 characters and contain only letters, numbers, and underscores");

            if (!IsValidEmail(email))
                errors.Add("Invalid email format");

            if (!PasswordHelper.IsStrongPassword(password))
                errors.Add("Password must be at least 8 characters and contain uppercase, lowercase, digit, and special character");

            return errors;
        }

        public static string SanitizeInput(string input)
        {
            if (string.IsNullOrWhiteSpace(input))
                return string.Empty;

            // Remove potentially dangerous characters
            input = input.Trim();
            input = Regex.Replace(input, @"<script.*?>.*?</script>", "", RegexOptions.IgnoreCase);
            input = Regex.Replace(input, @"<.*?>", "");

            return input;
        }
    }
}
