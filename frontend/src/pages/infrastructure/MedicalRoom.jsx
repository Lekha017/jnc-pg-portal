import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function MedicalRoom() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold tracking-wide text-white">
          MEDICAL ROOM
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16">

        <div className="space-y-8">

          <p className="text-lg leading-8 text-gray-700 text-justify">
            Mabel's Clinic is an innovative health-tech centre founded by
            Dr. Girish B Raj (MBBS, MBA-IIMB, ADHD), that provides
            accessible and quality primary healthcare using a judicious
            mix of technology and on-ground interventions to improve
            health outcomes.
          </p>

          <p className="text-lg leading-8 text-gray-700 text-justify">
            Mabel's Clinic has set up a well-equipped Medical Room in the
            Jyoti Nivas campus for students and staff, providing various
            healthcare services including nursing facility, regular
            physician visits, basic medications for primary healthcare,
            emergency support and regular health camps.
          </p>

          <p className="text-lg leading-8 text-gray-700 text-justify">
            It also provides both conventional and online consultations
            by qualified doctors, diagnostic support and referral
            services.
          </p>

          <p className="text-lg leading-8 text-gray-700 text-justify">
            College healthcare services are established on the campus to
            promote the health of students through disease prevention,
            early case finding, referral for intervention and remediation
            of specific health problems, as well as health education,
            counselling and dental care.
          </p>

        </div>

        {/* Advantages */}

        <div className="mt-16">

          <h2 className="text-3xl font-bold text-[#2D2A70] mb-8">
            Advantages
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            {[
              "Students have direct access to healthcare providers in a convenient and confidential setting within the college premises.",
              "Prevention and early intervention are promoted.",
              "Students do not have to miss classes to receive basic healthcare.",
              "Students learn how to use medical services in a non-intimidating environment.",
              "Referrals are made to appropriate healthcare providers.",
              "College employees also receive healthcare services to help them stay healthy and productive.",
            ].map((item, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"
              >
                <p className="text-gray-700 leading-7">
                  {item}
                </p>
              </div>
            ))}

          </div>

        </div>

        {/* Visiting Consultants */}

        <div className="mt-20">

          <h2 className="text-3xl font-bold text-[#2D2A70] mb-8">
            Mabel Clinic – Visiting Consultants
          </h2>

          <div className="overflow-x-auto rounded-xl border border-gray-200">

            <table className="w-full">

              <thead className="bg-[#2F2F6F] text-white">

                <tr>

                  <th className="px-6 py-4 text-left">
                    Department
                  </th>

                  <th className="px-6 py-4 text-left">
                    Name
                  </th>

                  <th className="px-6 py-4 text-left">
                    Days
                  </th>

                  <th className="px-6 py-4 text-left">
                    Timing
                  </th>

                </tr>

              </thead>

              <tbody>

                <tr className="border-t border-gray-200">

                  <td className="px-6 py-5">
                    General Physician
                  </td>

                  <td className="px-6 py-5">
                    Dr. Girish B Raj /<br />
                    Dr. Divakar Reddy
                  </td>

                  <td className="px-6 py-5">
                    Monday to Friday
                    <br />
                    (In-person / Tele-consultation)
                  </td>

                  <td className="px-6 py-5">
                    12:00 Noon – 2:00 PM
                  </td>

                </tr>

                <tr className="border-t border-gray-200 bg-gray-50">

                  <td className="px-6 py-5">
                    Dentist
                  </td>

                  <td className="px-6 py-5">
                    Dr. Vijetha /
                    Dr. Rishika
                  </td>

                  <td className="px-6 py-5">
                    All Working Saturdays
                  </td>

                  <td className="px-6 py-5">
                    10:30 AM – 2:30 PM
                  </td>

                </tr>

                <tr className="border-t border-gray-200">

                  <td className="px-6 py-5">
                    Nursing Staff
                  </td>

                  <td className="px-6 py-5">
                    Ms. Asha
                  </td>

                  <td className="px-6 py-5">
                    All Working Days
                  </td>

                  <td className="px-6 py-5">
                    8:30 AM – 4:30 PM
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default MedicalRoom;