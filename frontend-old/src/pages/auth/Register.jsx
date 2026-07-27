import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import InputField from "../../components/auth/InputField";
import AuthButton from "../../components/auth/AuthButton";
import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.department ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      return alert("Please fill all fields.");
    }

    if (formData.password !== formData.confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        department: formData.department,
        password: formData.password,
      };

      const res = await registerUser(payload);

      alert(res.data.message);

      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f6fb] flex items-center justify-center px-4">

      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-10">

        {/* Logo */}

        <div className="flex justify-center mb-8">

          <img
            src="/assets/logo-wide.png"
            alt="JNC Logo"
            className="h-20 object-contain"
          />

        </div>

        <h1 className="text-4xl font-bold text-center text-[#4B4B7C]">
          Create Account
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Jyoti Nivas College PG Portal
        </p>

        <form onSubmit={handleSubmit}>

          <InputField
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter full name"
          />

          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
          />

          <InputField
            label="Phone Number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="10-digit mobile number"
          />

          <InputField
            label="Department"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="MCA / MBA / M.Com"
          />

          {/* Password */}

          <div className="mb-5">

            <label className="block mb-2 font-semibold text-gray-700">
              Password
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Minimum 6 characters"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4B4B7C]"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-4 text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          {/* Confirm Password */}

          <div className="mb-8">

            <label className="block mb-2 font-semibold text-gray-700">
              Confirm Password
              <span className="text-red-500 ml-1">*</span>
            </label>

            <div className="relative">

              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 outline-none focus:ring-2 focus:ring-[#4B4B7C]"
              />

              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-4 top-4 text-gray-500"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>

            </div>

          </div>

          <AuthButton
            title="Create Account"
            loading={loading}
          />

        </form>

        <p className="text-center mt-8 text-gray-600">

          Already have an account?{" "}

          <Link
            to="/login"
            className="text-[#4B4B7C] font-semibold hover:underline"
          >
            Login
          </Link>

        </p>

      </div>

    </div>
  );
};

export default Register;