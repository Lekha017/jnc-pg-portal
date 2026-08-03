import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlacements } from "../../services/placementService";

function PlacementPreview() {
  const [placements, setPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPlacements();
  }, []);

  const fetchPlacements = async () => {
    try {
      const response = await getPlacements();

      if (response.success) {
        setPlacements(response.data.slice(0, 4));
      }
    } catch (error) {
      console.error(error);
      setPlacements([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-3 h-fit">

      {/* Header + More Details */}
      <div className="flex items-center justify-between mb-3">

        <h2 className="text-lg font-bold text-[#37347C]">
          Placements
        </h2>

        <Link
          to="/placements"
          className="bg-[#4B4A8F] hover:bg-[#37347C] text-white px-4 py-1.5 rounded-full text-xs font-medium transition"
        >
          More Details →
        </Link>

      </div>


      {loading ? (
        <div className="py-4 text-center text-sm text-gray-500">
          Loading placements...
        </div>

      ) : placements.length === 0 ? (

        <div className="py-4 text-center text-sm text-gray-500">
          No placement records found.
        </div>

      ) : (

        <div className="overflow-x-auto pb-2">

          <div className="flex gap-5 min-w-max">

            {placements.map((student) => (

              <div
                key={student._id}
               className="w-[150px] bg-white border border-gray-200 rounded-xl shadow-sm p-3 flex-shrink-0 text-center hover:shadow-md transition"
              >

                {/* Student Image */}
                <img
                  src={
                    student.studentPhoto?.url ||
                    "https://placehold.co/200x200?text=Student"
                  }
                  alt={student.studentName}
                  className="w-20 h-20 rounded-full object-cover mx-auto mb-3"
                />


                <h3 className="font-semibold text-sm text-gray-800 line-clamp-2">
                  {student.studentName}
                </h3>


                <p className="text-xs text-[#37347C] font-medium mt-2 line-clamp-1">
                  {student.company}
                </p>


                <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                  {student.role}
                </p>


                <p className="text-xs text-gray-500 mt-2">
                  {student.package} LPA
                </p>


              </div>

            ))}

          </div>

        </div>

      )}

    </div>
  );
}

export default PlacementPreview;