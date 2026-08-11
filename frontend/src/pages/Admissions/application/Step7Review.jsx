import { useFormContext } from "react-hook-form";

const Step7Review = () => {
  const { getValues } = useFormContext();

  const data = getValues();

  const formatFileName = (file) => {
    if (!file) return "Not uploaded";

    if (file instanceof FileList) {
      return file.length > 0
        ? file[0].name
        : "Not uploaded";
    }

    return "Uploaded";
  };

  const formatDeclaration = (value) => {
    return value ? "Accepted" : "Not accepted";
  };

  const formatProgramme = () => {
    // If programme name is already available in form data
    if (data.programName) {
      return data.programName;
    }

    // Otherwise show the selected ID
    if (data.programId) {
      return data.programId;
    }

    return "Not selected";
  };

  return (
    <div className="space-y-8">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#2F2F6F]">
          Review Application
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please review all the information carefully before proceeding
          to the application fee payment.
        </p>
      </div>

      {/* Personal Details */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-[#2F2F6F]">
          Personal Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ReviewItem
            label="Applicant Name"
            value={data.applicantName}
          />

          <ReviewItem
            label="Father's Name"
            value={data.fatherName}
          />

          <ReviewItem
            label="Mother's Name"
            value={data.motherName}
          />

          <ReviewItem
            label="Gender"
            value={data.gender}
          />

          <ReviewItem
            label="Date of Birth"
            value={data.dob}
          />

          <ReviewItem
            label="Nationality"
            value={data.nationality}
          />

          <ReviewItem
            label="Category"
            value={data.category}
          />

          <ReviewItem
            label="Blood Group"
            value={data.bloodGroup}
          />

          <ReviewItem
            label="Aadhaar Number"
            value={data.aadhaarNumber}
          />
        </div>
      </div>

      {/* Address Details */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-[#2F2F6F]">
          Address Details
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ReviewItem
            label="Address Line 1"
            value={data.addressLine1}
          />

          <ReviewItem
            label="Address Line 2"
            value={data.addressLine2}
          />

          <ReviewItem
            label="City"
            value={data.city}
          />

          <ReviewItem
            label="State"
            value={data.state}
          />

          <ReviewItem
            label="Pincode"
            value={data.pincode}
          />

          <ReviewItem
            label="Country"
            value={data.country}
          />

          <ReviewItem
            label="Mobile Number"
            value={data.mobileNumber}
          />

          <ReviewItem
            label="Email Address"
            value={data.email}
          />
        </div>
      </div>

      {/* Academic Details */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-[#2F2F6F]">
          Academic Details
        </h3>

        <div className="space-y-6">
          {/* 10th */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-800">
              10th / SSLC
            </h4>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ReviewItem
                label="School / Institution"
                value={data.tenthSchool}
              />

              <ReviewItem
                label="Board"
                value={data.tenthBoard}
              />

              <ReviewItem
                label="Passing Year"
                value={data.tenthYear}
              />

              <ReviewItem
                label="Percentage / CGPA"
                value={data.tenthPercentage}
              />
            </div>
          </div>

          {/* 12th */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-800">
              12th / PUC
            </h4>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ReviewItem
                label="College / Institution"
                value={data.twelfthCollege}
              />

              <ReviewItem
                label="Board"
                value={data.twelfthBoard}
              />

              <ReviewItem
                label="Passing Year"
                value={data.twelfthYear}
              />

              <ReviewItem
                label="Percentage / CGPA"
                value={data.twelfthPercentage}
              />
            </div>
          </div>

          {/* Bachelor's */}
          <div>
            <h4 className="mb-4 font-semibold text-gray-800">
              Bachelor's Degree
            </h4>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              <ReviewItem
                label="Degree"
                value={data.bachelorDegree}
              />

              <ReviewItem
                label="University / Institution"
                value={data.bachelorUniversity}
              />

              <ReviewItem
                label="Passing Year"
                value={data.bachelorYear}
              />

              <ReviewItem
                label="Percentage / CGPA"
                value={data.bachelorPercentage}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Programme */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-[#2F2F6F]">
          Programme Selection
        </h3>

        <ReviewItem
          label="Selected Programme"
          value={formatProgramme()}
        />
      </div>

      {/* Documents */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-[#2F2F6F]">
          Documents
        </h3>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <ReviewItem
            label="Passport-size Photograph"
            value={formatFileName(data.photograph)}
          />

          <ReviewItem
            label="Aadhaar Card"
            value={formatFileName(data.aadhaarDocument)}
          />

          <ReviewItem
            label="10th / SSLC Marks Card"
            value={formatFileName(data.tenthMarksheet)}
          />

          <ReviewItem
            label="12th / PUC Marks Card"
            value={formatFileName(data.twelfthMarksheet)}
          />

          <ReviewItem
            label="Bachelor's Degree Certificate"
            value={formatFileName(data.degreeCertificate)}
          />

          <ReviewItem
            label="Bachelor's Marks Cards"
            value={formatFileName(data.degreeMarksheets)}
          />

          <ReviewItem
            label="Transfer Certificate"
            value={formatFileName(data.transferCertificate)}
          />

          <ReviewItem
            label="Migration Certificate"
            value={formatFileName(data.migrationCertificate)}
          />
        </div>
      </div>

      {/* Declaration */}
      <div className="rounded-xl border border-gray-200 p-6">
        <h3 className="mb-5 text-lg font-semibold text-[#2F2F6F]">
          Declaration
        </h3>

        <ReviewItem
          label="Declaration Status"
          value={formatDeclaration(data.declarationAccepted)}
        />
      </div>

      {/* Application Fee */}
      <div className="rounded-xl border border-[#2F2F6F]/20 bg-[#F8F9FC] p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="text-lg font-semibold text-[#2F2F6F]">
              Application Fee
            </h3>

            <p className="mt-1 text-sm text-gray-600">
              This is the PG admission application fee only.
            </p>
          </div>

          <div className="text-2xl font-bold text-[#2F2F6F]">
            ₹500
          </div>
        </div>

        <p className="mt-4 text-sm text-gray-500">
          The ₹500 application fee is not a tuition fee, semester fee,
          examination fee, or any other college dues.
        </p>
      </div>

      {/* Final Note */}
      <div className="border-t border-gray-200 pt-5">
        <p className="text-sm leading-6 text-gray-500">
          Please verify all the information above. Once you proceed to
          payment, the application will continue to the ₹500 application
          fee payment process.
        </p>
      </div>
    </div>
  );
};

const ReviewItem = ({ label, value }) => {
  const displayValue =
    value !== undefined &&
    value !== null &&
    String(value).trim() !== ""
      ? value
      : "Not provided";

  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
        {label}
      </p>

      <p
        className={`mt-1 break-words text-sm font-medium ${
          displayValue === "Not provided"
            ? "text-red-500"
            : "text-gray-800"
        }`}
      >
        {displayValue}
      </p>
    </div>
  );
};

export default Step7Review;