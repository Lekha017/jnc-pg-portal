import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import FacultyFilters from "../../components/faculty/FacultyFilters";
import AdminFacultyCard from "../../components/faculty/AdminFacultyCard";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";
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
  const [designation, setDesignation] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const limit = 4;

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchFaculty();
  }, [currentPage, search, department, designation]);

  const fetchDepartments = async () => {
  try {
    const response = await getDepartments();
    setDepartments(response.data || []);
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
        designation,
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

  const handleDeleteClick = (faculty) => {
    setSelectedFaculty(faculty);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteFaculty(selectedFaculty._id);

setToast({
  show: true,
  message: "Faculty deleted successfully.",
  type: "success",
});

setShowDeleteModal(false);
setSelectedFaculty(null);

if (faculty.length === 1 && currentPage > 1) {
  setCurrentPage((prev) => prev - 1);
} else {
  fetchFaculty();
}
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to delete faculty.",
        type: "error",
      });

      setShowDeleteModal(false);
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

  const handleDesignation = (value) => {
    setDesignation(value);
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
          designation={designation}
          onDesignation={handleDesignation}
          departments={departments}
        />

        {loading ? (
          <Loader text="Loading faculty..." />
        ) : (
          <>
            {faculty.length > 0 ? (
             <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {faculty.map((member) => (
                  <AdminFacultyCard
                    key={member._id}
                    faculty={member}
                    onDelete={() => handleDeleteClick(member)}
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

<Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
          </>
        )}
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Faculty"
        message={`Are you sure you want to delete "${
          selectedFaculty?.fullName || ""
        }"?`}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedFaculty(null);
        }}
      />

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