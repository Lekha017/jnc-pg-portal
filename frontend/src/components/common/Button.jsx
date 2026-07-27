import React from "react";

const Button = ({
  text,
  type = "button",
  onClick,
  loading = false,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`w-full bg-[#4B4B7C] hover:bg-[#3d3d69] text-white py-3 rounded-xl font-semibold transition duration-300 disabled:opacity-60 ${className}`}
    >
      {loading ? "Please wait..." : text}
    </button>
  );
};

export default Button;