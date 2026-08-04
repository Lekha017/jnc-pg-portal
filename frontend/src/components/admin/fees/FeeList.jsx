import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import FeeCard from "./FeeCard";
import ConfirmModal from "../../common/ConfirmModal";

import {
  getFees,
  deleteFee,
} from "../../../services/feeService";

function FeeList({
  refresh,
  onEdit,
}) {
  const [fees, setFees] = useState([]);

  const [filteredFees, setFilteredFees] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [deleteId, setDeleteId] =
    useState(null);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  useEffect(() => {
    loadFees();
  }, [refresh]);

  useEffect(() => {
    const filtered = fees.filter((fee) =>
      fee.program?.programName
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );

    setFilteredFees(filtered);
  }, [search, fees]);

  const loadFees = async () => {
    try {
      const res = await getFees();

      if (res.success) {
        setFees(res.data);
        setFilteredFees(res.data);
      }
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load fees."
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deleteFee(deleteId);

      toast.success(
        "Fee deleted successfully."
      );

      setShowDeleteModal(false);
      setDeleteId(null);

      loadFees();

    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete fee."
      );
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-300 p-6">

      {/* Header */}

      <div className="flex justify-between items-center mb-6">

        <h2 className="text-2xl font-bold text-[#2D2A70]">
          Existing Fees
        </h2>

      </div>

      {/* Search */}

      <div className="relative mb-6">

        <Search
          size={18}
          className="absolute left-3 top-3 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search Program..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            border
            border-gray-300
            rounded-xl
            pl-10
            pr-4
            py-2.5
            outline-none
            focus:border-gray-400
            focus:ring-2
            focus:ring-[#2D2A70]/20
          "
        />

      </div>

      {/* Fee List */}

      <div className="space-y-4">

        {filteredFees.length === 0 ? (

          <div className="text-center text-gray-500 py-12">

            No Fees Found.

          </div>

        ) : (

          filteredFees.map((fee) => (

            <FeeCard
              key={fee._id}
              fee={fee}
              onEdit={onEdit}
              onDelete={(id) => {
                setDeleteId(id);
                setShowDeleteModal(true);
              }}
            />

          ))

        )}

      </div>

      {/* Delete Confirmation */}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Fee"
        message="Are you sure you want to delete this fee?"
        onConfirm={handleDelete}
        onCancel={() => {
          setShowDeleteModal(false);
          setDeleteId(null);
        }}
      />

    </div>
  );
}

export default FeeList;