import { useState } from "react";
import { Plus, X } from "lucide-react";

import FeeForm from "../../../components/admin/fees/FeeForm";
import FeeList from "../../../components/admin/fees/FeeList";

function ManageFees() {
  const [selectedFee, setSelectedFee] =
    useState(null);

  const [refresh, setRefresh] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <>
      {/* Add Button */}

      <div className="flex justify-end mb-6">

        <button
          onClick={() => {
            setSelectedFee(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <Plus size={18} />
          Add Fee Structure
        </button>

      </div>

      {/* Fee List */}

      <FeeList
        refresh={refresh}
        onEdit={(fee) => {
          setSelectedFee(fee);
          setShowForm(true);
        }}
      />

      {/* Popup */}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">

          <div className="min-h-screen flex items-start justify-center p-8">

            <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedFee(null);
                }}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
              >
                <X size={24} />
              </button>

              <div className="p-10">

                <FeeForm
                  selectedFee={selectedFee}
                  setSelectedFee={setSelectedFee}
                  triggerRefresh={() => {
                    triggerRefresh();
                    setShowForm(false);
                  }}
                />

              </div>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default ManageFees;