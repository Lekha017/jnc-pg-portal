import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import AuthLayout from "../../components/layout/AuthLayout";
import Logo from "../../components/common/Logo";
import InputField from "../../components/common/InputField";
import Button from "../../components/common/Button";

import {
  sendForgotPasswordOTP,
  verifyForgotPasswordOTP,
  resetPassword,
} from "../../services/authService";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await sendForgotPasswordOTP(
        formData.email
      );

      toast.success(res.message);

      setStep(2);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to send OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await verifyForgotPasswordOTP(
        formData.email,
        formData.otp
      );

      toast.success(res.message);

      setStep(3);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Invalid OTP."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (
      formData.password !== formData.confirmPassword
    ) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const res = await resetPassword(
        formData.email,
        formData.otp,
        formData.password
      );

      toast.success(res.message);

      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to reset password."
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
        Forgot Password
      </h2>

      <p className="text-center text-gray-500 mt-2 mb-8">
        {step === 1 &&
          "Enter your registered email."}

        {step === 2 &&
          "Enter the OTP sent to your email."}

        {step === 3 &&
          "Create a new password."}
      </p>

      {step === 1 && (
        <form onSubmit={handleSendOTP}>
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />

          <Button
            type="submit"
            text={
              loading
                ? "Sending..."
                : "Send OTP"
            }
            disabled={loading}
          />
        </form>
      )}

      {step === 2 && (
        <form onSubmit={handleVerifyOTP}>
          <InputField
            label="OTP"
            name="otp"
            value={formData.otp}
            onChange={handleChange}
            placeholder="Enter 6-digit OTP"
          />

          <Button
            type="submit"
            text={
              loading
                ? "Verifying..."
                : "Verify OTP"
            }
            disabled={loading}
          />
        </form>
      )}

      {step === 3 && (
        <form onSubmit={handleResetPassword}>
          <InputField
            label="New Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
          />

          <InputField
            label="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm password"
          />

          <Button
            type="submit"
            text={
              loading
                ? "Updating..."
                : "Reset Password"
            }
            disabled={loading}
          />
        </form>
      )}
    </AuthLayout>
  );
};

export default ForgotPassword;