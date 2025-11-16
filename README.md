# 🎮 GGZone - Gaming Community Platform

A modern, feature-rich gaming community platform built with React, TypeScript, and Tailwind CSS. Connect with gamers, discover games, join communities, and track your achievements.

## ✨ Features

### 🔐 Authentication
- Email/Password login with mock data
- Social login options (Discord, Twitch, Facebook)
- Session persistence with localStorage
- User profile management
- Role-based access (User, Moderator, Admin)

### 🏠 Home Page
- Featured games showcase
- Live streaming channels
- Trending games section
- Popular communities
- Featured marketplace items
- Quick stats dashboard
- Newsletter subscription

### 🎮 Browse Games
- Advanced game filtering (Genre, Platform)
- Multiple sort options (Trending, Newest, Popular)
- Grid and List view modes
- Featured games section
- Responsive design
- Real-time search

### 👥 Communities
- Browse and join gaming communities
- My Groups section
- Featured communities
- Filter by type (All, Joined, Recommended)
- Sort by members, newest, trending
- Community details and member count

### 🏆 Achievements & Profile
- User profile with avatar and stats
- Achievement tracking system
- Progress visualization
- Game-specific achievements
- Multiple profile tabs:
  - Posts & Items
  - Game Stats
  - About
  - Teams
  - Groups
  - Forums
  - Videos
  - Achievements

### 🛒 Marketplace
- Browse gaming gear and items
- Advanced filtering and sorting
- Favorite items
- Product ratings and reviews
- Add to cart functionality
- Sold out status

### 📊 Live Channels
- Real-time streaming information
- Viewer count
- Streamer profiles
- Game information
- Live status indicators

## 🛠️ Tech Stack

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Vite** - Build tool

### State Management
- React Context API for authentication
- Local component state with useState
- localStorage for persistence

### Architecture
- Component-based architecture
- Custom hooks for reusable logic
- Service layer for business logic
- Mock data for development

## 📁 Project Structure

```
ggzone-fe/
├── src/
│   ├── pages/
│   │   ├── Login.tsx           # Authentication page
│   │   ├── Home.tsx            # Dashboard
│   │   ├── Browse.tsx          # Game browser
│   │   ├── Groups.tsx          # Communities
│   │   ├── Achievements.tsx    # Profile & achievements
│   │   ├── Marketplace.tsx     # Shopping
│   │   ├── Trending.tsx        # Trending content
│   │   └── Profile.tsx         # User profile
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Header.tsx      # Top navigation
│   │   │   └── Sidebar.tsx     # Side navigation
│   │   ├── cards/
│   │   │   ├── GameCard.tsx
│   │   │   ├── LiveChannelCard.tsx
│   │   │   ├── MarketplaceCard.tsx
│   │   │   ├── CommunityCard.tsx
│   │   │   └── StatCard.tsx
│   │   ├── sections/           # Reusable sections
│   │   └── common/             # Common components
│   ├── context/
│   │   └── AuthContext.tsx     # Authentication context
│   ├── services/
│   │   └── authService.ts      # Auth logic
│   ├── assets/
│   │   └── mock/               # Mock data
│   │       ├── users.ts
│   │       ├── games.ts
│   │       ├── groups.ts
│   │       ├── liveChannels.ts
│   │       └── marketplace.ts
│   ├── App.tsx                 # Main app component
│   └── main.tsx                # Entry point
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── vite.config.ts
```

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd ggzone-fe
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Open browser
```
http://localhost:5173
```

### Build for Production
```bash
npm run build
npm run preview
```

## 🔑 Demo Accounts

Test the application with these demo accounts:

| Email | Password | Role |
|-------|----------|------|
| alice@example.com | alice123 | User |
| bob@example.com | bob123 | Moderator |
| charlie@example.com | charlie123 | User |
| david@example.com | david123 | User |
| emma@example.com | emma123 | User |
| frank@example.com | frank123 | Admin |

**Quick Login**: Click "🔑 Show Demo Accounts" on login page to auto-fill credentials.

## 📖 Usage Guide

### Login
1. Enter email and password
2. Or click demo account for quick login
3. Or use social login options

### Browse Games
- Use Genre and Platform filters
- Sort by Trending, Newest, or Popular
- Toggle between Grid and List views
- Click game to view details

### Join Communities
- Browse available communities
- Click "Join" to become a member
- View community details and members
- Filter by type or sort by members

