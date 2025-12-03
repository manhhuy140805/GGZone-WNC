using ggzone_be.Data;
using ggzone_be.Dtos.Auth;
using ggzone_be.Dtos.User;
using ggzone_be.Interfaces;
using ggzone_be.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace ggzone_be.Services
{
    public class UserService : IUserService
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly IUserRepository _userRepository;

        public UserService(AppDbContext context, IConfiguration config, IUserRepository userRepository)
        {
            _context = context;
            _config = config;
            _userRepository = userRepository;
        }

        public async Task<User> RegisterAsync(RegisterDto dto)
        {
            // Ki?m tra email t?n t?i
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                throw new Exception("Email already exists");

            // Ki?m tra username t?n t?i
            if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
                throw new Exception("Username already exists");

            // Validate password length (BCrypt has 72 byte limit)
            if (string.IsNullOrEmpty(dto.Password) || dto.Password.Length > 72)
                throw new Exception("Password must be between 1 and 72 characters");

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FullName = dto.FullName,
                Status = "offline",
                Role = "user",
                CreatedAt = DateTime.Now,
                UpdatedAt = DateTime.Now,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // T?o UserStats m?c d?nh cho user m?i
            var userStats = new UserStats
            {
                UserId = user.Id,
                FriendsCount = 0,
                WinningCount = 0,
                TournamentsCount = 0,
                PostsCount = 0,
                PhotosCount = 0,
                VideosCount = 0,
                GroupsCount = 0,
                TotalPoints = 0,
                Level = 1
            };

            _context.UserStats.Add(userStats);
            await _context.SaveChangesAsync();

            return user;
        }

        public async Task<string?> LoginAsync(LoginDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Email == dto.Email);
            if (user == null) return null;

            // Validate password length before verification
            if (string.IsNullOrEmpty(dto.Password) || dto.Password.Length > 72)
                return null;

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;

            return CreateJwtToken(user);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _userRepository.GetByEmailAsync(email);
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _userRepository.GetByIdAsync(id);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _userRepository.GetByUsernameAsync(username);
        }

        public async Task<IEnumerable<User>> GetAllUsersAsync(int page = 1, int pageSize = 20)
        {
            return await _userRepository.GetAllAsync(page, pageSize);
        }

        public async Task<IEnumerable<User>> SearchUsersAsync(string searchTerm, int page = 1, int pageSize = 20)
        {
            return await _userRepository.SearchUsersAsync(searchTerm, page, pageSize);
        }

        public async Task<User> UpdateProfileAsync(Guid userId, UpdateProfileDto dto)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            // Update all fields from DTO
            user.FullName = dto.FullName ?? user.FullName;
            user.Bio = dto.Bio ?? user.Bio;
            user.Location = dto.Location ?? user.Location;
            user.AvatarUrl = dto.AvatarUrl ?? user.AvatarUrl;
            user.CoverImageUrl = dto.CoverImageUrl ?? user.CoverImageUrl;
            user.UpdatedAt = DateTime.Now;

            try
            {
                await _userRepository.UpdateAsync(user);
            }
            catch (Exception ex) when (ex.InnerException?.Message.Contains("trigger") == true)
            {
            }
            
            // Reload user to get updated values from database
            var updatedUser = await _userRepository.GetByIdAsync(userId);
            return updatedUser ?? user;
        }

        public async Task<bool> ChangePasswordAsync(Guid userId, ChangePasswordDto dto)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            // Validate password lengths
            if (string.IsNullOrEmpty(dto.CurrentPassword) || dto.CurrentPassword.Length > 72)
                throw new Exception("Current password is incorrect");

            if (string.IsNullOrEmpty(dto.NewPassword) || dto.NewPassword.Length > 72)
                throw new Exception("New password must be between 1 and 72 characters");

            if (!BCrypt.Net.BCrypt.Verify(dto.CurrentPassword, user.PasswordHash))
                throw new Exception("Current password is incorrect");

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.NewPassword);
            try
            {
                await _userRepository.UpdateAsync(user);
            }
            catch (Exception ex) when (ex.InnerException?.Message.Contains("trigger") == true)
            {
                // Ignore trigger errors for password change
            }
            return true;
        }

        public async Task<User> UpdateStatusAsync(Guid userId, string status)
        {
            var user = await _userRepository.GetByIdAsync(userId);
            if (user == null)
                throw new Exception("User not found");

            user.Status = status;
            await _userRepository.UpdateAsync(user);
            
            // Reload user to get updated values from database (in case of triggers)
            var updatedUser = await _userRepository.GetByIdAsync(userId);
            return updatedUser ?? user;
        }

        public async Task<bool> DeleteUserAsync(Guid userId)
        {
            return await _userRepository.DeleteAsync(userId);
        }

        private string CreateJwtToken(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("id", user.Id.ToString()),
                new Claim("username", user.Username),
                new Claim("email", user.Email),
                new Claim("role", user.Role)
            };

            var jwtKey = _config["Jwt:Key"] ?? throw new Exception("JWT Key not configured");
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var now = DateTime.UtcNow;
            var expires = now.AddDays(7);
            
            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                notBefore: now,
                expires: expires,
                signingCredentials: creds
            );

            // Log token creation time for debugging
            Console.WriteLine($"[JWT] Token created at: {now:yyyy-MM-dd HH:mm:ss} UTC");
            Console.WriteLine($"[JWT] Token expires at: {expires:yyyy-MM-dd HH:mm:ss} UTC");
            Console.WriteLine($"[JWT] Token lifetime: 7 days");

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
