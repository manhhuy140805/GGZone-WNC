import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "@/services/api/authService";

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
    agreeToTerms: false,
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu không khớp");
      return;
    }

    if (formData.password.length < 6) {
      setError("Mật khẩu phải có ít nhất 6 ký tự");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("Bạn phải đồng ý với Điều khoản và Điều kiện");
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
      });

      if (result.success) {
        // Đăng ký thành công, chuyển về trang chủ
        navigate("/");
      } else {
        setError(result.message || "Đăng ký thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Full Screen Background Image - Fixed */}
      <div
        className="fixed inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: "url('https://wallpapercat.com/w/full/4/d/7/1868806-3840x2160-desktop-4k-valorant-wallpaper-image.jpg')",
        }}
      />
      
      {/* Gradient Overlay - Fixed */}
      <div className="fixed inset-0 bg-gradient-to-br from-white/55 via-gray-50/75 to-white/75" />
      
      {/* Content Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row items-center gap-12">
          
          {/* Left Side - Branding & Info */}
          <div className="flex-1 space-y-8 text-center lg:text-left">
             {/* Logo */}
            <div className="flex items-center justify-center lg:justify-start">
              <img 
                src="/logo.png" 
                alt="GGZone" 
                className="h-20 w-auto"
              />
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-black leading-tight text-gray-900">
                Start Your Gaming Journey Today
              </h1>
              <p className="text-xl text-gray-700">
                Join millions of gamers and unlock exclusive features, tournaments, and rewards.
              </p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border-2 border-green-200 shadow-lg hover:shadow-green-300 transition-all">
                <div className="text-4xl font-black text-green-600 mb-2">Free</div>
                <div className="text-sm font-medium uppercase tracking-wide text-gray-700">Forever</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border-2 border-purple-200 shadow-lg hover:shadow-purple-300 transition-all">
                <div className="text-4xl font-black text-purple-600 mb-2">24/7</div>
                <div className="text-sm font-medium uppercase tracking-wide text-gray-700">Support</div>
              </div>
              <div className="bg-white/90 backdrop-blur-md p-6 rounded-2xl border-2 border-blue-200 shadow-lg hover:shadow-blue-300 transition-all">
                <div className="text-4xl font-black text-blue-600 mb-2">Instant</div>
                <div className="text-sm font-medium uppercase tracking-wide text-gray-700">Access</div>
              </div>
            </div>
          </div>

          {/* Right Side - Register Form */}
          <div className="w-full lg:w-auto lg:min-w-[480px] lg:max-w-[480px]">
            <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="mb-8 text-center">
                <h2 className="text-3xl font-black text-gray-900 mb-2">Create Account</h2>
                <p className="text-gray-600">Join the gaming community today</p>
              </div>

              {/* Error Message */}
              {error && (
                <div className="mb-6 p-4 bg-red-50 border-2 border-red-200 rounded-xl text-red-600 text-sm flex items-start gap-3">
                  <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <span>{error}</span>
                </div>
              )}

              {/* Register Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Username
                    </label>
                    <input
                      type="text"
                      name="username"
                      placeholder="gamer123"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-base"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-base"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Min. 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-base"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2 uppercase tracking-wide">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    placeholder="Re-enter password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-5 py-3.5 bg-gray-50 border-2 border-gray-300 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white transition-all text-base"
                  />
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-3 text-sm text-gray-700 cursor-pointer group">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="w-5 h-5 mt-0.5 rounded-lg bg-white border-2 border-gray-300 cursor-pointer accent-orange-500 flex-shrink-0"
                    />
                    <span className="font-medium group-hover:text-gray-900 transition-colors leading-relaxed">
                      I agree to the{" "}
                      <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="#" className="text-orange-600 hover:text-orange-700 font-semibold">
                        Privacy Policy
                      </a>
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all duration-200 shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.02] active:scale-[0.98] text-base uppercase tracking-wide"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Creating Account...
                    </span>
                  ) : (
                    "Create Account"
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="flex items-center gap-4 my-6">
                <div className="flex-1 h-px bg-gray-300" />
                <span className="text-gray-500 text-sm font-medium uppercase tracking-wider">Or</span>
                <div className="flex-1 h-px bg-gray-300" />
              </div>

              {/* Social Register Buttons */}
              <div className="grid grid-cols-3 gap-3">
                <button 
                  className="p-3 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-400 rounded-xl transition-all duration-200 flex items-center justify-center group shadow-sm"
                  title="Continue with Discord"
                >
                  <svg className="w-6 h-6 text-blue-500 group-hover:text-blue-600 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
                  </svg>
                </button>
                <button 
                  className="p-3 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-purple-400 rounded-xl transition-all duration-200 flex items-center justify-center group shadow-sm"
                  title="Continue with Twitch"
                >
                  <svg className="w-6 h-6 text-purple-500 group-hover:text-purple-600 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/>
                  </svg>
                </button>
                <button 
                  className="p-3 bg-white hover:bg-gray-50 border-2 border-gray-300 hover:border-blue-400 rounded-xl transition-all duration-200 flex items-center justify-center group shadow-sm"
                  title="Continue with Facebook"
                >
                  <svg className="w-6 h-6 text-blue-600 group-hover:text-blue-700 transition-colors" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </button>
              </div>

              {/* Footer */}
              <p className="text-center text-gray-700 text-sm mt-6">
                Already have an account?{" "}
                <button 
                  onClick={() => navigate("/login")}
                  className="text-orange-600 hover:text-orange-700 font-bold transition-colors"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
