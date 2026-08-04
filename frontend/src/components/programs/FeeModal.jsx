import { X } from "lucide-react";

function FeeModal({
  isOpen,
  onClose,
  program,
}) {
  if (!isOpen || !program) return null;

  // Dummy data (replace with API later)
  const fees = [
    {
      year: "I Year",
      insideKarnatakaFee: 100000,
      outsideKarnatakaFee: 107000,
    },
    {
      year: "II Year",
      insideKarnatakaFee: 98000,
      outsideKarnatakaFee: 105000,
    },
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl w-full max-w-3xl shadow-2xl overflow-hidden">

        {/* Header */}

        <div className="bg-[#2D2A70] text-white px-6 py-4 flex justify-between items-center">

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
            className="hover:bg-white/20 p-2 rounded-full transition"
          >
            <X size={22} />
          </button>

        </div>

        {/* Body */}

        <div className="p-6">

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

                {fees.map((fee, index) => (

                  <tr
                    key={index}
                    className="hover:bg-gray-50"
                  >

                    <td className="border px-4 py-3 font-medium">
                      {fee.year}
                    </td>

                    <td className="border px-4 py-3 text-center">
                      ₹
                      {fee.insideKarnatakaFee.toLocaleString()}
                    </td>

                    <td className="border px-4 py-3 text-center">
                      ₹
                      {fee.outsideKarnatakaFee.toLocaleString()}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

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