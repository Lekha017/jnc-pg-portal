import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";

import ProgramDetailsForm from "../../../components/admin/programDetails/ProgramDetailsForm";
import ProgramDetailsList from "../../../components/admin/programDetails/ProgramDetailsList";

import {
  getProgramDetails,
  deleteProgramDetails,
} from "../../../services/programDetailsService";

function ManageProgramDetails() {
  const [details, setDetails] = useState([]);

  const [selectedDetails, setSelectedDetails] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [showForm, setShowForm] =
    useState(false);

  const loadDetails = async () => {
    try {
      setLoading(true);

      const res =
        await getProgramDetails();

      setDetails(res.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load program details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteProgramDetails(id);

      toast.success(
        "Program Details Deleted Successfully"
      );

      loadDetails();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <>
      {/* Add Button */}

      <div className="flex justify-end mb-6">

        <button
          onClick={() => {
            setSelectedDetails(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
        >
          <Plus size={18} />
          Add Program Details
        </button>

      </div>

      {/* List */}

      <ProgramDetailsList
        details={details}
        loading={loading}
        fetchDetails={loadDetails}
        onEdit={(details) => {
          setSelectedDetails(details);
          setShowForm(true);
        }}
        onDelete={handleDelete}
      />

      {/* Popup */}

      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">

          <div className="min-h-screen flex items-start justify-center p-8">

            <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedDetails(null);
                }}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
              >
                <X size={24} />
              </button>

              <div className="p-10">

                <ProgramDetailsForm
                  selectedDetails={selectedDetails}
                  setSelectedDetails={setSelectedDetails}
                  triggerRefresh={() => {
                    loadDetails();
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

export default ManageProgramDetails;