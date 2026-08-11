import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

const Careers = () => {
  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-white">

        {/* Hero Section */}
        <section className="bg-[#3A356B] text-white py-16">
          <div className="max-w-[1200px] mx-auto px-6 text-center">
            <h1 className="text-3xl md:text-4xl font-semibold">
              Careers
            </h1>

            <p className="mt-3 text-sm md:text-base text-gray-200">
              Join Jyoti Nivas College and be a part of a vibrant academic
              community.
            </p>
          </div>
        </section>

        {/* Introduction */}
        <section className="max-w-[1100px] mx-auto px-6 py-14">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-2xl font-semibold text-[#3A356B]">
              Career Opportunities at Jyoti Nivas College
            </h2>

            <p className="mt-5 text-gray-600 text-[15px] leading-7">
              Jyoti Nivas College Autonomous is committed to academic
              excellence, holistic education, and the continuous development
              of its students and staff. We welcome passionate and dedicated
              individuals who wish to contribute to our academic and
              administrative community.
            </p>
          </div>

          {/* Current Openings */}
          <div className="mt-14">
            <h2 className="text-2xl font-semibold text-[#3A356B] text-center">
              Current Openings
            </h2>

            <div className="mt-7 border border-gray-200 rounded-lg p-8 text-center shadow-sm">
              <h3 className="text-lg font-medium text-gray-800">
                No Current Openings
              </h3>

              <p className="mt-2 text-sm text-gray-500 leading-6">
                There are currently no vacancies available. Please check this
                page regularly for future career opportunities at Jyoti Nivas
                College.
              </p>
            </div>
          </div>

          {/* How to Apply */}
          <div className="mt-14">
            <h2 className="text-2xl font-semibold text-[#3A356B]">
              How to Apply
            </h2>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-xl font-semibold text-[#3A356B]">
                  01
                </div>

                <h3 className="mt-3 font-semibold text-gray-800">
                  Check Openings
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-6">
                  Review the available positions and eligibility requirements.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-xl font-semibold text-[#3A356B]">
                  02
                </div>

                <h3 className="mt-3 font-semibold text-gray-800">
                  Submit Your Application
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-6">
                  Submit your updated resume and required documents through
                  the specified application process.
                </p>
              </div>

              <div className="border border-gray-200 rounded-lg p-6">
                <div className="text-xl font-semibold text-[#3A356B]">
                  03
                </div>

                <h3 className="mt-3 font-semibold text-gray-800">
                  Selection Process
                </h3>

                <p className="mt-2 text-sm text-gray-600 leading-6">
                  Shortlisted candidates will be contacted for the further
                  stages of the recruitment process.
                </p>
              </div>

            </div>
          </div>

          {/* Recruitment Process */}
          <div className="mt-14">
            <h2 className="text-2xl font-semibold text-[#3A356B] text-center">
              Recruitment Process
            </h2>

            <div className="mt-7 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#3A356B] text-white flex items-center justify-center font-semibold">
                  1
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">
                  Application
                </p>
              </div>

              <div className="hidden md:block text-gray-400">
                →
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#3A356B] text-white flex items-center justify-center font-semibold">
                  2
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">
                  Screening
                </p>
              </div>

              <div className="hidden md:block text-gray-400">
                →
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#3A356B] text-white flex items-center justify-center font-semibold">
                  3
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">
                  Interview
                </p>
              </div>

              <div className="hidden md:block text-gray-400">
                →
              </div>

              <div className="text-center">
                <div className="w-12 h-12 mx-auto rounded-full bg-[#3A356B] text-white flex items-center justify-center font-semibold">
                  4
                </div>
                <p className="mt-3 text-sm font-medium text-gray-700">
                  Selection
                </p>
              </div>

            </div>
          </div>

          {/* Contact */}
          <div className="mt-14 bg-gray-50 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-semibold text-[#3A356B]">
              For Career Enquiries
            </h2>

            <p className="mt-4 text-sm text-gray-600">
              Jyoti Nivas College Autonomous
            </p>

            <p className="text-sm text-gray-600">
              Hosur Road, Koramangala, Bengaluru - 560095
            </p>

            <p className="mt-2 text-sm text-gray-600">
              Phone: 080 25530137
            </p>

            <p className="text-sm text-gray-600">
              Email: info@jyotinivas.org
            </p>
          </div>

        </section>

      </main>

      <Footer />
    </>
  );
};

export default Careers;