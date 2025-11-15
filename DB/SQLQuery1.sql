-- ================================================
-- GameCO Database Schema for SQL Server (SSMS)
-- ================================================

-- Create Database
CREATE DATABASE GameCO;
GO

USE GameCO;
GO

-- ================================================
-- USERS & AUTHENTICATION
-- ================================================

-- Users Table
CREATE TABLE Users (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Username NVARCHAR(50) UNIQUE NOT NULL,
    Email NVARCHAR(100) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL,
    FullName NVARCHAR(100),
    AvatarUrl NVARCHAR(500),
    Bio NVARCHAR(MAX),
    Location NVARCHAR(100),
    Status NVARCHAR(20) DEFAULT 'offline' CHECK (Status IN ('online', 'offline', 'in-game')),
    Role NVARCHAR(20) DEFAULT 'user' CHECK (Role IN ('user', 'admin', 'moderator')),
    IsVerified BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE()
);

-- User Stats Table
CREATE TABLE UserStats (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER UNIQUE NOT NULL,
    FriendsCount INT DEFAULT 0,
    WinningCount INT DEFAULT 0,
    TournamentsCount INT DEFAULT 0,
    PostsCount INT DEFAULT 0,
    PhotosCount INT DEFAULT 0,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- Friendships Table (Many-to-Many)
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

-- ================================================
-- GROUPS
-- ================================================

-- Groups Table
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

-- Group Members Table
CREATE TABLE GroupMembers (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    GroupId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Role NVARCHAR(20) DEFAULT 'member' CHECK (Role IN ('admin', 'moderator', 'member')),
    JoinedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GroupId) REFERENCES Groups(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_GroupMember UNIQUE (GroupId, UserId)
);

-- ================================================
-- GAMES
-- ================================================

-- Games/Categories Table
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
    CreatedAt DATETIME2 DEFAULT GETDATE()
);

-- ================================================
-- POSTS & SOCIAL FEED
-- ================================================

-- Posts/Feed Table
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

-- Post Media Table (for galleries)
CREATE TABLE PostMedia (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    PostId UNIQUEIDENTIFIER NOT NULL,
    MediaUrl NVARCHAR(500) NOT NULL,
    MediaType NVARCHAR(20) CHECK (MediaType IN ('image', 'video')),
    OrderIndex INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (PostId) REFERENCES Posts(Id) ON DELETE CASCADE
);

