import { useFormContext } from "react-hook-form";

const Step2Address = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#2F2F6F]">
          Address Details
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please provide your current residential and contact details.
        </p>
      </div>

      {/* Address Line 1 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Address Line 1 <span className="text-red-500">*</span>
        </label>

        <input
          type="text"
          {...register("addressLine1", {
            required: "Address is required",
            validate: (value) =>
              value.trim().length > 0 ||
              "Address is required",
          })}
          placeholder="Enter your house number, street, locality"
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
        />

        {errors.addressLine1 && (
          <p className="mt-1 text-sm text-red-500">
            {errors.addressLine1.message}
          </p>
        )}
      </div>

      {/* Address Line 2 */}
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Address Line 2
        </label>

        <input
          type="text"
          {...register("addressLine2")}
          placeholder="Apartment, landmark, area, etc. (optional)"
          className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
        />
      </div>

      {/* City and State */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            City <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("city", {
              required: "City is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "City is required",
              pattern: {
                value: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/,
                message:
                  "City can contain only letters and spaces",
              },
            })}
            placeholder="Enter your city"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.city && (
            <p className="mt-1 text-sm text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* State */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            State <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            {...register("state", {
              required: "State is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "State is required",
              pattern: {
                value: /^[A-Za-z]+(?:[ .'-][A-Za-z]+)*$/,
                message:
                  "State can contain only letters and spaces",
              },
            })}
            placeholder="Enter your state"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.state && (
            <p className="mt-1 text-sm text-red-500">
              {errors.state.message}
            </p>
          )}
        </div>
      </div>

      {/* Pincode and Country */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Pincode */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Pincode <span className="text-red-500">*</span>
          </label>

          <input
            type="text"
            inputMode="numeric"
            maxLength={6}
            {...register("pincode", {
              required: "Pincode is required",
              pattern: {
                value: /^\d{6}$/,
                message: "Pincode must contain exactly 6 digits",
              },
            })}
            placeholder="Enter 6-digit pincode"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.pincode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.pincode.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Country
          </label>

          <input
            type="text"
            value="India"
            readOnly
            {...register("country")}
            className="w-full rounded-md border border-gray-300 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none"
          />
        </div>
      </div>

      {/* Mobile and Email */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {/* Mobile */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Mobile Number <span className="text-red-500">*</span>
          </label>

          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            {...register("mobileNumber", {
              required: "Mobile number is required",
              pattern: {
                value: /^[6-9]\d{9}$/,
                message:
                  "Enter a valid 10-digit mobile number",
              },
            })}
            placeholder="Enter mobile number"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.mobileNumber && (
            <p className="mt-1 text-sm text-red-500">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Email Address <span className="text-red-500">*</span>
          </label>

          <input
            type="email"
            {...register("email", {
              required: "Email address is required",
              validate: (value) =>
                value.trim().length > 0 ||
                "Email address is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address",
              },
            })}
            placeholder="Enter your email address"
            className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-[#2F2F6F] focus:ring-1 focus:ring-[#2F2F6F]"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Step2Address;