import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

import { getPrograms } from "../../services/programService";

import FeeModal from "./FeeModal";

function Programs() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [programs, setPrograms] = useState([]);
  const [loading, setLoading] = useState(true);

  const [showFeeModal, setShowFeeModal] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState(null);

  // =========================================================
  // FETCH PROGRAMS
  // =========================================================

  useEffect(() => {
    fetchPrograms();
  }, []);

  const fetchPrograms = async () => {
    try {
      const res = await getPrograms();

      if (res.success) {
        setPrograms(res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // GROUP PROGRAMS BY CATEGORY
  // =========================================================

  const groupedPrograms = programs.reduce((acc, program) => {
    if (!acc[program.category]) {
      acc[program.category] = [];
    }

    acc[program.category].push(program);

    return acc;
  }, {});

  // =========================================================
  // SAVE CURRENT SCROLL POSITION
  // =========================================================

  const getCurrentScrollPosition = () => {
    return window.scrollY || window.pageYOffset || 0;
  };

  // =========================================================
  // DETAILS NAVIGATION
  // =========================================================

  const handleDetailsClick = (program) => {
    if (!program?._id) return;

    const scrollPosition = getCurrentScrollPosition();

    navigate(`/program-details/${program._id}`, {
      state: {
        from: "/admissions?tab=programs",
        admissionsScrollPosition: scrollPosition,
        restoreAdmissionsScroll: true,
      },
    });
  };

  // =========================================================
  // APPLY NAVIGATION
  // =========================================================

  const handleApplyClick = () => {
    const scrollPosition = getCurrentScrollPosition();

    if (user) {
      navigate("/admissions/application", {
        state: {
          from: "/admissions?tab=programs",
          admissionsScrollPosition: scrollPosition,
          restoreAdmissionsScroll: true,
        },
      });
    } else {
      navigate("/login", {
        state: {
          from: "/admissions/application",
          admissionsScrollPosition: scrollPosition,
          restoreAdmissionsScroll: true,
        },
      });
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="py-16 sm:py-20 md:py-24 px-4 text-center text-lg sm:text-xl">
        Loading Programmes...
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">

        {Object.entries(groupedPrograms).map(
          ([category, items]) => (
            <div
              key={category}
              className="
                mb-8 sm:mb-10
                border border-gray-300
                overflow-hidden
                rounded-md
                w-full
              "
            >

              {/* =========================
                  CATEGORY HEADER
              ========================= */}

              <div className="bg-[#403777] px-4 sm:px-6 py-3 sm:py-4">
                <h2
                  className="
                    text-xl
                    sm:text-2xl
                    font-semibold
                    text-white
                    break-words
                  "
                >
                  {category}
                </h2>
              </div>

              {/* =========================
                  PROGRAMS
              ========================= */}

              {items
                .sort(
                  (a, b) =>
                    a.displayOrder - b.displayOrder
                )
                .map((program, index) => (

                  <div
                    key={program._id}
                    className={`
                      border-t
                      border-gray-300

                      px-4
                      sm:px-6
                      lg:px-8

                      py-4
                      sm:py-5

                      ${
                        index % 2 === 0
                          ? "bg-[#EDF4FF]"
                          : "bg-[#F5FAEF]"
                      }

                      flex
                      flex-col
                      sm:flex-row

                      sm:items-center

                      gap-4
                      sm:gap-5
                      lg:gap-6
                    `}
                  >

                    {/* =========================
                        PROGRAM NAME
                    ========================= */}

                    <div className="flex-1 min-w-0">

                      <h3
                        className="
                          text-base
                          sm:text-lg
                          lg:text-[20px]

                          leading-6
                          sm:leading-7
                          lg:leading-8

                          text-gray-800
                          break-words
                        "
                      >
                        {program.programName}
                      </h3>

                    </div>

                    {/* =========================
                        BUTTONS
                    ========================= */}

                    <div
                      className="
                        grid
                        grid-cols-3

                        sm:flex

                        gap-2
                        sm:gap-3

                        w-full
                        sm:w-auto

                        sm:flex-shrink-0
                      "
                    >

                      {/* FEE */}

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedProgram(program);
                          setShowFeeModal(true);
                        }}
                        className="
                          w-full
                          sm:w-[90px]
                          lg:w-[100px]

                          border
                          border-[#2D2A70]

                          rounded-full

                          py-2

                          px-2

                          text-sm
                          sm:text-base

                          text-[#2D2A70]

                          font-medium

                          hover:bg-[#2D2A70]
                          hover:text-white

                          transition
                          duration-200

                          whitespace-nowrap
                        "
                      >
                        Fee
                      </button>

                      {/* DETAILS */}

                      <button
                        type="button"
                        onClick={() =>
                          handleDetailsClick(program)
                        }
                        className="
                          w-full
                          sm:w-[90px]
                          lg:w-[100px]

                          border
                          border-[#2D2A70]

                          rounded-full

                          py-2

                          px-2

                          text-sm
                          sm:text-base

                          text-[#2D2A70]

                          font-medium

                          hover:bg-[#2D2A70]
                          hover:text-white

                          transition
                          duration-200

                          whitespace-nowrap
                        "
                      >
                        Details
                      </button>

                      {/* APPLY */}

                      <button
                        type="button"
                        onClick={handleApplyClick}
                        className="
                          w-full
                          sm:w-[90px]
                          lg:w-[100px]

                          bg-green-600
                          hover:bg-green-700

                          rounded-full

                          py-2

                          px-2

                          text-sm
                          sm:text-base

                          text-white

                          font-medium

                          transition
                          duration-200

                          whitespace-nowrap
                        "
                      >
                        Apply
                      </button>

                    </div>

                  </div>
                ))}
            </div>
          )
        )}

      </section>

      {/* =========================
          FEE MODAL
      ========================= */}

      <FeeModal
        isOpen={showFeeModal}
        onClose={() => setShowFeeModal(false)}
        program={selectedProgram}
      />
    </>
  );
}

export default Programs;