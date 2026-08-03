import InputField from "../common/InputField";
import FacultyImageUpload from "./FacultyImageUpload";

const BasicInformationForm = ({
  formData,
  handleChange,
  handleImageChange,
  departments = [],
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
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
            placeholder={
              formData._id
                ? "Leave blank to keep current password"
                : "Enter password"
            }
            required={!formData._id}
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
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Departments <span className="text-red-500">*</span>
          </label>

          <select
            name="departments"
            multiple
            value={formData.departments}
            onChange={(e) => {
              const selectedDepartments = Array.from(
                e.target.selectedOptions,
                (option) => option.value
              );

              handleChange({
                target: {
                  name: "departments",
                  value: selectedDepartments,
                },
              });
            }}
            required
            className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-[#2f2f6f] focus:border-[#2f2f6f]"
          >
            {departments.map((department) => (
              <option
                key={department._id}
                value={department._id}
              >
                {department.name}
              </option>
            ))}
          </select>

          <p className="text-xs text-gray-500 mt-2">
            Hold <strong>Ctrl</strong> (Windows) or{" "}
            <strong>Cmd</strong> (Mac) to select multiple departments.
          </p>
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