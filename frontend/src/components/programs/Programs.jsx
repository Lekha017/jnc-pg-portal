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

  const [showFeeModal, setShowFeeModal] =
    useState(false);

  const [selectedProgram, setSelectedProgram] =
    useState(null);

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

  const groupedPrograms = programs.reduce(
    (acc, program) => {
      if (!acc[program.category]) {
        acc[program.category] = [];
      }

      acc[program.category].push(program);

      return acc;
    },
    {}
  );

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

    const scrollPosition =
      getCurrentScrollPosition();

    navigate(
      `/program-details/${program._id}`,
      {
        state: {
          from: "/admissions?tab=programs",
          admissionsScrollPosition:
            scrollPosition,
          restoreAdmissionsScroll: true,
        },
      }
    );
  };

  // =========================================================
  // APPLY NAVIGATION
  // =========================================================

  const handleApplyClick = () => {
    const scrollPosition =
      getCurrentScrollPosition();

    if (user) {
      navigate("/admissions/application", {
        state: {
          from: "/admissions?tab=programs",
          admissionsScrollPosition:
            scrollPosition,
          restoreAdmissionsScroll: true,
        },
      });
    } else {
      navigate("/login", {
        state: {
          from: "/admissions/application",
          admissionsScrollPosition:
            scrollPosition,
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
      <div className="py-24 text-center text-xl">
        Loading Programmes...
      </div>
    );
  }

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      <section className="max-w-7xl mx-auto py-8">

        {Object.entries(groupedPrograms).map(
          ([category, items]) => (

            <div
              key={category}
              className="
                mb-10
                border
                border-gray-300
                overflow-hidden
                rounded-md
              "
            >

              {/* Category */}

              <div className="bg-[#403777] px-6 py-4">

                <h2
                  className="
                    text-2xl
                    font-semibold
                    text-white
                  "
                >
                  {category}
                </h2>

              </div>

              {/* Programs */}

              {items
                .sort(
                  (a, b) =>
                    a.displayOrder -
                    b.displayOrder
                )
                .map(
                  (program, index) => (

                    <div
                      key={program._id}
                      className={`
                        grid
                        grid-cols-[1fr_120px_120px_120px]
                        items-center
                        gap-6
                        px-8
                        py-5
                        border-t
                        border-gray-300
                        ${
                          index % 2 === 0
                            ? "bg-[#EDF4FF]"
                            : "bg-[#F5FAEF]"
                        }
                      `}
                    >

                      {/* Program */}

                      <h3
                        className="
                          text-[20px]
                          leading-8
                          text-gray-800
                        "
                      >
                        {program.programName}
                      </h3>

                      {/* Fee */}

                      <button
                        onClick={() => {
                          setSelectedProgram(program);
                          setShowFeeModal(true);
                        }}
                        className="
                          border
                          border-[#2D2A70]
                          rounded-full
                          py-2
                          text-[#2D2A70]
                          font-medium
                          hover:bg-[#2D2A70]
                          hover:text-white
                          transition
                        "
                      >
                        Fee
                      </button>

                      {/* Details */}

                      <button
                        onClick={() =>
                          handleDetailsClick(program)
                        }
                        className="
                          border
                          border-[#2D2A70]
                          rounded-full
                          py-2
                          text-[#2D2A70]
                          font-medium
                          hover:bg-[#2D2A70]
                          hover:text-white
                          transition
                        "
                      >
                        Details
                      </button>

                      {/* Apply */}

                      <button
                        onClick={handleApplyClick}
                        className="
                          bg-green-600
                          hover:bg-green-700
                          rounded-full
                          py-2
                          text-white
                          font-medium
                          transition
                        "
                      >
                        Apply
                      </button>

                    </div>

                  )
                )}

            </div>

          )
        )}

      </section>

      {/* Fee Modal */}

      <FeeModal
        isOpen={showFeeModal}
        onClose={() =>
          setShowFeeModal(false)
        }
        program={selectedProgram}
      />
    </>
  );
}

export default Programs;