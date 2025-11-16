-- ================================================
-- GameCO Database Sample Data Inserts
-- ================================================
-- This file contains sample data that matches the mock data in the frontend
-- Run this after creating the database with SQLQuery1.sql

USE GameCO;
GO

-- ================================================
-- USERS
-- ================================================

-- Insert Users
INSERT INTO Users (Id, Username, Email, PasswordHash, FullName, AvatarUrl, Bio, Location, Status, Role, IsVerified, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655440000', 'alice', 'alice@example.com', 
 '$2a$10$hashedpassword1', 'Alice Nguyen', 
 'https://api.dicebear.com/7.x/avataaars/svg?seed=Alice',
 'Gaming enthusiast | Valorant player | Community leader', 
 'Ho Chi Minh City, VN', 'online', 'user', 1, '2024-01-15T10:30:00'),

('550e8400-e29b-41d4-a716-446655440001', 'bob', 'bob@example.com',
 '$2a$10$hashedpassword2', 'Bob Tran',
 'https://api.dicebear.com/7.x/avataaars/svg?seed=Bob',
 'CS2 competitive player | Esports caster',
 'Hanoi, VN', 'offline', 'moderator', 1, '2024-02-10T14:45:00'),

('550e8400-e29b-41d4-a716-446655440002', 'charlie', 'charlie@example.com',
 '$2a$10$hashedpassword3', 'Charlie Pham',
 'https://api.dicebear.com/7.x/avataaars/svg?seed=Charlie',
 'League of Legends addict',
 'Da Nang, VN', 'offline', 'user', 0, '2024-03-05T09:15:00'),

('550e8400-e29b-41d4-a716-446655440003', 'david', 'david@example.com',
 '$2a$10$hashedpassword4', 'David Le',
 'https://api.dicebear.com/7.x/avataaars/svg?seed=David',
 'FPS lover | Always learning',
 'Bangkok, Thailand', 'in-game', 'user', 1, '2024-01-20T11:20:00'),

('550e8400-e29b-41d4-a716-446655440004', 'emma', 'emma@example.com',
 '$2a$10$hashedpassword5', 'Emma Vo',
 'https://api.dicebear.com/7.x/avataaars/svg?seed=Emma',
 'Streaming occasionally | Casual gamer',
 'Can Tho, VN', 'online', 'user', 1, '2024-02-25T15:00:00'),

('550e8400-e29b-41d4-a716-446655440005', 'frank', 'frank@example.com',
 '$2a$10$hashedpassword6', 'Frank Duong',
 'https://api.dicebear.com/7.x/avataaars/svg?seed=Frank',
 'Admin moderator | Community manager',
 'Ho Chi Minh City, VN', 'online', 'admin', 1, '2024-01-01T00:00:00');

GO

-- ================================================
-- USER STATS
-- ================================================

INSERT INTO UserStats (Id, UserId, FriendsCount, WinningCount, TournamentsCount, PostsCount, PhotosCount)
VALUES
(NEWID(), '550e8400-e29b-41d4-a716-446655440000', 2, 5, 1, 3, 1),
(NEWID(), '550e8400-e29b-41d4-a716-446655440001', 1, 1, 0, 1, 0),
(NEWID(), '550e8400-e29b-41d4-a716-446655440002', 1, 8, 2, 2, 2),
(NEWID(), '550e8400-e29b-41d4-a716-446655440003', 5, 12, 3, 8, 4),
(NEWID(), '550e8400-e29b-41d4-a716-446655440004', 3, 6, 1, 5, 3),
(NEWID(), '550e8400-e29b-41d4-a716-446655440005', 8, 20, 5, 15, 8);

GO

-- ================================================
-- GAMES
-- ================================================

INSERT INTO Games (Id, Name, Slug, Description, CoverImageUrl, Genre, Platform, ReleaseDate, Publisher, IsActive, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655550000', 'Valorant', 'valorant',
 'A competitive tactical 5v5 FPS game with unique agent abilities',
 'https://cmsassets.rgpub.io/sanity/images/dsfx7636/content_organization/731216ff2453134e530feabc9dbd3c44e480e352-1200x625.jpg',
 'FPS', 'PC', '2020-06-02', 'Riot Games', 1, '2020-06-02T00:00:00'),

('550e8400-e29b-41d4-a716-446655550001', 'League of Legends', 'league-of-legends',
 'The most popular MOBA game with strategic team fights',
 'https://cdn1.epicgames.com/offer/24b9b5e323bc40eea252a10cdd3b2f10/EGS_LeagueofLegends_RiotGames_S1_2560x1440-47eb328eac5ddd63ebd096ded7d0d5ab',
 'MOBA', 'PC', '2009-10-27', 'Riot Games', 1, '2009-10-27T00:00:00'),

('550e8400-e29b-41d4-a716-446655550002', 'Counter-Strike 2', 'cs2',
 'Counter-Strike 2 - The next evolution of the legendary FPS',
 'https://wallpapersbq.com/images/counter-strike-2/counter-strike-2-wallpaper-1.webp',
 'FPS', 'PC', '2023-09-01', 'Valve', 1, '2023-09-01T00:00:00'),

('550e8400-e29b-41d4-a716-446655550003', 'DOTA 2', 'dota-2',
 'Free-to-play MOBA with a massive esports community',
 'https://dmarket.com/blog/best-dota2-wallpapers/qop1_hu_867c7cf84c620e27.jpg',
 'MOBA', 'PC', '2013-07-09', 'Valve', 1, '2013-07-09T00:00:00'),

('550e8400-e29b-41d4-a716-446655550004', 'Overwatch 2', 'overwatch-2',
 'Team-based FPS with diverse characters and exciting abilities',
 'https://images8.alphacoders.com/131/1318379.png',
 'FPS', 'Multi-platform', '2022-10-04', 'Blizzard Entertainment', 1, '2022-10-04T00:00:00'),

('550e8400-e29b-41d4-a716-446655550005', 'Minecraft', 'minecraft',
 'Creative sandbox game where you can build anything',
 'https://4kwallpapers.com/images/wallpapers/minecraft-spring-to-3840x2160-21999.jpg',
 'Sandbox', 'Multi-platform', '2011-11-18', 'Mojang Studios', 1, '2011-11-18T00:00:00');

GO

-- ================================================
-- GROUPS
-- ================================================

INSERT INTO Groups (Id, Name, Description, CoverImageUrl, Visibility, MembersCount, CreatedBy, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655660000', 'Gamers VN', 
 'Vietnam gaming community for all types of gamers',
 'https://cdn.tgdd.vn/Files/2020/06/08/1261696/moi-tai-bo-hinh-nen-asus-rog-2020-moi-nhat-4_800x450.jpg',
 'public', 156, '550e8400-e29b-41d4-a716-446655440000', '2024-01-10T08:30:00'),

('550e8400-e29b-41d4-a716-446655660001', 'FPS Lovers',
 'Dedicated community for FPS game enthusiasts - Valorant, CS2,...',
 'https://4kwallpapers.com/images/walls/thumbs/3950.png',
 'public', 234, '550e8400-e29b-41d4-a716-446655440001', '2024-01-20T14:15:00'),

('550e8400-e29b-41d4-a716-446655660002', 'Competitive Esports',
 'Tournament preparation and competitive play discussions',
 'https://www.upwork.com/mc/documents/designelementsavatar2.png',
 'private', 45, '550e8400-e29b-41d4-a716-446655440005', '2024-02-05T11:00:00'),

('550e8400-e29b-41d4-a716-446655660003', 'MOBA Players Unite',
 'For League of Legends and DOTA 2 enthusiasts',
 'https://massivelyop.com/wp-content/uploads/2021/07/pokemon_unite_preparations.jpg',
 'public', 89, '550e8400-e29b-41d4-a716-446655440002', '2024-01-25T09:20:00'),

('550e8400-e29b-41d4-a716-446655660004', 'Casual Gamers Squad',
 'Relaxed gaming group for casual players and friends',
 'https://media.readyplayer.me/nexus/images/Posed-GroupShot.webp',
 'public', 512, '550e8400-e29b-41d4-a716-446655440003', '2024-02-15T13:45:00');

GO

-- ================================================
-- FRIENDSHIPS
-- ================================================

INSERT INTO Friendships (Id, UserId, FriendId, Status, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655330000', '550e8400-e29b-41d4-a716-446655440000', 
 '550e8400-e29b-41d4-a716-446655440001', 'accepted', '2024-02-15T10:30:00'),
('550e8400-e29b-41d4-a716-446655330001', '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655440002', 'accepted', '2024-03-10T14:20:00'),
('550e8400-e29b-41d4-a716-446655330002', '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440002', 'accepted', '2024-03-15T09:45:00'),
('550e8400-e29b-41d4-a716-446655330003', '550e8400-e29b-41d4-a716-446655440003',
 '550e8400-e29b-41d4-a716-446655440000', 'pending', '2024-11-10T16:00:00'),
('550e8400-e29b-41d4-a716-446655330004', '550e8400-e29b-41d4-a716-446655440004',
 '550e8400-e29b-41d4-a716-446655440000', 'accepted', '2024-04-20T11:30:00');

