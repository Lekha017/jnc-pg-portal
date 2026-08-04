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
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl overflow-hidden">

        {/* Header */}

        <div className="bg-[#2D2A70] text-white px-6 py-4 flex items-center justify-between">

          <div>

            <h2 className="text-2xl font-bold">
              Fee Structure
            </h2>

            <p className="text-sm text-gray-200 mt-1">
              {program.programName}
            </p>

          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/20 transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

          {loading ? (

            <div className="py-10 text-center text-gray-600">
              Loading Fee Structure...
            </div>

          ) : fees.length === 0 ? (

            <div className="py-10 text-center text-gray-500">
              No Fee Structure Available
            </div>

          ) : (

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="bg-gray-100">

                    <th className="border px-4 py-3 text-left">
                      Academic Year
                    </th>

                    <th className="border px-4 py-3 text-center">
                      Karnataka
                    </th>

                    <th className="border px-4 py-3 text-center">
                      Other States
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {fees.map((fee) => (

                    <tr
                      key={fee._id}
                      className="hover:bg-gray-50"
                    >

                      <td className="border px-4 py-3 font-medium">
                        {fee.year}
                      </td>

                      <td className="border px-4 py-3 text-center">
                        ₹
                        {fee.insideKarnatakaFee?.toLocaleString() ||
                          "0"}
                      </td>

                      <td className="border px-4 py-3 text-center">
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

          <div className="mt-6 flex justify-end">

            <button
              onClick={onClose}
              className="bg-[#2D2A70] hover:bg-[#221f59] text-white px-6 py-2 rounded-xl transition"
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