import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  color: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: IconComponent,
  label,
  value,
  color,
}) => {
  return (
    <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl p-6 hover:border-orange-400 hover:shadow-lg transition-all duration-200 shadow-sm">
      <IconComponent size={32} className={`mb-2 ${color}`} />
      <div className="text-gray-600 text-sm mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
    </div>
  );
};
