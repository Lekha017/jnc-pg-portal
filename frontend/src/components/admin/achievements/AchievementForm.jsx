import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const AchievementForm = ({
  type = "student",
  selectedAchievement = null,
  triggerRefresh,
  onClose,
}) => {
  const API = import.meta.env.VITE_API_URL;

  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    category: "",
    date: "",
    isPublished: true,
  });

  const [images, setImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);

  /*
  ============================
  FETCH DEPARTMENTS
  ============================
  */

  useEffect(() => {
    fetchDepartments();
  }, []);

  /*
  ============================
  LOAD EDIT DATA
  ============================
  */

  useEffect(() => {
    if (selectedAchievement) {
      setFormData({
        title: selectedAchievement.title || "",

        description:
          selectedAchievement.description || "",

        department:
          selectedAchievement.department?._id ||
          selectedAchievement.department ||
          "",

        category:
          selectedAchievement.category || "",

        date: selectedAchievement.date
          ? selectedAchievement.date.substring(0, 10)
          : "",

        isPublished:
          selectedAchievement.isPublished ?? true,
      });

      setExistingImages(
        selectedAchievement.images || []
      );

      setImages([]);
    } else {
      resetForm();
    }
  }, [selectedAchievement]);

  /*
  ============================
  FETCH DEPARTMENTS
  ============================
  */

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(
        `${API}/departments`
      );

      setDepartments(response.data?.data || []);
    } catch (error) {
      console.error(
        "Error fetching departments:",
        error
      );

      toast.error("Failed to load departments.");
    }
  };

  /*
  ============================
  RESET FORM
  ============================
  */

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      department: "",
      category: "",
      date: "",
      isPublished: true,
    });

    setImages([]);
    setExistingImages([]);
  };

  /*
  ============================
  INPUT CHANGE
  ============================
  */

  const handleChange = (e) => {
    const {
      name,
      value,
      type: inputType,
      checked,
    } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        inputType === "checkbox"
          ? checked
          : value,
    }));
  };

  /*
  ============================
  IMAGE SELECT
  ============================
  */

  const handleImageChange = (e) => {
    const selectedFiles = Array.from(
      e.target.files || []
    );

    if (selectedFiles.length === 0) return;

    setImages((prev) => [
      ...prev,
      ...selectedFiles,
    ]);

    // Allows selecting the same image again
    e.target.value = "";
  };

  /*
  ============================
  REMOVE NEW IMAGE
  ============================
  */

  const removeNewImage = (index) => {
    setImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /*
  ============================
  REMOVE EXISTING IMAGE
  ============================
  */

  const removeExistingImage = (index) => {
    setExistingImages((prev) =>
      prev.filter((_, i) => i !== index)
    );
  };

  /*
  ============================
  SUBMIT
  ============================
  */

  const handleSubmit = async (e) => {
    e.preventDefault();

    /*
    ============================
    REQUIRED FIELD VALIDATION
    ============================
    */

    if (!formData.title.trim()) {
      toast.error(
        "Please enter achievement title."
      );
      return;
    }

    if (!formData.description.trim()) {
      toast.error(
        "Please enter achievement description."
      );
      return;
    }

    if (!formData.department) {
      toast.error(
        "Please select a department."
      );
      return;
    }

    if (!formData.category.trim()) {
      toast.error(
        "Please enter achievement category."
      );
      return;
    }

    /*
    ============================
    IMAGE VALIDATION
    ============================
    
    At least one image must exist.

    For CREATE:
    - images.length must be >= 1

    For EDIT:
    - either existing images or new images
      must contain at least one image.
    */

    const totalImages =
      existingImages.length + images.length;

    if (totalImages === 0) {
      toast.error(
        "Please upload at least one achievement image."
      );
      return;
    }

    try {
      setLoading(true);

      const data = new FormData();

      /*
      ============================
      BASIC DATA
      ============================
      */

      data.append(
        "title",
        formData.title.trim()
      );

      data.append(
        "description",
        formData.description.trim()
      );

      /*
      IMPORTANT:
      Type comes from the active tab
      */

      data.append("type", type);

      data.append(
        "department",
        formData.department
      );

      data.append(
        "category",
        formData.category.trim()
      );

      /*
      DATE IS OPTIONAL
      */

      if (formData.date) {
        data.append(
          "date",
          formData.date
        );
      }

      data.append(
        "isPublished",
        String(formData.isPublished)
      );

      /*
      ============================
      NEW IMAGES
      ============================
      */

      images.forEach((image) => {
        data.append("images", image);
      });

      /*
      ============================
      EXISTING IMAGES
      ============================
      */

      if (selectedAchievement) {
        data.append(
          "existingImages",
          JSON.stringify(existingImages)
        );
      }

      /*
      ============================
      CREATE
      ============================
      */

      if (!selectedAchievement) {
        await axios.post(
          `${API}/achievements`,
          data,
          {
            withCredentials: true,
          }
        );

        toast.success(
          "Achievement created successfully!"
        );
      }

      /*
      ============================
      UPDATE
      ============================
      */

      else {
        await axios.put(
          `${API}/achievements/${selectedAchievement._id}`,
          data,
          {
            withCredentials: true,
          }
        );

        toast.success(
          "Achievement updated successfully!"
        );
      }

      /*
      ============================
      SUCCESS
      ============================
      */

      if (triggerRefresh) {
        triggerRefresh();
      }

      if (onClose) {
        onClose();
      }

      resetForm();

    } catch (error) {
      console.error(
        "Achievement save error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to save achievement."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  ============================
  CLOSE FORM
  ============================
  */

  const handleCancel = () => {
    resetForm();

    if (onClose) {
      onClose();
    }
  };

  /*
  ============================
  TYPE LABEL
  ============================
  */

  const typeLabel =
    type === "faculty"
      ? "Faculty Achievement"
      : "Student Achievement";

  return (
    <div className="w-full">

      {/* ============================
          FORM HEADER
      ============================ */}

      <div className="mb-8">

        <h2 className="text-3xl font-bold text-[#2F2F6F]">
          {selectedAchievement
            ? "Edit Achievement"
            : "Add Achievement"}
        </h2>

        <p className="text-gray-500 mt-1">
          {selectedAchievement
            ? `Edit ${typeLabel.toLowerCase()}`
            : `Add a ${typeLabel.toLowerCase()}`}
        </p>

      </div>

      {/* ============================
          FORM
      ============================ */}

      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl border border-gray-200 p-6 lg:p-8"
      >

        {/* ============================
            ACHIEVEMENT TYPE
        ============================ */}

        <div className="mb-8">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Achievement Type
          </label>

          <div className="inline-flex rounded-full bg-gray-100 p-1">

            {/* STUDENT */}

            <div
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                type === "student"
                  ? "bg-[#2F2F6F] text-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Student Achievement
            </div>

            {/* FACULTY */}

            <div
              className={`px-6 py-2.5 rounded-full text-sm font-semibold transition ${
                type === "faculty"
                  ? "bg-[#2F2F6F] text-white shadow-sm"
                  : "text-gray-500"
              }`}
            >
              Faculty Achievement
            </div>

          </div>

        </div>

        {/* ============================
            TITLE
        ============================ */}

        <div className="mb-6">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Title{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="Enter achievement title"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:ring-2 focus:ring-[#2F2F6F] focus:border-[#2F2F6F]"
          />

        </div>

        {/* ============================
            DESCRIPTION
        ============================ */}

        <div className="mb-6">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={5}
            placeholder="Enter achievement description"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none resize-none transition focus:ring-2 focus:ring-[#2F2F6F] focus:border-[#2F2F6F]"
          />

        </div>

        {/* ============================
            DEPARTMENT + CATEGORY
        ============================ */}

        <div className="grid md:grid-cols-2 gap-6 mb-6">

          {/* DEPARTMENT */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Department{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-3 bg-white outline-none transition focus:ring-2 focus:ring-[#2F2F6F] focus:border-[#2F2F6F]"
            >

              <option value="">
                Select Department
              </option>

              {departments.map(
                (department) => (
                  <option
                    key={department._id}
                    value={department._id}
                  >
                    {department.name}
                  </option>
                )
              )}

            </select>

          </div>

          {/* CATEGORY */}

          <div>

            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Category{" "}
              <span className="text-red-500">
                *
              </span>
            </label>

            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              placeholder="Eg: Academic, Sports, Research"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:ring-2 focus:ring-[#2F2F6F] focus:border-[#2F2F6F]"
            />

          </div>

        </div>

        {/* ============================
            DATE
        ============================ */}

        <div className="mb-6">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Date
          </label>

          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full md:w-1/2 border border-gray-300 rounded-lg px-4 py-3 outline-none transition focus:ring-2 focus:ring-[#2F2F6F] focus:border-[#2F2F6F]"
          />

        </div>

        {/* ============================
            IMAGE GALLERY
        ============================ */}

        <div className="mb-8">

          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Achievement Images / Gallery{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <p className="text-xs text-gray-400 mb-3">
            Upload one or more images for this
            achievement.
          </p>

          {/* UPLOAD BOX */}

          <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-[#2F2F6F] hover:bg-gray-50 transition">

            <Upload
              size={32}
              className="text-gray-400 mb-3"
            />

            <span className="font-medium text-gray-600">
              Click to upload images
            </span>

            <span className="text-xs text-gray-400 mt-1">
              JPG, PNG or WEBP
            </span>

            <input
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/webp"
              onChange={handleImageChange}
              className="hidden"
            />

          </label>

          {/* ============================
              EXISTING IMAGES
          ============================ */}

          {existingImages.length > 0 && (
            <div className="mt-6">

              <p className="text-sm font-semibold text-gray-700 mb-3">
                Existing Images
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                {existingImages.map(
                  (image, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >

                      <img
                        src={
                          image?.url ||
                          image
                        }
                        alt={`Achievement ${
                          index + 1
                        }`}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingImage(
                            index
                          )
                        }
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition"
                      >
                        <X size={15} />
                      </button>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

          {/* ============================
              NEW IMAGES
          ============================ */}

          {images.length > 0 && (
            <div className="mt-6">

              <p className="text-sm font-semibold text-gray-700 mb-3">
                New Images
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">

                {images.map(
                  (image, index) => (
                    <div
                      key={index}
                      className="relative"
                    >

                      <img
                        src={URL.createObjectURL(
                          image
                        )}
                        alt={image.name}
                        className="w-full h-32 object-cover rounded-lg border border-gray-200"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeNewImage(
                            index
                          )
                        }
                        className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1.5 shadow-md transition"
                      >
                        <X size={15} />
                      </button>

                    </div>
                  )
                )}

              </div>

            </div>
          )}

        </div>

        {/* ============================
            PUBLISH
        ============================ */}

        <div className="flex items-center gap-3 mb-8">

          <input
            id="isPublished"
            type="checkbox"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-4 h-4 accent-[#2F2F6F] cursor-pointer"
          />

          <label
            htmlFor="isPublished"
            className="text-sm font-medium text-gray-700 cursor-pointer"
          >
            Publish achievement
          </label>

        </div>

        {/* ============================
            BUTTONS
        ============================ */}

        <div className="flex justify-end gap-3 border-t border-gray-200 pt-6">

          <button
            type="button"
            onClick={handleCancel}
            disabled={loading}
            className="px-6 py-3 rounded-lg border border-gray-300 text-gray-600 font-medium hover:bg-gray-50 transition disabled:opacity-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 rounded-lg bg-[#2F2F6F] hover:bg-[#252558] text-white font-semibold transition disabled:opacity-50"
          >
            {loading
              ? "Saving..."
              : selectedAchievement
              ? "Update Achievement"
              : "Create Achievement"}
          </button>

        </div>

      </form>
    </div>
  );
};

export default AchievementForm;