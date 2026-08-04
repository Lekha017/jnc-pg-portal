import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import gym1 from "../../assets/infrastructure/gym1.jpg";
import gym2 from "../../assets/infrastructure/gym2.jpg";
import gym3 from "../../assets/infrastructure/gym3.jpg";
import gym4 from "../../assets/infrastructure/gym4.jpg";

import { Phone } from "lucide-react";

function Gymnasium() {
  return (
    <>
      <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          GYMNASIUM
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="space-y-8">

          <div>
            <h2 className="text-3xl font-bold text-[#2F2F6F] mb-3">
              Gym Contact
            </h2>

            <div className="flex items-center gap-3 text-xl font-semibold text-gray-800">
              <Phone className="text-pink-600" size={24} />
              <span>Dr. Judy, Sports Department</span>
            </div>

            <p className="ml-9 text-lg font-medium text-gray-700">
              +91 78298 99909
            </p>
          </div>

          <p className="text-lg leading-9 text-gray-700 text-justify">
            In addition to academics, the college also pays special
            attention to the health and fitness of its students.
            The Gymnasium is a valuable addition to the campus
            facilities and is equipped with modern fitness
            equipment including cross trainers, multi-gyms,
            treadmills, upright bikes, recumbent bikes and
            stationary bikes to promote a healthy lifestyle.
          </p>

          {/* Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <img
              src={gym1}
              alt="Gym 1"
              className="w-full h-60 object-cover rounded-xl shadow-md"
            />

            <img
              src={gym2}
              alt="Gym 2"
              className="w-full h-60 object-cover rounded-xl shadow-md"
            />

            <img
              src={gym3}
              alt="Gym 3"
              className="w-full h-60 object-cover rounded-xl shadow-md"
            />

            <img
              src={gym4}
              alt="Gym 4"
              className="w-full h-60 object-cover rounded-xl shadow-md"
            />

          </div>

          {/* Timings */}
          <div className="pt-4">
            <h2 className="text-3xl font-bold text-[#2F2F6F] mb-4">
              Timings
            </h2>

            <p className="text-lg text-gray-700 mb-2">
              <strong>Monday – Friday:</strong> 2:00 PM – 5:00 PM
            </p>

            <p className="text-lg text-gray-700">
              <strong>Saturday:</strong> 10:00 AM – 12:00 PM
            </p>
          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Gymnasium;