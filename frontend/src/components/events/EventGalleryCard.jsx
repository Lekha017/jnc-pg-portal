import { CalendarDays, Images } from "lucide-react";

function GalleryCard({ gallery, onImageClick }) {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg transition duration-300">
      <div className="flex flex-col md:flex-row">
        {/* Cover Image */}
        <div className="md:w-56 flex-shrink-0">
          <img
            src={gallery.coverImage?.url}
            alt={gallery.title}
            onClick={() => onImageClick(gallery.images, 0)}
            className="w-full h-52 object-cover cursor-pointer hover:scale-105 transition duration-300"
          />
        </div>

        {/* Details */}
        <div className="flex-1 p-5">
          <h2 className="text-xl font-semibold text-[#2D2A70] mb-2">
            {gallery.title}
          </h2>

          <p className="text-gray-700 leading-6 mb-4 text-justify line-clamp-2">
            {gallery.description}
          </p>

          <div className="space-y-2 text-gray-700 text-sm">
            <div className="flex items-center gap-2">
              <CalendarDays size={16} />
              <span>
                {formatDate(gallery.startDate)} -{" "}
                {formatDate(gallery.endDate)}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <Images size={16} />
              <span>{gallery.imageCount} Photos</span>
            </div>
          </div>

          <button
            onClick={() => onImageClick(gallery.images, 0)}
            className="mt-4 bg-[#2D2A70] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#1F1A52] transition"
          >
            View Gallery
          </button>
        </div>
      </div>
    </div>
  );
}

export default GalleryCard;