import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import AboutPGCentre from "../components/home/AboutPGCentre";
import PrincipalMessage from "../components/home/PrincipalMessage";
import EventsAnnouncements from "../components/home/EventsAnnouncements";
import PlacementPreview from "../components/home/PlacementPreview";
import LocationMap from "../components/home/LocationMap";
import Footer from "../components/layout/Footer";
import DepartmentSlider from "../components/home/DepartmentSlider";

function Home() {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">
      <Header />
      <Navbar />

      {/* =========================
          HERO
      ========================= */}
      <HeroSlider />

      {/* =========================
          ABOUT PG CENTRE
      ========================= */}
      <AboutPGCentre />

      {/* =========================
          PRINCIPAL + EVENTS + PLACEMENTS
      ========================= */}
      <section className="w-full bg-white py-8 sm:py-10 lg:py-12">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex flex-col lg:flex-row items-start gap-6 sm:gap-8 lg:gap-10">

            {/* =========================
                LEFT - PRINCIPAL MESSAGE
            ========================= */}
            <div className="w-full lg:w-[500px] lg:flex-shrink-0">
              <PrincipalMessage />
            </div>

            {/* =========================
                RIGHT - EVENTS + PLACEMENTS
            ========================= */}
            <div className="w-full lg:flex-1 flex flex-col gap-5 sm:gap-6">
              <EventsAnnouncements />
              <PlacementPreview />
            </div>

          </div>

        </div>
      </section>

      {/* =========================
          DEPARTMENTS
      ========================= */}
      <DepartmentSlider />

      {/* =========================
          LOCATION
      ========================= */}
      <LocationMap />

      {/* =========================
          FOOTER
      ========================= */}
      <Footer />
    </div>
  );
}

export default Home;