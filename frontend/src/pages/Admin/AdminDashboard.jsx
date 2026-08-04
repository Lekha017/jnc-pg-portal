import { Link } from "react-router-dom";
import AdminLayout from "../../components/layout/AdminLayout";

export default function AdminDashboard() {
const modules = [
  {
    title: "Faculty",
    path: "/admin/faculty",
  },
  {
    title: "Department",
    path: "/admin/departments",
  },
  {
    title: "Events",
    path: "/admin/events",
  },
  {
    title: "Placements",
    path: "/admin/placements",
  },
  {
    title: "Announcements",
    path: "/admin/announcements",
  },
  {
    title: "Management",
    path: "/admin/management",
  },
  {
    title: "Deans",
    path: "/admin/deans",
  },
];

  return (
    <AdminLayout>
      <div>
        <h1 className="text-3xl font-bold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-600 mt-2 mb-8">
          Welcome! Manage all college modules from one place.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
         {modules.map((module, index) => (
  <Link
    key={index}
    to={module.path}
    className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-lg hover:-translate-y-1 transition"
  >
    <h2 className="text-lg font-semibold text-gray-800">
      {module.title}
    </h2>

    <p className="text-sm text-gray-500 mt-2">
      Open Module →
    </p>
  </Link>
))}
        </div>
      </div>
    </AdminLayout>
  );
}