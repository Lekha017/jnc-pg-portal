import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import heroSlides from "../../data/heroSlides";

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === heroSlides.length - 1 ? 0 : prev + 1
    );
  };

  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? heroSlides.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="
        relative
        w-full
        h-[220px]
        sm:h-[300px]
        md:h-[400px]
        lg:h-[500px]
        xl:h-[550px]
        overflow-hidden
      "
    >
      {/* =========================
          SLIDES
      ========================= */}

      {heroSlides.map((slide, index) => (
        <img
          key={slide._id}
          src={slide.image}
          alt={`Slide ${index + 1}`}
          className={`
            absolute
            inset-0
            w-full
            h-full
            object-cover
            transition-opacity
            duration-700
            ${
              currentSlide === index
                ? "opacity-100"
                : "opacity-0"
            }
          `}
        />
      ))}

      {/* =========================
          LEFT ARROW
      ========================= */}

      <button
        type="button"
        onClick={previousSlide}
        aria-label="Previous slide"
        className="
          absolute
          left-2
          sm:left-4
          md:left-5
          top-1/2
          -translate-y-1/2
          bg-white/70
          hover:bg-white
          p-1.5
          sm:p-2
          md:p-3
          rounded-full
          transition
          shadow-md
          z-10
        "
      >
        <ChevronLeft
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
        />
      </button>

      {/* =========================
          RIGHT ARROW
      ========================= */}

      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next slide"
        className="
          absolute
          right-2
          sm:right-4
          md:right-5
          top-1/2
          -translate-y-1/2
          bg-white/70
          hover:bg-white
          p-1.5
          sm:p-2
          md:p-3
          rounded-full
          transition
          shadow-md
          z-10
        "
      >
        <ChevronRight
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7"
        />
      </button>

      {/* =========================
          DOTS
      ========================= */}

      <div
        className="
          absolute
          bottom-3
          sm:bottom-4
          md:bottom-5
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-2
          sm:gap-3
          z-10
        "
      >
        {heroSlides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setCurrentSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`
              rounded-full
              transition-all
              duration-300
              ${
                currentSlide === index
                  ? "w-3 h-3 sm:w-3.5 sm:h-3.5 bg-white scale-110"
                  : "w-2.5 h-2.5 sm:w-3 sm:h-3 bg-white/50"
              }
            `}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;