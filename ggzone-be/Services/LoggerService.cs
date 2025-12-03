using System;

namespace ggzone_be.Services
{
    /// <summary>
    /// Logger service for consistent logging across the application
    /// In production, this should be replaced with a proper logging framework like Serilog
    /// </summary>
    public interface ILoggerService
    {
        void LogInfo(string message);
        void LogWarning(string message);
        void LogError(string message, Exception? exception = null);
        void LogDebug(string message);
    }

    public class LoggerService : ILoggerService
    {
        private readonly ILogger<LoggerService> _logger;
        private readonly bool _isDevelopment;

        public LoggerService(ILogger<LoggerService> logger, IWebHostEnvironment environment)
        {
            _logger = logger;
            _isDevelopment = environment.IsDevelopment();
        }

        public void LogInfo(string message)
        {
            _logger.LogInformation(message);
        }

        public void LogWarning(string message)
        {
            _logger.LogWarning(message);
        }

        public void LogError(string message, Exception? exception = null)
        {
            if (exception != null)
            {
                _logger.LogError(exception, message);
            }
            else
            {
                _logger.LogError(message);
            }
        }

        public void LogDebug(string message)
        {
            if (_isDevelopment)
            {
                _logger.LogDebug(message);
            }
        }
    }
}
