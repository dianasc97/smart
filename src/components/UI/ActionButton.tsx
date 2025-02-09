import React from "react";
import { FiPlus, FiArrowLeft } from "react-icons/fi";
import { ActionButtonProps } from "../../types/commonTypes";

const iconMap = {
  plus: <FiPlus className="text-blue-600" />,
  "arrow-left": <FiArrowLeft className="text-blue-600" />,
};

const variants = {
  primary: "bg-blue-500 text-white hover:bg-blue-600",
  danger: "bg-red-600 text-white hover:bg-red-800",
  secondary: "bg-gray-200 text-black hover:bg-gray-300",
  white: "bg-white text-blue-500 border border-blue-600 hover:bg-gray-100",
  link: "text-blue-500 hover:underline",
};

const ActionButton: React.FC<ActionButtonProps> = ({
  onClick,
  children,
  type = "button",
  variant = "primary",
  className = "",
  icon,
  disabled = false,
}) => (
  <button
    type={type}
    onClick={!disabled ? onClick : undefined}
    className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all 
      ${variants[variant] || variants.primary} 
      ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    disabled={disabled}
  >
    {icon && iconMap[icon]}
    {children}
  </button>
);

export default ActionButton;