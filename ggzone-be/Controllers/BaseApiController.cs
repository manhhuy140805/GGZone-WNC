using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ggzone_be.Controllers
{
    [ApiController]
    public abstract class BaseApiController : ControllerBase
    {
        /// <summary>
        /// Get current user ID from JWT claims
        /// </summary>
        protected Guid? GetCurrentUserId()
        {
            var userIdClaim = User.FindFirst("id")?.Value;
            if (string.IsNullOrEmpty(userIdClaim))
                return null;

            return Guid.TryParse(userIdClaim, out var userId) ? userId : null;
        }

        /// <summary>
        /// Get current username from JWT claims
        /// </summary>
        protected string? GetCurrentUsername()
        {
            return User.FindFirst("username")?.Value;
        }

        /// <summary>
        /// Get current user email from JWT claims
        /// </summary>
        protected string? GetCurrentUserEmail()
        {
            return User.FindFirst("email")?.Value;
        }

        /// <summary>
        /// Check if user is authenticated
        /// </summary>
        protected bool IsAuthenticated()
        {
            return User.Identity?.IsAuthenticated ?? false;
        }

        /// <summary>
        /// Get current user role from JWT claims
        /// </summary>
        protected string? GetCurrentUserRole()
        {
            return User.FindFirst(ClaimTypes.Role)?.Value;
        }
    }
}
