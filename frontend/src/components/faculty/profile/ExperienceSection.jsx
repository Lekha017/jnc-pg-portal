import React from "react";

const ExperienceSection = ({
  formData,
  handleChange,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <h2 className="text-2xl font-semibold text-[#4B4B7C] mb-6">
        Experience
      </h2>

      <div className="space-y-6">
        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Academic Experience
          </label>

          <textarea
            name="academicExperience"
            value={formData.academicExperience}
            onChange={handleChange}
            rows={5}
            placeholder="Enter your academic experience..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none outline-none focus:border-[#4B4B7C] focus:ring-2 focus:ring-[#4B4B7C]/20 transition"
          />
        </div>

        <div>
          <label className="block text-gray-800 font-semibold mb-2">
            Research Experience
          </label>

          <textarea
            name="researchExperience"
            value={formData.researchExperience}
            onChange={handleChange}
            rows={5}
            placeholder="Enter your research experience..."
            className="w-full px-4 py-3 rounded-xl border border-gray-300 resize-none outline-none focus:border-[#4B4B7C] focus:ring-2 focus:ring-[#4B4B7C]/20 transition"
          />
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;