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
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">

      <button
        onClick={onClose}
        className="absolute top-6 right-6 text-white"
      >
        <X size={35} />
      </button>

      <button
        onClick={previous}
        className="absolute left-6 text-white"
      >
        <ChevronLeft size={45} />
      </button>

      <img
        src={images[currentIndex].url}
        alt=""
        className="max-h-[85vh] max-w-[90vw] rounded-lg"
      />

      <button
        onClick={next}
        className="absolute right-6 text-white"
      >
        <ChevronRight size={45} />
      </button>

      <div className="absolute bottom-6 text-white text-lg">
        {currentIndex + 1} / {images.length}
      </div>

    </div>
  );
};

export default PlacementGalleryLightbox;