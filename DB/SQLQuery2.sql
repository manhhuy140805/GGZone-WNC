

---------------------------------------------------------
-- INSERT USERS
---------------------------------------------------------
INSERT INTO Users (Username, Email, PasswordHash, CreatedAt, AvatarUrl)
VALUES
('alice', 'alice@example.com', 'hash1', GETDATE(), NULL),
('bob', 'bob@example.com', 'hash2', GETDATE(), NULL),
('charlie', 'charlie@example.com', 'hash3', GETDATE(), NULL);
GO

---------------------------------------------------------
-- INSERT USER STATS
---------------------------------------------------------
INSERT INTO UserStats (UserID, GamesPlayed, GamesWon, TotalPlayTime)
VALUES
(1, 10, 4, 500),
(2, 5, 1, 200),
(3, 20, 12, 800);
GO

---------------------------------------------------------
-- INSERT GAMES
---------------------------------------------------------
INSERT INTO Games (GameName, Genre, Description, CreatedAt)
VALUES
('Valorant', 'FPS', 'Tactical shooter', GETDATE()),
('League of Legends', 'MOBA', '5v5 strategy game', GETDATE()),
('CS2', 'FPS', 'Counter-Strike 2', GETDATE());
GO

---------------------------------------------------------
-- INSERT GROUPS
---------------------------------------------------------
INSERT INTO Groups (GroupName, Description, CreatedAt)
VALUES
('Gamers VN', 'Vietnam gaming community', GETDATE()),
('FPS Lovers', 'Group for FPS players', GETDATE()),
('MOBA Legends', 'Group for MOBA fans', GETDATE());
GO

---------------------------------------------------------
-- INSERT GROUP MEMBERS
---------------------------------------------------------
INSERT INTO GroupMembers (GroupID, UserID, JoinedAt)
VALUES
(1, 1, GETDATE()),
(1, 2, GETDATE()),
(2, 2, GETDATE()),
(2, 3, GETDATE()),
(3, 1, GETDATE());
GO

---------------------------------------------------------
-- INSERT POSTS
---------------------------------------------------------
INSERT INTO Posts (UserID, Content, CreatedAt)
VALUES
(1, 'Hello everyone!', GETDATE()),
(2, 'FPS is life.', GETDATE()),
(3, 'Looking for teammates.', GETDATE()),
(1, 'Anyone playing Valorant tonight?', GETDATE()),
(2, 'GGWP!', GETDATE());
GO

---------------------------------------------------------
-- INSERT COMMENTS
---------------------------------------------------------
INSERT INTO Comments (PostID, UserID, Content, CreatedAt)
VALUES
(1, 2, 'Welcome!', GETDATE()),
(1, 3, 'Hi!', GETDATE()),
(3, 1, 'I can join!', GETDATE());
GO

---------------------------------------------------------
-- INSERT LIKES
---------------------------------------------------------
INSERT INTO Likes (PostID, UserID, CreatedAt)
VALUES
(1, 2, GETDATE()),
(2, 1, GETDATE()),
(3, 3, GETDATE());
GO

---------------------------------------------------------
-- INSERT FRIENDSHIPS
---------------------------------------------------------
INSERT INTO Friendships (UserID1, UserID2, CreatedAt)
VALUES
(1, 2, GETDATE()),
(1, 3, GETDATE());
GO

---------------------------------------------------------
-- INSERT ACHIEVEMENTS
---------------------------------------------------------
INSERT INTO Achievements (Title, Description)
VALUES
('First Win', 'Win your first match'),
('Veteran', 'Play 100 games'),
('Sharpshooter', 'Achieve 50 headshots');
GO

---------------------------------------------------------
-- INSERT USER_ACHIEVEMENTS
---------------------------------------------------------
INSERT INTO UserAchievements (UserID, AchievementID, EarnedAt)
VALUES
(1, 1, GETDATE()),
(1, 3, GETDATE()),
(2, 1, GETDATE());
GO

---------------------------------------------------------
-- INSERT MARKETPLACE ITEMS
---------------------------------------------------------
INSERT INTO MarketplaceItems (SellerID, ItemName, Description, Price, CreatedAt)
VALUES
(1, 'Gaming Mouse', 'Logitech G102', 350000, GETDATE()),
(2, 'Keyboard', 'RGB Mechanical keyboard', 750000, GETDATE());
GO

---------------------------------------------------------
-- INSERT STORE PRODUCTS
---------------------------------------------------------
INSERT INTO StoreProducts (ProductName, Description, Price)
VALUES
('Premium Avatar', 'Exclusive in-app avatar', 50000),
('Level Boost', 'Instant +5 account level', 30000);
GO

---------------------------------------------------------
-- INSERT PURCHASES
---------------------------------------------------------
INSERT INTO Purchases (UserID, ProductID, PurchaseDate)
VALUES
(1, 1, GETDATE()),
(2, 2, GETDATE());
GO

---------------------------------------------------------
-- INSERT TOURNAMENTS
---------------------------------------------------------
INSERT INTO Tournaments (TournamentName, GameID, StartDate, EndDate, PrizePool)
VALUES
('Vietnam Cup', 1, GETDATE(), DATEADD(DAY, 3, GETDATE()), 5000000);
GO

---------------------------------------------------------
-- INSERT TOURNAMENT PARTICIPANTS
---------------------------------------------------------
INSERT INTO TournamentParticipants (TournamentID, UserID, JoinedAt)
VALUES
(1, 1, GETDATE()),
(1, 3, GETDATE());
GO

---------------------------------------------------------
-- DONE
---------------------------------------------------------
PRINT 'Seed data (Option A) inserted successfully!';
