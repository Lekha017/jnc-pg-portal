import { Link } from "react-router-dom";
import { Phone, Mail } from "lucide-react";
import Logo from "../common/Logo";

const Header = () => {
  return (
    <header className="w-full bg-white">

      {/* ================= TOP BAR ================= */}

      <div className="bg-[#4B4B7C] text-white">
        <div className="max-w-[1300px] mx-auto px-4 h-[50px] flex items-center justify-between">

          {/* Left */}
          <div className="hidden lg:flex items-center gap-4 text-[14px]">

            <span className="cursor-pointer hover:underline">IQAC</span>

            <span>|</span>

            <span className="cursor-pointer hover:underline">NIRF</span>

            <span>|</span>

            <span className="cursor-pointer hover:underline">ARIIA</span>

            <span>|</span>

            <span className="cursor-pointer hover:underline">MOUS</span>

            <span>|</span>

            <span className="cursor-pointer hover:underline">IIC</span>

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
          <div className="flex items-center gap-3 ml-auto">

            <button
              className="
      bg-[#FF2D55]
      hover:bg-[#e6264c]
      text-white
      text-[13px]
      font-medium
      px-7
      py-[11px]
      rounded
      transition-all
      duration-200
    "
            >
              ONLINE PAYMENT
            </button>

            <Link to="/admissions">
              <button
                className="
        bg-[#FF2D55]
        hover:bg-[#e6264c]
        text-white
        text-[13px]
        font-medium
        px-7
        py-[11px]
        rounded
        transition-all
        duration-200
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

        <div className="max-w-[1300px] mx-auto px-6 py-3 flex items-center justify-between">

          {/* Logo */}

          <Link to="/" className="flex-1 flex items-center">
            <Logo className="w-[650px] h-auto" />
          </Link>

          {/* Statistics */}

          <div className="hidden lg:flex items-center gap-[58px] text-center">

            <div>
              <h2
                className="text-[20px] font-bold leading-none"
                style={{ fontFamily: "Georgia, serif" }}
              >
                59
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