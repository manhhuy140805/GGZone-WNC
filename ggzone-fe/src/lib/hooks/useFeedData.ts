import { useState, useEffect } from "react";
import { postService, Post, PostMedia } from "@/services/api/postService";
import { uploadService } from "@/services/api/uploadService";
import { authService } from "@/services/api/authService";

type SortType = "latest" | "trending" | "oldest";

export const useFeedData = (sortBy: SortType, activeTab: string) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
  const [copiedPostId, setCopiedPostId] = useState<string | null>(null);
  const [uploadedMedia, setUploadedMedia] = useState<PostMedia[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);

  const currentUser = authService.getCurrentUser();

  // Load posts
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await postService.getFeed(1, 20, sortBy);
        if (response.success && response.data) {
          setPosts(response.data.posts);

          const likedPostIds = response.data.posts
            .filter((post) => post.isLiked)
            .map((post) => post.id);
          setLikedPosts(new Set(likedPostIds));
        } else {
          setError(response.message || "Lỗi khi tải posts");
        }
      } catch (err) {
        setError("Lỗi khi tải dữ liệu");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, [sortBy, activeTab]);

  // Handle media upload
  const handleMediaUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    setUploading(true);
    setUploadError(null);
    setUploadProgress(0);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const isVideo = file.type.startsWith("video");

      const onProgress = (progress: number) => {
        setUploadProgress(progress);
      };

      const result = isVideo
        ? await uploadService.uploadVideo(
            file,
            "ggzone/posts/videos",
            onProgress
          )
        : await uploadService.uploadImage(file, "ggzone/posts", onProgress);

      if (result.success && result.data) {
        const mediaType = isVideo ? "video" : "image";
        const mediaUrl = result.data.videoUrl || result.data.url || "";

        if (mediaUrl) {
          setUploadedMedia((prev) => [
            ...prev,
            {
              id: `temp-${Date.now()}-${i}`,
              mediaUrl: mediaUrl,
              mediaType: mediaType,
            },
          ]);
        } else {
          setUploadError("Upload thành công nhưng không nhận được URL");
          break;
        }
      } else {
        setUploadError(result.message || "Upload failed");
        break;
      }
    }

    setUploading(false);
    setUploadProgress(0);
    e.target.value = "";
  };

  // Handle create post
  const handleCreatePost = async (content: string) => {
    if (!content.trim() && uploadedMedia.length === 0) {
      setUploadError("Please add content or media");
      return false;
    }

    try {
      const result = await postService.createPost(content, uploadedMedia);
      if (result.success && result.data) {
        setPosts((prev) => [result.data!, ...prev]);
        setUploadedMedia([]);
        setUploadError(null);
        return true;
      } else {
        setUploadError(result.message || "Failed to create post");
        return false;
      }
    } catch (err) {
      setUploadError("Error creating post");
      console.error(err);
      return false;
    }
  };

  // Handle like/unlike
  const handleToggleLike = async (postId: string) => {
    if (!currentUser || !authService.isAuthenticated()) {
      setUploadError("Vui lòng đăng nhập để like bài viết");
      setTimeout(() => setUploadError(null), 3000);
      return;
    }

    const isLiked = likedPosts.has(postId);

    try {
      const response = isLiked
        ? await postService.unlikePost(postId)
        : await postService.likePost(postId);

      if (response.success) {
        setLikedPosts((prev) => {
          const newSet = new Set(prev);
          if (isLiked) {
            newSet.delete(postId);
          } else {
            newSet.add(postId);
          }
          return newSet;
        });

        const newLikeCount = response.likeCount ?? 0;
        setPosts((prev) =>
          prev.map((p) =>
            p.id === postId ? { ...p, likesCount: newLikeCount } : p
          )
        );
      } else {
        setUploadError(
          response.message ||
            `Không thể ${isLiked ? "unlike" : "like"} bài viết`
        );
        setTimeout(() => setUploadError(null), 3000);
      }
    } catch (error) {
      console.error("Error toggling like:", error);
      setUploadError("Lỗi khi like/unlike bài viết");
      setTimeout(() => setUploadError(null), 3000);
    }
  };

  // Handle share post
  const handleSharePost = async (postId: string) => {
    const postUrl = `${window.location.origin}/feed?post=${postId}`;

    try {
      await navigator.clipboard.writeText(postUrl);
      setCopiedPostId(postId);
      setTimeout(() => setCopiedPostId(null), 2000);
    } catch (error) {
      console.error("Failed to copy link:", error);
      const textArea = document.createElement("textarea");
      textArea.value = postUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        setCopiedPostId(postId);
        setTimeout(() => setCopiedPostId(null), 2000);
      } catch (err) {
        console.error("Fallback copy failed:", err);
      }
      document.body.removeChild(textArea);
    }
  };

  const handleRemoveMedia = (mediaId: string) => {
    setUploadedMedia((prev) => prev.filter((m) => m.id !== mediaId));
  };

  return {
    posts,
    loading,
    error,
    likedPosts,
    copiedPostId,
    uploadedMedia,
    uploading,
    uploadError,
    uploadProgress,
    handleMediaUpload,
    handleCreatePost,
    handleToggleLike,
    handleSharePost,
    handleRemoveMedia,
    setUploadError,
  };
};
