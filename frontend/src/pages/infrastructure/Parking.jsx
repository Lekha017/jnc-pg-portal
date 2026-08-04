import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function Parking() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          PARKING
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="space-y-8">

          <p className="text-gray-700 text-lg leading-8 text-justify">
            The college provides a spacious and well-organized parking
            facility to accommodate the increasing number of students
            and staff commuting by two-wheelers and four-wheelers.
            Approximately <strong>1500 sq. ft.</strong> of space has
            been allotted for parking two-wheelers, ensuring convenient
            access and smooth vehicle movement within the campus.
          </p>

          <p className="text-gray-700 text-lg leading-8 text-justify">
            Students who commute by four-wheelers are also permitted to
            park their vehicles in the designated parking area,
            provided they carry their valid parking passes and comply
            with all security requirements laid down by the college.
          </p>

          <p className="text-gray-700 text-lg leading-8 text-justify">
            Separate parking spaces are allocated for students and
            staff to maintain proper organization and easy access.
            The entire parking area is monitored by campus security,
            ensuring the safety and security of all vehicles parked
            within the premises.
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Parking;