### View Profile
- Click on user avatar in header
- View achievements and stats
- Switch between profile tabs
- Edit profile information

### Marketplace
- Browse gaming gear
- Filter by category
- Sort by price or popularity
- Add items to favorites
- Check product ratings

## 🎨 Design System

### Colors
- **Primary**: Orange (#F97316)
- **Secondary**: Purple (#A855F7)
- **Accent**: Blue (#3B82F6)
- **Background**: White/Gray (#F9FAFB)
- **Text**: Gray (#111827)

### Typography
- **Headings**: Bold, 24-48px
- **Body**: Regular, 14-16px
- **Small**: Regular, 12-14px

### Components
- Cards with hover effects
- Gradient buttons
- Smooth transitions
- Responsive grids
- Shadow effects

## 🔄 State Management

### Authentication Context
```typescript
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<{success: boolean}>;
  logout: () => void;
}
```

### Usage
```typescript
const { user, isAuthenticated, login, logout } = useAuth();
```

## 📱 Responsive Design

- **Mobile**: 1 column, full width
- **Tablet**: 2 columns, optimized spacing
- **Desktop**: 3-4 columns, full features
- **Large**: 4+ columns, enhanced layout

## 🧪 Testing

### Manual Testing
1. Test login with demo accounts
2. Navigate through all pages
3. Test filters and sorting
4. Test responsive design
5. Test localStorage persistence

### Browser Support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📚 Mock Data

Comprehensive mock data is provided for development and testing:

### Data Overview
- **11 Users** with complete profiles and stats
- **11 Games** across multiple genres
- **5 Gaming Communities** with 19+ members
- **10 Posts** with comments and engagement
- **10 Photos** in user galleries
- **13 Achievements** with progress tracking
- **7 Tournaments** with participants
- **4 Live Channels** with streaming data
- **5 Marketplace Items** with reviews
- **8 Store Products** with orders
- **12 Messages** between users
- **12 Notifications** of various types
- **11 Trending Items** with analytics

### Documentation
- **Quick Start**: See `ggzone-fe/MOCK_DATA_QUICK_START.md` for common usage examples
- **Full Guide**: See `MOCK_DATA_GUIDE.md` for comprehensive documentation
- **API Reference**: See `ggzone-fe/src/assets/mock/README.md` for detailed API docs
- **Demo Accounts**: See `ggzone-fe/DEMO_ACCOUNTS.txt` for login credentials

### Helper Functions
The mock data includes helper functions for common operations:
```typescript
import { 
  getUserById, 
  getUserFriends, 
  getUserFeed,
  getGroupMembers,
  getUserAchievementsWithDetails 
} from '@/assets/mock';
```

### Database Integration
SQL sample data is available in `DB/SQLQuery2_SampleData.sql` for backend testing.

## 🔐 Security Notes

### Current Implementation
- Mock authentication for development
- localStorage for session storage
- No real API calls

### Production Considerations
- Implement real backend API
- Use secure token storage (httpOnly cookies)
- Add CSRF protection
- Implement rate limiting
- Add input validation
- Use HTTPS only

## 🚧 Future Enhancements

- [ ] Real backend API integration
- [ ] WebSocket for live updates
- [ ] Video streaming integration
- [ ] Payment processing
- [ ] Advanced search with Elasticsearch
- [ ] Recommendation engine
- [ ] Social features (messaging, notifications)
- [ ] Mobile app (React Native)
- [ ] Admin dashboard
- [ ] Analytics and reporting

## 📝 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Build
npm run build        # Build for production
npm run preview      # Preview production build

# Linting
npm run lint         # Run ESLint

# Type checking
npm run type-check   # Check TypeScript types
```

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 📞 Support

For issues and questions:
- Check existing documentation
- Review demo accounts guide
- Check login guide at `ggzone-fe/LOGIN_GUIDE.md`

## 🎯 Project Goals

- Create an engaging gaming community platform
- Provide seamless user experience
- Support multiple gaming genres
- Enable community building
- Facilitate game discovery
- Track player achievements

## 📊 Performance

- Optimized component rendering
- Lazy loading for images
- Efficient state management
- Minimal re-renders
- Fast page transitions

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- Color contrast compliance
- Screen reader support

---

**Version**: 1.0.0  
**Last Updated**: November 2025  
**Status**: Active Development
