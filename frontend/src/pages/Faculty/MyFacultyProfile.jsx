import { useEffect, useState } from "react";

import Navbar from "../../components/layout/Navbar";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import FacultyProfileForm from "../../components/faculty/profile/FacultyProfileForm";

import { getDepartments } from "../../services/departmentService";

import {
  getMyFacultyProfile,
  updateMyFacultyProfile,
} from "../../services/facultyService";

const MyFacultyProfile = () => {
  const [faculty, setFaculty] = useState(null);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [departmentData, facultyResponse] =
        await Promise.all([
          getDepartments(),
          getMyFacultyProfile(),
        ]);

      setDepartments(departmentData);
      setFaculty(facultyResponse.data.data);
    } catch (error) {
      console.error("Error loading profile:", error);

      setToast({
        show: true,
        message: "Failed to load your profile.",
        type: "error",
      });
    } finally {
      setPageLoading(false);
    }
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await updateMyFacultyProfile(formData);

      setToast({
        show: true,
        message: "Profile updated successfully.",
        type: "success",
      });

      // Refresh profile after successful update
      fetchData();
    } catch (error) {
      console.error("Error updating profile:", error);

      setToast({
        show: true,
        message:
          error.response?.data?.message ||
          "Unable to update profile.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <>
        <Navbar />
        <Loader text="Loading your profile..." />
      </>
    );
  }

  return (
    <>
      <Navbar />

      <section className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-6xl mx-auto px-6">

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#4B4B7C]">
              My Profile
            </h1>

            <p className="mt-2 text-gray-600">
              Keep your academic profile up to date by
              managing your personal information,
              qualifications, publications, research,
              awards and memberships.
            </p>
          </div>

          <FacultyProfileForm
            initialData={faculty}
            departments={departments}
            onSubmit={handleSubmit}
            loading={loading}
          />

        </div>
      </section>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    </>
  );
};

export default MyFacultyProfile;