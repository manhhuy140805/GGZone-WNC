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
        public DbSet<PostMedia> PostMedias { get; set; }
        public DbSet<Comment> Comments { get; set; }

        public DbSet<Photo> Photos { get; set; }
        public DbSet<LiveChannel> LiveChannels { get; set; }

        public DbSet<Achievement> Achievements { get; set; }
        public DbSet<UserAchievement> UserAchievements { get; set; }

        public DbSet<Tournament> Tournaments { get; set; }
        public DbSet<TournamentParticipant> TournamentParticipants { get; set; }

        public DbSet<MarketplaceItem> MarketplaceItems { get; set; }
        public DbSet<MarketplaceReview> MarketplaceReviews { get; set; }

        public DbSet<StoreProduct> StoreProducts { get; set; }
        public DbSet<StoreOrder> StoreOrders { get; set; }

        public DbSet<Message> Messages { get; set; }
        public DbSet<Notification> Notifications { get; set; }

        public DbSet<Game> Games { get; set; }
        public DbSet<TrendingItem> TrendingItems { get; set; }

        // ==========================
        //   MODEL RELATIONSHIPS
        // ==========================

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

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
        }
    }
}
