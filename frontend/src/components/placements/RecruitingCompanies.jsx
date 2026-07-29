import { useEffect, useState } from "react";
import { getPublishedRecruiters } from "../../services/recruiterService";

const RecruitingCompanies = () => {
  const [recruiters, setRecruiters] = useState([]);

  useEffect(() => {
    fetchRecruiters();
  }, []);

  const fetchRecruiters = async () => {
    try {
      const res =
        await getPublishedRecruiters();

      if (res.success) {
        setRecruiters(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="bg-white rounded-2xl border border-gray-200 p-10">

      <div className="text-center mb-10">

        <h2 className="text-4xl font-semibold text-gray-900">
          Our Recruiters
        </h2>

        <p className="mt-3 text-gray-600">
          Leading companies that recruit from our institution
        </p>

      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">

        {recruiters.map((recruiter) => (
          <div
            key={recruiter._id}
            className="
            bg-white
            border
            border-gray-200
            rounded-2xl
            h-28
            flex
            items-center
            justify-center
            hover:shadow-md
            transition
            "
          >
            <img
              src={recruiter.logo?.url}
              alt="Recruiter"
              className="
              max-h-16
              max-w-[160px]
              object-contain
              "
            />
          </div>
        ))}

      </div>

    </section>
  );
};

export default RecruitingCompanies;