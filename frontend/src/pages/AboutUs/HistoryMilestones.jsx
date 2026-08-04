import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const milestones = [
  {
    year: "2023",
    points: [
      "Jyoti Nivas College National Cadet Corps was awarded with the Best Institution Award for NCC in Women's category in Karnataka and Goa Directorate on 7th February 2023.",
    ],
  },
  {
    year: "2022",
    points: [
      "Silver recognition for Spectra-cular efforts in Quarter-2 for the Rotary Year.",
      "Ranked 6th in Karnataka Private Autonomous ASC Colleges by EW India Higher Education Ranking in 2022.",
    ],
  },
  {
    year: "2021",
    points: [
      "Recognized in the band 'Promising' under the category 'Colleges/Institutes (Govt. Aided) (Technical)' in ARIIA 2021 by the Ministry of Education, Government of India.",
      "Recognized as Business School of the Year 2021 by Academic Insights.",
      "Implemented NEP.",
      "Awarded an 'A+' Grade in the Fourth Cycle of NAAC Re-accreditation.",
    ],
  },
  {
    year: "2019",
    points: [
      "Recognized by Silicon India as one of the Most Promising Media and Mass Communication Centres in India.",
      "Jury Award for Promotion of Women Empowerment through Generation by the Indian Didactics Association.",
      "Torchbearer of Excellence in Education by the Indian Didactics Association.",
      "Integrated Courses Started for B.Sc with M.Sc (Clinical Psychology) & B.Com with M.Com.",
    ],
  },
  {
    year: "2018",
    points: [
      "175th year of the formation of the Congregation of the Sisters of St Joseph of Tarbes.",
      "Jyoti Nivas College Autonomous was honoured with the distinction of being one among only five colleges in Karnataka and the only college in Bangalore to be selected for a ₹5 crore grant under RUSA Project 12.",
    ],
  },
  {
    year: "2015",
    points: [
      "Inauguration of the Golden Jubilee.",
    ],
  },
  {
    year: "2014",
    points: [
      "Awarded the Title of 'College of Excellence' by UGC.",
      "Started prestigious B.Voc degree courses in Banking & Finance, Visual Communication and Performing Arts.",
    ],
  },
  {
    year: "2012",
    points: [
      "Awarded 'A' Grade by NAAC in the Third Cycle with the highest CGPA of 3.76.",
      "Celebrated the 125th Birth Anniversary of Srinivasa Ramanujan.",
    ],
  },
  {
    year: "2011",
    points: [
      "National Conference on Community Oriented Psychological Interventions in collaboration with CCPI.",
      "Dr. Sr. Elizabeth C.S. received the N.A. Haris Foundation Award on International Women's Day.",
    ],
  },
  {
    year: "2010",
    points: [
      "Celebrated Kristanamana, the Advent of Christmas, with Doordarshan Kendra.",
      "International Study Program initiated with Deakin University, Melbourne.",
      "Conferred the title 'College with Potential for Excellence'.",
    ],
  },
  {
    year: "2006",
    points: [
      "Started Research Publication and Research Cell.",
      "Waste Paper Recycling Plant inaugurated.",
    ],
  },
  {
    year: "2005",
    points: [
      "Received Autonomous Status.",
      "Recognized as College with Potential for Excellence by UGC.",
    ],
  },
  {
    year: "2004",
    points: [
      "Declared Nodal Centre for South India to conduct Entrepreneurship Development Programme.",
    ],
  },
  {
    year: "2003",
    points: [
      "JNC NCC won the Best Institution Trophy, Karnataka & Goa Directorate.",
      "JNC Cricket Team visited Sri Lanka and won the trophy.",
    ],
  },
  {
    year: "2001",
    points: [
      "BCA introduced.",
      "PUC College bifurcated from the Degree College.",
    ],
  },
  {
    year: "2000",
    points: [
      "New Library inaugurated.",
      "Introduced B.Sc Computer Science with Maths and Electronics.",
    ],
  },
  {
    year: "1999",
    points: [
      "Jyoti Nivas College accredited by NAAC as a Five Star College.",
      "Sr. Philomena Cardoza became the Principal of Jyoti Nivas College.",
    ],
  },
  {
    year: "1998",
    points: [
      "First Batch of BBM students graduated.",
    ],
  },
  {
    year: "1997",
    points: [
      "Commerce & Management Fest 'Arbitrium' started.",
    ],
  },
  {
    year: "1996",
    points: [
      "Jyoti Nivas College Chapel inaugurated.",
    ],
  },
  {
    year: "1995",
    points: [
      "New Administrative Block inaugurated.",
      "Jyoti Nivas College Choir presented its maiden song.",
      "BBM introduced.",
    ],
  },
  {
    year: "1994",
    points: [
      "BA & B.Sc Vocational Courses introduced.",
    ],
  },
  {
    year: "1993",
    points: [
      "JNC Drama Club formed.",
    ],
  },
  {
    year: "1992",
    points: [
      "Mentor Ward System introduced.",
    ],
  },
  {
    year: "1991",
    points: [
      "Computer Science introduced.",
      "MA English introduced at PG level.",
    ],
  },
  {
    year: "1989",
    points: [
      "First Auditorium inaugurated.",
    ],
  },
  {
    year: "1988",
    points: [
      "Electronics introduced under B.Sc.",
    ],
  },
  {
    year: "1986",
    points: [
      "Certificate Courses introduced.",
      "Computer Accounts System.",
      "Secretarial Practice.",
      "100 Hours of Journalism.",
    ],
  },
  {
    year: "1985",
    points: [
      "Professional Counselling Centre opened.",
    ],
  },
  {
    year: "1984",
    points: [
      "International Year of Youth - 'Youth for Progress' Multimedia Show presented.",
    ],
  },
  {
    year: "1983",
    points: [
      "Three JNC projects approved by the United Board for Christian Higher Education in Asia.",
    ],
  },
  {
    year: "1981",
    points: [
      "Jyoti Nivas College Anthem composed by Mr. Hartwell Yates.",
    ],
  },
  {
    year: "1979",
    points: [
      "Life Science B.Sc & B.Com introduced.",
    ],
  },
  {
    year: "1978",
    points: [
      "PUC Commerce Group introduced.",
    ],
  },
  {
    year: "1977",
    points: [
      "Inception of JNC Adventure Club.",
    ],
  },
  {
    year: "1976",
    points: [
      "College moved to the new Koramangala Campus.",
    ],
  },
  {
    year: "1973",
    points: [
      "Construction of Koramangala Campus started.",
      "College Emblem designed by Sr. Patricia Adams.",
    ],
  },
  {
    year: "1972",
    points: [
      "Two-Year PUC Course introduced.",
    ],
  },
  {
    year: "1971",
    points: [
      "First BA Honours in English batch graduated.",
    ],
  },
  {
    year: "1970",
    points: [
      "First BA & B.Sc batches graduated.",
    ],
  },
  {
    year: "1967",
    points: [
      "First BA & B.Sc batches started.",
    ],
  },
  {
    year: "1966",
    points: [
      "Jyoti Nivas College foundation laid in Frazer Town.",
    ],
  },
];
const HistoryMilestones = () => {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}

      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            History & Milestones
          </h1>
        </div>
      </section>
