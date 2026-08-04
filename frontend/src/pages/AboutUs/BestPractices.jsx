import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const bestPractices = [
  {
    year: "2018-2019",
    title:
      "Innovative Pathways For The Comprehensive Development Of Young Women",
  },
  {
    year: "2019-2020",
    title:
      "Curriculum Design And Curriculum Extension For Excellence In Higher Education, Employability And Entrepreneurship",
  },
  {
    year: "2020-2021",
    title:
      "Pioneering Measures, Amidst The Pandemic, Towards Continued Emotional Wellness And Assistance To Students",
  },
  {
    year: "2021-2022",
    title:
      "Institutional Social Responsibility Towards Overcoming The Effects Of The Pandemic & Creating A Holistic Learning Environment",
  },
  {
    year: "2022-2023",
    title:
      "Academic Excellence Through Enhanced Engagement In Research",
  },
  {
    year: "2023-2024",
    title:
      "Experiential Learning & Employability Enhancement Through Internship",
  },
];

const BestPractices = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero Section */}

      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
           Institutional Best Practices
          </h1>

        </div>
      </section>

      {/* Cards */}

      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

            {bestPractices.map((item, index) => (
              <div
                key={index}
                className="
                  border
                  border-[#2F2F6F]
                  rounded-[40px]
                  px-10
                  py-8
                  text-center
                  cursor-pointer
                  transition-all
                  duration-300
                  hover:bg-[#2F2F6F]
                  hover:text-white
                  hover:-translate-y-1
                  hover:shadow-xl
                "
              >
                <h2 className="text-xl font-semibold mb-4">
                  {item.year}
                </h2>

                <p className="text-lg leading-9">
                  {item.title}
                </p>
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default BestPractices;