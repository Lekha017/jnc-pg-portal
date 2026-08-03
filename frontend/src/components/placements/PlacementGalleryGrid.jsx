import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PlacementGalleryLightbox from "./PlacementGalleryLightbox";

const PlacementGalleryGrid = ({ images = [] }) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const sliderRef = useRef(null);

  const scrollLeft = () => {
    sliderRef.current.scrollBy({
      left: -320,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    sliderRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  if (!images.length) {
    return (
      <div className="text-center py-10 text-gray-500">
        No images available.
      </div>
    );
  }

  return (
    <>
      <div className="relative">

        {/* Left Arrow */}
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronLeft size={22} />
        </button>

        {/* Images */}
        <div
          ref={sliderRef}
          className="flex gap-5 overflow-x-auto scroll-smooth px-10 scrollbar-hide"
        >
          {images.map((image, index) => (
            <div
              key={image._id || index}
              onClick={() => {
                setCurrentIndex(index);
                setShowLightbox(true);
              }}
              className="flex-shrink-0 w-64 cursor-pointer rounded-xl overflow-hidden bg-white shadow-md"
            >
              <img
                src={image.url}
                alt={image.title || "Gallery"}
                className="w-full h-44 object-cover hover:scale-105 transition duration-300"
              />
            </div>
          ))}
        </div>

        {/* Right Arrow */}
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow rounded-full p-2 hover:bg-gray-100"
        >
          <ChevronRight size={22} />
        </button>

      </div>

      {showLightbox && (
        <PlacementGalleryLightbox
          images={images}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
          onClose={() => setShowLightbox(false)}
        />
      )}
    </>
  );
};

export default PlacementGalleryGrid;