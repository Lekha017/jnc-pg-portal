import {
  Users,
  Building2,
  TrendingUp,
  Calendar,
} from "lucide-react";

function PlacementStats({ placements }) {
  const totalPlacements = placements.length;

  const companies = [
    ...new Set(
      placements.map((item) => item.company)
    ),
  ].length;

  const highestPackage =
    placements.length > 0
      ? Math.max(
          ...placements.map((item) =>
            Number(item.package)
          )
        )
      : 0;

  const stats = [
    {
      title: "Students Placed",
      value: totalPlacements,
      icon: <Users size={24} />,
    },
    {
      title: "Recruiting Companies",
      value: companies,
      icon: <Building2 size={24} />,
    },
    {
      title: "Highest Package",
      value: `${highestPackage} LPA`,
      icon: <TrendingUp size={24} />,
    },
    {
      title: "Placement Year",
      value:
        placements.length > 0
          ? placements[0].year
          : "-",
      icon: <Calendar size={24} />,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-sm
            p-6
            hover:shadow-md
            transition
          "
        >
          <div className="flex items-center justify-between mb-4">
            <div className="text-[#2D2A70]">
              {stat.icon}
            </div>
          </div>

          <h3 className="text-4xl font-bold text-[#2D2A70]">
            {stat.value}
          </h3>

          <p className="mt-2 text-gray-500 font-medium">
            {stat.title}
          </p>
        </div>
      ))}
    </div>
  );
}

export default PlacementStats;