import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const OrganizationStructure = () => {
  return (
    <>
      <Header />
      <Navbar />

      <section className="bg-[#f8f9fc] min-h-screen">
        {/* Page Header */}
        <div className="bg-[#2F2F6F] text-white">
          <div className="max-w-7xl mx-auto px-5 py-10 text-center">
            <h1 className="text-4xl md:text-5xl font-bold">
              Organization Structure
            </h1>

            <p className="mt-4 text-lg text-gray-200">
              Organogram of Jyoti Nivas College Autonomous
            </p>
          </div>
        </div>

        {/* Organogram */}
        <div className="max-w-7xl mx-auto px-6 py-14">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
           <img
  src="/Organogram_JNC.jpg"
  alt="Organization Structure"
  className="w-full max-w-5xl mx-auto object-contain"
/>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default OrganizationStructure;