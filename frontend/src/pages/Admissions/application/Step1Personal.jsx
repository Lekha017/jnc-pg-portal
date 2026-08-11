import { useFormContext } from "react-hook-form";

const Step1Personal = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#2F2F6F]">
          Personal Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please provide your basic personal information.
        </p>
      </div>

      {/* Applicant Name */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Applicant Name <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          {...register("applicantName", {
            required: "Applicant name is required",
            validate: (value) =>
              value.trim().length > 0 ||
              "Applicant name is required",
            pattern: {
              value: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/,
              message:
                "Applicant name can contain only letters and spaces",
            },
          })}
          placeholder="Enter your full name"
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
        />

        {errors.applicantName && (
          <p className="mt-1 text-sm text-red-500">
            {errors.applicantName.message}
          </p>
        )}
      </div>

      {/* Father and Mother Name */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Father's Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Father's Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("fatherName", {
              required: "Father's name is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "Father's name is required",
              pattern: {
                value: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/,
                message:
                  "Father's name can contain only letters and spaces",
              },
            })}
            placeholder="Enter father's name"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.fatherName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.fatherName.message}
            </p>
          )}
        </div>

        {/* Mother's Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Mother's Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("motherName", {
              required: "Mother's name is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "Mother's name is required",
              pattern: {
                value: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/,
                message:
                  "Mother's name can contain only letters and spaces",
              },
            })}
            placeholder="Enter mother's name"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.motherName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.motherName.message}
            </p>
          )}
        </div>
      </div>

      {/* Gender and Date of Birth */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Gender */}
      <div>
  <label className="mb-2 block text-sm font-medium text-gray-700">
    Gender <span className="text-red-500">*</span>
  </label>

  <input
    type="text"
    defaultValue="Female"
    readOnly
    {...register("gender", {
      required: "Gender is required",
    })}
    className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
  />

  {errors.gender && (
    <p className="mt-1 text-sm text-red-500">
      {errors.gender.message}
    </p>
  )}
</div>

        {/* Date of Birth */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            {...register("dob", {
              required: "Date of birth is required",
              validate: (value) => {
                if (!value) {
                  return "Date of birth is required";
                }

                const selectedDate = new Date(`${value}T00:00:00`);
                const today = new Date();

                today.setHours(0, 0, 0, 0);

                return (
                  selectedDate <= today ||
                  "Date of birth cannot be in the future"
                );
              },
            })}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.dob && (
            <p className="mt-1 text-sm text-red-500">
              {errors.dob.message}
            </p>
          )}
        </div>
      </div>

      {/* Nationality and Category */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Nationality */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nationality <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("nationality", {
              required: "Nationality is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "Nationality is required",
              pattern: {
                value: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/,
                message:
                  "Nationality can contain only letters and spaces",
              },
            })}
            placeholder="Enter your nationality"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.nationality && (
            <p className="mt-1 text-sm text-red-500">
              {errors.nationality.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Category <span className="text-red-500">*</span>
          </label>

          <select
            {...register("category", {
              required: "Please select your category",
            })}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          >
            <option value="">Select category</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>

          {errors.category && (
            <p className="mt-1 text-sm text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>
      </div>

      {/* Blood Group and Aadhaar */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Blood Group */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Blood Group
          </label>

          <select
            {...register("bloodGroup")}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          >
            <option value="">Select blood group</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
        </div>

        {/* Aadhaar */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Aadhaar Number
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={12}
            {...register("aadhaarNumber", {
              pattern: {
                value: /^\d{12}$/,
                message:
                  "Aadhaar number must contain exactly 12 digits",
              },
            })}
            placeholder="Enter 12-digit Aadhaar number"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.aadhaarNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.aadhaarNumber.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step1Personal;