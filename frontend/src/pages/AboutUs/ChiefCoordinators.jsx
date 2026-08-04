import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const coordinators = [
  {
    name: "Ms. Naureen Aziz",
    qualification: "MA., SLET",
    department: "Department of English",
    image: "/naureen.jpg",
  },
  {
    name: "Mrs. Grace Samuel",
    qualification: "M.Com, M.Phil",
    department: "Department Of Commerce and Management",
    image: "Grace_Samuel.jpg",
  },
  {
    name: "Mr. V M Shanmugam",
    qualification: "M.Sc., M Phil., NET, PhD (Ongoing)",
    department: "Department Of Biotechnology",
    image: "/shanmukan.jpg",
  },
];

const ChiefCoordinators = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Chief Coordinators
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">

            {coordinators.map((item, index) => (
              <div
                key={index}
                className="text-center"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-[250px] h-[300px] object-cover shadow-sm"
                />

                <h3 className="mt-4 text-xl font-bold text-[#2F2F6F]">
                  {item.name}
                </h3>

                <p className="mt-2 text-gray-700">
                  {item.qualification}
                </p>

                <p className="mt-2 text-gray-600">
                  {item.department}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ChiefCoordinators;