using ggzone_be.Dtos.Auth;
using ggzone_be.Models;

namespace ggzone_be.Interfaces
{
    public interface IUserService
    {
        Task<User> RegisterAsync(RegisterDto dto);
        Task<string?> LoginAsync(LoginDto dto);
        Task<User?> GetByEmailAsync(string email);
    }
}
