import { useState } from "react";
import {
    Search,
    RefreshCcw,
} from "lucide-react";

import ProgramCard from "./ProgramCard";
import ConfirmModal from "../../common/ConfirmModal";


function ProgramList({
    programs,
    loading,
    fetchPrograms,
    onEdit,
    onDelete,
}) {

    const [search, setSearch] = useState("");

    const [
        showDeleteModal,
        setShowDeleteModal,
    ] = useState(false);


    const [
        selectedProgram,
        setSelectedProgram,
    ] = useState(null);



    const filteredPrograms =
        programs.filter((program) =>
            program.programName
                ?.toLowerCase()
                .includes(
                    search.toLowerCase()
                )
        );



    const handleDeleteClick = (program) => {

        setSelectedProgram(program);

        setShowDeleteModal(true);

    };



    const confirmDelete = async () => {

        if (!selectedProgram) return;


        await onDelete(
            selectedProgram._id
        );


        setShowDeleteModal(false);

        setSelectedProgram(null);

    };



    return (

        <div
            className="
        bg-white
        rounded-2xl
        border
        border-gray-200
        shadow-sm
        p-5
      "
        >


            {/* Header */}

            <div
                className="
          flex
          justify-between
          items-center
          mb-5
        "
            >
               <h2 className="text-3xl font-bold text-[#2D2A70]">
                    Existing Programs
                </h2>

            </div>
            

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
                        setSearch(e.target.value)
                    }
                    className="
      w-full
      border
      border-gray-300
      rounded-2xl
      pl-12
      pr-4
      py-4
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

                {
                    loading ? (

                        <p className="text-center text-gray-500">
                            Loading programs...
                        </p>


                    ) : filteredPrograms.length === 0 ? (


                        <p
                            className="
                text-center
                text-gray-500
                py-10
              "
                        >
                            No programs found
                        </p>


                    ) : (


                        filteredPrograms.map((program) => (

                            <ProgramCard

                                key={program._id}

                                program={program}

                                onEdit={onEdit}

                                onDelete={() =>
                                    handleDeleteClick(program)
                                }

                            />


                        ))


                    )
                }


            </div>



            {/* Confirm Delete */}

            {
                showDeleteModal && (
                    <ConfirmModal
                        isOpen={showDeleteModal}
                        title="Delete Program"
                        message={`Are you sure you want to delete ${selectedProgram?.programName}?`}
                        onConfirm={confirmDelete}
                        onCancel={() => {
                            setShowDeleteModal(false);
                            setSelectedProgram(null);
                        }}
                    />
                )
            }

        </div>

    );

}


export default ProgramList;