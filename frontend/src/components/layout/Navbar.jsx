import { useState } from "react";
import { Menu, X, UserIcon, ArrowLeftCircle } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import { useAuth } from "../../context/AuthContext";
import DepartmentDropdown from "./DepartmentDropdown";

function Navbar() {
  const { user } = useAuth();

  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/home";
  const isActive = (path) => location.pathname === path;

  const navItem = (label, path) => (
    <Link
      to={path}
      className={`px-4 py-[6px] rounded-full text-[12px] font-bold transition
        ${isActive(path)
          ? "bg-[#FF2D55] text-white"
          : "text-[#2C2C2C] hover:text-[#FF2D55]"
        }`}
    >
      {label}
    </Link>
  );

  return (
    <nav className="bg-[#f5f5f5] border-t border-gray-200 relative">

      {/* DESKTOP */}
      <div className="hidden lg:flex items-center justify-center max-w-[1300px] mx-auto px-6 h-[55px] relative">

        {/* LEFT */}
       <div className="flex items-center justify-center gap-5 text-[13px] font-medium tracking-normal">
          {!isHomePage && (
            <ArrowLeftCircle
              size={32}
              className="cursor-pointer text-[#2f2f6f] hover:scale-110 transition"
              onClick={() => {
                if (window.history.length > 1) {
                  navigate(-1);
                } else {
                  navigate("/");
                }
              }}
            />
          )}
          {navItem("HOME", "/home")}

          <div className="relative group">
            <span className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55]">
              ABOUT US <span className="text-[10px]">▾</span>
            </span>

            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
              <div className="w-[700px] bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-3 gap-10">
                  <Column
                    title="Administration"
                    items={[
                      { label: "Organization Structure", path: "/organization-structure" },
                      { label: "Management", path: "/management" },
                      { label: "Governing Body", path: "/governing-body" },
                      { label: "Governing Council", path: "/governing-council" },
                      { label: "Principal's Message", path: "/principal-message" },
                      { label: "Academic Council", path: "/academic-council" },
                      { label: "Examination Cell", path: "/examination-cell" },
                      { label: "Chief Coordinators", path: "/chief-coordinators" },
                      { label: "Deans", path: "/deans" },
                      { label: "Administrative Staff", path: "/administrative-staff" },
                      { label: "Staff Welfare Services", path: "/staff-welfare-services" },
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

<<<<<<< HEAD
        <Column
  title="JNC Timeline"
  items={[
    {
      label: "Campus Culture",
      path: "/campus-culture",
    },
    {
      label: "Annual Reports",
      
    },
    {
      label: "Glimpse of College Achievements & Activities",
      path: "https://www.youtube.com/watch?v=_rjTLOrKMM4",
      external: true,
    },
  ]}
/>
      </div>
    </div>
  </div>
</div>
=======
                  <Column
                    title="JNC Timeline"
                    items={[
                      {
                        label: "Campus Culture",
                        path: "/campus-culture",
                      },
                      {
                        label: "Annual Reports",
                        path: "/annual-reports",
                      },
                      {
                        label: "Glimpse of College Achievements & Activities",
                        path: "https://www.youtube.com/watch?v=_rjTLOrKMM4",
                        external: true,
                      },
                    ]}
                  />
                </div>
              </div>
            </div>
          </div>
>>>>>>> ac181fc (added admission pages and resolved chatbot issue)

          <div className="relative group">
            <span className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55]">
              ACADEMICS <span className="text-[10px]">▾</span>
            </span>

            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
              <DepartmentDropdown />
            </div>
          </div>

          <div className="relative group">
            <span className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55]">
              INFRASTRUCTURE <span className="text-[10px]">▾</span>
            </span>

            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
              <div className="w-[700px] bg-white rounded-lg shadow-lg p-6">
                <div className="grid grid-cols-3 gap-10">
                  <div className="space-y-2">

                    <Link
                      to="/infrastructure/auditorium"
                      className="
                        px-2
                        py-1
                        rounded
                        text-[13px]
                        text-gray-700
                        hover:bg-[#F5F3FF]
                        hover:text-[#2F2F6F]
                        cursor-pointer
                        transition
                        block
                      "
                    >
                      Auditorium
                    </Link>

                    <div className="space-y-2">

                      <a
                        href="https://linktr.ee/jnclibrary"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                      >
                        Digital Library
                      </a>

                      <Link
                        to="/infrastructure/food-court"
                        className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                      >
                        Food Court
                      </Link>

                      <Link
                        to="/infrastructure/hostel"
                        className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                      >
                        Hostel
                      </Link>

                      <Link
                        to="/infrastructure/medical-room"
                        className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                      >
                        Medical Room
                      </Link>

                      <Link
                        to="/infrastructure/board-room"
                        className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                      >
                        Board Room
                      </Link>

                      <Link
                        to="/infrastructure/meditation-room"
                        className=" block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF]  hover:text-[#2F2F6F] transition"
                      >
                        Meditation Room
                      </Link>

                      <Link
                        to="/infrastructure/conference-hall"
                        className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                      >
                        Conference Hall
                      </Link>

                      <Link
                        to="/infrastructure/video-studio"
                        className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                      >
                        Video Studio
                      </Link>

                    </div>

                  </div>

                  <div className="space-y-2">

                    <Link
                      to="/infrastructure/chapel"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Chapel
                    </Link>

                    <Link
                      to="/infrastructure/gymnasium"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Gymnasium
                    </Link>

                    <Link
                      to="/infrastructure/indoor-games-room"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Indoor Games Room
                    </Link>

                    <Link
                      to="/infrastructure/bank"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Bank
                    </Link>

                    <Link
                      to="/infrastructure/parking"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Parking
                    </Link>

                    <Link
                      to="/infrastructure/audio-studio"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Audio Studio
                    </Link>

                    <Link
                      to="/infrastructure/media-lab"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Media Lab
                    </Link>

                    <Link
                      to="/infrastructure/innovation-lab"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Innovation Lab
                    </Link>

                    
                    <Link
                      to="/infrastructure/media-incubation-centre"
                      className="block px-2 py-1 rounded text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                    >
                      Media Incubation Centre
                    </Link>

                  </div>

<<<<<<< HEAD
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
=======
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
>>>>>>> ac181fc (added admission pages and resolved chatbot issue)
                </div>
              </div>
            </div>
          </div>

          <div className="relative group">
            <span className="cursor-pointer flex items-center gap-1 hover:text-[#FF2D55]">
              ADMISSIONS <span className="text-[10px]">▾</span>
            </span>

            <div className="absolute top-full left-0 pt-2 hidden group-hover:block z-50">
              <div className="w-72 bg-white rounded-lg shadow-lg py-2">

                <a
                  href="https://www.jyotinivas.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block px-5 py-2 text-[13px] text-gray-700 hover:bg-[#F5F3FF] hover:text-[#2F2F6F] transition"
                >
                  Online Payment
                </a>

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

          {/* ✅ FIXED: LIBRARY LINK */}
          <Link
            to="/library"
            className="cursor-pointer hover:text-[#FF2D55]"
          >
            LIBRARY AND INFO CENTRE
          </Link>

        </div>

        {/* RIGHT */}
      <div className="absolute right-6 flex items-center gap-6">

          <div className="relative z-10">
            <button
              onClick={() => setOpen(!open)}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <UserIcon className="w-6 h-6 text-gray-700" />
            </button>

            {open && (
              <div className="absolute right-0 mt-3 w-60 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">

                {user ? (
                  <>
                    <p className="px-4 py-2 text-sm text-gray-500">
                      Welcome, {user.fullName || user.email}
                    </p>

                    {user.role === "admin" && (
                      <Link to="/admin">
                        <button
                          onClick={() => setOpen(false)}
                          className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100"
                        >
                          Admin Dashboard
                        </button>
                      </Link>
                    )}

                    {user.role === "faculty" && (
                      <>
                        <Link to="/faculty/edit-profile">
                          <button
                            onClick={() => setOpen(false)}
                            className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100"
                          >
                            My Profile
                          </button>
                        </Link>

                        <Link to="/faculty/dashboard">
                          <button
                            onClick={() => setOpen(false)}
                            className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100"
                          >
                            Faculty Dashboard
                          </button>
                        </Link>
                      </>
                    )}

                    <div className="px-2 py-2">
                      <LogoutButton onLogout={() => setOpen(false)} />
                    </div>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/login");
                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </button>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* MOBILE */}
      <div className="lg:hidden flex justify-between px-4 py-3">
        <span>Menu</span>
        <button onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden px-4 pb-4 space-y-2 text-sm font-semibold">
          <Link to="/home">Home</Link>
          <p>About Us</p>
          <p>Academics</p>
          <p>Student Support</p>
          <p>Infrastructure</p>
          <p>Admissions</p>
          {user ? (
            <>
              <p className="px-4 py-2 text-sm text-gray-500">
                Welcome, {user.fullName || user.email}
              </p>

              {user.role === "admin" && (
                <Link to="/admin">
                  <button
                    onClick={() => setOpen(false)}
                    className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100"
                  >
                    Admin Dashboard
                  </button>
                </Link>
              )}

              {user.role === "faculty" && (
                <>
                  <Link to="/faculty/edit-profile">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100"
                    >
                      My Profile
                    </button>
                  </Link>

                  <Link to="/faculty/dashboard">
                    <button
                      onClick={() => setOpen(false)}
                      className="w-full text-left text-gray-600 px-4 py-2 hover:bg-gray-100"
                    >
                      Faculty Dashboard
                    </button>
                  </Link>
                </>
              )}

              <div className="px-2 py-2">
                <LogoutButton onLogout={() => setOpen(false)} />
              </div>
            </>
          ) : (
            <button
              onClick={() => {
                navigate("/login");
                setOpen(false);
              }}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
}

const Column = ({ title, items }) => (
  <div className="space-y-2">
    {title && <p className="font-semibold">{title}</p>}

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

export default Navbar;