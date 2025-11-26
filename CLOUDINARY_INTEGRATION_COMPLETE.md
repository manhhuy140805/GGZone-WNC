# Cloudinary Integration - Complete Guide

## ✅ What's Been Set Up

### Backend
- ✅ `CloudinaryService` - Upload/delete images
- ✅ `UploadController` - 2 endpoints
  - `POST /api/upload/image` (authenticated)
  - `POST /api/upload/test` (public)
- ✅ Registered in `Program.cs`

### Frontend
- ✅ `uploadService` - Service to handle uploads
- ✅ `ImageUploadField` - Reusable upload component
- ✅ `EditProfileModal` - Integrated with upload
- ✅ `CloudinaryTest` page - Test page at `/test/cloudinary`

## 🚀 Quick Start

### 1. Get Cloudinary Credentials

1. Go to [cloudinary.com](https://cloudinary.com)
2. Sign up (free account)
3. Go to Dashboard
4. Copy:
   - **Cloud Name** (top of dashboard)
   - **API Key** (Settings → API Keys)
   - **API Secret** (Settings → API Keys)

### 2. Configure Backend

Update `ggzone-be/appsettings.json`:

```json
"Cloudinary": {
  "CloudName": "your_cloud_name",
  "ApiKey": "your_api_key",
  "ApiSecret": "your_api_secret"
}
```

### 3. Test Upload

1. Start backend: `dotnet run` (in ggzone-be)
2. Start frontend: `npm run dev` (in ggzone-fe)
3. Go to: `http://localhost:7009/test/cloudinary`
4. Upload a test image

### 4. Use in Profile

1. Go to Profile page
2. Click "Edit" button
3. Upload avatar or cover image
4. Click "Save changes"

## 📁 File Structure

```
Backend:
- Services/CloudinaryService.cs
- Controllers/UploadController.cs

Frontend:
- services/uploadService.ts
- components/profile/ImageUploadField.tsx
- components/profile/EditProfileModal.tsx (updated)
- pages/CloudinaryTest.tsx
```

## 🔌 API Endpoints

### Upload Image (Authenticated)
```
POST /api/upload/image
Authorization: Bearer {token}
Content-Type: multipart/form-data

Parameters:
- file: Image file (JPG, PNG, GIF, WebP, max 5MB)
- folder: Optional folder name (default: "ggzone")

Response:
{
  "success": true,
  "data": {
    "url": "https://res.cloudinary.com/..."
  },
  "message": "Image uploaded successfully"
}
```

### Test Upload (Public)
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
  },
  "message": "Test upload successful"
}
```

## 🎨 Features

### ImageUploadField Component
- Drag & drop support
- File preview
- File validation (type & size)
- URL input fallback
- Loading state
- Error handling

### Upload Service
- Automatic token handling
- Error handling
- Response parsing

### Cloudinary Service
- Image upload with folder organization
- Image deletion
- Automatic quality optimization
- Error logging

## 📂 Folder Organization

Images are organized in Cloudinary:
```
ggzone/
├── avatars/     (user avatars)
├── covers/      (profile covers)
└── posts/       (post images - for future use)

ggzone-test/    (test images)
```

## 🔒 Security

- API Secret never exposed in frontend
- File validation on backend (type & size)
- Authentication required for profile uploads
- Public test endpoint for testing only

## 🐛 Troubleshooting

### "Cloudinary credentials not configured"
- Check `appsettings.json` has correct values
- Restart backend after updating

### Upload fails with 401
- Check authentication token is valid
- Ensure user is logged in

### File size error
- Max size is 5MB
- Compress images before upload

### Invalid file type
- Allowed: JPG, PNG, GIF, WebP
- Check file extension

### CORS errors
- Check backend CORS policy in `Program.cs`
- Should allow `http://localhost:7009`

## 📝 Next Steps

### To integrate into other features:

1. **Posts** - Add image upload to post creation
```typescript
import { ImageUploadField } from '../components/profile/ImageUploadField';

// In your component
<ImageUploadField
  label="Post Image"
  value={imageUrl}
  onChange={setImageUrl}
  folder="ggzone/posts"
/>
```

2. **Groups** - Add group cover image
```typescript
<ImageUploadField
  label="Group Cover"
  value={coverUrl}
  onChange={setCoverUrl}
  folder="ggzone/groups"
/>
```

3. **Products** - Add product images
```typescript
<ImageUploadField
  label="Product Image"
  value={productImage}
  onChange={setProductImage}
  folder="ggzone/products"
/>
```

## 💡 Tips

- Use different folders for different content types
- Cloudinary automatically optimizes images
- Free tier includes 25GB storage
- Images are cached globally via CDN
- Use `secure_url` for HTTPS (already done)

## 📚 Resources

- [Cloudinary Docs](https://cloudinary.com/documentation)
- [CloudinaryDotNet GitHub](https://github.com/cloudinary/CloudinaryDotNet)
- [Cloudinary React SDK](https://cloudinary.com/documentation/react_integration)

## ✨ Done!

Your Cloudinary integration is complete and ready to use. Test it out and let me know if you need any adjustments!
