# Migration to Multi-Page Application (MPA)

## ✅ Đã hoàn thành:

### 1. Cài đặt React Router
```bash
npm install react-router-dom
```

### 2. Tạo Routes Configuration
- File: `src/routes/index.tsx`
- Định nghĩa tất cả routes
- Protected routes cho authenticated users
- Public routes cho login/register

### 3. Cập nhật App.tsx
- File mới: `src/App.new.tsx`
- Sử dụng BrowserRouter
- Navigation với useNavigate hook
- Location tracking với useLocation

## 📋 Các bước tiếp theo:

### Bước 1: Backup file cũ
```bash
# Backup App.tsx cũ
mv src/App.tsx src/App.old.tsx
mv src/App.new.tsx src/App.tsx
```

### Bước 2: Cập nhật các Pages để sử dụng React Router

#### Pages cần cập nhật:
1. **Login.tsx** → Sử dụng `useNavigate()` thay vì `onLogin` prop
2. **Register.tsx** → Sử dụng `useNavigate()` và `Link`
3. **Home.tsx** → Sử dụng `useNavigate()` thay vì `onNavigate` prop
4. **Browse.tsx** → Sử dụng `useNavigate()` để navigate to GameDetail
5. **GameDetail.tsx** → Sử dụng `useParams()` để lấy gameId, `useNavigate()` để back
6. **Groups.tsx** → Sử dụng `useNavigate()` để navigate to GroupDetail
7. **GroupDetail.tsx** → Sử dụng `useParams()` và `useNavigate()`
8. **Marketplace.tsx** → Sử dụng `useNavigate()`
9. **ProductDetail.tsx** → Sử dụng `useParams()` và `useNavigate()`
10. **Friends.tsx** → Sử dụng `useNavigate()`
11. **Messages.tsx** → Sử dụng `useParams()` nếu cần

### Bước 3: Cập nhật Sidebar
- Thay đổi `onNavigate` để sử dụng React Router paths
- Sử dụng `useLocation()` để highlight active page

### Bước 4: Cập nhật Components
- **GameCard**: onClick navigate to `/browse/:gameId`
- **CommunityCard**: onClick navigate to `/groups/:groupId`
- **MarketplaceCard**: onClick navigate to `/marketplace/:productId`

## 🔄 Migration Pattern

### Trước (SPA):
```typescript
interface HomeProps {
  onNavigate?: (page: string) => void;
  onViewProduct?: (productId: string) => void;
}

const handleClick = () => {
  onNavigate?.("MARKETPLACE");
  onViewProduct?.(productId);
};
```

### Sau (MPA):
```typescript
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleClick = () => {
  navigate(`/marketplace/${productId}`);
};
```

## 📁 Cấu trúc Routes

```
/                          → Home
/login                     → Login
/register                  → Register
/browse                    → Browse Games
/browse/:gameId            → Game Detail
/feed                      → Feed
/livestream                → Livestream
/groups                    → Groups
/groups/:groupId           → Group Detail
/marketplace               → Marketplace
/marketplace/:productId    → Product Detail
/profile                   → Profile
/friends                   → Friends
/messages                  → Messages
```

## ⚠️ Breaking Changes

1. **Props removal**: Các props như `onNavigate`, `onViewProduct`, `onViewGame` sẽ bị xóa
2. **State management**: Không còn `selectedProductId`, `selectedGameId` trong App.tsx
3. **URL changes**: App sẽ có real URLs thay vì single page

## ✨ Benefits

1. **SEO friendly**: Mỗi page có URL riêng
2. **Browser history**: Back/Forward buttons hoạt động
3. **Deep linking**: Có thể share direct links
4. **Better UX**: URL reflects current page
5. **Code splitting**: Có thể lazy load routes

## 🚀 Testing

Sau khi migration:
1. Test tất cả navigation flows
2. Test browser back/forward
3. Test direct URL access
4. Test protected routes
5. Test 404 handling

## 📝 Notes

- Giữ file `App.old.tsx` để reference
- Test từng page một
- Có thể rollback nếu cần
- Cập nhật tests nếu có
