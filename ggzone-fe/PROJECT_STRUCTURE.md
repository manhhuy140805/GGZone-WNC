# GGZone Frontend - Project Structure

## 📁 Cấu trúc thư mục đã được tối ưu

```
ggzone-fe/
├── public/                      # Static assets
├── src/
│   ├── assets/                  # Media & Data
│   │   ├── icons/              # Icons và logos
│   │   │   ├── SVG/           # SVG icons
│   │   │   └── logo.png       # App logo
│   │   ├── images/            # Images theo category
│   │   │   ├── categori/      # Category images
│   │   │   ├── channels/      # Channel thumbnails
│   │   │   ├── market/        # Marketplace images
│   │   │   ├── photos/        # User photos
│   │   │   ├── seasion/       # Season images
│   │   │   └── User/          # User avatars
│   │   └── mock/              # Mock data (8 files)
│   │       ├── achievements.ts
│   │       ├── games.ts
│   │       ├── groups.ts
│   │       ├── helpers.ts
│   │       ├── liveChannels.ts
│   │       ├── marketplace.ts
│   │       ├── photos.ts
│   │       ├── posts.ts
│   │       ├── users.ts
│   │       ├── index.ts       # Central export
│   │       └── README.md      # Mock data documentation
│   │
│   ├── components/             # Reusable components
│   │   ├── cards/             # Card components (10 files)
│   │   │   ├── AchievementCard.tsx
│   │   │   ├── CategoryCard.tsx
│   │   │   ├── CommunityCard.tsx
│   │   │   ├── GameCard.tsx
│   │   │   ├── GroupCard.tsx
│   │   │   ├── LiveChannelCard.tsx
│   │   │   ├── MarketplaceCard.tsx
│   │   │   ├── StatCard.tsx
│   │   │   ├── UserCard.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── common/            # Common UI components
│   │   │   ├── Avatar.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── layout/            # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts
│   │   │
│   │   ├── profile/           # Profile-specific components
│   │   │   ├── header/
│   │   │   │   └── ProfileHeader.tsx
│   │   │   ├── sections/
│   │   │   │   ├── AchievementsList.tsx
│   │   │   │   ├── FriendsList.tsx
│   │   │   │   ├── PhotoGallery.tsx
│   │   │   │   └── StatsCards.tsx
│   │   │   ├── tabs/
│   │   │   │   ├── AboutTab.tsx
│   │   │   │   ├── AchievementsTab.tsx
│   │   │   │   ├── ForumsTab.tsx
│   │   │   │   ├── GroupsTab.tsx
│   │   │   │   ├── PostsTab.tsx
│   │   │   │   ├── ProfileTabs.tsx
│   │   │   │   ├── StatsTab.tsx
│   │   │   │   └── VideoTab.tsx
│   │   │   └── index.ts
│   │   │
│   │   └── sections/          # Page sections
│   │       ├── CategoriesSection.tsx
│   │       ├── FavoritesSection.tsx
│   │       ├── FeaturedSection.tsx
│   │       ├── LiveChannelsSection.tsx
│   │       ├── StoreSection.tsx
│   │       ├── TrendingSection.tsx
│   │       └── index.ts
│   │
│   ├── context/               # React Context
│   │   └── AuthContext.tsx   # Authentication context
│   │
│   ├── pages/                 # Page components (10 files)
│   │   ├── Browse.tsx        # Browse games page
│   │   ├── Groups.tsx        # Groups/Communities page
│   │   ├── Home.tsx          # Home page
│   │   ├── Login.tsx         # Login page
│   │   ├── Marketplace.tsx   # Marketplace page
│   │   ├── ProductDetail.tsx # Product detail page
│   │   ├── Profile.tsx       # User profile page
│   │   ├── Register.tsx      # Registration page
│   │   ├── Trending.tsx      # Trending page
│   │   └── index.ts          # Central export
│   │
│   ├── services/             # API services
│   │   └── authService.ts   # Authentication service
│   │
│   ├── App.tsx              # Main app component
│   ├── main.tsx             # App entry point
│   └── index.css            # Global styles
│
├── DEMO_ACCOUNTS.txt        # Demo account credentials
├── LOGIN_GUIDE.md           # Login guide
├── MOCK_DATA_QUICK_START.md # Mock data quick start
├── README.md                # Project README
└── package.json             # Dependencies

```

