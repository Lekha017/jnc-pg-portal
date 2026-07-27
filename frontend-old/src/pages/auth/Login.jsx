import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import InputField from "../../components/auth/InputField";
import AuthButton from "../../components/auth/AuthButton";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      return alert("Please fill all fields.");
    }

    try {
      setLoading(true);

      const res = await loginUser(formData);

      login(res.data.token, res.data.user);

      alert("Login Successful");

      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center px-4 py-10">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl px-10 py-8">

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/logo-wide.png"
            alt="College Logo"
            className="h-20 object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-5xl font-bold text-center text-[#4B4B7C]">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 text-lg mt-2 mb-8">
          Login to continue
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <div className="mb-6">

            <label className="block text-[16px] font-semibold text-gray-700 mb-2">
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full h-12 border border-gray-300 rounded-xl px-4 pr-12 outline-none focus:ring-2 focus:ring-[#4B4B7C]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#4B4B7C]"
              >
                {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
              </button>

            </div>

          </div>

          <div className="mt-8">
            <AuthButton
              title="Login"
              loading={loading}
            />
          </div>

        </form>

        {/* Bottom Links */}
        <div className="flex justify-between items-center mt-8 text-sm">

          <Link
            to="/forgot-password"
            className="text-[#4B4B7C] hover:underline"
          >
            Forgot Password?
          </Link>

          <Link
            to="/register"
            className="font-semibold text-[#4B4B7C] hover:underline"
          >
            Create Account
          </Link>

        </div>

      </div>

    </div>
  );
};

export default Login;