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
    public class OrderController : ControllerBase
    {
        private readonly AppDbContext _context;

        public OrderController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/order/{userId}
        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<object>>> GetUserOrders(Guid userId)
        {
            var orders = await _context.StoreOrders
                .Where(o => o.UserId == userId)
                .OrderByDescending(o => o.CreatedAt)
                .Include(o => o.User)
                .Select(o => new
                {
                    o.Id,
                    o.CreatedAt,
                    o.TotalAmount,
                    o.Status,
                    User = new
                    {
                        o.User.Id,
                        o.User.Username,
                        o.User.Email
                    }
                })
                .ToListAsync();

            return Ok(orders);
        }

        // GET: api/order/detail/{orderId}
        [HttpGet("detail/{orderId}")]
        public async Task<ActionResult<object>> GetOrderDetail(Guid orderId)
        {
            var order = await _context.StoreOrders
                .Include(o => o.User)
                .Where(o => o.Id == orderId)
                .Select(o => new
                {
                    o.Id,
                    o.CreatedAt,
                    o.TotalAmount,
                    o.Status,
                    User = new
                    {
                        o.User.Id,
                        o.User.Username,
                        o.User.Email
                    }
                })
                .FirstOrDefaultAsync();

            if (order == null)
                return NotFound();

            var items = await _context.OrderItems
                .Where(oi => oi.OrderId == orderId)
                .Include(oi => oi.Product)
                .Select(oi => new
                {
                    oi.Id,
                    oi.Quantity,
                    oi.UnitPrice,
                    oi.TotalPrice,
                    Product = new
                    {
                        oi.Product!.Id,
                        oi.Product.Name,
                        oi.Product.CoverImageUrl
                    }
                })
                .ToListAsync();

            return Ok(new { Order = order, Items = items });
        }

        // POST: api/order
        [HttpPost]
        public async Task<ActionResult<StoreOrder>> CreateOrder([FromBody] CreateOrderRequest request)
        {
            var order = new StoreOrder
            {
                Id = Guid.NewGuid(),
                UserId = request.UserId,
                CreatedAt = DateTime.Now,
                TotalAmount = request.TotalAmount,
                Status = "pending"
            };

            _context.StoreOrders.Add(order);

            foreach (var item in request.Items)
            {
                var orderItem = new OrderItem
                {
                    Id = Guid.NewGuid(),
                    OrderId = order.Id,
                    ProductId = item.ProductId,
                    Quantity = item.Quantity,
                    UnitPrice = item.Price,
                    TotalPrice = item.Price * item.Quantity
                };

                _context.OrderItems.Add(orderItem);
            }

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderDetail), new { orderId = order.Id }, order);
        }

        // PUT: api/order/{id}/status
        [HttpPut("{id}/status")]
        public async Task<ActionResult> UpdateOrderStatus(Guid id, [FromBody] string status)
        {
            var order = await _context.StoreOrders.FindAsync(id);
            if (order == null)
                return NotFound();

            order.Status = status;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // DELETE: api/order/{id}
        [HttpDelete("{id}")]
        public async Task<ActionResult> CancelOrder(Guid id)
        {
            var order = await _context.StoreOrders.FindAsync(id);
            if (order == null)
                return NotFound();

            if (order.Status != "pending")
                return BadRequest("Cannot cancel order that is not pending");

            order.Status = "cancelled";
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }

    public class CreateOrderRequest
    {
        public Guid UserId { get; set; }
        public decimal TotalAmount { get; set; }
        public List<OrderItemRequest> Items { get; set; } = new();
    }

    public class OrderItemRequest
    {
        public Guid ProductId { get; set; }
        public int Quantity { get; set; }
        public decimal Price { get; set; }
    }
}
