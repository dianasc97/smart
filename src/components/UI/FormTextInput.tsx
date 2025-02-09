import React from "react";
import { FormTextInputProps } from "../../types/commonTypes";

const FormTextInput: React.FC<FormTextInputProps> = ({
  label,
  type = "text",
  value = "",
  onChange,
  placeholder,
  className = "",
  required = false,
  disabled = false,
  ...props
}) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    {label && (
      <label className={`text-sm font-medium ${disabled ? "text-gray-400" : "text-gray-700"}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    )}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      className={`border border-gray-500 rounded-md px-3 py-1.5 outline-none w-full h-9
        ${disabled ? "text-gray-400 bg-gray-100 cursor-not-allowed" : "focus:border-blue-500"}`}
      {...props}
    />
  </div>
);

export default FormTextInput;
