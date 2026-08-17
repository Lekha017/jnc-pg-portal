import { useState } from "react";
import {
  Menu,
  X,
  UserIcon,
  ArrowLeftCircle,
  ChevronDown,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../context/AuthContext";
import DepartmentDropdown from "./DepartmentDropdown";

function Navbar() {
  const { user } = useAuth();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [userOpen, setUserOpen] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);

  const location = useLocation();
  const navigate = useNavigate();

  const isHomePage = location.pathname === "/home";

  const isActive = (path) => location.pathname === path;

  const closeMobileMenu = () => {
    setMobileOpen(false);
    setMobileDropdown(null);
  };

  const toggleMobileDropdown = (name) => {
    setMobileDropdown((prev) => (prev === name ? null : name));
  };

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/");
    }
  };

  const navItem = (label, path) => (
    <Link
      to={path}
      className={`px-3 xl:px-4 py-2 rounded-full text-[11px] xl:text-[12px] font-bold transition whitespace-nowrap ${
        isActive(path)
          ? "bg-[#FF2D55] text-white"
          : "text-[#2C2C2C] hover:text-[#FF2D55]"
      }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="w-full bg-[#f5f5f5] border-t border-gray-200 relative z-40">
      {/* =========================================================
          DESKTOP NAVBAR
          ========================================================= */}
      <div className="hidden lg:flex items-center justify-center max-w-[1300px] mx-auto px-4 xl:px-6 min-h-[55px] relative">
        {/* LEFT / MAIN NAVIGATION */}
        <div className="flex items-center justify-center gap-3 xl:gap-5 text-[13px] font-medium tracking-normal min-w-0">
          {/* BACK BUTTON */}
          {!isHomePage && (
            <button
              type="button"
              aria-label="Go back"
              onClick={goBack}
              className="shrink-0 text-[#2f2f6f] hover:scale-110 transition"
            >
              <ArrowLeftCircle size={30} />
            </button>
          )}

          {/* HOME */}
          {navItem("HOME", "/home")}

          {/* =====================================================
              ABOUT US
              ===================================================== */}
          <div className="relative group shrink-0">
            <button
              type="button"
              className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55] py-2"
            >
              ABOUT US
              <span className="text-[10px]">▾</span>
            </button>

            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
              <div className="w-[min(700px,90vw)] max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-3 gap-6 xl:gap-10">
                  <Column
                    title="Administration"
                    items={[
                      {
                        label: "Organization Structure",
                        path: "/organization-structure",
                      },
                      {
                        label: "Management",
                        path: "/management",
                      },
                      {
                        label: "Governing Body",
                        path: "/governing-body",
                      },
                      {
                        label: "Governing Council",
                        path: "/governing-council",
                      },
                      {
                        label: "Principal's Message",
                        path: "/principal-message",
                      },
                      {
                        label: "Academic Council",
                        path: "/academic-council",
                      },
                      {
                        label: "Examination Cell",
                        path: "/examination-cell",
                      },
                      {
                        label: "Chief Coordinators",
                        path: "/chief-coordinators",
                      },
                      {
                        label: "Deans",
                        path: "/deans",
                      },
                      {
                        label: "Administrative Staff",
                        path: "/administrative-staff",
                      },
                      {
                        label: "Staff Welfare Services",
                        path: "/staff-welfare-services",
                      },
                    ]}
                  />

                  <Column
                    title="Introduction"
                    items={[
                      {
                        label: "History & Milestones",
                        path: "/history-milestones",
                      },
                      {
                        label: "Institutional Best Practices",
                        path: "/best-practices",
                      },
                      {
                        label: "Institutional Distinctiveness",
                        path: "/institutional-distinctiveness",
                      },
                    ]}
                  />

                  <Column
                    title="JNC Timeline"
                    items={[
                      {
                        label: "Campus Culture",
                        path: "/campus-culture",
                      },
                      {
                        label: "Annual Reports",
                        path: "#",
                      },
                      {
                        label:
                          "Glimpse of College Achievements & Activities",
                        path: "https://www.youtube.com/watch?v=_rjTLOrKMM4",
                        external: true,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              ACADEMICS
              ===================================================== */}
          <div className="relative group shrink-0">
            <button
              type="button"
              className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55] py-2"
            >
              ACADEMICS
              <span className="text-[10px]">▾</span>
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
              <div className="max-h-[70vh] overflow-y-auto">
                <DepartmentDropdown />
              </div>
            </div>
          </div>

          {/* =====================================================
              INFRASTRUCTURE
              ===================================================== */}
          <div className="relative group shrink-0">
            <button
              type="button"
              className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55] py-2"
            >
              INFRASTRUCTURE
              <span className="text-[10px]">▾</span>
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
              <div className="w-[min(700px,90vw)] max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-3 gap-6 xl:gap-10">
                  {/* COLUMN 1 */}
                  <div className="space-y-2">
                    <InfrastructureLink
                      to="/infrastructure/auditorium"
                      label="Auditorium"
                    />

                    <a
                      href="https://linktr.ee/jnclibrary"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Digital Library
                    </a>

                    <InfrastructureLink
                      to="/infrastructure/food-court"
                      label="Food Court"
                    />

                    <InfrastructureLink
                      to="/infrastructure/hostel"
                      label="Hostel"
                    />

                    <InfrastructureLink
                      to="/infrastructure/medical-room"
                      label="Medical Room"
                    />

                    <InfrastructureLink
                      to="/infrastructure/board-room"
                      label="Board Room"
                    />

                    <InfrastructureLink
                      to="/infrastructure/meditation-room"
                      label="Meditation Room"
                    />

                    <InfrastructureLink
                      to="/infrastructure/conference-hall"
                      label="Conference Hall"
                    />

                    <InfrastructureLink
                      to="/infrastructure/video-studio"
                      label="Video Studio"
                    />
                  </div>

                  {/* COLUMN 2 */}
                  <div className="space-y-2">
                    <InfrastructureLink
                      to="/infrastructure/chapel"
                      label="Chapel"
                    />

                    <InfrastructureLink
                      to="/infrastructure/gymnasium"
                      label="Gymnasium"
                    />

                    <InfrastructureLink
                      to="/infrastructure/indoor-games-room"
                      label="Indoor Games Room"
                    />

                    <InfrastructureLink
                      to="/infrastructure/bank"
                      label="Bank"
                    />

                    <InfrastructureLink
                      to="/infrastructure/parking"
                      label="Parking"
                    />

                    <InfrastructureLink
                      to="/infrastructure/audio-studio"
                      label="Audio Studio"
                    />

                    <InfrastructureLink
                      to="/infrastructure/media-lab"
                      label="Media Lab"
                    />

                    <InfrastructureLink
                      to="/infrastructure/innovation-lab"
                      label="Innovation Lab"
                    />

                    <InfrastructureLink
                      to="/infrastructure/media-incubation-centre"
                      label="Media Incubation Centre"
                    />
                  </div>

                  {/* COLUMN 3 */}
                  <Column
                    items={[
                      {
                        label: "Zoological Museum",
                        path: "/infrastructure/zoological-museum",
                      },
                      {
                        label: "Language Lab",
                        path: "/infrastructure/language-lab",
                      },
                      {
                        label: "Student Union Room",
                        path: "/infrastructure/student-union-room",
                      },
                      {
                        label: "Performing Arts Studio",
                        path: "/infrastructure/performing-arts",
                      },
                      {
                        label: "Maintenance Policy",
                        path: "/infrastructure/maintenance-policy",
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* =====================================================
              ADMISSIONS
              ===================================================== */}
          <div className="relative group shrink-0">
            <button
              type="button"
              className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55] py-2"
            >
              ADMISSIONS
              <span className="text-[10px]">▾</span>
            </button>

            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
              <div className="w-72 max-w-[90vw] bg-white rounded-lg shadow-lg py-2">
                <Link
                  to="/admission-portal"
                  className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                >
                  Apply Now (PG)
                </Link>

                <Link
                  to="/admissionsnavbar/online-payment"
                  className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                >
                  Online Payment
                </Link>

                <a
                  href="https://www.jyotinivas.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                >
                  Undergraduate Programme
                </a>

                <Link
                  to="/prospectus"
                  className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                >
                  Prospectus
                </Link>

                <Link
                  to="/dhwani"
                  className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                >
                  Dhwani 2024-25
                </Link>

                <a
                  href="https://jnpuc.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                >
                  PUC
                </a>
              </div>
            </div>
          </div>

          {/* LIBRARY */}
          <Link
            to="/library"
            className="cursor-pointer hover:text-[#FF2D55] text-[11px] xl:text-[12px] whitespace-nowrap"
          >
            LIBRARY AND INFO CENTRE
          </Link>
        </div>

        {/* =======================================================
            DESKTOP USER
            ======================================================= */}
        <div className="absolute right-3 xl:right-6 flex items-center">
          <div className="relative">
            <button
              type="button"
              onClick={() => setUserOpen((prev) => !prev)}
              aria-label="User menu"
              className="p-2 rounded-full hover:bg-gray-100 transition"
            >
              <UserIcon className="w-6 h-6 text-gray-700" />
            </button>

            {userOpen && (
              <UserMenu
  user={user}
  navigate={navigate}
  closeUserMenu={() => setUserOpen(false)}
  className="absolute right-0 top-full mt-2 w-60"
/>
            )}
          </div>
        </div>
      </div>

      {/* =========================================================
          MOBILE / TABLET NAVBAR
          ========================================================= */}
      <div className="lg:hidden">
        {/* MOBILE HEADER BAR */}
        <div className="min-h-[56px] px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            {!isHomePage && (
              <button
                type="button"
                onClick={goBack}
                aria-label="Go back"
                className="shrink-0 text-[#2f2f6f]"
              >
                <ArrowLeftCircle size={27} />
              </button>
            )}

            <Link
              to="/home"
              onClick={closeMobileMenu}
              className="font-semibold text-[#2F2F6F] text-sm sm:text-base"
            >
              JNC PG
            </Link>
          </div>

          <div className="flex items-center gap-1">
            {/* USER BUTTON */}
            <button
              type="button"
              onClick={() => setUserOpen((prev) => !prev)}
              aria-label="User menu"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <UserIcon className="w-5 h-5 sm:w-6 sm:h-6 text-gray-700" />
            </button>

            {/* MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="p-2 rounded-md hover:bg-gray-200 transition"
            >
              {mobileOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* MOBILE USER DROPDOWN */}
        {userOpen && (
          <div className="px-4 sm:px-6 pb-3">
            <UserMenu
              user={user}
              navigate={navigate}
              closeUserMenu={() => setUserOpen(false)}
            />
          </div>
        )}

        {/* MOBILE MENU */}
        {mobileOpen && (
          <div className="border-t border-gray-200 bg-white shadow-sm px-4 sm:px-6 py-3 max-h-[calc(100vh-56px)] overflow-y-auto">
            {/* HOME */}
            <MobileLink
              to="/home"
              label="HOME"
              active={isActive("/home")}
              onClick={closeMobileMenu}
            />

            {/* ABOUT US */}
            <MobileDropdown
              title="ABOUT US"
              name="about"
              open={mobileDropdown === "about"}
              onClick={() => toggleMobileDropdown("about")}
            >
              <MobileSection title="Administration">
                <MobileLink
                  to="/organization-structure"
                  label="Organization Structure"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/management"
                  label="Management"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/governing-body"
                  label="Governing Body"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/governing-council"
                  label="Governing Council"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/principal-message"
                  label="Principal's Message"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/academic-council"
                  label="Academic Council"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/examination-cell"
                  label="Examination Cell"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/chief-coordinators"
                  label="Chief Coordinators"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/deans"
                  label="Deans"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/administrative-staff"
                  label="Administrative Staff"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/staff-welfare-services"
                  label="Staff Welfare Services"
                  onClick={closeMobileMenu}
                />
              </MobileSection>

              <MobileSection title="Introduction">
                <MobileLink
                  to="/history-milestones"
                  label="History & Milestones"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/best-practices"
                  label="Institutional Best Practices"
                  onClick={closeMobileMenu}
                />
                <MobileLink
                  to="/institutional-distinctiveness"
                  label="Institutional Distinctiveness"
                  onClick={closeMobileMenu}
                />
              </MobileSection>

              <MobileSection title="JNC Timeline">
                <MobileLink
                  to="/campus-culture"
                  label="Campus Culture"
                  onClick={closeMobileMenu}
                />

                <a
                  href="https://www.youtube.com/watch?v=_rjTLOrKMM4"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm text-gray-700 hover:text-[#FF2D55]"
                >
                  Glimpse of College Achievements & Activities
                </a>
              </MobileSection>
            </MobileDropdown>

            {/* ACADEMICS */}
            <MobileDropdown
              title="ACADEMICS"
              name="academics"
              open={mobileDropdown === "academics"}
              onClick={() => toggleMobileDropdown("academics")}
            >
              <div className="px-1 py-2 overflow-x-auto">
                <DepartmentDropdown />
              </div>
            </MobileDropdown>

            {/* INFRASTRUCTURE */}
            <MobileDropdown
              title="INFRASTRUCTURE"
              name="infrastructure"
              open={mobileDropdown === "infrastructure"}
              onClick={() => toggleMobileDropdown("infrastructure")}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                <MobileLink
                  to="/infrastructure/auditorium"
                  label="Auditorium"
                  onClick={closeMobileMenu}
                />

                <a
                  href="https://linktr.ee/jnclibrary"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMobileMenu}
                  className="block py-2 text-sm text-gray-700 hover:text-[#FF2D55]"
                >
                  Digital Library
                </a>

                <MobileInfrastructureLinks
                  closeMobileMenu={closeMobileMenu}
                />
              </div>
            </MobileDropdown>

            {/* ADMISSIONS */}
            <MobileDropdown
              title="ADMISSIONS"
              name="admissions"
              open={mobileDropdown === "admissions"}
              onClick={() => toggleMobileDropdown("admissions")}
            >
              <MobileLink
                to="/admission-portal"
                label="Apply Now (PG)"
                onClick={closeMobileMenu}
              />

              <MobileLink
                to="/admissionsnavbar/online-payment"
                label="Online Payment"
                onClick={closeMobileMenu}
              />

              <a
                href="https://www.jyotinivas.org/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="block py-2 text-sm text-gray-700 hover:text-[#FF2D55]"
              >
                Undergraduate Programme
              </a>

              <MobileLink
                to="/prospectus"
                label="Prospectus"
                onClick={closeMobileMenu}
              />

              <MobileLink
                to="/dhwani"
                label="Dhwani 2024-25"
                onClick={closeMobileMenu}
              />

              <a
                href="https://jnpuc.org/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMobileMenu}
                className="block py-2 text-sm text-gray-700 hover:text-[#FF2D55]"
              >
                PUC
              </a>
            </MobileDropdown>

            {/* LIBRARY */}
            <MobileLink
              to="/library"
              label="LIBRARY AND INFO CENTRE"
              onClick={closeMobileMenu}
            />
          </div>
        )}
      </div>
    </nav>
  );
}

/* ===============================================================
   DESKTOP DROPDOWN COLUMN
   =============================================================== */

const Column = ({ title, items = [] }) => (
  <div className="space-y-2 min-w-0">
    {title && (
      <p className="font-semibold text-[#2F2F6F] text-sm mb-2">
        {title}
      </p>
    )}

    {items.map((item, i) =>
      item.external ? (
        <a
          key={i}
          href={item.path}
          target="_blank"
          rel="noopener noreferrer"
          className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
        >
          {item.label}
        </a>
      ) : (
        <Link
          key={i}
          to={item.path}
          className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
        >
          {item.label}
        </Link>
      )
    )}
  </div>
);

/* ===============================================================
   INFRASTRUCTURE LINK
   =============================================================== */

const InfrastructureLink = ({ to, label }) => (
  <Link
    to={to}
    className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
  >
    {label}
  </Link>
);

/* ===============================================================
   MOBILE DROPDOWN
   =============================================================== */

const MobileDropdown = ({
  title,
  open,
  onClick,
  children,
}) => (
  <div className="border-b border-gray-100">
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center justify-between py-3 text-sm font-semibold text-gray-800"
    >
      <span>{title}</span>

      <ChevronDown
        size={18}
        className={`transition-transform ${
          open ? "rotate-180" : ""
        }`}
      />
    </button>

    {open && (
      <div className="pb-3 pl-2 pr-1">
        {children}
      </div>
    )}
  </div>
);

/* ===============================================================
   MOBILE SECTION
   =============================================================== */

const MobileSection = ({ title, children }) => (
  <div className="mb-3">
    <p className="text-xs font-bold uppercase text-[#2F2F6F] mb-1">
      {title}
    </p>

    <div className="pl-2">
      {children}
    </div>
  </div>
);

/* ===============================================================
   MOBILE LINK
   =============================================================== */

const MobileLink = ({
  to,
  label,
  active = false,
  onClick,
}) => (
  <Link
    to={to}
    onClick={onClick}
    className={`block py-3 text-sm font-medium border-b border-gray-100 ${
      active
        ? "text-[#FF2D55]"
        : "text-gray-800 hover:text-[#FF2D55]"
    }`}
  >
    {label}
  </Link>
);

/* ===============================================================
   MOBILE INFRASTRUCTURE LINKS
   =============================================================== */

const MobileInfrastructureLinks = ({
  closeMobileMenu,
}) => {
  const links = [
    ["food-court", "Food Court"],
    ["hostel", "Hostel"],
    ["medical-room", "Medical Room"],
    ["board-room", "Board Room"],
    ["meditation-room", "Meditation Room"],
    ["conference-hall", "Conference Hall"],
    ["video-studio", "Video Studio"],
    ["chapel", "Chapel"],
    ["gymnasium", "Gymnasium"],
    ["indoor-games-room", "Indoor Games Room"],
    ["bank", "Bank"],
    ["parking", "Parking"],
    ["audio-studio", "Audio Studio"],
    ["media-lab", "Media Lab"],
    ["innovation-lab", "Innovation Lab"],
    [
      "media-incubation-centre",
      "Media Incubation Centre",
    ],
    ["zoological-museum", "Zoological Museum"],
    ["language-lab", "Language Lab"],
    ["student-union-room", "Student Union Room"],
    ["performing-arts", "Performing Arts Studio"],
    ["maintenance-policy", "Maintenance Policy"],
  ];

  return (
    <>
      {links.map(([path, label]) => (
        <MobileLink
          key={path}
          to={`/infrastructure/${path}`}
          label={label}
          onClick={closeMobileMenu}
        />
      ))}
    </>
  );
};

/* ===============================================================
   USER MENU
   =============================================================== */

const UserMenu = ({
  user,
  navigate,
  closeUserMenu,
  className = "",
}) => (
  <div
    className={`${className} w-full sm:w-60 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden`}
  >
    {user ? (
      <>
        <p className="px-4 py-3 text-sm text-gray-500 border-b">
          Welcome, {user.fullName || user.email}
        </p>

        {user.role === "admin" && (
          <Link to="/admin">
            <button
              type="button"
              onClick={closeUserMenu}
              className="w-full text-left text-gray-600 px-4 py-3 hover:bg-gray-100 transition"
            >
              Admin Dashboard
            </button>
          </Link>
        )}

        {user.role === "faculty" && (
          <Link to="/faculty/dashboard">
            <button
              type="button"
              onClick={closeUserMenu}
              className="w-full text-left text-gray-600 px-4 py-3 hover:bg-gray-100 transition"
            >
              Faculty Dashboard
            </button>
          </Link>
        )}

        <div className="px-2 py-2">
          <LogoutButton onLogout={closeUserMenu} />
        </div>
      </>
    ) : (
      <button
        type="button"
        onClick={() => {
          navigate("/login");
          closeUserMenu();
        }}
        className="w-full text-left px-4 py-3 hover:bg-gray-100 transition"
      >
        Login
      </button>
    )}
  </div>
);

export default Navbar;