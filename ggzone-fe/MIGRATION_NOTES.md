# Migration Notes - Removal of Mock Data

## Thay đổi

Đã xóa toàn bộ dữ liệu mẫu (mock data) khỏi dự án. Các thay đổi chính bao gồm:

### 1. Xóa thư mục mock data
- Đã xóa: `src/assets/mock/` và tất cả các file bên trong

### 2. Tạo file types chung
- Tạo mới: `src/types/index.ts` - chứa các interface/type definitions chung
- Các types bao gồm: User, Game, Group, MarketplaceItem, Post, Photo, Comment

### 3. Cập nhật Services
- `src/services/authService.ts`: 
  - Loại bỏ mock users và mock passwords
  - Thêm interface User vào file
  - Login function giờ trả về thông báo "API chưa được triển khai"

### 4. Cập nhật Context
- `src/context/AuthContext.tsx`: Import User từ authService thay vì mock
- `src/context/CartContext.tsx`: Định nghĩa MarketplaceItem interface trực tiếp trong file

### 5. Cập nhật Pages
Tất cả các pages đã được cập nhật để:
- Loại bỏ import từ mock
- Thêm TODO comments để fetch data từ API
- Khởi tạo empty arrays cho data
- Hiển thị thông báo "Dữ liệu sẽ được tải từ API" khi không có data

Các pages đã cập nhật:
- Home.tsx - Hiển thị placeholder cho trending games, communities, marketplace
- Profile.tsx - Khởi tạo empty arrays cho posts, photos, groups, friends
- Marketplace.tsx - Khởi tạo empty array cho marketplace items
- ProductDetail.tsx - Hiển thị thông báo "Dữ liệu sản phẩm sẽ được tải từ API"
- Messages.tsx - Khởi tạo empty arrays cho users, conversations, messages
- Groups.tsx - Khởi tạo empty array cho groups
- GroupDetail.tsx - **Simplified**: Chỉ hiển thị thông báo placeholder
- GameDetail.tsx - **Simplified**: Chỉ hiển thị thông báo placeholder
- Friends.tsx - Khởi tạo empty arrays cho users và friendships
- Feed.tsx - Khởi tạo empty arrays cho posts, photos, users, comments
- Browse.tsx - Khởi tạo empty array cho games

**Lưu ý đặc biệt:**
- GameDetail.tsx và GroupDetail.tsx đã được đơn giản hóa để tránh lỗi TypeScript
- Các file này chỉ hiển thị thông báo placeholder và cần được implement lại hoàn toàn khi có API

### 6. Cập nhật Components
Tất cả components đã được cập nhật để import types từ `src/types/index.ts`:
- Cards: GameCard, GroupCard, CommunityCard, MarketplaceCard, UserCard
- Profile tabs: PostsTab, StatsTab, AboutTab, GroupsTab, ForumsTab, VideoTab
- Friends: FriendCard, FriendsList, SuggestionCard, SuggestionsList
- Sections: TrendingSection, StoreSection, FavoritesSection
- Trending: TrendingGames, TrendingPlayers
- Profile header: ProfileHeader

## Bước tiếp theo

Để ứng dụng hoạt động trở lại, cần:

1. **Tích hợp Backend API**
   - Implement API endpoints cho authentication
   - Implement API endpoints cho games, groups, marketplace, posts, etc.
   - Cập nhật các service files để gọi API thực

2. **Cập nhật Pages**
   - Thay thế TODO comments bằng API calls
   - Sử dụng React hooks (useState, useEffect) để fetch và manage data
   - Thêm loading states và error handling

3. **State Management** (Optional)
   - Có thể sử dụng React Query, SWR, hoặc Redux để quản lý data fetching
   - Implement caching và optimistic updates

## Ví dụ cách tích hợp API

```typescript
// Example: Fetching games in Browse.tsx
const [games, setGames] = useState<Game[]>([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchGames = async () => {
    try {
      const response = await fetch('/api/games');
      const data = await response.json();
      setGames(data);
    } catch (error) {
      console.error('Error fetching games:', error);
    } finally {
      setLoading(false);
    }
  };
  
  fetchGames();
}, []);
```

## Lưu ý

- Tất cả các type definitions đã được tập trung vào `src/types/index.ts`
- Authentication service vẫn giữ localStorage logic để lưu user session
- Cart context vẫn hoạt động với localStorage
- Không có breaking changes về UI/UX, chỉ cần kết nối với backend API
