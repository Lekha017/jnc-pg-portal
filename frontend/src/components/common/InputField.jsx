import React from "react";

const InputField = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <div className="mb-5">
      <label className="block text-gray-800 font-semibold mb-2">
        {label}
      </label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#4B4B7C] focus:ring-2 focus:ring-[#4B4B7C]/20 transition"
      />
    </div>
  );
};

export default InputField;