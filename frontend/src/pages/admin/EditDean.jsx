import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import AdminLayout from "../../components/Layout/AdminLayout";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import {
  getDeanById,
  updateDean,
} from "../../services/deanService";

const EditDean = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    qualification: "",
    designation: "",
    order: 0,
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  useEffect(() => {
    fetchDean();
  }, []);

  const fetchDean = async () => {
    try {
      const response = await getDeanById(id);

      const dean = response.data;

      setFormData({
        name: dean.name,
        qualification: dean.qualification || "",
        designation: dean.designation,
        order: dean.order,
      });

      setPreview(dean.image || "");
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load dean.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const data = new FormData();

      data.append("name", formData.name);
      data.append("qualification", formData.qualification);
      data.append("designation", formData.designation);
      data.append("order", formData.order);

      if (image) {
        data.append("image", image);
      }

      await updateDean(id, data);

      setToast({
        show: true,
        message: "Dean updated successfully.",
        type: "success",
      });

      setTimeout(() => {
        navigate("/admin/deans");
      }, 1200);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to update dean.",
        type: "error",
      });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <AdminLayout>
        <Loader text="Loading Dean..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-8">

        <h1 className="text-3xl font-bold text-[#2F2F6F] mb-8">
          Edit Dean
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <div>
            <label className="block mb-2 font-medium">
              Name
            </label>

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
            <label className="block mb-2 font-medium">
              Qualification
            </label>

            <input
              type="text"
              name="qualification"
              value={formData.qualification}
              onChange={handleChange}
              required
              placeholder="e.g. M.Sc., B.Ed., Ph.D."
             className="w-full rounded-lg px-4 py-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#2F2F6F]"
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Designation
            </label>

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
            <label className="block mb-2 font-medium">
              Display Order
            </label>

            <input
              type="number"
              name="order"
              value={formData.order}
              onChange={handleChange}
              className="w-full rounded-lg px-4 py-3 bg-gray-100 outline-none focus:ring-2 focus:ring-[#2F2F6F]"
            />
          </div>

          {preview && (
            <img
              src={preview}
              alt="Dean"
              className="w-32 h-32 object-cover rounded-lg"
            />
          )}

          <div>
            <label className="block mb-2 font-medium">
              Change Image
            </label>

            <input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-[#2F2F6F] text-white px-6 py-3 rounded-lg hover:bg-[#25255b]"
          >
            {saving ? "Updating..." : "Update Dean"}
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

export default EditDean;