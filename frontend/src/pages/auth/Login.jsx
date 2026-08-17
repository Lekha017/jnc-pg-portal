import { useState } from "react";
import {
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../components/layout/AuthLayout";
import Logo from "../../components/common/Logo";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

import { loginUser } from "../../services/authService";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [loading, setLoading] = useState(false);

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
      toast.error("Please fill all fields");
      return;
    }

    try {
      setLoading(true);

      // Backend sets JWT HTTP-only cookie
      const response = await loginUser(formData);

      // Refresh AuthContext user
      await login();

      toast.success(
        response.message || "Login Successful"
      );

      // Redirect to originally requested page
      const redirectTo =
        location.state?.from || "/";

      navigate(redirectTo, {
        replace: true,
      });
    } catch (error) {
      console.error("Login Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Invalid email or password"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex justify-center mb-6 scale-110">
        <Logo />
      </div>

      <h2 className="text-3xl font-bold text-center text-[#4B4B7C]">
        Welcome Back
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Login to continue
      </p>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
        />

        <div className="flex justify-end mb-5">
          <Link
            to="/forgot-password"
            className="text-sm text-[#4B4B7C] hover:underline font-medium"
          >
            Forgot Password?
          </Link>
        </div>

        <Button
          type="submit"
          text={loading ? "Logging In..." : "Login"}
          disabled={loading}
        />
      </form>

      <p className="text-center mt-8 text-gray-600">
        Don't have an account?{" "}
        <Link
          to="/register"
          className="text-[#4B4B7C] font-semibold hover:underline"
        >
          Register
        </Link>
      </p>
    </AuthLayout>
  );
};

export default Login;