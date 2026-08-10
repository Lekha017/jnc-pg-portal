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
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Father's Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("fatherName", {
              required: "Father's name is required",
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

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Mother's Name <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("motherName", {
              required: "Mother's name is required",
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
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Gender <span className="text-red-500">*</span>
          </label>

          <select
            {...register("gender", {
              required: "Please select your gender",
            })}
            className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          >
            <option value="">Select gender</option>
            <option value="Female">Female</option>
            <option value="Male">Male</option>
            <option value="Other">Other</option>
          </select>

          {errors.gender && (
            <p className="mt-1 text-sm text-red-500">
              {errors.gender.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Date of Birth <span className="text-red-500">*</span>
          </label>

          <input
            type="date"
            {...register("dob", {
              required: "Date of birth is required",
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
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Nationality <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("nationality", {
              required: "Nationality is required",
            })}
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.nationality && (
            <p className="mt-1 text-sm text-red-500">
              {errors.nationality.message}
            </p>
          )}
        </div>

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

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Aadhaar Number
          </label>

          <input
            type="text"
            maxLength={12}
            {...register("aadhaarNumber", {
              pattern: {
                value: /^\d{12}$/,
                message: "Aadhaar number must contain 12 digits",
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