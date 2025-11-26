using ggzone_be.Data;
using ggzone_be.Dtos.Auth;
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

        public UserService(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<User> RegisterAsync(RegisterDto dto)
        {
            // Kiểm tra email tồn tại
            if (await _context.Users.AnyAsync(u => u.Email == dto.Email))
                throw new Exception("Email already exists");

            // Kiểm tra username tồn tại
            if (await _context.Users.AnyAsync(u => u.Username == dto.Username))
                throw new Exception("Username already exists");

            var user = new User
            {
                Username = dto.Username,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                FullName = dto.FullName,
                Status = "offline",
                Role = "user",
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };

            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            // Tạo UserStats mặc định cho user mới
            var userStats = new UserStats
            {
                UserId = user.Id,
                FriendsCount = 0,
                WinningCount = 0,
                TournamentsCount = 0,
                PostsCount = 0,
                PhotosCount = 0,
                VideosCount = 0,
                ForumsCount = 0,
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

            if (!BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return null;

            return CreateJwtToken(user);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users.FirstOrDefaultAsync(x => x.Email == email);
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

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _config["Jwt:Issuer"],
                audience: _config["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddDays(7),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
