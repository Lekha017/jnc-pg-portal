import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import videoStudio from "../../assets/infrastructure/Video Studio.mp4";


function VideoStudio() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          VIDEO STUDIO
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="flex flex-col items-center">

          <video
            controls
            className="w-full max-w-4xl rounded-xl shadow-lg"
          >
            <source src={videoStudio} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="max-w-4xl mt-10">

            <p className="text-gray-700 text-lg leading-8 text-justify mb-8">
              The Video Studio is completely acoustically treated and fully
              soundproof. It is air-conditioned and aesthetically designed to
              provide a professional environment for media production and
              creative learning.
            </p>

            <h2 className="text-2xl font-bold text-[#2D2A70] mb-5">
              Students use the studio for:
            </h2>

            <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 mb-10 space-y-1">
              <li>Film production</li>
              <li>Photography</li>
              <li>Green matte technology</li>
              <li>Film screening</li>
              <li>Sound recording</li>
              <li>Lighting workshops</li>
              <li>Photography and film workshops</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2D2A70] mb-5">
              Studio Equipment
            </h2>

            <p className="text-gray-700 text-lg leading-8 mb-5">
              The studio is equipped with professional accessories and setups
              to support student productions and practical training.
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 space-y-1">
              <li>Video Cameras</li>
              <li>DSLR Cameras</li>
              <li>Flashes</li>
              <li>Tripods</li>
              <li>Monopods</li>
              <li>Green Matte</li>
              <li>Blue Matte</li>
              <li>Gray Matte</li>
              <li>Portable Blue/Green Matte with Stand</li>
              <li>White Wide Screen</li>
              <li>Rode Studio Microphone</li>
            </ul>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default VideoStudio;