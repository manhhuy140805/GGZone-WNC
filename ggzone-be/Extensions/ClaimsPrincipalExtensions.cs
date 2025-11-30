using System.Security.Claims;

namespace ggzone_be.Extensions
{
    public static class ClaimsPrincipalExtensions
    {
        public static Guid? GetUserId(this ClaimsPrincipal principal)
        {
            var userIdClaim = principal.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return null;

            return Guid.TryParse(userIdClaim, out var userId) ? userId : null;
        }

        public static string? GetUsername(this ClaimsPrincipal principal)
        {
            return principal.FindFirst("username")?.Value;
        }

        public static string? GetEmail(this ClaimsPrincipal principal)
        {
            return principal.FindFirst("email")?.Value;
        }

        public static string? GetRole(this ClaimsPrincipal principal)
        {
            return principal.FindFirst(ClaimTypes.Role)?.Value;
        }

        public static bool IsAdmin(this ClaimsPrincipal principal)
        {
            return principal.GetRole()?.Equals("Admin", StringComparison.OrdinalIgnoreCase) ?? false;
        }
    }
}
