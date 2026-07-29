import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import AboutPGCentre from "../components/home/AboutPGCentre";
import PrincipalMessage from "../components/home/PrincipalMessage";
import EventsAnnouncements from "../components/home/EventsAnnouncements";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <AboutPGCentre />

      {/* Principal Message + Events & Announcements */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col lg:flex-row items-start gap-10">

          {/* Left Side */}
          <div className="w-full lg:w-[500px] flex-shrink-0">
            <PrincipalMessage />
          </div>

          {/* Right Side */}
          <div className="flex-1">
            <EventsAnnouncements />
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;