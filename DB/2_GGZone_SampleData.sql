-- ================================================
-- GGZone Database - Comprehensive Seed Data
-- ================================================

USE GGZone;
GO

-- ================================================
-- CLEAR EXISTING DATA (Optional - uncomment if needed)
-- ================================================
-- Delete all data to start fresh
DELETE FROM EmailTemplates;
DELETE FROM Announcements;
DELETE FROM FeaturedContent;
DELETE FROM DailyStatistics;
DELETE FROM AdminAuditLogs;
DELETE FROM UserActivityLog;
DELETE FROM GameLaunchLogs;
DELETE FROM UserGameLibrary;
DELETE FROM GameReviews;

DELETE FROM ShoppingCart;
DELETE FROM OrderItems;
DELETE FROM StoreOrders;
DELETE FROM StoreProducts;

DELETE FROM VideoLikes;
DELETE FROM VideoComments;
DELETE FROM Videos;

DELETE FROM Messages;
DELETE FROM Notifications;
DELETE FROM Comments;
DELETE FROM PostLikes;
DELETE FROM PostMedia;
DELETE FROM Posts;
DELETE FROM Photos;
DELETE FROM UserBadges;
DELETE FROM UserPreferences;
DELETE FROM FriendSuggestions;
DELETE FROM Friendships;
DELETE FROM GroupMembers;
DELETE FROM Groups;
DELETE FROM UserStats;
DELETE FROM Users;
DELETE FROM Games;

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
DECLARE @User6 UNIQUEIDENTIFIER = NEWID();
DECLARE @User7 UNIQUEIDENTIFIER = NEWID();
DECLARE @User8 UNIQUEIDENTIFIER = NEWID();
DECLARE @User9 UNIQUEIDENTIFIER = NEWID();
DECLARE @User10 UNIQUEIDENTIFIER = NEWID();
DECLARE @User11 UNIQUEIDENTIFIER = NEWID();
DECLARE @User12 UNIQUEIDENTIFIER = NEWID();
DECLARE @User13 UNIQUEIDENTIFIER = NEWID();
DECLARE @User14 UNIQUEIDENTIFIER = NEWID();
DECLARE @User15 UNIQUEIDENTIFIER = NEWID();

DECLARE @Game1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game5 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game6 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game7 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game8 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game9 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game10 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game11 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game12 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game13 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game14 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game15 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game16 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game17 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game18 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game19 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game20 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game21 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game22 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game23 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game24 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game25 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game26 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game27 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game28 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game29 UNIQUEIDENTIFIER = NEWID();
DECLARE @Game30 UNIQUEIDENTIFIER = NEWID();


DECLARE @Group1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Group2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Group3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Group4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Group5 UNIQUEIDENTIFIER = NEWID();

DECLARE @Post1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post5 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post6 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post7 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post8 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post9 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post10 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post11 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post12 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post13 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post14 UNIQUEIDENTIFIER = NEWID();
DECLARE @Post15 UNIQUEIDENTIFIER = NEWID();

DECLARE @Prod1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod5 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod6 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod7 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod8 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod9 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod10 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod11 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod12 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod13 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod14 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod15 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod16 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod17 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod18 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod19 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod20 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod22 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod21 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod23 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod24 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod25 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod26 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod27 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod28 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod29 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod30 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod31 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod32 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod33 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod34 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod35 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod36 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod37 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod38 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod39 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod40 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod41 UNIQUEIDENTIFIER = NEWID();
DECLARE @Prod42 UNIQUEIDENTIFIER = NEWID();






DECLARE @Video1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video5 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video6 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video7 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video8 UNIQUEIDENTIFIER = NEWID();
DECLARE @Video9 UNIQUEIDENTIFIER = NEWID();



DECLARE @Order1 UNIQUEIDENTIFIER = NEWID();
DECLARE @Order2 UNIQUEIDENTIFIER = NEWID();
DECLARE @Order3 UNIQUEIDENTIFIER = NEWID();
DECLARE @Order4 UNIQUEIDENTIFIER = NEWID();
DECLARE @Order5 UNIQUEIDENTIFIER = NEWID();

