import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const governingMembers = [
  {
    name: "Sr. Catherine Charles",
    designation: "President",
  },
  {
    name: "Sr. Benedicta Mary Joseph",
    designation: "Vice President",
  },
  {
    name: "Sr. Nalini P",
    designation: "Education Secretary",
  },
  {
    name: "Sr. Rosy N.R",
    designation: "Member",
  },
  {
    name: "Sr. Arul Amritham J",
    designation: "Member",
  },
  {
    name: "Sr. Mary Louisa",
    designation: "Member",
  },
  {
    name: "Sr. Mary Jaya",
    designation: "Member",
  },
  {
    name: "Sr. Maria Magdalena Conceicao",
    designation: "Member",
  },
];

const GoverningBody = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] text-white py-14">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold">Governing Body</h1>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14">
        <div className="max-w-5xl mx-auto px-6">

         <h2 className="text-[34px] font-serif font-semibold text-[#2d2d2d] leading-[1.4] mb-8">
            The governing body ensures proper management of academic,
            financial and general administrative affairs.
          </h2>

        {/* Content */}
<section className="bg-white py-14">
  <div className="max-w-5xl mx-auto px-6">


    <div className="overflow-hidden rounded-lg shadow-sm">

      {governingMembers.map((member, index) => (
        <div
          key={index}
          className={`grid grid-cols-2 items-center px-6 py-4 border-b border-gray-200 ${
            index % 2 === 0 ? "bg-[#f5f5f5]" : "bg-white"
          }`}
        >
          <div className="text-[18px] text-[#333333]">
            {member.name}
          </div>

          <div className="text-[18px] text-[#333333]">
            {member.designation}
          </div>
        </div>
      ))}

    </div>

  </div>
</section>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default GoverningBody;