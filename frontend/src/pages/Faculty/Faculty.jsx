import { useEffect, useState } from "react";

import FacultyHeader from "../../components/faculty/FacultyHeader";
import FacultyFilters from "../../components/faculty/FacultyFilters";
import FacultyGrid from "../../components/faculty/FacultyGrid";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import { getAllFaculty } from "../../services/facultyService";
import { getDepartments } from "../../services/departmentService";

const Faculty = () => {
  const [faculty, setFaculty] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const limit = 8;

  useEffect(() => {
    fetchDepartments();
  }, []);

  useEffect(() => {
    fetchFaculty();
  }, [currentPage, search, department]);

  const fetchDepartments = async () => {
    try {
      const data = await getDepartments();
      setDepartments(data);
    } catch (error) {
      console.error("Error loading departments:", error);

      setToast({
        show: true,
        message: "Failed to load departments.",
        type: "error",
      });
    }
  };

  const fetchFaculty = async () => {
    try {
      setLoading(true);

      const response = await getAllFaculty({
        page: currentPage,
        limit,
        search,
        department,
      });

      setFaculty(response.data.data || []);
      setTotalPages(response.data.totalPages || 1);
    } catch (error) {
      console.error("Error loading faculty:", error);

      setToast({
        show: true,
        message: "Failed to load faculty members.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleDepartment = (value) => {
    setDepartment(value);
    setCurrentPage(1);
  };

  return (
    <>
      <FacultyHeader />

      <section className="bg-white py-10 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">
          <FacultyFilters
            search={search}
            onSearch={handleSearch}
            department={department}
            onDepartment={handleDepartment}
            departments={departments}
          />

          {loading ? (
            <Loader text="Loading faculty..." />
          ) : (
            <>
              <FacultyGrid faculty={faculty} />

              {!faculty.length && (
                <div className="text-center py-12 text-gray-500">
                  No faculty members found.
                </div>
              )}

              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-3 mt-12">
                  <button
                    onClick={() =>
                      setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>

                  {Array.from(
                    { length: totalPages },
                    (_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentPage(index + 1)}
                        className={`px-4 py-2 rounded-md transition ${
                          currentPage === index + 1
                            ? "bg-[#4B4B7C] text-white"
                            : "border hover:bg-gray-100"
                        }`}
                      >
                        {index + 1}
                      </button>
                    )
                  )}

                  <button
                    onClick={() =>
                      setCurrentPage((prev) =>
                        Math.min(prev + 1, totalPages)
                      )
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 border rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    </>
  );
};

export default Faculty;