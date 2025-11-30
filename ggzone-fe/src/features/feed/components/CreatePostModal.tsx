import React from "react";
import { Image, Video, X } from "lucide-react";
import { PostMedia } from "@/services/api/postService";

interface CreatePostModalProps {
  isOpen: boolean;
  content: string;
  uploadedMedia: PostMedia[];
  uploading: boolean;
  uploadProgress: number;
  error: string | null;
  onClose: () => void;
  onContentChange: (content: string) => void;
  onMediaUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveMedia: (mediaId: string) => void;
  onCreate: () => void;
}

export const CreatePostModal: React.FC<CreatePostModalProps> = ({
  isOpen,
  content,
  uploadedMedia,
  uploading,
  uploadProgress,
  error,
  onClose,
  onContentChange,
  onMediaUpload,
  onRemoveMedia,
  onCreate,
}) => {
  if (!isOpen) return null;

  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Create Post</h3>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {/* Upload Progress */}
      {uploading && uploadProgress > 0 && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Đang upload...</span>
            <span className="text-sm font-semibold text-orange-600">
              {uploadProgress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-orange-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder="What's on your mind?"
        className="w-full p-4 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 resize-none"
        rows={4}
      />

      {/* Media Preview */}
      {uploadedMedia.length > 0 && (
        <div className="mt-4 space-y-2">
          <p className="text-sm font-semibold text-gray-700">
            Uploaded Media ({uploadedMedia.length})
          </p>
          <div className="grid grid-cols-2 gap-2">
            {uploadedMedia.map((media) => (
              <div key={media.id} className="relative group">
                {media.mediaType?.startsWith("video") ? (
                  <video
                    src={media.mediaUrl}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                ) : (
                  <img
                    src={media.mediaUrl}
                    alt="Upload preview"
                    className="w-full h-24 object-cover rounded-lg"
                  />
                )}
                <button
                  onClick={() => onRemoveMedia(media.id)}
                  className="absolute top-1 right-1 p-1 bg-red-600 hover:bg-red-700 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <X size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <div className="flex gap-2">
          <label className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Image size={20} className="text-gray-600" />
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onMediaUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
          <label className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer">
            <Video size={20} className="text-gray-600" />
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={onMediaUpload}
              disabled={uploading}
              className="hidden"
            />
          </label>
        </div>
        <button
          onClick={onCreate}
          disabled={uploading || (!content.trim() && uploadedMedia.length === 0)}
          className="px-6 py-2 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
        >
          {uploading ? "Uploading..." : "Post"}
        </button>
      </div>
    </div>
  );
};
