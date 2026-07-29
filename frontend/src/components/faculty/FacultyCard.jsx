import { Link } from "react-router-dom";

const FacultyCard = ({ faculty }) => {
  const isHOD =
    faculty.designation?.toLowerCase().includes("hod") ||
    faculty.designation?.toLowerCase().includes("head");

  const deptNames =
    faculty.departments?.map((dept) => dept.name).join(", ") ||
    "Not Assigned";

  return (
    <div
      className="
        relative
        w-[240px]
        mx-auto
        bg-white
        border border-gray-200
        rounded-lg
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        overflow-hidden
      "
    >
      {/* HOD Badge */}
      {isHOD && (
        <span className="absolute top-2 left-2 z-10 bg-[#E91E63] text-white text-[10px] font-semibold px-2 py-1 rounded">
          HOD
        </span>
      )}

      {/* Image */}
      <div className="h-[245px] flex items-center justify-center bg-white pt-5 px-5">
        <img
          src={
            faculty.image ||
            "https://via.placeholder.com/180x220?text=Faculty"
          }
          alt={faculty.fullName}
          className="h-[210px] w-auto object-contain"
        />
      </div>

      {/* Content */}
      <div className="px-4 pb-5 text-center">
        <h3 className="text-[15px] font-semibold text-[#2F2F6F] leading-tight">
          {faculty.fullName}
        </h3>

        <p className="mt-2 text-[12px] text-gray-700">
          {faculty.designation}
        </p>

        <p className="mt-1 text-[11px] text-gray-500 leading-5 min-h-[38px]">
          {deptNames}
        </p>

        <Link
          to={`/faculty/${faculty._id}`}
          className="
            inline-flex
            items-center
            justify-center
            mt-4
            bg-[#E91E63]
            hover:bg-[#c2185b]
            text-white
            text-[11px]
            font-medium
            px-4
            py-2
            rounded
            transition
          "
        >
          View Profile →
        </Link>
      </div>
    </div>
  );
};

export default FacultyCard;