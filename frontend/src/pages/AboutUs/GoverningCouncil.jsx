import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const members = [
  {
    role: "Chairperson",
    lines: [
      "Rev.Sr. Catherine Charles",
      "President",
      "Sisters of St. Joseph of Tarbes",
      "Bangalore Province",
      "Bengaluru - 560 005",
    ],
  },
  {
    role: "State Government Nominee",
    lines: [
      "Dr. Shobha G",
      "Director",
      "Department of Collegiate Education",
      "Government of Karnataka",
      "Palace Road, Bengaluru - 560 001",
    ],
  },
  {
    role: "Bengaluru City University Nominee",
    lines: [
      "Rev. Dr. Francis Assisi Almeida",
      "Syndicate Member",
      "Bengaluru City University",
      "No.58/6, 2nd Cross Road D Costa Layout (Post), Thomas Town, Bengaluru 560 084",
    ],
  },
  {
    role: "Educationist Management Nominee",
    lines: [
      "Rev. Fr. jesudoss Rajamanickam",
      "Director",
      "St. John's National Academy of Health Sciences",
      "Sarjapur Road, Bengaluru - 560 034",
    ],
  },
  {
    role: "Principal",
    lines: [
      "Dr. Sr. Mary Louisa",
      "Principal",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Sr. Nalini P",
      "Manager",
      "Jyoti Nivas College Autonomous",
      "Bengaluru – 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Sr. Sajitha Jose",
      "Administrator",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Carol Stanly S",
      "IQAC Coordinator",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Mrs. Neeta T R",
      "Controller of Examinations",
      "Dept. of Computer Science",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Ms. Naureen Aziz",
      "Chief Coordinator for Arts",
      "HOD Dept. of English",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Mrs. Grace Samuel",
      "Chief Coordinator for Commerce & Management",
      "HOD Dept. of Commerce & Management",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Mr. V M Shanmugam",
      "Chief Coordinator for Science",
      "HOD Dept. of Biotechnology",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Preeti Mangala",
      "Dean - Research",
      "Deputy IQAC Coordinator &",
      "HOD - Dept. of Chemistry",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Preetha Vasan",
      "Dean - P G Courses",
      "Dept. of MA Literature",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Nalini Sekaran",
      "Dean – Humanities and Social Sciences",
      "HOD - Dept. of History",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Josephine Narmadha J",
      "Dean & HOD – Dept. of Commerce & Management",
      "Jyoti Nivas College Autonomous",
      "Bangalore - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Roopa Philip",
      "Deputy COE for PG Programmes",
      "& IQAC Deputy Coordinator",
      "Dept. of M.A Literature",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Navis Vigilia",
      "Dean - Physical Sciences",
      "Dept. of Mathematics",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Fr. Saji P Mathew",
      "Dean – Media Studies",
      "Dept. of Centre for Media Studies",
      "Jyoti Nivas College Autonomous",
    ],
  },
  {
    role: "Member",
    lines: [
      "Dr. Mary Arpana",
      "Dean - Life Sciences",
      "Dept. of Chemistry",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
  {
    role: "Member",
    lines: [
      "Mr. Munichowdappa N",
      "HOD - Dept. of Public Administration",
      "Jyoti Nivas College Autonomous",
      "Bengaluru - 560 095",
    ],
  },
];

const GoverningCouncil = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}

      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Governing Council
          </h1>
        </div>
      </section>

      {/* Content */}

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">

         <h2 className="text-4xl font-bold text-black text-center mb-12">
  Governing Council Members 2025 - 2026
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

export default GoverningCouncil;