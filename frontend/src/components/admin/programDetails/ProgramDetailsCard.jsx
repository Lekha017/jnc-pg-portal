import { Pencil, Trash2 } from "lucide-react";

function ProgramDetailsCard({
  details,
  onEdit,
  onDelete,
}) {
  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        shadow-sm
        hover:shadow-md
        transition-all
        duration-300
        p-5
      "
    >
      <div className="flex justify-between items-start">

        <div className="flex-1">

          <span
            className="
              inline-block
              bg-[#EEF2FF]
              text-[#2D2A70]
              text-xs
              font-semibold
              px-3
              py-1
              rounded-full
              mb-3
            "
          >
            {details?.program?.category}
          </span>

          <h3 className="text-xl font-bold text-[#2D2A70]">
            {details?.program?.programName}
          </h3>

          <p className="text-gray-600 mt-2">
            {details?.degreeTitle}
          </p>

          <div className="mt-4 space-y-2 text-sm">

            <p>
              <span className="font-semibold">
                Department :
              </span>{" "}
              {details?.departmentName}
            </p>

            <p>
              <span className="font-semibold">
                Email :
              </span>{" "}
              {details?.email}
            </p>

            <div className="pt-1">
              {details?.isActive ? (
                <span
                  className="
                    bg-green-100
                    text-green-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                  "
                >
                  Active
                </span>
              ) : (
                <span
                  className="
                    bg-red-100
                    text-red-700
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-medium
                  "
                >
                  Inactive
                </span>
              )}
            </div>

          </div>

        </div>

        <div className="flex gap-3 ml-6">

          <button
            onClick={() => onEdit(details)}
            className="
              text-blue-600
              hover:text-blue-800
            "
          >
            <Pencil size={20} />
          </button>

          <button
            onClick={() =>
              onDelete(details)
            }
            className="
              text-red-600
              hover:text-red-800
            "
          >
            <Trash2 size={20} />
          </button>

        </div>

      </div>
    </div>
  );
}

export default ProgramDetailsCard;