using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly AppDbContext _context;

        public StoreController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/store/products
        [HttpGet("products")]
        public async Task<ActionResult<IEnumerable<object>>> GetProducts(
            [FromQuery] string? category = null,
            [FromQuery] string? search = null,
            [FromQuery] int page = 1,
            [FromQuery] int pageSize = 20)
        {
            var query = _context.StoreProducts.AsQueryable();

            if (!string.IsNullOrEmpty(category))
                query = query.Where(p => p.Category == category);

            if (!string.IsNullOrEmpty(search))
                query = query.Where(p => p.Name.Contains(search) || p.Description.Contains(search));

            var products = await query
                .OrderByDescending(p => p.CreatedAt)
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.CoverImageUrl,
                    p.Category,
                    p.Status,
                    p.CreatedAt
                })
                .ToListAsync();

            return Ok(products);
        }

        // GET: api/store/products/{id}
        [HttpGet("products/{id}")]
        public async Task<ActionResult<object>> GetProduct(Guid id)
        {
            var product = await _context.StoreProducts
                .Where(p => p.Id == id)
                .Select(p => new
                {
                    p.Id,
                    p.Name,
                    p.Description,
                    p.Price,
                    p.CoverImageUrl,
                    p.Category,
                    p.Status,
                    p.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (product == null)
                return NotFound();

            return Ok(product);
        }

        // POST: api/store/products
        [HttpPost("products")]
        [Authorize]
        public async Task<ActionResult<StoreProduct>> CreateProduct([FromBody] StoreProduct product)
        {
            product.Id = Guid.NewGuid();
            product.CreatedAt = DateTime.UtcNow;

            _context.StoreProducts.Add(product);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProduct), new { id = product.Id }, product);
        }

        // PUT: api/store/products/{id}
        [HttpPut("products/{id}")]
        [Authorize]
        public async Task<ActionResult> UpdateProduct(Guid id, [FromBody] StoreProduct updatedProduct)
        {
            var product = await _context.StoreProducts.FindAsync(id);
            if (product == null)
                return NotFound();

            product.Name = updatedProduct.Name;
            product.Description = updatedProduct.Description;
            product.Price = updatedProduct.Price;
            product.CoverImageUrl = updatedProduct.CoverImageUrl;
            product.Category = updatedProduct.Category;
            product.Status = updatedProduct.Status;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/store/products/{id}
        [HttpDelete("products/{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteProduct(Guid id)
        {
            var product = await _context.StoreProducts.FindAsync(id);
            if (product == null)
                return NotFound();

            _context.StoreProducts.Remove(product);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/store/categories
        [HttpGet("categories")]
        public async Task<ActionResult<IEnumerable<string>>> GetCategories()
        {
            var categories = await _context.StoreProducts
                .Select(p => p.Category)
                .Distinct()
                .ToListAsync();

            return Ok(categories);
        }
    }
}
