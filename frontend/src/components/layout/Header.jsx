import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import Logo from "../common/Logo";

const Header = () => {
  return (
    <header className="w-full bg-white overflow-x-hidden">

      {/* ================= TOP BAR ================= */}

      <div className="bg-[#4B4B7C] text-white">
        <div className="max-w-[1300px] mx-auto px-4 sm:px-5 lg:px-6 min-h-[50px] flex flex-col sm:flex-row items-center justify-between gap-2 py-2 sm:py-0">

          {/* Left */}
          <div className="hidden lg:flex items-center gap-4 text-[14px]">

            <a
              href="https://www.jyotinivas.org/iqac.php"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline"
            >
              IQAC
            </a>

            <span>|</span>

            <a
              href="https://www.jyotinivas.org/nirf.php"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline"
            >
              NIRF
            </a>

            <span>|</span>

            <Link to="/ARIIA" className="cursor-pointer hover:underline">
              ARIIA
            </Link>

            <span>|</span>

            <a
              href="https://www.jyotinivas.org/mous.php"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline"
            >
              MOUS
            </a>

            <span>|</span>

            <a
              href="https://www.jyotinivas.org/iic.php"
              target="_blank"
              rel="noopener noreferrer"
              className="cursor-pointer hover:underline"
            >
              IIC
            </a>

            <span>|</span>

            <div className="flex items-center gap-2">
              <Phone size={15} />
              <span>Tel: 080 25530137</span>
            </div>

            <span>|</span>

            <div className="flex items-center gap-2">
              <Mail size={15} />
              <span>info@jyotinivas.org</span>
            </div>

          </div>

          {/* Right */}
          <div className="flex items-center justify-center sm:justify-end gap-2 sm:gap-3 w-full lg:w-auto ml-auto">

            <Link to="/admissionsnavbar/online-payment">
              <button
                className="
                  bg-[#FF2D55]
                  hover:bg-[#e6264c]
                  text-white
                  text-[11px] sm:text-[12px] lg:text-[13px]
                  font-medium
                  px-4 sm:px-5 lg:px-7
                  py-[9px] sm:py-[10px] lg:py-[11px]
                  rounded
                  transition-all
                  duration-200
                  whitespace-nowrap
                "
              >
                ONLINE PAYMENT
              </button>
            </Link>

            <Link to="/admissions">
              <button
                className="
                  bg-[#FF2D55]
                  hover:bg-[#e6264c]
                  text-white
                  text-[11px] sm:text-[12px] lg:text-[13px]
                  font-medium
                  px-4 sm:px-5 lg:px-7
                  py-[9px] sm:py-[10px] lg:py-[11px]
                  rounded
                  transition-all
                  duration-200
                  whitespace-nowrap
                "
              >
                ADMISSIONS 2026-2027
              </button>
            </Link>

          </div>

        </div>
      </div>

      {/* ================= LOGO + STATS ================= */}

      <div className="border-b border-gray-200">

        <div className="max-w-[1300px] mx-auto px-4 sm:px-5 lg:px-6 py-3 sm:py-4 lg:py-3 flex flex-col lg:flex-row items-center justify-between gap-4 lg:gap-6">

          {/* Logo */}

          <Link
            to="/"
            className="w-full lg:flex-1 flex items-center justify-center lg:justify-start min-w-0"
          >
            <Logo className="w-full max-w-[650px] h-auto" />
          </Link>

          {/* Statistics */}

          <div className="hidden lg:flex items-center gap-[35px] xl:gap-[58px] text-center shrink-0">

            <div>
              <h2
                className="text-[20px] font-bold leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                60
              </h2>

              <p
                className="text-[13px] mt-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Years
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-bold leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                6
              </h2>

              <p
                className="text-[11px] mt-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Streams
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-bold leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                43
              </h2>

              <p
                className="text-[11px] mt-1"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Programmes
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-bold leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                64th
              </h2>

              <p
                className="text-[11px] mt-1 whitespace-nowrap"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Best College in India
              </p>
            </div>

            <div>
              <h2
                className="text-[20px] font-bold leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                5th
              </h2>

              <p
                className="text-[11px] mt-1 whitespace-nowrap"
                style={{ fontFamily: "Georgia, serif" }}
              >
                Best College in Karnataka
              </p>
            </div>

          </div>

        </div>

      </div>

    </header>
  );
};

export default Header;