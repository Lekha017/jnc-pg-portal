import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function AudioStudio() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          AUDIO STUDIO
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">

        <div className="flex flex-col items-center">

          {/* YouTube Video */}
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/_kVLeZj21tA?&autohide=2&modestbranding=1&rel=0&showinfo=0"
              title="Audio Studio"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="max-w-4xl mt-10">

            <p className="text-gray-700 text-lg leading-8 text-justify mb-8">
              The Audio Studio is a fully equipped, acoustically treated sound
              recording facility that provides students with hands-on learning
              experiences in audio production and broadcasting. The studio
              supports campus radio initiatives and enables students to develop
              practical skills in professional sound recording.
            </p>

            <h2 className="text-2xl font-bold text-[#2F2F6F] mb-5">
              Students use the studio for:
            </h2>

            <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 mb-10 space-y-1">
              <li>Sound Recording</li>
              <li>Sound Design Classes and Workshops</li>
              <li>Campus Radio Programme Recording</li>
              <li>Radio Classes</li>
              <li>Sound Mixing</li>
              <li>Voice and Recording Training</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2F2F6F] mb-5">
              Studio Equipment
            </h2>

            <p className="text-gray-700 text-lg leading-8 mb-5">
              The Audio Studio is equipped with professional accessories and
              recording equipment to support student learning and creative
              productions.
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 space-y-1">
              <li>Rode Professional Studio Microphone</li>
              <li>Condenser Microphones</li>
              <li>Professional Microphone Stands</li>
              <li>Digital Sound Mixer</li>
              <li>Studio Monitors</li>
              <li>Professional Headphones</li>
              <li>Audio Recording Software</li>
              <li>Adobe Audition</li>
              <li>Snake Cables</li>
              <li>Pop Filters</li>
            </ul>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default AudioStudio;