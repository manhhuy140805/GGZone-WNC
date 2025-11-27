# Remaining Tabs - API Integration Plan

## Overview
Kiểm tra các tab còn lại trong Profile page và xác định API cần tích hợp.

## Tabs Status

### ✅ Already Integrated
1. **Posts Tab** - Fetch từ `/api/posts/feed`
2. **Stats Tab** - Fetch từ `/api/games`
3. **About Tab** - Fetch từ `/api/friendship/{userId}/friends`, `/api/groups`, `/api/badge/{userId}`

### ⏳ Need Integration
1. **Groups Tab** - Cần fetch user's groups
2. **Forums Tab** - Cần fetch user's forum posts
3. **Video Tab** - Cần fetch user's video posts
4. **Teams Tab** - Cần fetch user's teams (nếu có)

---

## Tab Details & API Requirements

### 1. Groups Tab
**Current Status**: Hiển thị `userGroups` từ About tab (shared data)

**Current Implementation**:
```typescript
{activeTab === "groups" && <GroupsTab userGroups={userGroups} />}
```

**Issue**: `userGroups` được load từ `groupService.getAllGroups()` (tất cả groups), không phải user's groups

**Solution**: 
- Cần tạo API endpoint để lấy groups mà user đã join
- Hoặc filter groups từ API response

**Recommended Approach**:
```typescript
// Option 1: Backend endpoint (preferred)
GET /api/groups/user/{userId}  // Lấy groups của user

// Option 2: Filter từ getAllGroups()
// Lấy tất cả groups, sau đó filter những groups user đã join
```

**Implementation**:
```typescript
// In Profile.tsx
const [userJoinedGroups, setUserJoinedGroups] = useState<Group[]>([]);

useEffect(() => {
  if (activeTab === "groups" && currentUser?.id) {
    loadUserGroups();
  }
}, [activeTab, currentUser?.id]);

const loadUserGroups = async () => {
  // Option 1: Nếu backend có endpoint riêng
  const response = await groupService.getUserGroups(currentUser.id);
  
  // Option 2: Filter từ getAllGroups
  // const allGroups = await groupService.getAllGroups();
  // const userGroups = allGroups.filter(g => g.membersCount > 0);
};
```

---

### 2. Forums Tab
**Current Status**: Hiển thị `userPosts` từ Posts tab (shared data)

**Current Implementation**:
```typescript
{activeTab === "forums" && (
  <ForumsTab user={currentUser} userPosts={userPosts} comments={comments} />
)}
```

**Issue**: 
- `userPosts` là feed posts, không phải forum posts
- `comments` là empty array

**Solution**:
- Cần tạo API endpoint để lấy forum posts
- Cần tạo API endpoint để lấy comments

**Recommended Approach**:
```typescript
// Backend endpoints
GET /api/forum/posts/{userId}      // Lấy forum posts của user
GET /api/comment/user/{userId}     // Lấy comments của user
```

**Implementation**:
```typescript
// In Profile.tsx
const [forumPosts, setForumPosts] = useState<Post[]>([]);
const [userComments, setUserComments] = useState<Comment[]>([]);

useEffect(() => {
  if (activeTab === "forums" && currentUser?.id) {
    loadForumData();
  }
}, [activeTab, currentUser?.id]);

const loadForumData = async () => {
  // Fetch forum posts
  const postsResponse = await postService.getForumPosts(currentUser.id);
  if (postsResponse.success) {
    setForumPosts(postsResponse.data);
  }
  
  // Fetch user comments
  const commentsResponse = await commentService.getUserComments(currentUser.id);
  if (commentsResponse.success) {
    setUserComments(commentsResponse.data);
  }
};
```

---

### 3. Video Tab
**Current Status**: Hiển thị video posts từ `userPosts` (shared data)

**Current Implementation**:
```typescript
{activeTab === "video" && <VideoTab userPosts={userPosts} />}
```

**Issue**: 
- `userPosts` là feed posts, không phải video posts
- Cần filter posts với `postType === 'video'`

**Solution**:
- Cần tạo API endpoint để lấy video posts
- Hoặc filter từ posts feed

**Recommended Approach**:
```typescript
// Option 1: Backend endpoint (preferred)
GET /api/posts/videos/{userId}     // Lấy video posts của user

// Option 2: Filter từ feed
// const videoPosts = userPosts.filter(p => p.postType === 'video');
```

**Implementation**:
```typescript
// In Profile.tsx
const [videoPosts, setVideoPosts] = useState<Post[]>([]);

useEffect(() => {
  if (activeTab === "video" && currentUser?.id) {
    loadVideoPosts();
  }
}, [activeTab, currentUser?.id]);

const loadVideoPosts = async () => {
  // Option 1: Nếu backend có endpoint riêng
  const response = await postService.getVideoPosts(currentUser.id);
  
  // Option 2: Filter từ feed
  // const videos = userPosts.filter(p => p.postType === 'video');
};
```

---

### 4. Teams Tab
**Current Status**: Placeholder component (no data)

**Current Implementation**:
```typescript
{activeTab === "teams" && <TeamsTab />}
```

