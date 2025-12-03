using ggzone_be.Dtos.User;
using ggzone_be.Helpers;
using ggzone_be.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        // GET: api/user/me - L?y thông tin user hi?n t?i
        [HttpGet("me")]
        [Authorize]
        public async Task<IActionResult> GetCurrentUser()
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var user = await _userService.GetByIdAsync(Guid.Parse(userId));
                if (user == null)
                    return NotFound(ApiResponse.ErrorResponse("User not found"));

                var userProfile = new UserProfileDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    Bio = user.Bio,
                    Location = user.Location,
                    Status = user.Status,
                    Role = user.Role,
                    IsVerified = user.IsVerified,
                    CreatedAt = user.CreatedAt,
                    Stats = user.UserStats != null ? new UserStatsDto
                    {
                        FriendsCount = user.UserStats.FriendsCount,
                        WinningCount = user.UserStats.WinningCount,
                        TournamentsCount = user.UserStats.TournamentsCount,
                        PostsCount = user.UserStats.PostsCount,
                        PhotosCount = user.UserStats.PhotosCount,
                        VideosCount = user.UserStats.VideosCount,
                        GroupsCount = user.UserStats.GroupsCount,
                        TotalPoints = user.UserStats.TotalPoints,
                        Level = user.UserStats.Level
                    } : null
                };

                return Ok(ApiResponse<UserProfileDto>.SuccessResponse(userProfile));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // GET: api/user/{id} - L?y thông tin user theo ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            try
            {
                var user = await _userService.GetByIdAsync(id);
                if (user == null)
                    return NotFound(ApiResponse.ErrorResponse("User not found"));

                var userProfile = new UserProfileDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    Bio = user.Bio,
                    Location = user.Location,
                    Status = user.Status,
                    Role = user.Role,
                    IsVerified = user.IsVerified,
                    CreatedAt = user.CreatedAt,
                    Stats = user.UserStats != null ? new UserStatsDto
                    {
                        FriendsCount = user.UserStats.FriendsCount,
                        WinningCount = user.UserStats.WinningCount,
                        TournamentsCount = user.UserStats.TournamentsCount,
                        PostsCount = user.UserStats.PostsCount,
                        PhotosCount = user.UserStats.PhotosCount,
                        VideosCount = user.UserStats.VideosCount,
                        GroupsCount = user.UserStats.GroupsCount,
                        TotalPoints = user.UserStats.TotalPoints,
                        Level = user.UserStats.Level
                    } : null
                };

                return Ok(ApiResponse<UserProfileDto>.SuccessResponse(userProfile));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // GET: api/user/username/{username} - L?y thông tin user theo username
        [HttpGet("username/{username}")]
        public async Task<IActionResult> GetUserByUsername(string username)
        {
            try
            {
                var user = await _userService.GetByUsernameAsync(username);
                if (user == null)
                    return NotFound(ApiResponse.ErrorResponse("User not found"));

                var userProfile = new UserProfileDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    Bio = user.Bio,
                    Location = user.Location,
                    Status = user.Status,
                    Role = user.Role,
                    IsVerified = user.IsVerified,
                    CreatedAt = user.CreatedAt,
                    Stats = user.UserStats != null ? new UserStatsDto
                    {
                        FriendsCount = user.UserStats.FriendsCount,
                        WinningCount = user.UserStats.WinningCount,
                        TournamentsCount = user.UserStats.TournamentsCount,
                        PostsCount = user.UserStats.PostsCount,
                        PhotosCount = user.UserStats.PhotosCount,
                        VideosCount = user.UserStats.VideosCount,
                        GroupsCount = user.UserStats.GroupsCount,
                        TotalPoints = user.UserStats.TotalPoints,
                        Level = user.UserStats.Level
                    } : null
                };

                return Ok(ApiResponse<UserProfileDto>.SuccessResponse(userProfile));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // GET: api/user - L?y danh sách users (có phân trang)
        [HttpGet]
        public async Task<IActionResult> GetAllUsers([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            try
            {
                var users = await _userService.GetAllUsersAsync(page, pageSize);
                var userProfiles = users.Select(user => new UserProfileDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    Bio = user.Bio,
                    Location = user.Location,
                    Status = user.Status,
                    Role = user.Role,
                    IsVerified = user.IsVerified,
                    CreatedAt = user.CreatedAt,
                    Stats = user.UserStats != null ? new UserStatsDto
                    {
                        FriendsCount = user.UserStats.FriendsCount,
                        WinningCount = user.UserStats.WinningCount,
                        TournamentsCount = user.UserStats.TournamentsCount,
                        PostsCount = user.UserStats.PostsCount,
                        PhotosCount = user.UserStats.PhotosCount,
                        VideosCount = user.UserStats.VideosCount,
                        GroupsCount = user.UserStats.GroupsCount,
                        TotalPoints = user.UserStats.TotalPoints,
                        Level = user.UserStats.Level
                    } : null
                });

                return Ok(ApiResponse<IEnumerable<UserProfileDto>>.SuccessResponse(userProfiles));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // GET: api/user/search?q=keyword - Tìm ki?m users
        [HttpGet("search")]
        public async Task<IActionResult> SearchUsers([FromQuery] string q, [FromQuery] int page = 1, [FromQuery] int pageSize = 20)
        {
            try
            {
                if (string.IsNullOrWhiteSpace(q))
                    return BadRequest(ApiResponse.ErrorResponse("Search term is required"));

                var users = await _userService.SearchUsersAsync(q, page, pageSize);
                var userProfiles = users.Select(user => new UserProfileDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    Bio = user.Bio,
                    Location = user.Location,
                    Status = user.Status,
                    Role = user.Role,
                    IsVerified = user.IsVerified,
                    CreatedAt = user.CreatedAt
                });

                return Ok(ApiResponse<IEnumerable<UserProfileDto>>.SuccessResponse(userProfiles));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // PUT: api/user/profile - C?p nh?t profile
        [HttpPut("profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileDto dto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    var errors = ModelState.Values.SelectMany(v => v.Errors);
                    return BadRequest(ApiResponse.ErrorResponse($"Validation failed: {string.Join(", ", errors.Select(e => e.ErrorMessage))}"));
                }

                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var user = await _userService.UpdateProfileAsync(Guid.Parse(userId), dto);
                
                var userProfile = new UserProfileDto
                {
                    Id = user.Id,
                    Username = user.Username,
                    Email = user.Email,
                    FullName = user.FullName,
                    AvatarUrl = user.AvatarUrl,
                    CoverImageUrl = user.CoverImageUrl,
                    Bio = user.Bio,
                    Location = user.Location,
                    Status = user.Status,
                    Role = user.Role,
                    IsVerified = user.IsVerified,
                    CreatedAt = user.CreatedAt
                };

                return Ok(ApiResponse<UserProfileDto>.SuccessResponse(userProfile, "Profile updated successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // PUT: api/user/password - Ð?i m?t kh?u
        [HttpPut("password")]
        [Authorize]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordDto dto)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                await _userService.ChangePasswordAsync(Guid.Parse(userId), dto);
                return Ok(ApiResponse.SuccessResponse("Password changed successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // PUT: api/user/status - C?p nh?t tr?ng thái online/offline
        [HttpPut("status")]
        [Authorize]
        public async Task<IActionResult> UpdateStatus([FromBody] UpdateStatusDto dto)
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var user = await _userService.UpdateStatusAsync(Guid.Parse(userId), dto.Status);
                return Ok(ApiResponse<object>.SuccessResponse(new { status = user.Status }, "Status updated successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        // DELETE: api/user - Xóa tài kho?n
        [HttpDelete]
        [Authorize]
        public async Task<IActionResult> DeleteAccount()
        {
            try
            {
                var userId = User.FindFirst("id")?.Value;
                if (string.IsNullOrEmpty(userId))
                    return Unauthorized(ApiResponse.ErrorResponse("Unauthorized"));

                var result = await _userService.DeleteUserAsync(Guid.Parse(userId));
                if (!result)
                    return NotFound(ApiResponse.ErrorResponse("User not found"));

                return Ok(ApiResponse.SuccessResponse("Account deleted successfully"));
            }
            catch (Exception ex)
            {
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }
    }
}

