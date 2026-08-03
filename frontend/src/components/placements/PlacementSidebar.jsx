import { ChevronRight } from "lucide-react";
import { NavLink } from "react-router-dom";

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
    <div className="bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm sticky top-24">
      {/* Header */}
      <div className="bg-[#EAF4FF] border-b border-gray-200 px-6 py-4">
        <h2 className="text-xl font-bold text-[#2D2A70]">
          PLACEMENTS
        </h2>
      </div>

      {/* Menu */}
      <div className="p-4 space-y-2">
        {links.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end
            className={({ isActive }) =>
              `flex items-center justify-between px-4 py-4 rounded-lg transition-all duration-200 ${isActive
                ? "bg-[#EAF4FF] text-[#2D2A70] font-semibold"
                : "text-gray-700 hover:bg-[#EAF4FF] hover:text-[#2D2A70]"
              }`
            }
          >
            <span>{item.title}</span>
            <ChevronRight size={18} />
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default PlacementSidebar;