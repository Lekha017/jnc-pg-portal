import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import FacultyForm from "../../components/faculty/FacultyForm";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";
import AdminLayout from "../../components/layout/AdminLayout";

import { getAllDepartments } from "../../services/departmentService";
import { createFaculty } from "../../services/facultyService";

const AddFaculty = () => {
  const navigate = useNavigate();

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

const fetchDepartments = async () => {
  try {
    const data = await getAllDepartments();
    setDepartments(data);
  } catch (error) {
    console.error(error);

    setToast({
      show: true,
      message: "Failed to load departments.",
      type: "error",
    });
  } finally {
    setPageLoading(false);
  }
};

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);

      await createFaculty(formData);

      setToast({
        show: true,
        message: "Faculty added successfully.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/admin/faculty");
      }, 1200);
    } catch (error) {
      console.error("Error adding faculty:", error);

      setToast({
        show: true,
        message:
          error.response?.data?.message ||
          "Unable to add faculty.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

if (pageLoading) {
  return <Loader text="Loading departments..." />;
}

 return (
  <>
    <AdminLayout>
      <section className="min-h-screen bg-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#4B4B7C]">
              Add Faculty
            </h1>

            <p className="mt-2 text-gray-600">
              Create a faculty account by entering the basic
              details. The faculty member can complete their
              profile after logging in.
            </p>
          </div>

          <FacultyForm
            initialData={{}}
            departments={departments}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      </section>
    </AdminLayout>

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

export default AddFaculty;