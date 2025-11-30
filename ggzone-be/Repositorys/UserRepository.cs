using ggzone_be.Data;
using ggzone_be.Interfaces;
using ggzone_be.Models;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Repositorys
{
    public class UserRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<User?> GetByIdAsync(Guid id)
        {
            return await _context.Users
                .Include(u => u.UserStats)
                .FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<User?> GetByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(u => u.UserStats)
                .FirstOrDefaultAsync(u => u.Username == username);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .Include(u => u.UserStats)
                .FirstOrDefaultAsync(u => u.Email == email);
        }

        public async Task<IEnumerable<User>> GetAllAsync(int page = 1, int pageSize = 20)
        {
            return await _context.Users
                .Include(u => u.UserStats)
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<IEnumerable<User>> SearchUsersAsync(string searchTerm, int page = 1, int pageSize = 20)
        {
            return await _context.Users
                .Include(u => u.UserStats)
                .Where(u => u.Username.Contains(searchTerm) || 
                           (u.FullName != null && u.FullName.Contains(searchTerm)) ||
                           u.Email.Contains(searchTerm))
                .OrderByDescending(u => u.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }

        public async Task<User> UpdateAsync(User user)
        {
            user.UpdatedAt = DateTime.Now;
            
            // Detach any existing tracked instance to avoid conflicts
            var existingUser = _context.Users.Local.FirstOrDefault(u => u.Id == user.Id);
            if (existingUser != null)
            {
                _context.Entry(existingUser).State = Microsoft.EntityFrameworkCore.EntityState.Detached;
            }

            // Use traditional update approach
            _context.Users.Update(user);
            await _context.SaveChangesAsync();
            
            // Reload the user to get updated values from database (including trigger updates)
            var updatedUser = await _context.Users.AsNoTracking().FirstOrDefaultAsync(u => u.Id == user.Id);
            return updatedUser ?? user;
        }

        public async Task<bool> DeleteAsync(Guid id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null) return false;

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ExistsAsync(Guid id)
        {
            return await _context.Users.AnyAsync(u => u.Id == id);
        }
    }
}
