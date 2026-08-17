function PlacementFilters({
  search,
  setSearch,
  year,
  setYear,
  department,
  setDepartment,
}) {
  return (
    <div className="bg-white border border-gray-300 rounded-2xl shadow-sm p-4 sm:p-5 md:p-6 mb-6 sm:mb-8 md:mb-10">

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">

        {/* Search */}
        <input
          type="text"
          placeholder="Search student or company..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            border border-gray-300
            rounded-xl
            px-3 sm:px-4
            py-3
            text-sm sm:text-base
            text-gray-700
            outline-none
            focus:border-[#2D2A70]
            focus:ring-2 focus:ring-[#2D2A70]/20
          "
        />

        {/* Year */}
        <select
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="
            w-full
            border border-gray-300
            rounded-xl
            px-3 sm:px-4
            py-3
            text-sm sm:text-base
            text-gray-700
            outline-none
            focus:border-[#2D2A70]
            focus:ring-2 focus:ring-[#2D2A70]/20
          "
        >
          <option value="">All Years</option>
          <option value="2026">2026</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
        </select>

        {/* Department */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="
            w-full
            border border-gray-300
            rounded-xl
            px-3 sm:px-4
            py-3
            text-sm sm:text-base
            text-gray-700
            outline-none
            focus:border-[#2D2A70]
            focus:ring-2 focus:ring-[#2D2A70]/20
          "
        >
          <option value="">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="MCA">MCA</option>
          <option value="MBA">MBA</option>
        </select>

      </div>

    </div>
  );
}

export default PlacementFilters;