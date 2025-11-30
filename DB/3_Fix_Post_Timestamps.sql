-- ================================================
-- FIX POST TIMESTAMPS
-- Update CreatedAt to have different times
-- ================================================

USE GGZone;
GO

PRINT 'Updating Post timestamps to have realistic intervals...';

-- Update posts with staggered timestamps (newest to oldest)
-- Post 1: 5 minutes ago
UPDATE Posts 
SET CreatedAt = DATEADD(MINUTE, -5, GETDATE()),
    UpdatedAt = DATEADD(MINUTE, -5, GETDATE())
WHERE Content LIKE '%Just completed a new speedrun record%';

-- Post 2: 15 minutes ago
UPDATE Posts 
SET CreatedAt = DATEADD(MINUTE, -15, GETDATE()),
    UpdatedAt = DATEADD(MINUTE, -15, GETDATE())
WHERE Content LIKE '%Finally got my first pentakill%';

-- Post 3: 30 minutes ago
UPDATE Posts 
SET CreatedAt = DATEADD(MINUTE, -30, GETDATE()),
    UpdatedAt = DATEADD(MINUTE, -30, GETDATE())
WHERE Content LIKE '%Just hit Radiant in Valorant%';

-- Post 4: 1 hour ago
UPDATE Posts 
SET CreatedAt = DATEADD(HOUR, -1, GETDATE()),
    UpdatedAt = DATEADD(HOUR, -1, GETDATE())
WHERE Content LIKE '%Breaking down the meta changes%';

-- Post 5: 2 hours ago
UPDATE Posts 
SET CreatedAt = DATEADD(HOUR, -2, GETDATE()),
    UpdatedAt = DATEADD(HOUR, -2, GETDATE())
WHERE Content LIKE '%Game dev tips%';

-- Post 6: 3 hours ago
UPDATE Posts 
SET CreatedAt = DATEADD(HOUR, -3, GETDATE()),
    UpdatedAt = DATEADD(HOUR, -3, GETDATE())
WHERE Content LIKE '%Streaming live now%';

-- Post 7: 5 hours ago
UPDATE Posts 
SET CreatedAt = DATEADD(HOUR, -5, GETDATE()),
    UpdatedAt = DATEADD(HOUR, -5, GETDATE())
WHERE Content LIKE '%Going live with 12-hour%';

-- Post 8: 8 hours ago
UPDATE Posts 
SET CreatedAt = DATEADD(HOUR, -8, GETDATE()),
    UpdatedAt = DATEADD(HOUR, -8, GETDATE())
WHERE Content LIKE '%Community event this Saturday%';

-- Post 9: 12 hours ago
UPDATE Posts 
SET CreatedAt = DATEADD(HOUR, -12, GETDATE()),
    UpdatedAt = DATEADD(HOUR, -12, GETDATE())
WHERE Content LIKE '%Dota 2 International predictions%';

-- Post 10: 1 day ago
UPDATE Posts 
SET CreatedAt = DATEADD(DAY, -1, GETDATE()),
    UpdatedAt = DATEADD(DAY, -1, GETDATE())
WHERE Content LIKE '%Team recruitment%';

-- Post 11: 2 days ago
UPDATE Posts 
SET CreatedAt = DATEADD(DAY, -2, GETDATE()),
    UpdatedAt = DATEADD(DAY, -2, GETDATE())
WHERE Content LIKE '%Looking for teammates for CS2%';

-- Post 12: 3 days ago
UPDATE Posts 
SET CreatedAt = DATEADD(DAY, -3, GETDATE()),
    UpdatedAt = DATEADD(DAY, -3, GETDATE())
WHERE Content LIKE '%New League patch is insane%';

-- Post 13: 5 days ago
UPDATE Posts 
SET CreatedAt = DATEADD(DAY, -5, GETDATE()),
    UpdatedAt = DATEADD(DAY, -5, GETDATE())
WHERE Content LIKE '%Best settings for competitive%';

-- Post 14: 7 days ago
UPDATE Posts 
SET CreatedAt = DATEADD(DAY, -7, GETDATE()),
    UpdatedAt = DATEADD(DAY, -7, GETDATE())
WHERE Content LIKE '%Tournament results are in%';

-- Post 15: 10 days ago
UPDATE Posts 
SET CreatedAt = DATEADD(DAY, -10, GETDATE()),
    UpdatedAt = DATEADD(DAY, -10, GETDATE())
WHERE Content LIKE '%Marketplace deals%';

PRINT '✓ Post timestamps updated successfully!';

-- Verify the update
SELECT TOP 10
    Id,
    LEFT(Content, 50) as ContentPreview,
    CreatedAt,
    DATEDIFF(MINUTE, CreatedAt, GETDATE()) as MinutesAgo
FROM Posts
ORDER BY CreatedAt DESC;

PRINT '✓ Showing top 10 most recent posts';
GO
