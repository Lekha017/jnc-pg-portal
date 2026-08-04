import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import meditation1 from "../../assets/infrastructure/meditation1.jpg";
import meditation2 from "../../assets/infrastructure/meditation2.jpg";

function MeditationRoom() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          MEDITATION ROOM
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="max-w-3xl">

          <div className="grid lg:grid-cols-2 gap-8 mb-10">

          <img
            src={meditation1}
            alt="Meditation Room"
            className="w-full h-[350px] object-cover rounded-xl shadow-lg"
          />

          <img
            src={meditation2}
            alt="Meditation Room Interior"
            className="w-full h-[350px] object-cover rounded-xl shadow-lg"
          />

        </div>

          <div className="space-y-5 text-lg leading-8 text-gray-700">

            <p>
              Open on all working days from
              <strong> 9.00 AM to 4.00 PM</strong>.
            </p>

            <p>
              On Saturdays the meditation room remains open from
              <strong> 9.00 AM to 12.00 PM</strong>.
            </p>

            <p>
              <strong>Person In-charge:</strong> Mr. Raghul N (Supervisor)
            </p>

            <p>
              The Meditation Room provides a peaceful and serene atmosphere
              where students and staff can spend time in silence, reflection,
              meditation and prayer. It encourages mindfulness, inner peace,
              emotional well-being and personal growth in a calm environment.
            </p>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default MeditationRoom;