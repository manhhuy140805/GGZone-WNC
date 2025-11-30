import React from "react";

export const NewsletterCTA: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-purple-600 via-purple-500 to-blue-600 rounded-2xl p-8 md:p-12 border border-purple-400/30 shadow-lg">
      <div className="max-w-2xl">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Keep Achieving
        </h2>
        <p className="text-white/90 mb-6">
          Get notified about new achievements and challenges to unlock.
        </p>

        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white focus:ring-2 focus:ring-white/30 backdrop-blur-sm"
          />
          <button className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold rounded-lg transition-colors shadow-md hover:shadow-lg">
            Subscribe
          </button>
        </div>
      </div>
    </section>
  );
};
