-- ================================================
-- GGZone Database - Comprehensive Seed Data
-- ================================================

USE GGZone;
GO

-- ================================================
-- ALL INSERTS IN ONE BATCH (No GO statements between)
-- ================================================

-- Declare all variables at the start
DECLARE @User1 UNIQUEIDENTIFIER = NEWID();
DECLARE @User2 UNIQUEIDENTIFIER = NEWID();
DECLARE @User3 UNIQUEIDENTIFIER = NEWID();
DECLARE @User4 UNIQUEIDENTIFIER = NEWID();
DECLARE @User5 UNIQUEIDENTIFIER = NEWID();

DECLARE @Game1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game4 UNIQUEIDENTIFIER = NEWID();

DECLARE @Group1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Group2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Group3 UNIQUEIDENTIFIER = NEWID();

DECLARE @Post1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post5 UNIQUEIDENTIFIER = NEWID();

-- Achievements removed (no longer needed)

DECLARE @Market1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Market2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Market3 UNIQUEIDENTIFIER = NEWID();

DECLARE @Prod1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod4 UNIQUEIDENTIFIER = NEWID();

DECLARE @Tour1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Tour2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Tour3 UNIQUEIDENTIFIER = NEWID();

-- LiveChannels removed (no longer needed)

DECLARE @Video1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video3 UNIQUEIDENTIFIER = NEWID();

DECLARE @ForumCat1 UNIQUEIDENTIFIER = NEWID();
DECLARE @ForumCat2 UNIQUEIDENTIFIER = NEWID();
DECLARE @ForumCat3 UNIQUEIDENTIFIER = NEWID();

DECLARE @Topic1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Topic2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Topic3 UNIQUEIDENTIFIER = NEWID();

DECLARE @Order1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Order2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Order3 UNIQUEIDENTIFIER = NEWID();

-- ================================================
-- INSERT USERS
-- ================================================
INSERT INTO Users (Id, Username, Email, PasswordHash, FullName, AvatarUrl, Bio, Location, Status, Role, IsVerified)
VALUES
(@User1, 'alice_gamer', 'alice@ggzone.com', '$2a$10$hash1', N'Alice Nguyễn', 'https://i.pravatar.cc/150?img=1', N'Pro Valorant player | Streaming daily', N'Hà Nội, Vietnam', 'online', 'user', 1),
(@User2, 'bob_fps', 'bob@ggzone.com', '$2a$10$hash2', N'Bob Trần', 'https://i.pravatar.cc/150?img=2', N'FPS enthusiast | CS2 veteran', N'TP.HCM, Vietnam', 'in-game', 'user', 1),
(@User3, 'charlie_moba', 'charlie@ggzone.com', '$2a$10$hash3', N'Charlie Lê', 'https://i.pravatar.cc/150?img=3', N'League of Legends Diamond player', N'Đà Nẵng, Vietnam', 'online', 'moderator', 1),
(@User4, 'diana_streamer', 'diana@ggzone.com', '$2a$10$hash4', N'Diana Phạm', 'https://i.pravatar.cc/150?img=4', N'Full-time streamer | Content creator', N'Hà Nội, Vietnam', 'online', 'user', 1),
(@User5, 'admin_ggzone', 'admin@ggzone.com', '$2a$10$hash5', N'GGZone Admin', 'https://i.pravatar.cc/150?img=5', N'Official GGZone account', N'Vietnam', 'online', 'admin', 1);

-- ================================================
-- INSERT USER STATS
-- ================================================
INSERT INTO UserStats (UserId, FriendsCount, WinningCount, TournamentsCount, PostsCount, PhotosCount, VideosCount, ForumsCount, GroupsCount, TotalPoints, Level)
VALUES
(@User1, 3, 145, 5, 23, 45, 12, 8, 3, 2500, 25),
(@User2, 2, 89, 3, 15, 20, 8, 5, 2, 1800, 18),
(@User3, 3, 234, 8, 45, 67, 20, 15, 4, 4200, 35),
(@User4, 4, 56, 2, 89, 120, 45, 12, 3, 3100, 28),
(@User5, 0, 0, 0, 5, 0, 0, 0, 0, 0, 1);

