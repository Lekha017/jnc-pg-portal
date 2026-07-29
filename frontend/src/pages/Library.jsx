import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import libraryVideo from "../assets/videos/library.mp4";
import library2 from "../assets/library/library2.jpeg";
import library3 from "../assets/library/library3.jpeg";
import library4 from "../assets/library/library4.jpeg";
import library5 from "../assets/library/library5.jpeg";
import library6 from "../assets/library/library6.jpeg";
import library7 from "../assets/library/library7.jpeg";
import libraryAbout from "../assets/library/library1.jpeg";

function Library() {
    const [showOverlay, setShowOverlay] = useState(true);

useEffect(() => {
  const timer = setTimeout(() => {
    setShowOverlay(false);
  }, 3000);

  return () => clearTimeout(timer);
}, []);
  return (
    <>
      <Header />
      <Navbar />

      {/* ================= HERO VIDEO ================= */}

      <section className="relative w-full h-[85vh] overflow-hidden">

        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src={libraryVideo}
            type="video/mp4"
          />
        </video>

       {/* Overlay */}

<div
  className={`absolute inset-0 bg-black/50 flex items-center justify-center transition-opacity duration-1000 ${
    showOverlay ? "opacity-100" : "opacity-0 pointer-events-none"
  }`}
>

  <div className="text-center px-6">

    <p className="uppercase tracking-[5px] text-white text-sm mb-4">
      Jyoti Nivas College Autonomous
    </p>

    <h1 className="text-5xl md:text-6xl font-bold text-white">
      Library & Information Centre
    </h1>

    <p className="mt-6 max-w-3xl text-lg text-gray-200 leading-8">
      A gateway to knowledge, research, innovation and lifelong learning
      with thousands of books, journals, digital resources and modern
      study spaces.
    </p>

  </div>

</div>
      </section>
            {/* ================= ABOUT LIBRARY ================= */}

<section className="bg-white pt-20 pb-5">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid lg:grid-cols-2 gap-16 items-center">

      {/* LEFT IMAGE */}

      <div>

        <img
          src={libraryAbout}
          alt="Library"
          className="w-full h-[520px] object-cover rounded-2xl shadow-xl"
        />

      </div>

      {/* RIGHT CONTENT */}

      <div>

        <p className="text-[#4B4B7C] uppercase tracking-[3px] font-semibold mb-3">
          About Our Library
        </p>

        <h2 className="text-5xl font-bold text-[#1d1d54] leading-tight mb-8">
          Inspiring Learning Through Knowledge
        </h2>

        <p className="text-gray-600 leading-8 mb-6">
          The Library & Information Centre at Jyoti Nivas College has
          been serving students and faculty since 1966. It provides a
          peaceful learning environment supported by an extensive
          collection of books, journals, magazines, dissertations and
          digital resources.
        </p>

        <p className="text-gray-600 leading-8 mb-6">
          The library continuously upgrades its resources and services
          to meet the academic and research needs of the college while
          encouraging independent learning, innovation and lifelong
          learning.
        </p>

        <p className="text-gray-600 leading-8">
          With spacious reading halls, digital facilities and access to
          national online learning platforms, the library serves as the
          academic heart of the institution.
        </p>

      </div>

    </div>

  </div>

</section>

{/* ================= LIBRARY HIGHLIGHTS ================= */}

<section className="bg-[#f7f9fc] pt-4 pb-3">

  <div className="max-w-7xl mx-auto px-6">

    <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">

      {[
        ["30K+", "Books"],
        ["75+", "Journals"],
        ["1966", "Established"],
        ["24×7", "Digital Access"],
      ].map(([number, text]) => (

        <div
          key={number}
          className="bg-white rounded-xl shadow-sm hover:shadow-md transition duration-300 py-6 px-4 text-center"
        >

          <h3 className="text-4xl font-bold text-[#4B4B7C]">
            {number}
          </h3>

          <p className="mt-2 text-gray-600 text-base">
            {text}
          </p>

        </div>

      ))}

    </div>

  </div>

</section>
          {/* ================= TIMINGS & DIGITAL RESOURCES ================= */}

<section className="bg-[#f7f9fc] py-20">

  <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12">

    {/* ================= LIBRARY TIMINGS ================= */}

    <div className="bg-white rounded-2xl shadow-md p-10 border-l-8 border-[#4B4B7C]">

      <h2 className="text-3xl font-bold text-[#4B4B7C] mb-8">
        Library Timings
      </h2>

      <div className="space-y-6">

        <div className="flex justify-between border-b pb-3">
          <span className="font-semibold text-gray-700">
            Monday – Friday
          </span>

          <span className="text-gray-600">
            8:00 AM – 5:30 PM
          </span>
        </div>

        <div className="flex justify-between border-b pb-3">
          <span className="font-semibold text-gray-700">
            Saturday
          </span>

          <span className="text-gray-600">
            8:00 AM – 4:00 PM
          </span>
        </div>

        <div className="flex justify-between">
          <span className="font-semibold text-gray-700">
            Sunday
          </span>

          <span className="font-semibold text-red-500">
            Closed
          </span>
        </div>

      </div>

      <div className="mt-8 bg-[#EEF3FF] rounded-xl p-5">

        <h4 className="font-semibold text-[#4B4B7C] mb-2">
          Note
        </h4>

        <p className="text-gray-600 leading-7">
          The library remains open on all working days except National and
          Government holidays.
        </p>

      </div>

    </div>

    {/* ================= DIGITAL RESOURCES ================= */}

    <div>

      <h2 className="text-3xl font-bold text-[#4B4B7C] mb-3">
        Digital Resources
      </h2>

      <p className="text-gray-600 mb-8">
        Access trusted national digital learning platforms and academic
        resources.
      </p>

      <div className="grid grid-cols-2 gap-5">

        <a
          href="https://swayam.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 p-5 flex items-center justify-center"
        >
          <img
            src="/logos/swayam.png"
            alt="SWAYAM"
            className="h-12 object-contain"
          />
        </a>

        <a
          href="https://ugcmoocs.inflibnet.ac.in/"
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 p-5 flex items-center justify-center"
        >
          <img
            src="/logos/ugc.png"
            alt="UGC MOOCs"
            className="h-12 object-contain"
          />
        </a>

        <a
          href="https://epgp.inflibnet.ac.in/"
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 p-5 flex items-center justify-center"
        >
          <img
            src="/logos/pathshala.png"
            alt="e-Pathshala"
            className="h-12 object-contain"
          />
        </a>

        <a
          href="https://www.swayamprabha.gov.in/"
          target="_blank"
          rel="noreferrer"
          className="bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 p-5 flex items-center justify-center"
        >
          <img
            src="/logos/prabha.png"
            alt="SWAYAM Prabha"
            className="h-12 object-contain"
          />
        </a>

        <a
          href="https://nptel.ac.in/"
          target="_blank"
          rel="noreferrer"
          className="col-span-2 bg-white rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition duration-300 p-5 flex items-center justify-center"
        >
          <img
            src="/logos/nptel.png"
            alt="NPTEL"
            className="h-12 object-contain"
          />
        </a>

      </div>

    </div>

  </div>

</section>
          {/* ================= LIBRARY GALLERY ================= */}

      <section className="bg-white pt-4 pb-20">

        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">

            <h2 className="text-4xl font-bold mt-3 text-gray-900">
              Library Gallery
            </h2>

            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Take a glimpse into our modern reading spaces, digital learning
              facilities and vibrant academic environment.
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[
              library2,
              library3,
              library4,
              library5,
              library6,
              library7,
            ].map((image, index) => (

              <div
                key={index}
                className="overflow-hidden rounded-2xl shadow-md hover:shadow-xl transition duration-300"
              >

                <img
                  src={image}
                  alt={`Library ${index + 1}`}
                  className="w-full h-72 object-cover hover:scale-105 transition duration-500"
                />

              </div>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </>
  );
}

export default Library;