import FacultyCard from "./FacultyCard";

const FacultyGrid = ({ faculty = [] }) => {
  if (!faculty.length) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-semibold text-gray-700">
          No Faculty Found
        </h3>

        <p className="mt-2 text-gray-500">
          There are no faculty members to display.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div
        className="
          grid
          grid-cols-1
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-4
          gap-y-10
          gap-x-6
          place-items-center
        "
      >
        {faculty.map((member) => (
          <FacultyCard
            key={member._id}
            faculty={member}
          />
        ))}
      </div>
    </div>
  );
};

export default FacultyGrid;