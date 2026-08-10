import { useFormContext } from "react-hook-form";

const Step3Academic = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

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

      {/* 10th / SSLC */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          10th / SSLC Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              School / Institution Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("tenthSchool", {
                required: "School / institution name is required",
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Board <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("tenthBoard", {
                required: "Board is required",
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Passing Year <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              {...register("tenthYear", {
                required: "Passing year is required",
                min: {
                  value: 1950,
                  message: "Enter a valid passing year",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "Enter a valid passing year",
                },
              })}
              placeholder="e.g. 2019"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.tenthYear && (
              <p className="mt-1 text-sm text-red-500">
                {errors.tenthYear.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Percentage / CGPA <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("tenthPercentage", {
                required: "Percentage / CGPA is required",
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

      {/* 12th / PUC */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          12th / PUC Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              College / Institution Name{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("twelfthCollege", {
                required: "College / institution name is required",
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Board <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("twelfthBoard", {
                required: "Board is required",
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Passing Year <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              {...register("twelfthYear", {
                required: "Passing year is required",
                min: {
                  value: 1950,
                  message: "Enter a valid passing year",
                },
                max: {
                  value: new Date().getFullYear(),
                  message: "Enter a valid passing year",
                },
              })}
              placeholder="e.g. 2021"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.twelfthYear && (
              <p className="mt-1 text-sm text-red-500">
                {errors.twelfthYear.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Percentage / CGPA <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("twelfthPercentage", {
                required: "Percentage / CGPA is required",
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

      {/* Bachelor's Degree */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800">
          Bachelor's Degree Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Degree <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("bachelorDegree", {
                required: "Degree is required",
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              University / Institution{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("bachelorUniversity", {
                required: "University / institution is required",
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

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Passing Year <span className="text-red-500">*</span>
            </label>

            <input
              type="number"
              {...register("bachelorYear", {
                required: "Passing year is required",
                min: {
                  value: 1950,
                  message: "Enter a valid passing year",
                },
                max: {
                  value: new Date().getFullYear() + 1,
                  message: "Enter a valid passing year",
                },
              })}
              placeholder="e.g. 2025"
              className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
            />

            {errors.bachelorYear && (
              <p className="mt-1 text-sm text-red-500">
                {errors.bachelorYear.message}
              </p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Percentage / CGPA <span className="text-red-500">*</span>
            </label>

            <input
              type="text"
              {...register("bachelorPercentage", {
                required: "Percentage / CGPA is required",
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