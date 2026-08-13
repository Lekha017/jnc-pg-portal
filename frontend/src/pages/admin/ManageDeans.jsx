import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import AdminLayout from "../../components/Layout/AdminLayout";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import {
  getAllDeans,
  deleteDean,
} from "../../services/deanService";

const ManageDeans = () => {
  const [deans, setDeans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchDeans();
  }, []);

  const fetchDeans = async () => {
    try {
      setLoading(true);

      const response = await getAllDeans();

      setDeans(response.data || []);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load deans.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this dean?")) {
      return;
    }

    try {
      await deleteDean(id);

      setToast({
        show: true,
        message: "Dean deleted successfully.",
        type: "success",
      });

      fetchDeans();
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to delete dean.",
        type: "error",
      });
    }
  };

  return (
    <AdminLayout>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#2F2F6F]">
          Manage Deans
        </h1>

        <Link
          to="/admin/deans/add"
          className="bg-[#2F2F6F] text-white px-5 py-2 rounded-lg hover:bg-[#24245a]"
        >
          + Add Dean
        </Link>
      </div>

      {loading ? (
        <Loader text="Loading Deans..." />
      ) : deans.length === 0 ? (
        <div className="bg-white rounded-lg p-10 text-center text-gray-500">
          No deans found.
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-4">Image</th>
                <th className="text-left p-4">Name</th>
                <th className="text-left p-4">Qualification</th>
                <th className="text-left p-4">Designation</th>
                <th className="text-left p-4">Order</th>
                <th className="text-center p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {deans.map((dean) => (
                <tr
                  key={dean._id}
                >
                  <td className="p-4">
                    {dean.image ? (
                      <img
                        src={dean.image}
                        alt={dean.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                    ) : (
                      <div className="w-16 h-16 rounded bg-white"></div>
                    )}
                  </td>

                  <td className="p-4 font-medium">
                    {dean.name}
                  </td>

                  <td className="p-4">
                    {dean.qualification}
                  </td>

                  <td className="p-4">
                    {dean.designation}
                  </td>

                  <td className="p-4">
                    {dean.order}
                  </td>

                  <td className="p-4 text-center space-x-4">
                    <Link
                      to={`/admin/deans/edit/${dean._id}`}
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleDelete(dean._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
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

export default ManageDeans;