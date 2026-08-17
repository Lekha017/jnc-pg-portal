import { X, ChevronLeft, ChevronRight } from "lucide-react";

const PlacementGalleryLightbox = ({
  images,
  currentIndex,
  setCurrentIndex,
  onClose,
}) => {
  if (!images?.length) return null;

  const previous = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const next = () => {
    setCurrentIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-4">

      <button
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white z-10"
      >
        <X size={28} className="sm:w-[35px] sm:h-[35px]" />
      </button>

      <button
        onClick={previous}
        className="absolute left-2 sm:left-6 text-white z-10"
      >
        <ChevronLeft size={34} className="sm:w-[45px] sm:h-[45px]" />
      </button>

      <img
        src={images[currentIndex].url}
        alt=""
        className="max-h-[80vh] sm:max-h-[85vh] max-w-[82vw] sm:max-w-[90vw] rounded-lg object-contain"
      />

      <button
        onClick={next}
        className="absolute right-2 sm:right-6 text-white z-10"
      >
        <ChevronRight size={34} className="sm:w-[45px] sm:h-[45px]" />
      </button>

      <div className="absolute bottom-4 sm:bottom-6 text-white text-sm sm:text-lg">
        {currentIndex + 1} / {images.length}
      </div>

    </div>
  );
};

export default PlacementGalleryLightbox;