import { useFormContext } from "react-hook-form";

const Step5Documents = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const documents = [
    {
      name: "photograph",
      label: "Passport-size Photograph",
      required: true,
    },
    {
      name: "aadhaarDocument",
      label: "Aadhaar Card",
      required: true,
    },
    {
      name: "tenthMarksheet",
      label: "10th / SSLC Marks Card",
      required: true,
    },
    {
      name: "twelfthMarksheet",
      label: "12th / PUC Marks Card",
      required: true,
    },
    {
      name: "degreeCertificate",
      label: "Bachelor's Degree / Provisional Certificate",
      required: true,
    },
    {
      name: "degreeMarksheets",
      label: "Bachelor's Marks Cards",
      required: true,
    },
    {
      name: "transferCertificate",
      label: "Transfer Certificate",
      required: false,
    },
    {
      name: "migrationCertificate",
      label: "Migration Certificate",
      required: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#2F2F6F]">
          Documents
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Upload the required documents for your postgraduate admission
          application.
        </p>
      </div>

      {/* Information */}
      <div className="rounded-lg border border-gray-200 bg-[#F8F9FC] p-5">
        <p className="text-sm leading-6 text-gray-600">
          Please upload clear and readable documents. Accepted formats
          will be PDF, JPG, and PNG. Maximum file size will be defined
          when the document upload system is connected.
        </p>
      </div>

      {/* Documents */}
      <div className="space-y-5">
        {documents.map((document) => (
          <div key={document.name}>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              {document.label}{" "}
              {document.required && (
                <span className="text-red-500">*</span>
              )}
            </label>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              {...register(document.name, {
                required: document.required
                  ? `${document.label} is required`
                  : false,
              })}
              className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-md file:border-0 file:bg-[#2F2F6F] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#23235a]"
            />

            {errors[document.name] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[document.name].message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Note */}
      <div className="border-t border-gray-200 pt-5">
        <p className="text-sm text-gray-500">
          Documents will be securely processed as part of your
          admission application.
        </p>
      </div>
    </div>
  );
};

export default Step5Documents;