import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";
import ConfirmModal from "../../components/common/ConfirmModal";
import Toast from "../../components/common/Toast";
import Pagination from "../../components/common/Pagination";
import {
  getDepartments,
  deleteDepartment,
} from "../../services/departmentService";

export default function ManageDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 5;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchDepartments();
  }, [currentPage]);

  const fetchDepartments = async () => {
    try {
      setLoading(true);

      const response = await getDepartments({
        page: currentPage,
        limit,
      });

      setDepartments(response.data || []);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (department) => {
    setSelectedDepartment(department);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    try {
      await deleteDepartment(selectedDepartment._id);

      setToast({
        show: true,
        message: "Department deleted successfully.",
        type: "success",
      });

      setShowDeleteModal(false);
      setSelectedDepartment(null);

      if (departments.length === 1 && currentPage > 1) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchDepartments();
      }
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to delete department.",
        type: "error",
      });

      setShowDeleteModal(false);
    }
  };

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f5f7ff] p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-[#2f2f6f]">
                Manage Departments
              </h1>

              <p className="text-gray-500 mt-1">
                View, add, edit and manage departments.
              </p>
            </div>

            <Link
              to="/admin/departments/add"
              className="bg-[#2f2f6f] hover:bg-[#25245d] text-white px-5 py-2 rounded-lg"
            >
              + Add Department
            </Link>
          </div>

          <div className="bg-white rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#2f2f6f] text-white">
                <tr>
                  <th className="text-left px-6 py-4">Department</th>
                  <th className="text-left px-6 py-4">HOD</th>
                  <th className="text-left px-6 py-4">Programmes</th>
                  <th className="text-center px-6 py-4">Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                ) : departments.length === 0 ? (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center py-10 text-gray-500"
                    >
                      No departments found.
                    </td>
                  </tr>
                ) : (
                  departments.map((department) => (
                    <tr
                      key={department._id}
                      className="hover:bg-gray-50"
                    >
                      <td className="px-6 py-4 font-medium">
                        {department.name}
                      </td>

                      <td className="px-6 py-4">
                        {department.hod?.fullName || "-"}
                      </td>

                      <td className="px-6 py-4">
                        {department.programmes?.length || 0}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-center gap-3">
                          <Link
                            to={`/admin/departments/edit/${department._id}`}
                            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                          >
                            Edit
                          </Link>

                          <button
                            onClick={() => handleDeleteClick(department)}
                            className="px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Department"
        message={`Are you sure you want to delete "${
          selectedDepartment?.name || ""
        }"?`}
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setSelectedDepartment(null);
        }}
      />

      {toast.show && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast((prev) => ({
              ...prev,
              show: false,
            }))
          }
        />
      )}
    </AdminLayout>
  );
}