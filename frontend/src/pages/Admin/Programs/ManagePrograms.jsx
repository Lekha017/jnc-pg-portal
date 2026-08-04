import { useEffect, useState } from "react";

import ProgramForm from "../../../components/admin/programs/ProgramForm";
import ProgramList from "../../../components/admin/programs/ProgramList";

import {
  getPrograms,
  deleteProgram,
} from "../../../services/programService";

import { toast } from "react-toastify";

function ManagePrograms() {
  const [programs, setPrograms] = useState([]);

  const [selectedProgram, setSelectedProgram] =
    useState(null);

  const loadPrograms = async () => {
    try {
      const res = await getPrograms();

      setPrograms(res.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load programs");
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
    <div className="pt-8 px-6">

      {/* PAGE HEADER */}

      <div className="mb-10">

        <h1 className="text-5xl font-bold text-[#2D2A70]">
          Manage Programs
        </h1>

        <p className="text-gray-600 text-lg mt-3">
          Create, update and manage admission programs.
        </p>

        <div className="border-b border-gray-300 mt-8"></div>

      </div>

      {/* CONTENT */}

      <div className="grid grid-cols-12 gap-8">

        {/* LEFT */}

        <div className="col-span-12 lg:col-span-5">

          <ProgramForm
            selectedProgram={selectedProgram}
            setSelectedProgram={setSelectedProgram}
            triggerRefresh={loadPrograms}
          />

        </div>

        {/* RIGHT */}

        <div className="col-span-12 lg:col-span-7">

          <ProgramList
            programs={programs}
            onEdit={setSelectedProgram}
            onDelete={handleDelete}
            fetchPrograms={loadPrograms}
          />

        </div>

      </div>

    </div>
  );
}

export default ManagePrograms;