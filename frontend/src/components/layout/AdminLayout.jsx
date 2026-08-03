import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiCalendar,
  FiBell,
  FiClipboard,
  FiLogOut,
} from "react-icons/fi";

import { logoutUser } from "../../services/authService";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

 const menuItems = [
  {
    name: "Dashboard",
    icon: <FiHome size={20} />,
    path: "/admin",
  },
  {
    name: "Faculty",
    icon: <FiUsers size={20} />,
    path: "/admin/faculty",
  },
  {
    name: "Departments",
    icon: <FiBook size={20} />,
    path: "/admin/departments",
  },
  {
    name: "Events",
    icon: <FiCalendar size={20} />,
    path: "/admin/events",
  },
  {
    name: "Announcements",
    icon: <FiBell size={20} />,
    path: "/admin/announcements",
  },
  {
    name: "Placements",
    icon: <FiClipboard size={20} />,
    path: "/admin/placements",
  },
];

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("user");
      sessionStorage.clear();

      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff]">
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`fixed top-0 left-0 h-screen bg-[#2F2F6F] text-white shadow-xl overflow-hidden transition-all duration-300 ease-in-out z-50 ${
          expanded ? "w-64" : "w-20"
        }`}
      >
        <nav className="flex flex-col h-full py-5">
          {menuItems.map((item) => {
            const active =
              location.pathname === item.path ||
              (item.path !== "/admin" &&
                location.pathname.startsWith(item.path));

            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center h-14 px-6 transition-all ${
                  active
                    ? "bg-white text-[#2F2F6F] font-semibold"
                    : "hover:bg-[#41418c]"
                }`}
              >
                <div className="w-8 flex justify-center items-center flex-shrink-0">
                  {item.icon}
                </div>

                {expanded && (
                  <span className="ml-4 whitespace-nowrap">
                    {item.name}
                  </span>
                )}
              </Link>
            );
          })}

          <button
            onClick={handleLogout}
            className="mt-auto flex items-center h-14 px-6 hover:bg-red-600 transition-all cursor-pointer"
          >
            <div className="w-8 flex justify-center items-center flex-shrink-0">
              <FiLogOut size={20} />
            </div>

            {expanded && (
              <span className="ml-4 whitespace-nowrap">
                Logout
              </span>
            )}
          </button>
        </nav>
      </aside>

      <main className="ml-20 min-h-screen p-8 bg-[#f5f7ff]">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;