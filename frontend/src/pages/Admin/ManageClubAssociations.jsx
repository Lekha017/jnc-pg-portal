import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { toast } from "react-toastify";

import ClubAssociationForm from "../../components/clubAssociation/ClubAssociationForm";
import ClubAssociationList from "../../components/clubAssociation/ClubAssociationList";

import api from "../../services/api";

const ManageClubAssociations = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [showForm, setShowForm] = useState(false);

  const [selectedClubAssociation, setSelectedClubAssociation] =
    useState(null);

  const [refreshKey, setRefreshKey] = useState(0);

  const [departments, setDepartments] = useState([]);

  const [loadingDepartments, setLoadingDepartments] = useState(false);

  // =========================================================
  // FETCH DEPARTMENTS
  // =========================================================

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);

        const response = await api.get("/departments");

        const departmentData =
          response?.data?.data || response?.data || [];

        setDepartments(
          Array.isArray(departmentData) ? departmentData : []
        );
      } catch (error) {
        console.error(
          "Fetch departments error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to fetch departments."
        );

        setDepartments([]);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // =========================================================
  // OPEN ADD FORM
  // =========================================================

  const handleAdd = () => {
    setSelectedClubAssociation(null);
    setShowForm(true);
  };

  // =========================================================
  // OPEN EDIT FORM
  // =========================================================

  const handleEdit = (clubAssociation) => {
    setSelectedClubAssociation(clubAssociation);
    setShowForm(true);
  };

  // =========================================================
  // CLOSE FORM
  // =========================================================

  const handleCloseForm = () => {
    setSelectedClubAssociation(null);
    setShowForm(false);
  };

  // =========================================================
  // AFTER CREATE / UPDATE
  // =========================================================

  const handleSuccess = () => {
    setSelectedClubAssociation(null);
    setShowForm(false);

    setRefreshKey((prev) => prev + 1);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F5F6FB] px-6 py-8 md:px-10">
      <div className="max-w-7xl mx-auto">

        {/* =====================================================
            PAGE HEADER
        ====================================================== */}

        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between mb-8">

          <div>
            <h1 className="text-4xl font-bold text-[#2F2F6F]">
              Manage Clubs & Associations
            </h1>

            <p className="text-gray-500 mt-2">
              Create, edit and manage clubs, associations and
              their gallery images.
            </p>
          </div>

          {/* ===================================================
              ADD BUTTON
          ==================================================== */}

          <button
            type="button"
            onClick={handleAdd}
            className="
              inline-flex items-center justify-center gap-2
              bg-[#2F2F6F] hover:bg-[#252557]
              text-white font-semibold
              px-6 py-3 rounded-xl
              transition-all duration-200
              shadow-sm
            "
          >
            <Plus size={20} />

            Add Club / Association
          </button>
        </div>

        {/* =====================================================
            LIST
        ====================================================== */}

        <ClubAssociationList
          key={refreshKey}
          onEdit={handleEdit}
        />

      </div>

      {/* =======================================================
          ADD / EDIT MODAL
      ======================================================== */}

      {showForm && (
        <div
          className="
            fixed inset-0 z-[9999]
            bg-black/40 backdrop-blur-[2px]
            flex items-center justify-center
            p-4 md:p-6
          "
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseForm();
            }
          }}
        >

          {/* ===================================================
              MODAL CONTAINER
          ==================================================== */}

          <div
            className="
              relative
              w-full max-w-6xl
              max-h-[94vh]
              overflow-y-auto
              bg-white
              rounded-[28px]
              shadow-2xl
            "
            role="dialog"
            aria-modal="true"
            aria-labelledby="club-association-modal-title"
          >

            {/* =================================================
                CLOSE BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={handleCloseForm}
              className="
                absolute
                right-5 top-5
                z-20
                w-12 h-12
                rounded-full
                bg-white
                shadow-lg
                flex items-center justify-center
                text-gray-700
                hover:bg-gray-100
                transition
              "
              aria-label="Close"
            >
              <X size={25} />
            </button>

            {/* =================================================
                MODAL CONTENT
            ================================================== */}

            <div className="p-7 md:p-8">

              {/* =================================================
                  HEADER
              ================================================== */}

              <div className="mb-7 pr-14">

                <h2
                  id="club-association-modal-title"
                  className="text-3xl font-bold text-[#2F2F6F]"
                >
                  {selectedClubAssociation
                    ? "Edit Club / Association"
                    : "Create Club / Association"}
                </h2>

                <p className="text-gray-500 mt-2">
                  {selectedClubAssociation
                    ? "Update the club details and gallery images."
                    : "Fill in the details below to create a new club or association."}
                </p>

              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              {loadingDepartments ? (
                <div className="flex items-center justify-center py-16">
                  <div className="text-center">
                    <div
                      className="
                        w-10 h-10
                        border-4
                        border-gray-200
                        border-t-[#2F2F6F]
                        rounded-full
                        animate-spin
                        mx-auto
                      "
                    />

                    <p className="text-gray-500 mt-4">
                      Loading departments...
                    </p>
                  </div>
                </div>
              ) : (
                <ClubAssociationForm
                  selectedClubAssociation={
                    selectedClubAssociation
                  }
                  setSelectedClubAssociation={
                    setSelectedClubAssociation
                  }
                  departments={departments}
                  triggerRefresh={handleSuccess}
                />
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageClubAssociations;