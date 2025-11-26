import React, { useState } from 'react';
import { uploadService } from '../services/uploadService';

export const CloudinaryTest: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [uploadedUrl, setUploadedUrl] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(selectedFile.type)) {
      setError('Invalid file type. Allowed: JPG, PNG, GIF, WebP');
      return;
    }

    // Validate file size (5MB)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError('File size exceeds 5MB limit');
      return;
    }

    setFile(selectedFile);
    setError('');
    
    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      setError('Please select a file');
      return;
    }

    setLoading(true);
    setError('');
    setSuccess(false);

    const result = await uploadService.testUpload(file);

    if (result.success && result.data?.url) {
      setUploadedUrl(result.data.url);
      setSuccess(true);
      setFile(null);
      setPreview('');
    } else {
      setError(result.message || 'Upload failed');
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">Cloudinary Upload Test</h1>
          <p className="text-gray-400">Test image upload before integrating into profile</p>
        </div>

        {/* Main Card */}
        <div className="bg-gray-800 rounded-2xl shadow-2xl p-8 border border-gray-700">
          {/* Upload Area */}
          <div className="mb-8">
            <label className="block mb-4">
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-8 text-center cursor-pointer hover:border-orange-500 transition-colors">
                <svg className="w-12 h-12 mx-auto mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                <p className="text-gray-300 font-medium">Click to select image or drag and drop</p>
                <p className="text-gray-500 text-sm mt-1">JPG, PNG, GIF, WebP (Max 5MB)</p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </label>

            {file && (
              <div className="mt-4 p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-300 text-sm">Selected: <span className="font-semibold">{file.name}</span></p>
                <p className="text-gray-400 text-xs mt-1">{(file.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
          </div>

          {/* Preview */}
          {preview && (
            <div className="mb-8">
              <p className="text-gray-300 font-medium mb-3">Preview</p>
              <img src={preview} alt="Preview" className="w-full h-64 object-cover rounded-lg" />
            </div>
          )}

          {/* Messages */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-6 p-4 bg-green-900/30 border border-green-700 rounded-lg text-green-300 text-sm">
              Upload successful!
            </div>
          )}

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || loading}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700 disabled:bg-gray-600 text-white font-semibold rounded-lg transition-colors mb-6"
          >
            {loading ? 'Uploading...' : 'Upload Image'}
          </button>

          {/* Result */}
          {uploadedUrl && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-700 rounded-lg">
                <p className="text-gray-300 font-medium mb-2">Uploaded Image</p>
                <img src={uploadedUrl} alt="Uploaded" className="w-full h-64 object-cover rounded-lg mb-3" />
                <div className="bg-gray-800 p-3 rounded text-gray-300 text-xs break-all font-mono">
                  {uploadedUrl}
                </div>
              </div>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(uploadedUrl);
                  alert('URL copied to clipboard!');
                }}
                className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors text-sm"
              >
                Copy URL
              </button>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h3 className="text-white font-semibold mb-3">Setup Instructions</h3>
          <ol className="text-gray-300 text-sm space-y-2 list-decimal list-inside">
            <li>Get Cloudinary credentials from <a href="https://cloudinary.com" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">cloudinary.com</a></li>
            <li>Update <code className="bg-gray-700 px-2 py-1 rounded text-xs">appsettings.json</code> with your credentials</li>
            <li>Test upload here first</li>
            <li>Integrate into profile page</li>
          </ol>
        </div>
      </div>
    </div>
  );
};
