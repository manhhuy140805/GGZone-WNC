using ggzone_be.Helpers;
using ggzone_be.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ggzone_be.Controllers
{
    [ApiController]
    [Route("api/upload")]
    public class UploadController : ControllerBase
    {
        private readonly ICloudinaryService _cloudinaryService;
        private readonly ILogger<UploadController> _logger;

        public UploadController(ICloudinaryService cloudinaryService, ILogger<UploadController> logger)
        {
            _cloudinaryService = cloudinaryService;
            _logger = logger;
        }

        [HttpPost("image")]
        [Authorize]
        public async Task<IActionResult> UploadImage(IFormFile file, [FromQuery] string folder = "ggzone")
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest(ApiResponse.ErrorResponse("No file provided"));

                // Validate file type
                var allowedExtensions = new[] { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                
                if (!allowedExtensions.Contains(fileExtension))
                    return BadRequest(ApiResponse.ErrorResponse("Invalid file type. Allowed: jpg, jpeg, png, gif, webp"));

                // Validate file size (max 5MB)
                if (file.Length > 5 * 1024 * 1024)
                    return BadRequest(ApiResponse.ErrorResponse("File size exceeds 5MB limit"));

                var imageUrl = await _cloudinaryService.UploadImageAsync(file, folder);

                if (string.IsNullOrEmpty(imageUrl))
                    return BadRequest(ApiResponse.ErrorResponse("Failed to upload image"));

                return Ok(ApiResponse<object>.SuccessResponse(new { url = imageUrl }, "Image uploaded successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Upload error: {ex.Message}");
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        [HttpPost("video")]
        [Authorize]
        public async Task<IActionResult> UploadVideo(IFormFile file, [FromQuery] string folder = "ggzone/videos")
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest(ApiResponse.ErrorResponse("No file provided"));

                // Validate file type
                var allowedExtensions = new[] { ".mp4", ".avi", ".mov", ".mkv", ".webm", ".flv", ".wmv" };
                var fileExtension = Path.GetExtension(file.FileName).ToLower();
                
                if (!allowedExtensions.Contains(fileExtension))
                    return BadRequest(ApiResponse.ErrorResponse("Invalid file type. Allowed: mp4, avi, mov, mkv, webm, flv, wmv"));

                // Validate file size (max 500MB)
                if (file.Length > 500 * 1024 * 1024)
                    return BadRequest(ApiResponse.ErrorResponse("File size exceeds 500MB limit"));

                var (videoUrl, thumbnailUrl, duration) = await _cloudinaryService.UploadVideoAsync(file, folder);

                if (string.IsNullOrEmpty(videoUrl))
                    return BadRequest(ApiResponse.ErrorResponse("Failed to upload video"));

                return Ok(ApiResponse<object>.SuccessResponse(new 
                { 
                    videoUrl, 
                    thumbnailUrl, 
                    duration 
                }, "Video uploaded successfully"));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Video upload error: {ex.Message}");
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }

        [HttpPost("test")]
        public async Task<IActionResult> TestUpload(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                    return BadRequest(ApiResponse.ErrorResponse("No file provided"));

                var imageUrl = await _cloudinaryService.UploadImageAsync(file, "ggzone-test");

                if (string.IsNullOrEmpty(imageUrl))
                    return BadRequest(ApiResponse.ErrorResponse("Failed to upload image"));

                return Ok(ApiResponse<object>.SuccessResponse(new { url = imageUrl }, "Test upload successful"));
            }
            catch (Exception ex)
            {
                _logger.LogError($"Test upload error: {ex.Message}");
                return BadRequest(ApiResponse.ErrorResponse(ex.Message));
            }
        }
    }
}
