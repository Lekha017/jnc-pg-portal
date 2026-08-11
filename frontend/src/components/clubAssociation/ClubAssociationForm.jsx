import { useEffect, useRef, useState } from "react";
import {
  Save,
  RotateCcw,
  UploadCloud,
  X,
  ImagePlus,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  createClubAssociation,
  updateClubAssociation,
} from "../../services/clubAssociationService";

const ClubAssociationForm = ({
  selectedClubAssociation,
  setSelectedClubAssociation,
  departments = [],
  triggerRefresh,
}) => {
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    department: "",
    isPublished: true,
  });

  const [newImages, setNewImages] = useState([]);
  const [existingImages, setExistingImages] = useState([]);
  const [removeImages, setRemoveImages] = useState([]);

  const [loading, setLoading] = useState(false);

  // =========================================================
  // EDIT MODE
  // =========================================================

  useEffect(() => {
    if (selectedClubAssociation) {
      setFormData({
        title: selectedClubAssociation.title || "",
        description:
          selectedClubAssociation.description || "",
        department:
          selectedClubAssociation.department?._id ||
          selectedClubAssociation.department ||
          "",
        isPublished:
          selectedClubAssociation.isPublished !== false,
      });

      setExistingImages(
        Array.isArray(selectedClubAssociation.images)
          ? selectedClubAssociation.images
          : []
      );

      setNewImages([]);
      setRemoveImages([]);
    } else {
      resetForm();
    }
  }, [selectedClubAssociation]);

  // =========================================================
  // RESET FORM
  // =========================================================

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      department: "",
      isPublished: true,
    });

    setExistingImages([]);
    setNewImages([]);
    setRemoveImages([]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // HANDLE INPUT
  // =========================================================

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // =========================================================
  // HANDLE IMAGE SELECTION
  // =========================================================

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files || []);

    if (files.length === 0) return;

    const imageFiles = files.filter((file) =>
      file.type.startsWith("image/")
    );

    if (imageFiles.length !== files.length) {
      toast.error("Only image files are allowed.");
    }

    const totalImages =
      existingImages.length +
      newImages.length +
      imageFiles.length;

    if (totalImages > 10) {
      toast.error("You can upload a maximum of 10 images.");

      return;
    }

    setNewImages((prev) => [
      ...prev,
      ...imageFiles,
    ]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // =========================================================
  // REMOVE NEW IMAGE
  // =========================================================

  const removeNewImage = (index) => {
    setNewImages((prev) =>
      prev.filter((_, imageIndex) => imageIndex !== index)
    );
  };

  // =========================================================
  // REMOVE EXISTING IMAGE
  // =========================================================

  const removeExistingImage = (image) => {
    if (image.publicId) {
      setRemoveImages((prev) => [
        ...prev,
        image.publicId,
      ]);
    }

    setExistingImages((prev) =>
      prev.filter(
        (existingImage) =>
          existingImage.publicId !== image.publicId
      )
    );
  };

  // =========================================================
  // SUBMIT
  // =========================================================

  const handleSubmit = async (event) => {
    event.preventDefault();

    // -------------------------------------------------------
    // VALIDATION
    // -------------------------------------------------------

    if (!formData.title.trim()) {
      toast.error("Club / Association name is required.");
      return;
    }

    if (!formData.description.trim()) {
      toast.error("Description is required.");
      return;
    }

    if (!formData.department) {
      toast.error("Please select a department.");
      return;
    }

    // At least one image required while creating
    if (
      !selectedClubAssociation &&
      newImages.length === 0
    ) {
      toast.error("Please upload at least one image.");
      return;
    }

    // While editing, don't allow all images to be removed
    if (
      selectedClubAssociation &&
      existingImages.length === 0 &&
      newImages.length === 0
    ) {
      toast.error("Please keep at least one image.");
      return;
    }

    try {
      setLoading(true);

      const data = {
        title: formData.title.trim(),
        description: formData.description.trim(),
        department: formData.department,
        isPublished: formData.isPublished,
        images: newImages,
        removeImages,
      };

      // -----------------------------------------------------
      // UPDATE
      // -----------------------------------------------------

      if (selectedClubAssociation) {
        await updateClubAssociation(
          selectedClubAssociation._id,
          data
        );

        toast.success(
          "Club / Association updated successfully."
        );
      }

      // -----------------------------------------------------
      // CREATE
      // -----------------------------------------------------

      else {
        await createClubAssociation(data);

        toast.success(
          "Club / Association created successfully."
        );
      }

      // -----------------------------------------------------
      // RESET
      // -----------------------------------------------------

      resetForm();

      setSelectedClubAssociation(null);

      if (triggerRefresh) {
        triggerRefresh();
      }
    } catch (error) {
      console.error(
        "Club / Association save error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to save club / association."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // CANCEL EDIT
  // =========================================================

  const handleCancelEdit = () => {
    resetForm();
    setSelectedClubAssociation(null);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-bold text-[#2F2F6F]">
            {selectedClubAssociation
              ? "Edit Club / Association"
              : "Add Club / Association"}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Add club information and gallery images.
          </p>
        </div>

        {selectedClubAssociation && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#2F2F6F]"
          >
            <X size={17} />
            Cancel Edit
          </button>
        )}
      </div>

      {/* =====================================================
          FORM
      ====================================================== */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* ===================================================
            CLUB NAME
        ==================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Club / Association Name
            <span className="text-red-500 ml-1">*</span>
          </label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter club or association name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#4B4B7C]/20 focus:border-[#4B4B7C]"
          />
        </div>

        {/* ===================================================
            DESCRIPTION
        ==================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Description
            <span className="text-red-500 ml-1">*</span>
          </label>

          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={5}
            placeholder="Enter a short description about the club or association..."
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-[#4B4B7C]/20 focus:border-[#4B4B7C]"
          />
        </div>

        {/* ===================================================
            DEPARTMENT
        ==================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Department
            <span className="text-red-500 ml-1">*</span>
          </label>

          <select
            name="department"
            value={formData.department}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 bg-white outline-none focus:ring-2 focus:ring-[#4B4B7C]/20 focus:border-[#4B4B7C]"
          >
            <option value="">
              Select Department
            </option>

            {departments.map((department) => (
              <option
                key={department._id}
                value={department._id}
              >
                {department.name}
                {department.code
                  ? ` (${department.code})`
                  : ""}
              </option>
            ))}
          </select>
        </div>

        {/* ===================================================
            PUBLISH STATUS
        ==================================================== */}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isPublished"
            name="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-4 h-4 accent-[#2F2F6F]"
          />

          <label
            htmlFor="isPublished"
            className="text-sm font-medium text-gray-700"
          >
            Publish this club / association
          </label>
        </div>

        {/* ===================================================
            EXISTING IMAGES
        ==================================================== */}

        {selectedClubAssociation &&
          existingImages.length > 0 && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">
                Existing Gallery Images
              </label>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {existingImages.map(
                  (image, index) => (
                    <div
                      key={
                        image.publicId || index
                      }
                      className="relative group rounded-xl overflow-hidden border border-gray-200"
                    >
                      <img
                        src={image.url}
                        alt={`Gallery ${index + 1}`}
                        className="w-full h-32 object-cover"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          removeExistingImage(
                            image
                          )
                        }
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                        title="Remove image"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

        {/* ===================================================
            IMAGE UPLOAD
        ==================================================== */}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Gallery Images
            <span className="text-red-500 ml-1">*</span>
          </label>

          <div
            onClick={() =>
              fileInputRef.current?.click()
            }
            className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center cursor-pointer hover:border-[#4B4B7C] hover:bg-gray-50 transition"
          >
            <UploadCloud
              size={36}
              className="mx-auto text-[#4B4B7C] mb-3"
            />

            <p className="font-semibold text-gray-700">
              Click to upload gallery images
            </p>

            <p className="text-sm text-gray-500 mt-1">
              You can select up to 10 images
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </div>

        {/* ===================================================
            NEW IMAGE PREVIEWS
        ==================================================== */}

        {newImages.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ImagePlus
                size={18}
                className="text-[#4B4B7C]"
              />

              <label className="text-sm font-semibold text-gray-700">
                New Gallery Images
              </label>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {newImages.map(
                (image, index) => (
                  <div
                    key={`${image.name}-${index}`}
                    className="relative group rounded-xl overflow-hidden border border-gray-200"
                  >
                    <img
                      src={URL.createObjectURL(
                        image
                      )}
                      alt={image.name}
                      className="w-full h-32 object-cover"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        removeNewImage(index)
                      }
                      className="absolute top-2 right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* ===================================================
            BUTTONS
        ==================================================== */}

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={resetForm}
            disabled={loading}
            className="flex items-center gap-2 px-5 py-3 rounded-xl border border-gray-300 text-gray-700 hover:bg-gray-50 transition disabled:opacity-50"
          >
            <RotateCcw size={17} />
            Reset
          </button>

          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#2F2F6F] text-white font-semibold hover:bg-[#252557] transition disabled:opacity-60"
          >
            <Save size={18} />

            {loading
              ? "Saving..."
              : selectedClubAssociation
              ? "Update Club / Association"
              : "Save Club / Association"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClubAssociationForm;