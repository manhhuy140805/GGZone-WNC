import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helper?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helper,
  icon,
  className = "",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-2.5 text-gray-400">{icon}</div>
        )}
        <input
          className={`
            w-full px-3 py-2 rounded-lg border-2 border-gray-200
            focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200
            transition-all duration-200
            ${icon ? "pl-10" : ""}
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-200"
                : ""
            }
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="text-red-600 text-sm mt-1">{error}</p>}
      {helper && !error && (
        <p className="text-gray-500 text-sm mt-1">{helper}</p>
      )}
    </div>
  );
};
