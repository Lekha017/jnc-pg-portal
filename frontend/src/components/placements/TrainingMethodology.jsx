import {
  Presentation,
  ClipboardCheck,
  UserRound,
  FileText,
  Users,
  Briefcase,
  GraduationCap,
  Target,
} from "lucide-react";

const methods = [
  {
    icon: Presentation,
    title: "Classroom Sessions",
    description:
      "Interactive sessions conducted by faculty and industry experts.",
  },
  {
    icon: ClipboardCheck,
    title: "Online Assessments",
    description:
      "Regular aptitude and coding tests to monitor student progress.",
  },
  {
    icon: UserRound,
    title: "Mock Interviews",
    description:
      "Technical and HR interview simulations with expert feedback.",
  },
  {
    icon: FileText,
    title: "Resume Building",
    description:
      "Professional resume writing and LinkedIn profile guidance.",
  },
  {
    icon: Users,
    title: "Group Discussions",
    description:
      "Practice sessions focusing on communication and leadership skills.",
  },
  {
    icon: Briefcase,
    title: "Corporate Etiquette",
    description:
      "Professional behavior, workplace ethics and interview etiquette.",
  },
  {
    icon: GraduationCap,
    title: "Industry Expert Talks",
    description:
      "Sessions from recruiters and alumni to bridge academia and industry.",
  },
  {
    icon: Target,
    title: "Placement Preparation",
    description:
      "Company-specific preparation before campus recruitment drives.",
  },
];

function TrainingMethodology() {
  return (
    <section className="bg-white rounded-2xl border shadow-sm p-6">

      <h2
        className="text-2xl font-bold text-[#2D2A70]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Training Methodology
      </h2>

      <div className="w-16 h-1 bg-blue-500 rounded-full mt-2 mb-6"></div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        {methods.map((item, index) => {

          const Icon = item.icon;

          return (
            <div
              key={index}
              className="border rounded-xl p-4 hover:shadow-md transition bg-white"
            >

              <div className="w-11 h-11 rounded-full bg-blue-50 flex items-center justify-center mb-3">

                <Icon
                  size={22}
                  className="text-blue-600"
                />

              </div>

              <h3 className="text-base font-semibold text-[#2D2A70] leading-6">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2 leading-5">
                {item.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}

export default TrainingMethodology;