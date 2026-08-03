import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createDepartment,
} from "../../services/departmentService";
import {
  getFacultyDropdown,
} from "../../services/facultyService";
import Toast from "../../components/common/Toast";
import AdminLayout from "../../components/layout/AdminLayout";

export default function AddDepartment() {
  const navigate = useNavigate();

  const [facultyList, setFacultyList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    about: "",
    vision: "",
    mission: "",
    hod: "",
    hodMessage: "",
    programmes: [""],
  });

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
  try {
    const res = await getFacultyDropdown();

    console.log("Response:", res);

    setFacultyList(res.data || []);
  } catch (error) {
    console.error(error);
  }
};

  const generateSlug = (value) => {
    return value
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "name") {
      setFormData((prev) => ({
        ...prev,
        name: value,
        slug: generateSlug(value),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleProgrammeChange = (index, value) => {
    const updated = [...formData.programmes];
    updated[index] = value;

    setFormData((prev) => ({
      ...prev,
      programmes: updated,
    }));
  };

  const addProgramme = () => {
    setFormData((prev) => ({
      ...prev,
      programmes: [...prev.programmes, ""],
    }));
  };

  const removeProgramme = (index) => {
    setFormData((prev) => ({
      ...prev,
      programmes: prev.programmes.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!formData.name.trim()) {
    return setToast({
      show: true,
      message: "Department name is required.",
      type: "error",
    });
  }

  setLoading(true);

  try {
    const response = await createDepartment(formData);

    setToast({
      show: true,
      message:
        response.message || "Department created successfully.",
      type: "success",
    });

    setTimeout(() => {
      navigate("/admin/departments");
    }, 1200);
  } catch (error) {
console.log(JSON.stringify(error.response?.data, null, 2));
    setToast({
      show: true,
      message:
        error.response?.data?.message ||
        "Failed to create department.",
      type: "error",
    });
  } finally {
    setLoading(false);
  }
};
   return (
  <>
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-6">
        <div className="max-w-5xl mx-auto bg-white rounded-xl shadow p-8">
          <h1 className="text-3xl font-bold text-[#2f2f6f] mb-8">
            Add Department
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Department Name *
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                About
              </label>

              <textarea
                rows="5"
                name="about"
                value={formData.about}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Vision
              </label>

              <textarea
                rows="4"
                name="vision"
                value={formData.vision}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission
              </label>

              <textarea
                rows="4"
                name="mission"
                value={formData.mission}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Head of Department *
              </label>

              <select
                name="hod"
                value={formData.hod}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
              >
                <option value="">Select HOD</option>

                {facultyList.map((faculty) => (
                  <option key={faculty._id} value={faculty._id}>
                    {faculty.fullName} ({faculty.designation})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                HOD Message
              </label>

              <textarea
                rows="5"
                name="hodMessage"
                value={formData.hodMessage}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Programmes Offered
              </label>

              {formData.programmes.map((programme, index) => (
                <div key={index} className="flex gap-3 mb-3">
                  <input
                    type="text"
                    value={programme}
                    onChange={(e) =>
                      handleProgrammeChange(index, e.target.value)
                    }
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
                    placeholder="Programme Name"
                  />

                  {formData.programmes.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeProgramme(index)}
                      className="bg-red-500 hover:bg-red-600 text-white px-4 rounded-lg"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}

              <button
                type="button"
                onClick={addProgramme}
                className="bg-[#2f2f6f] hover:bg-[#24245d] text-white px-5 py-2 rounded-lg"
              >
                + Add Programme
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="bg-[#2f2f6f] hover:bg-[#25245d] disabled:opacity-60 text-white px-8 py-3 rounded-lg"
            >
              {loading ? "Saving..." : "Save Department"}
            </button>

          </form>
        </div>
      </div>
    </AdminLayout>

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
  </>
);
}