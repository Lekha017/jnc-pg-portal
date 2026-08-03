import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function DepartmentCard({ department }) {
  const navigate = useNavigate();
  const Icon = department.icon;

  return (
    <div
      className="
        bg-white
        border
        border-gray-200
        rounded-xl
        shadow-sm
        hover:shadow-md
        hover:border-[#2D2A70]
        transition-all
        duration-300
        h-[95px]
        px-5
        flex
        items-center
        justify-between
        cursor-pointer
      "
      onClick={() => navigate(`/department/${department.slug}`)}
    >
      <div className="flex items-center gap-4">
        <div
          className="
            w-14
            h-14
            rounded-full
            bg-[#F4F1FF]
            flex
            items-center
            justify-center
            flex-shrink-0
          "
        >
          <Icon
            size={28}
            className="text-[#2D2A70]"
          />
        </div>

        <div>
          <h3
            className="
              text-[17px]
              font-semibold
              text-[#2D2A70]
              leading-5
            "
          >
            {department.name}
          </h3>

          <p className="text-sm text-gray-500 mt-1">
            {department.course}
          </p>
        </div>
      </div>

      <button
        className="
          w-9
          h-9
          rounded-lg
          bg-[#2D2A70]
          text-white
          flex
          items-center
          justify-center
          hover:bg-[#221f59]
          transition
          flex-shrink-0
        "
      >
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

export default DepartmentCard;