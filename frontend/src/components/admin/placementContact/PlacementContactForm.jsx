import { useState, useEffect } from "react";
import {
  UserRound,
  UploadCloud,
  Save,
  RotateCcw,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  createPlacementContact,
  updatePlacementContact,
} from "../../../services/placementContactService";

const PlacementContactForm = ({
  selectedContact,
  setSelectedContact,
  triggerRefresh,
}) => {

  const [isEditing, setIsEditing] = useState(false);

  const [imagePreview, setImagePreview] = useState("");

  const [formData, setFormData] = useState({
    coordinatorName: "",
    designation: "",
    department: "",
    email: "",
    phone: "",
    description: "",
    isPublished: true,
    profileImage: null,
  });

  useEffect(() => {

    if (!selectedContact) return;

    setIsEditing(true);

    setFormData({
      coordinatorName:
        selectedContact.coordinatorName || "",

      designation:
        selectedContact.designation || "",

      department:
        selectedContact.department || "",

      email:
        selectedContact.email || "",

      phone:
        selectedContact.phone || "",

      description:
        selectedContact.description || "",

      isPublished:
        selectedContact.isPublished,

      profileImage: null,
    });

    setImagePreview(
      selectedContact.profileImage?.url || ""
    );

  }, [selectedContact]);
  // ==========================
  // Handle Input Change
  // ==========================

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // ==========================
  // Handle Profile Image
  // ==========================

  const handleImage = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      profileImage: file,
    }));

    setImagePreview(
      URL.createObjectURL(file)
    );
  };

  // ==========================
  // Reset Form
  // ==========================

  const resetForm = () => {

    setFormData({
      coordinatorName: "",
      designation: "",
      department: "",
      email: "",
      phone: "",
      description: "",
      isPublished: true,
      profileImage: null,
    });

    setImagePreview("");

    setSelectedContact(null);

    setIsEditing(false);
  };

  // ==========================
  // Submit Form
  // ==========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const data = new FormData();

      data.append(
        "coordinatorName",
        formData.coordinatorName
      );

      data.append(
        "designation",
        formData.designation
      );

      data.append(
        "department",
        formData.department
      );

      data.append(
        "email",
        formData.email
      );

      data.append(
        "phone",
        formData.phone
      );

      data.append(
        "description",
        formData.description
      );

      data.append(
        "isPublished",
        formData.isPublished
      );

      if (formData.profileImage) {

        data.append(
          "profileImage",
          formData.profileImage
        );

      }

      if (isEditing) {

        await updatePlacementContact(
          selectedContact._id,
          data
        );

        toast.success(
          "Placement Contact Updated Successfully"
        );

      } else {

        await createPlacementContact(data);

        toast.success(
          "Placement Contact Added Successfully"
        );

      }

      resetForm();

      triggerRefresh();

    } catch (error) {

      toast.error(
        error.response?.data?.message ||
        "Operation Failed"
      );

    }

  };
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-6">

      {/* Heading */}

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-[#2D2A70] p-3 rounded-xl text-white">
          <UserRound size={24} />
        </div>

        <div>

          <h2 className="text-2xl font-bold text-[#2D2A70]">

            {isEditing
              ? "Update Placement Contact"
              : "Add Placement Contact"}

          </h2>

          <p className="text-gray-500 text-sm">

            {isEditing
              ? "Update placement coordinator details."
              : "Add a new placement coordinator."}

          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Coordinator Name */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Coordinator Name
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="coordinatorName"
            value={formData.coordinatorName}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />

        </div>

        {/* Designation */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Designation
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />

        </div>

        {/* Department */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Department
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />

        </div>

        {/* Email */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Email
            <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />

        </div>

        {/* Phone */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Phone
            <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />

        </div>

        {/* Description */}

        <div>

          <label className="block font-semibold text-gray-700 mb-2">
            Description
            <span className="text-red-500">*</span>
          </label>

          <textarea
            rows={5}
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />

        </div>
        {/* Profile Image */}

        <div>

          <label className="block font-semibold text-gray-700 mb-3">
            Profile Image
          </label>

          <label
            htmlFor="profileUpload"
            className="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex items-center justify-center cursor-pointer hover:border-[#2D2A70] transition overflow-hidden"
          >

            {imagePreview ? (

              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover"
              />

            ) : (

              <div className="text-center">

                <UploadCloud
                  size={42}
                  className="mx-auto text-[#2D2A70] mb-3"
                />

                <p className="font-medium">
                  Click to Upload Profile Image
                </p>

                <p className="text-sm text-gray-500">
                  PNG, JPG or JPEG
                </p>

              </div>

            )}

          </label>

          <input
            id="profileUpload"
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

        </div>

        {/* Publish */}

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-5 h-5 accent-[#2D2A70]"
          />

          <span className="font-medium text-gray-700">
            Publish Immediately
          </span>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-3">

          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white py-3 rounded-xl font-semibold transition"
          >

            <Save size={18} />

            {isEditing
              ? "Update Contact"
              : "Save Contact"}

          </button>

          <button
            type="button"
            onClick={resetForm}
            className="flex items-center justify-center gap-2 px-6 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
          >

            <RotateCcw size={18} />

            Reset

          </button>

        </div>

      </form>

    </div>
  );
};

export default PlacementContactForm;