import { useEffect, useState } from "react";
import { Save, RotateCcw, DollarSign } from "lucide-react";
import { toast } from "react-toastify";

import {
  createFee,
  updateFee,
} from "../../../services/feeService";

import { getPrograms } from "../../../services/programService";

function FeeForm({
  selectedFee,
  setSelectedFee,
  triggerRefresh,
}) {
  const [isEditing, setIsEditing] =
    useState(false);

  const [programs, setPrograms] =
    useState([]);

  const [formData, setFormData] =
    useState({
      program: "",
      year: "I Year",
      insideKarnatakaFee: "",
      outsideKarnatakaFee: "",
      isActive: true,
    });

  useEffect(() => {
    loadPrograms();
  }, []);

  useEffect(() => {
    if (!selectedFee) return;

    setIsEditing(true);

    setFormData({
      program:
        selectedFee.program?._id || "",

      year:
        selectedFee.year || "I Year",

      insideKarnatakaFee:
        selectedFee.insideKarnatakaFee || "",

      outsideKarnatakaFee:
        selectedFee.outsideKarnatakaFee || "",

      isActive:
        selectedFee.isActive,
    });
  }, [selectedFee]);

  const loadPrograms =
    async () => {
      try {
        const res =
          await getPrograms();

        if (res.success) {
          setPrograms(res.data);
        }
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
      program: "",
      year: "I Year",
      insideKarnatakaFee: "",
      outsideKarnatakaFee: "",
      isActive: true,
    });

    setSelectedFee(null);

    setIsEditing(false);
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        if (isEditing) {
          await updateFee(
            selectedFee._id,
            formData
          );

          toast.success(
            "Fee Updated Successfully"
          );
        } else {
          await createFee(
            formData
          );

          toast.success(
            "Fee Added Successfully"
          );
        }

        resetForm();

        triggerRefresh();

      } catch (error) {
        console.error(error);

        toast.error(
          error.response?.data
            ?.message ||
            "Operation Failed"
        );
      }
    };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 sticky top-6">

      {/* Header */}

      <div className="flex items-center gap-3 mb-8">

        <div className="bg-[#2D2A70] p-2 rounded-lg text-white">

          <DollarSign size={24} />

        </div>

        <div>

          <h2 className="text-xl font-bold text-[#2D2A70]">

            {isEditing
              ? "Update Fee"
              : "Add Fee"}

          </h2>

          <p className="text-sm text-gray-500">

            Manage programme fees

          </p>

        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4"
      >

        {/* Program */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">

            Program{" "}

            <span className="text-red-500">
              *
            </span>

          </label>

          <select
            name="program"
            value={
              formData.program
            }
            onChange={
              handleChange
            }
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          >

            <option value="">
              Select Program
            </option>

            {programs.map(
              (program) => (

                <option
                  key={
                    program._id
                  }
                  value={
                    program._id
                  }
                >
                  {
                    program.programName
                  }
                </option>

              )
            )}

          </select>

        </div>

        {/* Year */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">

            Academic Year{" "}

            <span className="text-red-500">
              *
            </span>

          </label>

          <select
            name="year"
            value={
              formData.year
            }
            onChange={
              handleChange
            }
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          >

            <option>
              I Year
            </option>

            <option>
              II Year
            </option>

          </select>

        </div>

        {/* Inside Karnataka */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">

            Inside Karnataka Fee{" "}

            <span className="text-red-500">
              *
            </span>

          </label>

          <input
            type="number"
            name="insideKarnatakaFee"
            value={
              formData.insideKarnatakaFee
            }
            onChange={
              handleChange
            }
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
            placeholder="Enter Fee"
          />

        </div>

        {/* Outside Karnataka */}

        <div>

          <label className="block mb-2 font-semibold text-gray-700">

            Outside Karnataka Fee{" "}

            <span className="text-red-500">
              *
            </span>

          </label>

          <input
            type="number"
            name="outsideKarnatakaFee"
            value={
              formData.outsideKarnatakaFee
            }
            onChange={
              handleChange
            }
            required
            className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
            placeholder="Enter Fee"
          />

        </div>

        {/* Active */}

        <div className="flex items-center gap-3">

          <input
            type="checkbox"
            name="isActive"
            checked={
              formData.isActive
            }
            onChange={
              handleChange
            }
            className="w-5 h-5 accent-[#2D2A70]"
          />

          <span className="font-medium">

            Active

          </span>

        </div>

        {/* Buttons */}

        <div className="flex gap-4 pt-3">

          <button
            type="submit"
            className="flex-1 flex items-center justify-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white rounded-xl py-2.5 transition"
          >

            <Save size={18} />

            {isEditing
              ? "Update Fee"
              : "Save Fee"}

          </button>

          <button
            type="button"
            onClick={resetForm}
            className="px-6 border border-gray-300 rounded-xl hover:bg-gray-100 flex items-center gap-2 transition"
          >

            <RotateCcw size={18} />

            Reset

          </button>

        </div>

      </form>

    </div>
  );
}

export default FeeForm;