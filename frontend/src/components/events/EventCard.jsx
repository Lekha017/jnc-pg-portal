import { CalendarDays, MapPin, Building2 } from "lucide-react";

function EventCard({ event, onImageClick }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  // Prepare images for modal
  const images = [];

  if (event.poster?.url) {
    images.push({
      url: event.poster.url,
    });
  }

  if (event.gallery && event.gallery.length > 0) {
    event.gallery.forEach((image) => {
      images.push({
        url: image.url,
      });
    });
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="flex flex-col md:flex-row">
        {/* Poster */}
        <div className="md:w-72 flex-shrink-0">
          <img
            src={event.poster?.url}
            alt={event.title}
            onClick={() => onImageClick(images, 0)}
            className="w-full h-64 md:h-full object-cover cursor-pointer hover:scale-105 transition duration-300"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-6">
          <h2 className="text-2xl font-semibold text-[#2D2A70] mb-3">
            {event.title}
          </h2>

          <p className="text-gray-700 leading-7 mb-5 text-justify">
            {event.description}
          </p>

          <div className="space-y-3 text-gray-700">
            <div className="flex items-center gap-2">
              <Building2 size={18} />
              <span>{event.department?.name}</span>
            </div>

            <div className="flex items-center gap-2">
              <MapPin size={18} />
              <span>{event.venue}</span>
            </div>

            <div className="flex items-center gap-2">
              <CalendarDays size={18} />
              <span>
                {formatDate(event.startDate)} - {formatDate(event.endDate)}
              </span>
            </div>

            {event.chiefGuest && (
              <div>
                <span className="font-semibold">Chief Guest:</span>{" "}
                {event.chiefGuest}
              </div>
            )}
          </div>

          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noreferrer"
              className="inline-block mt-6 bg-[#2D2A70] text-white px-6 py-2 rounded-full hover:bg-[#1F1A52] transition"
            >
              Register Now
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default EventCard;