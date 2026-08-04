import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const PrincipalMessage = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Principal's Message
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14">
        <div className="max-w-6xl mx-auto px-6">

          {/* Top Section */}
          <div className="grid md:grid-cols-[400px_1fr] gap-12 items-start mb-10">

            {/* Principal Image */}
            <div className="w-full">
              <img
                src="/principal.jpg"
                alt="Principal"
                className="w-full max-w-[500px] h-auto object-contain rounded-lg"
              />
            </div>

            {/* Quote + First Paragraph */}
            <div>
              <p className="italic text-[#2F2F6F] text-lg mb-2">
                “There are many capable women and we are one of them.”
              </p>

              <p className="font-semibold text-gray-700 mb-6">
                Proverbs 31:29
              </p>

              <p className="text-gray-700 leading-8 text-justify">
                An educational institution has the immense responsibility of
                shaping the future citizens of this world. With over 50 years
                of experience in imparting knowledge, skills and ethics to
                young women, Jyoti Nivas College Autonomous has always
                fulfilled this responsibility. Founded in 1966 as a minority
                Christian College managed by the society of sisters of St.
                Joseph of Tarbes, JNC has remained steadfast in its goal of
                providing a balanced and comprehensive education in the liberal
                arts, sciences and commerce and management.
              </p>
            </div>

          </div>

          {/* Remaining Content */}
          <div className="space-y-8 text-gray-700 leading-8 text-justify">

            <p>
              The education of women has been linked to their empowerment. We,
              as a women’s college, endeavour to empower our students. With
              female students from varied backgrounds and with different skill
              sets and talents, JNC focuses on equity, inclusion and nurturing
              diversity. In recognition of our long history of commitment to
              excellence, service and relevance, we have collected various
              honors and received several awards along the way. But more than
              these awards, it is through the success and love of our students
              that we gauge our value. The professional and personal growth of
              our students which we witness in the transformation that they
              undergo during their time here is truly rewarding.
            </p>

            <p>
              One of our core values is faith in God. Faith is confidence in
              what we have and assurance in what we do not see. Through
              hardwork and intense faith, the foundation of this college was
              laid. I am grateful to our sisters and staff who have worked
              tirelessly to build this incredible institution. We now have the
              responsibility to take it forward. In these times of change, we
              continue to strive, unafraid to trust the unknown future to a
              known God. I pray that we continue to learn, to care, to love, to
              forgive, to understand, to accept and honour the uniqueness of
              each person and celebrate this precious gift of life with one
              another.
            </p>

            <p>
              Education is a priceless gift. And we are indeed fortunate to
              have received this precious gift. So we do have a responsibility
              towards our nation and society. With deep faith in God, self and
              humankind, may we be awakened to the compassion towards humanity
              within us, to be sensitive citizens who dare to care; to be the
              voice of the voiceless and make a significant difference. May
              the Almighty God grant us a generous heart to share what we have,
              live in harmony and peace and give us the strength to build a
              society of committed women who are empowered to empower.
            </p>

            <p>Thank You.</p>

            <p>
              God bless us as we let our Light Shine!!!
            </p>

            <div className="pt-3">
              <p className="font-semibold">
                Dr. Sr. Mary Louisa S.
              </p>

              <p className="text-gray-600">
                Principal
              </p>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default PrincipalMessage;