const FacultySidebar = ({ faculty }) => {
  const qualification =
    faculty.qualifications?.length > 0
      ? faculty.qualifications
          .map((q) =>
            typeof q === "string"
              ? q
              : q.degree
          )
          .filter(Boolean)
          .join(", ")
      : "";

  const imageUrl = faculty.image
    ? faculty.image.startsWith("http")
      ? faculty.image
      : `${import.meta.env.VITE_API_URL}/${faculty.image}`
    : "/avatar.png";

  return (
    <div className="space-y-5">

      {/* Faculty Photo */}

      <div className="bg-white border border-gray-200 shadow-sm overflow-hidden">

        <img
          src={imageUrl}
          alt={faculty.fullName}
          className="w-full h-[360px] object-cover"
        />

      </div>

      {/* Academic Experience */}

      {faculty.academicExperience?.trim() && (

        <div className="bg-[#f5f5f5] border border-gray-200 p-5">

          <h3 className="font-semibold text-[#2F2F6F] mb-2">
            Academic Experience
          </h3>

          <p className="text-sm leading-6 text-gray-700 whitespace-pre-line">
            {faculty.academicExperience}
          </p>

        </div>

      )}

      {/* Research Experience */}

      {faculty.researchExperience?.trim() && (

        <div className="bg-[#f5f5f5] border border-gray-200 p-5">

          <h3 className="font-semibold text-[#2F2F6F] mb-2">
            Research Experience
          </h3>

          <p className="text-sm leading-6 text-gray-700 whitespace-pre-line">
            {faculty.researchExperience}
          </p>

        </div>

      )}

      {/* Qualification */}

      {qualification && (

        <div className="bg-[#f5f5f5] border border-gray-200 p-5">

          <h3 className="font-semibold text-[#2F2F6F] mb-2">
            Qualification
          </h3>

          <p className="text-sm leading-6 text-gray-700">
            {qualification}
          </p>

        </div>

      )}

      {/* Email */}

      {faculty.email && (

        <div className="bg-[#f5f5f5] border border-gray-200 p-5">

          <h3 className="font-semibold text-[#2F2F6F] mb-2">
            Email
          </h3>

          <p className="text-sm break-words text-gray-700">
            {faculty.email}
          </p>

        </div>

      )}

    </div>
  );
};

export default FacultySidebar;