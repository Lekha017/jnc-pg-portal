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
    <section className="relative w-full h-[550px] overflow-hidden">
      {/* Slides */}

      {heroSlides.map((slide, index) => (
        <img
          key={slide._id}
          src={slide.image}
          alt={`Slide ${index + 1}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
            currentSlide === index
              ? "opacity-100"
              : "opacity-0"
          }`}
        />
      ))}

      {/* Left Arrow */}

      <button
        onClick={previousSlide}
        className="absolute left-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full transition"
      >
        <ChevronLeft size={28} />
      </button>

      {/* Right Arrow */}

      <button
        onClick={nextSlide}
        className="absolute right-5 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white p-3 rounded-full transition"
      >
        <ChevronRight size={28} />
      </button>

      {/* Dots */}

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-3">

        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              currentSlide === index
                ? "bg-white scale-125"
                : "bg-white/50"
            }`}
          />
        ))}

      </div>

    </section>
  );
};

export default HeroSlider;