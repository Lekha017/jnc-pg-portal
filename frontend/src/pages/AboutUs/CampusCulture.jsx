import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const CampusCulture = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero Section */}

      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Campus Culture
          </h1>

        </div>
      </section>

      {/* Content */}

      <section className="bg-white py-16">
        <div className="max-w-5xl mx-auto px-6">

          <p className="text-gray-800 text-[19px] leading-10 text-justify">
            Jyoti Nivas College is located in the garden city Bangalore,
            Karnataka. The well-maintained lawns, extensive greenery,
            aesthetically designed buildings are conducive for rigorous
            training and learning. The college has well-furnished
            classrooms, library, laboratories, research centre,
            air-conditioned spacious auditorium, well-maintained gardens &
            buildings, a prayer hall, kiosk, food court, parking area,
            hostel and audio-visual rooms equipped with LCD projectors,
            TVs and VCRs. Internet and photocopying facilities are also
            available. Freeships & scholarships are awarded to meritorious
            students based on the assessment of the student's need. The
            assistance continues if the student shows consistent progress
            in academic excellence.
          </p>

          <p className="text-gray-800 text-[19px] leading-10 text-justify mt-10">
            Jyoti Nivas College provides an atmosphere which helps students
            to grow and develop as multi-faceted individuals. The college
            strives to imbue a strong national sense that transcends the
            barriers of religion and community. It seeks to uphold the best
            and most beautiful aspects of our Indian tradition and
            heritage. Jyoti Nivas College also inculcates a world view and
            broader outlook on life, aiming to equip students for global
            citizenship and competence. Apart from academics, it also
            offers a wide range of co-curricular and extracurricular
            activities which include sports, music, quiz, elocution,
            dramatics, and journalism, NCC, NSS, Bangalore Catholic
            Student Association, Rotaract Club and Adventure Club.
          </p>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default CampusCulture;