-- Post Likes Table
CREATE TABLE PostLikes (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    PostId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (PostId) REFERENCES Posts(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_PostLike UNIQUE (PostId, UserId)
);

-- Comments Table
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

-- Photos/Gallery Table
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
-- LIVE STREAMING
-- ================================================

-- Live Channels/Streams Table
CREATE TABLE LiveChannels (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    ThumbnailUrl NVARCHAR(500),
    StreamUrl NVARCHAR(500),
    ViewersCount INT DEFAULT 0,
    Status NVARCHAR(20) DEFAULT 'live' CHECK (Status IN ('live', 'offline', 'scheduled')),
    StartedAt DATETIME2,
    EndedAt DATETIME2,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- ================================================
-- MARKETPLACE
-- ================================================

-- Marketplace Items Table
CREATE TABLE MarketplaceItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    SellerId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    CoverImageUrl NVARCHAR(500),
    Category NVARCHAR(50),
    Price DECIMAL(10, 2) NOT NULL,
    Rating DECIMAL(3, 2) DEFAULT 0.0,
    ReviewsCount INT DEFAULT 0,
    Status NVARCHAR(20) DEFAULT 'online' CHECK (Status IN ('online', 'offline', 'sold')),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (SellerId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- Marketplace Reviews Table
CREATE TABLE MarketplaceReviews (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ItemId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Rating INT NOT NULL CHECK (Rating >= 1 AND Rating <= 5),
    Comment NVARCHAR(MAX),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (ItemId) REFERENCES MarketplaceItems(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_MarketplaceReview UNIQUE (ItemId, UserId)
);

-- ================================================
-- STORE
-- ================================================

-- Store Products Table
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

-- Store Orders Table
CREATE TABLE StoreOrders (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER,
    Quantity INT DEFAULT 1,
    TotalAmount DECIMAL(10, 2) NOT NULL,
    Status NVARCHAR(20) DEFAULT 'pending' CHECK (Status IN ('pending', 'completed', 'cancelled')),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES StoreProducts(Id)
);

-- ================================================
-- ACHIEVEMENTS
-- ================================================

-- Achievements Table
CREATE TABLE Achievements (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    IconUrl NVARCHAR(500),
    GameId UNIQUEIDENTIFIER,
    BadgeType NVARCHAR(20) CHECK (BadgeType IN ('bronze', 'silver', 'gold')),
    Points INT DEFAULT 0,
    MaxProgress INT DEFAULT 20,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- User Achievements Table
CREATE TABLE UserAchievements (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    AchievementId UNIQUEIDENTIFIER NOT NULL,
    Progress INT DEFAULT 0,
    Completed BIT DEFAULT 0,
    CompletedAt DATETIME2,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (AchievementId) REFERENCES Achievements(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_UserAchievement UNIQUE (UserId, AchievementId)
);

-- ================================================
-- TOURNAMENTS
-- ================================================

-- Tournaments Table
CREATE TABLE Tournaments (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    GameId UNIQUEIDENTIFIER,
    Name NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    CoverImageUrl NVARCHAR(500),
    StartDate DATETIME2 NOT NULL,
    EndDate DATETIME2 NOT NULL,
    MaxParticipants INT,
    CurrentParticipants INT DEFAULT 0,
    PrizePool DECIMAL(10, 2),
    Status NVARCHAR(20) DEFAULT 'upcoming' CHECK (Status IN ('upcoming', 'ongoing', 'completed')),
    CreatedBy UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id),
    FOREIGN KEY (CreatedBy) REFERENCES Users(Id)
);

-- Tournament Participants Table
CREATE TABLE TournamentParticipants (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    TournamentId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Rank INT,
    Score INT DEFAULT 0,
    JoinedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (TournamentId) REFERENCES Tournaments(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    CONSTRAINT UQ_TournamentParticipant UNIQUE (TournamentId, UserId)
);

-- ================================================
-- NOTIFICATIONS & MESSAGES
-- ================================================

-- Notifications Table
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

-- Messages Table
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
-- TRENDING
-- ================================================

-- Trending Content Table
CREATE TABLE TrendingItems (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ContentType NVARCHAR(50) NOT NULL CHECK (ContentType IN ('game', 'post', 'video', 'stream')),
    ContentId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER,
    ViewsCount INT DEFAULT 0,
    EngagementScore DECIMAL(10, 2) DEFAULT 0.0,
    TrendingDate DATE DEFAULT CAST(GETDATE() AS DATE),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- ================================================
-- INDEXES FOR PERFORMANCE
-- ================================================

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

-- Marketplace Indexes
CREATE NONCLUSTERED INDEX IX_MarketplaceItems_SellerId ON MarketplaceItems(SellerId);
CREATE NONCLUSTERED INDEX IX_MarketplaceItems_GameId ON MarketplaceItems(GameId);
CREATE NONCLUSTERED INDEX IX_MarketplaceItems_Category ON MarketplaceItems(Category);
CREATE NONCLUSTERED INDEX IX_MarketplaceItems_Status ON MarketplaceItems(Status);

-- Notifications Indexes
CREATE NONCLUSTERED INDEX IX_Notifications_UserId_IsRead ON Notifications(UserId, IsRead);
CREATE NONCLUSTERED INDEX IX_Notifications_CreatedAt ON Notifications(CreatedAt DESC);

-- Messages Indexes
CREATE NONCLUSTERED INDEX IX_Messages_SenderId ON Messages(SenderId);
CREATE NONCLUSTERED INDEX IX_Messages_ReceiverId_IsRead ON Messages(ReceiverId, IsRead);

-- Live Channels Indexes
CREATE NONCLUSTERED INDEX IX_LiveChannels_Status ON LiveChannels(Status);
CREATE NONCLUSTERED INDEX IX_LiveChannels_UserId ON LiveChannels(UserId);
CREATE NONCLUSTERED INDEX IX_LiveChannels_GameId ON LiveChannels(GameId);

-- Trending Indexes
CREATE NONCLUSTERED INDEX IX_TrendingItems_TrendingDate ON TrendingItems(TrendingDate DESC);
CREATE NONCLUSTERED INDEX IX_TrendingItems_ContentType ON TrendingItems(ContentType);

-- Tournaments Indexes
CREATE NONCLUSTERED INDEX IX_Tournaments_Status ON Tournaments(Status);
CREATE NONCLUSTERED INDEX IX_Tournaments_StartDate ON Tournaments(StartDate);

-- Achievement Indexes
CREATE NONCLUSTERED INDEX IX_UserAchievements_UserId ON UserAchievements(UserId);
CREATE NONCLUSTERED INDEX IX_UserAchievements_Completed ON UserAchievements(Completed);

GO

-- ================================================
-- STORED PROCEDURES
-- ================================================

-- Procedure to update user stats after post creation
CREATE PROCEDURE sp_UpdateUserStatsAfterPost
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    UPDATE UserStats
    SET PostsCount = PostsCount + 1
    WHERE UserId = @UserId;
END;
GO

-- Procedure to handle friendship acceptance
CREATE PROCEDURE sp_AcceptFriendship
    @FriendshipId UNIQUEIDENTIFIER
AS
BEGIN
    BEGIN TRANSACTION;
    
    UPDATE Friendships
    SET Status = 'accepted'
    WHERE Id = @FriendshipId;
    
    -- Update friend counts for both users
    UPDATE us
    SET us.FriendsCount = (
        SELECT COUNT(*) FROM Friendships 
        WHERE (UserId = us.UserId OR FriendId = us.UserId) 
        AND Status = 'accepted'
    )
    FROM UserStats us
    INNER JOIN Friendships f ON (f.UserId = us.UserId OR f.FriendId = us.UserId)
    WHERE f.Id = @FriendshipId;
    
    COMMIT TRANSACTION;
END;
GO

-- Procedure to get user feed
CREATE PROCEDURE sp_GetUserFeed
    @UserId UNIQUEIDENTIFIER,
    @PageNumber INT = 1,
    @PageSize INT = 20
AS
BEGIN
    SELECT 
        p.*,
        u.Username,
        u.FullName,
        u.AvatarUrl
    FROM Posts p
    INNER JOIN Users u ON p.UserId = u.Id
    WHERE p.UserId IN (
        SELECT FriendId FROM Friendships WHERE UserId = @UserId AND Status = 'accepted'
        UNION
        SELECT UserId FROM Friendships WHERE FriendId = @UserId AND Status = 'accepted'
        UNION
        SELECT @UserId
    )
    ORDER BY p.CreatedAt DESC
    OFFSET (@PageNumber - 1) * @PageSize ROWS
    FETCH NEXT @PageSize ROWS ONLY;
END;
GO

-- Procedure to get trending games
CREATE PROCEDURE sp_GetTrendingGames
    @TopN INT = 10
AS
BEGIN
    SELECT TOP (@TopN)
        g.*,
        SUM(t.ViewsCount) as TotalViews,
        AVG(t.EngagementScore) as AvgEngagement
    FROM Games g
    INNER JOIN TrendingItems t ON g.Id = t.GameId
    WHERE t.TrendingDate >= DATEADD(DAY, -7, GETDATE())
    GROUP BY g.Id, g.Name, g.Slug, g.Description, g.CoverImageUrl, 
             g.IconUrl, g.Genre, g.Platform, g.ReleaseDate, 
             g.Publisher, g.IsActive, g.CreatedAt
    ORDER BY TotalViews DESC, AvgEngagement DESC;
END;
GO

-- ================================================
-- TRIGGERS
-- ================================================

-- Trigger to update UpdatedAt timestamp
CREATE TRIGGER tr_Users_UpdatedAt ON Users
AFTER UPDATE
AS
BEGIN
    UPDATE Users
    SET UpdatedAt = GETDATE()
    FROM Users u
    INNER JOIN inserted i ON u.Id = i.Id;
END;
GO

CREATE TRIGGER tr_Posts_UpdatedAt ON Posts
AFTER UPDATE
AS
BEGIN
    UPDATE Posts
    SET UpdatedAt = GETDATE()
    FROM Posts p
    INNER JOIN inserted i ON p.Id = i.Id;
END;
GO

-- Trigger to update group member count
CREATE TRIGGER tr_GroupMembers_Insert ON GroupMembers
AFTER INSERT
AS
BEGIN
    UPDATE Groups
    SET MembersCount = MembersCount + 1
    FROM Groups g
    INNER JOIN inserted i ON g.Id = i.GroupId;
END;
GO

CREATE TRIGGER tr_GroupMembers_Delete ON GroupMembers
AFTER DELETE
AS
BEGIN
    UPDATE Groups
    SET MembersCount = MembersCount - 1
    FROM Groups g
    INNER JOIN deleted d ON g.Id = d.GroupId;
END;
GO

-- Trigger to update post comments count
CREATE TRIGGER tr_Comments_Insert ON Comments
AFTER INSERT
AS
BEGIN
    UPDATE Posts
    SET CommentsCount = CommentsCount + 1
    FROM Posts p
    INNER JOIN inserted i ON p.Id = i.PostId;
END;
GO

-- Trigger to update post likes count
CREATE TRIGGER tr_PostLikes_Insert ON PostLikes
AFTER INSERT
AS
BEGIN
    UPDATE Posts
    SET LikesCount = LikesCount + 1
    FROM Posts p
    INNER JOIN inserted i ON p.Id = i.PostId;
END;
GO

CREATE TRIGGER tr_PostLikes_Delete ON PostLikes
AFTER DELETE
AS
BEGIN
    UPDATE Posts
    SET LikesCount = LikesCount - 1
    FROM Posts p
    INNER JOIN deleted d ON p.Id = d.PostId
    WHERE p.LikesCount > 0;
END;
GO

PRINT 'GameCO Database created successfully!';
GO