import { useState, useEffect } from "react";
import {
  Building2,
  UploadCloud,
  Save,
  RotateCcw,
} from "lucide-react";

import { toast } from "react-toastify";

import {
  createRecruiter,
  updateRecruiter,
} from "../../services/recruiterService";

const RecruiterForm = ({
  selectedRecruiter,
  setSelectedRecruiter,
  refresh,
}) => {
  const [logoPreview, setLogoPreview] =
    useState("");

  const [formData, setFormData] = useState({
    logo: null,
    isPublished: true,
  });

  useEffect(() => {
    if (selectedRecruiter) {
      setFormData({
        logo: null,
        isPublished:
          selectedRecruiter.isPublished,
      });

      setLogoPreview(
        selectedRecruiter.logo?.url || ""
      );
    }
  }, [selectedRecruiter]);

  const handleLogo = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      logo: file,
    }));

    setLogoPreview(
      URL.createObjectURL(file)
    );
  };

  const resetForm = () => {
    setFormData({
      logo: null,
      isPublished: true,
    });

    setLogoPreview("");

    setSelectedRecruiter(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      Object.keys(formData).forEach(
        (key) => {
          if (formData[key] !== null) {
            data.append(
              key,
              formData[key]
            );
          }
        }
      );

      if (selectedRecruiter) {
        await updateRecruiter(
          selectedRecruiter._id,
          data
        );

        toast.success(
          "Recruiter Updated Successfully"
        );
      } else {
        await createRecruiter(data);

        toast.success(
          "Recruiter Added Successfully"
        );
      }

      refresh();

      resetForm();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-[#2D2A70] p-3 rounded-xl text-white">
          <Building2 size={24} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-[#2D2A70]">
            {selectedRecruiter
              ? "Update Recruiter"
              : "Add Recruiter"}
          </h2>

          <p className="text-gray-500 text-sm">
            Upload recruiter company logo
          </p>
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Logo Upload */}

        <div>

          <label className="block font-semibold text-gray-700 mb-3">
            Company Logo
          </label>

          <label
            htmlFor="logoUpload"
            className="border-2 border-dashed border-gray-300 rounded-2xl h-56 flex flex-col items-center justify-center cursor-pointer hover:border-[#2D2A70] transition"
          >
            {logoPreview ? (
              <img
                src={logoPreview}
                alt="Preview"
                className="w-full h-full object-contain rounded-2xl p-4"
              />
            ) : (
              <>
                <UploadCloud
                  size={40}
                  className="text-[#2D2A70] mb-3"
                />

                <p className="font-medium text-gray-700">
                  Click to Upload
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  PNG, JPG, JPEG
                </p>
              </>
            )}
          </label>

          <input
            id="logoUpload"
            type="file"
            accept="image/*"
            onChange={handleLogo}
            className="hidden"
          />

        </div>

        {/* Publish */}

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            checked={
              formData.isPublished
            }
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                isPublished:
                  e.target.checked,
              }))
            }
            className="w-5 h-5 accent-[#2D2A70]"
          />

          <span className="font-medium text-gray-700">
            Publish Immediately
          </span>

        </div>

        {/* Buttons */}

        <div className="flex gap-4">

          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white py-3 rounded-xl font-semibold transition"
          >
            <Save size={18} />

            {selectedRecruiter
              ? "Update"
              : "Save"}
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

export default RecruiterForm;