GO

-- ================================================
-- POSTS
-- ================================================

INSERT INTO Posts (Id, UserId, GroupId, Content, PostType, LikesCount, CommentsCount, SharesCount, IsPinned, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655441000', '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655660000',
 'Hello everyone! Just joined this awesome gaming community. Looking forward to playing with all of you!',
 'text', 12, 3, 2, 0, '2024-11-10T08:30:00'),

('550e8400-e29b-41d4-a716-446655441001', '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655660001',
 'Just got an ace in Valorant! FPS forever! 🎮',
 'text', 28, 8, 5, 0, '2024-11-12T14:45:00'),

('550e8400-e29b-41d4-a716-446655441002', '550e8400-e29b-41d4-a716-446655440002',
 NULL,
 'Looking for teammates for competitive matches. Need dedicated players!',
 'text', 15, 5, 3, 0, '2024-11-08T11:20:00'),

('550e8400-e29b-41d4-a716-446655441003', '550e8400-e29b-41d4-a716-446655440003',
 '550e8400-e29b-41d4-a716-446655660002',
 'Streaming CS2 tonight at 7 PM. Come watch and join the chat!',
 'video', 34, 12, 8, 1, '2024-11-14T16:00:00'),

('550e8400-e29b-41d4-a716-446655441004', '550e8400-e29b-41d4-a716-446655440004',
 NULL,
 'Check out this amazing play in League of Legends!',
 'image', 42, 15, 10, 0, '2024-11-13T13:15:00');

GO

-- ================================================
-- ACHIEVEMENTS
-- ================================================

INSERT INTO Achievements (Id, Name, Description, IconUrl, GameId, BadgeType, Points, MaxProgress, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655770000', 'First Win', 
 'Win your first competitive match', '⚔️',
 '550e8400-e29b-41d4-a716-446655550000', 'bronze', 10, 20, '2024-01-10T00:00:00'),

('550e8400-e29b-41d4-a716-446655770001', 'Sharpshooter',
 'Get 10 headshots in a single match', '🎯',
 '550e8400-e29b-41d4-a716-446655550002', 'gold', 20, 20, '2024-01-12T00:00:00'),

('550e8400-e29b-41d4-a716-446655770002', 'Team Player',
 'Play 100 matches with teammates', '👥',
 '550e8400-e29b-41d4-a716-446655550000', 'silver', 15, 20, '2024-01-15T00:00:00'),

('550e8400-e29b-41d4-a716-446655770003', 'Legendary Hero',
 'Reach maximum level', '⭐',
 '550e8400-e29b-41d4-a716-446655550001', 'gold', 50, 20, '2024-01-20T00:00:00'),

('550e8400-e29b-41d4-a716-446655770004', 'Collector',
 'Collect all cosmetic items', '🎨',
 NULL, 'silver', 25, 20, '2024-02-01T00:00:00'),

('550e8400-e29b-41d4-a716-446655770005', 'Tournament Champion',
 'Win a tournament', '🏆',
 NULL, 'gold', 100, 20, '2024-02-10T00:00:00');

GO

-- ================================================
-- TOURNAMENTS
-- ================================================

INSERT INTO Tournaments (Id, GameId, Name, Description, StartDate, EndDate, MaxParticipants, CurrentParticipants, PrizePool, Status, CreatedBy, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655771000', '550e8400-e29b-41d4-a716-446655550000',
 'Vietnam Valorant Cup 2024',
 'National esports tournament for Valorant. Prize pool: 50 million VND',
 '2024-11-20T18:00:00', '2024-11-22T20:00:00', 16, 12, 50000000, 'upcoming',
 '550e8400-e29b-41d4-a716-446655440005', '2024-11-01T10:00:00'),

('550e8400-e29b-41d4-a716-446655771001', '550e8400-e29b-41d4-a716-446655550001',
 'League of Legends Regional Finals',
 'Final battle for the regional championship title',
 '2024-12-01T17:00:00', '2024-12-03T21:00:00', 8, 8, 100000000, 'upcoming',
 '550e8400-e29b-41d4-a716-446655440005', '2024-10-15T12:30:00'),

('550e8400-e29b-41d4-a716-446655771002', '550e8400-e29b-41d4-a716-446655550002',
 'CS2 Weekly Showdown',
 'Weekly competitive tournament, everyone welcome',
 '2024-11-17T19:00:00', '2024-11-17T23:00:00', 32, 24, 10000000, 'upcoming',
 '550e8400-e29b-41d4-a716-446655440001', '2024-11-10T08:00:00');

