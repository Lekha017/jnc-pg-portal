import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  required = false,
  disabled = false,
  readOnly = false,
  className = "",
}) => {
  return (
    <div className="mb-5">
      {label && (
        <label className="block text-gray-800 font-semibold mb-2">
          {label}
          {required && (
            <span className="text-red-500 ml-1">*</span>
          )}
        </label>
      )}

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        className={`w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#4B4B7C] focus:ring-2 focus:ring-[#4B4B7C]/20 transition disabled:bg-gray-100 disabled:cursor-not-allowed ${className}`}
      />
    </div>
  );
};

export default InputField;