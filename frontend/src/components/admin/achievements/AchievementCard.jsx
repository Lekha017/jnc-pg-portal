import { Edit, Trash2, Eye, EyeOff } from "lucide-react";

function AchievementCard({
  achievement,
  onEdit,
  onDelete,
  onTogglePublish,
}) {
  const image =
    achievement.images?.length > 0
      ? achievement.images[0].url
      : "https://placehold.co/400x250?text=Achievement";

  const formattedDate = achievement.date
    ? new Date(achievement.date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "-";

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition overflow-hidden">
      {/* Image */}
      <div className="h-48 bg-gray-100 overflow-hidden">
        <img
          src={image}
          alt={achievement.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="text-[17px] font-semibold text-[#2F2F6F] line-clamp-2">
            {achievement.title}
          </h3>

          <button
            type="button"
            onClick={() => onTogglePublish(achievement._id)}
            className={`shrink-0 px-3 py-1 rounded-full text-[11px] font-semibold ${
              achievement.isPublished
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {achievement.isPublished
              ? "Published"
              : "Unpublished"}
          </button>
        </div>

        {/* Details */}
        <div className="space-y-2 text-[13px] text-gray-600">
          <p>
            <span className="font-medium text-gray-800">
              Department:
            </span>{" "}
            {achievement.department?.name || "-"}
          </p>

          <p>
            <span className="font-medium text-gray-800">
              Category:
            </span>{" "}
            {achievement.category || "-"}
          </p>

          <p>
            <span className="font-medium text-gray-800">
              Date:
            </span>{" "}
            {formattedDate}
          </p>
        </div>

        {/* Description */}
        {achievement.description && (
          <p className="mt-4 text-sm text-gray-500 leading-6 line-clamp-2">
            {achievement.description}
          </p>
        )}

        {/* Gallery count */}
        {achievement.images?.length > 1 && (
          <p className="mt-3 text-xs text-[#2F2F6F] font-medium">
            {achievement.images.length} images
          </p>
        )}

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 mt-5 pt-4 border-t border-gray-100">
          {/* Publish / Unpublish */}
          <button
            type="button"
            onClick={() =>
              onTogglePublish(achievement._id)
            }
            className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 transition"
            title={
              achievement.isPublished
                ? "Unpublish"
                : "Publish"
            }
          >
            {achievement.isPublished ? (
              <EyeOff size={17} />
            ) : (
              <Eye size={17} />
            )}
          </button>

          {/* Edit */}
          <button
            type="button"
            onClick={() => onEdit(achievement)}
            className="p-2 rounded-lg text-[#2F2F6F] hover:bg-[#F5F3FF] transition"
            title="Edit"
          >
            <Edit size={17} />
          </button>

          {/* Delete */}
          <button
            type="button"
            onClick={() => onDelete(achievement._id)}
            className="p-2 rounded-lg text-red-500 hover:bg-red-50 transition"
            title="Delete"
          >
            <Trash2 size={17} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AchievementCard;