import React from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui";

export const FeaturedSection: React.FC = () => {
  return (
    <section className="mb-12">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
          <div className="flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-4">
              <Star size={20} className="text-yellow-300" />
              <span className="text-yellow-200 font-semibold">
                Featured Game
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Cyber Legends
            </h1>
            <p className="text-gray-100 text-lg mb-6">
              Experience the ultimate sci-fi gaming adventure with stunning
              graphics, immersive gameplay, and a thriving community. Join
              millions of players worldwide.
            </p>
            <div className="flex gap-3">
              <Button variant="primary" size="lg">
                Play Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                Learn More
              </Button>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <div className="text-8xl">🤖</div>
          </div>
        </div>
      </div>
    </section>
  );
};
