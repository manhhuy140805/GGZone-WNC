using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using CloudinaryDotNet.Core;

namespace ggzone_be.Services
{
    public interface ICloudinaryService
    {
        Task<string?> UploadImageAsync(IFormFile file, string folder = "ggzone");
        Task<bool> DeleteImageAsync(string publicId);
        Task<(string? videoUrl, string? thumbnailUrl, int? duration)> UploadVideoAsync(IFormFile file, string folder = "ggzone/videos");
        Task<bool> DeleteVideoAsync(string publicId);
    }

    public class CloudinaryService : ICloudinaryService
    {
        private readonly Cloudinary _cloudinary;
        private readonly ILogger<CloudinaryService> _logger;

        public CloudinaryService(IConfiguration config, ILogger<CloudinaryService> logger)
        {
            _logger = logger;
            var cloudName = config["Cloudinary:CloudName"];
            var apiKey = config["Cloudinary:ApiKey"];
            var apiSecret = config["Cloudinary:ApiSecret"];

            if (string.IsNullOrEmpty(cloudName) || string.IsNullOrEmpty(apiKey) || string.IsNullOrEmpty(apiSecret))
            {
                throw new InvalidOperationException("Cloudinary credentials not configured");
            }

            var account = new Account(cloudName, apiKey, apiSecret);
            _cloudinary = new Cloudinary(account);
        }

        public async Task<string?> UploadImageAsync(IFormFile file, string folder = "ggzone")
        {
            try
            {
                if (file == null || file.Length == 0)
                    return null;

                // Copy file to memory stream to avoid stream disposal issues
                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    memoryStream.Position = 0;

                    var uploadParams = new ImageUploadParams()
                    {
                        File = new FileDescription(file.FileName, memoryStream),
                        Folder = folder,
                        Transformation = new Transformation()
                            .Quality("auto")
                    };

                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                    if (uploadResult.Error != null)
                    {
                        _logger.LogError($"Cloudinary upload error: {uploadResult.Error.Message}");
                        return null;
                    }

                    if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
                    {
                        _logger.LogError($"Cloudinary upload failed with status: {uploadResult.StatusCode}");
                        return null;
                    }

                    return uploadResult.SecureUrl.ToString();
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error uploading to Cloudinary: {ex.Message}");
                return null;
            }
        }

        public async Task<bool> DeleteImageAsync(string publicId)
        {
            try
            {
                var deleteParams = new DeletionParams(publicId);
                var result = await _cloudinary.DestroyAsync(deleteParams);
                return result.Result == "ok";
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting from Cloudinary: {ex.Message}");
                return false;
            }
        }

        public async Task<(string? videoUrl, string? thumbnailUrl, int? duration)> UploadVideoAsync(IFormFile file, string folder = "ggzone/videos")
        {
            try
            {
                if (file == null || file.Length == 0)
                    return (null, null, null);

                using (var memoryStream = new MemoryStream())
                {
                    await file.CopyToAsync(memoryStream);
                    memoryStream.Position = 0;

                    var uploadParams = new VideoUploadParams()
                    {
                        File = new FileDescription(file.FileName, memoryStream),
                        Folder = folder,
                        Transformation = new Transformation()
                            .Quality("auto")
                            .FetchFormat("mp4")
                    };

                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                    if (uploadResult.Error != null)
                    {
                        _logger.LogError($"Cloudinary video upload error: {uploadResult.Error.Message}");
                        return (null, null, null);
                    }

                    if (uploadResult.StatusCode != System.Net.HttpStatusCode.OK)
                    {
                        _logger.LogError($"Cloudinary video upload failed with status: {uploadResult.StatusCode}");
                        return (null, null, null);
                    }

                    var videoUrl = uploadResult.SecureUrl.ToString();
                    var duration = uploadResult.Duration;

                    // Generate thumbnail URL from video
                    var thumbnailUrl = new Url(_cloudinary.Api.Account.Cloud)
                        .Transform(new Transformation()
                            .Width(320)
                            .Height(180)
                            .Crop("fill")
                            .Quality("auto")
                            .Delay(2)) // Get frame at 2 seconds
                        .BuildUrl(uploadResult.PublicId + ".jpg");

                    return (videoUrl, thumbnailUrl, (int?)duration);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error uploading video to Cloudinary: {ex.Message}");
                return (null, null, null);
            }
        }

        public async Task<bool> DeleteVideoAsync(string publicId)
        {
            try
            {
                var deleteParams = new DeletionParams(publicId);
                var result = await _cloudinary.DestroyAsync(deleteParams);
                return result.Result == "ok";
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting video from Cloudinary: {ex.Message}");
                return false;
            }
        }
    }
}
