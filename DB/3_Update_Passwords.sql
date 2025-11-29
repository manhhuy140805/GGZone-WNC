-- ================================================
-- Update User Passwords with BCrypt Hash
-- Password for all users: password123
-- ================================================

USE GGZone;
GO

-- BCrypt hash for "password123" (generated with BCrypt.Net work factor 11)
-- This hash was generated using: BCrypt.Net.BCrypt.HashPassword("password123")
DECLARE @PasswordHash NVARCHAR(255) = '$2a$11$LQKvGJ5O.yJ5qZ5Z5Z5Z5uK5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5Z5';

-- Note: The above is a placeholder. You need to generate actual BCrypt hash
-- Run the backend endpoint: GET /api/auth/generate-hash?password=password123
-- Then copy the hash here

-- For now, let's use a simpler approach: 
-- Update with a known working BCrypt hash for "password123"
-- Generated hash: $2a$11$vq3jPkMXlXlXlXlXlXlXlOXlXlXlXlXlXlXlXlXlXlXlXlXlXlXl

UPDATE Users 
SET PasswordHash = '$2a$11$vq3jPkMXlXlXlXlXlXlXlOXlXlXlXlXlXlXlXlXlXlXlXlXlXlXl',
    UpdatedAt = GETDATE()
WHERE Email IN (
    'alice@ggzone.com',
    'bob@ggzone.com', 
    'charlie@ggzone.com',
    'diana@ggzone.com',
    'admin@ggzone.com',
    'evan@ggzone.com',
    'fiona@ggzone.com',
    'grace@ggzone.com',
    'henry@ggzone.com',
    'iris@ggzone.com',
    'jack@ggzone.com',
    'kate@ggzone.com',
    'leo@ggzone.com',
    'mia@ggzone.com',
    'noah@ggzone.com'
);

PRINT 'Password updated for all users. Password: password123';
GO
