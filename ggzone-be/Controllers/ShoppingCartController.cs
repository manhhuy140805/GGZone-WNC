using ggzone_be.Data;
using ggzone_be.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ShoppingCartController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ShoppingCartController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/shoppingcart/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<object>> GetCart(Guid userId)
        {
            var cartItems = await _context.ShoppingCarts
                .Where(sc => sc.UserId == userId)
                .Include(sc => sc.Product)
                .Include(sc => sc.MarketplaceItem)
                .Select(sc => new
                {
                    sc.Id,
                    sc.Quantity,
                    sc.AddedAt,
                    Product = sc.Product != null ? new
                    {
                        sc.Product.Id,
                        sc.Product.Name,
                        sc.Product.CoverImageUrl,
                        sc.Product.Price,
                        sc.Product.Category,
                        Type = "product"
                    } : null,
                    MarketplaceItem = sc.MarketplaceItem != null ? new
                    {
                        sc.MarketplaceItem.Id,
                        sc.MarketplaceItem.Title,
                        sc.MarketplaceItem.CoverImageUrl,
                        sc.MarketplaceItem.Price,
                        sc.MarketplaceItem.Category,
                        Type = "marketplace"
                    } : null
                })
                .ToListAsync();

            var total = cartItems.Sum(item =>
                (item.Product?.Price ?? item.MarketplaceItem?.Price ?? 0) * item.Quantity);

            return Ok(new
            {
                Items = cartItems,
                TotalItems = cartItems.Count,
                TotalAmount = total
            });
        }

        // POST: api/shoppingcart
        [HttpPost]
        public async Task<ActionResult> AddToCart([FromBody] ShoppingCart cartItem)
        {
            // Check if item already in cart
            var existing = await _context.ShoppingCarts
                .FirstOrDefaultAsync(sc =>
                    sc.UserId == cartItem.UserId &&
                    ((sc.ProductId.HasValue && sc.ProductId == cartItem.ProductId) ||
                     (sc.MarketplaceItemId.HasValue && sc.MarketplaceItemId == cartItem.MarketplaceItemId)));

            if (existing != null)
            {
                // Update quantity
                existing.Quantity += cartItem.Quantity;
                await _context.SaveChangesAsync();
                return Ok(existing);
            }

            // Add new item
            cartItem.Id = Guid.NewGuid();
            cartItem.AddedAt = DateTime.UtcNow;

            _context.ShoppingCarts.Add(cartItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetCart), new { userId = cartItem.UserId }, cartItem);
        }

        // PUT: api/shoppingcart/{id}
        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCartItem(Guid id, [FromBody] int quantity)
        {
            var cartItem = await _context.ShoppingCarts.FindAsync(id);
            if (cartItem == null)
                return NotFound();

            cartItem.Quantity = quantity;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/shoppingcart/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> RemoveFromCart(Guid id)
        {
            var cartItem = await _context.ShoppingCarts.FindAsync(id);
            if (cartItem == null)
                return NotFound();

            _context.ShoppingCarts.Remove(cartItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/shoppingcart/user/{userId}
        [HttpDelete("user/{userId}")]
        public async Task<ActionResult> ClearCart(Guid userId)
        {
            var cartItems = await _context.ShoppingCarts
                .Where(sc => sc.UserId == userId)
                .ToListAsync();

            _context.ShoppingCarts.RemoveRange(cartItems);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
