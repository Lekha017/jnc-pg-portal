import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const FacultyHeader = () => {
  return (
    <>
      {/* Purple Banner */}
      <section className="bg-[#3F3D7A] py-12">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-white uppercase tracking-wide">
            Faculty Profiles
          </h1>
        </div>
      </section>

      {/* Breadcrumb */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Link
              to="/"
              className="hover:text-[#E91E63] transition"
            >
              Home
            </Link>

            <ChevronRight size={16} />

            <span className="text-[#3F3D7A] font-medium">
              Faculty
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default FacultyHeader;