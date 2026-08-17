import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiHome,
  FiUsers,
  FiBook,
  FiCalendar,
  FiBell,
  FiClipboard,
  FiAward,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

import { logoutUser } from "../../services/authService";

const AdminLayout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [expanded, setExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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
      name: "Academics",
      icon: <FiBook size={20} />,
      path: "/admin/programs",
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
    {
      name: "Achievements",
      icon: <FiAward size={20} />,
      path: "/admin/achievements",
    },
    {
      name: "Clubs & Associations",
      icon: <FiUsers size={20} />,
      path: "/admin/club-associations",
    },
    {
      name: "Management",
      icon: <FiUsers size={20} />,
      path: "/admin/management",
    },
    {
      name: "Deans",
      icon: <FiUsers size={20} />,
      path: "/admin/deans",
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

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f7ff]">

      {/* ================= MOBILE HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#2F2F6F] text-white flex items-center px-4 z-40 md:hidden shadow-md">
        <button
          onClick={() => setMobileOpen(true)}
          className="p-2 rounded-lg hover:bg-[#41418c] transition"
          aria-label="Open menu"
        >
          <FiMenu size={24} />
        </button>

        <h1 className="ml-3 text-lg font-semibold">
          JNC PG Portal
        </h1>
      </header>

      {/* ================= MOBILE OVERLAY ================= */}
      {mobileOpen && (
        <div
          onClick={closeMobileMenu}
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
        />
      )}

      {/* ================= SIDEBAR ================= */}
      <aside
        onMouseEnter={() => setExpanded(true)}
        onMouseLeave={() => setExpanded(false)}
        className={`
          fixed top-0 left-0 h-screen
          bg-[#2F2F6F] text-white shadow-xl
          overflow-hidden z-50
          transition-all duration-300 ease-in-out

          w-64

          md:w-20
          ${expanded ? "md:w-64" : ""}

          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* Mobile close button */}
        <div className="flex justify-end p-4 md:hidden">
          <button
            onClick={closeMobileMenu}
            className="p-2 rounded-lg hover:bg-[#41418c]"
            aria-label="Close menu"
          >
            <FiX size={24} />
          </button>
        </div>

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
                onClick={closeMobileMenu}
                className={`
                  flex items-center h-14 px-6
                  transition-all
                  ${active
                    ? "bg-white text-[#2F2F6F] font-semibold"
                    : "hover:bg-[#41418c]"
                  }
                `}
              >
                <div className="w-8 flex justify-center items-center flex-shrink-0">
                  {item.icon}
                </div>

                {/* Desktop expanded text */}
                <span
                  className={`
                    ml-4 whitespace-nowrap
                    ${expanded ? "md:block" : "md:hidden"}
                    block
                  `}
                >
                  {item.name}
                </span>
              </Link>
            );
          })}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="mt-auto flex items-center h-14 px-6 hover:bg-red-600 transition-all cursor-pointer"
          >
            <div className="w-8 flex justify-center items-center flex-shrink-0">
              <FiLogOut size={20} />
            </div>

            <span
              className={`
                ml-4 whitespace-nowrap
                ${expanded ? "md:block" : "md:hidden"}
                block
              `}
            >
              Logout
            </span>
          </button>

        </nav>
      </aside>

      {/* ================= MAIN CONTENT ================= */}
      <main
        className="
          min-h-screen
          bg-[#f5f7ff]
          p-4 sm:p-6 lg:p-8
          pt-20 md:pt-8
          ml-0 md:ml-20
        "
      >
        {children}
      </main>

    </div>
  );
};

export default AdminLayout;