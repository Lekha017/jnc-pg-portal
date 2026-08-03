import { useEffect, useState } from "react";
import {
  Save,
  RotateCcw,
  Bell,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  createAnnouncement,
  updateAnnouncement,
} from "../../../services/announcementService";

import { getDepartments } from "../../../services/departmentService";

function AnnouncementForm({
  selectedAnnouncement,
  setSelectedAnnouncement,
  triggerRefresh,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [departments, setDepartments] =
    useState([]);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "General",
    department: "",
    publishDate: "",
    expiryDate: "",
    important: false,
    isPublished: true,
  });

  useEffect(() => {
    loadDepartments();
  }, []);

  useEffect(() => {
    if (!selectedAnnouncement) return;

    setIsEditing(true);

    setFormData({
      title:
        selectedAnnouncement.title || "",

      description:
        selectedAnnouncement.description ||
        "",

      category:
        selectedAnnouncement.category ||
        "General",

      department:
        selectedAnnouncement.department
          ?._id || "",

      publishDate:
        selectedAnnouncement.publishDate
          ?.split("T")[0] || "",

      expiryDate:
        selectedAnnouncement.expiryDate
          ?.split("T")[0] || "",

      important:
        selectedAnnouncement.important,

      isPublished:
        selectedAnnouncement.isPublished,
    });

  }, [selectedAnnouncement]);

  const loadDepartments =
    async () => {
      try {
        const data =
          await getDepartments();

        setDepartments(data);
      } catch (error) {
        console.error(error);
      }
    };
  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      category: "General",
      department: "",
      publishDate: "",
      expiryDate: "",
      important: false,
      isPublished: true,
    });

    setSelectedAnnouncement(null);

    setIsEditing(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = { ...formData };

      if (isEditing) {
        await updateAnnouncement(
          selectedAnnouncement._id,
          data
        );

        toast.success(
          "Announcement Updated Successfully"
        );
      } else {
        await createAnnouncement(data);

        toast.success(
          "Announcement Created Successfully"
        );
      }

      resetForm();
      triggerRefresh();

    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
        "Operation Failed"
      );
    }
  };
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-4 sticky top-6">

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-[#2D2A70] p-2 rounded-lg text-white">
          <Bell size={24} />
        </div>

        <div>

          <h2 className="text-xl font-bold text-[#2D2A70]">

            {isEditing
              ? "Update Announcement"
              : "Create Announcement"}

          </h2>

          <p className="text-gray-500 text-sm">

            Manage announcement details

          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-3"
      >

        {/* Title */}

        <div>

          <label className="block mb-2 font-semibold">

            Title <span className="text-red-500">*</span>

          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-[#2D2A70]"
          />

        </div>

        {/* Description */}

        <div>

          <label className="block mb-2 font-semibold">

            Description<span className="text-red-500">*</span>

          </label>

          <textarea
            rows={3}
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-[#2D2A70]"
          />

        </div>

        {/* Category */}

        <div>

          <label className="block mb-2 font-semibold">

            Category<span className="text-red-500">*</span>

          </label>

          <select
            name="category"
            value={
              formData.category
            }
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-[#2D2A70]"
          >

            <option>
              Admission
            </option>

            <option>
              Examination
            </option>

            <option>
              Holiday
            </option>

            <option>
              Circular
            </option>

            <option>
              Scholarship
            </option>

            <option>
              General
            </option>

          </select>

        </div>
        {/* Department */}

        <div>

          <label className="block mb-2 font-semibold">
            Department<span className="text-red-500">*</span>
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-[#2D2A70]"
          >

            <option value="">
              Select Department
            </option>

            {departments.map((dept) => (
              <option
                key={dept._id}
                value={dept._id}
              >
                {dept.name}
              </option>
            ))}

          </select>

        </div>

        {/* Dates */}

        <div className="grid grid-cols-2 gap-5">

          <div>

            <label className="block mb-2 font-semibold">
              Publish Date
            </label>

            <input
              type="date"
              name="publishDate"
              value={formData.publishDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-[#2D2A70]"
            />

          </div>

          <div>

            <label className="block mb-2 font-semibold">
              Expiry Date
            </label>

            <input
              type="date"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]/20 focus:border-[#2D2A70]"
            />

          </div>

        </div>


        {/* Important */}

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="important"
            checked={formData.important}
            onChange={handleChange}
            className="w-5 h-5 accent-[#2D2A70]"
          />

          <span className="font-medium">
            Mark as Important
          </span>

        </div>

        {/* Published */}

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-5 h-5 accent-[#2D2A70]"
          />

          <span className="font-medium">
            Publish Immediately
          </span>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-4">

          <button
            type="submit"
            className="
              flex-1
              flex
              items-center
              justify-center
              gap-2
              bg-[#2D2A70]
              text-white
              py-2.5
              rounded-xl
              hover:bg-[#221f59]
            "
          >

            <Save size={18} />

            {isEditing
              ? "Update Announcement"
              : "Save Announcement"}

          </button>

          <button
            type="button"
            onClick={resetForm}
            className="
              px-6
              border
              border-gray-300
              text-gray-600
              bg-gray-50
              rounded-xl
              hover:bg-gray-100
              hover:border-gray-400
              transition
              flex
              items-center
              gap-2
            "
          >

            <RotateCcw size={18} />

            Reset

          </button>

        </div>

      </form>

    </div>
  );
}

export default AnnouncementForm;