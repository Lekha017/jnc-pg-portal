import {
  CalendarDays,
  MapPin,
  Building2,
  Pencil,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

const EventCard = ({
  event,
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
            Delete "{event.title}"?
          </p>

          <div className="flex gap-2">
            <button
              className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
              onClick={() => {
                onDelete(event._id);
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
    <div className="flex items-center justify-between gap-6 px-6 py-5 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition">

      {/* Left Side */}
      <div className="flex items-center gap-5 flex-1">

        {/* Poster */}
        <img
          src={
            event.poster?.url ||
            "https://placehold.co/300x400?text=No+Poster"
          }
          alt={event.title}
          className="w-24 h-28 rounded-xl object-cover border border-gray-200 shadow-sm"
        />

        {/* Details */}
        <div className="flex-1">

          <h3 className="text-xl font-bold text-[#2D2A70]">
            {event.title}
          </h3>

          <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-gray-600 text-sm">

            <div className="flex items-center gap-2">
              <Building2 size={16} />
              {event.department?.name || "N/A"}
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={16} />
              {event.venue}
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </div>

          </div>

        </div>

      </div>

      {/* Right Side */}
      <div className="flex items-center gap-5">

        <span
          className={`px-4 py-2 rounded-full text-xs font-semibold ${
            event.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {event.isPublished
            ? "Published"
            : "Draft"}
        </span>

        <button
          onClick={() => onEdit(event)}
          className="text-blue-600 hover:text-blue-800 transition"
          title="Edit Event"
        >
          <Pencil size={20} />
        </button>

        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-700 transition"
          title="Delete Event"
        >
          <Trash2 size={20} />
        </button>

      </div>

    </div>
  );
};

export default EventCard;