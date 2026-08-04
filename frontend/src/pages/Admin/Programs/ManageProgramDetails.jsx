import { useEffect, useState } from "react";

import ProgramDetailsForm from "../../../components/admin/programDetails/ProgramDetailsForm";
import ProgramDetailsList from "../../../components/admin/programDetails/ProgramDetailsList";

import {
  getProgramDetails,
  deleteProgramDetails,
} from "../../../services/programDetailsService";

import { toast } from "react-toastify";

function ManageProgramDetails() {
  const [details, setDetails] =
    useState([]);

  const [
    selectedDetails,
    setSelectedDetails,
  ] = useState(null);

  const [loading, setLoading] =
    useState(false);

  const loadDetails = async () => {
    try {
      setLoading(true);

      const res =
        await getProgramDetails();

      setDetails(res.data || []);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load program details"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDetails();
  }, []);

  const handleDelete = async (
    id
  ) => {
    try {
      await deleteProgramDetails(
        id
      );

      toast.success(
        "Program Details Deleted Successfully"
      );

      loadDetails();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete Failed"
      );
    }
  };

  return (
    <div className="p-8">

      {/* Header */}

      <h1 className="text-5xl font-bold text-[#2D2A70]">
        Program Details
      </h1>

      <p className="text-gray-600 mt-3 text-lg">
        Create, update and manage
        detailed program information.
      </p>

      {/* Divider */}

      <div className="border-b border-gray-300 mt-8 mb-8"></div>

      {/* Content */}

      <div className="grid grid-cols-12 gap-8">

        {/* LEFT */}

        <div className="col-span-12 lg:col-span-5">
          <ProgramDetailsForm
            selectedDetails={
              selectedDetails
            }
            setSelectedDetails={
              setSelectedDetails
            }
            triggerRefresh={
              loadDetails
            }
          />
        </div>

        {/* RIGHT */}

        <div className="col-span-12 lg:col-span-7">
          <ProgramDetailsList
            details={details}
            loading={loading}
            fetchDetails={
              loadDetails
            }
            onEdit={
              setSelectedDetails
            }
            onDelete={
              handleDelete
            }
          />
        </div>

      </div>

    </div>
  );
}

export default ManageProgramDetails;