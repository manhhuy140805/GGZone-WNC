# Posts API Integration Guide

## Overview
Đã tích hợp API để fetch dữ liệu posts cho tab Posts trong Profile page.

## Files Created/Modified

### 1. **postService.ts** (NEW)
- **Location**: `ggzone-fe/src/services/postService.ts`
- **Purpose**: Service để gọi Posts API endpoints
- **Methods**:
  - `getUserFeed(page, pageSize)` - Lấy feed posts của user hiện tại
  - `getAllPosts()` - Lấy tất cả posts
  - `getPostById(id)` - Lấy post theo ID
  - `createPost(content, groupId, postType, videoUrl)` - Tạo post mới
  - `likePost(postId)` - Like post
  - `unlikePost(postId)` - Unlike post
  - `deletePost(postId)` - Xóa post

### 2. **Profile.tsx** (MODIFIED)
- **Location**: `ggzone-fe/src/pages/Profile.tsx`
- **Changes**:
  - Import `postService` và `Post` type
  - Thêm state `userPosts` để lưu danh sách posts
  - Thêm `useEffect` hook để load posts khi tab "posts" được chọn
  - Gọi `postService.getUserFeed()` để fetch dữ liệu

### 3. **PostsTab.tsx** (MODIFIED)
- **Location**: `ggzone-fe/src/components/profile/tabs/PostsTab.tsx`
- **Changes**:
  - Thêm state `likedPosts` để track posts đã like
  - Thêm state `loadingPostId` để show loading state khi like/unlike
  - Implement `handleLikePost()` function để like/unlike posts
  - Thêm loading indicator khi đang like/unlike
  - Cải thiện empty state UI

## API Endpoints Used

```
GET  /api/posts/feed?page=1&pageSize=20  - Lấy feed posts (requires auth)
GET  /api/posts                           - Lấy tất cả posts
GET  /api/posts/{id}                      - Lấy post theo ID
POST /api/posts                           - Tạo post mới (requires auth)
POST /api/posts/{id}/like                 - Like post (requires auth)
DELETE /api/posts/{id}/like               - Unlike post (requires auth)
DELETE /api/posts/{id}                    - Xóa post (requires auth)
```

## Usage Example

### Trong Profile.tsx:
```typescript
// Posts được tự động load khi tab "posts" được chọn
const [userPosts, setUserPosts] = useState<Post[]>([]);

useEffect(() => {
  if (activeTab === "posts") {
    loadUserPosts();
  }
}, [activeTab]);

const loadUserPosts = async () => {
  const response = await postService.getUserFeed(1, 20);
  if (response.success && response.data) {
    setUserPosts(response.data);
  }
};
```

### Trong PostsTab.tsx:
```typescript
// Like/Unlike post
const handleLikePost = async (postId: string) => {
  if (likedPosts.has(postId)) {
    const response = await postService.unlikePost(postId);
    if (response.success) {
      setLikedPosts(prev => {
        const newSet = new Set(prev);
        newSet.delete(postId);
        return newSet;
      });
    }
  } else {
    const response = await postService.likePost(postId);
    if (response.success) {
      setLikedPosts(prev => new Set(prev).add(postId));
    }
  }
};
```

## Features

✅ **Fetch Posts**: Tự động load posts khi vào tab "posts"
✅ **Like/Unlike**: Click heart icon để like/unlike posts
✅ **Loading State**: Hiển thị loading indicator khi đang like/unlike
✅ **Error Handling**: Xử lý lỗi API gracefully
✅ **Empty State**: Hiển thị message khi không có posts
✅ **Responsive**: Responsive design cho tất cả devices

## Next Steps

1. **Implement Comments**: Thêm functionality để view/create comments
2. **Implement Photos Tab**: Fetch và display user photos
3. **Implement Share**: Thêm share functionality
4. **Implement Delete**: Thêm delete post functionality
5. **Implement Create Post**: Thêm form để create new posts
6. **Add Pagination**: Implement infinite scroll hoặc pagination

## Notes

- Tất cả API calls có authentication check
- Posts được fetch từ `/api/posts/feed` endpoint (user feed)
- Like/Unlike state được track locally trong component
- Error messages được log vào console