<section className="bg-white py-16">
  <div className="max-w-5xl mx-auto px-6">

    <p className="text-gray-800 text-[19px] leading-10 text-justify">
      Six young peasant girls in the little village of Tarbes in France were
      divinely inspired way back in 1843, to a life of contemplation and
      prayer; the Congregation of the Sisters of St. Joseph of Tarbes was thus
      born.
    </p>

    <p className="text-gray-800 text-[19px] leading-10 text-justify mt-10">
      From contemplation to communion to community building - it was a process
      of sensitization to the needs of suffering humanity and an answer to the
      call to care for the sick and the abandoned. The Sisters responded to the
      challenge with generosity and commitment. Education soon became another
      field in which they were called to serve - schools and later, colleges,
      grew of their tireless efforts. One of the many renowned educational
      institutions that their labour of love gave birth to was Jyoti Nivas
      College, established in 1966. It has grown through the years, on the
      faith, courage and optimism of its founders.
    </p>

    <div className="w-full h-[2px] bg-[#F4E4A3] my-10"></div>

    <h2 className="text-5xl font-bold text-center text-black mb-16">
      MILESTONES
    </h2>

  </div>
</section>
      {/* Content */}

     <section className="py-8 bg-white">
  <div className="max-w-6xl mx-auto px-6">

    <div className="relative">

      <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-[#2F2F6F] -translate-x-1/2"></div>

      {milestones.map((item, index) => (
        <div
          key={item.year}
          className="relative flex flex-col md:flex-row items-center mb-12"
        >
          {index % 2 === 0 ? (
            <>
              <div className="md:w-1/2 md:pr-10">
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">

                  <div className="bg-[#1d184d] text-white text-center py-3">
                    <h3 className="text-5xl font-bold">
                      {item.year}
                    </h3>
                  </div>

                  <div className="p-6">
                    <ul className="list-disc pl-5 space-y-3 text-[18px] leading-8 text-justify">
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#2F2F6F] border-4 border-white"></div>

              <div className="md:w-1/2"></div>
            </>
          ) : (
            <>
              <div className="md:w-1/2"></div>

              <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 w-5 h-5 rounded-full bg-[#2F2F6F] border-4 border-white"></div>

              <div className="md:w-1/2 md:pl-10">
                <div className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">

                  <div className="bg-[#1d184d] text-white text-center py-3">
                    <h3 className="text-5xl font-bold">
                      {item.year}
                    </h3>
                  </div>

                  <div className="p-6">
                    <ul className="list-disc pl-5 space-y-3 text-[18px] leading-8 text-justify">
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </>
          )}
        </div>
      ))}

    </div>

  </div>
</section>

      <Footer />
    </>
  );
};

export default HistoryMilestones;