-- ================================================
-- Drop & Create Database GGZone
-- ================================================

-- Kiểm tra database tồn tại
USE MASTER
IF EXISTS (
    SELECT name 
    FROM sys.databases 
    WHERE name = N'GGZone'
)
BEGIN
    -- Đóng tất cả kết nối tới DB (tránh lỗi khi DROP)
    ALTER DATABASE GGZone SET SINGLE_USER WITH ROLLBACK IMMEDIATE;
    
    -- Xóa database
    DROP DATABASE GGZone;
END
GO

-- Tạo lại database
CREATE DATABASE GGZone;
GO

USE GGZone;
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
    CoverImageUrl NVARCHAR(500),
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
    VideosCount INT DEFAULT 0,
    ForumsCount INT DEFAULT 0,
    GroupsCount INT DEFAULT 0,
    AchievementsCount INT DEFAULT 0,
    TotalPoints INT DEFAULT 0,
    Level INT DEFAULT 1,
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
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
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
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
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
    ContentType NVARCHAR(50) NOT NULL CHECK (ContentType IN ('game', 'post', 'video', 'stream', 'player')),
    ContentId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER,
    ViewsCount INT DEFAULT 0,
    EngagementScore DECIMAL(10, 2) DEFAULT 0.0,
    Rank INT DEFAULT 0,
    TrendingDate DATE DEFAULT CAST(GETDATE() AS DATE),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- Trending Players/Users (for leaderboards)
