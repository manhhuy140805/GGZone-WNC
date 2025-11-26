# Hướng dẫn cập nhật thông tin người dùng

## Tính năng

Phần cập nhật thông tin người dùng bao gồm:

1. **Cập nhật hồ sơ** - Chỉnh sửa thông tin cá nhân
2. **Đổi mật khẩu** - Thay đổi mật khẩu tài khoản
3. **Trang cài đặt** - Quản lý toàn bộ thông tin tài khoản

## Cấu trúc

### Frontend

```
src/
├── services/
│   └── userService.ts          # Service xử lý API user
├── components/profile/
│   ├── EditProfileModal.tsx    # Modal cập nhật profile
│   └── ChangePasswordModal.tsx # Modal đổi mật khẩu
├── pages/
│   ├── Profile.tsx             # Trang profile (có nút Edit)
│   └── Settings.tsx            # Trang cài đặt
├── context/
│   └── AuthContext.tsx         # Context quản lý user state
├── config/
│   └── api.ts                  # API endpoints
└── types/
    └── index.ts                # User interface
```

### Backend

```
Controllers/
└── UserController.cs           # API endpoints

Services/
└── UserService.cs              # Business logic

Interfaces/
└── IUserService.cs             # Service interface

Dtos/User/
├── UpdateProfileDto.cs         # DTO cập nhật profile
├── ChangePasswordDto.cs        # DTO đổi mật khẩu
└── UpdateStatusDto.cs          # DTO cập nhật trạng thái
```

## API Endpoints

### Lấy thông tin user

```
GET /api/users/me
Authorization: Bearer {token}
```

Response:
```json
{
  "success": true,
  "data": {
    "id": "user-id",
    "username": "username",
    "email": "email@example.com",
    "fullName": "Full Name",
    "bio": "Bio text",
    "location": "City, Country",
    "avatarUrl": "https://...",
    "coverImageUrl": "https://...",
    "role": "user",
    "status": "online",
    "isVerified": false
  }
}
```

### Cập nhật profile

```
PUT /api/users/profile
Authorization: Bearer {token}
Content-Type: application/json

{
  "fullName": "New Name",
  "bio": "New bio",
  "location": "New location",
  "avatarUrl": "https://...",
  "coverImageUrl": "https://..."
}
```

### Đổi mật khẩu

```
PUT /api/users/password
Authorization: Bearer {token}
Content-Type: application/json

{
  "currentPassword": "old_password",
  "newPassword": "new_password"
}
```

### Cập nhật trạng thái

```
PUT /api/users/status
Authorization: Bearer {token}
Content-Type: application/json

{
  "status": "online|offline|away|busy"
}
```

## Cách sử dụng

### 1. Cập nhật profile từ trang Profile

```tsx
import { Profile } from '../pages/Profile';

// Trang Profile có nút "Edit" ở header
// Click nút Edit → Modal cập nhật profile hiện lên
```

### 2. Cập nhật profile từ trang Settings

```tsx
import { Settings } from '../pages/Settings';

// Truy cập /settings
// Click nút "Chỉnh sửa" ở phần "Thông tin hồ sơ"
```

### 3. Đổi mật khẩu

```tsx
// Từ trang Settings
// Click nút "Đổi mật khẩu" ở phần "Bảo mật"
// Nhập mật khẩu hiện tại, mật khẩu mới, xác nhận mật khẩu
```

### 4. Sử dụng userService trong component

```tsx
import { userService } from '../services/userService';

// Lấy thông tin user hiện tại
const response = await userService.getCurrentUser();
if (response.success) {
  console.log(response.data);
}

// Cập nhật profile
const updateResponse = await userService.updateProfile({
  fullName: 'New Name',
  bio: 'New bio',
  location: 'New location'
});

// Đổi mật khẩu
const passwordResponse = await userService.changePassword(
  'currentPassword',
  'newPassword'
);

// Cập nhật trạng thái
const statusResponse = await userService.updateStatus('online');
```

## Validation

### Frontend

- **Tên đầy đủ**: Tối đa 100 ký tự
- **Tiểu sử**: Không giới hạn
- **Địa điểm**: Tối đa 100 ký tự
- **URL ảnh**: Tối đa 500 ký tự
- **Mật khẩu mới**: Tối thiểu 6 ký tự

### Backend

- **FullName**: MaxLength(100)
- **Bio**: Không giới hạn
- **Location**: MaxLength(100)
- **AvatarUrl**: MaxLength(500)
- **CoverImageUrl**: MaxLength(500)
- **NewPassword**: MinLength(6)

## Error Handling

Tất cả các modal đều có xử lý lỗi:

```tsx
// Hiển thị lỗi nếu API trả về lỗi
if (!response.success) {
  setError(response.message);
}

// Hiển thị thành công
if (response.success) {
  setSuccess(true);
  // Tự động đóng modal sau 1.5 giây
}
```

## State Management

User state được quản lý bởi AuthContext:

```tsx
const { user, setUser } = useAuth();

// Cập nhật user state
setUser(updatedUser);

// User được lưu vào localStorage
// Khi reload trang, user sẽ được restore từ localStorage
```

## Lưu ý

1. **Token**: Tất cả các request cập nhật đều yêu cầu token hợp lệ
2. **Ảnh**: Hiện tại chỉ hỗ trợ URL ảnh, chưa hỗ trợ upload file
3. **Mật khẩu**: Mật khẩu được hash bằng BCrypt trên backend
4. **Trạng thái**: Chỉ hỗ trợ 4 trạng thái: online, offline, away, busy

## Phát triển tiếp theo

- [ ] Upload ảnh trực tiếp (thay vì URL)
- [ ] Xác minh email
- [ ] Xóa tài khoản
- [ ] Lịch sử hoạt động
- [ ] Cài đặt quyền riêng tư
