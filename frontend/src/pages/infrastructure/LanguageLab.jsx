import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import languageLab1 from "../../assets/infrastructure/language-lab-1.jpg";
import languageLab2 from "../../assets/infrastructure/language-lab-2.jpg";
import languageLab3 from "../../assets/infrastructure/language-lab-3.jpg";

export default function LanguageLab() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            LANGUAGE LAB
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <div className="space-y-8 text-[18px] leading-9 text-justify text-gray-800">

            <p>
              Language Lab is a space for English language
              learning where students access audio or audiovisual materials.
            </p>

            <p>
              The language lab plays an important role in the language learning
              process. The lab is equipped with computers and audiovisual
              accessories, where students can practice Listening, Speaking,
              Reading and Writing (LSRW) skills.
            </p>

            <p>
              The centre has access to Oréll software that offers unlimited
              innovation and limitless value. Oréll is a solutions provider
              that has been rendering useful services in the field of education.
            </p>

          </div>

        </div>
      </section>

      {/* Images */}
      <section className="bg-white pb-16">
        <div className="max-w-6xl mx-auto px-6">

          {/* Large Image */}
          <img
            src={languageLab1}
            alt="Language Lab"
            className="w-full h-[450px] object-cover rounded-xl shadow-lg mb-6"
          />

          {/* Bottom Images */}
          <div className="grid md:grid-cols-2 gap-6">

            <img
              src={languageLab2}
              alt="Language Lab"
              className="w-full h-72 object-cover rounded-xl shadow-lg"
            />

            <img
              src={languageLab3}
              alt="Language Lab"
              className="w-full h-72 object-cover rounded-xl shadow-lg"
            />

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
}