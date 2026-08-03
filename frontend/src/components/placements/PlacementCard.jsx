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
      transition-all duration-300
      "
    >
      {/* Company Logo */}
      <div className="flex justify-center mb-4">
        <img
          src={
            placement.companyLogo?.url ||
            "https://placehold.co/120x60?text=Company"
          }
          alt={placement.company}
          className="h-14 object-contain"
        />
      </div>

      {/* Student Photo */}
      <div className="flex justify-center mb-4">
        <img
          src={
            placement.studentPhoto?.url ||
            "https://placehold.co/120x120?text=Student"
          }
          alt={placement.studentName}
          className="w-24 h-24 rounded-full object-cover border-4 border-gray-100"
        />
      </div>

      {/* Student Info */}
      <div className="text-center">
        <h2 className="text-xl font-bold text-[#2D2A70]">
          {placement.studentName}
        </h2>

        <p className="text-gray-500 mt-1">
          {placement.department?.name ||
            placement.department}
        </p>
      </div>

      <div className="border-t border-gray-100 my-5"></div>

      {/* Details */}
      <div className="space-y-3 text-gray-700">
        <p>
          <span className="font-semibold">
            Company:
          </span>{" "}
          {placement.company}
        </p>

        <p>
          <span className="font-semibold">
            Role:
          </span>{" "}
          {placement.role}
        </p>

        <p>
          <span className="font-semibold">
            Package:
          </span>{" "}
          <span className="text-green-600 font-semibold">
            {placement.package} LPA
          </span>
        </p>

        <p>
          <span className="font-semibold">
            Year:
          </span>{" "}
          {placement.year}
        </p>
      </div>
    </div>
  );
}

export default PlacementCard;