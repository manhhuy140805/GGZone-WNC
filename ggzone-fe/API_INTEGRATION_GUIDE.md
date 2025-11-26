# 🚀 Hướng dẫn tích hợp API

## ✅ Đã hoàn thành

### 1. Cấu hình API
- ✅ Tạo `.env` và `.env.example` với API URL
- ✅ Tạo `src/config/api.ts` - Centralized API configuration
- ✅ Tạo `src/utils/httpClient.ts` - HTTP client với error handling

### 2. Authentication Service
- ✅ Cập nhật `authService.ts` với API calls thực
- ✅ Implement login với JWT
- ✅ Implement register với auto-login
- ✅ JWT token decode và validation
- ✅ Token expiration check

### 3. Pages
- ✅ Login.tsx - Đã tích hợp API login
- ✅ Register.tsx - Đã tích hợp API register

## 📋 API Endpoints đã tích hợp

### Authentication
```typescript
POST /api/auth/login
Body: { email: string, password: string }
Response: { token: string }

POST /api/auth/register  
Body: { username: string, email: string, password: string }
Response: { id: string, username: string, email: string }
```

## 🔧 Cách sử dụng

### 1. Cấu hình Backend URL

Cập nhật file `.env`:
```env
VITE_API_URL=http://localhost:7009
```

### 2. Chạy Backend

```bash
cd ggzone-be
dotnet run
```

Backend sẽ chạy tại: `http://localhost:5000` hoặc `https://localhost:5001`

### 3. Chạy Frontend

```bash
cd ggzone-fe
npm run dev
```

### 4. Test Authentication

#### Đăng ký tài khoản mới:
1. Vào trang Register
2. Nhập thông tin:
   - Username: testuser
   - Email: test@example.com
   - Password: 123456
3. Click "Create Account"
4. Nếu thành công, sẽ tự động đăng nhập và chuyển về trang chủ

#### Đăng nhập:
1. Vào trang Login
2. Nhập email và password
3. Click "Sign In"
4. Nếu thành công, sẽ chuyển về trang chủ

## 🔐 JWT Token Flow

1. **Login/Register** → Nhận JWT token từ backend
2. **Store Token** → Lưu vào localStorage (`ggzone_auth_token`)
3. **Decode Token** → Extract user info từ JWT payload
4. **Store User** → Lưu user info vào localStorage (`ggzone_user`)
5. **Auto-attach** → Mọi API call sau đó tự động attach token vào header

## 📝 HTTP Client Usage

### GET Request
```typescript
import { HttpClient } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';

// Without auth
const data = await HttpClient.get('/api/games');

// With auth
const userData = await HttpClient.get('/api/users/me', true);
```

### POST Request
```typescript
// Create post (requires auth)
const newPost = await HttpClient.post(
  '/api/posts',
  { content: 'Hello world!' },
  true
);
```

### Error Handling
```typescript
try {
  const result = await HttpClient.post('/api/auth/login', credentials);
} catch (error) {
  const apiError = error as ApiError;
  console.error(apiError.message);
  console.error(apiError.status);
  console.error(apiError.errors); // Validation errors
}
```

## 🎯 Bước tiếp theo

### 1. Tích hợp các API khác

#### Games API
```typescript
// src/services/gameService.ts
import { HttpClient } from '../utils/httpClient';
import { API_CONFIG } from '../config/api';
import { Game } from '../types';

export const gameService = {
  async getAll(): Promise<Game[]> {
    return HttpClient.get(API_CONFIG.ENDPOINTS.GAMES.BASE);
  },
  
  async getById(id: string): Promise<Game> {
    return HttpClient.get(API_CONFIG.ENDPOINTS.GAMES.BY_ID(id));
  },
  
  async getTrending(): Promise<Game[]> {
    return HttpClient.get(API_CONFIG.ENDPOINTS.GAMES.TRENDING);
  },
};
```

#### Posts API
```typescript
// src/services/postService.ts
export const postService = {
  async getFeed(): Promise<Post[]> {
    return HttpClient.get(API_CONFIG.ENDPOINTS.POSTS.FEED, true);
  },
  
  async create(content: string): Promise<Post> {
    return HttpClient.post(
      API_CONFIG.ENDPOINTS.POSTS.BASE,
      { content },
      true
    );
  },
  
  async like(postId: string): Promise<void> {
    return HttpClient.post(
      API_CONFIG.ENDPOINTS.POSTS.LIKE(postId),
      undefined,
      true
    );
  },
};
```

### 2. Cập nhật Pages với API

#### Example: Browse.tsx
```typescript
const [games, setGames] = useState<Game[]>([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState('');

useEffect(() => {
  const fetchGames = async () => {
    try {
      const data = await gameService.getAll();
      setGames(data);
    } catch (err) {
      setError('Không thể tải danh sách games');
    } finally {
      setLoading(false);
    }
  };
  
  fetchGames();
}, []);
```

### 3. Implement Loading States

```typescript
{loading && <LoadingSpinner />}
{error && <ErrorMessage message={error} />}
{!loading && !error && games.map(game => ...)}
```

### 4. Add React Query (Optional)

```bash
npm install @tanstack/react-query
```

```typescript
import { useQuery } from '@tanstack/react-query';

const { data: games, isLoading, error } = useQuery({
  queryKey: ['games'],
  queryFn: gameService.getAll,
});
```

## 🐛 Troubleshooting

### CORS Error
Nếu gặp lỗi CORS, kiểm tra backend `Program.cs`:
```csharp
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

app.UseCors("AllowFrontend");
```

### Token không được gửi
Kiểm tra:
1. Token có trong localStorage không?
2. HttpClient có set `requireAuth = true` không?
3. Backend có check Authorization header không?

### 401 Unauthorized
- Token đã hết hạn → Logout và login lại
- Token không hợp lệ → Xóa localStorage và login lại
- Backend JWT config không khớp → Kiểm tra appsettings.json

## 📚 Resources

- [Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- [JWT.io](https://jwt.io/) - Debug JWT tokens
- [React Query](https://tanstack.com/query/latest) - Data fetching library

## 💡 Tips

1. **Always handle errors** - Hiển thị thông báo lỗi cho user
2. **Add loading states** - Cải thiện UX
3. **Validate input** - Trước khi gửi API
4. **Cache data** - Sử dụng React Query hoặc custom cache
5. **Retry logic** - Tự động retry khi API fail
6. **Timeout** - Set timeout cho API calls
7. **Debounce** - Cho search và autocomplete

---

**Status:** ✅ Authentication API Integration Complete
**Next:** Integrate other APIs (Games, Posts, Groups, etc.)
