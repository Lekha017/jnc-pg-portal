import { useFormContext } from "react-hook-form";

const Step3Academic = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useFormContext();

  // =====================================================
  // ACADEMIC SCORE VALIDATION
  // Accepts:
  // 85
  // 85%
  // 8.5
  // 8.5 CGPA
  // =====================================================

  const validateAcademicScore = (value) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return "Percentage / CGPA is required";
    }

    const match = trimmedValue.match(
      /^(\d+(?:\.\d+)?)\s*(%|CGPA)?$/i
    );

    if (!match) {
      return "Enter a valid percentage or CGPA";
    }

    const score = Number(match[1]);
    const unit = match[2]?.toUpperCase();

    // Percentage
    if (unit === "%" || (!unit && score > 10)) {
      if (score < 0 || score > 100) {
        return "Percentage must be between 0 and 100";
      }

      return true;
    }

    // CGPA
    if (unit === "CGPA" || (!unit && score <= 10)) {
      if (score < 0 || score > 10) {
        return "CGPA must be between 0 and 10";
      }

      return true;
    }

    return "Enter a valid percentage or CGPA";
  };

  // =====================================================
  // BASIC YEAR VALIDATION
  // =====================================================

  const validateAcademicYear = (value) => {
    const year = Number(value);
    const currentYear = new Date().getFullYear();

    if (!value) {
      return "Passing year is required";
    }

    if (!Number.isInteger(year)) {
      return "Enter a valid passing year";
    }

    if (year < 1950 || year > currentYear) {
      return `Passing year must be between 1950 and ${currentYear}`;
    }

    return true;
  };

  // =====================================================
  // 10TH YEAR VALIDATION
  // =====================================================

  const validateTenthYear = (value) => {
    const basicValidation = validateAcademicYear(value);

    if (basicValidation !== true) {
      return basicValidation;
    }

    const tenthYear = Number(value);
    const twelfthYear = Number(getValues("twelfthYear"));
    const bachelorYear = Number(getValues("bachelorYear"));

    // If 12th year is already entered
    if (
      getValues("twelfthYear") &&
      tenthYear >= twelfthYear
    ) {
      return "10th passing year must be before 12th passing year";
    }

    // If Bachelor's year is already entered
    if (
      getValues("bachelorYear") &&
      tenthYear >= bachelorYear
    ) {
      return "10th passing year must be before Bachelor's passing year";
    }

    return true;
  };

  // =====================================================
  // 12TH YEAR VALIDATION
  // =====================================================

  const validateTwelfthYear = (value) => {
    const basicValidation = validateAcademicYear(value);

    if (basicValidation !== true) {
      return basicValidation;
    }

    const twelfthYear = Number(value);
    const tenthYear = Number(getValues("tenthYear"));
    const bachelorYear = Number(getValues("bachelorYear"));

    // 12th must be after 10th
    if (
      getValues("tenthYear") &&
      twelfthYear <= tenthYear
    ) {
      return "12th passing year must be after 10th passing year";
    }

    // 12th must be before Bachelor's
    if (
      getValues("bachelorYear") &&
      twelfthYear >= bachelorYear
    ) {
      return "12th passing year must be before Bachelor's passing year";
    }

    return true;
  };

  // =====================================================
  // BACHELOR'S YEAR VALIDATION
  // =====================================================

  const validateBachelorYear = (value) => {
    const basicValidation = validateAcademicYear(value);

    if (basicValidation !== true) {
      return basicValidation;
    }

    const bachelorYear = Number(value);
    const tenthYear = Number(getValues("tenthYear"));
    const twelfthYear = Number(getValues("twelfthYear"));

    // Bachelor's must be after 10th
    if (
      getValues("tenthYear") &&
      bachelorYear <= tenthYear
    ) {
      return "Bachelor's passing year must be after 10th passing year";
    }

    // Bachelor's must be after 12th
    if (
      getValues("twelfthYear") &&
      bachelorYear <= twelfthYear
    ) {
      return "Bachelor's passing year must be after 12th passing year";
    }

    return true;
  };

  return (
    <div className="space-y-8">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#2F2F6F]">
          Academic Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please provide details of your previous academic qualifications.
        </p>
      </div>

      {/* =====================================================
          10TH / SSLC
      ===================================================== */}

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          10th / SSLC Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* School */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              School / Institution Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("tenthSchool", {
                required: "School / institution name is required",
                validate: (value) =>
                  value.trim().length > 0 ||
                  "School / institution name is required",
              })}
              placeholder="Enter school / institution name"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.tenthSchool && (
              <p className="mt-1 text-sm text-red-500">
                {errors.tenthSchool.message}
              </p>
            )}
          </div>

          {/* Board */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Board <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("tenthBoard", {
                required: "Board is required",
                validate: (value) =>
                  value.trim().length > 0 ||
                  "Board is required",
              })}
              placeholder="e.g. CBSE, ICSE, Karnataka SSLC"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.tenthBoard && (
              <p className="mt-1 text-sm text-red-500">
                {errors.tenthBoard.message}
              </p>
            )}
          </div>

          {/* Passing Year */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Passing Year <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              {...register("tenthYear", {
                required: "Passing year is required",
                validate: validateTenthYear,
              })}
              placeholder="e.g. 2019"
              min={1950}
              max={new Date().getFullYear()}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.tenthYear && (
              <p className="mt-1 text-sm text-red-500">
                {errors.tenthYear.message}
              </p>
            )}
          </div>

          {/* Percentage / CGPA */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Percentage / CGPA{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("tenthPercentage", {
                required: "Percentage / CGPA is required",
                validate: validateAcademicScore,
              })}
              placeholder="e.g. 85% or 8.5 CGPA"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.tenthPercentage && (
              <p className="mt-1 text-sm text-red-500">
                {errors.tenthPercentage.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          12TH / PUC
      ===================================================== */}

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          12th / PUC Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* College */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              College / Institution Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("twelfthCollege", {
                required: "College / institution name is required",
                validate: (value) =>
                  value.trim().length > 0 ||
                  "College / institution name is required",
              })}
              placeholder="Enter college / institution name"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.twelfthCollege && (
              <p className="mt-1 text-sm text-red-500">
                {errors.twelfthCollege.message}
              </p>
            )}
          </div>

          {/* Board */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Board <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("twelfthBoard", {
                required: "Board is required",
                validate: (value) =>
                  value.trim().length > 0 ||
                  "Board is required",
              })}
              placeholder="e.g. PUC, CBSE, ISC"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.twelfthBoard && (
              <p className="mt-1 text-sm text-red-500">
                {errors.twelfthBoard.message}
              </p>
            )}
          </div>

          {/* Passing Year */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Passing Year <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              {...register("twelfthYear", {
                required: "Passing year is required",
                validate: validateTwelfthYear,
              })}
              placeholder="e.g. 2021"
              min={1950}
              max={new Date().getFullYear()}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.twelfthYear && (
              <p className="mt-1 text-sm text-red-500">
                {errors.twelfthYear.message}
              </p>
            )}
          </div>

          {/* Percentage / CGPA */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Percentage / CGPA{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("twelfthPercentage", {
                required: "Percentage / CGPA is required",
                validate: validateAcademicScore,
              })}
              placeholder="e.g. 82% or 8.2 CGPA"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.twelfthPercentage && (
              <p className="mt-1 text-sm text-red-500">
                {errors.twelfthPercentage.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* =====================================================
          BACHELOR'S DEGREE
      ===================================================== */}

      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Bachelor's Degree Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {/* Degree */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Degree <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("bachelorDegree", {
                required: "Degree is required",
                validate: (value) =>
                  value.trim().length > 0 ||
                  "Degree is required",
              })}
              placeholder="e.g. BCA, B.Com, B.Sc"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.bachelorDegree && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bachelorDegree.message}
              </p>
            )}
          </div>

          {/* University */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              University / Institution{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("bachelorUniversity", {
                required: "University / institution is required",
                validate: (value) =>
                  value.trim().length > 0 ||
                  "University / institution is required",
              })}
              placeholder="Enter university / institution"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.bachelorUniversity && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bachelorUniversity.message}
              </p>
            )}
          </div>

          {/* Passing Year */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Passing Year <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              {...register("bachelorYear", {
                required: "Passing year is required",
                validate: validateBachelorYear,
              })}
              placeholder="e.g. 2025"
              min={1950}
              max={new Date().getFullYear()}
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.bachelorYear && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bachelorYear.message}
              </p>
            )}
          </div>

          {/* Percentage / CGPA */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Percentage / CGPA{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("bachelorPercentage", {
                required: "Percentage / CGPA is required",
                validate: validateAcademicScore,
              })}
              placeholder="e.g. 78% or 7.8 CGPA"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.bachelorPercentage && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bachelorPercentage.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step3Academic;