CREATE TABLE TrendingPlayers (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER,
    Rank INT DEFAULT 0,
    Score INT DEFAULT 0,
    WinRate DECIMAL(5, 2) DEFAULT 0.0,
    TotalMatches INT DEFAULT 0,
    TrendingDate DATE DEFAULT CAST(GETDATE() AS DATE),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- ================================================
-- SHOPPING CART & ORDERS
-- ================================================

-- Shopping Cart Table
CREATE TABLE ShoppingCart (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ProductId UNIQUEIDENTIFIER,
    MarketplaceItemId UNIQUEIDENTIFIER,
    Quantity INT DEFAULT 1,
    AddedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (ProductId) REFERENCES StoreProducts(Id),
    FOREIGN KEY (MarketplaceItemId) REFERENCES MarketplaceItems(Id)
);

-- Order Items Table (for detailed order tracking)
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

-- ================================================
-- FORUMS & DISCUSSIONS
-- ================================================

-- Forum Categories Table
CREATE TABLE ForumCategories (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    Name NVARCHAR(100) NOT NULL,
    Description NVARCHAR(MAX),
    IconUrl NVARCHAR(500),
    GameId UNIQUEIDENTIFIER,
    TopicsCount INT DEFAULT 0,
    PostsCount INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- Forum Topics Table
CREATE TABLE ForumTopics (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    CategoryId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Title NVARCHAR(200) NOT NULL,
    Content NVARCHAR(MAX),
    ViewsCount INT DEFAULT 0,
    RepliesCount INT DEFAULT 0,
    IsPinned BIT DEFAULT 0,
    IsLocked BIT DEFAULT 0,
    LastReplyAt DATETIME2,
    LastReplyBy UNIQUEIDENTIFIER,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (CategoryId) REFERENCES ForumCategories(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    FOREIGN KEY (LastReplyBy) REFERENCES Users(Id) ON DELETE NO ACTION
);

-- Forum Replies Table
CREATE TABLE ForumReplies (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    TopicId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Content NVARCHAR(MAX) NOT NULL,
    LikesCount INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (TopicId) REFERENCES ForumTopics(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION
);

-- ================================================
-- VIDEOS & MEDIA
-- ================================================

-- Videos Table (user uploaded videos, highlights, etc.)
CREATE TABLE Videos (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    GameId UNIQUEIDENTIFIER,
    Title NVARCHAR(200) NOT NULL,
    Description NVARCHAR(MAX),
    VideoUrl NVARCHAR(500) NOT NULL,
    ThumbnailUrl NVARCHAR(500),
    Duration INT, -- in seconds
    ViewsCount INT DEFAULT 0,
    LikesCount INT DEFAULT 0,
    CommentsCount INT DEFAULT 0,
    Category NVARCHAR(50), -- 'gameplay', 'tutorial', 'highlight', 'review'
    IsPublic BIT DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    UpdatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (GameId) REFERENCES Games(Id)
);

-- Video Comments Table
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

-- Video Likes Table
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
-- LIVE STREAM CHAT & INTERACTIONS
-- ================================================

-- Stream Chat Messages Table
CREATE TABLE StreamChatMessages (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ChannelId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    Message NVARCHAR(500) NOT NULL,
    MessageType NVARCHAR(20) DEFAULT 'text' CHECK (MessageType IN ('text', 'emote', 'system')),
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (ChannelId) REFERENCES LiveChannels(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION
);

-- Stream Followers Table
CREATE TABLE StreamFollowers (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    ChannelId UNIQUEIDENTIFIER NOT NULL,
    UserId UNIQUEIDENTIFIER NOT NULL,
    FollowedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (ChannelId) REFERENCES LiveChannels(Id) ON DELETE CASCADE,
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE NO ACTION,
    CONSTRAINT UQ_StreamFollower UNIQUE (ChannelId, UserId)
);

-- ================================================
-- USER ACTIVITY & ENGAGEMENT
-- ================================================

-- User Activity Log Table
CREATE TABLE UserActivityLog (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    ActivityType NVARCHAR(50) NOT NULL, -- 'login', 'post_created', 'game_played', 'achievement_unlocked'
    RelatedId UNIQUEIDENTIFIER,
    RelatedType NVARCHAR(50),
    Metadata NVARCHAR(MAX), -- JSON data for additional info
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- User Preferences Table
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

-- User Badges Table (special achievements, verified, premium, etc.)
CREATE TABLE UserBadges (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    BadgeName NVARCHAR(50) NOT NULL,
    BadgeType NVARCHAR(20) CHECK (BadgeType IN ('verified', 'premium', 'moderator', 'developer', 'partner')),
    IconUrl NVARCHAR(500),
    AwardedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE
);

-- ================================================
-- GAME DETAILS & METADATA
-- ================================================

-- Game Screenshots Table
CREATE TABLE GameScreenshots (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    GameId UNIQUEIDENTIFIER NOT NULL,
    ImageUrl NVARCHAR(500) NOT NULL,
    Caption NVARCHAR(200),
    OrderIndex INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id) ON DELETE CASCADE
);

-- Game Videos/Trailers Table
CREATE TABLE GameVideos (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    GameId UNIQUEIDENTIFIER NOT NULL,
    Title NVARCHAR(200),
    VideoUrl NVARCHAR(500) NOT NULL,
    ThumbnailUrl NVARCHAR(500),
    VideoType NVARCHAR(20) CHECK (VideoType IN ('trailer', 'gameplay', 'review')),
    OrderIndex INT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (GameId) REFERENCES Games(Id) ON DELETE CASCADE
);

-- Game Reviews Table
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
-- FRIEND REQUESTS & SUGGESTIONS
-- ================================================

-- Friend Suggestions Table (algorithm-based friend recommendations)
CREATE TABLE FriendSuggestions (
    Id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    UserId UNIQUEIDENTIFIER NOT NULL,
    SuggestedUserId UNIQUEIDENTIFIER NOT NULL,
    Reason NVARCHAR(100), -- 'mutual_friends', 'same_game', 'same_group'
    Score DECIMAL(5, 2) DEFAULT 0.0,
    IsShown BIT DEFAULT 0,
    CreatedAt DATETIME2 DEFAULT GETDATE(),
    FOREIGN KEY (UserId) REFERENCES Users(Id) ON DELETE CASCADE,
    FOREIGN KEY (SuggestedUserId) REFERENCES Users(Id) ON DELETE NO ACTION
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

-- Shopping Cart Indexes
CREATE NONCLUSTERED INDEX IX_ShoppingCart_UserId ON ShoppingCart(UserId);
CREATE NONCLUSTERED INDEX IX_ShoppingCart_ProductId ON ShoppingCart(ProductId);

-- Forum Indexes
CREATE NONCLUSTERED INDEX IX_ForumTopics_CategoryId ON ForumTopics(CategoryId);
CREATE NONCLUSTERED INDEX IX_ForumTopics_UserId ON ForumTopics(UserId);
CREATE NONCLUSTERED INDEX IX_ForumTopics_CreatedAt ON ForumTopics(CreatedAt DESC);
CREATE NONCLUSTERED INDEX IX_ForumReplies_TopicId ON ForumReplies(TopicId);
CREATE NONCLUSTERED INDEX IX_ForumReplies_UserId ON ForumReplies(UserId);

-- Videos Indexes
CREATE NONCLUSTERED INDEX IX_Videos_UserId ON Videos(UserId);
CREATE NONCLUSTERED INDEX IX_Videos_GameId ON Videos(GameId);
CREATE NONCLUSTERED INDEX IX_Videos_Category ON Videos(Category);
CREATE NONCLUSTERED INDEX IX_Videos_CreatedAt ON Videos(CreatedAt DESC);
CREATE NONCLUSTERED INDEX IX_VideoComments_VideoId ON VideoComments(VideoId);

-- Stream Chat Indexes
CREATE NONCLUSTERED INDEX IX_StreamChatMessages_ChannelId ON StreamChatMessages(ChannelId);
CREATE NONCLUSTERED INDEX IX_StreamChatMessages_CreatedAt ON StreamChatMessages(CreatedAt DESC);
CREATE NONCLUSTERED INDEX IX_StreamFollowers_ChannelId ON StreamFollowers(ChannelId);
CREATE NONCLUSTERED INDEX IX_StreamFollowers_UserId ON StreamFollowers(UserId);

-- Activity Log Indexes
CREATE NONCLUSTERED INDEX IX_UserActivityLog_UserId ON UserActivityLog(UserId);
CREATE NONCLUSTERED INDEX IX_UserActivityLog_ActivityType ON UserActivityLog(ActivityType);
CREATE NONCLUSTERED INDEX IX_UserActivityLog_CreatedAt ON UserActivityLog(CreatedAt DESC);

-- Game Content Indexes
CREATE NONCLUSTERED INDEX IX_GameScreenshots_GameId ON GameScreenshots(GameId);
CREATE NONCLUSTERED INDEX IX_GameVideos_GameId ON GameVideos(GameId);
CREATE NONCLUSTERED INDEX IX_GameReviews_GameId ON GameReviews(GameId);
CREATE NONCLUSTERED INDEX IX_GameReviews_UserId ON GameReviews(UserId);

-- Trending Players Indexes
CREATE NONCLUSTERED INDEX IX_TrendingPlayers_UserId ON TrendingPlayers(UserId);
CREATE NONCLUSTERED INDEX IX_TrendingPlayers_GameId ON TrendingPlayers(GameId);
CREATE NONCLUSTERED INDEX IX_TrendingPlayers_Rank ON TrendingPlayers(Rank);

-- Friend Suggestions Indexes
CREATE NONCLUSTERED INDEX IX_FriendSuggestions_UserId ON FriendSuggestions(UserId);
CREATE NONCLUSTERED INDEX IX_FriendSuggestions_Score ON FriendSuggestions(Score DESC);

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

-- ================================================
-- ADDITIONAL STORED PROCEDURES
-- ================================================

-- Procedure to add item to shopping cart
CREATE PROCEDURE sp_AddToCart
    @UserId UNIQUEIDENTIFIER,
    @ProductId UNIQUEIDENTIFIER = NULL,
    @MarketplaceItemId UNIQUEIDENTIFIER = NULL,
    @Quantity INT = 1
AS
BEGIN
    -- Check if item already exists in cart
    IF EXISTS (
        SELECT 1 FROM ShoppingCart 
        WHERE UserId = @UserId 
        AND (ProductId = @ProductId OR MarketplaceItemId = @MarketplaceItemId)
    )
    BEGIN
        -- Update quantity
        UPDATE ShoppingCart
        SET Quantity = Quantity + @Quantity
        WHERE UserId = @UserId 
        AND (ProductId = @ProductId OR MarketplaceItemId = @MarketplaceItemId);
    END
    ELSE
    BEGIN
        -- Insert new item
        INSERT INTO ShoppingCart (UserId, ProductId, MarketplaceItemId, Quantity)
        VALUES (@UserId, @ProductId, @MarketplaceItemId, @Quantity);
    END
END;
GO

-- Procedure to get user's shopping cart
CREATE PROCEDURE sp_GetUserCart
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT 
        sc.*,
        sp.Name as ProductName,
        sp.Price as ProductPrice,
        sp.CoverImageUrl as ProductImage,
        mi.Title as MarketplaceItemName,
        mi.Price as MarketplaceItemPrice,
        mi.CoverImageUrl as MarketplaceItemImage
    FROM ShoppingCart sc
    LEFT JOIN StoreProducts sp ON sc.ProductId = sp.Id
    LEFT JOIN MarketplaceItems mi ON sc.MarketplaceItemId = mi.Id
    WHERE sc.UserId = @UserId;
END;
GO

-- Procedure to get trending content
CREATE PROCEDURE sp_GetTrendingContent
    @ContentType NVARCHAR(50) = NULL,
    @TopN INT = 10
AS
BEGIN
    SELECT TOP (@TopN)
        t.*,
        CASE 
            WHEN t.ContentType = 'game' THEN g.Name
            WHEN t.ContentType = 'player' THEN u.Username
            ELSE NULL
        END as ContentName,
        CASE 
            WHEN t.ContentType = 'game' THEN g.CoverImageUrl
            WHEN t.ContentType = 'player' THEN u.AvatarUrl
            ELSE NULL
        END as ContentImage
    FROM TrendingItems t
    LEFT JOIN Games g ON t.ContentType = 'game' AND t.ContentId = g.Id
    LEFT JOIN Users u ON t.ContentType = 'player' AND t.ContentId = u.Id
    WHERE (@ContentType IS NULL OR t.ContentType = @ContentType)
    AND t.TrendingDate >= DATEADD(DAY, -7, GETDATE())
    ORDER BY t.EngagementScore DESC, t.ViewsCount DESC;
END;
GO

-- Procedure to get user profile with stats
CREATE PROCEDURE sp_GetUserProfile
    @UserId UNIQUEIDENTIFIER
AS
BEGIN
    SELECT 
        u.*,
        us.FriendsCount,
        us.WinningCount,
        us.TournamentsCount,
        us.PostsCount,
        us.PhotosCount,
        us.VideosCount,
        us.ForumsCount,
        us.GroupsCount,
        us.AchievementsCount,
        us.TotalPoints,
        us.Level
    FROM Users u
    LEFT JOIN UserStats us ON u.Id = us.UserId
    WHERE u.Id = @UserId;
END;
GO

-- Procedure to get user's friends with status
CREATE PROCEDURE sp_GetUserFriends
    @UserId UNIQUEIDENTIFIER,
    @Status NVARCHAR(20) = 'accepted'
AS
BEGIN
    SELECT 
        u.Id,
        u.Username,
        u.FullName,
        u.AvatarUrl,
        u.Status as OnlineStatus,
        f.Status as FriendshipStatus,
        f.CreatedAt as FriendsSince
    FROM Friendships f
    INNER JOIN Users u ON (
        CASE 
            WHEN f.UserId = @UserId THEN f.FriendId
            ELSE f.UserId
        END = u.Id
    )
    WHERE (f.UserId = @UserId OR f.FriendId = @UserId)
    AND f.Status = @Status
    ORDER BY u.Username;
END;
GO

-- Procedure to create forum topic
CREATE PROCEDURE sp_CreateForumTopic
    @CategoryId UNIQUEIDENTIFIER,
    @UserId UNIQUEIDENTIFIER,
    @Title NVARCHAR(200),
    @Content NVARCHAR(MAX)
AS
BEGIN
    DECLARE @TopicId UNIQUEIDENTIFIER = NEWID();
    
    BEGIN TRANSACTION;
    
    INSERT INTO ForumTopics (Id, CategoryId, UserId, Title, Content)
    VALUES (@TopicId, @CategoryId, @UserId, @Title, @Content);
    
    UPDATE ForumCategories
    SET TopicsCount = TopicsCount + 1
    WHERE Id = @CategoryId;
    
    UPDATE UserStats
    SET ForumsCount = ForumsCount + 1
    WHERE UserId = @UserId;
    
    COMMIT TRANSACTION;
    
    SELECT @TopicId as TopicId;
END;
GO

-- Procedure to get live streams with details
CREATE PROCEDURE sp_GetLiveStreams
    @GameId UNIQUEIDENTIFIER = NULL,
    @TopN INT = 20
AS
BEGIN
    SELECT TOP (@TopN)
        lc.*,
        u.Username as StreamerName,
        u.AvatarUrl as StreamerAvatar,
        g.Name as GameName,
        g.CoverImageUrl as GameImage
    FROM LiveChannels lc
    INNER JOIN Users u ON lc.UserId = u.Id
    LEFT JOIN Games g ON lc.GameId = g.Id
    WHERE lc.Status = 'live'
    AND (@GameId IS NULL OR lc.GameId = @GameId)
    ORDER BY lc.ViewersCount DESC;
END;
GO

-- ================================================
-- ADDITIONAL TRIGGERS
-- ================================================

-- Trigger to update forum category counts
CREATE TRIGGER tr_ForumReplies_Insert ON ForumReplies
AFTER INSERT
AS
BEGIN
    UPDATE ForumTopics
    SET RepliesCount = RepliesCount + 1,
        LastReplyAt = GETDATE(),
        LastReplyBy = i.UserId
    FROM ForumTopics ft
    INNER JOIN inserted i ON ft.Id = i.TopicId;
    
    UPDATE ForumCategories
    SET PostsCount = PostsCount + 1
    FROM ForumCategories fc
    INNER JOIN ForumTopics ft ON fc.Id = ft.CategoryId
    INNER JOIN inserted i ON ft.Id = i.TopicId;
END;
GO

-- Trigger to update video stats
CREATE TRIGGER tr_VideoComments_Insert ON VideoComments
AFTER INSERT
AS
BEGIN
    UPDATE Videos
    SET CommentsCount = CommentsCount + 1
    FROM Videos v
    INNER JOIN inserted i ON v.Id = i.VideoId;
END;
GO

CREATE TRIGGER tr_VideoLikes_Insert ON VideoLikes
AFTER INSERT
AS
BEGIN
    UPDATE Videos
    SET LikesCount = LikesCount + 1
    FROM Videos v
    INNER JOIN inserted i ON v.Id = i.VideoId;
END;
GO

CREATE TRIGGER tr_VideoLikes_Delete ON VideoLikes
AFTER DELETE
AS
BEGIN
    UPDATE Videos
    SET LikesCount = LikesCount - 1
    FROM Videos v
    INNER JOIN deleted d ON v.Id = d.VideoId
    WHERE v.LikesCount > 0;
END;
GO

-- Trigger to log user activity
CREATE TRIGGER tr_Posts_Insert_Activity ON Posts
AFTER INSERT
AS
BEGIN
    INSERT INTO UserActivityLog (UserId, ActivityType, RelatedId, RelatedType)
    SELECT UserId, 'post_created', Id, 'post'
    FROM inserted;
END;
GO

CREATE TRIGGER tr_Videos_Insert_Activity ON Videos
AFTER INSERT
AS
BEGIN
    INSERT INTO UserActivityLog (UserId, ActivityType, RelatedId, RelatedType)
    SELECT UserId, 'video_uploaded', Id, 'video'
    FROM inserted;
    
    UPDATE UserStats
    SET VideosCount = VideosCount + 1
    FROM UserStats us
    INNER JOIN inserted i ON us.UserId = i.UserId;
END;
GO

-- Trigger to update user stats when achievement is completed
CREATE TRIGGER tr_UserAchievements_Update ON UserAchievements
AFTER UPDATE
AS
BEGIN
    IF UPDATE(Completed)
    BEGIN
        UPDATE UserStats
        SET AchievementsCount = AchievementsCount + 1,
            TotalPoints = TotalPoints + a.Points
        FROM UserStats us
        INNER JOIN inserted i ON us.UserId = i.UserId
        INNER JOIN Achievements a ON i.AchievementId = a.Id
        WHERE i.Completed = 1 AND NOT EXISTS (
            SELECT 1 FROM deleted d 
            WHERE d.Id = i.Id AND d.Completed = 1
        );
    END
END;
GO

PRINT 'GGZone Database created successfully!';
PRINT 'All tables, indexes, stored procedures, and triggers have been created.';
PRINT 'Database is ready to support all frontend features including:';
PRINT '- User Management & Authentication';
PRINT '- Social Feed & Posts';
PRINT '- Groups & Communities';
PRINT '- Live Streaming & Chat';
PRINT '- Marketplace & Shopping Cart';
PRINT '- Forums & Discussions';
PRINT '- Videos & Media';
PRINT '- Achievements & Tournaments';
PRINT '- Trending & Leaderboards';
PRINT '- Notifications & Messages';
PRINT '- Friend System & Suggestions';
GO