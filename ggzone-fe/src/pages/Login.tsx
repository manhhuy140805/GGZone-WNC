import React, { useState } from "react";
import { Button } from "../components/common/Button";
import { Input } from "../components/common/Input";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/authService";

interface LoginProps {
  onLogin?: () => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showDemoAccounts, setShowDemoAccounts] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ email, password });

      if (result.success) {
        if (onLogin) {
          onLogin();
        }
      } else {
        setError(result.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setError("");
    setIsLoading(true);

    try {
      const result = await login({ email: demoEmail, password: demoPassword });

      if (result.success) {
        if (onLogin) {
          onLogin();
        }
      } else {
        setError(result.message || "Đăng nhập thất bại");
      }
    } catch (err) {
      setError("Có lỗi xảy ra. Vui lòng thử lại.");
    } finally {
      setIsLoading(false);
    }
  };

  const demoAccounts = authService.getDemoAccounts();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Background with gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1538481143235-5d630a6a4b1b?w=1200&h=800&fit=crop')",
        }}
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-900/40 to-black" />

      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse" />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo/Header */}
        <div className="mb-12 text-center">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-purple-600 rounded-lg flex items-center justify-center text-2xl font-bold">
              GZ
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-orange-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2">
            GGZone
          </h1>
          <p className="text-gray-400 text-sm">Gaming Community Platform</p>
        </div>

        {/* Login Card */}
        <div className="w-full max-w-md">
          <div className="bg-gray-900/80 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold text-center mb-2">Welcome Back</h2>
            <p className="text-gray-400 text-center text-sm mb-8">
              Sign in to your account to continue
            </p>

            {/* Social Login Buttons */}
            <div className="space-y-3 mb-6">
              <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                <span>🎮</span> Discord
              </button>
              <button className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                <span>📺</span> Twitch
              </button>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2">
                <span>f</span> Facebook
              </button>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex-1 h-px bg-gray-700" />
              <span className="text-gray-500 text-sm">Or</span>
              <div className="flex-1 h-px bg-gray-700" />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-4 p-4 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm flex items-start gap-2">
                <span className="text-lg">⚠️</span>
                <span>{error}</span>
              </div>
            )}

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-all"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="w-4 h-4 rounded bg-gray-800 border-gray-700 cursor-pointer accent-orange-500"
                  />
                  Remember me
                </label>
                <a
                  href="#"
                  className="text-sm text-orange-400 hover:text-orange-300 transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white font-bold py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin">⏳</span> Signing in...
                  </>
                ) : (
                  <>
                    <span>🚀</span> Sign In
                  </>
                )}
              </button>
            </form>

            {/* Demo Accounts Toggle */}
            <div className="mt-6 pt-6 border-t border-gray-700">
              <button
                onClick={() => setShowDemoAccounts(!showDemoAccounts)}
                className="w-full text-sm text-gray-400 hover:text-orange-400 transition-colors flex items-center justify-center gap-2 py-2"
              >
                <span>🔑</span>
                <span>
                  {showDemoAccounts
                    ? "Hide Demo Accounts"
                    : "Show Demo Accounts"}
                </span>
              </button>

              {/* Demo Accounts List */}
              {showDemoAccounts && (
                <div className="mt-4 space-y-2 max-h-64 overflow-y-auto">
                  <p className="text-xs text-gray-500 text-center mb-3">
                    Click any account to sign in instantly
                  </p>
                  {demoAccounts.map((account) => (
                    <button
                      key={account.email}
                      onClick={() =>
                        handleDemoLogin(account.email, account.password)
                      }
                      disabled={isLoading}
                      className="w-full p-3 bg-gray-800/50 hover:bg-gray-800 border border-gray-700 hover:border-orange-500/50 rounded-lg text-left transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium text-sm text-white group-hover:text-orange-400 transition-colors">
                            {account.fullName}
                          </div>
                          <div className="text-xs text-gray-500">
                            {account.email}
                          </div>
                        </div>
                        <div className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded border border-orange-500/30">
                          {account.role}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{" "}
            <a href="#" className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
