function PlacementCard({ placement }) {
  return (
    <div
      className="
      bg-white
      rounded-2xl
      border border-gray-200
      shadow-sm
      p-6
      hover:shadow-md
      hover:border-gray-300
      transition-all duration-300
      "
    >
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-bold text-[#2D2A70]">
            {placement.studentName}
          </h2>

          <p className="text-gray-500 mt-1">
            {placement.department?.name ||
              placement.department ||
              "Department"}
          </p>
        </div>

        <span
          className="
          bg-gray-100
          text-[#2D2A70]
          border border-gray-200
          px-4 py-1
          rounded-full
          text-sm
          font-semibold
          "
        >
          {placement.year}
        </span>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-100 my-5"></div>

      {/* Details */}
      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold text-gray-900">
            Company:
          </span>{" "}
          {placement.company}
        </p>

        <p>
          <span className="font-semibold text-gray-900">
            Role:
          </span>{" "}
          {placement.role}
        </p>

        <p>
          <span className="font-semibold text-gray-900">
            Package:
          </span>{" "}
          <span className="text-green-600 font-semibold">
            {placement.package} LPA
          </span>
        </p>
      </div>
    </div>
  );
}

export default PlacementCard;