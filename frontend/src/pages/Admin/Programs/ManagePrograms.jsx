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

      toast.success("Program Deleted Successfully");

      loadPrograms();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <div className="grid grid-cols-12 gap-8">

      <div className="col-span-12 lg:col-span-5">
        <ProgramForm
          selectedProgram={selectedProgram}
          setSelectedProgram={setSelectedProgram}
          triggerRefresh={loadPrograms}
        />
      </div>

      <div className="col-span-12 lg:col-span-7">
        <ProgramList
          programs={programs}
          onEdit={setSelectedProgram}
          onDelete={handleDelete}
          fetchPrograms={loadPrograms}
        />
      </div>

    </div>
  );
}

export default ManagePrograms;