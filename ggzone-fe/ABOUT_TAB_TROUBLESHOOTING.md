# About Tab Troubleshooting Guide

## Common Issues and Solutions

### Issue 1: Friends List Not Loading
**Symptoms**: Friends section shows "No friends yet" even though user has friends

**Possible Causes**:
1. API endpoint `/api/friendship/{userId}/friends` not returning data
2. Response structure different from expected
3. Authentication issue

**Solutions**:
1. Check browser console for error messages
2. Verify API is returning data:
   ```
   GET http://localhost:5000/api/friendship/{userId}/friends
   ```
3. Check if token is valid in localStorage
4. Verify response structure matches:
   ```json
   [
     {
       "id": "...",
       "friend": {
         "id": "...",
         "username": "...",
         "fullName": "...",
         "avatarUrl": "..."
       }
     }
   ]
   ```

### Issue 2: Groups Not Loading
**Symptoms**: Groups Joined count shows 0

**Possible Causes**:
1. API endpoint `/api/groups` not returning data
2. User not joined any groups yet
3. API error

**Solutions**:
1. Check browser console for error messages
2. Verify API is returning data:
   ```
   GET http://localhost:5000/api/groups
   ```
3. Check if user has actually joined groups

### Issue 3: Badges/Achievements Not Showing
**Symptoms**: Achievements section not visible or shows 0 badges

**Possible Causes**:
1. API endpoint `/api/badge/{userId}` not returning data
2. User hasn't earned any badges yet
3. Response structure different from expected

**Solutions**:
1. Check browser console for error messages
2. Verify API is returning data:
   ```
   GET http://localhost:5000/api/badge/{userId}
   ```
3. Check if user has earned badges

### Issue 4: Personal Information Not Displaying
**Symptoms**: Location, email, or joined date showing as "not set" or "unknown"

**Possible Causes**:
1. User data not loaded from API
2. Missing fields in user object
3. Date format issue

**Solutions**:
1. Verify user data is loaded in Profile.tsx
2. Check if user object has required fields:
   - `email`
   - `location`
   - `createdAt`
   - `role`
3. Check browser console for date parsing errors

## Debugging Steps

### Step 1: Check Console Logs
Open browser DevTools (F12) and check Console tab for errors:
```
Error loading about data: ...
Error processing friends: ...
```

### Step 2: Check Network Requests
1. Open DevTools Network tab
2. Click on About tab
3. Look for API requests:
   - `/api/friendship/{userId}/friends`
   - `/api/groups`
   - `/api/badge/{userId}`
4. Check response status (should be 200)
5. Check response body for data

### Step 3: Check Local Storage
Open DevTools Application tab and check:
- `ggzone_auth_token` - should exist and be valid
- `ggzone_user` - should contain user data

### Step 4: Check Component Props
Add console.log in AboutTab.tsx:
```typescript
console.log('AboutTab props:', { user, userFriends, userGroups, userBadges });
```

## API Response Formats

### Friends Response
```json
[
  {
    "id": "friendship-id",
    "friend": {
      "id": "user-id",
      "username": "username",
      "fullName": "Full Name",
      "avatarUrl": "https://...",
      "status": "online"
    },
    "createdAt": "2024-01-01T00:00:00Z"
  }
]
```

### Groups Response
```json
[
  {
    "id": "group-id",
    "name": "Group Name",
    "description": "Description",
    "membersCount": 10,
    "coverImageUrl": "https://...",
    "iconUrl": "https://...",
    "visibility": "public"
  }
]
```

### Badges Response
```json
[
  {
    "id": "badge-id",
    "badgeName": "Badge Name",
    "badgeType": "achievement",
    "iconUrl": "https://...",
    "awardedAt": "2024-01-01T00:00:00Z"
  }
]
```

## Testing Checklist

- [ ] Friends list loads and displays correctly
- [ ] Groups count is accurate
- [ ] Badges/achievements display with icons
- [ ] Personal information displays correctly
- [ ] Status indicator shows correct color
- [ ] No console errors
- [ ] Responsive design works on mobile
- [ ] Empty states display correctly
- [ ] Hover effects work

## Performance Tips

1. **Lazy Load Data**: Data is loaded only when About tab is clicked
2. **Limit Display**: Only show top 6 friends and 12 badges
3. **Error Handling**: Graceful fallbacks for missing data
4. **Caching**: Consider caching API responses to reduce requests

## Future Improvements

1. Add friend action buttons (Add Friend, Remove Friend)
2. Add group action buttons (Join Group, Leave Group)
3. Add pagination for friends and badges
4. Add search/filter functionality
5. Add leaderboard comparison
6. Add achievement details modal
