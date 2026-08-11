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

  // =====================================================
  // FILE VALIDATION
  // =====================================================

  const validateFile = (files, document) => {
    // Required document
    if (document.required && (!files || files.length === 0)) {
      return `${document.label} is required`;
    }

    // Optional document not uploaded
    if (!files || files.length === 0) {
      return true;
    }

    const file = files[0];

    // Allowed MIME types
    const allowedTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
    ];

    // Allowed extensions
    const allowedExtensions = [
      ".pdf",
      ".jpg",
      ".jpeg",
      ".png",
    ];

    const fileName = file.name.toLowerCase();

    const hasValidType =
      allowedTypes.includes(file.type);

    const hasValidExtension =
      allowedExtensions.some((extension) =>
        fileName.endsWith(extension)
      );

    if (!hasValidType || !hasValidExtension) {
      return `${document.label} must be a PDF, JPG, JPEG, or PNG file`;
    }

    // Maximum file size = 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
      return `${document.label} must be less than 5 MB`;
    }

    // Prevent empty files
    if (file.size === 0) {
      return `${document.label} cannot be empty`;
    }

    return true;
  };

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
          are PDF, JPG, and PNG. Each file must be less than 5 MB.
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
                validate: (files) =>
                  validateFile(files, document),
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