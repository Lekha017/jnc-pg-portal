import Navbar from "../components/layout/Navbar";
import HeroSlider from "../components/home/HeroSlider";
import AboutPGCentre from "../components/home/AboutPGCentre";
import PrincipalMessage from "../components/home/PrincipalMessage";

function Home() {
  return (
    <>
      <Navbar />
      <HeroSlider />
      <AboutPGCentre />
      <PrincipalMessage />
    </>
  );
}

export default Home;