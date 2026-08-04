import { useState, useEffect } from "react";
import {
  createProgram,
  updateProgram,
} from "../../../services/programService";

import { toast } from "react-toastify";

const categories = [
  "School of Humanities, Social Sciences & Media Studies",
  "School of Life Sciences",
  "School of Physical Sciences",
  "School of Commerce",
  "School of Management",
];

function ProgramForm({
  selectedProgram,
  setSelectedProgram,
  triggerRefresh,
}) {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    category: "",
    programName: "",
    shortCode: "",
    displayOrder: 1,
    isActive: true,
  });

  useEffect(() => {
    if (selectedProgram) {
      setFormData({
        category: selectedProgram.category || "",
        programName:
          selectedProgram.programName || "",
        shortCode:
          selectedProgram.shortCode || "",
        displayOrder:
          selectedProgram.displayOrder || 1,
        isActive:
          selectedProgram.isActive ?? true,
      });
    } else {
      setFormData({
        category: "",
        programName: "",
        shortCode: "",
        displayOrder: 1,
        isActive: true,
      });
    }
  }, [selectedProgram]);

  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.category ||
      !formData.programName
    ) {
      toast.error(
        "Please fill all mandatory fields"
      );
      return;
    }

    try {
      setLoading(true);

      if (selectedProgram) {
        await updateProgram(
          selectedProgram._id,
          formData
        );

        toast.success(
          "Program Updated Successfully"
        );
      } else {
        await createProgram(formData);

        toast.success(
          "Program Added Successfully"
        );
      }

      triggerRefresh();

      setSelectedProgram(null);

      setFormData({
        category: "",
        programName: "",
        shortCode: "",
        displayOrder: 1,
        isActive: true,
      });

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Operation Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

      <h2 className="text-xl font-bold text-[#2D2A70] mb-6">
        {selectedProgram
          ? "Edit Program"
          : "Add Program"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        {/* Category */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Category{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          >
            <option value="">
              Select Category
            </option>

            {categories.map((cat) => (
              <option
                key={cat}
                value={cat}
              >
                {cat}
              </option>
            ))}
          </select>
        </div>

        {/* Program Name */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Program Name{" "}
            <span className="text-red-500">
              *
            </span>
          </label>

          <input
            type="text"
            name="programName"
            value={formData.programName}
            onChange={handleChange}
            placeholder="Enter Program Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />
        </div>

        {/* Short Code */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Short Code
          </label>

          <input
            type="text"
            name="shortCode"
            value={formData.shortCode}
            onChange={handleChange}
            placeholder="Example: MCA"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />
        </div>

        {/* Display Order */}

        <div>
          <label className="block text-sm font-medium mb-2">
            Display Order
          </label>

          <input
            type="number"
            min="1"
            name="displayOrder"
            value={formData.displayOrder}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />
        </div>

        {/* Active */}

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="h-4 w-4 accent-[#2D2A70]"
          />

          <label htmlFor="isActive">
            Active Program
          </label>
        </div>

        {/* Buttons */}

        <div className="flex gap-3 pt-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-[#2D2A70] text-white px-6 py-3 rounded-xl hover:bg-[#23205b]"
          >
            {loading
              ? "Saving..."
              : selectedProgram
              ? "Update Program"
              : "Save Program"}
          </button>

          {selectedProgram && (
            <button
              type="button"
              onClick={() =>
                setSelectedProgram(null)
              }
              className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default ProgramForm;