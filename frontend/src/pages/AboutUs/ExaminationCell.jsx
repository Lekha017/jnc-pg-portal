import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const boardMembers = [
  {
    left: "Chairperson: Dr. Sr. Mary Louisa .S",
    right: "",
  },
  {
    left: "Controller of Examinations",
    right: "Senior Subject Experts",
  },
  {
    left: "Deans",
    right: "Heads of Departments",
  },
  {
    left: "Deputy Deans",
    right: "",
  },
];

const ExaminationCell = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Examination Cell
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">

          <p className="text-gray-700 leading-8 text-justify mb-10">
            The examination cell functions through the Examination section,
            Evaluation section and the Confidential section headed by the
            Controller of Examination (COE). The examination reforms brought
            about in the college are in the form of bar coding, credit based
            system, online valuation, online admission forms and online issue
            of marks cards.
          </p>

          {/* Controller */}
          <div className="flex flex-col items-center mb-12">
            <img
              src="/exam-cell.jpg"
              alt="Controller of Examination"
              className="w-44 h-52 object-cover rounded-lg shadow"
            />

            <h3 className="mt-4 text-xl font-semibold text-[#2F2F6F]">
              Ms. Neeta T R
            </h3>

            <p className="text-gray-600">
              Controller of Examination (COE)
            </p>

            <a
              href="mailto:coe.jyotinivas@jyotinivas.org"
              className="text-[#2F2F6F] hover:underline mt-1"
            >
              coe.jyotinivas@jyotinivas.org
            </a>
          </div>

          {/* Board */}
          <div className="rounded-xl overflow-hidden border border-gray-200">

            <div className="bg-[#2F2F6F] text-white px-6 py-4">
              <h2 className="text-xl font-semibold">
                BOARD OF EXAMINATIONS
              </h2>
            </div>

            {boardMembers.map((member, index) => (
              <div
                key={index}
                className={`grid grid-cols-2 ${
                  index !== boardMembers.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                <div className="px-6 py-4 bg-gray-50">
                  {member.left}
                </div>

                <div className="px-6 py-4">
                  {member.right}
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default ExaminationCell;