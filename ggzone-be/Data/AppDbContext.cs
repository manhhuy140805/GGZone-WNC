using ggzone_be.Models;
using Microsoft.EntityFrameworkCore;

namespace ggzone_be.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        // ==========================
        //        DB SETS
        // ==========================

        public DbSet<User> Users { get; set; }
        public DbSet<UserStats> UserStats { get; set; }

        public DbSet<Friendship> Friendships { get; set; }
        public DbSet<Group> Groups { get; set; }
        public DbSet<GroupMember> GroupMembers { get; set; }

        public DbSet<Post> Posts { get; set; }
        public DbSet<PostLike> PostLikes { get; set; }
        public DbSet<PostMedia> PostMedia { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<TournamentParticipant> TournamentParticipants { get; set; }

        public DbSet<StoreProduct> StoreProducts { get; set; }
        public DbSet<StoreOrder> StoreOrders { get; set; }

        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Game> Games { get; set; }
        public DbSet<TrendingItem> TrendingItems { get; set; }

        public DbSet<Video> Videos { get; set; }
        public DbSet<VideoComment> VideoComments { get; set; }
        public DbSet<VideoLike> VideoLikes { get; set; }

        // New models
        public DbSet<GameReview> GameReviews { get; set; }
        public DbSet<UserGameLibrary> UserGameLibraries { get; set; }
        public DbSet<GameLaunchLog> GameLaunchLogs { get; set; }
        public DbSet<TrendingPlayer> TrendingPlayers { get; set; }
        public DbSet<OrderItem> OrderItems { get; set; }
        public DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public DbSet<UserPreference> UserPreferences { get; set; }
        public DbSet<UserBadge> UserBadges { get; set; }
        public DbSet<FriendSuggestion> FriendSuggestions { get; set; }
        public DbSet<UserActivityLog> UserActivityLogs { get; set; }
        public DbSet<AdminAuditLog> AdminAuditLogs { get; set; }
        public DbSet<UserBan> UserBans { get; set; }
        public DbSet<ModerationQueue> ModerationQueues { get; set; }
        public DbSet<DailyStatistic> DailyStatistics { get; set; }
        public DbSet<FeaturedContent> FeaturedContents { get; set; }
        public DbSet<Announcement> Announcements { get; set; }
        public DbSet<EmailTemplate> EmailTemplates { get; set; }

        // ==========================
        //   MODEL RELATIONSHIPS
        // ==========================

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Disable OUTPUT clause for tables with triggers
            // This fixes: "Could not save changes because the target table has database triggers"
            modelBuilder.Entity<Post>().ToTable(tb => tb.UseSqlOutputClause(false));
            modelBuilder.Entity<PostLike>().ToTable(tb => tb.UseSqlOutputClause(false));
            modelBuilder.Entity<PostMedia>().ToTable(tb => tb.UseSqlOutputClause(false));
            modelBuilder.Entity<Comment>().ToTable(tb => tb.UseSqlOutputClause(false));
            modelBuilder.Entity<GroupMember>().ToTable(tb => tb.UseSqlOutputClause(false));

            // Friendship (User → Friend)
            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.User)
                .WithMany(u => u.Friendships)
                .HasForeignKey(f => f.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Friendship>()
                .HasOne(f => f.Friend)
                .WithMany(u => u.FriendOf)
                .HasForeignKey(f => f.FriendId)
                .OnDelete(DeleteBehavior.NoAction);

            // Message Sender/Receiver
            modelBuilder.Entity<Message>()
                .HasOne(m => m.Sender)
                .WithMany(u => u.SentMessages)
                .HasForeignKey(m => m.SenderId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(m => m.Receiver)
                .WithMany(u => u.ReceivedMessages)
                .HasForeignKey(m => m.ReceiverId)
                .OnDelete(DeleteBehavior.Restrict);

            // GroupMember many-to-many
            modelBuilder.Entity<GroupMember>()
                .HasKey(gm => new { gm.GroupId, gm.UserId });

            // TournamentParticipant many-to-many
            modelBuilder.Entity<TournamentParticipant>()
                .HasKey(tp => new { tp.TournamentId, tp.UserId });

            // UserStats one-to-one
            modelBuilder.Entity<User>()
                .HasOne(u => u.UserStats)
                .WithOne(us => us.User)
                .HasForeignKey<UserStats>(us => us.UserId);

            // UserBan relationships
            modelBuilder.Entity<UserBan>()
                .HasOne(ub => ub.User)
                .WithMany()
                .HasForeignKey(ub => ub.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<UserBan>()
                .HasOne(ub => ub.BannedByUser)
                .WithMany()
                .HasForeignKey(ub => ub.BannedBy)
                .OnDelete(DeleteBehavior.NoAction);

            // FriendSuggestion relationships
            modelBuilder.Entity<FriendSuggestion>()
                .HasOne(fs => fs.User)
                .WithMany()
                .HasForeignKey(fs => fs.UserId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<FriendSuggestion>()
                .HasOne(fs => fs.SuggestedUser)
                .WithMany()
                .HasForeignKey(fs => fs.SuggestedUserId)
                .OnDelete(DeleteBehavior.NoAction);

            // ModerationQueue relationships
            modelBuilder.Entity<ModerationQueue>()
                .HasOne(mq => mq.User)
                .WithMany()
                .HasForeignKey(mq => mq.UserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<ModerationQueue>()
                .HasOne(mq => mq.Reviewer)
                .WithMany()
                .HasForeignKey(mq => mq.ReviewedBy)
                .OnDelete(DeleteBehavior.NoAction);

            // UserPreference one-to-one
            modelBuilder.Entity<User>()
                .HasOne<UserPreference>()
                .WithOne(up => up.User)
                .HasForeignKey<UserPreference>(up => up.UserId);

            // Unique constraints
            modelBuilder.Entity<DailyStatistic>()
                .HasIndex(ds => ds.StatDate)
                .IsUnique();

            modelBuilder.Entity<EmailTemplate>()
                .HasIndex(et => et.TemplateName)
                .IsUnique();

            modelBuilder.Entity<UserPreference>()
                .HasIndex(up => up.UserId)
                .IsUnique();
        }
    }
}
