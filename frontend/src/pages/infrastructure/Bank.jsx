import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import bank1 from "../../assets/infrastructure/bank1.jpg";

function Bank() {
  return (
    <>
        <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          BANK
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Image */}
        <div className="flex justify-center mb-12">
          <img
            src={bank1}
            alt="South Indian Bank"
            className="w-full max-w-3xl h-[400px] object-cover rounded-xl shadow-lg"
          />
        </div>

        {/* Description */}
        <div className="space-y-6">

          <p className="text-gray-700 text-lg leading-8 text-justify">
            South Indian Bank has a branch within the college campus,
            providing convenient banking facilities to students,
            faculty and staff. The branch offers regular banking
            services along with an ATM, ensuring easy access to
            financial transactions without having to leave the campus.
          </p>

          <h2 className="text-2xl font-bold text-[#2F2F6F] pt-2">
            Business Hours
          </h2>

          <div className="text-gray-700 text-lg leading-8">
            <p><strong>Monday to Saturday</strong></p>
            <p>10:00 AM – 2:00 PM</p>
            <p>2:30 PM – 3:30 PM</p>
            <p><strong>Lunch Break:</strong> 2:00 PM – 2:30 PM</p>
          </div>

          <h2 className="text-2xl font-bold text-[#2F2F6F] pt-2">
            Holidays
          </h2>

          <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 space-y-1">
            <li>2nd Saturday</li>
            <li>4th Saturday</li>
            <li>Sundays</li>
          </ul>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Bank;