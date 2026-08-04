import { Pencil, Trash2 } from "lucide-react";

function ProgramCard({
  program,
  onEdit,
  onDelete,
}) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 py-5">

      {/* LEFT */}
      <div className="flex-1">

        <h3 className="text-2xl font-bold text-[#2D2A70]">
          {program.programName}
        </h3>

        <div className="flex flex-wrap items-center gap-4 mt-2 text-gray-600 text-sm">

          <span>
            Category: {program.category}
          </span>

          <span>
            Code: {program.shortCode || "N/A"}
          </span>

          <span>
            Order: {program.displayOrder}
          </span>

        </div>
      </div>

      {/* STATUS */}
      <div className="mr-6">
        {program.isActive ? (
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
            Active
          </span>
        ) : (
          <span className="bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
            Inactive
          </span>
        )}
      </div>

      {/* ACTIONS */}
      <div className="flex gap-5">

        <button
          onClick={() => onEdit(program)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Pencil size={22} />
        </button>

        <button
          onClick={() => onDelete(program._id)}
          className="text-red-600 hover:text-red-800"
        >
          <Trash2 size={22} />
        </button>

      </div>

    </div>
  );
}

export default ProgramCard;