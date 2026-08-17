import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import {
  FaFlask,
  FaLaptopCode,
  FaBookOpen,
  FaChartBar,
  FaBrain,
  FaCalculator,
  FaLeaf,
  FaUserTie,
} from "react-icons/fa";

import DepartmentCard from "./DepartmentCard";
import { getAllDepartments } from "../../services/departmentService";

const iconMap = {
  "Department of Chemistry": FaFlask,
  "Department of Computer Science": FaLaptopCode,
  "Department of English": FaBookOpen,
  "Department of Commerce": FaChartBar,
  "Department of Psychology": FaBrain,
  "Department of Mathematics": FaCalculator,
  "Department of Biological Sciences": FaLeaf,
  "Department of Management": FaUserTie,
};

function DepartmentSlider() {
  const [departments, setDepartments] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);

  /* =========================
     FETCH DEPARTMENTS
  ========================= */

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const data = await getAllDepartments();

      const formatted = data.map((dept) => ({
        ...dept,
        course: "Postgraduate",
        icon: iconMap[dept.name] || FaBookOpen,
      }));

      setDepartments(formatted);
    } catch (err) {
      console.error(err);
    }
  };

  /* =========================
     RESPONSIVE CARD COUNT
  ========================= */

  useEffect(() => {
    const updateVisibleCards = () => {
      if (window.innerWidth < 640) {
        // Mobile
        setVisibleCards(1);
      } else if (window.innerWidth < 1024) {
        // Tablet
        setVisibleCards(2);
      } else {
        // Desktop
        setVisibleCards(3);
      }
    };

    updateVisibleCards();

    window.addEventListener(
      "resize",
      updateVisibleCards
    );

    return () => {
      window.removeEventListener(
        "resize",
        updateVisibleCards
      );
    };
  }, []);

  /* =========================
     KEEP INDEX VALID
  ========================= */

  useEffect(() => {
    const maxIndex = Math.max(
      departments.length - visibleCards,
      0
    );

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [
    departments.length,
    visibleCards,
    currentIndex,
  ]);

  /* =========================
     NEXT
  ========================= */

  const next = () => {
    const maxIndex = Math.max(
      departments.length - visibleCards,
      0
    );

    if (currentIndex < maxIndex) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  /* =========================
     PREVIOUS
  ========================= */

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="pt-6 sm:pt-8 pb-8 sm:pb-10 bg-gray-50">

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* =========================
            HEADER
        ========================= */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-4
            mb-5
          "
        >

          {/* Heading */}

          <div>

            <h2
              className="
                text-2xl
                sm:text-3xl
                lg:text-4xl
                font-bold
                text-[#2D2A70]
              "
            >
              Our Departments
            </h2>

            <p
              className="
                text-sm
                sm:text-base
                text-gray-500
                mt-1
                sm:mt-2
              "
            >
              Explore Our Postgraduate Programmes
            </p>

          </div>


          {/* =========================
              ARROWS
          ========================= */}

          <div className="flex gap-2 sm:gap-3">

            <button
              type="button"
              onClick={previous}
              disabled={currentIndex === 0}
              aria-label="Previous departments"
              className="
                w-9
                h-9
                sm:w-11
                sm:h-11
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                hover:bg-[#2D2A70]
                hover:text-white
                hover:border-[#2D2A70]
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
            >
              <ChevronLeft
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>

            <button
              type="button"
              onClick={next}
              disabled={
                currentIndex >=
                Math.max(
                  departments.length -
                    visibleCards,
                  0
                )
              }
              aria-label="Next departments"
              className="
                w-9
                h-9
                sm:w-11
                sm:h-11
                rounded-full
                border
                border-gray-300
                flex
                items-center
                justify-center
                hover:bg-[#2D2A70]
                hover:text-white
                hover:border-[#2D2A70]
                disabled:opacity-40
                disabled:cursor-not-allowed
                transition
              "
            >
              <ChevronRight
                className="w-5 h-5 sm:w-6 sm:h-6"
              />
            </button>

          </div>

        </div>


        {/* =========================
            SLIDER
        ========================= */}

        <div className="overflow-hidden w-full">

          <div
            className="
              flex
              gap-4
              sm:gap-5
              lg:gap-6
              transition-transform
              duration-500
              ease-in-out
            "
            style={{
              transform: `translateX(
                calc(
                  -${currentIndex} * (
                    (100% - ${
                      (visibleCards - 1) * 16
                    }px) / ${visibleCards}
                    + 16px
                  )
                )
              )`,
            }}
          >

            {departments.map((department) => (

              <div
                key={department._id}
                className="
                  flex-shrink-0
                  w-full
                  sm:w-[calc((100%-20px)/2)]
                  lg:w-[calc((100%-48px)/3)]
                "
              >
                <DepartmentCard
                  department={department}
                />
              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  );
}

export default DepartmentSlider;