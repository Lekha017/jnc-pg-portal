import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getFeeByProgram } from "../../services/feeService";

function FeeModal({
  isOpen,
  onClose,
  program,
}) {
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && program?._id) {
      fetchFees();
    }
  }, [isOpen, program]);

  const fetchFees = async () => {
    try {
      setLoading(true);

      const res = await getFeeByProgram(
        program._id
      );

      if (res.success) {
        setFees(res.data || []);
      } else {
        setFees([]);
      }
    } catch (error) {
      console.error(error);
      setFees([]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen || !program) return null;

  return (
    <div
      className="
        fixed
        inset-0
        z-50

        bg-black/50

        flex
        items-center
        justify-center

        p-3
        sm:p-4
      "
    >

      {/* =========================
          MODAL
      ========================= */}

      <div
        className="
          bg-white
          rounded-xl
          sm:rounded-2xl
          shadow-2xl

          w-full

          max-w-[95vw]
          sm:max-w-xl
          md:max-w-2xl
          lg:max-w-3xl

          max-h-[90vh]

          overflow-hidden

          flex
          flex-col
        "
      >

        {/* =========================
            HEADER
        ========================= */}

        <div
          className="
            bg-[#2D2A70]
            text-white

            px-4
            sm:px-6

            py-3
            sm:py-4

            flex
            items-center
            justify-between

            gap-3
          "
        >

          {/* Title */}

          <div className="min-w-0">

            <h2
              className="
                text-lg
                sm:text-xl
                md:text-2xl

                font-bold

                leading-tight
              "
            >
              Fee Structure
            </h2>

            <p
              className="
                text-xs
                sm:text-sm

                text-gray-200

                mt-1

                truncate
                max-w-[220px]
                sm:max-w-[400px]
                md:max-w-[500px]
              "
            >
              {program.programName}
            </p>

          </div>

          {/* Close Icon */}

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="
              flex-shrink-0

              p-1.5
              sm:p-2

              rounded-full

              hover:bg-white/20

              transition
            "
          >
            <X
              size={20}
              className="sm:w-[22px] sm:h-[22px]"
            />
          </button>

        </div>

        {/* =========================
            BODY
        ========================= */}

        <div
          className="
            p-4
            sm:p-6

            overflow-y-auto
          "
        >

          {/* =========================
              LOADING
          ========================= */}

          {loading ? (

            <div
              className="
                py-8
                sm:py-10

                text-center

                text-sm
                sm:text-base

                text-gray-600
              "
            >
              Loading Fee Structure...
            </div>

          ) : fees.length === 0 ? (

            /* =========================
                NO FEES
            ========================= */

            <div
              className="
                py-8
                sm:py-10

                text-center

                text-sm
                sm:text-base

                text-gray-500
              "
            >
              No Fee Structure Available
            </div>

          ) : (

            /* =========================
                TABLE
            ========================= */

            <div className="w-full overflow-x-auto">

              <table
                className="
                  w-full
                  min-w-[500px]
                  border-collapse
                  text-sm
                  sm:text-base
                "
              >

                <thead>

                  <tr className="bg-gray-100">

                    <th
                      className="
                        border

                        px-3
                        sm:px-4

                        py-2.5
                        sm:py-3

                        text-left

                        whitespace-nowrap
                      "
                    >
                      Academic Year
                    </th>

                    <th
                      className="
                        border

                        px-3
                        sm:px-4

                        py-2.5
                        sm:py-3

                        text-center

                        whitespace-nowrap
                      "
                    >
                      Karnataka
                    </th>

                    <th
                      className="
                        border

                        px-3
                        sm:px-4

                        py-2.5
                        sm:py-3

                        text-center

                        whitespace-nowrap
                      "
                    >
                      Other States
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {fees.map((fee) => (

                    <tr
                      key={fee._id}
                      className="
                        hover:bg-gray-50
                        transition
                      "
                    >

                      {/* Academic Year */}

                      <td
                        className="
                          border

                          px-3
                          sm:px-4

                          py-2.5
                          sm:py-3

                          font-medium

                          whitespace-nowrap
                        "
                      >
                        {fee.year}
                      </td>

                      {/* Karnataka */}

                      <td
                        className="
                          border

                          px-3
                          sm:px-4

                          py-2.5
                          sm:py-3

                          text-center

                          whitespace-nowrap
                        "
                      >
                        ₹
                        {fee.insideKarnatakaFee?.toLocaleString() ||
                          "0"}
                      </td>

                      {/* Other States */}

                      <td
                        className="
                          border

                          px-3
                          sm:px-4

                          py-2.5
                          sm:py-3

                          text-center

                          whitespace-nowrap
                        "
                      >
                        ₹
                        {fee.outsideKarnatakaFee?.toLocaleString() ||
                          "0"}
                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          )}

          {/* =========================
              CLOSE BUTTON
          ========================= */}

          <div
            className="
              mt-5
              sm:mt-6

              flex
              justify-end
            "
          >

            <button
              type="button"
              onClick={onClose}
              className="
                bg-[#2D2A70]
                hover:bg-[#221f59]

                text-white

                px-5
                sm:px-6

                py-2

                rounded-xl

                text-sm
                sm:text-base

                transition

                w-full
                sm:w-auto
              "
            >
              Close
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default FeeModal;