import {
  CalendarDays,
  Tag,
  Building2,
  AlertCircle,
  Paperclip,
} from "lucide-react";

function AnnouncementCard({ announcement }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition duration-300 overflow-hidden">

      <div className="p-6">

        {/* Header */}
        <div className="flex flex-wrap items-center gap-3 mb-4">

          {announcement.important && (
            <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
              <AlertCircle size={15} />
              Important
            </span>
          )}

          <span className="bg-[#EEF2FF] text-[#2D2A70] px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
            <Tag size={14} />
            {announcement.category}
          </span>

        </div>

        {/* Title */}
        <h2 className="text-2xl font-bold text-[#2D2A70]">
          {announcement.title}
        </h2>

        {/* Description */}
        <p className="mt-4 text-gray-700 leading-7 text-justify">
          {announcement.description}
        </p>

        {/* Details */}
        <div className="mt-6 space-y-2 text-gray-600">

          <div className="flex items-center gap-2">
            <CalendarDays size={18} />
            <span>
              Published on {formatDate(announcement.publishDate)}
            </span>
          </div>

          {announcement.department && (
            <div className="flex items-center gap-2">
              <Building2 size={18} />
              <span>{announcement.department.name}</span>
            </div>
          )}

        </div>

        {/* Attachment */}
        {announcement?.attachment?.url && (
          <a
            href={announcement.attachment.url}
            target="_blank"
            rel="noopener noreferrer"
            className="
              inline-flex
              items-center
              gap-2
              mt-6
              px-4
              py-2
              rounded-lg
              bg-[#2D2A70]
              text-white
              font-medium
              hover:bg-[#221f59]
              transition
            "
          >
            <Paperclip size={18} />
            {announcement.attachment.fileName || "View Attachment"}
          </a>
        )}

      </div>

    </div>
  );
}

export default AnnouncementCard;