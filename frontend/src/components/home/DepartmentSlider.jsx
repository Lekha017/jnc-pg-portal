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

const CARD_WIDTH = 390;

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

  const next = () => {
    if (currentIndex < departments.length - 3) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const previous = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <section className="pt-6 pb-8 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h2 className="text-4xl font-bold text-[#2D2A70]">
              Our Departments
            </h2>

            <p className="text-gray-500 mt-2">
              Explore Our Postgraduate Programmes
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={previous}
              disabled={currentIndex === 0}
              className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-[#2D2A70] hover:text-white disabled:opacity-40"
            >
              <ChevronLeft />
            </button>

            <button
              onClick={next}
              disabled={currentIndex >= departments.length - 3}
              className="w-11 h-11 rounded-full border flex items-center justify-center hover:bg-[#2D2A70] hover:text-white disabled:opacity-40"
            >
              <ChevronRight />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-6 transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * CARD_WIDTH}px)`,
            }}
          >
            {departments.map((department) => (
              <div
                key={department._id}
                className="flex-shrink-0"
                style={{ width: "366px" }}
              >
                <DepartmentCard department={department} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default DepartmentSlider;