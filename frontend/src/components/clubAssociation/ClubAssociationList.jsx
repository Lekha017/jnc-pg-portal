import { useEffect, useState } from "react";
import {
  Search,
  Plus,
  X,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { toast } from "react-toastify";

import {
  getAllClubAssociations,
  deleteClubAssociation,
  updateClubAssociation,
} from "../../services/clubAssociationService";

import ClubAssociationCard from "./ClubAssociationCard";

const ClubAssociationList = ({
  onEdit,
  refreshTrigger = 0,
  onAdd,
}) => {
  const [clubAssociations, setClubAssociations] =
    useState([]);

  const [filteredClubAssociations, setFilteredClubAssociations] =
    useState([]);

  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");

  const [deleteTarget, setDeleteTarget] =
    useState(null);

  const [deleteLoading, setDeleteLoading] =
    useState(false);

  // =========================================================
  // FETCH ALL CLUBS / ASSOCIATIONS
  // =========================================================

  const fetchClubAssociations = async () => {
    try {
      setLoading(true);

      const response =
        await getAllClubAssociations();

      const data = Array.isArray(response?.data)
        ? response.data
        : [];

      setClubAssociations(data);
      setFilteredClubAssociations(data);
    } catch (error) {
      console.error(
        "Failed to fetch club associations:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load clubs and associations."
      );

      setClubAssociations([]);
      setFilteredClubAssociations([]);
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // INITIAL FETCH / REFRESH
  // =========================================================

  useEffect(() => {
    fetchClubAssociations();
  }, [refreshTrigger]);

  // =========================================================
  // SEARCH
  // =========================================================

  useEffect(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    if (!searchValue) {
      setFilteredClubAssociations(
        clubAssociations
      );
      return;
    }

    const filtered =
      clubAssociations.filter((club) => {
        const title =
          club?.title?.toLowerCase() || "";

        const description =
          club?.description?.toLowerCase() || "";

        const department =
          club?.department?.name?.toLowerCase() ||
          "";

        return (
          title.includes(searchValue) ||
          description.includes(searchValue) ||
          department.includes(searchValue)
        );
      });

    setFilteredClubAssociations(filtered);
  }, [search, clubAssociations]);

  // =========================================================
  // EDIT
  // =========================================================

  const handleEdit = (clubAssociation) => {
    if (!onEdit) {
      console.error(
        "onEdit prop is missing in ClubAssociationList."
      );
      return;
    }

    // Send selected club to parent
    onEdit(clubAssociation);
  };

  // =========================================================
  // DELETE CLICK
  // =========================================================

  const handleDeleteClick = (
    clubAssociation
  ) => {
    setDeleteTarget(clubAssociation);
  };

  // =========================================================
  // CONFIRM DELETE
  // =========================================================

  const confirmDelete = async () => {
    if (!deleteTarget?._id) return;

    try {
      setDeleteLoading(true);

      await deleteClubAssociation(
        deleteTarget._id
      );

      toast.success(
        "Club / Association deleted successfully."
      );

      setDeleteTarget(null);

      await fetchClubAssociations();
    } catch (error) {
      console.error(
        "Delete club association error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to delete club / association."
      );
    } finally {
      setDeleteLoading(false);
    }
  };

  // =========================================================
  // TOGGLE PUBLISH
  // =========================================================

  const handleTogglePublish = async (
    clubAssociation
  ) => {
    try {
      /*
       * IMPORTANT:
       * Send the existing values along with isPublished.
       * This prevents title/description/department from
       * becoming undefined during the FormData request.
       */

      await updateClubAssociation(
        clubAssociation._id,
        {
          title: clubAssociation.title,
          description: clubAssociation.description,
          department:
            clubAssociation.department?._id ||
            clubAssociation.department,
          isPublished:
            !clubAssociation.isPublished,
          images: [],
          removeImages: [],
        }
      );

      toast.success(
        clubAssociation.isPublished
          ? "Club / Association unpublished."
          : "Club / Association published."
      );

      await fetchClubAssociations();
    } catch (error) {
      console.error(
        "Toggle publish error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to update publish status."
      );
    }
  };

  // =========================================================
  // CLEAR SEARCH
  // =========================================================

  const clearSearch = () => {
    setSearch("");
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="space-y-5">

      {/* =====================================================
          HEADER
      ====================================================== */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <div>
          <h2 className="text-xl font-bold text-[#2F2F6F]">
            Clubs & Associations
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Manage clubs, associations and their
            gallery images.
          </p>
        </div>

        {onAdd && (
          <button
            type="button"
            onClick={onAdd}
            className="
              flex items-center justify-center gap-2
              px-5 py-3
              bg-[#2F2F6F]
              text-white
              rounded-xl
              font-semibold
              hover:bg-[#252557]
              transition
            "
          >
            <Plus size={18} />
            Add Club / Association
          </button>
        )}

      </div>

      {/* =====================================================
          SEARCH
      ====================================================== */}

      <div className="relative max-w-xl">

        <Search
          size={19}
          className="
            absolute left-4 top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          value={search}
          onChange={(event) =>
            setSearch(event.target.value)
          }
          placeholder="Search clubs, associations or departments..."
          className="
            w-full
            pl-11 pr-11
            py-3.5
            border border-gray-300
            rounded-xl
            outline-none
            focus:ring-2
            focus:ring-[#4B4B7C]/20
            focus:border-[#4B4B7C]
          "
        />

        {search && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              absolute right-4 top-1/2
              -translate-y-1/2
              text-gray-400
              hover:text-gray-700
            "
          >
            <X size={18} />
          </button>
        )}

      </div>

      {/* =====================================================
          LOADING
      ====================================================== */}

      {loading && (
        <div className="
          bg-white
          border border-gray-200
          rounded-2xl
          p-12
          text-center
        ">
          <p className="text-gray-500">
            Loading clubs and associations...
          </p>
        </div>
      )}

      {/* =====================================================
          EMPTY
      ====================================================== */}

      {!loading &&
        filteredClubAssociations.length === 0 && (
          <div className="
            bg-white
            border border-gray-200
            rounded-2xl
            p-12
            text-center
          ">

            <div className="
              w-14 h-14
              mx-auto
              rounded-full
              bg-gray-100
              flex items-center justify-center
              mb-4
            ">
              <Search
                size={24}
                className="text-gray-400"
              />
            </div>

            <h3 className="font-semibold text-gray-700">
              {search
                ? "No matching clubs found"
                : "No clubs or associations available"}
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              {search
                ? "Try a different search term."
                : "Add your first club or association."}
            </p>

          </div>
        )}

      {/* =====================================================
          LIST
      ====================================================== */}

      {!loading &&
        filteredClubAssociations.length > 0 && (
          <div className="space-y-4">

            {filteredClubAssociations.map(
              (clubAssociation) => (
                <ClubAssociationCard
                  key={clubAssociation._id}
                  clubAssociation={
                    clubAssociation
                  }
                  onEdit={handleEdit}
                  onDelete={
                    handleDeleteClick
                  }
                  onTogglePublish={
                    handleTogglePublish
                  }
                />
              )
            )}

          </div>
        )}

      {/* =====================================================
          DELETE CONFIRMATION MODAL
      ====================================================== */}

      {deleteTarget && (
        <div className="
          fixed inset-0
          z-[100]
          flex items-center justify-center
          bg-black/50
          px-4
        ">

          <div className="
            w-full
            max-w-md
            bg-white
            rounded-2xl
            shadow-2xl
            p-6
          ">

            {/* ICON */}

            <div className="
              w-12 h-12
              rounded-full
              bg-red-100
              flex items-center justify-center
              mb-4
            ">
              <AlertTriangle
                size={24}
                className="text-red-500"
              />
            </div>

            {/* TITLE */}

            <h3 className="
              text-xl
              font-bold
              text-gray-800
            ">
              Delete Club / Association?
            </h3>

            {/* MESSAGE */}

            <p className="
              text-sm
              text-gray-600
              mt-2
              leading-6
            ">
              Are you sure you want to delete{" "}
              <span className="
                font-semibold
                text-gray-800
              ">
                "{deleteTarget.title}"
              </span>
              ? This will also remove its gallery
              images.
            </p>

            {/* BUTTONS */}

            <div className="
              flex
              justify-end
              gap-3
              mt-6
            ">

              <button
                type="button"
                disabled={deleteLoading}
                onClick={() =>
                  setDeleteTarget(null)
                }
                className="
                  px-5 py-2.5
                  rounded-xl
                  border border-gray-300
                  text-gray-700
                  hover:bg-gray-50
                  transition
                  disabled:opacity-50
                "
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={deleteLoading}
                onClick={confirmDelete}
                className="
                  flex items-center gap-2
                  px-5 py-2.5
                  rounded-xl
                  bg-red-500
                  text-white
                  font-semibold
                  hover:bg-red-600
                  transition
                  disabled:opacity-60
                "
              >
                <Trash2 size={17} />

                {deleteLoading
                  ? "Deleting..."
                  : "Delete"}
              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default ClubAssociationList;