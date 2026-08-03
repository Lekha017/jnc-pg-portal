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


    const fetchPlacements =
        async () => {

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


    const handleDelete =
        async () => {

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


    const handlePublish =
        async (id) => {

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

           <div className="bg-white rounded-2xl shadow-md border border-gray-200">


                {/* Header */}

                <div className="flex items-center justify-between px-7 py-5 border-b">


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
                                setSearch(e.target.value)
                            }
                            className="w-full border border-gray-200 rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#2D2A70]"
                        />

                    </div>


                </div>

                {filteredPlacements.length === 0 ? (

                    <div className="text-center py-16">

                        <p className="text-lg text-gray-500">
                            No Placements Found
                        </p>

                    </div>

                ) : (

                    <div className="space-y-4">


                        {filteredPlacements.map(
                            (placement) => (

                                <div
                                    key={placement._id}
                                    className="bg-white border border-gray-200 rounded-xl p-5 hover:bg-gray-50 transition"
                                >


                                    <div className="flex justify-between items-start">


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
                                                {placement.package}
                                                {" "}
                                                LPA
                                            </p>


                                            <p className="text-sm text-gray-500">
                                                {placement.year}
                                            </p>


                                        </div>



                                        <div className="flex gap-2">


                                            <button
                                                onClick={() =>
                                                    onEdit(
                                                        placement
                                                    )
                                                }
                                                className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm"
                                            >
                                                Edit
                                            </button>



                                            <button
                                                onClick={() =>
                                                    setDeleteId(
                                                        placement._id
                                                    )
                                                }
                                                className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm"
                                            >
                                                Delete
                                            </button>



                                            <button
                                                onClick={() =>
                                                    handlePublish(
                                                        placement._id
                                                    )
                                                }
                                                className={`px-4 py-2 rounded-lg text-white text-sm ${placement.isPublished
                                                    ? "bg-yellow-600"
                                                    : "bg-green-600"
                                                    }`}
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