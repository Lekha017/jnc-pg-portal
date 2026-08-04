import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function Chapel() {
  return (
    <>
      <Header/>
      <Navbar />

      {/* Hero */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          CHAPEL
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-5xl mx-auto px-6 py-16">

        <div className="text-center">

          <p className="text-gray-700 leading-8 text-lg text-justify mb-8">
            The Chapel is the spiritual heart of the college,
            providing a peaceful and prayerful environment for
            students, faculty and staff. It is a place where the
            college community gathers to worship, reflect and seek
            God's guidance in their personal and academic lives.
          </p>

          <p className="text-gray-700 leading-8 text-lg text-justify mb-8">
            As a Christian community that strives to love God with
            our hearts and our minds, we believe that an attitude of
            worship should inform all of life. In our Chapel we
            express our reverence for God through singing and
            celebration, reading and reflection on the Holy
            Scriptures, silence and prayer, as well as through
            diligent study and inquiry in our academic pursuits.
          </p>

          <p className="text-gray-700 leading-8 text-lg text-justify">
            The Chapel remains open for personal prayer,
            meditation and special liturgical celebrations,
            offering a serene atmosphere that nurtures
            spiritual growth, peace and values of compassion,
            service and respect for all.
          </p>

        </div>

      </section>

      <Footer />
    </>
  );
}

export default Chapel;