import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import hostel1 from "../../assets/infrastructure/hostel1.jpg";
import hostel2 from "../../assets/infrastructure/hostel2.jpg";
import hostel3 from "../../assets/infrastructure/hostel3.jpg";

function Hostel() {
  return (
    <>
      <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          HOSTEL
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-10 py-16">

        <p className="text-gray-700 leading-8 text-justify text-lg mb-8">
          Hostel is run by the Sisters of St. Joseph of Tarbes.
          Admission will be granted on fulfillment of the following
          conditions:
        </p>

        <ul className="list-disc ml-8 space-y-2 text-gray-700 text-lg mb-10">
          <li>Admission to the college.</li>
          <li>Payment of hostel fees.</li>
        </ul>

        <h2 className="text-2xl font-bold text-[#2D2A70] mb-4">
          Regulations
        </h2>

        <p className="text-gray-700 leading-8 text-justify text-lg mb-10">
          An important rule in the hostel and college is consideration
          for others. Life in the hostel depends on mutual courtesy and
          co-operation between students, the warden, staff and companions
          in a friendly and open manner. Every student is expected to
          take part in at least one of the extracurricular activities
          in college. Students are expected to take care of furniture,
          crockery, books and other common property of the hostel.
        </p>

        <h2 className="text-2xl font-bold text-[#2D2A70] mb-4">
          Visitors
        </h2>

        <p className="text-gray-700 leading-8 text-justify text-lg mb-12">
          When a student joins the hostel, she will present to the
          warden a list of authorized visitors, signed by her parents.
        </p>

        {/* Images */}

        <div className="space-y-6">

          <img
            src={hostel1}
            alt="Hostel"
            className="w-full rounded-xl shadow-lg object-cover"
          />

          <div className="grid md:grid-cols-2 gap-6">

            <img
              src={hostel2}
              alt="Hostel Dining"
              className="w-full h-72 object-cover rounded-xl shadow-lg"
            />

            <img
              src={hostel3}
              alt="Hostel Kitchen"
              className="w-full h-72 object-cover rounded-xl shadow-lg"
            />

          </div>

        </div>

        {/* Contact */}

        <div className="mt-14 bg-[#F8F8FC] border border-gray-200 rounded-xl p-8">

          <h2 className="text-2xl font-bold text-[#2D2A70] mb-6">
            Hostel Admission Contact
          </h2>

          <div className="space-y-2 text-lg text-gray-700">
            <p>
              <span className="font-semibold">
                Hostel Warden:
              </span>{" "}
              Sr. Anna Maria F.
            </p>

            <p>
              <span className="font-semibold">
                Phone:
              </span>{" "}
              82201 40272
            </p>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Hostel;