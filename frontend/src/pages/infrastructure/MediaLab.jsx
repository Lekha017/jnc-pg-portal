import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function MediaLab() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          MEDIA LAB
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex flex-col items-center">

          {/* YouTube Video */}
          <div className="w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-lg mb-10">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/l2j8RL2KA1Y?&autohide=2&modestbranding=1&rel=0&showinfo=0"
              title="Media Lab"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          {/* Description */}
          <div className="max-w-4xl">

            <p className="text-gray-700 text-lg leading-8 text-justify mb-8">
              Jyoti Nivas College houses two state-of-the-art Media Labs
              equipped with the latest technology to provide students with
              hands-on learning in digital media, design and multimedia
              production. The labs create a professional environment for
              students to develop practical skills and creative projects.
            </p>

            <h2 className="text-2xl font-bold text-[#2F2F6F] mb-5">
              Media Lab 1
            </h2>

            <p className="text-gray-700 text-lg leading-8 mb-5">
              The first Media Lab is equipped with modern infrastructure and
              software to support media production and digital learning,
              including:
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 mb-10 space-y-1">
              <li>18 Professional Computer Systems</li>
              <li>Video Editing Software</li>
              <li>Graphic Design Software</li>
              <li>Magazine & Newspaper Layout Software</li>
              <li>Sound Editing Software</li>
              <li>High-Speed Internet Connectivity</li>
              <li>Collaborative Workspace for Students</li>
              <li>Creative Ideation and Project Development</li>
            </ul>

            <h2 className="text-2xl font-bold text-[#2F2F6F] mb-5">
              Media Lab 2
            </h2>

            <p className="text-gray-700 text-lg leading-8 mb-5">
              The second Media Lab is designed for advanced multimedia
              production with high-performance computers and professional
              software that enables students to execute real-world media
              projects.
            </p>

            <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 space-y-1">
              <li>Film Editing</li>
              <li>Newspaper Layout</li>
              <li>Radio Programme Editing</li>
              <li>Advertisement Production</li>
              <li>Graphic Designing</li>
              <li>Photography Post-Production</li>
              <li>Magazine Layout</li>
              <li>Concept Development & Ideation</li>
            </ul>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}

export default MediaLab;