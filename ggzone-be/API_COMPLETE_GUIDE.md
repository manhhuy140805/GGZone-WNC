# 🚀 GGZone Backend - Complete API Guide

## 📋 Tổng quan

Backend API hoàn chỉnh cho GGZone Gaming Social Platform với **20 Controllers** và **100+ endpoints**.

## ✅ Danh sách Controllers

### 1. **AuthController** - Xác thực & Đăng ký
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/register` - Đăng ký tài khoản
- `POST /api/auth/refresh` - Làm mới token
- `POST /api/auth/logout` - Đăng xuất

### 2. **UserController** - Quản lý người dùng
- `GET /api/user` - Lấy danh sách users
- `GET /api/user/{id}` - Lấy thông tin user
- `PUT /api/user/{id}` - Cập nhật user
- `DELETE /api/user/{id}` - Xóa user
- `GET /api/user/{id}/stats` - Thống kê user

### 3. **PostController** - Bài viết
- `GET /api/post` - Lấy danh sách posts
- `GET /api/post/{id}` - Chi tiết post
- `POST /api/post` - Tạo post mới
- `PUT /api/post/{id}` - Cập nhật post
- `DELETE /api/post/{id}` - Xóa post
- `POST /api/post/{id}/like` - Like post
- `DELETE /api/post/{id}/like` - Unlike post
- `GET /api/post/{id}/comments` - Lấy comments
- `POST /api/post/{id}/comments` - Thêm comment

### 4. **GroupController** - Nhóm/Cộng đồng
- `GET /api/group` - Danh sách groups
- `GET /api/group/{id}` - Chi tiết group
- `POST /api/group` - Tạo group
- `PUT /api/group/{id}` - Cập nhật group
- `DELETE /api/group/{id}` - Xóa group
- `GET /api/group/{id}/members` - Danh sách thành viên
- `POST /api/group/{id}/join` - Tham gia group
- `DELETE /api/group/{id}/leave` - Rời group

### 5. **GameController** - Trò chơi
- `GET /api/game` - Danh sách games
- `GET /api/game/{id}` - Chi tiết game
- `POST /api/game` - Thêm game
- `PUT /api/game/{id}` - Cập nhật game
- `DELETE /api/game/{id}` - Xóa game
- `GET /api/game/{id}/reviews` - Reviews của game
- `POST /api/game/{id}/reviews` - Thêm review

### 6. **ForumController** - Diễn đàn
- `GET /api/forum/categories` - Danh mục forum
- `GET /api/forum/topics` - Danh sách topics
- `GET /api/forum/topics/{id}` - Chi tiết topic
- `POST /api/forum/topics` - Tạo topic
- `POST /api/forum/topics/{id}/reply` - Trả lời topic
- `PUT /api/forum/reply/{id}` - Cập nhật reply
- `DELETE /api/forum/reply/{id}` - Xóa reply

### 7. **VideoController** - Video
- `GET /api/video` - Danh sách videos
- `GET /api/video/{id}` - Chi tiết video
- `POST /api/video` - Upload video
- `PUT /api/video/{id}` - Cập nhật video
- `DELETE /api/video/{id}` - Xóa video
- `POST /api/video/{id}/like` - Like video
- `GET /api/video/{id}/comments` - Comments video
- `POST /api/video/{id}/comments` - Thêm comment

### 8. **TrendingController** - Xu hướng
- `GET /api/trending/games` - Games trending
- `GET /api/trending/players` - Players trending
- `GET /api/trending/videos` - Videos trending
- `GET /api/trending/posts` - Posts trending

### 9. **MarketplaceController** - Chợ
- `GET /api/marketplace` - Danh sách items
- `GET /api/marketplace/{id}` - Chi tiết item
- `POST /api/marketplace` - Tạo listing
- `PUT /api/marketplace/{id}` - Cập nhật listing
- `DELETE /api/marketplace/{id}` - Xóa listing
- `GET /api/marketplace/{id}/reviews` - Reviews
- `POST /api/marketplace/{id}/reviews` - Thêm review

### 10. **ShoppingCartController** - Giỏ hàng
- `GET /api/shoppingcart/{userId}` - Lấy giỏ hàng
- `POST /api/shoppingcart` - Thêm vào giỏ
- `PUT /api/shoppingcart/{id}` - Cập nhật số lượng
- `DELETE /api/shoppingcart/{id}` - Xóa khỏi giỏ
- `DELETE /api/shoppingcart/user/{userId}` - Xóa toàn bộ

### 11. **StoreController** ✨ - Cửa hàng
- `GET /api/store/products` - Danh sách sản phẩm
- `GET /api/store/products/{id}` - Chi tiết sản phẩm
- `POST /api/store/products` - Thêm sản phẩm
- `PUT /api/store/products/{id}` - Cập nhật sản phẩm
- `DELETE /api/store/products/{id}` - Xóa sản phẩm
- `GET /api/store/categories` - Danh mục sản phẩm

### 12. **OrderController** ✨ - Đơn hàng
- `GET /api/order/{userId}` - Đơn hàng của user
- `GET /api/order/detail/{orderId}` - Chi tiết đơn hàng
- `POST /api/order` - Tạo đơn hàng
- `PUT /api/order/{id}/status` - Cập nhật trạng thái
- `DELETE /api/order/{id}` - Hủy đơn hàng

### 13. **TournamentController** ✨ - Giải đấu
- `GET /api/tournament` - Danh sách tournaments
- `GET /api/tournament/{id}` - Chi tiết tournament
- `POST /api/tournament` - Tạo tournament
- `PUT /api/tournament/{id}` - Cập nhật tournament
- `DELETE /api/tournament/{id}` - Xóa tournament
- `GET /api/tournament/{id}/participants` - Người tham gia
- `POST /api/tournament/{id}/join` - Tham gia
- `DELETE /api/tournament/{id}/leave` - Rời khỏi
- `PUT /api/tournament/{id}/status` - Cập nhật trạng thái

### 14. **FriendshipController** ✨ - Bạn bè
- `GET /api/friendship/{userId}/friends` - Danh sách bạn bè
- `GET /api/friendship/{userId}/requests` - Lời mời kết bạn
- `GET /api/friendship/{userId}/sent` - Lời mời đã gửi
- `POST /api/friendship/send` - Gửi lời mời
- `PUT /api/friendship/{id}/accept` - Chấp nhận
- `PUT /api/friendship/{id}/decline` - Từ chối
- `DELETE /api/friendship/{id}` - Xóa bạn
- `GET /api/friendship/{userId}/suggestions` - Gợi ý kết bạn
- `PUT /api/friendship/suggestion/{id}/dismiss` - Bỏ qua gợi ý

### 15. **MessageController** ✨ - Tin nhắn
- `GET /api/message/{userId}/conversations` - Danh sách hội thoại
- `GET /api/message/{userId}/with/{otherUserId}` - Tin nhắn với user
- `POST /api/message` - Gửi tin nhắn
- `PUT /api/message/{id}/read` - Đánh dấu đã đọc
- `GET /api/message/{userId}/unread-count` - Số tin chưa đọc
- `DELETE /api/message/{id}` - Xóa tin nhắn

### 16. **NotificationController** ✨ - Thông báo
- `GET /api/notification/{userId}` - Danh sách thông báo
- `GET /api/notification/{userId}/unread-count` - Số thông báo chưa đọc
- `PUT /api/notification/{id}/read` - Đánh dấu đã đọc
- `PUT /api/notification/{userId}/read-all` - Đọc tất cả
- `POST /api/notification` - Tạo thông báo
- `DELETE /api/notification/{id}` - Xóa thông báo
- `DELETE /api/notification/{userId}/clear` - Xóa tất cả

### 17. **PhotoController** ✨ - Ảnh
- `GET /api/photo/{userId}` - Ảnh của user
- `GET /api/photo/detail/{id}` - Chi tiết ảnh
- `POST /api/photo` - Upload ảnh
- `PUT /api/photo/{id}` - Cập nhật caption
- `DELETE /api/photo/{id}` - Xóa ảnh

### 18. **BadgeController** ✨ - Huy hiệu
- `GET /api/badge/{userId}` - Huy hiệu của user
- `GET /api/badge/all` - Tất cả huy hiệu
- `POST /api/badge` - Trao huy hiệu
- `DELETE /api/badge/{id}` - Xóa huy hiệu

### 19. **ActivityController** ✨ - Hoạt động
- `GET /api/activity/{userId}` - Lịch sử hoạt động
- `POST /api/activity/log` - Ghi log hoạt động
- `GET /api/activity/{userId}/recent` - Hoạt động gần đây
- `GET /api/activity/feed/{userId}` - Feed hoạt động bạn bè

### 20. **SearchController** ✨ - Tìm kiếm
- `GET /api/search?q=query&type=all` - Tìm kiếm toàn bộ
- Hỗ trợ tìm: users, games, groups, posts, videos

### 21. **StatisticsController** ✨ - Thống kê
- `GET /api/statistics/dashboard` - Thống kê tổng quan
- `GET /api/statistics/user/{userId}` - Thống kê user
- `GET /api/statistics/game/{gameId}` - Thống kê game
- `GET /api/statistics/daily` - Thống kê theo ngày

## 📊 Tổng kết

### Số lượng:
- **21 Controllers**
- **100+ API Endpoints**
- **Full CRUD Operations**
- **Authentication & Authorization**

### Tính năng:
✅ Authentication (JWT)
✅ User Management
✅ Social Feed (Posts, Comments, Likes)
✅ Groups & Communities
✅ Games & Reviews
✅ Forum System
✅ Video Sharing
✅ Trending Content
✅ Marketplace
✅ Shopping Cart & Orders
✅ Tournament System
✅ Friend System
✅ Real-time Messaging
✅ Notifications
✅ Photo Gallery
✅ Badge System
✅ Activity Tracking
✅ Search Functionality
✅ Statistics & Analytics

## 🔐 Authentication

Hầu hết endpoints yêu cầu JWT token:

```http
Authorization: Bearer {your-jwt-token}
```

## 📝 Response Format

### Success Response:
```json
{
  "data": {},
  "message": "Success"
}
```

### Error Response:
```json
{
  "error": "Error message",
  "status": 400
}
```

## 🚀 Testing

### Swagger UI:
```
https://localhost:7xxx/swagger
```

### Sample Request:
```bash
curl -X GET "https://localhost:7xxx/api/user" \
  -H "Authorization: Bearer {token}"
```

## 🎯 Status: Production Ready! ✅

Backend API hoàn chỉnh và sẵn sàng cho:
- Frontend integration
- Mobile app development
- Third-party integrations
- Production deployment
