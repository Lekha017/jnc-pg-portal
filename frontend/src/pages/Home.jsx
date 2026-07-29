import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import AboutPGCentre from "../components/home/AboutPGCentre";
import PrincipalMessage from "../components/home/PrincipalMessage";
import Footer from "../components/layout/Footer";

function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <HeroSlider />
      <AboutPGCentre />
      <PrincipalMessage />
      <Footer />
    </>
  );
}

export default Home;