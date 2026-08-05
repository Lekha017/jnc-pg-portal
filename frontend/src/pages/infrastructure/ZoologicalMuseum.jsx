import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import museumImage1 from "../../assets/infrastructure/zoological-museum-1.jpg";
import museumImage2 from "../../assets/infrastructure/zoological-museum-2.jpg";
export default function ZoologicalMuseum() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            ZOOLOGICAL MUSEUM
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
                src="https://www.youtube.com/embed/Qf0uB3L_wyA"
                title="Zoological Museum"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>


     {/* Content */}
<section className="bg-white py-16">
  <div className="max-w-7xl mx-auto px-6">
    <div className="grid lg:grid-cols-2 gap-12 items-start">

      {/* Left Content */}
      <div className="space-y-8 text-[18px] leading-9 text-justify text-gray-800">

        <p>
          The Zoological museum collection is an important teaching resource for
          the Department of Zoology. It has a collection of 137 specimens
          belonging to the different phyla of the animal kingdom. Some of the
          rare collections include Invertebrates like <strong>Physalia</strong>
          – Portuguese Man of War, <strong>Hyalonema</strong> – Glass Rope
          Sponge, <strong>Chaetopterus</strong>, and Vertebrates like the
          <strong> Loris</strong>, <strong>Gibbon</strong>, and a variety of
          snakes highlighting the diversity of animal life.
        </p>

        <p>
          The museum also has complete skulls of animals like the horse, man,
          cat, dog, rabbit, pigeon and the turtle's anapsid skull.
          Disarticulated skeletons of the frog, lizard, pigeon, rabbit, human,
          and an articulated human skeleton are also on display.
        </p>

        <p>
          The 152 slides include histological sections, cytological
          preparations, whole mounts of developmental stages, sections of
          organisms, protozoans, placentae and tissues.
        </p>

        <p>
          Molluscan shells, Plastron and Carapace of turtles, hearts and brains
          of shark, frog, pigeon and rat for comparative study are also
          displayed. The museum has rare and real fossils of the fish
          <strong> Knightia</strong>, which existed 50 million years ago in the
          Eocene epoch, <strong>Trilobite</strong>, an extinct group of
          Arthropods of the Palaeozoic era, <strong>Ammonite</strong> of the
          Cretaceous period, <strong>Petrified Tree Trunk</strong> and
          <strong> Coprolites</strong>.
        </p>

        <p>
          All the specimens are well preserved and displayed with labelled
          information alongside the exhibits.
        </p>

      </div>

      {/* Right Images */}
      <div className="space-y-6">

       <img
  src={museumImage1}
  alt="Zoological Museum"
  className="w-full h-72 object-cover rounded-xl shadow-lg"
/>

<img
  src={museumImage2}
  alt="Zoological Museum"
  className="w-full h-72 object-cover rounded-xl shadow-lg"
/>

      </div>

    </div>
  </div>
</section>

      <Footer />
    </>
  );
}