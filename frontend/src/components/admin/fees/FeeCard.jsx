import { Pencil, Trash2 } from "lucide-react";

function FeeCard({
  fee,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">

      <div className="flex justify-between items-start">

        <div className="flex-1">

          {/* Program */}

          <h3 className="text-lg font-bold text-[#2D2A70]">
            {fee.program?.programName}
          </h3>

          {/* Year */}

          <p className="text-sm text-gray-500 mt-1">
            {fee.year}
          </p>

          {/* Fees */}

          <div className="mt-4 space-y-2">

            <p className="text-gray-700">
              <span className="font-semibold">
                Inside Karnataka:
              </span>{" "}
              ₹
              {fee.insideKarnatakaFee?.toLocaleString()}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">
                Outside Karnataka:
              </span>{" "}
              ₹
              {fee.outsideKarnatakaFee?.toLocaleString()}
            </p>

          </div>

          {/* Status */}

          <div className="mt-4">

            {fee.isActive ? (
              <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-semibold">
                Active
              </span>
            ) : (
              <span className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-xs font-semibold">
                Inactive
              </span>
            )}

          </div>

        </div>

        {/* Actions */}

        <div className="flex gap-3 ml-4">

          <button
            onClick={() => onEdit(fee)}
            className="text-blue-600 hover:text-blue-800"
          >
            <Pencil size={20} />
          </button>

          <button
            onClick={() =>
              onDelete(fee._id)
            }
            className="text-red-600 hover:text-red-800"
          >
            <Trash2 size={20} />
          </button>

        </div>

      </div>

    </div>
  );
}

export default FeeCard;