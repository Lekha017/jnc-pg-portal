import { useState } from "react";
import {
  Search,
  RefreshCcw,
} from "lucide-react";

import ProgramDetailsCard from "./ProgramDetailsCard";
import ConfirmModal from "../../common/ConfirmModal";

function ProgramDetailsList({
  details,
  loading,
  fetchDetails,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] =
    useState("");

  const [
    showDeleteModal,
    setShowDeleteModal,
  ] = useState(false);

  const [
    selectedDetails,
    setSelectedDetails,
  ] = useState(null);

  const filteredDetails =
    details.filter((item) =>
      item?.program?.programName
        ?.toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  const handleDeleteClick = (
    detailsItem
  ) => {
    setSelectedDetails(detailsItem);
    setShowDeleteModal(true);
  };

  const confirmDelete =
    async () => {
      if (!selectedDetails) return;

      await onDelete(
        selectedDetails._id
      );

      setShowDeleteModal(false);
      setSelectedDetails(null);
    };

  return (
    <div
      className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        p-6
      "
    >
      {/* Header */}

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-bold text-[#2D2A70]">
          Program Details
        </h2>

        <button
          onClick={fetchDetails}
          className="
            flex
            items-center
            gap-2
            border
            border-gray-300
            px-4
            py-2
            rounded-xl
            hover:bg-gray-50
          "
        >
          <RefreshCcw size={17} />
          Refresh
        </button>
      </div>

      <div className="border-b border-gray-200 mb-5"></div>

      {/* Search */}

      <div className="relative mb-5 max-w-md ml-auto">

        <Search
          size={16}
          strokeWidth={2}
          className="
            absolute
            left-4
            top-1/2
            -translate-y-1/2
            text-gray-400
          "
        />

        <input
          type="text"
          placeholder="Search programs..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            border
            border-gray-300
            rounded-2xl
            pl-12
            pr-4
            py-3
            outline-none
            focus:ring-2
            focus:ring-[#2D2A70]
          "
        />
      </div>

      {/* List */}

      <div
        className="
          space-y-4
          max-h-[650px]
          overflow-y-auto
          pr-2
        "
      >
        {loading ? (
          <p className="text-center text-gray-500">
            Loading...
          </p>
        ) : filteredDetails.length ===
          0 ? (
          <p className="text-center text-gray-500 py-10">
            No Details Found
          </p>
        ) : (
          filteredDetails.map(
            (item) => (
              <ProgramDetailsCard
                key={item._id}
                details={item}
                onEdit={onEdit}
                onDelete={() =>
                  handleDeleteClick(
                    item
                  )
                }
              />
            )
          )
        )}
      </div>

      {/* Delete Modal */}

      {showDeleteModal && (
        <ConfirmModal
          isOpen={
            showDeleteModal
          }
          title="Delete Program Details"
          message={`Are you sure you want to delete details for ${selectedDetails?.program?.programName}?`}
          onConfirm={
            confirmDelete
          }
          onCancel={() => {
            setShowDeleteModal(
              false
            );
            setSelectedDetails(
              null
            );
          }}
        />
      )}
    </div>
  );
}

export default ProgramDetailsList;