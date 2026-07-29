import { Link } from "react-router-dom";

export default function FacultyDashboard() {
  const modules = [
  {
    title: "My Profile",
    path: "/faculty/profile",
  },
  {
    title: "Edit Profile",
    path: "/faculty/edit-profile",
  },
  {
    title: "Publications",
    disabled: true,
  },
  {
    title: "Conference Publications",
    disabled: true,
  },
  {
    title: "Paper Presentations",
    disabled: true,
  },
  {
    title: "Research Interests",
    disabled: true,
  },
  {
    title: "Awards",
    disabled: true,
  },
  {
    title: "Memberships",
    disabled: true,
  },
  {
    title: "Academic Experience",
    disabled: true,
  },
  {
    title: "Research Experience",
    disabled: true,
  },
  {
    title: "Events",
    disabled: true,
  },
  {
    title: "Announcements",
    disabled: true,
  },
];

  return (
    <div className="min-h-[calc(100vh-180px)] bg-[#f5f7ff] py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-[#1f1f1f] mb-2">
          Faculty Dashboard
        </h1>

        <p className="text-center text-gray-600 mb-10">
          Manage your faculty profile and academic information.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {modules.map((module, index) =>
            module.disabled ? (
              <div
                key={index}
                className="bg-[#3d3a82] rounded-lg py-7 px-6 text-center opacity-60 cursor-not-allowed"
              >
                <h2 className="text-white text-lg font-medium">
                  {module.title}
                </h2>

                <p className="text-gray-200 text-sm mt-2">
                  Coming Soon
                </p>
              </div>
            ) : (
              <Link
                key={index}
                to={module.path}
                className="bg-[#3d3a82] hover:bg-[#34316f] transition rounded-lg py-7 px-6 text-center"
              >
                <h2 className="text-white text-lg font-medium">
                  {module.title}
                </h2>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
}