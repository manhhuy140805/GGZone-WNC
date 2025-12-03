-- ================================================
-- GGZONE DATABASE - COMPLETE SCHEMA
-- Version: 4.0 Final
-- Date: 2024
-- ================================================
-- Features:
-- - Core Social Platform (Users, Posts, Groups)
-- - Gaming Features (Games, Videos, Play Now)
-- - Store (Shopping, Orders)
-- - Admin Panel (Moderation, Reports, Analytics)
-- ================================================
-- Total: 30 Tables, 35+ Indexes, 10 Procedures, 11 Triggers
-- ================================================

USE MASTER
GO

-- Drop existing database
IF EXISTS (SELECT name FROM sys.databases WHERE name = N'GGZone')
BEGIN
    ALTER DATABASE GGZone SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    DROP DATABASE GGZone;
    PRINT '✓ Existing database dropped';
END
GO

-- Create new database
CREATE DATABASE GGZone;
GO

USE GGZone;
GO


-- ================================================
-- SECTION 1: USERS & AUTHENTICATION
-- ================================================

CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(100),
    AvatarUrl NVARCHAR(500),
    CoverImageUrl NVARCHAR(500),
    Bio NVARCHAR(MAX),
    Location NVARCHAR(100),
    Status NVARCHAR(20) DEFAULT 'offline' CHECK (Status IN ('online', 'offline', 'in-game')),
    Role NVARCHAR(20) DEFAULT 'user' CHECK (Role IN ('user', 'admin', 'moderator')),
    IsVerified BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE UserStats (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER UNIQUE NOT NULL,
    FriendsCount INT DEFAULT 0,
    WinningCount INT DEFAULT 0,
    TournamentsCount INT DEFAULT 0,
    PostsCount INT DEFAULT 0,
    PhotosCount INT DEFAULT 0,
    VideosCount INT DEFAULT 0,
    GroupsCount INT DEFAULT 0,
    TotalPoints INT DEFAULT 0,
    Level INT DEFAULT 1,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE Friendships (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    FriendId UNIQUEIDENTIFIER NOT NULL,
    Status NVARCHAR(20) DEFAULT 'pending' CHECK (Status IN ('pending', 'accepted', 'blocked')),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    FOREIGN KEY (FriendId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_Friendship UNIQUE (UserId, FriendId)
);

CREATE TABLE UserPreferences (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER UNIQUE NOT NULL,
    Theme NVARCHAR(20) DEFAULT 'light' CHECK (Theme IN ('light', 'dark', 'auto')),
    Language NVARCHAR(10) DEFAULT 'en',
    EmailNotifications BIT DEFAULT 1,
    PushNotifications BIT DEFAULT 1,
    PrivacyLevel NVARCHAR(20) DEFAULT 'public' CHECK (PrivacyLevel IN ('public', 'friends', 'private')),
    ShowOnlineStatus BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE UserBadges (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    BadgeName NVARCHAR(50) NOT NULL,
    BadgeType NVARCHAR(20) CHECK (BadgeType IN ('verified', 'premium', 'moderator', 'developer', 'partner')),
    IconUrl NVARCHAR(500),
    AwardedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE FriendSuggestions (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    SuggestedUserId UNIQUEIDENTIFIER NOT NULL,
    Reason NVARCHAR(100),
    Score DECIMAL(5, 2) DEFAULT 0.0,
    IsShown BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (SuggestedUserId) REFERENCES Users(Id) ON DELETE NO ACTION
);

-- ================================================
-- SECTION 2: GROUPS & COMMUNITIES
-- ================================================

CREATE TABLE Groups (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    CoverImageUrl NVARCHAR(500),
    IconUrl NVARCHAR(500),
    Visibility NVARCHAR(20) DEFAULT 'public' CHECK (Visibility IN ('public', 'private')),
    MembersCount INT DEFAULT 0,
    CreatedBy UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

CREATE TABLE GroupMembers (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    GroupId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Role NVARCHAR(20) DEFAULT 'member' CHECK (Role IN ('admin', 'moderator', 'member')),
    JoinedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GroupId) REFERENCES Groups(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_GroupMember UNIQUE (GroupId, UserId)
);

-- ================================================
-- SECTION 3: GAMES & GAMING
-- ================================================

CREATE TABLE Games (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
    Slug NVARCHAR(100) UNIQUE NOT NULL,
    Description NVARCHAR(MAX),
    CoverImageUrl NVARCHAR(500),
    IconUrl NVARCHAR(500),
    Genre NVARCHAR(50),
    Platform NVARCHAR(50),
    ReleaseDate DATE,
    Publisher NVARCHAR(100),
    IsActive BIT DEFAULT 1,
    -- Play Now Feature Fields
    GameType NVARCHAR(20) DEFAULT 'desktop' CHECK (GameType IN ('desktop', 'web', 'mobile', 'browser')),
    LaunchUrl NVARCHAR(500),
    DownloadUrl NVARCHAR(500),
    WebPlayUrl NVARCHAR(500),
    InstallSize BIGINT,
    MinimumRequirements NVARCHAR(MAX),
    RecommendedRequirements NVARCHAR(MAX),
    LauncherType NVARCHAR(50),
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE GameReviews (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    GameId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5),
    Title NVARCHAR(200),
    Content NVARCHAR(MAX),
    HoursPlayed INT DEFAULT 0,
    IsRecommended BIT DEFAULT 1,
    HelpfulCount INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_GameReview UNIQUE (GameId, UserId)
);

-- ================================================
-- SECTION 4: PLAY NOW FEATURE
-- ================================================

CREATE TABLE UserGameLibrary (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER NOT NULL,
    IsInstalled BIT DEFAULT 0,
    InstallPath NVARCHAR(500),
    LastPlayed DATETIME2,
    TotalPlayTime INT DEFAULT 0,
    IsFavorite BIT DEFAULT 0,
    AddedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_UserGameLibrary UNIQUE (UserId, GameId)
);

CREATE TABLE GameLaunchLogs (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER NOT NULL,
    LaunchMethod NVARCHAR(50),
    LaunchedAt DATETIME2 DEFAULT GETDATE(),
    SessionDuration INT,
    EndedAt DATETIME2,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id) ON DELETE NO ACTION
);

-- ================================================
-- SECTION 5: POSTS & SOCIAL FEED
-- ================================================

CREATE TABLE Posts (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    GroupId UNIQUEIDENTIFIER,
    Content NVARCHAR(MAX),
    PostType NVARCHAR(20) DEFAULT 'text' CHECK (PostType IN ('text', 'video', 'image', 'gallery')),
    VideoUrl NVARCHAR(500),
    LikesCount INT DEFAULT 0,
    CommentsCount INT DEFAULT 0,
    SharesCount INT DEFAULT 0,
    IsPinned BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GroupId) REFERENCES Groups(Id) ON DELETE SET NULL
);

CREATE TABLE PostMedia (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    PostId UNIQUEIDENTIFIER NOT NULL,
    MediaUrl NVARCHAR(500) NOT NULL,
    MediaType NVARCHAR(20) CHECK (MediaType IN ('image', 'video')),
    OrderIndex INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (PostId) REFERENCES Posts(Id) ON DELETE CASCADE
);

CREATE TABLE PostLikes (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    PostId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (PostId) REFERENCES Posts(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_PostLike UNIQUE (PostId, UserId)
);

CREATE TABLE Comments (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    PostId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    ParentCommentId UNIQUEIDENTIFIER,
    Content NVARCHAR(MAX) NOT NULL,
    LikesCount INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (PostId) REFERENCES Posts(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    FOREIGN KEY (ParentCommentId) REFERENCES Comments(Id) ON DELETE NO ACTION
);

CREATE TABLE Photos (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    Caption NVARCHAR(MAX),
    GameId UNIQUEIDENTIFIER,
    LikesCount INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id) ON DELETE SET NULL
);

-- ================================================
-- SECTION 6: STORE
-- ================================================

CREATE TABLE StoreProducts (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    CoverImageUrl NVARCHAR(500),
    Price DECIMAL(10, 2) NOT NULL,
    Category NVARCHAR(50),
    GameId UNIQUEIDENTIFIER,
    Rating DECIMAL(3, 2) DEFAULT 0.0,
    ReviewsCount INT DEFAULT 0,
    Status NVARCHAR(20) DEFAULT 'online' CHECK (Status IN ('online', 'offline')),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

CREATE TABLE StoreOrders (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER,
    Quantity INT DEFAULT 1,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    Status NVARCHAR(20) DEFAULT 'pending' CHECK (Status IN ('pending', 'completed', 'cancelled', 'Confirmed', 'Shipping')),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES StoreProducts(Id)
);

CREATE TABLE OrderItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    OrderId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER,
    ProductName NVARCHAR(200),
    Quantity INT DEFAULT 1,
    UnitPrice DECIMAL(10, 2) NOT NULL,
    TotalPrice DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (OrderId) REFERENCES StoreOrders(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES StoreProducts(Id)
);

CREATE TABLE ShoppingCart (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER NOT NULL,
    Quantity INT DEFAULT 1,
    AddedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES StoreProducts(Id) ON DELETE CASCADE
);

-- ================================================
-- SECTION 7: NOTIFICATIONS & MESSAGES
-- ================================================

CREATE TABLE Notifications (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    Type NVARCHAR(50) NOT NULL,
    Title NVARCHAR(200),
    Content NVARCHAR(MAX),
    RelatedId UNIQUEIDENTIFIER,
    RelatedType NVARCHAR(50),
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

CREATE TABLE Messages (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SenderId UNIQUEIDENTIFIER NOT NULL,
    ReceiverId UNIQUEIDENTIFIER NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    IsRead BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (SenderId) REFERENCES Users(Id) ON DELETE NO ACTION,
    FOREIGN KEY (ReceiverId) REFERENCES Users(Id) ON DELETE NO ACTION
);

-- ================================================
-- SECTION 8: VIDEOS & MEDIA
-- ================================================

CREATE TABLE Videos (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    VideoUrl NVARCHAR(500) NOT NULL,
    ThumbnailUrl NVARCHAR(500),
    Duration INT,
    ViewsCount INT DEFAULT 0,
    LikesCount INT DEFAULT 0,
    CommentsCount INT DEFAULT 0,
    Category NVARCHAR(50),
    IsPublic BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

CREATE TABLE VideoComments (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    VideoId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    LikesCount INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (VideoId) REFERENCES Videos(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION
);

CREATE TABLE VideoLikes (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    VideoId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (VideoId) REFERENCES Videos(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_VideoLike UNIQUE (VideoId, UserId)
);

-- ================================================
-- SECTION 10: USER ACTIVITY
-- ================================================

CREATE TABLE UserActivityLog (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ActivityType NVARCHAR(50) NOT NULL,
    RelatedId UNIQUEIDENTIFIER,
    RelatedType NVARCHAR(50),
    Metadata NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- ================================================
-- SECTION 11: ADMIN PANEL
-- ================================================

CREATE TABLE AdminAuditLogs (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    AdminUserId UNIQUEIDENTIFIER NOT NULL,
    Action NVARCHAR(100) NOT NULL,
    TargetType NVARCHAR(50),
    TargetId UNIQUEIDENTIFIER,
    OldValue NVARCHAR(MAX),
    NewValue NVARCHAR(MAX),
    IpAddress NVARCHAR(50),
    UserAgent NVARCHAR(500),
    Reason NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (AdminUserId) REFERENCES Users(Id) ON DELETE NO ACTION
);

CREATE TABLE UserBans (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    BannedBy UNIQUEIDENTIFIER NOT NULL,
    BanType NVARCHAR(20) CHECK (BanType IN ('temporary', 'permanent')),
    Reason NVARCHAR(MAX) NOT NULL,
    StartDate DATETIME2 DEFAULT GETDATE(),
    EndDate DATETIME2,
    IsActive BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (BannedBy) REFERENCES Users(Id) ON DELETE NO ACTION
);

CREATE TABLE ModerationQueue (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ContentType NVARCHAR(50) NOT NULL,
    ContentId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Status NVARCHAR(20) DEFAULT 'pending' CHECK (Status IN ('pending', 'approved', 'rejected')),
    Priority NVARCHAR(20) DEFAULT 'normal' CHECK (Priority IN ('low', 'normal', 'high', 'urgent')),
    AutoFlagged BIT DEFAULT 0,
    FlagReason NVARCHAR(MAX),
    ReviewedBy UNIQUEIDENTIFIER,
    ReviewedAt DATETIME2,
    ReviewNotes NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    FOREIGN KEY (ReviewedBy) REFERENCES Users(Id) ON DELETE NO ACTION
);

CREATE TABLE DailyStatistics (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    StatDate DATE NOT NULL UNIQUE,
    NewUsers INT DEFAULT 0,
    ActiveUsers INT DEFAULT 0,
    TotalPosts INT DEFAULT 0,
    TotalComments INT DEFAULT 0,
    TotalVideos INT DEFAULT 0,
    TotalGameLaunches INT DEFAULT 0,
    TotalRevenue DECIMAL(10, 2) DEFAULT 0,
    TotalOrders INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

CREATE TABLE FeaturedContent (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ContentType NVARCHAR(50) NOT NULL,
    ContentId UNIQUEIDENTIFIER NOT NULL,
    Title NVARCHAR(200),
    Description NVARCHAR(MAX),
    ImageUrl NVARCHAR(500),
    DisplayOrder INT DEFAULT 0,
    StartDate DATETIME2,
    EndDate DATETIME2,
    IsActive BIT DEFAULT 1,
    CreatedBy UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

CREATE TABLE Announcements (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    Type NVARCHAR(20) CHECK (Type IN ('info', 'warning', 'maintenance', 'update', 'event')),
    Priority NVARCHAR(20) DEFAULT 'normal' CHECK (Priority IN ('low', 'normal', 'high')),
    TargetAudience NVARCHAR(20) DEFAULT 'all' CHECK (TargetAudience IN ('all', 'users', 'premium', 'moderators')),
    IsActive BIT DEFAULT 1,
    StartDate DATETIME2,
    EndDate DATETIME2,
    CreatedBy UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

CREATE TABLE EmailTemplates (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    TemplateName NVARCHAR(100) UNIQUE NOT NULL,
    Subject NVARCHAR(200) NOT NULL,
    HtmlBody NVARCHAR(MAX) NOT NULL,
    TextBody NVARCHAR(MAX),
    Category NVARCHAR(50),
    Variables NVARCHAR(MAX),
    IsActive BIT DEFAULT 1,
    UpdatedBy UNIQUEIDENTIFIER,
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UpdatedBy) REFERENCES Users(Id)
);


GO


-- Users Indexes
CREATE NONCLUSTERED INDEX IX_Users_Username ON Users(Username);
CREATE NONCLUSTERED INDEX IX_Users_Email ON Users(Email);
CREATE NONCLUSTERED INDEX IX_Users_Status ON Users(Status);

-- Posts Indexes
CREATE NONCLUSTERED INDEX IX_Posts_UserId ON Posts(UserId);
CREATE NONCLUSTERED INDEX IX_Posts_GroupId ON Posts(GroupId);
CREATE NONCLUSTERED INDEX IX_Posts_CreatedAt ON Posts(CreatedAt DESC);
CREATE NONCLUSTERED INDEX IX_Posts_PostType ON Posts(PostType);

-- Comments Indexes
CREATE NONCLUSTERED INDEX IX_Comments_PostId ON Comments(PostId);
CREATE NONCLUSTERED INDEX IX_Comments_UserId ON Comments(UserId);

-- Friendships Indexes
CREATE NONCLUSTERED INDEX IX_Friendships_UserId ON Friendships(UserId);
CREATE NONCLUSTERED INDEX IX_Friendships_FriendId ON Friendships(FriendId);
CREATE NONCLUSTERED INDEX IX_Friendships_Status ON Friendships(Status);

-- Group Members Indexes
CREATE NONCLUSTERED INDEX IX_GroupMembers_GroupId ON GroupMembers(GroupId);
CREATE NONCLUSTERED INDEX IX_GroupMembers_UserId ON GroupMembers(UserId);

-- Notifications Indexes
CREATE NONCLUSTERED INDEX IX_Notifications_UserId_IsRead ON Notifications(UserId, IsRead);
CREATE NONCLUSTERED INDEX IX_Notifications_CreatedAt ON Notifications(CreatedAt DESC);

-- Messages Indexes
CREATE NONCLUSTERED INDEX IX_Messages_SenderId ON Messages(SenderId);
CREATE NONCLUSTERED INDEX IX_Messages_ReceiverId_IsRead ON Messages(ReceiverId, IsRead);

-- Shopping Cart Indexes
CREATE NONCLUSTERED INDEX IX_ShoppingCart_UserId ON ShoppingCart(UserId);
CREATE NONCLUSTERED INDEX IX_ShoppingCart_ProductId ON ShoppingCart(ProductId);

-- Videos Indexes
CREATE NONCLUSTERED INDEX IX_Videos_UserId ON Videos(UserId);
CREATE NONCLUSTERED INDEX IX_Videos_GameId ON Videos(GameId);
CREATE NONCLUSTERED INDEX IX_Videos_Category ON Videos(Category);
CREATE NONCLUSTERED INDEX IX_Videos_CreatedAt ON Videos(CreatedAt DESC);
CREATE NONCLUSTERED INDEX IX_VideoComments_VideoId ON VideoComments(VideoId);

-- Activity Log Indexes
CREATE NONCLUSTERED INDEX IX_UserActivityLog_UserId ON UserActivityLog(UserId);
CREATE NONCLUSTERED INDEX IX_UserActivityLog_ActivityType ON UserActivityLog(ActivityType);
CREATE NONCLUSTERED INDEX IX_UserActivityLog_CreatedAt ON UserActivityLog(CreatedAt DESC);

-- Game Reviews Indexes
CREATE NONCLUSTERED INDEX IX_GameReviews_GameId ON GameReviews(GameId);
CREATE NONCLUSTERED INDEX IX_GameReviews_UserId ON GameReviews(UserId);

-- Friend Suggestions Indexes
CREATE NONCLUSTERED INDEX IX_FriendSuggestions_UserId ON FriendSuggestions(UserId);
CREATE NONCLUSTERED INDEX IX_FriendSuggestions_Score ON FriendSuggestions(Score DESC);

-- Play Now Indexes
CREATE NONCLUSTERED INDEX IX_UserGameLibrary_UserId ON UserGameLibrary(UserId);
CREATE NONCLUSTERED INDEX IX_UserGameLibrary_GameId ON UserGameLibrary(GameId);
CREATE NONCLUSTERED INDEX IX_UserGameLibrary_LastPlayed ON UserGameLibrary(LastPlayed DESC);
CREATE NONCLUSTERED INDEX IX_GameLaunchLogs_UserId ON GameLaunchLogs(UserId);
CREATE NONCLUSTERED INDEX IX_GameLaunchLogs_GameId ON GameLaunchLogs(GameId);
CREATE NONCLUSTERED INDEX IX_GameLaunchLogs_LaunchedAt ON GameLaunchLogs(LaunchedAt DESC);

-- Admin Panel Indexes
CREATE NONCLUSTERED INDEX IX_AdminAuditLogs_AdminUserId ON AdminAuditLogs(AdminUserId);
CREATE NONCLUSTERED INDEX IX_AdminAuditLogs_Action ON AdminAuditLogs(Action);
CREATE NONCLUSTERED INDEX IX_AdminAuditLogs_CreatedAt ON AdminAuditLogs(CreatedAt DESC);
CREATE NONCLUSTERED INDEX IX_AdminAuditLogs_TargetType ON AdminAuditLogs(TargetType);
CREATE NONCLUSTERED INDEX IX_UserBans_UserId ON UserBans(UserId);
CREATE NONCLUSTERED INDEX IX_UserBans_IsActive ON UserBans(IsActive);
CREATE NONCLUSTERED INDEX IX_UserBans_EndDate ON UserBans(EndDate);
CREATE NONCLUSTERED INDEX IX_ModerationQueue_Status ON ModerationQueue(Status);
CREATE NONCLUSTERED INDEX IX_ModerationQueue_Priority ON ModerationQueue(Priority);
CREATE NONCLUSTERED INDEX IX_ModerationQueue_CreatedAt ON ModerationQueue(CreatedAt DESC);
CREATE NONCLUSTERED INDEX IX_DailyStatistics_StatDate ON DailyStatistics(StatDate DESC);
CREATE NONCLUSTERED INDEX IX_FeaturedContent_IsActive ON FeaturedContent(IsActive);
CREATE NONCLUSTERED INDEX IX_FeaturedContent_DisplayOrder ON FeaturedContent(DisplayOrder);
CREATE NONCLUSTERED INDEX IX_FeaturedContent_ContentType ON FeaturedContent(ContentType);
CREATE NONCLUSTERED INDEX IX_Announcements_IsActive ON Announcements(IsActive);
CREATE NONCLUSTERED INDEX IX_Announcements_Type ON Announcements(Type);
CREATE NONCLUSTERED INDEX IX_Announcements_StartDate ON Announcements(StartDate DESC);
CREATE NONCLUSTERED INDEX IX_EmailTemplates_Category ON EmailTemplates(Category);
CREATE NONCLUSTERED INDEX IX_EmailTemplates_IsActive ON EmailTemplates(IsActive);


GO


-- User Stats Update
CREATE PROCEDURE sp_UpdateUserStatsAfterPost
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    UPDATE UserStats
    SET PostsCount = PostsCount + 1
    WHERE UserId = @UserId;
END;
GO

-- Friendship Management
CREATE PROCEDURE sp_AcceptFriendship
    @FriendshipId UNIQUEIDENTIFIER
AS
BEGIN
    BEGIN TRANSACTION;
    UPDATE Friendships SET Status = 'accepted' WHERE Id = @FriendshipId;
    UPDATE us SET us.FriendsCount = (
        SELECT COUNT(*) FROM Friendships 
        WHERE (UserId = us.UserId OR FriendId = us.UserId) AND Status = 'accepted'
    )
    FROM UserStats us
    INNER JOIN Friendships f ON (f.UserId = us.UserId OR f.FriendId = us.UserId)
    WHERE f.Id = @FriendshipId;
    COMMIT TRANSACTION;
END;
GO

-- User Feed
CREATE PROCEDURE sp_GetUserFeed
    @UserId UNIQUEIDENTIFIER,
    @PageNumber INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SELECT p.*, u.Username, u.FullName, u.AvatarUrl
    FROM Posts p
    INNER JOIN Users u ON p.UserId = u.Id
    WHERE p.UserId IN (
        SELECT FriendId FROM Friendships WHERE UserId = @UserId AND Status = 'accepted'
        UNION SELECT UserId FROM Friendships WHERE FriendId = @UserId AND Status = 'accepted'
        UNION SELECT @UserId
    )
    ORDER BY p.CreatedAt DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS FETCH NEXT @PageSize ROWS ONLY;
END;
GO

-- Play Now: Launch Game
CREATE PROCEDURE sp_LaunchGame
    @UserId UNIQUEIDENTIFIER,
    @GameId UNIQUEIDENTIFIER,
    @LaunchMethod NVARCHAR(50)
AS
BEGIN
    DECLARE @LogId UNIQUEIDENTIFIER = NEWID();
    INSERT INTO GameLaunchLogs (Id, UserId, GameId, LaunchMethod)
    VALUES (@LogId, @UserId, @GameId, @LaunchMethod);
    
    UPDATE UserGameLibrary SET LastPlayed = GETDATE()
    WHERE UserId = @UserId AND GameId = @GameId;
    
    IF NOT EXISTS (SELECT 1 FROM UserGameLibrary WHERE UserId = @UserId AND GameId = @GameId)
    BEGIN
        INSERT INTO UserGameLibrary (UserId, GameId, LastPlayed)
        VALUES (@UserId, @GameId, GETDATE());
    END
    SELECT @LogId as LaunchLogId;
END;
GO

-- Play Now: End Session
CREATE PROCEDURE sp_EndGameSession
    @LaunchLogId UNIQUEIDENTIFIER,
    @SessionDuration INT
AS
BEGIN
    UPDATE GameLaunchLogs
    SET EndedAt = GETDATE(), SessionDuration = @SessionDuration
    WHERE Id = @LaunchLogId;
    
    UPDATE ugl SET ugl.TotalPlayTime = ugl.TotalPlayTime + @SessionDuration
    FROM UserGameLibrary ugl
    INNER JOIN GameLaunchLogs gll ON ugl.UserId = gll.UserId AND ugl.GameId = gll.GameId
    WHERE gll.Id = @LaunchLogId;
END;
GO

-- Play Now: Get Library
CREATE PROCEDURE sp_GetUserGameLibrary
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT ugl.*, g.Name as GameName, g.CoverImageUrl, g.GameType, 
           g.LaunchUrl, g.DownloadUrl, g.WebPlayUrl, g.LauncherType
    FROM UserGameLibrary ugl
    INNER JOIN Games g ON ugl.GameId = g.Id
    WHERE ugl.UserId = @UserId
    ORDER BY ugl.LastPlayed DESC;
END;
GO

-- Shopping Cart
CREATE PROCEDURE sp_AddToCart
    @UserId UNIQUEIDENTIFIER,
    @ProductId UNIQUEIDENTIFIER,
    @Quantity INT = 1
AS
BEGIN
    IF EXISTS (SELECT 1 FROM ShoppingCart WHERE UserId = @UserId AND ProductId = @ProductId)
    BEGIN
        UPDATE ShoppingCart SET Quantity = Quantity + @Quantity
        WHERE UserId = @UserId AND ProductId = @ProductId;
    END
    ELSE
    BEGIN
        INSERT INTO ShoppingCart (UserId, ProductId, Quantity)
        VALUES (@UserId, @ProductId, @Quantity);
    END
END;
GO

-- Admin: Dashboard Stats
CREATE PROCEDURE sp_GetAdminDashboardStats
    @StartDate DATE = NULL,
    @EndDate DATE = NULL
AS
BEGIN
    IF @StartDate IS NULL SET @StartDate = DATEADD(DAY, -30, GETDATE());
    IF @EndDate IS NULL SET @EndDate = CAST(GETDATE() AS DATE);
    
    SELECT SUM(NewUsers) as TotalNewUsers, AVG(ActiveUsers) as AvgActiveUsers,
           SUM(TotalPosts) as TotalPosts, SUM(TotalComments) as TotalComments,
           SUM(TotalVideos) as TotalVideos, SUM(TotalGameLaunches) as TotalGameLaunches,
           SUM(TotalRevenue) as TotalRevenue, SUM(TotalOrders) as TotalOrders
    FROM DailyStatistics
    WHERE StatDate BETWEEN @StartDate AND @EndDate;
END;
GO

-- Admin: Ban User
CREATE PROCEDURE sp_BanUser
    @UserId UNIQUEIDENTIFIER,
    @BannedBy UNIQUEIDENTIFIER,
    @BanType NVARCHAR(20),
    @Reason NVARCHAR(MAX),
    @EndDate DATETIME2 = NULL
AS
BEGIN
    BEGIN TRANSACTION;
    INSERT INTO UserBans (UserId, BannedBy, BanType, Reason, EndDate)
    VALUES (@UserId, @BannedBy, @BanType, @Reason, @EndDate);
    
    UPDATE Users SET Status = 'offline' WHERE Id = @UserId;
    
    INSERT INTO AdminAuditLogs (AdminUserId, Action, TargetType, TargetId, Reason)
    VALUES (@BannedBy, 'user_banned', 'user', @UserId, @Reason);
    COMMIT TRANSACTION;
END;
GO

-- Admin: Update Daily Stats
CREATE PROCEDURE sp_UpdateDailyStatistics
    @StatDate DATE
AS
BEGIN
    DECLARE @NewUsers INT, @ActiveUsers INT, @TotalPosts INT, @TotalComments INT,
            @TotalVideos INT, @TotalGameLaunches INT, @TotalRevenue DECIMAL(10,2), 
            @TotalOrders INT;
    
    SELECT @NewUsers = COUNT(*) FROM Users WHERE CAST(CreatedAt AS DATE) = @StatDate;
    SELECT @ActiveUsers = COUNT(DISTINCT UserId) FROM UserActivityLog WHERE CAST(CreatedAt AS DATE) = @StatDate;
    SELECT @TotalPosts = COUNT(*) FROM Posts WHERE CAST(CreatedAt AS DATE) = @StatDate;
    SELECT @TotalComments = COUNT(*) FROM Comments WHERE CAST(CreatedAt AS DATE) = @StatDate;
    SELECT @TotalVideos = COUNT(*) FROM Videos WHERE CAST(CreatedAt AS DATE) = @StatDate;
    SELECT @TotalGameLaunches = COUNT(*) FROM GameLaunchLogs WHERE CAST(LaunchedAt AS DATE) = @StatDate;
    SELECT @TotalRevenue = ISNULL(SUM(TotalAmount), 0) FROM StoreOrders WHERE CAST(CreatedAt AS DATE) = @StatDate AND Status = 'completed';
    SELECT @TotalOrders = COUNT(*) FROM StoreOrders WHERE CAST(CreatedAt AS DATE) = @StatDate;
    
    IF EXISTS (SELECT 1 FROM DailyStatistics WHERE StatDate = @StatDate)
    BEGIN
        UPDATE DailyStatistics SET NewUsers = @NewUsers, ActiveUsers = @ActiveUsers,
               TotalPosts = @TotalPosts, TotalComments = @TotalComments, TotalVideos = @TotalVideos,
               TotalGameLaunches = @TotalGameLaunches, TotalRevenue = @TotalRevenue,
               TotalOrders = @TotalOrders
        WHERE StatDate = @StatDate;
    END
    ELSE
    BEGIN
        INSERT INTO DailyStatistics (StatDate, NewUsers, ActiveUsers, TotalPosts, TotalComments, 
                                     TotalVideos, TotalGameLaunches, TotalRevenue, TotalOrders)
        VALUES (@StatDate, @NewUsers, @ActiveUsers, @TotalPosts, @TotalComments, 
                @TotalVideos, @TotalGameLaunches, @TotalRevenue, @TotalOrders);
    END
END;
GO


GO

CREATE TRIGGER tr_Posts_UpdatedAt ON Posts AFTER UPDATE
AS BEGIN
    UPDATE Posts SET UpdatedAt = GETDATE()
    FROM Posts p INNER JOIN inserted i ON p.Id = i.Id;
END;
GO

-- Group member count
CREATE TRIGGER tr_GroupMembers_Insert ON GroupMembers AFTER INSERT
AS BEGIN
    UPDATE Groups SET MembersCount = MembersCount + 1
    FROM Groups g INNER JOIN inserted i ON g.Id = i.GroupId;
END;
GO

CREATE TRIGGER tr_GroupMembers_Delete ON GroupMembers AFTER DELETE
AS BEGIN
    UPDATE Groups SET MembersCount = MembersCount - 1
    FROM Groups g INNER JOIN deleted d ON g.Id = d.GroupId;
END;
GO

-- Post comments count
CREATE TRIGGER tr_Comments_Insert ON Comments AFTER INSERT
AS BEGIN
    UPDATE Posts SET CommentsCount = CommentsCount + 1
    FROM Posts p INNER JOIN inserted i ON p.Id = i.PostId;
END;
GO

-- Post likes count
CREATE TRIGGER tr_PostLikes_Insert ON PostLikes AFTER INSERT
AS BEGIN
    UPDATE Posts SET LikesCount = LikesCount + 1
    FROM Posts p INNER JOIN inserted i ON p.Id = i.PostId;
END;
GO

CREATE TRIGGER tr_PostLikes_Delete ON PostLikes AFTER DELETE
AS BEGIN
    UPDATE Posts SET LikesCount = LikesCount - 1
    FROM Posts p INNER JOIN deleted d ON p.Id = d.PostId WHERE p.LikesCount > 0;
END;
GO

-- Video stats
CREATE TRIGGER tr_VideoComments_Insert ON VideoComments AFTER INSERT
AS BEGIN
    UPDATE Videos SET CommentsCount = CommentsCount + 1
    FROM Videos v INNER JOIN inserted i ON v.Id = i.VideoId;
END;
GO

CREATE TRIGGER tr_VideoLikes_Insert ON VideoLikes AFTER INSERT
AS BEGIN
    UPDATE Videos SET LikesCount = LikesCount + 1
    FROM Videos v INNER JOIN inserted i ON v.Id = i.VideoId;
END;
GO

CREATE TRIGGER tr_VideoLikes_Delete ON VideoLikes AFTER DELETE
AS BEGIN
    UPDATE Videos SET LikesCount = LikesCount - 1
    FROM Videos v INNER JOIN deleted d ON v.Id = d.VideoId WHERE v.LikesCount > 0;
END;
GO

-- Activity logging
CREATE TRIGGER tr_Posts_Insert_Activity ON Posts AFTER INSERT
AS BEGIN
    INSERT INTO UserActivityLog (UserId, ActivityType, RelatedId, RelatedType)
    SELECT UserId, 'post_created', Id, 'post' FROM inserted;
END;
GO

CREATE TRIGGER tr_Videos_Insert_Activity ON Videos AFTER INSERT
AS BEGIN
    INSERT INTO UserActivityLog (UserId, ActivityType, RelatedId, RelatedType)
    SELECT UserId, 'video_uploaded', Id, 'video' FROM inserted;
    
    UPDATE UserStats SET VideosCount = VideosCount + 1
    FROM UserStats us INNER JOIN inserted i ON us.UserId = i.UserId;
END;
GO

-- Ban expiration
CREATE TRIGGER tr_CheckBanExpiration ON UserBans AFTER INSERT, UPDATE
AS BEGIN
    UPDATE UserBans SET IsActive = 0
    WHERE EndDate IS NOT NULL AND EndDate < GETDATE() AND IsActive = 1;
END;
GO


