import {
  CalendarDays,
  Images,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

const GalleryCard = ({
  gallery,
  onEdit,
  onDelete,
}) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const handleDeleteClick = () => {
    toast(
      ({ closeToast }) => (
        <div>
          <p className="font-medium mb-3">
            Delete "{gallery.title}"?
          </p>

          <div className="flex gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={() => {
                onDelete(gallery._id);
                closeToast();
              }}
            >
              Yes
            </button>

            <button
              className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
              onClick={closeToast}
            >
              No
            </button>
          </div>
        </div>
      ),
      {
        autoClose: false,
        closeOnClick: false,
      }
    );
  };

  return (
    <div className="flex items-center justify-between gap-6 px-6 py-5 border-b last:border-b-0 hover:bg-gray-50 transition">

      {/* Left */}
      <div className="flex items-center gap-5 flex-1">

        <img
          src={
            gallery.coverImage?.url ||
            "https://placehold.co/300x200?text=Gallery"
          }
          alt={gallery.title}
          className="w-28 h-20 rounded-xl object-cover border shadow-sm"
        />

        <div className="flex-1">

          <h3 className="text-xl font-bold text-[#2D2A70]">
            {gallery.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm">

            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {formatDate(gallery.startDate)} - {formatDate(gallery.endDate)}
            </div>

            <div className="flex items-center gap-2">
              <Images size={16} />
              {gallery.images?.length || 0} Images
            </div>

          </div>

        </div>

      </div>

      {/* Right */}
      <div className="flex items-center gap-5">

        <span
          className={`px-4 py-2 rounded-full text-xs font-semibold ${
            gallery.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {gallery.isPublished ? "Published" : "Draft"}
        </span>

        <button
          onClick={() => onEdit(gallery)}
          className="text-blue-600 hover:text-blue-800"
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-700"
        >
          <Trash2 size={20} />
        </button>

      </div>

    </div>
  );
};

export default GalleryCard;