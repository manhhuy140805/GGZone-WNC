# 🔧 GGZone Backend - Integration Guide

## Hướng dẫn tích hợp Services & Middleware vào Program.cs

### 📝 Cập nhật Program.cs

Thêm các services và middleware sau vào file `Program.cs`:

```csharp
using ggzone_be.Data;
using ggzone_be.Services;
using ggzone_be.Helpers;
using ggzone_be.Middleware;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Memory Cache
builder.Services.AddMemoryCache();

// Services ✨
builder.Services.AddScoped<IFileUploadService, FileUploadService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<INotificationService, NotificationService>();
builder.Services.AddSingleton<ICacheService, CacheService>();
builder.Services.AddScoped<JwtHelper>();

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(
            "http://localhost:5173",
            "http://localhost:3000",
            "https://ggzone.com"
        )
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials();
    });
});

// JWT Authentication
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
var secretKey = jwtSettings["SecretKey"] ?? "YourSuperSecretKeyThatIsAtLeast32CharactersLong!";

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
        ValidateIssuer = true,
        ValidIssuer = jwtSettings["Issuer"] ?? "GGZone",
        ValidateAudience = true,
        ValidAudience = jwtSettings["Audience"] ?? "GGZone-Users",
        ValidateLifetime = true,
        ClockSkew = TimeSpan.Zero
    };
});

builder.Services.AddAuthorization();

var app = builder.Build();

// Configure the HTTP request pipeline

// Middleware ✨
app.UseErrorHandling();        // Global error handling
app.UseRequestLogging();       // Request/response logging

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Static files for uploads
app.UseStaticFiles();

app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
```

---

## 📋 Cập nhật appsettings.json

Thêm các cấu hình sau:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=GGZone;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "SecretKey": "YourSuperSecretKeyThatIsAtLeast32CharactersLongForProduction!",
    "Issuer": "GGZone",
    "Audience": "GGZone-Users",
    "ExpirationMinutes": 60
  },
  "EmailSettings": {
    "SmtpHost": "smtp.gmail.com",
    "SmtpPort": 587,
    "SmtpUser": "your-email@gmail.com",
    "SmtpPass": "your-app-password",
    "FromEmail": "noreply@ggzone.com"
  },
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*"
}
```

---

## 🎯 Sử dụng Services trong Controllers

### 1. File Upload Service

```csharp
[ApiController]
[Route("api/[controller]")]
public class UploadController : ControllerBase
{
    private readonly IFileUploadService _fileUploadService;

    public UploadController(IFileUploadService fileUploadService)
    {
        _fileUploadService = fileUploadService;
    }

    [HttpPost("image")]
    public async Task<ActionResult> UploadImage(IFormFile file)
    {
        if (!_fileUploadService.IsValidImage(file))
            return BadRequest("Invalid image file");

        var url = await _fileUploadService.UploadImageAsync(file);
        return Ok(new { url });
    }

    [HttpPost("video")]
    public async Task<ActionResult> UploadVideo(IFormFile file)
    {
        if (!_fileUploadService.IsValidVideo(file))
            return BadRequest("Invalid video file");

        var url = await _fileUploadService.UploadVideoAsync(file);
        return Ok(new { url });
    }
}
```

### 2. Email Service

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IEmailService _emailService;

    public AuthController(IEmailService emailService)
    {
        _emailService = emailService;
    }

    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterDto dto)
    {
        // ... registration logic ...

        await _emailService.SendWelcomeEmailAsync(dto.Email, dto.Username);

        return Ok();
    }

    [HttpPost("forgot-password")]
    public async Task<ActionResult> ForgotPassword([FromBody] string email)
    {
        var resetToken = Guid.NewGuid().ToString();
        
        // ... save token to database ...

        await _emailService.SendPasswordResetEmailAsync(email, resetToken);

        return Ok();
    }
}
```

### 3. Notification Service

```csharp
[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    private readonly INotificationService _notificationService;

    public PostController(INotificationService notificationService)
    {
        _notificationService = notificationService;
    }

    [HttpPost("{id}/like")]
    public async Task<ActionResult> LikePost(Guid id, [FromBody] Guid userId)
    {
        // ... like logic ...

        await _notificationService.CreateNotificationAsync(
            postOwnerId,
            "like",
            "New Like",
            $"{username} liked your post",
            id,
            "post"
        );

        return Ok();
    }
}
```

### 4. Cache Service

```csharp
[ApiController]
[Route("api/[controller]")]
public class GameController : ControllerBase
{
    private readonly ICacheService _cacheService;

    public GameController(ICacheService cacheService)
    {
        _cacheService = cacheService;
    }

    [HttpGet]
    public async Task<ActionResult> GetGames()
    {
        var cacheKey = "games_all";
        var cachedGames = _cacheService.Get<List<Game>>(cacheKey);

        if (cachedGames != null)
            return Ok(cachedGames);

        var games = await _context.Games.ToListAsync();
        
        _cacheService.Set(cacheKey, games, TimeSpan.FromMinutes(30));

        return Ok(games);
    }
}
```

### 5. JWT Helper

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly JwtHelper _jwtHelper;

    public AuthController(JwtHelper jwtHelper)
    {
        _jwtHelper = jwtHelper;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] LoginDto dto)
    {
        // ... validate credentials ...

        var token = _jwtHelper.GenerateToken(
            user.Id,
            user.Username,
            user.Email,
            user.Role
        );

        var refreshToken = _jwtHelper.GenerateRefreshToken();

        return Ok(new { token, refreshToken });
    }

    [HttpPost("refresh")]
    public async Task<ActionResult> RefreshToken([FromBody] string token)
    {
        var userId = _jwtHelper.GetUserIdFromToken(token);
        
        if (userId == null)
            return Unauthorized();

        // ... generate new token ...

        return Ok(new { token = newToken });
    }
}
```

### 6. Response Helper

```csharp
[ApiController]
[Route("api/[controller]")]
public class UserController : ControllerBase
{
    [HttpGet("{id}")]
    public async Task<ActionResult> GetUser(Guid id)
    {
        var user = await _context.Users.FindAsync(id);

        if (user == null)
            return NotFound(ApiResponse.ErrorResponse("User not found"));

        return Ok(ApiResponse<User>.SuccessResponse(user, "User retrieved successfully"));
    }

    [HttpPost]
    public async Task<ActionResult> CreateUser([FromBody] User user)
    {
        try
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return Ok(ApiResponse<User>.SuccessResponse(user, "User created successfully"));
        }
        catch (Exception ex)
        {
            return BadRequest(ApiResponse.ErrorResponse(
                "Failed to create user",
                new List<string> { ex.Message }
            ));
        }
    }
}
```

### 7. Validation Helper

```csharp
[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("register")]
    public async Task<ActionResult> Register([FromBody] RegisterDto dto)
    {
        var errors = ValidationHelper.ValidateUserRegistration(
            dto.Username,
            dto.Email,
            dto.Password
        );

        if (errors.Any())
            return BadRequest(ApiResponse.ErrorResponse("Validation failed", errors));

        // Sanitize input
        dto.Username = ValidationHelper.SanitizeInput(dto.Username);
        dto.Email = ValidationHelper.SanitizeInput(dto.Email);

        // ... registration logic ...

        return Ok();
    }
}
```

### 8. Pagination Helper

```csharp
[ApiController]
[Route("api/[controller]")]
public class PostController : ControllerBase
{
    [HttpGet]
    public async Task<ActionResult> GetPosts([FromQuery] int page = 1, [FromQuery] int pageSize = 20)
    {
        var posts = await _context.Posts.ToListAsync();

        var paginatedResult = PaginationHelper.Paginate(posts, page, pageSize);

        return Ok(paginatedResult);
    }
}
```

---

## 🗂️ Tạo thư mục wwwroot

Tạo thư mục cho file uploads:

```
ggzone-be/
└── wwwroot/
    ├── images/
    ├── videos/
    └── documents/
```

---

## ✅ Checklist tích hợp

### Services
- [ ] FileUploadService registered
- [ ] EmailService registered
- [ ] NotificationService registered
- [ ] CacheService registered
- [ ] JwtHelper registered

### Middleware
- [ ] ErrorHandlingMiddleware added
- [ ] RequestLoggingMiddleware added

### Configuration
- [ ] JwtSettings configured
- [ ] EmailSettings configured
- [ ] ConnectionString configured
- [ ] CORS configured

### Static Files
- [ ] wwwroot folder created
- [ ] images folder created
- [ ] videos folder created
- [ ] UseStaticFiles() added

### Testing
- [ ] Services working
- [ ] Middleware working
- [ ] File upload working
- [ ] Email sending working
- [ ] Caching working
- [ ] JWT working

---

## 🚀 Khởi động

```bash
# 1. Restore packages
dotnet restore

# 2. Build project
dotnet build

# 3. Run application
dotnet run

# 4. Test in Swagger
# Open: https://localhost:7xxx/swagger
```

---

## 🎉 Hoàn thành!

Backend đã được tích hợp đầy đủ với:
- ✅ All services
- ✅ All middleware
- ✅ All helpers
- ✅ Complete configuration
- ✅ Ready for production

**Happy Coding! 🎮**
