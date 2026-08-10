import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import RecruiterCard from "./RecruiterCard";

import {
  getRecruiters,
  deleteRecruiter,
} from "../../services/recruiterService";

const RecruiterList = ({
  onEdit,
  refresh,
}) => {
  const [recruiters, setRecruiters] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [
    recruiterToDelete,
    setRecruiterToDelete,
  ] = useState(null);

  useEffect(() => {
    fetchRecruiters();
  }, [refresh]);

  const fetchRecruiters = async () => {
    try {
      setLoading(true);

      const res =
        await getRecruiters();

      setRecruiters(
        res.data || []
      );
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load recruiters"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteRecruiter(
        recruiterToDelete
      );

      toast.success(
        "Recruiter deleted successfully"
      );

      setRecruiterToDelete(null);

      fetchRecruiters();
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to delete recruiter"
      );
    }
  };

  const filteredRecruiters =
    recruiters.filter(
      (recruiter) =>
        recruiter.logo?.url
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
    );

  return (
    <>
      {/* Recruiter List Container */}

      <div className="bg-white rounded-2xl shadow-md border-none overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between px-7 py-5 border-none">

          <h2 className="text-3xl font-bold text-[#2D2A70]">
            Recruiters
          </h2>


          {/* Search */}

          <div className="relative w-80">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search..."
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


        {/* Recruiters */}

        <div className="max-h-[760px] overflow-y-auto">

          {loading ? (

            <div className="py-12 text-center text-gray-500">
              Loading recruiters...
            </div>

          ) : filteredRecruiters.length === 0 ? (

            <div className="py-12 text-center text-gray-500">
              No recruiters found.
            </div>

          ) : (

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 p-5">

              {filteredRecruiters.map(
                (recruiter) => (

                  <RecruiterCard
                    key={
                      recruiter._id
                    }
                    recruiter={
                      recruiter
                    }
                    onEdit={
                      onEdit
                    }
                    onDelete={
                      setRecruiterToDelete
                    }
                  />

                )
              )}

            </div>

          )}

        </div>

      </div>


      {/* Delete Modal */}

      {recruiterToDelete && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white rounded-2xl p-6 w-[400px] shadow-xl border-none">

            <h3 className="text-xl font-bold text-[#2D2A70] mb-3">
              Delete Recruiter
            </h3>

            <p className="text-gray-600">
              Are you sure you want
              to delete this
              recruiter?
            </p>


            {/* Modal Buttons */}

            <div className="flex justify-end gap-3 mt-6">

              <button
                onClick={() =>
                  setRecruiterToDelete(
                    null
                  )
                }
                className="
                  px-4
                  py-2
                  rounded-lg
                  bg-gray-100
                  text-gray-700
                  hover:bg-gray-200
                  border-none
                  transition
                "
              >
                Cancel
              </button>


              <button
                onClick={
                  handleDelete
                }
                className="
                  px-4
                  py-2
                  bg-red-600
                  text-white
                  rounded-lg
                  hover:bg-red-700
                  border-none
                  transition
                "
              >
                Delete
              </button>

            </div>

          </div>

        </div>

      )}

    </>
  );
};

export default RecruiterList;