import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import PlacementGalleryGrid from "./PlacementGalleryGrid";

const PlacementGalleryAccordion = ({ galleries = [] }) => {
  const [openIndex, setOpenIndex] = useState(0);

  if (!galleries.length) {
    return (
      <div className="text-center py-16 text-gray-500">
        No Gallery Available
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {galleries.map((gallery, index) => (
        <div
          key={gallery._id}
          className="bg-white rounded-xl shadow-sm overflow-hidden"
        >
          {/* Header */}
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? -1 : index)
            }
            className="
              w-full
              bg-gray-200
              hover:bg-gray-300
              text-[#2D2A70]
              px-6
              py-3
              flex
              items-center
              justify-between
              transition
            "
          >
            <span className="text-xl font-semibold">
              {gallery.title}
            </span>

            {openIndex === index ? (
              <ChevronUp size={22} />
            ) : (
              <ChevronDown size={22} />
            )}
          </button>

          {/* Body */}
          {openIndex === index && (
            <div className="bg-[#F4F6FB] px-8 py-8">

              {gallery.description && (
                <p className="text-gray-700 leading-7 mb-3">
                  {gallery.description}
                </p>
              )}

              {gallery.eventDate && (
                <p className="text-sm text-gray-500 mb-8">
                  {new Date(gallery.eventDate).toLocaleDateString()}
                </p>
              )}

              {/* Image Slider */}
              <PlacementGalleryGrid
                images={gallery.images || []}
              />

            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default PlacementGalleryAccordion;