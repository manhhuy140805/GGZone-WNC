# GGZone Database Setup Guide

## 📁 Files Structure

```
DB/
├── 1_GGZone_Schema.sql          # Database schema (RUN THIS FIRST)
├── 2_GGZone_SampleData.sql      # Sample data (RUN THIS SECOND)
├── SQLQuery2.sql                # Legacy backup
├── SQLQuery2_SampleData.sql     # Legacy backup
└── README.md                    # This file
```

## 🚀 Quick Start

### Step 1: Create Database Schema
```bash
sqlcmd -S localhost -i DB/1_GGZone_Schema.sql
```

### Step 2: Insert Sample Data
```bash
sqlcmd -S localhost -i DB/2_GGZone_SampleData.sql
```

## 📊 Database Overview

### Core Features (44 Tables Total)

#### 1. User Management (3 tables)
- Users
- UserStats  
- Friendships

#### 2. Social Features (8 tables)
- Posts, PostMedia, PostLikes, Comments
- Photos
- Messages, Notifications
- UserActivityLog

#### 3. Groups & Communities (2 tables)
- Groups
- GroupMembers

#### 4. Games & Content (4 tables)
- Games
- GameScreenshots, GameVideos, GameReviews

#### 5. Marketplace & Store (6 tables)
- MarketplaceItems, MarketplaceReviews
- StoreProducts, StoreOrders, OrderItems
- ShoppingCart

#### 6. Forums (3 tables)
- ForumCategories, ForumTopics, ForumReplies

#### 7. Videos (3 tables)
- Videos, VideoComments, VideoLikes

#### 8. Tournaments (2 tables)
- Tournaments, TournamentParticipants

#### 9. Trending (2 tables)
- TrendingItems, TrendingPlayers

#### 10. User Preferences (3 tables)
- UserPreferences, UserBadges, FriendSuggestions

### Play Now Feature (3 tables)
- UserGameLibrary - User's game collection
- GameLaunchLogs - Track game sessions
- Games (extended with launch fields)

### Admin Panel (9 tables)
- AdminAuditLogs - Track admin actions
- UserReports - User reporting system
- UserBans - Ban management
- ModerationQueue - Content moderation
- SystemSettings - System configuration
- DailyStatistics - Analytics
- FeaturedContent - Curated content
- Announcements - System announcements
- EmailTemplates - Email management

## 🎮 Play Now Feature

Games table includes:
- `GameType`: desktop | web | mobile | browser
- `LaunchUrl`: Protocol URL (steam://, epic://, etc.)
- `DownloadUrl`: Download page URL
- `WebPlayUrl`: Web game URL
- `LauncherType`: steam | epic | origin | custom | web

## 🛡️ Admin Panel Features

- User management (ban, role changes)
- Content moderation queue
- Reports management
- System settings
- Analytics dashboard
- Audit logs
- Announcements
- Email templates

## 📈 Statistics

- **Total Tables**: 44
- **Total Indexes**: 60+
- **Stored Procedures**: 17
- **Triggers**: 16

## 🔧 Maintenance

### Update Daily Statistics
```sql
EXEC sp_UpdateDailyStatistics @StatDate = '2024-01-01';
```

### Get Admin Dashboard Stats
```sql
EXEC sp_GetAdminDashboardStats 
    @StartDate = '2024-01-01', 
    @EndDate = '2024-01-31';
```

### Launch Game
```sql
EXEC sp_LaunchGame 
    @UserId = 'user-guid',
    @GameId = 'game-guid',
    @LaunchMethod = 'desktop';
```

## 📝 Notes

- No Livestream module (removed)
- No Achievements module (removed)
- Optimized for performance with proper indexes
- All foreign keys properly configured
- Triggers for automatic updates
- Stored procedures for common operations

## 🔒 Security

- Password hashing required
- Role-based access control
- Admin audit logging
- Ban system with expiration
- Content moderation queue

## 📞 Support

For issues or questions, refer to:
- `PLAY_NOW_ADMIN_GUIDE.md` - Detailed implementation guide
- `ADMIN_PANEL_ANALYSIS.md` - Admin panel analysis
