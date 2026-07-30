import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import FacultyFilters from "../../components/faculty/FacultyFilters";
import AdminFacultyCard from "../../components/faculty/AdminFacultyCard";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import {
  getAllFaculty,
  deleteFaculty,
} from "../../services/facultyService";
import { getDepartments } from "../../services/departmentService";

const ManageFaculty = () => {
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const limit = 8;

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchFaculty();
  }, [currentPage, search, department]);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load departments.",
        type: "error",
      });
    }
  };

  const fetchFaculty = async () => {
    try {
      setLoading(true);

      const response = await getAllFaculty({
        page: currentPage,
        limit,
        search,
        department,
      });

      setFaculty(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load faculty.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this faculty member?"
    );

    if (!confirmed) return;

    try {
      await deleteFaculty(id);

      setToast({
        show: true,
        message: "Faculty deleted successfully.",
        type: "success",
      });

      fetchFaculty();
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to delete faculty.",
        type: "error",
      });
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDepartment = (value) => {
    setDepartment(value);
    setCurrentPage(1);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-[#2F2F6F]">
              Faculty Management
            </h1>

            <p className="text-gray-500 mt-1">
              Manage all faculty members.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/faculty/add")}
            className="bg-[#2F2F6F] hover:bg-[#24245a] text-white px-6 py-3 rounded-lg transition"
          >
            + Add Faculty
          </button>
        </div>

        <FacultyFilters
          search={search}
          onSearch={handleSearch}
          department={department}
          onDepartment={handleDepartment}
          departments={departments}
        />

        {loading ? (
          <Loader text="Loading faculty..." />
        ) : (
          <>
            {faculty.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                {faculty.map((member) => (
                  <AdminFacultyCard
                    key={member._id}
                    faculty={member}
                    onDelete={handleDelete}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl p-10 text-center border">
                <h2 className="text-xl font-semibold text-gray-700">
                  No Faculty Found
                </h2>

                <p className="text-gray-500 mt-2">
                  No faculty members match your filters.
                </p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-3 mt-10">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Previous
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(index + 1)}
                      className={`px-4 py-2 rounded-md ${
                        currentPage === index + 1
                          ? "bg-[#2F2F6F] text-white"
                          : "border"
                      }`}
                    >
                      {index + 1}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      Math.min(prev + 1, totalPages)
                    )
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

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
    </AdminLayout>
  );
};

export default ManageFaculty;