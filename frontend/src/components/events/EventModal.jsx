import { useEffect, useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

function EventModal({
  images = [],
  currentIndex = 0,
  title,
  onClose,
}) {
  const [activeIndex, setActiveIndex] = useState(currentIndex);

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const nextImage = () => {
    setActiveIndex((prev) =>
      prev === images.length - 1 ? 0 : prev + 1
    );
  };

  const previousImage = () => {
    setActiveIndex((prev) =>
      prev === 0 ? images.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }

      if (e.key === "ArrowRight") {
        nextImage();
      }

      if (e.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [activeIndex, images]);

  if (!images || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl px-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 z-20"
        >
          <X size={36} />
        </button>

        {/* Previous */}
        {images.length > 1 && (
          <button
            onClick={previousImage}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white z-20 transition"
          >
            <ChevronLeft size={34} />
          </button>
        )}

        {/* Image */}
        <img
          src={images[activeIndex].url}
          alt={title}
          className="w-full max-h-[85vh] object-contain rounded-xl"
        />

        {/* Next */}
        {images.length > 1 && (
          <button
            onClick={nextImage}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 rounded-full p-3 text-white z-20 transition"
          >
            <ChevronRight size={34} />
          </button>
        )}

        {/* Bottom Info */}
        <div className="mt-6 text-center text-white">
          <h2 className="text-2xl font-semibold">
            {title}
          </h2>

          {images.length > 1 && (
            <p className="mt-2 text-gray-300">
              Image {activeIndex + 1} of {images.length}
            </p>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="mt-6 flex justify-center gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => setActiveIndex(index)}
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 transition ${
                  activeIndex === index
                    ? "border-white"
                    : "border-transparent opacity-70 hover:opacity-100"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default EventModal;