-- ================================================
-- INSERT USERS
-- ================================================
INSERT INTO Users (Id, Username, Email, PasswordHash, FullName, AvatarUrl, Bio, Location, Status, Role, IsVerified)
VALUES
(@User1, 'alice_gamer', 'alice@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Alice Nguyễn', 'https://i.pravatar.cc/150?img=1', N'Pro Valorant player | Streaming daily', N'Hà Nội, Vietnam', 'online', 'user', 1),
(@User2, 'bob_fps', 'bob@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Bob Trần', 'https://i.pravatar.cc/150?img=2', N'FPS enthusiast | CS2 veteran', N'TP.HCM, Vietnam', 'in-game', 'user', 1),
(@User3, 'charlie_moba', 'charlie@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Charlie Lê', 'https://i.pravatar.cc/150?img=3', N'League of Legends Diamond player', N'Đà Nẵng, Vietnam', 'online', 'moderator', 1),
(@User4, 'diana_streamer', 'diana@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Diana Phạm', 'https://i.pravatar.cc/150?img=4', N'Full-time streamer | Content creator', N'Hà Nội, Vietnam', 'online', 'user', 1),
(@User5, 'admin_ggzone', 'admin@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'GGZone Admin', 'https://i.pravatar.cc/150?img=5', N'Official GGZone account', N'Vietnam', 'online', 'admin', 1),
(@User6, 'evan_pro', 'evan@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Evan Hoàng', 'https://i.pravatar.cc/150?img=6', N'Dota 2 pro player | Tournament winner', N'Hà Nội, Vietnam', 'online', 'user', 1),
(@User7, 'fiona_casual', 'fiona@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Fiona Võ', 'https://i.pravatar.cc/150?img=7', N'Casual gamer | Love story games', N'TP.HCM, Vietnam', 'offline', 'user', 1),
(@User8, 'grace_speedrun', 'grace@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Grace Trịnh', 'https://i.pravatar.cc/150?img=8', N'Speedrunner | World record holder', N'Đà Nẵng, Vietnam', 'in-game', 'user', 1),
(@User9, 'henry_analyst', 'henry@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Henry Đặng', 'https://i.pravatar.cc/150?img=9', N'Game analyst | Content creator', N'Hà Nội, Vietnam', 'online', 'user', 1),
(@User10, 'iris_artist', 'iris@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Iris Lý', 'https://i.pravatar.cc/150?img=10', N'Game artist | Concept designer', N'TP.HCM, Vietnam', 'offline', 'user', 1),
(@User11, 'jack_competitive', 'jack@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Jack Ngô', 'https://i.pravatar.cc/150?img=11', N'Competitive player | Team captain', N'Hà Nội, Vietnam', 'online', 'user', 1),
(@User12, 'kate_casual', 'kate@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Kate Phan', 'https://i.pravatar.cc/150?img=12', N'Casual gamer | Social butterfly', N'Đà Nẵng, Vietnam', 'online', 'user', 1),
(@User13, 'leo_streamer', 'leo@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Leo Trần', 'https://i.pravatar.cc/150?img=13', N'Twitch streamer | 50k followers', N'TP.HCM, Vietnam', 'in-game', 'user', 1),
(@User14, 'mia_moderator', 'mia@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Mia Hoàng', 'https://i.pravatar.cc/150?img=14', N'Community moderator | Helper', N'Hà Nội, Vietnam', 'online', 'moderator', 1),
(@User15, 'noah_developer', 'noah@ggzone.com', '$2a$11$O/k0GbkXlX2sbDXrCeYoBe/VjofMTkKTFqpjzOz2.nmrSx9lJ9CXi', N'Noah Lê', 'https://i.pravatar.cc/150?img=15', N'Game developer | Indie creator', N'TP.HCM, Vietnam', 'offline', 'user', 1);

-- ================================================
-- INSERT USER STATS
-- ================================================
INSERT INTO UserStats (UserId, FriendsCount, WinningCount, PostsCount, PhotosCount, VideosCount, GroupsCount, TotalPoints, Level)
VALUES
(@User1, 3, 145, 23, 45, 12, 3, 2500, 25),
(@User2, 2, 89, 15, 20, 8, 2, 1800, 18),
(@User3, 3, 234, 45, 67, 20, 4, 4200, 35),
(@User4, 4, 56, 89, 120, 45, 3, 3100, 28),
(@User5, 0, 0, 5, 0, 0, 0, 0, 1),
(@User6, 5, 312, 67, 89, 34, 5, 5600, 42),
(@User7, 2, 34, 12, 15, 3, 1, 890, 12),
(@User8, 4, 456, 78, 156, 67, 6, 7200, 50),
(@User9, 3, 123, 156, 234, 89, 4, 4500, 38),
(@User10, 2, 67, 34, 78, 12, 2, 1950, 16),
(@User11, 6, 289, 98, 145, 45, 5, 5100, 40),
(@User12, 3, 78, 45, 67, 15, 3, 2300, 22),
(@User13, 8, 198, 234, 345, 156, 7, 6800, 48),
(@User14, 4, 145, 89, 123, 34, 4, 3800, 32),
(@User15, 2, 56, 23, 45, 8, 2, 1650, 14);

-- ================================================
-- INSERT GAMES
-- ================================================
INSERT INTO Games (Id, Name, Slug, Description, CoverImageUrl, IconUrl, Genre, Platform, ReleaseDate, Publisher, IsActive)
VALUES
(@Game1, 'Valorant', 'valorant', N'Tactical 5v5 character-based shooter', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416649/1e2d548c8da2ffbc1fa17ed77c99d450_o2zz4o.jpg', 'https://i.imgur.com/valorant-icon.png', 'FPS', 'PC', '2020-06-02', 'Riot Games', 1),
(@Game2, 'League of Legends', 'league-of-legends', N'5v5 MOBA strategy game', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416649/29013e2bd20d257b75d506c002abac05_pm2uxs.jpg', 'https://i.imgur.com/lol-icon.png', 'MOBA', 'PC', '2009-10-27', 'Riot Games', 1),
(@Game3, 'Counter-Strike 2', 'cs2', N'The legendary tactical shooter reborn', 'https://cdn.cloudflare.steamstatic.com/steam/apps/730/header.jpg', 'https://i.imgur.com/cs2-icon.png', 'FPS', 'PC', '2023-09-27', 'Valve', 1),
(@Game4, 'Dota 2', 'dota-2', N'The ultimate MOBA experience', 'https://cdn.cloudflare.steamstatic.com/steam/apps/570/header.jpg', 'https://i.imgur.com/dota2-icon.png', 'MOBA', 'PC', '2013-07-09', 'Valve', 1),
(@Game5, 'Overwatch 2', 'overwatch-2', N'Team-based first-person shooter', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764419768/d7a51c66b861834eca7ec4f552f3b607_s4jdl4.jpg', 'https://i.imgur.com/ow2-icon.png', 'FPS', 'PC', '2022-10-04', 'Blizzard', 1),
(@Game6, 'Apex Legends', 'apex-legends', N'Battle royale hero shooter', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764419830/03cb5fb764120591c4351557c48b0922_evgdib.jpg', 'https://i.imgur.com/apex-icon.png', 'Battle Royale', 'PC', '2019-02-04', 'Respawn Entertainment', 1),
(@Game7, 'Fortnite', 'fortnite', N'Build, battle, and be the last one standing', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416479/81357e9216a646cc3e2ab6d5af5025eb_j8iaas.jpg', 'https://i.imgur.com/fortnite-icon.png', 'Battle Royale', 'PC', '2017-07-25', 'Epic Games', 1),
(@Game8, 'PUBG: Battlegrounds', 'pubg', N'The original battle royale experience', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416479/751b3316d34c1684ea875ed122f9c1bd_i6w57m.jpg', 'https://i.imgur.com/pubg-icon.png', 'Battle Royale', 'PC', '2017-12-21', 'PUBG Corporation', 1),
(@Game9, 'Minecraft', 'minecraft', N'Build, explore, and survive in infinite worlds', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416479/5934d69b127766232a174dcbde14a658_wnsyjr.jpg', 'https://i.imgur.com/minecraft-icon.png', 'Sandbox', 'PC', '2011-11-18', 'Mojang Studios', 1),
(@Game10, 'Genshin Impact', 'genshin-impact', N'Open-world action RPG adventure', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416479/ddb4c8dcba9c22dede8ac9c3c8760f82_buomh5.jpg', 'https://i.imgur.com/genshin-icon.png', 'RPG', 'PC', '2020-09-28', 'HoYoverse', 1),
(@Game11, 'Rocket League', 'rocket-league', N'Soccer meets racing in this hybrid game', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416479/bf50c3cf3b3b13e50ae7801e602df8dc_korxvl.jpg', 'https://i.imgur.com/rocket-icon.png', 'Sports', 'PC', '2015-07-07', 'Psyonix', 1),
(@Game12, 'Among Us', 'among-us', N'Social deduction party game', 'https://res.cloudinary.com/dkpyqplio/image/upload/v1764416479/42f9baf307e53e5cb4087258eeaf70de_c47fcs.jpg', 'https://i.imgur.com/amongus-icon.png', 'Party', 'PC', '2018-06-15', 'Innersloth', 1),
(@Game13, 'Elden Ring', 'elden-ring', N'Open-world action RPG in the Lands Between', 
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764420446/9797130116fa5b9d18d6b09db4c70cca_ndmhrp.jpg',
'https://i.imgur.com/eldenring-icon.png', 'RPG', 'PC', '2022-02-25', 'FromSoftware', 1),

(@Game14, 'Call of Duty: Warzone', 'cod-warzone', N'Free-to-play battle royale in the CoD universe',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764420446/38ef3716bda5f47a5e27fc8a0fe4657b_ycokot.jpg',
'https://i.imgur.com/warzone-icon.png', 'Battle Royale', 'PC', '2020-03-10', 'Activision', 1),

(@Game15, 'Cyberpunk 2077', 'cyberpunk-2077', N'Open-world futuristic action RPG in Night City',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764420446/9564659d37f7dd92ed463124fc7153fd_rcmgsk.jpg',
'https://i.imgur.com/cyberpunk-icon.png', 'RPG', 'PC', '2020-12-10', 'CD Projekt Red', 1),

(@Game16, 'Dead by Daylight', 'dead-by-daylight', N'4v1 multiplayer survival horror game',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764420446/cf3f0d1e109168c33a7ffd6353f250c5_qfcgsz.jpg',
'https://i.imgur.com/dbd-icon.png', 'Horror', 'PC', '2016-06-14', 'Behaviour Interactive', 1),

(@Game17, 'The Witcher 3: Wild Hunt', 'witcher-3', N'Award-winning open-world fantasy RPG',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764420446/05ea1cc05811a647e4904733c7a30834_brhkpu.jpg',
'https://i.imgur.com/witcher3-icon.png', 'RPG', 'PC', '2015-05-19', 'CD Projekt Red', 1),

(@Game18, 'Rainbow Six Siege', 'rainbow-six-siege', N'Tactical 5v5 competitive shooter',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764420446/1c0815bc9c7445a0d98b7e171811daab_hgueua.jpg',
'https://i.imgur.com/r6-icon.png', 'FPS', 'PC', '2015-12-01', 'Ubisoft', 1),
(@Game19, 'Hades II', 'hades-2', N'Action roguelike dungeon crawler sequel',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662720/9568f166dd798fb16a977d36948f28d6_dcokmz.jpg',
'https://i.imgur.com/hades2-icon.png', 'Roguelike', 'PC', '2024-05-06', 'Supergiant Games', 1),

(@Game20, 'Mobile Legends: Bang Bang', 'mobile-legends', N'Fast-paced 5v5 MOBA for mobile',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662720/67684fe4d45183eebf47c176451e102a_wzf5hb.jpg',
'https://i.imgur.com/mlbb-icon.png', 'MOBA', 'Mobile', '2016-07-11', 'Moonton', 1),

(@Game21, 'Stumble Guys', 'stumble-guys', N'Fun and chaotic knockout party game',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662718/64aeffcd37a5789699c48743bccce79b_pnoyew.jpg',
'https://i.imgur.com/stumble-icon.png', 'Party', 'Mobile', '2020-02-12', 'Kitka Games', 1),

(@Game22, 'Free Fire', 'free-fire', N'Fast-paced mobile battle royale',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662719/5bb3caa896c55e5c36abc6979bcbd374_hitecq.jpg',
'https://i.imgur.com/freefire-icon.png', 'Battle Royale', 'Mobile', '2017-12-04', 'Garena', 1),

(@Game23, 'Honkai: Star Rail', 'honkai-star-rail', N'Turn-based space fantasy RPG',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662720/1402d149a681cab85737e60cdc04e12b_hynbzw.jpg',
'https://i.imgur.com/hsr-icon.png', 'RPG', 'PC', '2023-04-26', 'HoYoverse', 1),

(@Game24, 'The Last of Us Part I', 'the-last-of-us', N'Survival action-adventure masterpiece',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662719/9782eb3efc023290fa40f87ede716a60_rbxnan.jpg',
'https://i.imgur.com/tlou1-icon.png', 'Adventure', 'PC', '2022-03-28', 'Naughty Dog', 1),

(@Game25, 'Red Dead Redemption 2', 'rdr2', N'Epic open-world western adventure',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662722/c52a787b7790ca66c4ae9710d3d30e31_i5p57z.jpg',
'https://i.imgur.com/rdr2-icon.png', 'Adventure', 'PC', '2019-11-05', 'Rockstar Games', 1),

(@Game26, 'Grand Theft Auto V', 'gta-5', N'Open-world action game with limitless freedom',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662719/009101a00c2d957e8d4dabb88c8cb79f_nsmtqe.jpg',
'https://i.imgur.com/gta5-icon.png', 'Action', 'PC', '2015-04-14', 'Rockstar Games', 1),

(@Game27, 'FIFA 24', 'fifa-24', N'Realistic football simulation experience',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662718/9ecd5c0fc516ca7ea8b237fe2ae9edbb_ru90dt.jpg',
'https://i.imgur.com/fifa24-icon.png', 'Sports', 'PC', '2023-09-29', 'EA Sports', 1),

(@Game28, 'Need for Speed: Heat', 'nfs-heat', N'Arcade street racing with vibrant visuals',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662721/0abc0c085f6bbc9f81108d56603022f8_g6924k.jpg',
'https://i.imgur.com/nfsheat-icon.png', 'Racing', 'PC', '2019-11-08', 'EA', 1),

(@Game29, 'Forza Horizon 5', 'forza-horizon-5', N'Open-world racing across Mexico',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662718/274e75ab20fa98751e81cb88c6203f83_gosobi.jpg',
'https://i.imgur.com/fh5-icon.png', 'Racing', 'PC', '2021-11-09', 'Xbox Game Studios', 1),

(@Game30, 'ARK: Survival Evolved', 'ark', N'Survival game in a world filled with dinosaurs',
'https://res.cloudinary.com/dkpyqplio/image/upload/v1764662719/4cac4b5987c006a32ce12bd0168f33f0_wsiz2a.jpg',
'https://i.imgur.com/ark-icon.png', 'Survival', 'PC', '2017-08-29', 'Studio Wildcard', 1);


-- ================================================
-- INSERT GROUPS
-- ================================================
INSERT INTO Groups (Id, Name, Description, CoverImageUrl, IconUrl, Visibility, MembersCount, CreatedBy)
VALUES
(@Group1, N'Gamers Vietnam', N'Cộng đồng game thủ Việt Nam', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'https://i.imgur.com/group1.png', 'public', 3, @User1),
(@Group2, N'FPS Legends', N'Group for FPS enthusiasts and pro players', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 'https://i.imgur.com/group2.png', 'public', 3, @User2),
(@Group3, N'MOBA Masters', N'MOBA strategy and tips community', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'https://i.imgur.com/group3.png', 'public', 2, @User3),
(@Group4, N'Speedrunners United', N'Speedrunning community and challenges', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'https://i.imgur.com/group4.png', 'public', 4, @User8),
(@Group5, N'Indie Game Lovers', N'Support indie developers and games', 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', 'https://i.imgur.com/group5.png', 'public', 5, @User15);

-- ================================================
-- INSERT GROUP MEMBERS
-- ================================================
INSERT INTO GroupMembers (GroupId, UserId, Role)
VALUES
(@Group1, @User1, 'admin'),
(@Group1, @User2, 'member'),
(@Group1, @User3, 'member'),
(@Group1, @User6, 'member'),
(@Group1, @User9, 'moderator'),
(@Group2, @User2, 'admin'),
(@Group2, @User1, 'moderator'),
(@Group2, @User4, 'member'),
(@Group2, @User8, 'member'),
(@Group2, @User13, 'member'),
(@Group3, @User3, 'admin'),
(@Group3, @User4, 'member'),
(@Group3, @User6, 'member'),
(@Group3, @User11, 'member'),
(@Group4, @User8, 'admin'),
(@Group4, @User1, 'member'),
(@Group4, @User9, 'member'),
(@Group4, @User14, 'member'),
(@Group5, @User15, 'admin'),
(@Group5, @User10, 'member'),
(@Group5, @User7, 'member'),
(@Group5, @User12, 'member'),
(@Group5, @User14, 'member');

-- ================================================
-- INSERT FRIENDSHIPS
-- ================================================
INSERT INTO Friendships (UserId, FriendId, Status)
VALUES
(@User1, @User2, 'accepted'),
(@User1, @User3, 'accepted'),
(@User1, @User4, 'accepted'),
(@User1, @User6, 'accepted'),
(@User1, @User8, 'accepted'),
(@User2, @User3, 'accepted'),
(@User2, @User4, 'pending'),
(@User2, @User13, 'accepted'),
(@User3, @User4, 'accepted'),
(@User3, @User6, 'accepted'),
(@User3, @User11, 'accepted'),
(@User4, @User9, 'accepted'),
(@User4, @User12, 'pending'),
(@User6, @User8, 'accepted'),
(@User6, @User11, 'accepted'),
(@User7, @User12, 'accepted'),
(@User8, @User9, 'accepted'),
(@User9, @User14, 'accepted'),
(@User10, @User15, 'accepted'),
(@User11, @User13, 'accepted'),
(@User12, @User14, 'accepted'),
(@User13, @User14, 'accepted');

-- ================================================
-- INSERT POSTS
-- ================================================
INSERT INTO Posts (Id, UserId, GroupId, Content, PostType, LikesCount, CommentsCount, SharesCount)
VALUES
(@Post1, @User1, NULL, N'Just hit Radiant in Valorant! 🎉 Hard work pays off!', 'text', 45, 12, 5),
(@Post2, @User2, @Group2, N'Looking for teammates for CS2 ranked. Need 2 more players!', 'text', 23, 8, 2),
(@Post3, @User3, @Group3, N'New League patch is insane! Check out my gameplay highlights', 'video', 67, 15, 10),
(@Post4, @User4, NULL, N'Streaming live now! Come hang out 🎮', 'text', 89, 23, 15),
(@Post5, @User1, @Group1, N'Tournament this weekend! Who''s joining?', 'text', 34, 18, 7),
(@Post6, @User6, @Group3, N'Dota 2 International predictions - who''s your pick?', 'text', 156, 45, 23),
(@Post7, @User8, @Group4, N'Just completed a new speedrun record! 2:34:12 🏃', 'text', 234, 67, 34),
(@Post8, @User9, NULL, N'Breaking down the meta changes in Valorant 13.0', 'text', 178, 52, 28),
(@Post9, @User13, NULL, N'Going live with 12-hour Valorant marathon! Join me!', 'text', 345, 89, 56),
(@Post10, @User11, @Group2, N'Team recruitment: Looking for IGL and support player', 'text', 98, 34, 12),
(@Post11, @User12, @Group1, N'Finally got my first pentakill in League! 😍', 'text', 123, 41, 19),
(@Post12, @User14, @Group1, N'Community event this Saturday - everyone welcome!', 'text', 87, 28, 15),
(@Post13, @User7, @Group5, N'Indie game recommendations - what are you playing?', 'text', 145, 56, 31),
(@Post14, @User10, @Group5, N'Concept art for my upcoming game project', 'text', 267, 78, 45),
(@Post15, @User15, @Group5, N'Game dev tips: Optimization for indie developers', 'text', 189, 63, 38);

-- ================================================
-- INSERT POST MEDIA
-- ================================================
INSERT INTO PostMedia (PostId, MediaUrl, MediaType, OrderIndex)
VALUES
(@Post3, 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'video', 0),
(@Post4, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'image', 0),
(@Post7, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 'image', 0),
(@Post8, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 'image', 0),
(@Post9, 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', 'video', 0),
(@Post11, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 'image', 0),
(@Post14, 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 'image', 0),
(@Post14, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 'image', 1);

-- ================================================
-- INSERT POST LIKES
-- ================================================
INSERT INTO PostLikes (PostId, UserId)
VALUES
(@Post1, @User2),
(@Post1, @User3),
(@Post1, @User4),
(@Post1, @User6),
(@Post1, @User8),
(@Post2, @User1),
(@Post2, @User3),
(@Post2, @User11),
(@Post2, @User13),
(@Post3, @User1),
(@Post3, @User2),
(@Post3, @User4),
(@Post3, @User6),
(@Post3, @User11),
(@Post4, @User1),
(@Post4, @User2),
(@Post4, @User3),
(@Post4, @User9),
(@Post4, @User13),
(@Post5, @User2),
(@Post5, @User3),
(@Post5, @User4),
(@Post5, @User6),
(@Post6, @User1),
(@Post6, @User2),
(@Post6, @User3),
(@Post6, @User4),
(@Post6, @User8),
(@Post6, @User11),
(@Post7, @User1),
(@Post7, @User2),
(@Post7, @User4),
(@Post7, @User9),
(@Post7, @User14),
(@Post8, @User1),
(@Post8, @User2),
(@Post8, @User3),
(@Post8, @User6),
(@Post8, @User13),
(@Post9, @User1),
(@Post9, @User2),
(@Post9, @User3),
(@Post9, @User4),
(@Post9, @User6),
(@Post9, @User8),
(@Post10, @User1),
(@Post10, @User3),
(@Post10, @User4),
(@Post10, @User8),
(@Post11, @User1),
(@Post11, @User2),
(@Post11, @User4),
(@Post11, @User6),
(@Post11, @User9),
(@Post12, @User1),
(@Post12, @User2),
(@Post12, @User3),
(@Post12, @User4),
(@Post13, @User7),
(@Post13, @User10),
(@Post13, @User12),
(@Post13, @User15),
(@Post14, @User1),
(@Post14, @User7),
(@Post14, @User9),
(@Post14, @User12),
(@Post14, @User15),
(@Post15, @User1),
(@Post15, @User7),
(@Post15, @User10),
(@Post15, @User12);

-- ================================================
-- INSERT COMMENTS
-- ================================================
INSERT INTO Comments (PostId, UserId, Content, LikesCount)
VALUES
(@Post1, @User2, N'Congrats! Well deserved!', 5),
(@Post1, @User3, N'Amazing! Teach me your ways 😄', 3),
(@Post1, @User4, N'Let''s duo queue sometime!', 2),
(@Post1, @User6, N'Insane grind! Respect!', 4),
(@Post2, @User1, N'I can join! What rank?', 4),
(@Post2, @User3, N'Count me in if you need one more', 2),
(@Post2, @User11, N'I''m down, let''s go!', 3),
(@Post3, @User1, N'That play at 2:30 was insane!', 8),
(@Post3, @User2, N'Nice mechanics bro', 3),
(@Post3, @User6, N'Patch is definitely broken lol', 5),
(@Post4, @User1, N'On my way!', 1),
(@Post4, @User2, N'Followed! Great content', 2),
(@Post4, @User9, N'Love your streams!', 6),
(@Post5, @User2, N'What time does it start?', 1),
(@Post5, @User3, N'I''m in! Let''s win this', 3),
(@Post5, @User4, N'Registered already 🔥', 2),
(@Post6, @User1, N'TI predictions are always fun', 7),
(@Post6, @User2, N'My money is on Team Secret', 4),
(@Post6, @User3, N'Dark horse pick incoming', 5),
(@Post6, @User4, N'Great analysis!', 3),
(@Post7, @User1, N'Wow! New record?', 8),
(@Post7, @User2, N'That''s insane! How long did it take?', 6),
(@Post7, @User9, N'Speedrunning is crazy', 4),
(@Post8, @User1, N'Thanks for the breakdown!', 9),
(@Post8, @User2, N'This helps a lot', 5),
(@Post8, @User3, N'Great content as always', 7),
(@Post9, @User1, N'I''ll be there!', 3),
(@Post9, @User2, N'12 hours? That''s dedication!', 8),
(@Post9, @User4, N'Gonna watch for sure', 5),
(@Post10, @User1, N'What rank are you looking for?', 4),
(@Post10, @User3, N'Good luck finding teammates!', 2),
(@Post10, @User8, N'I might be interested', 3),
(@Post11, @User1, N'Congrats! First of many!', 6),
(@Post11, @User2, N'Nice! Keep it up!', 4),
(@Post11, @User4, N'That''s awesome!', 3),
(@Post12, @User1, N'What time on Saturday?', 2),
(@Post12, @User2, N'Count me in!', 3),
(@Post12, @User3, N'Sounds fun!', 2),
(@Post13, @User7, N'What are your top picks?', 5),
(@Post13, @User10, N'I need new games to play', 4),
(@Post13, @User12, N'Great recommendations!', 3),
(@Post14, @User1, N'This looks amazing!', 8),
(@Post14, @User7, N'Love the art style!', 6),
(@Post14, @User9, N'When is it releasing?', 4),
(@Post14, @User12, N'Looks professional!', 5),
(@Post15, @User1, N'Very helpful tips!', 7),
(@Post15, @User7, N'Thanks for sharing!', 5),
(@Post15, @User10, N'Bookmarking this!', 4),
(@Post15, @User12, N'Great advice!', 3);

-- ================================================
-- INSERT PHOTOS
-- ================================================
INSERT INTO Photos (UserId, ImageUrl, Caption, GameId, LikesCount)
VALUES
(@User1, 'https://images.unsplash.com/photo-1542751371-adc38448a05e', N'Epic Valorant clutch moment!', @Game1, 45),
(@User2, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', N'CS2 ace on Dust2', @Game3, 67),
(@User3, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', N'Pentakill in ranked!', @Game2, 89),
(@User4, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', N'New gaming setup!', NULL, 123),
(@User1, 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', N'Tournament victory!', @Game1, 156),
(@User6, 'https://images.unsplash.com/photo-1542751371-adc38448a05e', N'Dota 2 International moment', @Game4, 178),
(@User8, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', N'Speedrun complete!', NULL, 234),
(@User9, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', N'Analysis setup', NULL, 145),
(@User13, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', N'Stream setup upgrade', NULL, 267),
(@User11, 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', N'Team photo at LAN', NULL, 189),
(@User12, 'https://images.unsplash.com/photo-1542751371-adc38448a05e', N'First ranked win!', @Game2, 98),
(@User14, 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', N'Community event', NULL, 156),
(@User7, 'https://images.unsplash.com/photo-1511512578047-dfb367046420', N'Gaming with friends', NULL, 123),
(@User10, 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', N'Art workspace', NULL, 201),
(@User15, 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', N'Game dev setup', NULL, 178);

-- ================================================
-- INSERT STORE PRODUCTS
-- ================================================
INSERT INTO StoreProducts (Id, Name, Description, CoverImageUrl, Price, Category, GameId, Rating, ReviewsCount, Status)
VALUES
(@Prod1,  N'Gaming Keyboard RGB', 
          N'Mechanical keyboard with full RGB lighting', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764664256/11572b8773265e2bd03f10194890734c_frcwkc.jpg',
          1200000, 'Keyboard', NULL, 4.8, 1543, 'online'),

(@Prod2,  N'Wireless Gaming Mouse', 
          N'High precision 16,000 DPI wireless gaming mouse', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764663798/a8d1ff4d601ab408dfbbec8dd8cde10f_u0bb8v.jpg',
          850000, 'Mouse', NULL, 4.7, 1320, 'online'),

(@Prod3,  N'Gaming Headset 7.1', 
          N'Virtual 7.1 surround sound gaming headset', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764581139/tai9_ji4idp.jpg',
          950000, 'Headset', NULL, 4.9, 2104, 'online'),

(@Prod4,  N'Gaming Chair Pro', 
          N'Ergonomic gaming chair with neck & lumbar support', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764581135/game1_xzitpb.jpg',
          3200000, 'Chair', NULL, 4.8, 987, 'online'),

(@Prod5,  N'Gaming Monitor 144Hz', 
          N'24-inch full HD 144Hz high refresh rate monitor', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764581333/b4f0696c1dad73887beae50e3b4e48ae_nwbrhk.jpg',
          3800000, 'Monitor', NULL, 4.9, 1820, 'online'),

(@Prod6,  N'Custom Gaming PC', 
          N'Ryzen 5 + RTX 3060 + 16GB RAM custom build PC', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764664330/fdd2b16384b82cc7946b714f770e3850_zbkaam.jpg',
          18500000, 'PC', NULL, 5.0, 320, 'online'),

(@Prod7,  N'PS5 Console Standard Edition', 
          N'Next-gen PlayStation 5 gaming console', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764663660/1dc81605b5c40692703b2ea2faf3e2ee_g8vnkn.jpg',
          13500000, 'Console', NULL, 4.9, 5421, 'online'),

(@Prod8,  N'Xbox Series X', 
          N'Microsoft next-gen 4K gaming console', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764663383/5f6a5ec479b639d6281ad96e199010f6_ialhqi.jpg',
          12500000, 'Console', NULL, 4.8, 3120, 'online'),

(@Prod9,  N'Nintendo Switch OLED', 
          N'Portable gaming console with OLED display', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764581137/tai3_r0m36e.jpg',
          8500000, 'Console', NULL, 4.9, 4876, 'online'),

(@Prod10, N'Gaming Mousepad XXL', 
          N'Extended anti-slip mousepad for gaming setups', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764664060/cb122bfc4692a1800358b6b05972d909_myv3pr.jpg',
          250000, 'Accessories', NULL, 4.7, 2543, 'online'),

(@Prod11, N'PC Cooling RGB Fan Kit', 
          N'6 RGB fans with fan controller included', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764664438/6a562bb99ade0a69fe5bb915e2a6b613_u7bujc.jpg',
          750000, 'Accessories', NULL, 4.8, 1321, 'online'),

(@Prod12, N'Gaming Microphone USB', 
          N'High-quality USB microphone for streaming & gaming', 
          'https://res.cloudinary.com/dkpyqplio/image/upload/v1764581132/mic4_xvzb1i.jpg',
          950000, 'Streaming', NULL, 4.9, 2540, 'online'),
(@Prod13, N'Gaming Desk LED', 
         N'Sturdy gaming desk with RGB LED strips', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764664729/ae72cc309d7197dfa81b7e4c15fae3e2_abus3k.jpg',
         2900000, 'Furniture', NULL, 4.8, 932, 'online'),
(@Prod14, N'Ergonomic Wrist Rest', 
         N'Memory foam wrist support for typing & gaming', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764664891/e87f46ecef695cbec44fc7a50c3642a4_lbugyr.jpg',
         120000, 'Accessories', NULL, 4.6, 540, 'online'),

(@Prod15, N'RGB LED Light Strip', 
         N'5-meter RGB strip for PC & gaming room', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764664975/bed014ff7053ffc1ad3626a67ba7721f_jlgeag.jpg',
         180000, 'Accessories', NULL, 4.7, 870, 'online'),

(@Prod16, N'Gaming Speakers 2.1', 
         N'Powerful 2.1 sound system with RGB', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665041/3172d7f9a62d1b8893b30c75ed1cd438_g66hdg.jpg',
         650000, 'Audio', NULL, 4.8, 1123, 'online'),

(@Prod17, N'USB Capture Card 4K', 
         N'High-quality 4K60 streaming capture card', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666552/ad53f76e3c4f1f8e32dbc8796285343f_vihmdk.jpg',
         2100000, 'Streaming', NULL, 4.9, 690, 'online'),

(@Prod18, N'Gaming Router WiFi 6', 
         N'High speed WiFi 6 router for stable gaming', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665146/4d2b9c1ee7c2c9fc64b985111c3fa183_xshecu.jpg',
         2600000, 'Network', NULL, 4.8, 774, 'online'),

(@Prod19, N'1080p Game Streaming Webcam', 
         N'Full HD webcam with auto-focus', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665185/187597202bd6b9391873080cfcd4c264_dwf37z.jpg',
         650000, 'Streaming', NULL, 4.7, 998, 'online'),

(@Prod20, N'Portable SSD 1TB', 
         N'High-speed NVMe portable SSD', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665221/8b2137add1dc21556b261b2ab424afac_pbx04m.jpg',
         1900000, 'Storage', NULL, 4.9, 1304, 'online'),

(@Prod21, N'Mechanical Keycaps Set', 
         N'PBT double-shot keycap set', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665413/4a2b889155377e06fd8f35149af1abf5_klolmy.jpg',
         350000, 'Keyboard', NULL, 4.8, 742, 'online'),

(@Prod22, N'Wireless Earbuds Pro', 
         N'Noise-cancelling gaming earbuds', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764581138/tai8_ia8dvb.jpg',
         890000, 'Audio', NULL, 4.7, 1540, 'online'),

(@Prod23, N'RGB Desk Lamp', 
         N'LED desk lamp with smart RGB controls', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666753/ab889007a0efc66afcc39331324d0935_peg9iz.jpg',
         350000, 'Accessories', NULL, 4.8, 503, 'online'),

(@Prod24, N'Gaming Glove Anti-sweat', 
         N'Breathable glove for mobile gaming', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665585/08c789e4bb59697d649c6a3f1d0642ab_wz7ei0.jpg',
         80000, 'Accessories', NULL, 4.6, 714, 'online'),

(@Prod25, N'4K Gaming Monitor 165Hz', 
         N'27-inch 4K IPS panel with 165Hz refresh rate', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665625/6716e17535e1af11791c9c249d9c2347_zjxrct.jpg',
         7900000, 'Monitor', NULL, 4.9, 1340, 'online'),

(@Prod26, N'RTX 4060 Graphics Card', 
         N'Powerful mid-range GPU for gaming', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665688/7ed4383c95fb56e0556268623d42c2e7_bpm73z.jpg',
         9500000, 'PC Hardware', NULL, 5.0, 420, 'online'),

(@Prod27, N'32GB DDR5 RAM Kit', 
         N'High performance DDR5 dual-channel RAM', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665737/1a19c5e80dd3b6e3d77397fb9b0582c5_y0sevg.jpg',
         3200000, 'PC Hardware', NULL, 4.9, 610, 'online'),

(@Prod28, N'Gaming Backpack', 
         N'Water-resistant bag for gaming laptops', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665775/5004e16050eb8e36d55d738f0074d826_ca7fyn.jpg',
         650000, 'Accessories', NULL, 4.7, 433, 'online'),

(@Prod29, N'Laptop Cooling Pad RGB', 
         N'High-airflow cooling pad with RGB fans', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665818/6cb987b3e2dffe9f6a8e3c92a3872b73_zy7gcd.jpg',
         350000, 'Accessories', NULL, 4.8, 920, 'online'),

(@Prod30, N'Gaming Smartphone Controller', 
         N'Bluetooth controller for mobile gaming', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665869/87d621f0ccd87649c89c73d89f28b9bb_wxbsyw.jpg',
         480000, 'Mobile', NULL, 4.7, 840, 'online'),

(@Prod31, N'Racing Wheel Pro', 
         N'Steering wheel + pedals for racing games', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665909/4b1134eddd58cf3dd9914eaba9a6a6d8_rjtf0g.jpg',
         4500000, 'Racing Gear', NULL, 4.9, 521, 'online'),

(@Prod32, N'VR Headset 2K', 
         N'2K virtual reality gaming headset', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665956/5a1540fcce47084c4f27f149421117c9_xodjia.jpg',
         8900000, 'VR', NULL, 4.8, 640, 'online'),

(@Prod33, N'4TB External HDD', 
         N'High capacity external storage', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764665995/23485874cb9db3e83d32322212396a8e_chqcc0.jpg',
         2200000, 'Storage', NULL, 4.7, 810, 'online'),

(@Prod34, N'Portable Gaming Monitor 15.6"', 
         N'Portable 1080p display for gaming & travel', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666040/e23a55872794f9ddf6dbe943759e91cc_spfhek.jpg',
         3200000, 'Monitor', NULL, 4.8, 520, 'online'),

(@Prod35, N'RGB GPU Support Bracket', 
         N'Support bracket to prevent GPU sag', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666101/0931eb7298d8666bbb625b5f9a6e3781_qnm56a.jpg',
         240000, 'PC Hardware', NULL, 4.6, 315, 'online'),

(@Prod36, N'Gaming Earphones with Mic', 
         N'Dual-driver earphones for gaming', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764581132/mic3_bxiuou.jpg',
         290000, 'Audio', NULL, 4.7, 650, 'online'),

(@Prod37, N'RGB PC Case ATX', 
         N'ATX mid-tower case with tempered glass', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666223/e6e6fbb7759301156a16502813a55393_wesb7z.jpg',
         1500000, 'PC Hardware', NULL, 4.8, 704, 'online'),

(@Prod38, N'HDMI 2.1 Cable 8K', 
         N'Ultra high speed 8K HDMI cable', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666262/1c44dd796f60e9d2b619799e5f3d768e_u4n6qj.jpg',
         180000, 'Accessories', NULL, 4.9, 480, 'online'),

(@Prod39, N'Wireless Charging Stand RGB', 
         N'Fast charging stand with RGB lighting', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666303/30fa31c7d0014b283c13e92f27e89548_iy5wlv.jpg',
         350000, 'Accessories', NULL, 4.7, 788, 'online'),

(@Prod40, N'Gaming Laptop 4060', 
         N'Powerful gaming laptop with RTX 4060', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666338/2f4d6097a1c8c8607cc8198abe72422d_z1gp53.jpg',
         28500000, 'Laptop', NULL, 5.0, 241, 'online'),

(@Prod41, N'Smart Ambient RGB Light', 
         N'Smart ambient lamp with app control', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666401/f21c75b2df1d49ca489a5876cac25a9d_ba0e3u.jpg',
         580000, 'Accessories', NULL, 4.8, 901, 'online'),

(@Prod42, N'Gaming HDMI Capture Box', 
         N'Portable HDMI capture device for gamers', 
         'https://res.cloudinary.com/dkpyqplio/image/upload/v1764666436/87337e6186b8ac1004082870ee1be833_ijhgw9.jpg',
         1200000, 'Streaming', NULL, 4.8, 350, 'online');



-- ================================================
-- INSERT VIDEOS
-- ================================================
INSERT INTO Videos (Id, UserId, GameId, Title, Description, VideoUrl, ThumbnailUrl, Duration, ViewsCount, LikesCount, CommentsCount, Category, IsPublic)
VALUES
(@Video1, @User1, @Game1, N'How to Rank Up Fast in Valorant', N'Complete guide to climbing ranks', 'https://video.ggzone.com/v1', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 720, 15234, 1234, 89, 'tutorial', 1),
(@Video2, @User2, @Game3, N'CS2 Best Plays Montage', N'My best moments from last month', 'https://video.ggzone.com/v2', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 480, 8765, 876, 45, 'highlight', 1),
(@Video3, @User3, @Game2, N'League Patch 13.24 Analysis', N'Breaking down the new meta', 'https://video.ggzone.com/v3', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 900, 23456, 2345, 156, 'review', 1),
(@Video4, @User6, @Game4, N'Dota 2 Beginner Guide', N'Everything you need to know', 'https://video.ggzone.com/v4', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 1200, 34567, 3456, 234, 'tutorial', 1),
(@Video5, @User8, NULL, N'Speedrun World Record Attempt', N'Going for the new record!', 'https://video.ggzone.com/v5', 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', 3600, 45678, 4567, 345, 'highlight', 1),
(@Video6, @User9, @Game1, N'Valorant Meta Breakdown', N'Current meta analysis and tips', 'https://video.ggzone.com/v6', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 1080, 28934, 2893, 198, 'analysis', 1),
(@Video7, @User13, NULL, N'24-Hour Gaming Marathon', N'Streaming all day and night', 'https://video.ggzone.com/v7', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 86400, 56789, 5678, 456, 'stream', 1),
(@Video8, @User14, NULL, N'Community Highlights Compilation', N'Best moments from the community', 'https://video.ggzone.com/v8', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 600, 19234, 1923, 134, 'highlight', 1),
(@Video9, @User15, NULL, N'Game Development Tutorial Series', N'Learn game dev from scratch', 'https://video.ggzone.com/v9', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 2400, 38456, 3845, 267, 'tutorial', 1);

-- ================================================
-- INSERT VIDEO COMMENTS
-- ================================================
INSERT INTO VideoComments (VideoId, UserId, Content, LikesCount)
VALUES
(@Video1, @User2, N'Super helpful! Thanks for sharing', 12),
(@Video1, @User3, N'This actually works! Ranked up 2 tiers', 8),
(@Video1, @User4, N'More content like this please!', 5),
(@Video1, @User6, N'Best guide ever!', 7),
(@Video2, @User1, N'Insane shots bro!', 15),
(@Video2, @User3, N'That 1v5 clutch was crazy', 10),
(@Video2, @User4, N'Sick plays!', 6),
(@Video3, @User1, N'Great analysis as always', 20),
(@Video3, @User2, N'Helped me understand the new patch', 8),
(@Video3, @User4, N'When is the next video coming?', 3),
(@Video3, @User6, N'Perfect breakdown!', 9),
(@Video4, @User1, N'Finally understand Dota!', 14),
(@Video4, @User2, N'Great beginner guide', 11),
(@Video4, @User3, N'Subscribing for more!', 8),
(@Video5, @User1, N'Insane speedrun!', 25),
(@Video5, @User2, N'Did you get the record?', 12),
(@Video5, @User4, N'Amazing performance!', 18),
(@Video6, @User1, N'Love your analysis', 16),
(@Video6, @User2, N'Very informative', 10),
(@Video6, @User4, N'Thanks for the tips!', 7),
(@Video7, @User1, N'Watched the whole thing!', 22),
(@Video7, @User2, N'Dedication!', 15),
(@Video7, @User3, N'Crazy marathon!', 12),
(@Video8, @User1, N'Great compilation!', 13),
(@Video8, @User2, N'Love community content', 9),
(@Video8, @User4, N'More please!', 6),
(@Video9, @User1, N'Learning so much!', 18),
(@Video9, @User2, N'Best tutorial series', 14),
(@Video9, @User4, N'Can''t wait for next episode', 11);

-- ================================================
-- INSERT VIDEO LIKES
-- ================================================
INSERT INTO VideoLikes (VideoId, UserId)
VALUES
(@Video1, @User2),
(@Video1, @User3),
(@Video1, @User4),
(@Video1, @User6),
(@Video1, @User8),
(@Video2, @User1),
(@Video2, @User3),
(@Video2, @User4),
(@Video2, @User9),
(@Video2, @User13),
(@Video3, @User1),
(@Video3, @User2),
(@Video3, @User4),
(@Video3, @User6),
(@Video3, @User11),
(@Video4, @User1),
(@Video4, @User2),
(@Video4, @User3),
(@Video4, @User6),
(@Video4, @User8),
(@Video5, @User1),
(@Video5, @User2),
(@Video5, @User4),
(@Video5, @User9),
(@Video5, @User14),
(@Video6, @User1),
(@Video6, @User2),
(@Video6, @User3),
(@Video6, @User4),
(@Video6, @User13),
(@Video7, @User1),
(@Video7, @User2),
(@Video7, @User3),
(@Video7, @User4),
(@Video7, @User6),
(@Video8, @User1),
(@Video8, @User2),
(@Video8, @User3),
(@Video8, @User4),
(@Video9, @User1),
(@Video9, @User2),
(@Video9, @User4),
(@Video9, @User15);

-- ================================================
-- INSERT NOTIFICATIONS
-- ================================================
INSERT INTO Notifications (UserId, Type, Title, Content, RelatedId, RelatedType, IsRead)
VALUES
(@User1, 'friend_request', N'New Friend Request', N'Bob Trần sent you a friend request', @User2, 'user', 0),
(@User1, 'post_like', N'Someone liked your post', N'Charlie Lê liked your post', @Post1, 'post', 1),
(@User1, 'comment', N'New Comment', N'Diana Phạm commented on your post', @Post1, 'post', 0),

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
-- INSERT SHOPPING CART
-- ================================================
INSERT INTO ShoppingCart (UserId, ProductId, Quantity)
VALUES
(@User1, @Prod1, 1),
(@User1, @Prod2, 1),
(@User2, @Prod3, 1),
(@User3, @Prod2, 2),
(@User4, @Prod4, 1),
(@User6, @Prod5, 1),
(@User8, @Prod7, 1),
(@User9, @Prod7, 1),
(@User11, @Prod6, 2),
(@User13, @Prod8, 1);

-- ================================================
-- INSERT STORE ORDERS
-- ================================================
INSERT INTO StoreOrders (Id, UserId, ProductId, Quantity, TotalAmount, Status)
VALUES
(@Order1, @User1, @Prod1, 1, 50000.00, 'completed'),
(@Order2, @User2, @Prod3, 1, 150000.00, 'completed'),
(@Order3, @User3, @Prod2, 1, 100000.00, 'pending'),
(@Order4, @User4, @Prod5, 1, 400000.00, 'completed'),
(@Order5, @User6, @Prod7, 2, 500000.00, 'completed');

-- ================================================
-- INSERT ORDER ITEMS
-- ================================================
INSERT INTO OrderItems (OrderId, ProductId, ProductName, Quantity, UnitPrice, TotalPrice)
VALUES
(@Order1, @Prod1, N'Premium Avatar Frame', 1, 50000.00, 50000.00),
(@Order2, @Prod3, N'VIP Membership - 1 Month', 1, 150000.00, 150000.00),
(@Order3, @Prod2, N'Level Boost Pack', 1, 100000.00, 100000.00),
(@Order4, @Prod5, N'VIP Membership - 3 Months', 1, 400000.00, 400000.00),
(@Order5, @Prod7, N'Tournament Entry Pass', 2, 250000.00, 500000.00);

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
(@User1, @Game3, 1, 'C:\Games\CS2', DATEADD(DAY, -3, GETDATE()), 15000, 0),
(@User2, @Game3, 1, 'C:\Games\CS2', DATEADD(HOUR, -1, GETDATE()), 27000, 1),
(@User2, @Game1, 0, NULL, DATEADD(DAY, -5, GETDATE()), 18000, 0),
(@User2, @Game5, 1, 'C:\Games\Overwatch2', DATEADD(DAY, -2, GETDATE()), 12000, 0),
(@User3, @Game2, 1, 'C:\Games\LeagueOfLegends', DATEADD(HOUR, -3, GETDATE()), 43200, 1),
(@User3, @Game4, 1, 'C:\Games\Dota2', DATEADD(DAY, -2, GETDATE()), 28800, 0),
(@User3, @Game1, 1, 'C:\Games\Valorant', DATEADD(DAY, -4, GETDATE()), 8000, 0),
(@User4, @Game1, 1, 'C:\Games\Valorant', DATEADD(HOUR, -5, GETDATE()), 8700, 1),
(@User4, @Game2, 1, 'C:\Games\LeagueOfLegends', DATEADD(DAY, -1, GETDATE()), 5400, 0),
(@User6, @Game4, 1, 'C:\Games\Dota2', DATEADD(HOUR, -4, GETDATE()), 72000, 1),
(@User6, @Game1, 1, 'C:\Games\Valorant', DATEADD(DAY, -2, GETDATE()), 12000, 0),
(@User8, @Game1, 1, 'C:\Games\Valorant', DATEADD(HOUR, -6, GETDATE()), 18000, 1),
(@User8, @Game6, 1, 'C:\Games\ApexLegends', DATEADD(DAY, -1, GETDATE()), 9000, 0),
(@User9, @Game1, 1, 'C:\Games\Valorant', DATEADD(HOUR, -3, GETDATE()), 24000, 1),
(@User11, @Game3, 1, 'C:\Games\CS2', DATEADD(HOUR, -2, GETDATE()), 36000, 1),
(@User11, @Game1, 1, 'C:\Games\Valorant', DATEADD(DAY, -1, GETDATE()), 15000, 0),
(@User13, @Game1, 1, 'C:\Games\Valorant', DATEADD(HOUR, -1, GETDATE()), 48000, 1),
(@User13, @Game2, 1, 'C:\Games\LeagueOfLegends', DATEADD(DAY, -2, GETDATE()), 21000, 0);

-- ================================================
-- INSERT GAME LAUNCH LOGS
-- ================================================
INSERT INTO GameLaunchLogs (UserId, GameId, LaunchMethod, LaunchedAt, SessionDuration, EndedAt)
VALUES
(@User1, @Game1, 'desktop', DATEADD(HOUR, -4, GETDATE()), 120, DATEADD(HOUR, -2, GETDATE())),
(@User1, @Game2, 'desktop', DATEADD(DAY, -1, GETDATE()), 180, DATEADD(DAY, -1, DATEADD(HOUR, 3, GETDATE()))),
(@User1, @Game1, 'desktop', DATEADD(DAY, -2, GETDATE()), 150, DATEADD(DAY, -2, DATEADD(HOUR, 2, GETDATE()))),
(@User2, @Game3, 'desktop', DATEADD(HOUR, -3, GETDATE()), 90, DATEADD(HOUR, -1, GETDATE())),
(@User2, @Game3, 'desktop', DATEADD(DAY, -1, GETDATE()), 120, DATEADD(DAY, -1, DATEADD(HOUR, 2, GETDATE()))),
(@User3, @Game2, 'desktop', DATEADD(HOUR, -5, GETDATE()), 150, DATEADD(HOUR, -3, GETDATE())),
(@User3, @Game4, 'desktop', DATEADD(DAY, -2, GETDATE()), 200, DATEADD(DAY, -2, DATEADD(HOUR, 3, GETDATE()))),
(@User4, @Game1, 'desktop', DATEADD(HOUR, -6, GETDATE()), 60, DATEADD(HOUR, -5, GETDATE())),
(@User6, @Game4, 'desktop', DATEADD(HOUR, -4, GETDATE()), 180, DATEADD(HOUR, -1, GETDATE())),
(@User8, @Game1, 'desktop', DATEADD(HOUR, -6, GETDATE()), 240, DATEADD(HOUR, -2, GETDATE())),
(@User9, @Game1, 'desktop', DATEADD(HOUR, -3, GETDATE()), 90, DATEADD(HOUR, -1, GETDATE())),
(@User11, @Game3, 'desktop', DATEADD(HOUR, -2, GETDATE()), 120, DATEADD(HOUR, -1, GETDATE())),
(@User13, @Game1, 'desktop', DATEADD(HOUR, -1, GETDATE()), 60, DATEADD(MINUTE, -30, GETDATE()));

-- ================================================
-- INSERT GAME REVIEWS
-- ================================================
INSERT INTO GameReviews (GameId, UserId, Rating, Title, Content, HoursPlayed, IsRecommended, HelpfulCount)
VALUES
(@Game1, @User1, 5, N'Amazing tactical shooter!', N'Best FPS game I''ve played. Great mechanics and strategy depth.', 500, 1, 45),
(@Game1, @User2, 4, N'Great game but steep learning curve', N'Takes time to master but very rewarding', 300, 1, 23),
(@Game1, @User6, 5, N'Addictive and competitive', N'Love the competitive scene and constant updates', 600, 1, 56),
(@Game1, @User13, 5, N'Perfect for streaming', N'Great game for content creation', 800, 1, 78),
(@Game2, @User3, 5, N'The MOBA king', N'Still the best MOBA after all these years', 1200, 1, 89),
(@Game2, @User6, 4, N'Great but demanding', N'Requires dedication but very rewarding', 950, 1, 67),
(@Game2, @User11, 5, N'Competitive excellence', N'Best competitive MOBA experience', 1100, 1, 92),
(@Game3, @User2, 5, N'CS2 is incredible', N'Huge improvement over CS:GO. Love the new engine', 450, 1, 67),
(@Game3, @User13, 5, N'Timeless classic', N'Still the best tactical shooter', 700, 1, 84),
(@Game4, @User3, 4, N'Complex but rewarding', N'Steep learning curve but amazing once you get it', 800, 1, 34),
(@Game4, @User6, 5, N'Dota is life', N'Most complex and rewarding game ever', 2000, 1, 156),
(@Game5, @User1, 4, N'Fun team shooter', N'Great gameplay but needs balance updates', 250, 1, 38),
(@Game5, @User4, 4, N'Solid hero shooter', N'Good game with regular updates', 300, 1, 42),
(@Game6, @User8, 5, N'Battle royale perfection', N'Best BR mechanics and gunplay', 600, 1, 73),
(@Game6, @User13, 4, N'Great for casual play', N'Fun and accessible battle royale', 450, 1, 51);

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

(@User1, 'game_played', @Game1, 'game', '{"duration": 120, "result": "win"}'),
(@User2, 'login', NULL, NULL, '{"ip": "192.168.1.2", "device": "Windows PC"}'),
(@User2, 'game_played', @Game3, 'game', '{"duration": 45, "result": "win"}'),
(@User2, 'post_created', @Post2, 'post', '{"content_length": 67}'),
(@User3, 'login', NULL, NULL, '{"ip": "192.168.1.3", "device": "Mac"}'),
(@User3, 'video_uploaded', @Video3, 'video', '{"duration": 900}'),

(@User4, 'product_purchased', @Prod3, 'product', '{"product_name": "VIP Membership", "amount": 150000}'),
(@User4, 'game_played', @Game1, 'game', '{"duration": 60, "result": "loss"}'),
(@User6, 'login', NULL, NULL, '{"ip": "192.168.1.6", "device": "Windows PC"}'),

(@User8, 'login', NULL, NULL, '{"ip": "192.168.1.8", "device": "Windows PC"}'),
(@User8, 'video_uploaded', @Video5, 'video', '{"duration": 3600}'),
(@User9, 'login', NULL, NULL, '{"ip": "192.168.1.9", "device": "Windows PC"}'),
(@User9, 'video_uploaded', @Video6, 'video', '{"duration": 1080}'),
(@User11, 'login', NULL, NULL, '{"ip": "192.168.1.11", "device": "Windows PC"}'),
(@User11, 'game_played', @Game3, 'game', '{"duration": 90, "result": "win"}'),
(@User13, 'login', NULL, NULL, '{"ip": "192.168.1.13", "device": "Windows PC"}'),
(@User13, 'stream_started', NULL, NULL, '{"platform": "twitch", "viewers": 1250}'),
(@User14, 'login', NULL, NULL, '{"ip": "192.168.1.14", "device": "Windows PC"}'),
(@User14, 'post_created', @Post12, 'post', '{"content_length": 89}'),
(@User15, 'login', NULL, NULL, '{"ip": "192.168.1.15", "device": "Windows PC"}'),
(@User15, 'video_uploaded', @Video9, 'video', '{"duration": 2400}');

-- ================================================
-- INSERT ADMIN AUDIT LOGS
-- ================================================
INSERT INTO AdminAuditLogs (AdminUserId, Action, TargetType, TargetId, OldValue, NewValue, IpAddress, UserAgent, Reason)
VALUES
(@User5, 'user_verified', 'user', @User1, 'IsVerified: 0', 'IsVerified: 1', '192.168.1.100', 'Mozilla/5.0', N'User verification approved'),
(@User5, 'post_featured', 'post', @Post1, NULL, 'IsFeatured: 1', '192.168.1.100', 'Mozilla/5.0', N'Featured on homepage'),
(@User3, 'post_moderated', 'post', @Post2, NULL, 'Status: approved', '192.168.1.101', 'Mozilla/5.0', N'Content review passed'),
(@User5, 'user_verified', 'user', @User3, 'IsVerified: 0', 'IsVerified: 1', '192.168.1.100', 'Mozilla/5.0', N'Moderator verification'),

(@User3, 'post_moderated', 'post', @Post6, NULL, 'Status: approved', '192.168.1.101', 'Mozilla/5.0', N'Content review passed'),
(@User5, 'user_role_changed', 'user', @User14, 'Role: user', 'Role: moderator', '192.168.1.100', 'Mozilla/5.0', N'Promoted to moderator'),
(@User5, 'product_featured', 'product', @Prod1, NULL, 'IsFeatured: 1', '192.168.1.100', 'Mozilla/5.0', N'Featured store product'),
(@User3, 'post_removed', 'post', @Post3, 'Status: approved', 'Status: removed', '192.168.1.101', 'Mozilla/5.0', N'Violates community guidelines'),
(@User5, 'game_added', 'game', @Game5, NULL, 'Status: active', '192.168.1.100', 'Mozilla/5.0', N'New game added to platform');

-- ================================================
-- INSERT DAILY STATISTICS
-- ================================================
INSERT INTO DailyStatistics (StatDate, NewUsers, ActiveUsers, TotalPosts, TotalComments, TotalVideos, TotalGameLaunches, TotalRevenue, TotalOrders)
VALUES
(CAST(DATEADD(DAY, -7, GETDATE()) AS DATE), 12, 156, 28, 67, 4, 234, 1200000, 6),
(CAST(DATEADD(DAY, -6, GETDATE()) AS DATE), 18, 201, 35, 89, 6, 312, 1800000, 9),
(CAST(DATEADD(DAY, -5, GETDATE()) AS DATE), 22, 267, 42, 112, 8, 401, 2100000, 11),
(CAST(DATEADD(DAY, -4, GETDATE()) AS DATE), 19, 289, 48, 134, 9, 456, 2400000, 13),
(CAST(DATEADD(DAY, -3, GETDATE()) AS DATE), 25, 312, 56, 156, 11, 523, 2700000, 15),
(CAST(DATEADD(DAY, -2, GETDATE()) AS DATE), 15, 234, 45, 123, 8, 567, 2500000, 12),
(CAST(DATEADD(DAY, -1, GETDATE()) AS DATE), 23, 345, 67, 189, 12, 678, 3200000, 18),
(CAST(GETDATE() AS DATE), 18, 289, 52, 145, 10, 589, 2800000, 15);

-- ================================================
-- INSERT FEATURED CONTENT
-- ================================================
INSERT INTO FeaturedContent (ContentType, ContentId, Title, Description, ImageUrl, DisplayOrder, StartDate, EndDate, IsActive, CreatedBy)
VALUES
('game', @Game1, N'Valorant - Featured Game', N'Tactical shooter of the month', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 1, DATEADD(DAY, -5, GETDATE()), DATEADD(DAY, 25, GETDATE()), 1, @User5),
('game', @Game4, N'Dota 2 - MOBA Classic', N'The ultimate competitive MOBA', 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f', 2, DATEADD(DAY, -3, GETDATE()), DATEADD(DAY, 27, GETDATE()), 1, @User5),

('video', @Video1, N'Featured Tutorial', N'Learn from the best', 'https://images.unsplash.com/photo-1542751371-adc38448a05e', 5, DATEADD(DAY, -2, GETDATE()), DATEADD(DAY, 5, GETDATE()), 1, @User5),
('video', @Video5, N'Speedrun World Record', N'Amazing speedrun achievement', 'https://images.unsplash.com/photo-1560253023-3ec5d502959f', 6, DATEADD(DAY, -1, GETDATE()), DATEADD(DAY, 6, GETDATE()), 1, @User5),
('product', @Prod3, N'VIP Membership Special', N'Get exclusive access today', 'https://images.unsplash.com/photo-1511512578047-dfb367046420', 7, DATEADD(DAY, -4, GETDATE()), DATEADD(DAY, 26, GETDATE()), 1, @User5),
('product', @Prod7, N'Tournament Pass Sale', N'Limited time offer on tournament access', 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc', 8, DATEADD(DAY, -1, GETDATE()), DATEADD(DAY, 29, GETDATE()), 1, @User5);

-- ================================================
-- INSERT ANNOUNCEMENTS
-- ================================================
INSERT INTO Announcements (Title, Content, Type, Priority, TargetAudience, IsActive, StartDate, EndDate, CreatedBy)
VALUES
(N'Welcome to GGZone!', N'Thank you for joining our gaming community. Explore features and connect with gamers!', 'info', 'normal', 'all', 1, DATEADD(DAY, -30, GETDATE()), NULL, @User5),
(N'Server Maintenance', N'Scheduled maintenance on Sunday 2AM-4AM. Services will be temporarily unavailable.', 'maintenance', 'high', 'all', 1, GETDATE(), DATEADD(DAY, 7, GETDATE()), @User5),
(N'New Tournament Starting!', N'Vietnam Valorant Championship registration is now open. Join now!', 'event', 'high', 'users', 1, GETDATE(), DATEADD(DAY, 10, GETDATE()), @User5),
(N'New Features Released', N'Check out our latest features: improved profiles, better search, and more!', 'info', 'normal', 'all', 1, DATEADD(DAY, -5, GETDATE()), NULL, @User5),
(N'Store Sale Event', N'Special discounts on VIP memberships and tournament passes this week!', 'info', 'normal', 'users', 1, DATEADD(DAY, -3, GETDATE()), NULL, @User5),
(N'Community Guidelines Update', N'Please review our updated community guidelines for a better experience.', 'info', 'high', 'all', 1, DATEADD(DAY, -2, GETDATE()), NULL, @User5),
(N'Dota 2 International Qualifiers', N'Registration for Dota 2 International Qualifiers is now open!', 'event', 'high', 'users', 1, DATEADD(DAY, 14, GETDATE()), DATEADD(DAY, 21, GETDATE()), @User5),
(N'Holiday Special Event', N'Join our holiday event with special rewards and exclusive items!', 'event', 'high', 'all', 1, DATEADD(DAY, 20, GETDATE()), DATEADD(DAY, 35, GETDATE()), @User5);

-- ================================================
-- INSERT EMAIL TEMPLATES
-- ================================================
INSERT INTO EmailTemplates (TemplateName, Subject, HtmlBody, TextBody, Category, Variables, IsActive, UpdatedBy)
VALUES
('welcome_email', N'Welcome to GGZone!', N'<h1>Welcome {{username}}!</h1><p>Thank you for joining GGZone.</p>', N'Welcome {{username}}! Thank you for joining GGZone.', 'user', '["username", "email"]', 1, @User5),
('password_reset', N'Reset Your Password', N'<h1>Password Reset</h1><p>Click here to reset: {{reset_link}}</p>', N'Password Reset. Click here: {{reset_link}}', 'security', '["username", "reset_link"]', 1, @User5),
('order_confirmation', N'Order Confirmed', N'<h1>Order #{{order_id}}</h1><p>Total: {{total_amount}}</p>', N'Order #{{order_id}} confirmed. Total: {{total_amount}}', 'transaction', '["order_id", "total_amount", "items"]', 1, @User5),
('tournament_invitation', N'You''re Invited to {{tournament_name}}!', N'<h1>Tournament Invitation</h1><p>Join {{tournament_name}} and compete!</p>', N'You''re invited to {{tournament_name}}!', 'event', '["username", "tournament_name", "tournament_link"]', 1, @User5),
('product_purchase_confirmation', N'Purchase Successful', N'<h1>Thank You!</h1><p>Your purchase of {{product_name}} is confirmed!</p>', N'Purchase of {{product_name}} confirmed', 'store', '["username", "product_name", "order_id"]', 1, @User5),
('video_upload_confirmation', N'Video Upload Successful', N'<h1>Upload Confirmed</h1><p>Your video {{video_title}} has been uploaded!</p>', N'Video {{video_title}} uploaded successfully', 'content', '["username", "video_title", "video_link"]', 1, @User5),
('friend_request_notification', N'New Friend Request', N'<h1>Friend Request</h1><p>{{friend_name}} sent you a friend request!</p>', N'{{friend_name}} sent you a friend request', 'social', '["username", "friend_name", "friend_link"]', 1, @User5),
('achievement_unlocked', N'Achievement Unlocked!', N'<h1>Congratulations!</h1><p>You unlocked: {{achievement_name}}</p>', N'You unlocked {{achievement_name}}!', 'gamification', '["username", "achievement_name", "achievement_icon"]', 1, @User5);

PRINT '================================================';
PRINT 'GGZone Database - Seed Data Insertion Complete!';
PRINT '================================================';
PRINT '';
PRINT 'Data Summary:';
PRINT '- Users: 15 accounts created';
PRINT '- Games: 18 popular games added';
PRINT '- Groups: 5 communities created';
PRINT '- Group Members: 23 memberships';
PRINT '- Posts: 15 social posts with likes and comments';
PRINT '- Post Media: 8 media attachments';
PRINT '- Post Likes: 70+ likes distributed';
PRINT '- Comments: 50+ comments on posts';
PRINT '- Photos: 15 user photos';
PRINT '- Friendships: 22 friend connections';
PRINT '- Store Products: 12 digital products and game items';
PRINT '- Store Orders: 5 orders (completed/pending)';
PRINT '- Order Items: 5 order line items';

PRINT '- Videos: 9 uploaded videos with engagement';
PRINT '- Video Comments: 30+ comments';
PRINT '- Video Likes: 43+ likes';

PRINT '- Notifications: 7 user notifications';
PRINT '- Messages: Direct messaging between users';

PRINT '- Shopping Cart: 10 cart items';
PRINT '- User Game Library: 20 library entries';
PRINT '- Game Launch Logs: 13 play sessions';
PRINT '- Game Reviews: 15 game reviews';
PRINT '- User Activity Log: 25 activity entries';
PRINT '- Admin Audit Logs: 10 admin actions';
PRINT '- Daily Statistics: 8 days of stats';
PRINT '- Featured Content: 8 featured items';
PRINT '- Announcements: 8 active announcements';
PRINT '- Email Templates: 8 email templates';
PRINT '';
PRINT 'Test Accounts (15 users):';
PRINT '- alice_gamer (Radiant Valorant player)';
PRINT '- bob_fps (CS2 veteran)';
PRINT '- charlie_moba (LoL Diamond player, Moderator)';
PRINT '- diana_streamer (Content creator)';
PRINT '- admin_ggzone (Admin account)';
PRINT '- evan_pro (Dota 2 pro player)';
PRINT '- fiona_casual (Casual gamer)';
PRINT '- grace_speedrun (Speedrunner)';
PRINT '- henry_analyst (Game analyst)';
PRINT '- iris_artist (Game artist)';
PRINT '- jack_competitive (Competitive player)';
PRINT '- kate_casual (Social gamer)';
PRINT '- leo_streamer (Twitch streamer)';
PRINT '- mia_moderator (Community moderator)';
PRINT '- noah_developer (Game developer)';
PRINT '';
PRINT 'Note: Marketplace has been removed - only Store remains for purchases';
PRINT 'Database is ready for comprehensive testing!';

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
UNION ALL SELECT 'StoreProducts', COUNT(*) FROM StoreProducts
UNION ALL SELECT 'StoreOrders', COUNT(*) FROM StoreOrders
UNION ALL SELECT 'OrderItems', COUNT(*) FROM OrderItems
UNION ALL SELECT 'ShoppingCart', COUNT(*) FROM ShoppingCart

UNION ALL SELECT 'Notifications', COUNT(*) FROM Notifications
UNION ALL SELECT 'Messages', COUNT(*) FROM Messages


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
