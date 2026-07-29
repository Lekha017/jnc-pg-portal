function SemesterTraining() {
  const years = [
    {
      number: "1",
      title: "First Year",
      topics: [
        "Foundation Building",
        "Quantitative Aptitude Basics",
        "English Communication Workshop",
        "Introduction to Programming Logic",
        "Career Awareness Sessions",
      ],
    },
    {
      number: "2",
      title: "Second Year",
      topics: [
        "Skill Development",
        "Advanced Aptitude & Reasoning",
        "Technical Skills Lab (DBMS, Java/Python)",
        "Group Discussion Practice",
        "Industry Guest Lectures",
      ],
    },
    {
      number: "3",
      title: "Third Year",
      topics: [
        "Placement Readiness",
        "Mock Technical & HR Interviews",
        "Resume Review & Portfolio Building",
        "Company Specific Test Practice",
        "Final Placement Drives",
      ],
    },
  ];

  return (
    <section className="bg-white rounded-xl border shadow-sm p-6">
      <h2
        className="text-2xl font-bold text-[#2D2A70]"
        style={{ fontFamily: "Georgia, serif" }}
      >
        Semester-wise Training Plan
      </h2>

      <div className="w-16 h-1 bg-blue-500 rounded-full mt-2 mb-6"></div>

      <div className="grid md:grid-cols-3 gap-4">
        {years.map((year) => (
          <div
            key={year.number}
            className="bg-blue-50 rounded-lg border p-4"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center text-base font-bold">
                {year.number}
              </div>

              <h3 className="text-lg font-semibold text-[#2D2A70]">
                {year.title}
              </h3>
            </div>

            <ul className="space-y-2 text-sm text-gray-700">
              {year.topics.map((topic, index) => (
                <li
                  key={index}
                  className="flex items-start gap-2"
                >
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-blue-600"></span>

                  <span>{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SemesterTraining;