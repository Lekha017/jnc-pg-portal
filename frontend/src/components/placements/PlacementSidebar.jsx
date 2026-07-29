import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const PlacementSidebar = () => {
  const links = [
    {
      title: "About Placements",
      path: "/placements",
    },
    {
      title: "Placement Training",
      path: "/placement-training",
    },
    {
      title: "Recruiting Companies",
      path: "/recruiting-companies",
    },
    {
      title: "Gallery",
      path: "/placement-gallery",
    },
    {
      title: "Contact Us",
      path: "/placement-contact",
    },
  ];

  return (
    <div
      className="
        bg-white
        border
        border-gray-300
        rounded-xl
        overflow-hidden
        sticky
        top-24
        shadow-sm
      "
    >
      {/* Header */}
      <div
        className="
          bg-[#EAF4FF]
          text-[#2D2A70]
          px-6
          py-4
          border-b
          border-gray-200
        "
      >
        <h2 className="text-xl font-bold tracking-wide">
          PLACEMENTS
        </h2>
      </div>

      {/* Links */}
      <div className="p-4">
        {links.map((item, index) => (
          <Link
            key={index}
            to={item.path}
            className="
              w-full
              flex
              items-center
              justify-between
              px-4
              py-4
              rounded-lg
              text-gray-700
              font-medium
              hover:bg-[#EAF4FF]
              hover:text-[#2D2A70]
              transition-all
              duration-200
            "
          >
            <span>{item.title}</span>

            <ChevronRight
              size={18}
              className="text-gray-500"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PlacementSidebar;