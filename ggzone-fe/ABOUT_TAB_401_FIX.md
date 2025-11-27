# About Tab - 401 Unauthorized Fix

## Problem
Khi vào tab About, user bị redirect ra trang login (401 Unauthorized error).

## Root Cause
**FriendshipController** trên backend có `[Authorize]` attribute ở class level:

```csharp
[Route("api/[controller]")]
[ApiController]
[Authorize]  // ← Yêu cầu authentication cho tất cả endpoints
public class FriendshipController : ControllerBase
{
    // GET: api/friendship/{userId}/friends
    [HttpGet("{userId}/friends")]
    public async Task<ActionResult<IEnumerable<object>>> GetFriends(Guid userId)
    {
        // ...
    }
}
```

Nhưng trong frontend, chúng ta đang gọi API với `requireAuth: false`:

```typescript
// WRONG - Gọi API yêu cầu auth nhưng không gửi token
const response = await HttpClient.get<any>(
  API_CONFIG.ENDPOINTS.FRIENDSHIPS.FRIENDS(userId),
  false  // ← Không gửi authentication token
);
```

Khi backend nhận request mà không có token, nó trả về 401 error, và HttpClient sẽ redirect user về login page.

## Solution
Thay đổi `requireAuth` parameter từ `false` thành `true` trong `friendshipService.getFriends()`:

```typescript
// CORRECT - Gọi API với authentication token
const response = await HttpClient.get<any>(
  API_CONFIG.ENDPOINTS.FRIENDSHIPS.FRIENDS(userId),
  true  // ← Gửi authentication token
);
```

## Changes Made

### File: `ggzone-fe/src/services/friendshipService.ts`

**Before**:
```typescript
async getFriends(userId: string): Promise<FriendsResponse> {
  try {
    const response = await HttpClient.get<any>(
      API_CONFIG.ENDPOINTS.FRIENDSHIPS.FRIENDS(userId),
      false  // ← WRONG
    );
```

**After**:
```typescript
async getFriends(userId: string): Promise<FriendsResponse> {
  try {
    const token = localStorage.getItem('ggzone_auth_token');
    if (!token) {
      return {
        success: false,
        message: 'Vui lòng đăng nhập',
      };
    }

    const response = await HttpClient.get<any>(
      API_CONFIG.ENDPOINTS.FRIENDSHIPS.FRIENDS(userId),
      true  // ← CORRECT
    );
```

## Backend Authorization Status

| Controller | Requires Auth | Endpoint |
|-----------|---------------|----------|
| FriendshipController | ✅ YES | `/api/friendship/{userId}/friends` |
| GroupController | ❌ NO | `/api/groups` |
| BadgeController | ❌ NO | `/api/badge/{userId}` |

## How HttpClient Handles 401

```typescript
// In httpClient.ts
if (response.status === 401) {
  // Xóa token và user từ localStorage
  localStorage.removeItem('ggzone_auth_token');
  localStorage.removeItem('ggzone_user');
  
  // Gọi callback để redirect về login
  if (onUnauthorizedCallback) {
    onUnauthorizedCallback();
  }
}
```

Khi nhận 401 error, HttpClient sẽ:
1. Xóa token từ localStorage
2. Xóa user data từ localStorage
3. Gọi callback để redirect về login page

## Testing

### Before Fix
1. Đăng nhập vào app
2. Vào Profile page
3. Click tab "About"
4. **Result**: Bị redirect ra login page (401 error)

### After Fix
1. Đăng nhập vào app
2. Vào Profile page
3. Click tab "About"
4. **Result**: Hiển thị friends, groups, badges bình thường

## Verification

### Check Token in LocalStorage
```javascript
// In browser console
localStorage.getItem('ggzone_auth_token')
// Should return: "eyJhbGciOiJIUzI1NiIs..."
```

### Check Network Requests
1. Open DevTools → Network tab
2. Click About tab
3. Look for request to `/api/friendship/{userId}/friends`
4. Check request headers:
   ```
   Authorization: Bearer eyJhbGciOiJIUzI1NiIs...
   ```
5. Check response status: Should be 200 OK (not 401)

## Related Services

Các services khác cũng cần kiểm tra:
- ✅ `groupService.getAllGroups()` - Không yêu cầu auth (correct)
- ✅ `badgeService.getUserBadges()` - Không yêu cầu auth (correct)
- ✅ `friendshipService.getFriends()` - Yêu cầu auth (FIXED)

## Summary

**Issue**: FriendshipController yêu cầu authentication nhưng frontend gọi API mà không gửi token

**Fix**: Thay đổi `requireAuth` từ `false` thành `true` trong `friendshipService.getFriends()`

**Result**: User có thể vào tab About mà không bị redirect ra login
