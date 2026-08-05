import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

const stages = [
  {
    title: "Stage 1",
    date: "10 September 2024",
    content: [
      "Make an application to MIC with your film idea and logline for approval.",
      "Logline: A very brief summary of the film. The logline must include the main characters, setup, central conflict/issue and how the story proceeds to its end.",
      "Your application must accompany a copy of your College ID card and a recommendation letter from the HoD or a faculty member teaching Film in your college.",
      "Include the budget of the proposed film.",
      "If selected, applicants will be informed within three working days and will be required to sign an MoU with MIC.",
    ],
  },
  {
    title: "Stage 2",
    date: "25 September 2024",
    content: [
      "Submit your screenplay with a pilot.",
      "Pilot: Shoot, edit and submit a 3-minute sample from your script. Using real locations and actors is optional.",
      "After assessing the screenplay and pilot, shortlisted teams will receive half of the approved funding amount.",
      "Training at MIC may be provided upon request.",
      "Production equipment and editing facilities may be provided depending on availability. Minimal hiring charges may apply.",
    ],
  },
  {
    title: "Stage 3",
    date: "30 October 2024",
    content: [
      "Submit your final film in the required format and style.",
      "After evaluating the storytelling and production quality, the remaining grant amount will be released.",
    ],
  },
];

const notes = [
  "Film must be of 10 minutes or more in duration.",
  "The entire crew must consist only of women.",
  "Film must have 'Produced/Funded by MIC' title card in the beginning.",
  "Films must be presented as MIC productions / MIC co-productions (if other funds are used). MIC becomes part of the film-making and exhibition process, sharing screening and festival rights.",
  "The team shall keep MIC informed with updates whenever required.",
  "The team should have at least 3 members in the crew.",
];

export default function MediaIncubationCentre() {
  return (
    <>
      <Header />
      <Navbar />

      {/* Hero */}
      <section className="bg-[#2F2F6F] py-16">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold text-white">
            Media Incubation Centre (MIC)
          </h1>
        </div>
      </section>

      {/* Introduction */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-10">
            <p className="text-[18px] leading-9 text-justify text-gray-800">
              The field of mass media is very competitive and requires a large
              capital for budding media entrepreneurs. This is something that
              many students from disadvantaged backgrounds do not have access
              to. It is sad to see young people who aspire to embark on a career
              in media but fail due to lack of access to infrastructure,
              equipment, technology, networking support and guidance.
            </p>

            <p className="text-[18px] leading-9 text-justify text-gray-800 mt-8">
              To address the challenge, Jyoti Nivas College established a Media
              Incubation Centre (MIC), which serves as an incubation space and
              launchpad for aspiring graduating students to gradually become
              entrepreneurs. One of its major initiatives is supporting women
              student filmmakers.
            </p>
          </div>
        </div>
      </section>

      {/* Grant */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-6xl mx-auto px-6">
         <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8 text-center">
            <h2 className="text-4xl font-bold text-[#2F2F6F]">
              Filmmaking Grant
            </h2>

            <h3 className="text-2xl font-semibold mt-5">
              2024–25 Women Student Filmmaking Funding
            </h3>

            <p className="mt-8 text-[18px] leading-9 text-justify text-gray-800">
              Are you someone planning to make a short film? Are you someone who
              has ideas and dreams of making a film but lacks the means and
              resources? Apply here—we fund you, and you make your film.
            </p>

            <p className="mt-6 text-[18px] leading-9 text-justify text-gray-800">
              MIC is funding five short films by women student filmmakers
              (PUC/Higher Secondary to PhD). Teams can request up to ₹10,000 in
              cash in addition to creative and technical support.
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="bg-white py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-[#2F2F6F] mb-14">
            Process to Avail the Funding
          </h2>

          <div className="grid lg:grid-cols-3 gap-8">
            {stages.map((stage) => (
              <div
                key={stage.title}
              className="bg-white border border-gray-100 rounded-lg shadow-md p-8"
              >
                <h3 className="text-2xl font-bold text-[#2F2F6F]">
                  {stage.title}
                </h3>

                <p className="font-semibold mt-2 mb-6">{stage.date}</p>

                <ul className="list-disc pl-5 space-y-4 text-gray-700 leading-8 text-justify">
                  {stage.content.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Notes */}
      <section className="bg-gray-50 py-2">
        <div className="max-w-6xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-10">
            <h2 className="text-3xl font-bold text-[#2F2F6F] mb-8">
              Please Note
            </h2>

            <ul className="list-disc pl-6 space-y-4 text-[17px] leading-8 text-gray-800">
              {notes.map((note, index) => (
                <li key={index}>{note}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="bg-white py-16">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-10">
            <h2 className="text-3xl font-bold text-[#2F2F6F] mb-8 text-center">
              Contact Information
            </h2>

            <div className="space-y-4 text-lg text-gray-800">
              <p>
                <strong>Email:</strong> mic@jyotinivas.org
              </p>

              <p>
                <strong>Saji P Mathew:</strong> 9686062543
              </p>

              <p>
                <strong>Nikhil Banerjee:</strong> 7293505962
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}