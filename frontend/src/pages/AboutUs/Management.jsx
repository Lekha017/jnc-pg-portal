import { useEffect, useState } from "react";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import { getAllManagement } from "../../services/managementService";

const Management = () => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    fetchManagement();
  }, []);

  const fetchManagement = async () => {
    try {
      setLoading(true);

      const response = await getAllManagement();

      setMembers(response.data || []);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load management members.",
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

      {/* Hero */}

      <section className="bg-[#2F2F6F] py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Management
          </h1>
        </div>
      </section>

      {/* Content */}

      <section className="bg-white py-16 min-h-screen">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <Loader text="Loading Management..." />
          ) : members.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No management members found.
            </div>
          ) : (
            <>
             <h2 className="text-4xl font-bold text-center text-black mb-12">
  Management committee members for the year 2026 - 2027
</h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {members.map((member) => (
                  <div
                    key={member._id}
                   className="border border-gray-200 bg-white p-5 flex items-center gap-8 min-h-[220px]"
                  >

                    {/* Image */}

                   <div className="w-40 h-40 flex-shrink-0">
  {member.image ? (
    <img
      src={member.image}
      alt={member.name}
      className="w-full h-full object-cover"
    />
  ) : (
    <div className="w-full h-full"></div>
  )}
</div>

                    {/* Details */}

                  <div>
  <h2 className="text-[22px] font-bold text-[#1f2b6c] leading-snug mb-3">
    {member.name}
  </h2>

  <p className="text-[18px] text-gray-600 leading-10">
  {member.designation}
</p>
</div>

                  </div>
                ))}

              </div>
            </>
          )}

        </div>
      </section>

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

export default Management;