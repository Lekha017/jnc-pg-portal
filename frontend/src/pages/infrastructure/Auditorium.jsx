import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import auditoriumImg from "../../assets/infrastructure/audi.jpg";

function Auditorium() {
  return (
    <>
      <Header/>
      <Navbar />

      {/* Hero Section */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          AUDITORIUM
        </h1>
      </section>


      {/* Content */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-16">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Text Content */}
          <div>

            <p className="text-gray-700 leading-8 mb-8 text-justify text-lg">
              The college takes pride in promoting the aesthetic and
              cultural sensibilities of its students. The Jyoti Nivas
              Auditorium acts as a cultural hub that showcases
              aesthetic and artistic expression. Plays, music and dance
              performances, intellectual seminars, and edifying film
              screenings, all find a venue here.
            </p>


            <p className="text-gray-700 leading-8 text-justify text-lg">
              Centrally located on the campus, the Jyoti Nivas
              Auditorium boasts a state-of-the-art mixer, seating
              capacity of over 1200, theatre surround sound,
              well-equipped green rooms, and gendered washrooms.
              Besides cultural programmes, important college events,
              like the Convocation and the Investiture ceremony are
              held here.
            </p>

          </div>


          {/* Image */}
          <div>
            <img
              src={auditoriumImg}
              alt="Jyoti Nivas Auditorium"
              className="
                w-full
                h-[420px]
                object-cover
                rounded-xl
                shadow-lg
              "
            />
          </div>

        </div>


        {/* Facilities */}
        <div className="mt-20">

          <h2 className="text-3xl font-bold text-[#2D2A70] mb-8">
            Facilities
          </h2>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              "Seating Capacity of 1200+",
              "State-of-the-art Audio Mixer",
              "Theatre Surround Sound",
              "Well-equipped Green Rooms",
              "Modern Stage Facilities",
              "Gender-specific Washrooms",
            ].map((facility, index) => (

              <div
                key={index}
                className="
                  border
                  border-gray-200
                  rounded-xl
                  p-5
                  bg-white
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

export default Auditorium;