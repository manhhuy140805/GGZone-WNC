# Cloudinary Setup Guide

## 1. Create Cloudinary Account

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up for a free account
3. Verify your email

## 2. Get Your Credentials

1. Go to Dashboard
2. Find your **Cloud Name** (displayed at the top)
3. Go to Settings → API Keys
4. Copy your **API Key** and **API Secret**

## 3. Backend Configuration

Update `ggzone-be/appsettings.json`:

```json
"Cloudinary": {
  "CloudName": "your_cloud_name",
  "ApiKey": "your_api_key",
  "ApiSecret": "your_api_secret"
}
```

## 4. Test Upload

1. Start backend: `dotnet run` (in ggzone-be folder)
2. Start frontend: `npm run dev` (in ggzone-fe folder)
3. Go to: `http://localhost:7009/test/cloudinary`
4. Upload a test image

## 5. API Endpoints

### Upload Image (Authenticated)
```
POST /api/upload/image
Content-Type: multipart/form-data

Parameters:
- file: Image file (JPG, PNG, GIF, WebP, max 5MB)
- folder: Optional folder name (default: "ggzone")

Response:
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/..."
  }
}
```

### Test Upload (No Auth)
```
POST /api/upload/test
Content-Type: multipart/form-data

Parameters:
- file: Image file

Response:
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/..."
  }
}
```

## 6. Frontend Integration

### Upload Service
```typescript
import { HttpClient } from '../utils/httpClient';

const uploadImage = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch('http://localhost:5000/api/upload/image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`
    },
    body: formData
  });

  const data = await response.json();
  return data.data.url;
};
```

## 7. Integration into Profile

After testing, integrate into:
- `EditProfileModal.tsx` - for avatar and cover image upload
- `PostCreate.tsx` - for post images
- Any other image upload features

## 8. Folder Structure in Cloudinary

Images are organized by folder:
- `ggzone/` - Production images
- `ggzone-test/` - Test images

You can manage these in Cloudinary Dashboard → Media Library

## 9. Security Notes

- Never expose API Secret in frontend code
- Always validate file type and size on backend
- Use HTTPS in production
- Consider adding watermarks or transformations

## 10. Troubleshooting

### "Cloudinary credentials not configured"
- Check appsettings.json has correct values
- Restart backend after updating config

### Upload fails with 401
- Check authentication token is valid
- Ensure user is logged in

### File size error
- Max size is 5MB
- Compress images before upload

### Invalid file type
- Allowed: JPG, PNG, GIF, WebP
- Check file extension
