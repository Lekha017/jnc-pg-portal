import { useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Programs from "../../../components/programs/Programs";

function ProgramsFees() {
  const location = useLocation();
  const navigate = useNavigate();

  // =========================================================
  // RESTORE PROGRAMS SCROLL POSITION
  // =========================================================

  useEffect(() => {
    const savedScroll =
      location.state?.programsScrollPosition;

    if (
      location.state?.restoreProgramsScroll &&
      typeof savedScroll === "number"
    ) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedScroll,
            left: 0,
            behavior: "smooth",
          });
        });
      });

      // Clear temporary state after restoring
      navigate(
        {
          pathname: location.pathname,
          search: location.search,
        },
        {
          replace: true,
          state: {},
        }
      );
    }
  }, [
    location.key,
    location.pathname,
    location.search,
    navigate,
  ]);

  // =========================================================
  // SAVE CURRENT POSITION BEFORE LEAVING
  // =========================================================

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        "programs-last-scroll",
        String(window.scrollY)
      );
    };

    window.addEventListener(
      "beforeunload",
      saveScrollPosition
    );

    return () => {
      window.removeEventListener(
        "beforeunload",
        saveScrollPosition
      );
    };
  }, []);

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div
      className="
        bg-white
        rounded-xl
        sm:rounded-2xl
        shadow-md
        p-4
        sm:p-6
        lg:p-8
        w-full
        overflow-hidden
      "
    >
      {/* =========================
          HEADING
      ========================= */}

      <div className="mb-6 sm:mb-8">

        <h2
          className="
            text-2xl
            sm:text-3xl
            font-bold
            text-[#2D2A70]
            leading-tight
          "
        >
          Postgraduate Programmes
        </h2>

        <p
          className="
            text-gray-500
            mt-2
            text-sm
            sm:text-base
            leading-6
            sm:leading-7
          "
        >
          Explore the postgraduate programmes offered by
          Jyoti Nivas College. Click on{" "}
          <strong>Fees</strong> to view the fee structure,
          <strong> Details</strong> to know more about the
          programme, or <strong>Apply</strong> to begin your
          admission process.
        </p>

      </div>

      {/* =========================
          PROGRAMS
      ========================= */}

      <div className="w-full overflow-x-auto">
        <Programs />
      </div>

    </div>
  );
}

export default ProgramsFees;