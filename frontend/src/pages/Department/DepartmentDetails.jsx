import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";
import FacultyCard from "../../components/faculty/FacultyCard";

import { getDepartmentBySlug } from "../../services/departmentService";

const DepartmentDetails = () => {
  const { slug } = useParams();

  const [department, setDepartment] = useState(null);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    fetchDepartment();
  }, [slug]);

  const fetchDepartment = async () => {
    try {
      setLoading(true);

      const response = await getDepartmentBySlug(slug);

      setDepartment(response.data.data);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load department.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {loading ? (
        <Loader text="Loading department..." />
      ) : (
        <section className="bg-[#f8f9fc] min-h-screen">

          {/* Banner */}
          <div className="relative h-[320px]">
            <img
              src={
  department?.bannerImage ||
  "https://via.placeholder.com/1600x500?text=Department+Banner"
}
              alt={department?.name}
              className="w-full h-full object-cover"
            />

            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4">
                {department?.name}
              </h1>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-14">

            {/* About */}
            <section className="pb-10 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                About the Department
              </h2>

              <p className="text-gray-700 leading-8">
                {department?.about}
              </p>
            </section>

            {/* Vision */}
            <section className="py-10 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                Vision
              </h2>

              <p className="text-gray-700 leading-8">
                {department?.vision}
              </p>
            </section>

            {/* Mission */}
            <section className="py-10 border-b border-gray-200">
              <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                Mission
              </h2>

              <p className="text-gray-700 leading-8">
                {department?.mission}
              </p>
            </section>

{/* HOD Message */}
<section className="py-10 border-b border-gray-200">
  <h2 className="text-3xl font-bold text-[#2F2F6F] mb-8">
    HOD's Message
  </h2>

  <div className="grid md:grid-cols-[220px_1fr] gap-8 items-start">
    <img
      src={
        department?.hod?.image ||
        "https://via.placeholder.com/220x260?text=HOD"
      }
      alt={department?.hod?.name}
      className="w-[220px] h-[260px] object-cover rounded-xl shadow-md"
    />

    <div>
      <h3 className="text-2xl font-semibold text-[#2F2F6F]">
        {department?.hod?.name}
      </h3>

      <p className="text-[#E91E63] font-medium mt-1">
        Head of Department
      </p>

      <p className="mt-6 text-gray-700 leading-8 whitespace-pre-line">
        {department?.hodMessage}
      </p>
    </div>
  </div>
</section>

{/* Programmes Offered */}
<section className="py-10 border-b border-gray-200">
  <h2 className="text-3xl font-bold text-[#2F2F6F] mb-8">
    Programmes Offered
  </h2>

{department?.programmes?.length > 0 ? (
  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
    {department.programmes.map((programme) => (
      <div
        key={programme}
        className="bg-white rounded-lg shadow-sm border border-gray-100 px-6 py-5"
      >
        <p className="font-medium text-gray-700">
          {programme}
        </p>
      </div>
    ))}
  </div>
) : (
  <p className="text-gray-500">
    No programmes available.
  </p>
)}

</section>

{/* Faculty Members */}
<section className="py-12">
  <div className="flex items-center justify-between mb-8">
    <h2 className="text-3xl font-bold text-[#2F2F6F]">
      Our Faculty
    </h2>

    <span className="text-gray-500">
      {department?.faculty?.length || 0} Faculty Members
    </span>
  </div>

  {department?.faculty?.length > 0 ? (
    <div className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {department.faculty.map((member) => (
        <FacultyCard
          key={member._id}
          faculty={member}
        />
      ))}
    </div>
  ) : (
    <div className="bg-white rounded-lg border border-gray-200 py-12 text-center text-gray-500">
      No faculty members found.
    </div>
  )}
</section>
          </div>

        </section>
      )}

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

export default DepartmentDetails;