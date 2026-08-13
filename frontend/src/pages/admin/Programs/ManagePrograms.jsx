import { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";

import ProgramForm from "../../../components/admin/programs/ProgramForm";
import ProgramList from "../../../components/admin/programs/ProgramList";

import {
  getPrograms,
  deleteProgram,
} from "../../../services/programService";

import { toast } from "react-toastify";

function ManagePrograms() {

  const [programs, setPrograms] =
    useState([]);

  const [selectedProgram, setSelectedProgram] =
    useState(null);

  const [showForm, setShowForm] =
    useState(false);


  const loadPrograms = async () => {

    try {

      const res =
        await getPrograms();

      setPrograms(res.data || []);

    } catch (error) {

      console.error(error);

      toast.error(
        "Failed to load programs"
      );

    }

  };


  useEffect(() => {
    loadPrograms();
  }, []);


  const handleDelete = async (id) => {

    try {

      await deleteProgram(id);

      toast.success(
        "Program Deleted Successfully"
      );

      loadPrograms();

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
            setSelectedProgram(null);
            setShowForm(true);
          }}
          className="flex items-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
        >

          <Plus size={18} />

          Add Program

        </button>

      </div>


      {/* Program List */}

      <ProgramList
        programs={programs}
        onEdit={(program) => {
          setSelectedProgram(program);
          setShowForm(true);
        }}
        onDelete={handleDelete}
        fetchPrograms={loadPrograms}
      />


      {/* Popup */}

      {showForm && (

        <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">


          <div className="min-h-screen flex items-start justify-center p-8">


            <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">


              {/* Close Button */}

              <button
                onClick={() => {
                  setShowForm(false);
                  setSelectedProgram(null);
                }}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
              >

                <X size={24} />

              </button>


              <div className="p-10">


                <ProgramForm
                  selectedProgram={selectedProgram}
                  setSelectedProgram={setSelectedProgram}
                  triggerRefresh={() => {
                    loadPrograms();
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

export default ManagePrograms;