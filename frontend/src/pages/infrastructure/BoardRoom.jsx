import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function BoardRoom() {
  return (
    <>
      <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          BOARD ROOM
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16">

        <div className="space-y-8">

          <p className="text-gray-700 leading-8 text-lg text-justify">
            The Board Room with a seating capacity of <strong>50</strong> is
            primarily used for academic and administrative purposes. It serves
            as a venue for meetings, presentations, academic discussions,
            workshops, and decision-making sessions conducted by the college
            management and various departments.
          </p>

          <p className="text-gray-700 leading-8 text-lg text-justify">
            The hall is equipped with an <strong>Overhead Projector</strong>,
            <strong> LCD Projection System</strong>, and other
            <strong> audio-visual aids</strong>, ensuring an interactive and
            professional environment for seminars, committee meetings,
            faculty development programmes, and institutional planning.
          </p>

        </div>

        {/* Facilities */}
        <div className="mt-16">

          <h2 className="text-3xl font-bold text-[#2D2A70] mb-8">
            Facilities
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              "Seating Capacity – 50 Members",
              "LCD Projection System",
              "Overhead Projector",
              "Audio Visual Equipment",
              "Academic & Administrative Meetings",
              "Seminars & Presentations",
            ].map((facility, index) => (
              <div
                key={index}
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-xl
                  p-5
                  shadow-sm
                  hover:shadow-md
                  transition
                "
              >
                <p className="text-gray-700 font-medium">
                  {facility}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default BoardRoom;