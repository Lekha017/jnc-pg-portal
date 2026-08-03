import {
  CalendarDays,
  Images,
  Pencil,
  Trash2,
} from "lucide-react";

const PlacementGalleryCard = ({
  gallery,
  onEdit,
  onDelete,
}) => {
  const previewImages =
    gallery.images?.slice(0, 4) || [];

  const remainingImages =
    gallery.images?.length - 4;

  return (
    <div className="p-6 hover:bg-gray-50 transition">

      {/* Header */}

      <div className="flex justify-between items-start mb-5">

        <div>

          <h3 className="text-2xl font-bold text-[#2D2A70]">
            {gallery.title}
          </h3>

          <p className="text-gray-600 mt-2">
            {gallery.description}
          </p>

        </div>

        <span
          className={`px-4 py-2 rounded-full text-sm font-semibold ${
            gallery.isPublished
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {gallery.isPublished
            ? "Published"
            : "Draft"}
        </span>

      </div>

      {/* Gallery Preview */}

      {previewImages.length > 0 && (

        <div className="grid grid-cols-4 gap-4 mb-6">

          {previewImages.map((image, index) => (

            <div
              key={index}
              className="relative h-28 rounded-xl overflow-hidden border border-gray-200"
            >

              <img
                src={image.url}
                alt=""
                className="w-full h-full object-cover"
              />

              {index === 3 &&
                remainingImages > 0 && (

                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">

                    <span className="text-white font-bold text-xl">
                      +{remainingImages}
                    </span>

                  </div>

                )}

            </div>

          ))}

        </div>

      )}

      {/* Information */}

      <div className="grid md:grid-cols-2 gap-4">

        <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl border border-gray-200 p-4">

          <CalendarDays
            size={22}
            className="text-[#2D2A70]"
          />

          <div>

            <p className="text-sm text-gray-500">
              Training Date
            </p>

            <p className="font-semibold">
              {new Date(
                gallery.eventDate
              ).toLocaleDateString()}
            </p>

          </div>

        </div>

        <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl border border-gray-200 p-4">

          <Images
            size={22}
            className="text-[#2D2A70]"
          />

          <div>

            <p className="text-sm text-gray-500">
              Images
            </p>

            <p className="font-semibold">
              {gallery.images?.length || 0} Photos
            </p>

          </div>

        </div>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(gallery)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
        >

          <Pencil size={18} />

          Edit

        </button>

        <button
          onClick={() => onDelete(gallery)}
          className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl transition"
        >

          <Trash2 size={18} />

          Delete

        </button>

      </div>

    </div>
  );
};

export default PlacementGalleryCard;