-- ================================================
-- INSERT GAMES
-- ================================================
INSERT INTO Games (Id, Name, Slug, Description, CoverImageUrl, IconUrl, Genre, Platform, ReleaseDate, Publisher, IsActive)
VALUES
(@Game1, 'Valorant', 'valorant', N'Tactical 5v5 character-based shooter', 'https://images.contentstack.io/v3/assets/bltb6530b271fddd0b1/blt5c61c0d3b6c5c5e9/valorant-cover.jpg', 'https://i.imgur.com/valorant-icon.png', 'FPS', 'PC', '2020-06-02', 'Riot Games', 1),
(@Game2, 'League of Legends', 'league-of-legends', N'5v5 MOBA strategy game', 'https://images.contentstack.io/v3/assets/blt731023b3d1c6b189/lol-cover.jpg', 'https://i.imgur.com/lol-icon.png', 'MOBA', 'PC', '2009-10-27', 'Riot Games', 1),
(@Game3, 'Counter-Strike 2', 'cs2', N'The legendary tactical shooter reborn', 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg', 'https://i.imgur.com/cs2-icon.png', 'FPS', 'PC', '2023-09-27', 'Valve', 1),
(@Game4, 'Dota 2', 'dota-2', N'The ultimate MOBA experience', 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg', 'https://i.imgur.com/dota2-icon.png', 'MOBA', 'PC', '2013-07-09', 'Valve', 1);

-- ================================================
-- INSERT GROUPS
-- ================================================
INSERT INTO Groups (Id, Name, Description, CoverImageUrl, IconUrl, Visibility, MembersCount, CreatedBy)
VALUES
(@Group1, N'Gamers Vietnam', N'Cộng đồng game thủ Việt Nam', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'https://i.imgur.com/group1.png', 'public', 3, @User1),
(@Group2, N'FPS Legends', N'Group for FPS enthusiasts and pro players', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 'https://i.imgur.com/group2.png', 'public', 3, @User2),
(@Group3, N'MOBA Masters', N'MOBA strategy and tips community', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'https://i.imgur.com/group3.png', 'public', 2, @User3);

-- ================================================
-- INSERT GROUP MEMBERS
-- ================================================
INSERT INTO GroupMembers (GroupId, UserId, Role)
VALUES
(@Group1, @User1, 'admin'),
(@Group1, @User2, 'member'),
(@Group1, @User3, 'member'),
(@Group2, @User2, 'admin'),
(@Group2, @User1, 'moderator'),
(@Group2, @User4, 'member'),
(@Group3, @User3, 'admin'),
(@Group3, @User4, 'member');

-- ================================================
-- INSERT FRIENDSHIPS
-- ================================================
INSERT INTO Friendships (UserId, FriendId, Status)
VALUES
(@User1, @User2, 'accepted'),
(@User1, @User3, 'accepted'),
(@User1, @User4, 'accepted'),
(@User2, @User3, 'accepted'),
(@User2, @User4, 'pending'),
(@User3, @User4, 'accepted');

-- ================================================
-- INSERT POSTS
-- ================================================
INSERT INTO Posts (Id, UserId, GroupId, Content, PostType, LikesCount, CommentsCount, SharesCount)
VALUES
(@Post1, @User1, NULL, N'Just hit Radiant in Valorant! 🎉 Hard work pays off!', 'text', 45, 12, 5),
(@Post2, @User2, @Group2, N'Looking for teammates for CS2 ranked. Need 2 more players!', 'text', 23, 8, 2),
(@Post3, @User3, @Group3, N'New League patch is insane! Check out my gameplay highlights', 'video', 67, 15, 10),
(@Post4, @User4, NULL, N'Streaming live now! Come hang out 🎮', 'text', 89, 23, 15),
(@Post5, @User1, @Group1, N'Tournament this weekend! Who''s joining?', 'text', 34, 18, 7);

-- ================================================
-- INSERT POST MEDIA
-- ================================================
INSERT INTO PostMedia (PostId, MediaUrl, MediaType, OrderIndex)
VALUES
(@Post3, 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'video', 0),
(@Post4, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'image', 0);

-- ================================================
-- INSERT POST LIKES
-- ================================================
INSERT INTO PostLikes (PostId, UserId)
VALUES
(@Post1, @User2),
(@Post1, @User3),
(@Post1, @User4),
(@Post2, @User1),
(@Post2, @User3),
(@Post3, @User1),
(@Post3, @User2),
(@Post3, @User4),
(@Post4, @User1),
(@Post4, @User2),
(@Post4, @User3),
(@Post5, @User2),
(@Post5, @User3),
(@Post5, @User4);

-- ================================================
-- INSERT COMMENTS
-- ================================================
INSERT INTO Comments (PostId, UserId, Content, LikesCount)
VALUES
(@Post1, @User2, N'Congrats! Well deserved!', 5),
(@Post1, @User3, N'Amazing! Teach me your ways 😄', 3),
(@Post1, @User4, N'Let''s duo queue sometime!', 2),
(@Post2, @User1, N'I can join! What rank?', 4),
(@Post2, @User3, N'Count me in if you need one more', 2),
(@Post3, @User1, N'That play at 2:30 was insane!', 8),
(@Post3, @User2, N'Nice mechanics bro', 3),
(@Post4, @User1, N'On my way!', 1),
(@Post4, @User2, N'Followed! Great content', 2),
(@Post5, @User2, N'What time does it start?', 1),
(@Post5, @User3, N'I''m in! Let''s win this', 3),
(@Post5, @User4, N'Registered already 🔥', 2);

-- ================================================
-- INSERT PHOTOS
-- ================================================
INSERT INTO Photos (UserId, ImageUrl, Caption, GameId, LikesCount)
VALUES
(@User1, 'https://images.unsplash.com/photo-1542751371-adc38448a05e', N'Epic Valorant clutch moment!', @Game1, 45),
(@User2, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', N'CS2 ace on Dust2', @Game3, 67),
(@User3, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', N'Pentakill in ranked!', @Game2, 89),
(@User4, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', N'New gaming setup!', NULL, 123),
(@User1, 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', N'Tournament victory!', @Game1, 156);

-- ================================================
-- ACHIEVEMENTS MODULE REMOVED
-- ================================================
-- Achievements and UserAchievements tables have been removed from the schema

-- ================================================
-- INSERT MARKETPLACE ITEMS
-- ================================================
INSERT INTO MarketplaceItems (Id, SellerId, GameId, Title, Description, CoverImageUrl, Category, Price, Rating, ReviewsCount, Status)
VALUES
(@Market1, @User1, @Game1, N'Valorant Account - Radiant Rank', N'High-level account with rare skins', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'Accounts', 5000000, 4.8, 12, 'online'),
(@Market2, @User2, @Game3, N'CS2 Knife - Karambit Fade', N'Factory New condition, rare pattern', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 'Skins', 15000000, 4.9, 8, 'online'),
(@Market3, @User3, @Game2, N'LoL Account - Diamond 1', N'All champions unlocked, many skins', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'Accounts', 3500000, 4.5, 15, 'online');

-- ================================================
-- INSERT MARKETPLACE REVIEWS
-- ================================================
INSERT INTO MarketplaceReviews (ItemId, UserId, Rating, Comment)
VALUES
(@Market1, @User2, 5, N'Great account! Fast delivery'),
(@Market1, @User3, 5, N'Exactly as described, highly recommend'),
(@Market2, @User1, 5, N'Beautiful knife, worth every penny'),
(@Market3, @User2, 4, N'Good account but took a while to transfer'),
(@Market3, @User4, 5, N'Perfect! Thanks seller');

-- ================================================
-- INSERT STORE PRODUCTS
-- ================================================
INSERT INTO StoreProducts (Id, Name, Description, CoverImageUrl, Price, Category, GameId, Rating, ReviewsCount, Status)
VALUES
(@Prod1, N'Premium Avatar Frame', N'Exclusive animated avatar frame', 'https://i.imgur.com/prod1.png', 50000, 'Cosmetics', NULL, 4.7, 234, 'online'),
(@Prod2, N'Level Boost Pack', N'Instant +10 levels', 'https://i.imgur.com/prod2.png', 100000, 'Boosts', NULL, 4.5, 567, 'online'),
(@Prod3, N'VIP Membership - 1 Month', N'Access to exclusive features', 'https://i.imgur.com/prod3.png', 150000, 'Membership', NULL, 4.9, 1234, 'online'),
(@Prod4, N'Custom Profile Theme', N'Personalize your profile', 'https://i.imgur.com/prod4.png', 75000, 'Cosmetics', NULL, 4.6, 456, 'online');

-- ================================================
-- INSERT TOURNAMENTS
-- ================================================
INSERT INTO Tournaments (Id, GameId, Name, Description, CoverImageUrl, StartDate, EndDate, MaxParticipants, CurrentParticipants, PrizePool, Status, CreatedBy)
VALUES
(@Tour1, @Game1, N'Vietnam Valorant Championship', N'National championship for top players', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', DATEADD(DAY, 7, GETDATE()), DATEADD(DAY, 10, GETDATE()), 64, 45, 50000000, 'upcoming', @User5),
(@Tour2, @Game3, N'CS2 Winter Cup', N'Seasonal tournament with big prizes', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', DATEADD(DAY, -3, GETDATE()), DATEADD(DAY, 2, GETDATE()), 32, 32, 30000000, 'ongoing', @User5),
(@Tour3, @Game2, N'LoL Masters Series', N'Monthly competitive series', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', DATEADD(DAY, -10, GETDATE()), DATEADD(DAY, -5, GETDATE()), 128, 128, 75000000, 'completed', @User5);

-- ================================================
-- INSERT TOURNAMENT PARTICIPANTS
-- ================================================
INSERT INTO TournamentParticipants (TournamentId, UserId, Rank, Score)
VALUES
(@Tour1, @User1, NULL, 0),
(@Tour1, @User2, NULL, 0),
(@Tour1, @User3, NULL, 0),
(@Tour2, @User1, 5, 2450),
(@Tour2, @User2, 3, 2780),
(@Tour2, @User4, 12, 1890),
(@Tour3, @User1, 2, 3450),
(@Tour3, @User3, 1, 3890),
(@Tour3, @User4, 8, 2340);

-- ================================================
-- LIVESTREAM MODULE REMOVED
-- ================================================
-- LiveChannels, StreamFollowers, and StreamChatMessages tables have been removed from the schema

-- ================================================
-- INSERT VIDEOS
-- ================================================
INSERT INTO Videos (Id, UserId, GameId, Title, Description, VideoUrl, ThumbnailUrl, Duration, ViewsCount, LikesCount, CommentsCount, Category, IsPublic)
VALUES
(@Video1, @User1, @Game1, N'How to Rank Up Fast in Valorant', N'Complete guide to climbing ranks', 'https://video.ggzone.com/v1', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 720, 15234, 1234, 89, 'tutorial', 1),
(@Video2, @User2, @Game3, N'CS2 Best Plays Montage', N'My best moments from last month', 'https://video.ggzone.com/v2', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 480, 8765, 876, 45, 'highlight', 1),
(@Video3, @User3, @Game2, N'League Patch 13.24 Analysis', N'Breaking down the new meta', 'https://video.ggzone.com/v3', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 900, 23456, 2345, 156, 'review', 1);

-- ================================================
-- INSERT VIDEO COMMENTS
-- ================================================
INSERT INTO VideoComments (VideoId, UserId, Content, LikesCount)
VALUES
(@Video1, @User2, N'Super helpful! Thanks for sharing', 12),
(@Video1, @User3, N'This actually works! Ranked up 2 tiers', 8),
(@Video1, @User4, N'More content like this please!', 5),
(@Video2, @User1, N'Insane shots bro!', 15),
(@Video2, @User3, N'That 1v5 clutch was crazy', 10),
(@Video3, @User1, N'Great analysis as always', 20),
(@Video3, @User2, N'Helped me understand the new patch', 8),
(@Video3, @User4, N'When is the next video coming?', 3);

-- ================================================
-- INSERT VIDEO LIKES
-- ================================================
INSERT INTO VideoLikes (VideoId, UserId)
VALUES
(@Video1, @User2),
(@Video1, @User3),
(@Video1, @User4),
(@Video2, @User1),
(@Video2, @User3),
(@Video2, @User4),
(@Video3, @User1),
(@Video3, @User2),
(@Video3, @User4);

-- ================================================
-- INSERT FORUM CATEGORIES
-- ================================================
INSERT INTO ForumCategories (Id, Name, Description, IconUrl, GameId, TopicsCount, PostsCount)
VALUES
(@ForumCat1, N'General Discussion', N'Talk about anything gaming related', 'https://i.imgur.com/forum1.png', NULL, 45, 234),
(@ForumCat2, N'Valorant Strategy', N'Tips, tricks, and strategies', 'https://i.imgur.com/forum2.png', @Game1, 67, 456),
(@ForumCat3, N'CS2 Community', N'CS2 discussions and updates', 'https://i.imgur.com/forum3.png', @Game3, 89, 678);

-- ================================================
-- INSERT FORUM TOPICS
-- ================================================
INSERT INTO ForumTopics (Id, CategoryId, UserId, Title, Content, ViewsCount, RepliesCount, IsPinned, LastReplyAt, LastReplyBy)
VALUES
(@Topic1, @ForumCat1, @User1, N'Welcome to GGZone!', N'Introduce yourself here', 1234, 45, 1, GETDATE(), @User3),
(@Topic2, @ForumCat2, @User2, N'Best Agent Compositions for Ranked', N'Let''s discuss the current meta', 567, 23, 0, DATEADD(HOUR, -2, GETDATE()), @User4),
(@Topic3, @ForumCat3, @User3, N'CS2 Update Discussion', N'What do you think about the new update?', 890, 34, 0, DATEADD(HOUR, -1, GETDATE()), @User2);

-- ================================================
-- INSERT FORUM REPLIES
-- ================================================
INSERT INTO ForumReplies (TopicId, UserId, Content, LikesCount)
VALUES
(@Topic1, @User2, N'Hi everyone! Excited to be here', 5),
(@Topic1, @User3, N'Welcome! Feel free to ask anything', 3),
(@Topic1, @User4, N'Great community so far!', 2),
(@Topic2, @User1, N'I think Jett + Sage is still strong', 8),
(@Topic2, @User3, N'Don''t sleep on Viper comps', 6),
(@Topic2, @User4, N'Chamber is underrated right now', 4),
(@Topic3, @User1, N'The new maps are amazing!', 10),
(@Topic3, @User2, N'Performance improvements are great', 7),
(@Topic3, @User4, N'Still getting used to the changes', 3);

-- ================================================
-- INSERT NOTIFICATIONS
-- ================================================
INSERT INTO Notifications (UserId, Type, Title, Content, RelatedId, RelatedType, IsRead)
VALUES
(@User1, 'friend_request', N'New Friend Request', N'Bob Trần sent you a friend request', @User2, 'user', 0),
(@User1, 'post_like', N'Someone liked your post', N'Charlie Lê liked your post', @Post1, 'post', 1),
(@User1, 'comment', N'New Comment', N'Diana Phạm commented on your post', @Post1, 'post', 0),
(@User2, 'tournament', N'Tournament Starting Soon', N'CS2 Winter Cup starts in 1 hour', @Tour2, 'tournament', 0),
(@User2, 'order_completed', N'Order Completed', N'Your order has been processed', @Order1, 'order', 1),
(@User3, 'group_invite', N'Group Invitation', N'You were invited to FPS Legends', @Group2, 'group', 1),
(@User4, 'video_uploaded', N'New Video', N'Alice Nguyễn uploaded a new video!', @Video1, 'video', 0);

-- ================================================
-- INSERT MESSAGES
-- ================================================
INSERT INTO Messages (SenderId, ReceiverId, Content, IsRead)
VALUES
(@User1, @User2, N'Hey! Want to play some Valorant?', 1),
(@User2, @User1, N'Sure! Give me 10 minutes', 1),
(@User1, @User2, N'Cool, I''ll be in the lobby', 0),
(@User3, @User1, N'Great game yesterday!', 1),
(@User1, @User3, N'Thanks! We should team up more often', 1),
(@User4, @User2, N'Can you help me with CS2 settings?', 1),
(@User2, @User4, N'Of course! What do you need?', 0);

-- ================================================
-- INSERT TRENDING ITEMS
-- ================================================
INSERT INTO TrendingItems (ContentType, ContentId, GameId, ViewsCount, EngagementScore, Rank, TrendingDate)
VALUES
('game', @Game1, @Game1, 15234, 95.5, 1, CAST(GETDATE() AS DATE)),
('game', @Game3, @Game3, 12456, 88.3, 2, CAST(GETDATE() AS DATE)),
('game', @Game2, @Game2, 10234, 82.7, 3, CAST(GETDATE() AS DATE)),
('game', @Game4, @Game4, 8765, 75.2, 4, CAST(GETDATE() AS DATE)),
('video', @Video3, @Game2, 23456, 92.1, 1, CAST(GETDATE() AS DATE)),
('video', @Video1, @Game1, 15234, 85.6, 2, CAST(GETDATE() AS DATE)),
('video', @Video2, @Game3, 8765, 78.3, 3, CAST(GETDATE() AS DATE)),
('player', @User3, NULL, 5678, 88.8, 1, CAST(GETDATE() AS DATE)),
('player', @User1, NULL, 4567, 82.3, 2, CAST(GETDATE() AS DATE)),
('player', @User2, NULL, 3456, 75.6, 3, CAST(GETDATE() AS DATE));

-- ================================================
-- INSERT TRENDING PLAYERS
-- ================================================
INSERT INTO TrendingPlayers (UserId, GameId, Rank, Score, WinRate, TotalMatches, TrendingDate)
VALUES
(@User3, @Game2, 1, 3890, 78.5, 234, CAST(GETDATE() AS DATE)),
(@User1, @Game1, 2, 3450, 72.3, 189, CAST(GETDATE() AS DATE)),
(@User2, @Game3, 3, 2780, 68.9, 156, CAST(GETDATE() AS DATE)),
(@User4, @Game1, 5, 2340, 65.2, 145, CAST(GETDATE() AS DATE));

-- ================================================
-- INSERT SHOPPING CART
-- ================================================
INSERT INTO ShoppingCart (UserId, ProductId, MarketplaceItemId, Quantity)
VALUES
(@User1, @Prod1, NULL, 1),
(@User1, NULL, @Market2, 1),
(@User2, @Prod3, NULL, 1),
(@User3, @Prod2, NULL, 2),
(@User4, NULL, @Market3, 1);

-- ================================================
-- INSERT STORE ORDERS
-- ================================================
INSERT INTO StoreOrders (Id, UserId, ProductId, Quantity, TotalAmount, Status)
VALUES
(@Order1, @User1, @Prod1, 1, 50000, 'completed'),
(@Order2, @User2, @Prod3, 1, 150000, 'completed'),
(@Order3, @User3, @Prod2, 1, 100000, 'pending');

-- ================================================
-- INSERT ORDER ITEMS
-- ================================================
INSERT INTO OrderItems (OrderId, ProductId, ProductName, Quantity, UnitPrice, TotalPrice)
VALUES
(@Order1, @Prod1, N'Premium Avatar Frame', 1, 50000, 50000),
(@Order2, @Prod3, N'VIP Membership - 1 Month', 1, 150000, 150000),
(@Order3, @Prod2, N'Level Boost Pack', 1, 100000, 100000);

-- ================================================
-- INSERT USER PREFERENCES
-- ================================================
INSERT INTO UserPreferences (UserId, Theme, Language, EmailNotifications, PushNotifications, PrivacyLevel, ShowOnlineStatus)
VALUES
(@User1, 'dark', 'vi', 1, 1, 'public', 1),
(@User2, 'dark', 'vi', 1, 0, 'friends', 1),
(@User3, 'light', 'en', 1, 1, 'public', 1),
(@User4, 'dark', 'vi', 0, 1, 'public', 1),
(@User5, 'light', 'en', 1, 1, 'public', 1);

-- ================================================
-- INSERT USER BADGES
-- ================================================
INSERT INTO UserBadges (UserId, BadgeName, BadgeType, IconUrl)
VALUES
(@User1, N'Verified Player', 'verified', 'https://i.imgur.com/verified.png'),
(@User3, N'Moderator', 'moderator', 'https://i.imgur.com/mod.png'),
(@User4, N'Content Creator', 'partner', 'https://i.imgur.com/partner.png'),
(@User5, N'Admin', 'developer', 'https://i.imgur.com/admin.png');

-- ================================================
-- GAME SCREENSHOTS & VIDEOS REMOVED
-- ================================================
-- GameScreenshots and GameVideos tables do not exist in schema

-- ================================================
-- INSERT USER GAME LIBRARY (Play Now Feature)
-- ================================================
INSERT INTO UserGameLibrary (UserId, GameId, IsInstalled, InstallPath, LastPlayed, TotalPlayTime, IsFavorite)
VALUES
(@User1, @Game1, 1, 'C:\Games\Valorant', DATEADD(HOUR, -2, GETDATE()), 30000, 1),
(@User1, @Game2, 1, 'C:\Games\LeagueOfLegends', DATEADD(DAY, -1, GETDATE()), 72000, 1),
(@User2, @Game3, 1, 'C:\Games\CS2', DATEADD(HOUR, -1, GETDATE()), 27000, 1),
(@User2, @Game1, 0, NULL, DATEADD(DAY, -5, GETDATE()), 18000, 0),
(@User3, @Game2, 1, 'C:\Games\LeagueOfLegends', DATEADD(HOUR, -3, GETDATE()), 43200, 1),
(@User3, @Game4, 1, 'C:\Games\Dota2', DATEADD(DAY, -2, GETDATE()), 28800, 0),
(@User4, @Game1, 1, 'C:\Games\Valorant', DATEADD(HOUR, -5, GETDATE()), 8700, 1);

-- ================================================
-- INSERT GAME LAUNCH LOGS
-- ================================================
INSERT INTO GameLaunchLogs (UserId, GameId, LaunchMethod, LaunchedAt, SessionDuration, EndedAt)
VALUES
(@User1, @Game1, 'desktop', DATEADD(HOUR, -4, GETDATE()), 120, DATEADD(HOUR, -2, GETDATE())),
(@User1, @Game2, 'desktop', DATEADD(DAY, -1, GETDATE()), 180, DATEADD(DAY, -1, DATEADD(HOUR, 3, GETDATE()))),
(@User2, @Game3, 'desktop', DATEADD(HOUR, -3, GETDATE()), 90, DATEADD(HOUR, -1, GETDATE())),
(@User3, @Game2, 'desktop', DATEADD(HOUR, -5, GETDATE()), 150, DATEADD(HOUR, -3, GETDATE())),
(@User4, @Game1, 'desktop', DATEADD(HOUR, -6, GETDATE()), 60, DATEADD(HOUR, -5, GETDATE()));

-- ================================================
-- INSERT GAME REVIEWS
-- ================================================
INSERT INTO GameReviews (GameId, UserId, Rating, Title, Content, HoursPlayed, IsRecommended, HelpfulCount)
VALUES
(@Game1, @User1, 5, N'Amazing tactical shooter!', N'Best FPS game I''ve played. Great mechanics and strategy depth.', 500, 1, 45),
(@Game1, @User2, 4, N'Great game but steep learning curve', N'Takes time to master but very rewarding', 300, 1, 23),
(@Game2, @User3, 5, N'The MOBA king', N'Still the best MOBA after all these years', 1200, 1, 89),
(@Game3, @User2, 5, N'CS2 is incredible', N'Huge improvement over CS:GO. Love the new engine', 450, 1, 67),
(@Game4, @User3, 4, N'Complex but rewarding', N'Steep learning curve but amazing once you get it', 800, 1, 34);

-- ================================================
-- INSERT FRIEND SUGGESTIONS
-- ================================================
INSERT INTO FriendSuggestions (UserId, SuggestedUserId, Reason, Score, IsShown)
VALUES
(@User1, @User5, 'same_game', 75.5, 0),
(@User2, @User5, 'mutual_friends', 82.3, 1),
(@User4, @User5, 'same_group', 68.9, 1),
(@User5, @User1, 'mutual_friends', 70.2, 0);

-- ================================================
-- INSERT USER ACTIVITY LOG
-- ================================================
INSERT INTO UserActivityLog (UserId, ActivityType, RelatedId, RelatedType, Metadata)
VALUES
(@User1, 'login', NULL, NULL, '{"ip": "192.168.1.1", "device": "Windows PC"}'),
(@User1, 'post_created', @Post1, 'post', '{"content_length": 45}'),
(@User1, 'tournament_joined', @Tour1, 'tournament', '{"tournament_name": "Vietnam Valorant Championship"}'),
(@User2, 'login', NULL, NULL, '{"ip": "192.168.1.2", "device": "Windows PC"}'),
(@User2, 'game_played', @Game3, 'game', '{"duration": 45, "result": "win"}'),
(@User3, 'login', NULL, NULL, '{"ip": "192.168.1.3", "device": "Mac"}'),
(@User3, 'video_uploaded', @Video3, 'video', '{"duration": 900}'),
(@User4, 'product_purchased', @Prod3, 'product', '{"product_name": "VIP Membership", "amount": 150000}');

-- ================================================
-- INSERT ADMIN AUDIT LOGS
-- ================================================
INSERT INTO AdminAuditLogs (AdminUserId, Action, TargetType, TargetId, OldValue, NewValue, IpAddress, UserAgent, Reason)
VALUES
(@User5, 'user_verified', 'user', @User1, 'IsVerified: 0', 'IsVerified: 1', '192.168.1.100', 'Mozilla/5.0', N'User verification approved'),
(@User5, 'post_featured', 'post', @Post1, NULL, 'IsFeatured: 1', '192.168.1.100', 'Mozilla/5.0', N'Featured on homepage'),
(@User3, 'post_moderated', 'post', @Post2, NULL, 'Status: approved', '192.168.1.101', 'Mozilla/5.0', N'Content review passed');

-- ================================================
-- INSERT DAILY STATISTICS
-- ================================================
INSERT INTO DailyStatistics (StatDate, NewUsers, ActiveUsers, TotalPosts, TotalComments, TotalVideos, TotalGameLaunches, TotalRevenue, TotalOrders)
VALUES
(CAST(DATEADD(DAY, -2, GETDATE()) AS DATE), 15, 234, 45, 123, 8, 567, 2500000, 12),
(CAST(DATEADD(DAY, -1, GETDATE()) AS DATE), 23, 345, 67, 189, 12, 678, 3200000, 18),
(CAST(GETDATE() AS DATE), 18, 289, 52, 145, 10, 589, 2800000, 15);

-- ================================================
-- INSERT FEATURED CONTENT
-- ================================================
INSERT INTO FeaturedContent (ContentType, ContentId, Title, Description, ImageUrl, DisplayOrder, StartDate, EndDate, IsActive, CreatedBy)
VALUES
('game', @Game1, N'Valorant - Featured Game', N'Tactical shooter of the month', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 1, DATEADD(DAY, -5, GETDATE()), DATEADD(DAY, 25, GETDATE()), 1, @User5),
('tournament', @Tour1, N'Vietnam Championship', N'Join the biggest tournament', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 2, GETDATE(), DATEADD(DAY, 10, GETDATE()), 1, @User5),
('video', @Video1, N'Featured Tutorial', N'Learn from the best', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 3, DATEADD(DAY, -2, GETDATE()), DATEADD(DAY, 5, GETDATE()), 1, @User5);

-- ================================================
-- INSERT ANNOUNCEMENTS
-- ================================================
INSERT INTO Announcements (Title, Content, Type, Priority, TargetAudience, IsActive, StartDate, EndDate, CreatedBy)
VALUES
(N'Welcome to GGZone!', N'Thank you for joining our gaming community. Explore features and connect with gamers!', 'info', 'normal', 'all', 1, DATEADD(DAY, -30, GETDATE()), NULL, @User5),
(N'Server Maintenance', N'Scheduled maintenance on Sunday 2AM-4AM. Services will be temporarily unavailable.', 'maintenance', 'high', 'all', 1, GETDATE(), DATEADD(DAY, 7, GETDATE()), @User5),
(N'New Tournament Starting!', N'Vietnam Valorant Championship registration is now open. Join now!', 'event', 'high', 'users', 1, GETDATE(), DATEADD(DAY, 10, GETDATE()), @User5);

-- ================================================
-- INSERT EMAIL TEMPLATES
-- ================================================
INSERT INTO EmailTemplates (TemplateName, Subject, HtmlBody, TextBody, Category, Variables, IsActive, UpdatedBy)
VALUES
('welcome_email', N'Welcome to GGZone!', N'<h1>Welcome {{username}}!</h1><p>Thank you for joining GGZone.</p>', N'Welcome {{username}}! Thank you for joining GGZone.', 'user', '["username", "email"]', 1, @User5),
('password_reset', N'Reset Your Password', N'<h1>Password Reset</h1><p>Click here to reset: {{reset_link}}</p>', N'Password Reset. Click here: {{reset_link}}', 'security', '["username", "reset_link"]', 1, @User5),
('order_confirmation', N'Order Confirmed', N'<h1>Order #{{order_id}}</h1><p>Total: {{total_amount}}</p>', N'Order #{{order_id}} confirmed. Total: {{total_amount}}', 'transaction', '["order_id", "total_amount", "items"]', 1, @User5);

PRINT '================================================';
PRINT 'GGZone Database - Seed Data Insertion Complete!';
PRINT '================================================';
PRINT '';
PRINT 'Data Summary:';
PRINT '- Users: 5 accounts created';
PRINT '- Games: 4 popular games added';
PRINT '- Groups: 3 communities created';
PRINT '- Posts: 5 social posts with likes and comments';
PRINT '- Friendships: Multiple friend connections';
PRINT '- Marketplace: 3 items for sale';
PRINT '- Store Products: 4 digital products';
PRINT '- Tournaments: 3 tournaments (upcoming, ongoing, completed)';
PRINT '- Videos: 3 uploaded videos with engagement';
PRINT '- Forums: 3 categories with topics and replies';
PRINT '- Notifications: 7 user notifications';
PRINT '- Messages: Direct messaging between users';
PRINT '- Trending: Games, players, and videos rankings';
PRINT '- Shopping Cart: User cart items';
PRINT '- Orders: Completed and pending orders';
PRINT '- User Game Library: 7 library entries';
PRINT '- Game Launch Logs: 5 play sessions';
PRINT '- Admin Audit Logs: 3 admin actions';
PRINT '- Daily Statistics: 3 days of stats';
PRINT '- Featured Content: 3 featured items';
PRINT '- Announcements: 3 active announcements';
PRINT '- Email Templates: 3 email templates';
PRINT '';
PRINT 'Test Accounts:';
PRINT '- alice_gamer (Radiant Valorant player)';
PRINT '- bob_fps (CS2 veteran)';
PRINT '- charlie_moba (LoL Diamond player, Moderator)';
PRINT '- diana_streamer (Content creator)';
PRINT '- admin_ggzone (Admin account)';
PRINT '';
PRINT 'Note: Livestream, Achievements, GameScreenshots, and GameVideos modules have been removed';
PRINT 'Database is ready for testing!';

GO

-- ================================================
-- VERIFICATION QUERIES
-- ================================================
SELECT 'Users' as TableName, COUNT(*) as RecordCount FROM Users
UNION ALL SELECT 'UserStats', COUNT(*) FROM UserStats
UNION ALL SELECT 'UserPreferences', COUNT(*) FROM UserPreferences
UNION ALL SELECT 'UserBadges', COUNT(*) FROM UserBadges
UNION ALL SELECT 'UserGameLibrary', COUNT(*) FROM UserGameLibrary
UNION ALL SELECT 'UserActivityLog', COUNT(*) FROM UserActivityLog
UNION ALL SELECT 'Friendships', COUNT(*) FROM Friendships
UNION ALL SELECT 'FriendSuggestions', COUNT(*) FROM FriendSuggestions
UNION ALL SELECT 'Groups', COUNT(*) FROM Groups
UNION ALL SELECT 'GroupMembers', COUNT(*) FROM GroupMembers
UNION ALL SELECT 'Games', COUNT(*) FROM Games
UNION ALL SELECT 'GameReviews', COUNT(*) FROM GameReviews
UNION ALL SELECT 'GameLaunchLogs', COUNT(*) FROM GameLaunchLogs
UNION ALL SELECT 'Posts', COUNT(*) FROM Posts
UNION ALL SELECT 'PostMedia', COUNT(*) FROM PostMedia
UNION ALL SELECT 'PostLikes', COUNT(*) FROM PostLikes
UNION ALL SELECT 'Comments', COUNT(*) FROM Comments
UNION ALL SELECT 'Photos', COUNT(*) FROM Photos
UNION ALL SELECT 'Videos', COUNT(*) FROM Videos
UNION ALL SELECT 'VideoComments', COUNT(*) FROM VideoComments
UNION ALL SELECT 'VideoLikes', COUNT(*) FROM VideoLikes
UNION ALL SELECT 'MarketplaceItems', COUNT(*) FROM MarketplaceItems
UNION ALL SELECT 'MarketplaceReviews', COUNT(*) FROM MarketplaceReviews
UNION ALL SELECT 'StoreProducts', COUNT(*) FROM StoreProducts
UNION ALL SELECT 'StoreOrders', COUNT(*) FROM StoreOrders
UNION ALL SELECT 'OrderItems', COUNT(*) FROM OrderItems
UNION ALL SELECT 'ShoppingCart', COUNT(*) FROM ShoppingCart
UNION ALL SELECT 'Tournaments', COUNT(*) FROM Tournaments
UNION ALL SELECT 'TournamentParticipants', COUNT(*) FROM TournamentParticipants
UNION ALL SELECT 'Notifications', COUNT(*) FROM Notifications
UNION ALL SELECT 'Messages', COUNT(*) FROM Messages
UNION ALL SELECT 'TrendingItems', COUNT(*) FROM TrendingItems
UNION ALL SELECT 'TrendingPlayers', COUNT(*) FROM TrendingPlayers
UNION ALL SELECT 'ForumCategories', COUNT(*) FROM ForumCategories
UNION ALL SELECT 'ForumTopics', COUNT(*) FROM ForumTopics
UNION ALL SELECT 'ForumReplies', COUNT(*) FROM ForumReplies
UNION ALL SELECT 'AdminAuditLogs', COUNT(*) FROM AdminAuditLogs
UNION ALL SELECT 'DailyStatistics', COUNT(*) FROM DailyStatistics
UNION ALL SELECT 'FeaturedContent', COUNT(*) FROM FeaturedContent
UNION ALL SELECT 'Announcements', COUNT(*) FROM Announcements
UNION ALL SELECT 'EmailTemplates', COUNT(*) FROM EmailTemplates
ORDER BY TableName;

PRINT '';
PRINT '================================================';
PRINT 'Verification complete! All data inserted successfully.';
PRINT '================================================';
GO
