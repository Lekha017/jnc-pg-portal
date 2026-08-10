import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import ConfirmModal from "../../common/ConfirmModal";

import {
  getAllPlacements,
  deletePlacement,
  togglePlacementPublish,
} from "../../../services/placementService";

function PlacementList({
  refresh,
  onEdit,
}) {
  const [placements, setPlacements] =
    useState([]);

  const [deleteId, setDeleteId] =
    useState(null);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchPlacements();
  }, [refresh]);

  const fetchPlacements = async () => {
    try {
      const res =
        await getAllPlacements();

      setPlacements(
        res.data || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load placements"
      );
    }
  };

  const handleDelete = async () => {
    try {
      await deletePlacement(
        deleteId
      );

      toast.success(
        "Placement Deleted Successfully"
      );

      setDeleteId(null);

      fetchPlacements();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete placement"
      );
    }
  };

  const handlePublish = async (
    id
  ) => {
    try {
      await togglePlacementPublish(
        id
      );

      toast.success(
        "Status Updated"
      );

      fetchPlacements();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to update status"
      );
    }
  };

  const filteredPlacements =
    placements.filter((placement) => {
      const keyword =
        search.toLowerCase();

      return (
        placement.studentName
          ?.toLowerCase()
          .includes(keyword) ||

        placement.company
          ?.toLowerCase()
          .includes(keyword) ||

        placement.role
          ?.toLowerCase()
          .includes(keyword) ||

        placement.year
          ?.toString()
          .includes(keyword)
      );
    });

  return (
    <>
      {/* Main Placement Container */}

      <div className="bg-white rounded-2xl shadow-md border-none overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-7 py-5 border-none">

          <div>

            <h2 className="text-2xl font-bold text-[#2D2A70]">
              Placements
            </h2>

            <p className="text-gray-500 text-sm">
              Manage all placement records
            </p>

          </div>


          {/* Search */}

          <div className="relative w-full md:w-80">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search placements..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-xl
                pl-11
                pr-4
                py-3
                bg-white
                border-none
                outline-none
                ring-1
                ring-gray-200
                focus:ring-2
                focus:ring-[#2D2A70]
              "
            />

          </div>

        </div>


        {/* Placement Records */}

        {filteredPlacements.length ===
        0 ? (

          <div className="text-center py-16">

            <p className="text-lg text-gray-500">
              No Placements Found
            </p>

          </div>

        ) : (

          <div className="space-y-4 p-5">

            {filteredPlacements.map(
              (placement) => (

                <div
                  key={
                    placement._id
                  }
                  className="
                    bg-white
                    rounded-xl
                    p-5
                    shadow-sm
                    ring-1
                    ring-gray-100
                    hover:bg-gray-50
                    transition
                  "
                >

                  <div className="flex justify-between items-start">

                    {/* Placement Details */}

                    <div>

                      <h3 className="font-bold text-lg text-[#2D2A70]">
                        {placement.studentName}
                      </h3>

                      <p className="text-gray-600">
                        {placement.company}
                      </p>

                      <p className="text-sm text-gray-500">
                        {placement.role}
                      </p>

                      <p className="text-sm text-gray-500">
                        ₹
                        {placement.package}{" "}
                        LPA
                      </p>

                      <p className="text-sm text-gray-500">
                        {placement.year}
                      </p>

                    </div>


                    {/* Action Buttons */}

                    <div className="flex gap-2">

                      {/* Edit */}

                      <button
                        onClick={() =>
                          onEdit(
                            placement
                          )
                        }
                        className="
                          px-4
                          py-2
                          rounded-lg
                          bg-blue-600
                          hover:bg-blue-700
                          text-white
                          text-sm
                          border-none
                          transition
                        "
                      >
                        Edit
                      </button>


                      {/* Delete */}

                      <button
                        onClick={() =>
                          setDeleteId(
                            placement._id
                          )
                        }
                        className="
                          px-4
                          py-2
                          rounded-lg
                          bg-red-600
                          hover:bg-red-700
                          text-white
                          text-sm
                          border-none
                          transition
                        "
                      >
                        Delete
                      </button>


                      {/* Publish */}

                      <button
                        onClick={() =>
                          handlePublish(
                            placement._id
                          )
                        }
                        className={`
                          px-4
                          py-2
                          rounded-lg
                          text-white
                          text-sm
                          border-none
                          transition
                          ${
                            placement.isPublished
                              ? "bg-yellow-600 hover:bg-yellow-700"
                              : "bg-green-600 hover:bg-green-700"
                          }
                        `}
                      >
                        {placement.isPublished
                          ? "Unpublish"
                          : "Publish"}
                      </button>

                    </div>

                  </div>

                </div>

              )
            )}

          </div>

        )}

      </div>


      {/* Delete Confirmation Modal */}

      <ConfirmModal
        isOpen={!!deleteId}
        title="Delete Placement"
        message="Are you sure you want to delete this placement?"
        onConfirm={handleDelete}
        onCancel={() =>
          setDeleteId(null)
        }
      />

    </>
  );
}

export default PlacementList;