## 📊 Thống kê

### Components
- **Cards**: 10 components
- **Common**: 4 components
- **Layout**: 2 components
- **Profile**: 13 components (header, sections, tabs)
- **Sections**: 6 components

### Pages
- **Total**: 10 pages
- **Auth**: Login, Register
- **Main**: Home, Browse, Trending, Groups, Marketplace, Profile
- **Detail**: ProductDetail

### Mock Data
- **Total**: 9 files (8 data + 1 helper)
- **Active**: achievements, games, groups, liveChannels, marketplace, photos, posts, users
- **Helper**: helpers.ts

### Services
- **Auth**: authService.ts

## 🗑️ Files đã xóa (Cleanup)

### Unused Files
1. ✅ AppRoutes.jsx - Không sử dụng
2. ✅ NotFound.jsx - Không sử dụng
3. ✅ constants.tsx - Không import
4. ✅ utils/index.ts - Chỉ export constants

### Unused Mock Data (8 files)
5. ✅ categories.ts
6. ✅ friendships.ts
7. ✅ groupMembers.ts
8. ✅ messages.ts
9. ✅ notifications.ts
10. ✅ storeProducts.ts
11. ✅ tournaments.ts
12. ✅ trending.ts

### Documentation (7 files)
13. ✅ MOCK_DATA_README.md (duplicate)
14. ✅ PROFILE_REFACTOR.md (outdated)
15. ✅ PROFILE_UPDATE.md (outdated)
16. ✅ PROFILE_FEATURES.md (outdated)
17. ✅ MOCK_DATA_GUIDE.md (root, duplicate)
18. ✅ MOCK_DATA_SUMMARY.md (root, duplicate)
19. ✅ DOCUMENTATION_INDEX.md (root, duplicate)

### Empty Folders (5 folders)
20. ✅ src/hooks/
21. ✅ src/routes/
22. ✅ src/styles/
23. ✅ src/utils/
24. ✅ src/assets/videos/

**Total cleaned**: 24 items

## 📝 Naming Conventions

### Files
- **Components**: PascalCase (e.g., `GameCard.tsx`)
- **Services**: camelCase (e.g., `authService.ts`)
- **Mock Data**: camelCase (e.g., `liveChannels.ts`)
- **Pages**: PascalCase (e.g., `Home.tsx`)

### Folders
- **lowercase**: assets, components, context, pages, services
- **kebab-case**: Không sử dụng
- **camelCase**: Không sử dụng

## 🎯 Best Practices

1. **Centralized Exports**: Mỗi folder có `index.ts` để export
2. **Component Organization**: Nhóm theo chức năng (cards, layout, profile)
3. **Mock Data**: Tất cả trong `assets/mock/` với central export
4. **Services**: Tách riêng logic API
5. **Context**: Quản lý state global
6. **Clean Structure**: Không có folder trống, không có file unused

## 🔄 Import Examples

```typescript
// Components
import { GameCard, UserCard } from '@/components/cards';
import { Header, Sidebar } from '@/components/layout';
import { Button, Avatar } from '@/components/common';

// Pages
import { Home, Browse, Profile } from '@/pages';

// Mock Data
import { mockGames, mockUsers } from '@/assets/mock';

// Services
import { authService } from '@/services/authService';

// Context
import { useAuth } from '@/context/AuthContext';
```

## 📦 Dependencies

### Main
- React 18
- TypeScript
- Tailwind CSS
- Lucide React (icons)

### Dev
- Vite
- ESLint
- TypeScript

---

**Last Updated**: 2024
**Status**: ✅ Optimized & Clean
