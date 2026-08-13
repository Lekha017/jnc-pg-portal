import { useState } from "react";
import { useNavigate } from "react-router-dom";

import AdminLayout from "../../components/layout/AdminLayout";
import Toast from "../../components/common/Toast";

import { addManagement } from "../../services/managementService";

const AddManagement = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    order: 0,
  });

  const [image, setImage] = useState(null);

  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("designation", formData.designation);
      data.append("order", formData.order);

      if (image) {
        data.append("image", image);
      }

      await addManagement(data);

      setToast({
        show: true,
        message: "Management member added successfully.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/admin/management");
      }, 1200);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to add management member.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">
        <h1 className="text-3xl font-bold text-[#2F2F6F] mb-8">
          Add Management Member
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block mb-2 font-medium">Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#2F2F6F]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Designation</label>

            <input
              type="text"
              name="designation"
              value={formData.designation}
              onChange={handleChange}
              required
              className="w-full rounded-lg px-4 py-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#2F2F6F]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Display Order</label>

            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
             className="w-full rounded-lg px-4 py-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#2F2F6F]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">Image</label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              className="w-full"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-[#2F2F6F] text-white px-6 py-3 rounded-lg hover:bg-[#25255b] transition disabled:opacity-60"
          >
            {loading ? "Adding..." : "Add Member"}
          </button>
        </form>
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

export default AddManagement;