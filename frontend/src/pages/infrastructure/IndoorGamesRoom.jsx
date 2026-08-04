import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import indoor1 from "../../assets/infrastructure/indoor1.jpg";
import indoor2 from "../../assets/infrastructure/indoor2.jpg";

function IndoorGamesRoom() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          INDOOR GAMES ROOM
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        {/* Images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <img
            src={indoor1}
            alt="Indoor Games Room"
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />

          <img
            src={indoor2}
            alt="Indoor Games Room"
            className="w-full h-72 object-cover rounded-xl shadow-md"
          />
        </div>

        {/* Description */}
        <div className="space-y-6">

          <p className="text-gray-700 text-lg leading-8 text-justify">
            The Indoor Games Room provides students with a vibrant
            space to relax, socialize and develop their sporting
            skills. The facility encourages recreational activities
            that promote physical fitness, concentration, teamwork
            and healthy competition among students.
          </p>

          <p className="text-gray-700 text-lg leading-8 text-justify">
            The room is well-maintained and equipped with facilities
            for a variety of indoor games, making it an ideal place
            for students to unwind after classes while nurturing
            sportsmanship, leadership qualities and overall
            well-being.
          </p>

          <h2 className="text-2xl font-bold text-[#2F2F6F] pt-2">
            Facilities Available
          </h2>

          <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 space-y-1">
            <li>Table Tennis</li>
            <li>Carrom Boards</li>
            <li>Chess</li>
            <li>Board Games</li>
            <li>Comfortable Seating Area</li>
            <li>Recreation and Student Interaction Space</li>
          </ul>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default IndoorGamesRoom;