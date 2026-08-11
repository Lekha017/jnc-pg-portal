import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { getPrograms } from "../../../services/programService";

const Step4Programme = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const selectedProgramId = watch("programId");

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        const res = await getPrograms();

        const activePrograms = (res.data || []).filter(
          (program) => program.isActive
        );

        setPrograms(activePrograms);
      } catch (error) {
        console.error("Failed to load programs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadPrograms();
  }, []);

  const groupedPrograms = programs.reduce((groups, program) => {
    const category = program.category || "Other";

    if (!groups[category]) {
      groups[category] = [];
    }

    groups[category].push(program);

    return groups;
  }, {});

  const handleProgrammeChange = (event) => {
    const programId = event.target.value;

    const selectedProgram = programs.find(
      (program) => program._id === programId
    );

    setValue("programId", programId, {
      shouldValidate: true,
      shouldDirty: true,
    });

    setValue(
      "programName",
      selectedProgram?.programName || "",
      {
        shouldValidate: false,
        shouldDirty: true,
      }
    );
  };

  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#2F2F6F]">
          Programme Selection
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Select the postgraduate programme you wish to apply for.
        </p>
      </div>

      {/* Programme */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Programme <span className="text-red-500">*</span>
        </label>

        {loading ? (
          <div className="rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-500">
            Loading programmes...
          </div>
        ) : programs.length === 0 ? (
          <div className="rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-500">
            No active programmes are currently available.
          </div>
        ) : (
          <select
            {...register("programId", {
              required: "Please select a programme",
              onChange: handleProgrammeChange,
            })}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          >
            <option value="">Select Programme</option>

            {Object.entries(groupedPrograms).map(
              ([category, categoryPrograms]) => (
                <optgroup
                  key={category}
                  label={category}
                >
                  {categoryPrograms
                    .sort(
                      (a, b) =>
                        (a.displayOrder || 1) -
                        (b.displayOrder || 1)
                    )
                    .map((program) => (
                      <option
                        key={program._id}
                        value={program._id}
                      >
                        {program.programName}
                        {program.shortCode
                          ? ` (${program.shortCode})`
                          : ""}
                      </option>
                    ))}
                </optgroup>
              )
            )}
          </select>
        )}

        {errors.programId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.programId.message}
          </p>
        )}
      </div>

      {/* Information */}
      <div className="rounded-lg border border-gray-200 bg-[#F8F9FC] p-5">
        <p className="text-sm text-gray-600">
          Please make sure you select the correct programme before
          proceeding. Your selected programme will be associated with
          this admission application.
        </p>
      </div>
    </div>
  );
};

export default Step4Programme;