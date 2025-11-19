using System.Net;
using System.Net.Mail;

namespace ggzone_be.Services
{
    public interface IEmailService
    {
        Task SendEmailAsync(string to, string subject, string body);
        Task SendWelcomeEmailAsync(string to, string username);
        Task SendPasswordResetEmailAsync(string to, string resetToken);
        Task SendNotificationEmailAsync(string to, string notification);
    }

    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;
        private readonly ILogger<EmailService> _logger;

        public EmailService(IConfiguration configuration, ILogger<EmailService> logger)
        {
            _configuration = configuration;
            _logger = logger;
        }

        public async Task SendEmailAsync(string to, string subject, string body)
        {
            try
            {
                var smtpHost = _configuration["EmailSettings:SmtpHost"] ?? "smtp.gmail.com";
                var smtpPort = int.Parse(_configuration["EmailSettings:SmtpPort"] ?? "587");
                var smtpUser = _configuration["EmailSettings:SmtpUser"] ?? "";
                var smtpPass = _configuration["EmailSettings:SmtpPass"] ?? "";
                var fromEmail = _configuration["EmailSettings:FromEmail"] ?? "noreply@ggzone.com";

                using var client = new SmtpClient(smtpHost, smtpPort)
                {
                    EnableSsl = true,
                    Credentials = new NetworkCredential(smtpUser, smtpPass)
                };

                var message = new MailMessage(fromEmail, to, subject, body)
                {
                    IsBodyHtml = true
                };

                await client.SendMailAsync(message);
                _logger.LogInformation($"Email sent to {to}");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Failed to send email: {ex.Message}");
                // Don't throw - email failures shouldn't break the app
            }
        }

        public async Task SendWelcomeEmailAsync(string to, string username)
        {
            var subject = "Welcome to GGZone!";
            var body = $@"
                <h1>Welcome to GGZone, {username}!</h1>
                <p>Thank you for joining our gaming community.</p>
                <p>Start exploring games, connecting with friends, and joining tournaments!</p>
                <p>Best regards,<br>The GGZone Team</p>
            ";

            await SendEmailAsync(to, subject, body);
        }

        public async Task SendPasswordResetEmailAsync(string to, string resetToken)
        {
            var subject = "Reset Your Password";
            var body = $@"
                <h1>Password Reset Request</h1>
                <p>Click the link below to reset your password:</p>
                <a href='https://ggzone.com/reset-password?token={resetToken}'>Reset Password</a>
                <p>If you didn't request this, please ignore this email.</p>
            ";

            await SendEmailAsync(to, subject, body);
        }

        public async Task SendNotificationEmailAsync(string to, string notification)
        {
            var subject = "New Notification from GGZone";
            var body = $@"
                <h1>You have a new notification</h1>
                <p>{notification}</p>
                <p><a href='https://ggzone.com/notifications'>View all notifications</a></p>
            ";

            await SendEmailAsync(to, subject, body);
        }
    }
}
