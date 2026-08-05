import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import studentUnion1 from "../../assets/infrastructure/student-union-room-1.jpg";
import studentUnion2 from "../../assets/infrastructure/student-union-room-2.jpg";
import studentUnion3 from "../../assets/infrastructure/student-union-room-3.jpg";
import studentUnion4 from "../../assets/infrastructure/student-union-room-4.jpg";
import studentUnion5 from "../../assets/infrastructure/student-union-room-5.jpg";
import studentUnion6 from "../../assets/infrastructure/student-union-room-6.jpg";
import studentUnion7 from "../../assets/infrastructure/student-union-room-7.jpg";

export default function StudentUnionRoom() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            STUDENT UNION ROOM
          </h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="space-y-8 text-[18px] leading-9 text-justify text-gray-800">
            <p>
              Student Union Room is a learning centre for the student community,
              where they sit together to plan for their annual activities.
            </p>

            <p>
              This year the Student Union Room has been renovated into a
              contemporary and classy space equipped with high-quality
              furnishings and modern technology.
            </p>

            <p>
              The room is furnished with wooden flooring along with spacious
              cupboards that provide ample storage for important documents,
              artwork, charts, banners and posters. The cupboards have been
              designed keeping in mind the preferences of students. Window
              blinds help reduce unwanted heat during summer and retain warmth
              during winter.
            </p>

            <p>
              Two tables with seating capacity for eight members, along with
              comfortable chairs, provide an ideal space for meetings and
              discussions. The room is also equipped with a computer system,
              printer, broadband connection and a high-quality whiteboard vinyl
              sticker mounted on one side of the wall.
            </p>

            <p>
              The room proudly displays the names of the Student Presidents of
              the last ten years along with the names of the current Union
              Office Bearers and Student Union Advisors.
            </p>

            <p>
              The Student Union Room is colourful, vibrant and welcoming. It
              encourages bonding, teamwork and warm-hearted companionship. It
              provides a positive atmosphere for brainstorming, planning and
              relaxing after hectic student union activities.
            </p>
          </div>
        </div>
      </section>

      {/* Images */}
      <section className="bg-white pb-16">
        <div className="max-w-6xl mx-auto px-6">
          {/* Large Image */}
          <img
            src={studentUnion1}
            alt="Student Union Room"
            className="w-full h-[500px] object-cover rounded-xl shadow-lg mb-6"
          />

          {/* Row 1 */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <img
              src={studentUnion2}
              alt="Student Union Room"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />

            <img
              src={studentUnion3}
              alt="Student Union Room"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />

            <img
              src={studentUnion4}
              alt="Student Union Room"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>

          {/* Row 2 */}
          <div className="grid md:grid-cols-3 gap-6">
            <img
              src={studentUnion5}
              alt="Student Union Room"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />

            <img
              src={studentUnion6}
              alt="Student Union Room"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />

            <img
              src={studentUnion7}
              alt="Student Union Room"
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}