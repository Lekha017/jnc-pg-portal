import { Mail } from "lucide-react";
import Button from "../../common/Button";
import QualificationTable from "./QualificationTable";

const FacultyHeader = ({
  faculty,
  isOwner = false,
  onEdit,
}) => {
  const departmentName =
    faculty.departments?.length > 0
      ? faculty.departments
        .map((d) => d.name)
        .join(", ")
      : "Not Assigned";

  return (
    <div className="relative bg-white border border-gray-200 shadow-sm rounded-md p-6">

      {/* Small Edit Button */}

      {isOwner && (
        <Button
          onClick={onEdit}
          fullWidth={false}
          className="absolute top-6 right-6 bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-md"
        >
          Edit Profile
        </Button>
      )}

      <h1 className="text-[22px] font-semibold text-black">
        {faculty.fullName}
      </h1>

      <p className="mt-2 text-gray-700">
        {faculty.designation}
      </p>

      <p className="text-gray-500 text-sm">
        {departmentName}
      </p>

      <div className="mt-4 flex items-center gap-2 text-sm">
        <span className="font-semibold">
          <Mail
            size={16}
            className="inline mr-1 text-[#2F2F6F]"
          />
          Email:
        </span>

        <span>{faculty.email}</span>
      </div>

      {/* Qualifications */}

      <div className="mt-8">

        <h3 className="font-semibold text-black mb-3">
          Qualifications
        </h3>

        <QualificationTable
          qualifications={faculty.qualifications || []}
        />

      </div>

    </div>
  );
};

export default FacultyHeader;