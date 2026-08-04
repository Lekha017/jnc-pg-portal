import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const members = [
  {
    role: "Bengaluru City University Nominee",
    lines: [
      "Prof. Ramesh B Kudenatti",
      "Academic Council Member",
      "Professor, Dept. of Mathematics",
      "Bengaluru City University",
      "Bengaluru – 560 001",
    ],
  },
  {
    role: "Bengaluru City University Nominee",
    lines: [
      "Prof. Nirmala M",
      "Professor and Chairperson",
      "BCU School of Management",
      "Bengaluru City University",
      "Bengaluru – 560 001",
    ],
  },
  {
    role: "Bengaluru City University Nominee",
    lines: [
      "Sri. Mahantha Gouda",
      "Academic Council Member",
      "Principal",
      "Bapu College of Education",
      "Bengaluru – 560 022",
    ],
  },
  {
    role: "Management Nominee",
    lines: [
      "Dr. M. Sithartha Muthu Vijayan",
      "Senior Scientist",
      "CSIR Fourth Paradigm Institute [CSIR 4PI]",
      "NAL Belur Campus,",
      "Wind Tunnel Road, Belur",
      "Bengaluru - 560 037",
    ],
  },
  {
    role: "Management Nominee",
    lines: [
      "Dr. Elizabeth Jasmine",
      "Principal & Associate Professor of Psychology",
      "Indian Institute of Psychology & Research (IIPR)",
      "Bengaluru",
    ],
  },
  {
    role: "Management Nominee",
    lines: [
      "Dr. Xavier Chelladurai",
      "Professor, Artificial Intelligence Specialist",
      "Dept. of Computer Science & Engineering",
      "Christ Deemed to be University,",
      "Kengeri Campus,",
      "Bengaluru – 560 074",
    ],
  },
];

const AcademicCouncil = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}

      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Academic Council
          </h1>
        </div>
      </section>

      {/* Content */}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

         <h2 className="text-4xl font-bold text-black text-center mb-12">
  Academic Council Members 2025 - 2026
</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {members.map((member, index) => (
              <div
                key={index}
                className="border border-gray-300 bg-white p-6 min-h-[260px]"
              >
                <h3 className="text-[#E91E63] text-lg font-medium mb-4">
                  {member.role}
                </h3>

                <div className="space-y-2">
                  {member.lines.map((line, i) => (
                    <p
  key={i}
  className="text-gray-700 text-[18px] leading-8"
>
  {line}
</p>
                  ))}
                </div>
              </div>
            ))}

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default AcademicCouncil;