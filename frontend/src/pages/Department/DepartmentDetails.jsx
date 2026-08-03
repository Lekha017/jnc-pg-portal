import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";
import FacultyCard from "../../components/faculty/FacultyCard";
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
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

      // departmentService already returns response.data.data
      setDepartment(response);
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
      <Header />
      <Navbar />

      {loading ? (
        <Loader text="Loading department..." />
      ) : (
        <section className="bg-[#f8f9fc] min-h-screen">

          {/* Department Header */}
          <div className="bg-[#2F2F6F] text-white">
            <div className="max-w-7xl mx-auto px-5 py-10 text-center">
              <h1 className="text-4xl md:text-5xl font-bold">
                {department?.name}
              </h1>

              <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
                Welcome to the Department of {department?.name}
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-6 py-14">

            {/* About */}
            {department?.about?.trim() && (
              <section className="pb-10 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                  About the Department
                </h2>

                <p className="text-gray-700 leading-8">
                  {department.about}
                </p>
              </section>
            )}

            {/* Vision */}
            {department?.vision?.trim() && (
              <section className="py-10 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                  Vision
                </h2>

                <p className="text-gray-700 leading-8">
                  {department.vision}
                </p>
              </section>
            )}

            {/* Mission */}
            {department?.mission?.trim() && (
              <section className="py-10 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                  Mission
                </h2>

                <p className="text-gray-700 leading-8">
                  {department.mission}
                </p>
              </section>
            )}

            {/* HOD Message */}
            {department?.hod && (
              <section className="py-12 border-b border-gray-200">
                <h2 className="text-3xl font-bold text-[#2F2F6F] mb-10">
                  HOD's Message
                </h2>

                <div className="grid lg:grid-cols-[240px_1fr] gap-12 items-start">

                  {/* HOD Card */}
                  <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">
                    <img
                      src={
                        department.hod.image ||
                        "https://via.placeholder.com/240x300?text=HOD"
                      }
                      alt={department.hod.fullName}
                      className="w-full h-[300px] object-cover"
                    />

                    <div className="p-5 text-center">
                      <h3 className="text-xl font-bold text-[#2F2F6F]">
                        {department.hod.fullName}
                      </h3>

                      <p className="mt-1 text-[#E91E63] font-medium">
                        Head of Department
                      </p>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                    {department.hodMessage?.trim() ? (
                      <p className="text-gray-700 leading-9 whitespace-pre-line text-[17px]">
                        {department.hodMessage}
                      </p>
                    ) : (
                      <p className="text-gray-500 italic">
                        No message available from the Head of Department.
                      </p>
                    )}

                  </div>
                </div>
              </section>
            )}

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
      <Footer />
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