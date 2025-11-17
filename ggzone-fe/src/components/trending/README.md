# Trending Components

Các components được tách nhỏ từ trang Trending để dễ quản lý và tái sử dụng.

## 📁 Cấu trúc

```
trending/
├── TrendingHeader.tsx     # Hero banner và page header
├── TrendingTabs.tsx       # Tabs để chuyển giữa Games, Streams, Players
├── TrendingGames.tsx      # Grid hiển thị trending games
├── TrendingStreams.tsx    # Grid hiển thị live streams
├── TrendingPlayers.tsx    # Grid hiển thị top players
├── index.ts               # Central export
└── README.md              # Documentation
```

## 🧩 Components

### 1. TrendingHeader
**Mục đích**: Hiển thị hero banner và page header

**Props**: None

**Features**:
- Hero banner với Valorant background
- Flame icon và title
- Breadcrumb navigation
- Page description

---

### 2. TrendingTabs
**Mục đích**: Tabs để chuyển đổi giữa Games, Streams, Players

**Props**:
- `activeTab: "games" | "streams" | "players"` - Tab đang active
- `onTabChange: (tab) => void` - Callback khi đổi tab

**Features**:
- 3 tabs: Games, Streams, Players
- Active state với màu orange
- Hover effects
- Grid layout responsive

---

### 3. TrendingGames
**Mục đích**: Hiển thị grid các trending games

**Props**:
- `games: Game[]` - Danh sách games

**Features**:
- Grid layout responsive (1-4 columns)
- Top 3 games có ranking badge
- "View All" link
- Sử dụng GameCard component

---

### 4. TrendingStreams
**Mục đích**: Hiển thị grid các live streams

**Props**:
- `streams: LiveChannel[]` - Danh sách streams

**Features**:
- Grid layout responsive (1-3 columns)
- Live indicator với animation
- Stream count display
- Thumbnail với live badge
- Viewer count
- Streamer info với avatar

---

### 5. TrendingPlayers
**Mục đích**: Hiển thị grid các top players

**Props**:
- `players: User[]` - Danh sách players

**Features**:
- Grid layout responsive (2-6 columns)
- Top 3 players có flame icon
- "View All" link
- Sử dụng UserCard component

---

## 📝 Cách sử dụng

```typescript
import {
  TrendingHeader,
  TrendingTabs,
  TrendingGames,
  TrendingStreams,
  TrendingPlayers,
} from "../components/trending";

export const Trending: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"games" | "streams" | "players">("games");

  return (
    <div className="space-y-8">
      <TrendingHeader />
      
      <TrendingTabs 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
      
      {activeTab === "games" && <TrendingGames games={trendingGames} />}
      {activeTab === "streams" && <TrendingStreams streams={trendingStreams} />}
      {activeTab === "players" && <TrendingPlayers players={trendingPlayers} />}
    </div>
  );
};
```

## 🎯 Lợi ích

1. **Separation of Concerns**: Mỗi component có một trách nhiệm rõ ràng
2. **Reusability**: Có thể tái sử dụng components ở nơi khác
3. **Maintainability**: Dễ dàng maintain và update từng phần
4. **Testability**: Dễ dàng test từng component riêng lẻ
5. **Performance**: Có thể optimize từng component riêng

## 🔄 Data Flow

```
Trending Page (Container)
    ↓
    ├─→ TrendingHeader (Presentational)
    ├─→ TrendingTabs (Controlled)
    │       ↓
    │   activeTab state
    └─→ TrendingGames / TrendingStreams / TrendingPlayers (Presentational)
            ↓
        Props from parent
```

## 📦 Dependencies

- `lucide-react` - Icons
- `../cards/GameCard` - Game card component
- `../cards/UserCard` - User card component
- `../../assets/mock/*` - Type definitions

## 🎨 Design Patterns

- **Container/Presentational**: Trending.tsx là container, các components con là presentational
- **Composition**: Các components nhỏ được compose lại thành page
- **Props Interface**: Mỗi component có interface rõ ràng
- **Consistent Styling**: Sử dụng Tailwind classes nhất quán
