import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

function FoodCourt() {
  return (
    <>
      <Header/>
      <Navbar />

      {/* Hero Section */}
      <section className="h-[180px] bg-[#2F2F6F] flex items-center justify-center">
        <h1 className="text-5xl font-bold text-white tracking-wide">
          FOOD COURT
        </h1>
      </section>

      {/* Content */}
      <section className="max-w-6xl mx-auto px-6 lg:px-12 py-16">

        <p className="text-gray-700 text-lg leading-10 text-justify">
          Jyoti Nivas College Autonomous inaugurated its new canteen on
          January 31, 2018 in the presence of Honourable Home Minister
          Shri Ramalinga Reddy and Dr. Arathi Krishna, Deputy Chairman,
          NRI Forum Karnataka. The management of Jyoti Nivas College,
          the Sisters of St. Joseph of Tarbes were present in good
          number to celebrate the occasion.
        </p>

        <p className="text-gray-700 text-lg leading-10 text-justify mt-8">
          The new facility can house a large number of users and serves
          a wide variety of hygienic and nutritious eatables at very
          reasonable prices. It also has a mini mart that caters to the
          day-to-day requirements of students, making it a convenient
          space for refreshments and essential purchases within the
          campus.
        </p>

      </section>

      <Footer />
    </>
  );
}

export default FoodCourt;