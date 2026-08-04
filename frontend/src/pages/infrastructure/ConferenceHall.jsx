import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function ConferenceHall() {
  return (
    <>
      <Header/> 
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          CONFERENCE HALL
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="max-w-4xl mx-auto">

          <p className="text-gray-700 text-lg leading-9 text-justify mb-10">
            The Conference Hall was built to accommodate delegates,
            students and faculty members during seminars,
            conferences, faculty meetings, training programmes
            and admission-related activities.
          </p>

          <p className="text-gray-700 text-lg leading-9 text-justify">
            The hall has a seating capacity of <strong>120 people</strong>
            and is equipped with an overhead projector,
            LCD system and other modern audio-visual aids,
            making it an ideal venue for academic,
            administrative and professional events.
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default ConferenceHall;