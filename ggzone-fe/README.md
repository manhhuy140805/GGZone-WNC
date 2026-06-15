# GGZone Frontend

Gaming social network platform - Frontend application built with React, TypeScript, and Vite.

## 🏗️ Architecture

This project follows a **feature-based architecture** for better organization and scalability.

```
src/
├── app/                    # Application configuration & providers
│   ├── App.tsx            # Root component
│   ├── main.tsx           # Entry point
│   └── providers/         # Context providers (Auth, Cart)
│
├── assets/                # Static assets (images, icons)
│
├── components/            # Shared/reusable components
│   ├── ui/               # Base UI components (Button, Input, Avatar, Badge)
│   ├── shared/           # Shared business components (Cards)
│   └── layout/           # Layout components (Header, Sidebar)
│
├── features/             # Feature-based modules
│   ├── auth/            # Authentication (Login, Register)
│   ├── feed/            # Social feed
│   ├── profile/         # User profiles
│   ├── marketplace/     # Game marketplace
│   ├── groups/          # Gaming groups
│   ├── friends/         # Friends management
│   ├── games/           # Games browsing
│   ├── home/            # Home page
│   ├── trending/        # Trending content
│   └── admin/           # Admin panel
│
├── lib/                  # Utilities & helpers
│   ├── utils/           # Utility functions
│   ├── hooks/           # Custom React hooks
│   └── constants/       # Constants & configuration
│
├── services/             # API services
│   └── api/             # API service modules
│
├── types/                # TypeScript type definitions
│
├── routes/              # Routing configuration
│
└── pages/               # Page components (re-exports from features)
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📝 Import Conventions

This project uses path aliases for cleaner imports:

```typescript
// ✅ Good - Using path aliases
import { Button } from '@/components/ui';
import { userService } from '@/services';
import { formatTime } from '@/lib/utils';
import { Feed } from '@/features/feed';

// ❌ Avoid - Relative paths
import { Button } from '../../../components/ui/Button';
import { userService } from '../../../services/api/userService';
```

### Available Path Aliases

- `@/app/*` → Application core
- `@/components/*` → Shared components
- `@/features/*` → Feature modules
- `@/lib/*` → Utilities & helpers
- `@/services/*` → API services
- `@/types/*` → Type definitions
- `@/app/pages/*` → Page components

## 🎨 Tech Stack

- **Framework**: React 18
- **Language**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router v6
- **Icons**: Lucide React
- **HTTP Client**: Fetch API (custom wrapper)

## 📦 Project Structure Details

### Features

Each feature is a self-contained module with:
- Page components
- Feature-specific components
- Business logic
- Optional services

Example feature structure:
```
features/feed/
├── Feed.tsx              # Main page component
├── components/           # Feature-specific components
│   ├── PostCard.tsx
│   ├── CreatePostModal.tsx
│   └── index.ts
└── index.ts             # Feature exports
```

### Components

- **ui/**: Presentational components without business logic
- **shared/**: Reusable components with business logic
- **layout/**: App layout components (Header, Sidebar)

### Services

All API calls are centralized in `services/api/`:
- `authService.ts` - Authentication
- `userService.ts` - User management
- `postService.ts` - Posts & feed
- `gameService.ts` - Games
- etc.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:7009
```

### TypeScript

Path aliases are configured in `tsconfig.json`:

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/app/*": ["src/app/*"],
      // ... other aliases
    }
  }
}
```

### Vite

Aliases are also configured in `vite.config.js` for build:

```javascript
export default defineConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      // ... other aliases
    },
  },
});
```

## 📚 Documentation

- `ARCHITECTURE.md` - Detailed architecture documentation
- `REFACTOR_COMPLETE.md` - Refactoring summary and completion notes

## 🧪 Development Guidelines

### Adding a New Feature

1. Create feature folder in `src/features/`
2. Add page component and feature-specific components
3. Create `index.ts` to export public API
4. Add route in `src/routes/index.tsx`
5. Export from `src/pages/index.ts` if needed

### Creating Components

- **UI Components**: Add to `src/components/ui/`
- **Shared Components**: Add to `src/components/shared/`
- **Feature Components**: Add to `src/features/[feature]/components/`

### API Services

- Add new services to `src/services/api/`
- Export from `src/services/api/index.ts`
- Use the `HttpClient` wrapper for consistency

## 🔗 Backend Integration

This frontend connects to the GGZone backend API:
- Base URL: `http://localhost:7009` (development)
- Authentication: JWT Bearer tokens
- API documentation: See backend `ggzone-be/README.md`

## 📄 License

[Your License Here]

## 👥 Team

[Your Team Information]

---

**Last Updated**: November 30, 2025
**Status**: ✅ Production Ready