**Issue**: 
- Không có data
- Không có API integration

**Solution**:
- Cần tạo API endpoint để lấy user's teams
- Cần tạo Team model/interface

**Recommended Approach**:
```typescript
// Backend endpoint
GET /api/teams/user/{userId}       // Lấy teams của user
POST /api/teams                    // Tạo team mới
```

**Implementation**:
```typescript
// In Profile.tsx
const [userTeams, setUserTeams] = useState<Team[]>([]);

useEffect(() => {
  if (activeTab === "teams" && currentUser?.id) {
    loadUserTeams();
  }
}, [activeTab, currentUser?.id]);

const loadUserTeams = async () => {
  const response = await teamService.getUserTeams(currentUser.id);
  if (response.success) {
    setUserTeams(response.data);
  }
};
```

---

## API Endpoints Summary

| Tab | Endpoint | Method | Purpose |
|-----|----------|--------|---------|
| Groups | `/api/groups/user/{userId}` | GET | Get user's groups |
| Forums | `/api/forum/posts/{userId}` | GET | Get user's forum posts |
| Forums | `/api/comment/user/{userId}` | GET | Get user's comments |
| Video | `/api/posts/videos/{userId}` | GET | Get user's video posts |
| Teams | `/api/teams/user/{userId}` | GET | Get user's teams |

---

## Implementation Priority

### Priority 1 (High)
- **Groups Tab**: Reuse existing `userGroups` from About tab OR create new endpoint
- **Video Tab**: Filter from existing `userPosts` OR create new endpoint

### Priority 2 (Medium)
- **Forums Tab**: Create new endpoints for forum posts and comments

### Priority 3 (Low)
- **Teams Tab**: Create new endpoints for teams (if teams feature exists)

---

## Quick Fix (Minimal Changes)

### Option A: Reuse Existing Data
```typescript
// In Profile.tsx
{activeTab === "groups" && <GroupsTab userGroups={userGroups} />}
{activeTab === "video" && <VideoTab userPosts={userPosts} />}
{activeTab === "forums" && (
  <ForumsTab user={currentUser} userPosts={userPosts} comments={comments} />
)}
```

**Pros**: Minimal changes, quick implementation
**Cons**: Data might not be accurate (showing all groups instead of user's groups)

### Option B: Create New Endpoints
```typescript
// Create new services and endpoints
// Load specific data for each tab
```

**Pros**: Accurate data, better performance
**Cons**: Requires backend changes

---

## Recommended Implementation

### Step 1: Check Backend
Verify if these endpoints exist:
- [ ] `/api/groups/user/{userId}` or similar
- [ ] `/api/forum/posts/{userId}` or similar
- [ ] `/api/comment/user/{userId}` or similar
- [ ] `/api/posts/videos/{userId}` or similar
- [ ] `/api/teams/user/{userId}` or similar

### Step 2: Create Services (if needed)
```typescript
// forumService.ts
async getForumPosts(userId: string): Promise<PostsResponse>
async getUserComments(userId: string): Promise<CommentsResponse>

// videoService.ts
async getVideoPosts(userId: string): Promise<PostsResponse>

// teamService.ts
async getUserTeams(userId: string): Promise<TeamsResponse>
```

### Step 3: Update Profile.tsx
```typescript
// Add states for each tab
const [forumPosts, setForumPosts] = useState<Post[]>([]);
const [videoPosts, setVideoPosts] = useState<Post[]>([]);
const [userTeams, setUserTeams] = useState<Team[]>([]);

// Add useEffect for each tab
useEffect(() => {
  if (activeTab === "forums") loadForumData();
  if (activeTab === "video") loadVideoPosts();
  if (activeTab === "teams") loadUserTeams();
}, [activeTab]);
```

### Step 4: Update Tab Components
```typescript
// Pass new data to components
{activeTab === "forums" && (
  <ForumsTab user={currentUser} userPosts={forumPosts} comments={userComments} />
)}
{activeTab === "video" && <VideoTab userPosts={videoPosts} />}
{activeTab === "teams" && <TeamsTab userTeams={userTeams} />}
```

---

## Testing Checklist

- [ ] Groups Tab loads and displays user's groups
- [ ] Forums Tab loads and displays user's forum posts
- [ ] Forums Tab loads and displays user's comments
- [ ] Video Tab loads and displays user's video posts
- [ ] Teams Tab loads and displays user's teams
- [ ] No console errors
- [ ] No 401 unauthorized errors
- [ ] Responsive design works on mobile
- [ ] Empty states display correctly

---

## Notes

1. **Data Sharing**: Currently, `userGroups` is loaded in About tab and reused in Groups tab. This might not be ideal if user's groups differ from all groups.

2. **Performance**: Consider lazy loading data only when tab is clicked (already implemented for Posts, Stats, About).

3. **Caching**: Consider caching API responses to reduce requests when switching between tabs.

4. **Error Handling**: Ensure all API calls have proper error handling and fallback UI.

5. **Authentication**: Check if any of these endpoints require authentication (similar to FriendshipController issue).
