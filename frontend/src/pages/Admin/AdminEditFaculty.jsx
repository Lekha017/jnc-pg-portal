import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import FacultyForm from "../../components/faculty/FacultyForm";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import { getDepartments } from "../../services/departmentService";
import {
  getFacultyById,
  updateFaculty,
} from "../../services/facultyService";

const AdminEditFaculty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState({});
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
    const [facultyResponse, departmentResponse] =
      await Promise.all([
        getFacultyById(id),
        getDepartments(),
      ]);

    setFaculty(facultyResponse.faculty || {});
    setDepartments(departmentResponse.data || []);
  } catch (error) {
    console.error(error);

    setToast({
      show: true,
      message: "Failed to load faculty details.",
      type: "error",
    });
  } finally {
    setPageLoading(false);
  }
};

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await updateFaculty(id, formData);

      setToast({
        show: true,
        message: "Faculty updated successfully.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/admin/faculty");
      }, 1200);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message:
          error.response?.data?.message ||
          "Unable to update faculty.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return <Loader text="Loading faculty..." />;
  }

  return (
    <>
      <section className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#4B4B7C]">
              Edit Faculty
            </h1>

            <p className="mt-2 text-gray-600">
              Update the faculty member's basic information.
            </p>
          </div>

          <FacultyForm
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

export default AdminEditFaculty;