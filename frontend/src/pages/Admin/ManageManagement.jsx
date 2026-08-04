import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import {
  getAllManagement,
  deleteManagement,
} from "../../services/managementService";

const ManageManagement = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchManagement();
  }, []);

  const fetchManagement = async () => {
    try {
      setLoading(true);

      const response = await getAllManagement();

      setMembers(response.data || []);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load management members.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      await deleteManagement(id);

      setToast({
        show: true,
        message: "Management member deleted successfully.",
        type: "success",
      });

      fetchManagement();
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to delete member.",
        type: "error",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2F2F6F]">
          Manage Management
        </h1>

        <Link
          to="/admin/management/add"
          className="bg-[#2F2F6F] text-white px-5 py-2 rounded-lg hover:bg-[#24245a]"
        >
          + Add Member
        </Link>
      </div>

      {loading ? (
        <Loader text="Loading Management..." />
      ) : members.length === 0 ? (
        <div className="bg-white rounded-xl shadow p-10 text-center text-gray-500">
          No management members found.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Designation</th>
                <th className="text-left p-4">Order</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr
                  key={member._id}
                  className="border-t border-gray-200"
                >
                  <td className="p-4">
                    <img
                      src={member.image?.url || member.image}
                      alt={member.name}
                      className="w-16 h-16 rounded-lg object-cover border"
                    />
                  </td>

                  <td className="p-4 font-medium">
                    {member.name}
                  </td>

                  <td className="p-4">
                    {member.designation}
                  </td>

                  <td className="p-4">
                    {member.order}
                  </td>

                  <td className="p-4 text-center">
                    <div className="flex justify-center gap-4">
                      <Link
                        to={`/admin/management/edit/${member._id}`}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </Link>

                      <button
                        onClick={() => handleDelete(member._id)}
                        className="text-red-600 hover:underline"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

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

export default ManageManagement;