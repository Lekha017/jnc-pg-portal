import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import footerLogo from "../../assets/jnc-footer-logo.png";
import cyber from "../../assets/cyber.png";

const Footer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleApplyNow = () => {
    if (user) {
      navigate("/admissions/application");
    } else {
      navigate("/login", {
        state: {
          from: "/admissions/application",
        },
      });
    }
  };

  return (
    <footer className="bg-[#3A356B] text-white mt-0">

      {/* =========================
          MAIN FOOTER
      ========================= */}

      <div
        className="
          max-w-[1300px]
          mx-auto
          px-5
          sm:px-6
          lg:px-8
          py-10
          sm:py-12
          lg:py-14
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-4
          gap-10
          sm:gap-10
          lg:gap-14
        "
      >

        {/* =========================
            COLUMN 1
        ========================= */}

        <div className="w-full">

          <img
            src={footerLogo}
            alt="JNC Footer Logo"
            className="
              w-[90px]
              sm:w-[100px]
              lg:w-[110px]
              mb-5
            "
          />

          <div
            className="
              text-[12.5px]
              sm:text-[13px]
              text-gray-300
              leading-5
            "
          >

            <p className="font-medium text-white">
              Jyoti Nivas College Autonomous
            </p>

            <p>Hosur Road, Koramangala</p>

            <p>Bengaluru - 560095</p>

            <p className="mt-3">
              Phone: 080 25530137
            </p>

            <p className="break-words">
              Email: info@jyotinivas.org
            </p>

          </div>

        </div>

        {/* =========================
            COLUMN 2
        ========================= */}

        <div className="w-full">

          <h3 className="text-[15px] font-semibold">
            Important Links

            <span
              className="
                block
                w-[120px]
                sm:w-[140px]
                h-[1px]
                bg-gray-400
                mt-2
              "
            />
          </h3>

          <ul
            className="
              mt-5
              space-y-3
              text-[13px]
              text-gray-300
            "
          >

            <li>
              <button
                onClick={handleApplyNow}
                className="hover:text-white transition text-left"
              >
                <strong>Apply Now</strong>
              </button>
            </li>

            <li>
              <Link
                to="/login"
                className="hover:text-white transition"
              >
                <strong>Student Login</strong>
              </Link>
            </li>

            <li>
              <Link
                to="/login"
                className="hover:text-white transition"
              >
                <strong>Faculty Login</strong>
              </Link>
            </li>

            <li>
              <a
                href="https://portal.office.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <strong>Online Class</strong>
              </a>
            </li>

            <li>
              <a
                href="http://106.51.73.95:8585/KnowledgePro/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition break-words"
              >
                <strong>MIS</strong>
              </a>
            </li>

            <li>
              <a
                href="https://docs.google.com/forms/d/1Ea6YQT8LWIh3z8TAc6kxzq9C5zqzMsGatrXeclV5aeg/viewform?edit_requested=true"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <strong>ECRF</strong>
              </a>
            </li>

          </ul>

        </div>

        {/* =========================
            COLUMN 3
        ========================= */}

        <div className="w-full">

          <h3 className="text-[15px] font-semibold">
            Useful Links

            <span
              className="
                block
                w-[120px]
                sm:w-[140px]
                h-[1px]
                bg-gray-400
                mt-2
              "
            />
          </h3>

          <ul
            className="
              mt-5
              space-y-3
              text-[13px]
              text-gray-300
            "
          >




            <li
              onClick={() => navigate("/careers")}
              className="hover:text-white cursor-pointer"
            >
              <strong> › Career</strong>
            </li>


            <li>
              <a
                href="https://bcu.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  hover:text-white
                  transition
                  break-words
                "
              >
                <strong>› Bengaluru City University</strong>
              </a>
            </li>

            <li>
              <a
                href="https://naac.gov.in/index.php/en/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <strong>› NAAC</strong>
              </a>
            </li>

            <li>
              <a
                href="https://www.ugc.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition"
              >
                <strong>› UGC</strong>
              </a>
            </li>

            <li>
              <a
                href="https://epgp.inflibnet.ac.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  hover:text-white
                  transition
                  break-words
                "
              >
                <strong>› Online Academic Resources</strong>
              </a>
            </li>

          </ul>

          {/* Cyber Security */}

          <a
            href="https://www.ncdrc.res.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block"
          >
            <img
              src={cyber}
              alt="Cyber Security"
              className="
                w-[140px]
                sm:w-[150px]
                lg:w-[160px]
                mt-5
              "
            />
          </a>

        </div>

        {/* =========================
            COLUMN 4
        ========================= */}

        <div className="w-full">

          <h3 className="text-[15px] font-semibold">
            Connect Us

            <span
              className="
                block
                w-[120px]
                sm:w-[140px]
                h-[1px]
                bg-gray-400
                mt-2
              "
            />
          </h3>

          {/* Social Icons */}

          <div
            className="
              flex
              gap-3
              mt-5
              sm:mt-6
            "
          >

            <a
              href="https://www.instagram.com/jncbengaluru/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="
                bg-[#2F2A5A]
                p-2.5
                rounded-sm
                hover:bg-[#FF2D55]
                transition
              "
            >
              <FaInstagram size={15} />
            </a>

            <a
              href="https://www.linkedin.com/school/jyoti-nivas-college-autonomous-bangalore/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="
                bg-[#2F2A5A]
                p-2.5
                rounded-sm
                hover:bg-[#FF2D55]
                transition
              "
            >
              <FaLinkedinIn size={15} />
            </a>

            <a
              href="https://www.youtube.com/@jyotinivascollegeautonomou2954/videos"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="
                bg-[#2F2A5A]
                p-2.5
                rounded-sm
                hover:bg-[#FF2D55]
                transition
              "
            >
              <FaYoutube size={15} />
            </a>

          </div>

        </div>

      </div>

      {/* =========================
          COPYRIGHT
      ========================= */}

      <div
        className="
          bg-[#2F2A5A]
          text-center
          px-4
          py-3
          sm:py-4
          text-[11px]
          sm:text-[12px]
          md:text-[13px]
          text-gray-300
          leading-5
        "
      >
        © 2025 Jyoti Nivas College Autonomous, Bengaluru |
        Affiliated to Bengaluru City University
      </div>

    </footer>
  );
};

export default Footer;