GO

-- ================================================
-- MARKETPLACE ITEMS
-- ================================================

INSERT INTO MarketplaceItems (Id, SellerId, Title, Description, CoverImageUrl, Category, Price, Rating, ReviewsCount, Status, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655990000', '550e8400-e29b-41d4-a716-446655440000',
 'Gaming Mouse Logitech G102',
 'Professional gaming mouse with 6400 DPI, RGB lighting, lightweight design',
 'https://bizweb.dktcdn.net/100/433/921/products/chuot-choi-game-logitech-gaming-mouse-g102-gen2-chinh-hang-tai-vanphongstar-5.jpg',
 'gear', 350000, 4.8, 12, 'online', '2024-10-15T10:30:00'),

('550e8400-e29b-41d4-a716-446655990001', '550e8400-e29b-41d4-a716-446655440001',
 'Mechanical Keyboard RGB',
 'High-quality mechanical keyboard with Cherry MX switches, customizable RGB',
 'https://media.wired.com/photos/5b21913a985bbd041c32d13d/master/pass/keyboard-TA.jpg',
 'gear', 790000, 4.7, 8, 'online', '2024-09-20T14:45:00'),

('550e8400-e29b-41d4-a716-446655990002', '550e8400-e29b-41d4-a716-446655440002',
 'Gaming Headset Razer',
 '7.1 surround sound headset with noise cancellation microphone',
 'https://static.tandoanh.vn/wp-content/uploads/2024/11/Razer-Barracuda-X-Chroma-White-H1.jpg',
 'gear', 1200000, 4.6, 15, 'online', '2024-08-10T09:00:00');

GO

-- ================================================
-- NOTIFICATIONS
-- ================================================

INSERT INTO Notifications (Id, UserId, Type, Title, Content, RelatedId, RelatedType, IsRead, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655110000', '550e8400-e29b-41d4-a716-446655440000',
 'friend_request', 'New Friend Request', 'David sent you a friend request',
 '550e8400-e29b-41d4-a716-446655440003', 'user', 0, '2024-11-15T10:30:00'),

('550e8400-e29b-41d4-a716-446655110001', '550e8400-e29b-41d4-a716-446655440000',
 'post_like', 'Post Liked', 'Bob liked your post',
 '550e8400-e29b-41d4-a716-446655441000', 'post', 0, '2024-11-15T09:15:00'),

('550e8400-e29b-41d4-a716-446655110002', '550e8400-e29b-41d4-a716-446655440000',
 'comment', 'New Comment', 'Charlie commented on your post',
 '550e8400-e29b-41d4-a716-446655441000', 'post', 1, '2024-11-14T16:45:00'),

('550e8400-e29b-41d4-a716-446655110003', '550e8400-e29b-41d4-a716-446655440001',
 'tournament', 'Tournament Starting Soon', 'Vietnam Valorant Cup 2024 starts in 2 hours',
 '550e8400-e29b-41d4-a716-446655771000', 'tournament', 0, '2024-11-15T08:00:00');

GO

-- ================================================
-- MESSAGES
-- ================================================

INSERT INTO Messages (Id, SenderId, ReceiverId, Content, IsRead, CreatedAt)
VALUES
('550e8400-e29b-41d4-a716-446655100000', '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655440001',
 'Hey Bob! Want to play some Valorant tonight?', 1, '2024-11-14T18:30:00'),

('550e8400-e29b-41d4-a716-446655100001', '550e8400-e29b-41d4-a716-446655440001',
 '550e8400-e29b-41d4-a716-446655440000',
 'Sure! I''ll be online around 8 PM. Let''s do some ranked games.', 1, '2024-11-14T18:45:00'),

('550e8400-e29b-41d4-a716-446655100002', '550e8400-e29b-41d4-a716-446655440000',
 '550e8400-e29b-41d4-a716-446655440001',
 'Perfect! See you then 🎮', 1, '2024-11-14T18:50:00'),

('550e8400-e29b-41d4-a716-446655100003', '550e8400-e29b-41d4-a716-446655440002',
 '550e8400-e29b-41d4-a716-446655440000',
 'Alice, did you see the tournament announcement?', 0, '2024-11-15T07:30:00');

GO

PRINT 'Sample data inserted successfully!';
PRINT 'Total records:';
PRINT '- Users: 6';
PRINT '- Games: 6';
PRINT '- Groups: 5';
PRINT '- Posts: 5';
PRINT '- Achievements: 6';
PRINT '- Tournaments: 3';
PRINT '- Marketplace Items: 3';
PRINT '- Notifications: 4';
PRINT '- Messages: 4';
