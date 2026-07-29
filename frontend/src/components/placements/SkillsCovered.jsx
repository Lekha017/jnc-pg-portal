import {
  Brain,
  MessageCircle,
  Users,
  FileText,
  BadgeCheck,
} from "lucide-react";

const skills = [
  {
    icon: Brain,
    title: "Quantitative Aptitude & Logical Reasoning",
    description:
      "Numerical ability, logical thinking & problem solving",
  },
  {
    icon: MessageCircle,
    title: "Verbal Ability & Communication",
    description:
      "Effective communication, grammar & vocabulary",
  },
  {
    icon: Users,
    title: "Group Discussion Practice",
    description:
      "GD topics, group dynamics & leadership",
  },
  {
    icon: FileText,
    title: "Resume Building & LinkedIn Profiling",
    description:
      "Professional resume writing & LinkedIn tips",
  },
  {
    icon: BadgeCheck,
    title: "Corporate Etiquette & Readiness",
    description:
      "Workplace behaviour, attitude & discipline",
  },
];

function SkillsCovered() {
  return (
    <section className="bg-white rounded-xl border shadow-sm p-6">
      <h2
        className="text-2xl font-bold text-[#2D2A70]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Skills Covered
      </h2>

      <div className="w-16 h-1 bg-blue-500 rounded-full mt-2 mb-6"></div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {skills.map((skill, index) => {
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

              <h3 className="font-semibold text-[#2D2A70] text-sm mt-3 leading-5">
                {skill.title}
              </h3>

              <p className="text-xs text-gray-600 mt-2 leading-5">
                {skill.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default SkillsCovered;