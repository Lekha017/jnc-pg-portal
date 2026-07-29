import InputField from "../common/InputField";
import FacultyImageUpload from "./FacultyImageUpload";

const BasicInformationForm = ({
  formData,
  handleChange,
  handleImageChange,
  departments = [],
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <h2 className="text-2xl font-semibold text-[#4B4B7C] mb-8">
        Basic Information
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InputField
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Enter full name"
          required
        />

        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email address"
          required
        />

        <InputField
          label="Phone Number"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Enter phone number"
        />

        {"password" in formData && (
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        )}

        <InputField
          label="Designation"
          name="designation"
          value={formData.designation}
          onChange={handleChange}
          placeholder="Enter designation"
          required
        />

        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Department <span className="text-red-500">*</span>
          </label>

          <select
            name="departments"
            value={formData.departments}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-300 outline-none focus:border-[#4B4B7C] focus:ring-2 focus:ring-[#4B4B7C]/20 transition"
          >
            <option value="">Select Department</option>

            {departments.map((department) => (
              <option
                key={department._id}
                value={department._id}
              >
                {department.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-8">
        <FacultyImageUpload
          image={formData.image}
          onChange={handleImageChange}
        />
      </div>
    </div>
  );
};

export default BasicInformationForm;