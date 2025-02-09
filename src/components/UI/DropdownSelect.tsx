import React from "react";
import { DropdownSelectProps } from "../../types/commonTypes";
import { FiChevronDown } from "react-icons/fi";

const DropdownSelect: React.FC<DropdownSelectProps> = ({
  label,
  value = "",
  onChange,
  options,
  required = false,
  placeholder = "Selecione...",
  className = "",
  disabled = false,
  ...props
}) => {
  const formattedOptions = options.map((opt, index) =>
    typeof opt === "string"
      ? { label: opt, value: opt }
      : { label: opt.label, value: opt.value ?? `option-${index}` }
  );

  return (
    <div className={`flex flex-col gap-1 relative ${className}`}>
      {label && (
        <label className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}>
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          required={required}
          disabled={disabled}
          className={`border border-gray-300 bg-white rounded-md px-3 pr-10 py-2 outline-none w-full h-10 
          appearance-none text-gray-700 
          ${disabled ? "text-gray-400 cursor-not-allowed bg-gray-100" : "focus:border-blue-500"}`}
          {...props}
        >
          <option value="" disabled hidden>{placeholder}</option>
          {formattedOptions.map(({ label, value }, index) => (
            <option key={`${value}-${index}`} value={value} className="text-gray-700">
              {label}
            </option>
          ))}
        </select>
        <FiChevronDown
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600"
          size={18}
        />
      </div>
    </div>
  );
};

export default DropdownSelect;
