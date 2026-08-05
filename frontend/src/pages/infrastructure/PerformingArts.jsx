import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

export default function PerformingArts() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            PERFORMING ARTS STUDIO
          </h1>
        </div>
      </section>

      {/* Video */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-video">
             <iframe
  className="w-full h-full"
  src="https://www.youtube.com/embed/-QrVDZvTTJI"
  title="Performing Arts Studio"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
     <section className="bg-white py-2">
  <div className="max-w-6xl mx-auto px-4">

    <div className="space-y-8 text-[18px] leading-9 text-justify text-gray-600">

      <p>
        The <strong>state-of-the-art Performing Arts Studio</strong> is
        an added feather to the overall academics and holistic
        development of students. A well-designed and fully furnished
        performing stage gives students a platform to showcase their
        talents and overcome their inhibitions of the stage.
      </p>

      <div>
        <p className="mb-4 font-semibold text-gray-700">
          Students use this space for:
        </p>

        <ul className="list-disc pl-8 space-y-2">
          <li>Theatre training</li>
          <li>Dance training</li>
          <li>Poetry recital</li>
          <li>Stand-up comedy</li>
          <li>Student cultural activities</li>
          <li>Street theatre practice</li>
          <li>Open mic sessions</li>
          <li>Public film screening</li>
        </ul>
      </div>

      <p>
        This fantastic Performing Arts Studio is built with appropriate
        acoustic walls, aesthetic interiors and efficient space
        management. It is equipped with modern facilities that support
        both practice and professional performances.
      </p>

      <div>
        <p className="mb-4 font-semibold text-gray-700">
          The studio features:
        </p>

        <ul className="list-disc pl-8 space-y-2">
          <li>Wall-mounted mirrors for dance training</li>
          <li>Stage with curtains and professional lighting</li>
          <li>Professional sound system</li>
          <li>Sound mixer</li>
          <li>Stage microphones</li>
          <li>Green room</li>
          <li>Cyclorama screen</li>
          <li>Professional projector</li>
        </ul>
      </div>

      <p>
        The Centre for Media Studies follows a student-centred approach
        where learners receive hands-on practical training along with
        strong theoretical foundations. The Performing Arts Studio
        provides a professional environment that nurtures creativity,
        confidence and artistic excellence.
      </p>

    </div>

  </div>
</section>
      <Footer />
    </>
  );
}