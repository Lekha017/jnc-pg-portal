import { useEffect, useState } from "react";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

import { getAllDeans } from "../../services/deanService";

const Deans = () => {
  const [deans, setDeans] = useState([]);
  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    fetchDeans();
  }, []);

  const fetchDeans = async () => {
    try {
      setLoading(true);

      const response = await getAllDeans();

      setDeans(response.data || []);
    } catch (error) {
      console.error(error);

      setToast({
        show: true,
        message: "Failed to load deans.",
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

      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Deans
          </h1>
        </div>
      </section>

      {/* Content */}

      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <Loader text="Loading Deans..." />
          ) : deans.length === 0 ? (
            <div className="text-center text-gray-500 py-20">
              No deans found.
            </div>
          ) : (
            <>
            

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {deans.map((dean) => (
                  <div
                    key={dean._id}
                    className="border border-gray-300 rounded-xl p-6 flex gap-6 items-center bg-white"
                  >
                    <div className="flex-shrink-0">
                      {dean.image ? (
                        <img
                          src={dean.image}
                          alt={dean.name}
                          className="w-48 h-56 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-48 h-56 border border-gray-300 rounded-lg bg-white"></div>
                      )}
                    </div>

                    <div>
                      <h3 className="text-[26px] font-semibold text-[#2F2F6F] leading-tight">
                        {dean.name}
                      </h3>

                      <p className="mt-3 text-[18px] text-gray-600 italic">
                        {dean.qualification}
                      </p>

                      <p className="mt-2 text-[18px] text-gray-600 leading-8">
                        {dean.designation}
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

export default Deans;