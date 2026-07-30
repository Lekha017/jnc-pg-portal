import { Search } from "lucide-react";

const FacultyFilters = ({
  search,
  onSearch,
  department,
  onDepartment,
  designation,
  onDesignation,
  departments = [],
}) => {
  const handleClear = () => {
    onSearch("");
    onDepartment("");
    onDesignation("");
  };

  return (
    <div className="max-w-6xl mx-auto mb-10">
      <div className="flex flex-wrap items-center gap-4">

        {/* Search */}

        <div className="relative flex-1 min-w-[260px]">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search Faculty..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="w-full border border-gray-300 rounded px-10 py-2.5 focus:outline-none focus:ring-1 focus:ring-[#E91E63]"
          />
        </div>

        {/* Department */}

        <select
          value={department}
          onChange={(e) => onDepartment(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2.5 min-w-[220px] focus:outline-none focus:ring-1 focus:ring-[#E91E63]"
        >
          <option value="">All Departments</option>

          {departments.map((dept) => (
            <option
              key={dept._id}
              value={dept._id}
            >
              {dept.name}
            </option>
          ))}
        </select>

        {/* Designation */}

        <select
          value={designation}
          onChange={(e) => onDesignation(e.target.value)}
          className="border border-gray-300 rounded px-4 py-2.5 min-w-[220px] focus:outline-none focus:ring-1 focus:ring-[#E91E63]"
        >
          <option value="">All Designations</option>
          <option value="Professor">Professor</option>
          <option value="Associate Professor">
            Associate Professor
          </option>
          <option value="Assistant Professor">
            Assistant Professor
          </option>
          <option value="HOD">HOD</option>
        </select>

        {/* Button */}

        <button
          onClick={handleClear}
          className="bg-[#E91E63] hover:bg-[#c2185b] text-white px-6 py-2.5 rounded transition"
        >
          Clear
        </button>

      </div>
    </div>
  );
};

export default FacultyFilters;