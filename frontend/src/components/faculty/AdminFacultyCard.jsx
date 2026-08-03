import { Link } from "react-router-dom";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

const AdminFacultyCard = ({ faculty, onDelete }) => {
  const isHOD =
    faculty.designation?.toLowerCase().includes("hod") ||
    faculty.designation?.toLowerCase().includes("head");

  const deptNames =
    faculty.departments?.map((dept) => dept.name).join(", ") ||
    "Not Assigned";

  return (
    <div className="bg-white rounded-xl shadow border border-gray-200 overflow-hidden hover:shadow-lg transition">
      {/* Image */}
      <div className="relative h-64 flex items-center justify-center bg-gray-50">

        {isHOD && (
          <span className="absolute top-3 left-3 bg-pink-600 text-white text-xs px-2 py-1 rounded">
            HOD
          </span>
        )}

        <img
          src={
            faculty.image ||
            "https://via.placeholder.com/180x220?text=Faculty"
          }
          alt={faculty.fullName}
          className="h-52 object-contain"
        />
      </div>

      {/* Details */}
      <div className="p-5">

        <h2 className="text-lg font-semibold text-[#2F2F6F]">
          {faculty.fullName}
        </h2>

        <p className="text-sm text-gray-600 mt-1">
          {faculty.designation}
        </p>

        <p className="text-sm text-gray-500 mt-2 min-h-[40px]">
          {deptNames}
        </p>

        <div className="flex gap-3 mt-5">

          <Link
            to={`/admin/faculty/edit/${faculty._id}`}
            className="flex-1 bg-[#2F2F6F] hover:bg-[#24245a] text-white py-2 rounded-lg text-center transition"
          >
            <span className="inline-flex items-center gap-2">
              <FiEdit2 />
              Edit
            </span>
          </Link>

          <button
            onClick={() => onDelete(faculty._id)}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg transition"
          >
            <span className="inline-flex items-center gap-2 justify-center w-full">
              <FiTrash2 />
              Delete
            </span>
          </button>

        </div>

      </div>
    </div>
  );
};

export default AdminFacultyCard;