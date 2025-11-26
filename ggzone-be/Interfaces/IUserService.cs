using ggzone_be.Dtos.Auth;
using ggzone_be.Dtos.User;
using ggzone_be.Models;

namespace ggzone_be.Interfaces
{
    public interface IUserService
    {
        Task<User> RegisterAsync(RegisterDto dto);
        Task<string?> LoginAsync(LoginDto dto);
        Task<User?> GetByEmailAsync(string email);
        Task<User?> GetByIdAsync(Guid id);
        Task<User?> GetByUsernameAsync(string username);
        Task<IEnumerable<User>> GetAllUsersAsync(int page = 1, int pageSize = 20);
        Task<IEnumerable<User>> SearchUsersAsync(string searchTerm, int page = 1, int pageSize = 20);
        Task<User> UpdateProfileAsync(Guid userId, UpdateProfileDto dto);
        Task<bool> ChangePasswordAsync(Guid userId, ChangePasswordDto dto);
        Task<User> UpdateStatusAsync(Guid userId, string status);
        Task<bool> DeleteUserAsync(Guid userId);
    }
}
