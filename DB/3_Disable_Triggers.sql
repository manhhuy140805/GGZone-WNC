-- ================================================
-- Disable all triggers on Users table
-- ================================================

USE GGZone;
GO

-- Disable all triggers on Users table
DISABLE TRIGGER ALL ON Users;
GO

-- Verify triggers are disabled
SELECT name, is_disabled 
FROM sys.triggers 
WHERE parent_id = OBJECT_ID('Users');
GO

PRINT '✓ All triggers on Users table have been disabled';
GO
