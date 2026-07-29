import React from "react";

const Button = ({
  text,
  children,
  type = "button",
  onClick,
  loading = false,
  disabled = false,
  fullWidth = true,
  className = "",
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading || disabled}
      className={`
        ${fullWidth ? "w-full" : "w-auto"}
        bg-[#4B4B7C]
        hover:bg-[#3d3d69]
        text-white
        py-3
        px-5
        rounded-xl
        font-semibold
        transition
        duration-300
        disabled:opacity-60
        disabled:cursor-not-allowed
        ${className}
      `}
    >
      {loading ? "Please wait..." : children || text}
    </button>
  );
};

export default Button;