using ggzone_be.Dtos.Auth;
using ggzone_be.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace ggzone_be.Controllers
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _service;

        public AuthController(IUserService service)
        {
            _service = service;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterDto dto)
        {
            var user = await _service.RegisterAsync(dto);
            return Ok(new
            {
                user.Id,
                user.Username,
                user.Email
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginDto dto)
        {
            var token = await _service.LoginAsync(dto);

            if (token == null)
                return Unauthorized(new { message = "Email hoặc mật khẩu không đúng!" });

            return Ok(new { token });
        }

        // TEMPORARY: Generate BCrypt hash for testing
        [HttpGet("generate-hash")]
        public IActionResult GenerateHash([FromQuery] string password = "password123")
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            var verify = BCrypt.Net.BCrypt.Verify(password, hash);
            
            return Ok(new 
            { 
                password = password,
                hash = hash,
                verificationTest = verify
            });
        }
    }
}
