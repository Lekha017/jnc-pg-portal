import React from "react";

const Loader = ({
  text = "Loading...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-[#4B4B7C] border-t-transparent rounded-full animate-spin"></div>

      <p className="mt-4 text-gray-600 font-medium">
        {text}
      </p>
    </div>
  );
};

export default Loader;