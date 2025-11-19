namespace ggzone_be.Services
{
    public interface IFileUploadService
    {
        Task<string> UploadImageAsync(IFormFile file, string folder = "images");
        Task<string> UploadVideoAsync(IFormFile file);
        Task<bool> DeleteFileAsync(string fileUrl);
        bool IsValidImage(IFormFile file);
        bool IsValidVideo(IFormFile file);
    }

    public class FileUploadService : IFileUploadService
    {
        private readonly IWebHostEnvironment _environment;
        private readonly ILogger<FileUploadService> _logger;
        private readonly long _maxImageSize = 5 * 1024 * 1024; // 5MB
        private readonly long _maxVideoSize = 100 * 1024 * 1024; // 100MB
        private readonly string[] _allowedImageExtensions = { ".jpg", ".jpeg", ".png", ".gif", ".webp" };
        private readonly string[] _allowedVideoExtensions = { ".mp4", ".webm", ".mov" };

        public FileUploadService(IWebHostEnvironment environment, ILogger<FileUploadService> logger)
        {
            _environment = environment;
            _logger = logger;
        }

        public async Task<string> UploadImageAsync(IFormFile file, string folder = "images")
        {
            if (!IsValidImage(file))
                throw new ArgumentException("Invalid image file");

            return await UploadFileAsync(file, folder);
        }

        public async Task<string> UploadVideoAsync(IFormFile file)
        {
            if (!IsValidVideo(file))
                throw new ArgumentException("Invalid video file");

            return await UploadFileAsync(file, "videos");
        }

        private async Task<string> UploadFileAsync(IFormFile file, string folder)
        {
            try
            {
                var uploadsFolder = Path.Combine(_environment.WebRootPath, folder);
                
                if (!Directory.Exists(uploadsFolder))
                    Directory.CreateDirectory(uploadsFolder);

                var uniqueFileName = $"{Guid.NewGuid()}_{file.FileName}";
                var filePath = Path.Combine(uploadsFolder, uniqueFileName);

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(fileStream);
                }

                var fileUrl = $"/{folder}/{uniqueFileName}";
                _logger.LogInformation($"File uploaded: {fileUrl}");

                return fileUrl;
            }
            catch (Exception ex)
            {
                _logger.LogError($"File upload failed: {ex.Message}");
                throw;
            }
        }

        public async Task<bool> DeleteFileAsync(string fileUrl)
        {
            try
            {
                var filePath = Path.Combine(_environment.WebRootPath, fileUrl.TrimStart('/'));
                
                if (File.Exists(filePath))
                {
                    File.Delete(filePath);
                    _logger.LogInformation($"File deleted: {fileUrl}");
                    return true;
                }

                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError($"File deletion failed: {ex.Message}");
                return false;
            }
        }

        public bool IsValidImage(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return false;

            if (file.Length > _maxImageSize)
                return false;

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return _allowedImageExtensions.Contains(extension);
        }

        public bool IsValidVideo(IFormFile file)
        {
            if (file == null || file.Length == 0)
                return false;

            if (file.Length > _maxVideoSize)
                return false;

            var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
            return _allowedVideoExtensions.Contains(extension);
        }
    }
}
