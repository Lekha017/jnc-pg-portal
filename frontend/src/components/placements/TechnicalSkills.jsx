import {
  Laptop,
  Database,
  Globe,
  Code2,
  BarChart3,
  Cloud,
} from "lucide-react";

const technicalSkills = [
  {
    icon: Laptop,
    title: "Data Structures & Algorithms",
  },
  {
    icon: Database,
    title: "Database Management Systems (SQL)",
  },
  {
    icon: Globe,
    title: "Web Development (HTML, CSS, JavaScript)",
  },
  {
    icon: Code2,
    title: "Java & Python Programming",
  },
  {
    icon: BarChart3,
    title: "Data Analytics & Excel",
  },
  {
    icon: Cloud,
    title: "Cloud Computing Fundamentals",
  },
];

function TechnicalSkills() {
  return (
    <section className="bg-white rounded-xl border shadow-sm p-6">
      <h2
        className="text-2xl font-bold text-[#2D2A70]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Technical Skills
      </h2>

      <div className="w-16 h-1 bg-blue-500 rounded-full mt-2 mb-6"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {technicalSkills.map((skill, index) => {
          const Icon = skill.icon;

          return (
            <div
              key={index}
              className="border rounded-lg p-4 text-center hover:shadow-md transition"
            >
              <div className="w-12 h-12 mx-auto rounded-full bg-blue-50 flex items-center justify-center">
                <Icon
                  size={22}
                  className="text-blue-600"
                />
              </div>

              <h3 className="mt-3 font-semibold text-[#2D2A70] text-xs leading-5">
                {skill.title}
              </h3>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default TechnicalSkills;