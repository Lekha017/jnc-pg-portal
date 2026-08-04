import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function InnovationLab() {
  return (
    <>
    <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          TEXAS INNOVATION LAB
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <h2 className="text-2xl font-bold text-[#2F2F6F] mb-6">
          About the Innovation Lab
        </h2>

        <p className="text-gray-700 text-lg leading-8 text-justify mb-6">
          The Texas Instruments University Programme is dedicated to supporting
          electronics graduates, educators, researchers and students. The Texas
          Innovation Lab bridges the gap between industry and academia by
          providing students with practical exposure to real-world engineering
          concepts and emerging technologies.
        </p>

        <p className="text-gray-700 text-lg leading-8 text-justify mb-10">
          The lab enables students to gain hands-on experience in areas such as
          the Internet of Things (IoT), embedded systems and robotics, while
          fostering innovation, creativity and technical excellence through
          project-based learning.
        </p>

        <h2 className="text-2xl font-bold text-[#2F2F6F] mb-5">
          Highlights of the Programme
        </h2>

        <ul className="list-disc pl-6 text-gray-700 text-lg leading-8 space-y-2">
          <li>Focus on skill development aligned with industry requirements.</li>
          <li>Practical approach with approximately 70% hands-on training and 30% theory.</li>
          <li>Hands-on experience through real-time projects.</li>
          <li>Development and deployment of IoT applications on modern hardware and software platforms.</li>
          <li>Exposure to state-of-the-art technologies through experiential learning.</li>
          <li>Improved employability through innovation and technical skill development.</li>
          <li>Participation in Texas Instruments Innovation Challenge competitions.</li>
          <li>Industry-oriented training with placement guidance and support.</li>
        </ul>

      </section>

      <Footer />
    </>
  );
}

export default InnovationLab;