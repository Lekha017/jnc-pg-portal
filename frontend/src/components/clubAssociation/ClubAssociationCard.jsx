import {
  Eye,
  EyeOff,
  Pencil,
  Trash2,
  Images,
} from "lucide-react";

const ClubAssociationCard = ({
  clubAssociation,
  onEdit,
  onDelete,
  onTogglePublish,
}) => {
  const image =
    clubAssociation?.images?.[0]?.url ||
    "https://placehold.co/800x500?text=Club+Association";

  const departmentName =
    clubAssociation?.department?.name ||
    "Department not assigned";

  const imageCount =
    clubAssociation?.images?.length || 0;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition overflow-hidden">
      <div className="flex flex-col md:flex-row">
        {/* ===================================================
            IMAGE
        ==================================================== */}

        <div className="w-full md:w-56 h-48 md:h-auto bg-gray-100 shrink-0">
          <img
            src={image}
            alt={
              clubAssociation?.title ||
              "Club Association"
            }
            className="w-full h-full object-cover"
            onError={(event) => {
              event.currentTarget.src =
                "https://placehold.co/800x500?text=Club+Association";
            }}
          />
        </div>

        {/* ===================================================
            CONTENT
        ==================================================== */}

        <div className="flex-1 p-5">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
            <div className="flex-1">
              {/* TITLE */}

              <h3 className="text-xl font-bold text-[#2F2F6F]">
                {clubAssociation?.title}
              </h3>

              {/* DEPARTMENT */}

              <p className="text-sm text-gray-500 mt-1">
                {departmentName}
              </p>

              {/* DESCRIPTION */}

              <p className="text-sm text-gray-600 mt-3 line-clamp-2 leading-6">
                {clubAssociation?.description}
              </p>

              {/* META */}

              <div className="flex flex-wrap items-center gap-4 mt-4">
                {/* STATUS */}

                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    clubAssociation?.isPublished
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {clubAssociation?.isPublished
                    ? "Published"
                    : "Unpublished"}
                </span>

                {/* IMAGE COUNT */}

                <span className="flex items-center gap-1.5 text-sm text-gray-500">
                  <Images size={16} />
                  {imageCount}{" "}
                  {imageCount === 1
                    ? "image"
                    : "images"}
                </span>
              </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================== */}

            <div className="flex md:flex-col items-center gap-2">
              {/* PUBLISH / UNPUBLISH */}

              <button
                type="button"
                onClick={() =>
                  onTogglePublish(
                    clubAssociation
                  )
                }
                className={`w-11 h-11 rounded-xl border flex items-center justify-center transition ${
                  clubAssociation?.isPublished
                    ? "border-gray-200 text-gray-700 hover:bg-gray-100"
                    : "border-green-200 text-green-600 hover:bg-green-50"
                }`}
                title={
                  clubAssociation?.isPublished
                    ? "Unpublish"
                    : "Publish"
                }
              >
                {clubAssociation?.isPublished ? (
                  <EyeOff size={19} />
                ) : (
                  <Eye size={19} />
                )}
              </button>

              {/* EDIT */}

              <button
                type="button"
                onClick={() =>
                  onEdit(clubAssociation)
                }
                className="w-11 h-11 rounded-xl border border-gray-200 text-[#2F2F6F] flex items-center justify-center hover:bg-gray-100 transition"
                title="Edit"
              >
                <Pencil size={19} />
              </button>

              {/* DELETE */}

              <button
                type="button"
                onClick={() =>
                  onDelete(clubAssociation)
                }
                className="w-11 h-11 rounded-xl border border-red-200 text-red-500 flex items-center justify-center hover:bg-red-50 transition"
                title="Delete"
              >
                <Trash2 size={19} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClubAssociationCard;