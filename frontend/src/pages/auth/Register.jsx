import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../components/layout/AuthLayout";
import Logo from "../../components/common/Logo";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

import { getDepartments } from "../../services/departmentService";
import { registerUser } from "../../services/authService";

const Register = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    department: "",
    password: "",
    confirmPassword: "",
  });

  // Fetch Departments
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
       const response = await getDepartments({
  page: 1,
  limit: 1000,
});

setDepartments(response.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load departments");
      }
    };

    fetchDepartments();
  }, []);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle Register
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
      toast.error("Please fill all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const { confirmPassword, ...userData } = formData;

      const response = await registerUser(userData);

      toast.success(response.message || "Registration Successful");

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        department: "",
        password: "",
        confirmPassword: "",
      });

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="flex justify-center mb-5">
        <Logo />
      </div>

      <h2 className="text-4xl font-bold text-center text-[#4B4B7C]">
        Create an Account
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-8">
        Register to access the PG Portal
      </p>

      <form onSubmit={handleSubmit}>
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter your full name"
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="10-digit phone number"
        />

        <div className="mb-5">
          <label className="block font-semibold mb-2">
            Department
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:border-[#4B4B7C] focus:ring-2 focus:ring-[#4B4B7C]/20 outline-none"
          >
            <option value="">Select Department</option>

            {departments.map((dept) => (
              <option key={dept._id} value={dept._id}>
                {dept.name}
              </option>
            ))}
          </select>
        </div>

        <InputField
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter password"
        />

        <InputField
          label="Confirm Password"
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Re-enter password"
        />

        <Button
          type="submit"
          text={loading ? "Creating Account..." : "Sign Up"}
          disabled={loading}
          className="mt-2"
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
    </AuthLayout>
  );
};

export default Register;