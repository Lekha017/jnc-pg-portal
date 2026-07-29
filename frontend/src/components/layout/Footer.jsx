import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { Link } from "react-router-dom";
import footerLogo from "../../assets/jnc-footer-logo.png";
import cyber from "../../assets/cyber.png";

const Footer = () => {
  return (
    <footer className="bg-[#3A356B] text-white mt-0">

      {/* ================= MAIN FOOTER ================= */}

      <div className="max-w-[1300px] mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* COLUMN 1 */}

        <div>

          <img
            src={footerLogo}
            alt="JNC Footer Logo"
            className="w-[110px] mb-5"
          />

          <div className="text-[12.5px] text-gray-300 leading-[20px]">

            <p className="font-medium text-white">
              Jyoti Nivas College Autonomous
            </p>

            <p>Hosur Road, Koramangala</p>

            <p>Bengaluru - 560095</p>

            <p className="mt-3">
              Phone: 080 25530137
            </p>

            <p>
              Email: info@jyotinivas.org
            </p>

          </div>

        </div>

        {/* COLUMN 2 */}

        <div>

          <h3 className="text-[15px] font-semibold">
            Important Links
            <span className="block w-[140px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <ul className="mt-5 space-y-3 text-[13px] text-gray-300">

            <li>
              <Link to="/" className="hover:text-white">
                Apply Now
              </Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-white">
                Student Login
              </Link>
            </li>

            <li>
              <Link to="/login" className="hover:text-white">
                Faculty Login
              </Link>
            </li>

            <li className="hover:text-white cursor-pointer">
              Online Class
            </li>

            <li className="hover:text-white cursor-pointer">
              MIS
            </li>

            <li className="hover:text-white cursor-pointer">
              ECRF
            </li>

          </ul>

        </div>

        {/* COLUMN 3 */}

        <div>

          <h3 className="text-[15px] font-semibold">
            Useful Links
            <span className="block w-[140px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <ul className="mt-5 space-y-3 text-[13px] text-gray-300">

            <li className="hover:text-white cursor-pointer">
              › Career
            </li>

            <li className="hover:text-white cursor-pointer">
              › Bengaluru City University
            </li>

            <li className="hover:text-white cursor-pointer">
              › NAAC
            </li>

            <li className="hover:text-white cursor-pointer">
              › UGC
            </li>

            <li className="hover:text-white cursor-pointer">
              › Online Academic Resources
            </li>

          </ul>

         <img
  src={cyber}
  alt="Cyber Security"
  className="w-[160px] mt-5"
/>

        </div>

        {/* COLUMN 4 */}

        <div>

          <h3 className="text-[15px] font-semibold">
            Connect Us
            <span className="block w-[140px] h-[1px] bg-gray-400 mt-2"></span>
          </h3>

          <div className="flex gap-3 mt-6">

            <a
              href="#"
              className="bg-[#2F2A5A] p-2 rounded-sm hover:bg-[#FF2D55] transition"
            >
              <FaFacebookF size={15} />
            </a>

            <a
              href="#"
              className="bg-[#2F2A5A] p-2 rounded-sm hover:bg-[#FF2D55] transition"
            >
              <FaInstagram size={15} />
            </a>

            <a
              href="#"
              className="bg-[#2F2A5A] p-2 rounded-sm hover:bg-[#FF2D55] transition"
            >
              <FaLinkedinIn size={15} />
            </a>

            <a
              href="#"
              className="bg-[#2F2A5A] p-2 rounded-sm hover:bg-[#FF2D55] transition"
            >
              <FaYoutube size={15} />
            </a>

          </div>

        </div>

      </div>

      {/* ================= COPYRIGHT ================= */}

      <div className="bg-[#2F2A5A] text-center py-3 text-[13px] text-gray-300">

        © 2025 Jyoti Nivas College Autonomous, Bengaluru | Affiliated to Bengaluru City University

      </div>

    </footer>
  );
};

export default Footer;