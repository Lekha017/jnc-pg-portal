import { useEffect, useState } from "react";
import { Upload, X } from "lucide-react";

const FacultyImageUpload = ({ image, onChange }) => {
  const [preview, setPreview] = useState("");

  useEffect(() => {
    if (!image) {
      setPreview("");
      return;
    }

    if (image instanceof File) {
      const objectUrl = URL.createObjectURL(image);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    }

    setPreview(image);
  }, [image]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    onChange(file);
  };

  const removeImage = () => {
    onChange(null);
    setPreview("");
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700">
        Faculty Photo
      </label>

      {preview ? (
        <div className="relative w-40">
          <img
            src={preview}
            alt="Faculty"
            className="w-40 h-40 rounded-lg object-cover border"
          />

          <button
            type="button"
            onClick={removeImage}
            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-40 h-40 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#4B4B7C] transition">
          <Upload size={28} className="text-gray-500 mb-2" />

          <span className="text-sm text-gray-500">
            Upload Photo
          </span>

          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
      )}

      {preview && (
        <div>
          <label className="inline-block cursor-pointer bg-[#4B4B7C] text-white px-4 py-2 rounded-md hover:bg-[#3d3d66] transition">
            Change Image

            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      )}
    </div>
  );
};

export default FacultyImageUpload;