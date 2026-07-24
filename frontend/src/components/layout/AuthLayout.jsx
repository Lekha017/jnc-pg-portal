import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#F4F6FB] flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-10">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;