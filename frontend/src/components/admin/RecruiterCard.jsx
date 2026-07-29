import {
  Pencil,
  Trash2,
} from "lucide-react";

const RecruiterCard = ({
  recruiter,
  onEdit,
  onDelete,
}) => {
  return (
    <div
      className="
      bg-white
      border border-gray-200
      rounded-xl
      p-5
      shadow-sm
      hover:shadow-md
      transition
      "
    >
      {/* Logo */}

      <div className="flex justify-center">
        <img
          src={
            recruiter.logo?.url ||
            "https://placehold.co/200x120?text=Logo"
          }
          alt="Company Logo"
          className="
          h-24
          object-contain
          "
        />
      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between">

        <span
          className={`px-4 py-2 rounded-full text-xs font-semibold ${
            recruiter.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {recruiter.isPublished
            ? "Published"
            : "Draft"}
        </span>

        <div className="flex items-center gap-4">

          <button
            onClick={() => onEdit(recruiter)}
            className="text-blue-600 hover:text-blue-800 transition"
            title="Edit Recruiter"
          >
            <Pencil size={20} />
          </button>

          <button
            onClick={() =>
              onDelete(recruiter._id)
            }
            className="text-red-600 hover:text-red-700 transition"
            title="Delete Recruiter"
          >
            <Trash2 size={20} />
          </button>

        </div>

      </div>
    </div>
  );
};

export default RecruiterCard;