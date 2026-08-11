import { useFormContext } from "react-hook-form";

const Step6Declaration = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-6">
      {/* Section Heading */}
      <div>
        <h2 className="text-xl font-semibold text-[#2F2F6F]">
          Declaration
        </h2>

        <p className="mt-1 text-sm text-gray-500">
          Please read the declaration carefully before proceeding.
        </p>
      </div>

      {/* Declaration Content */}
      <div className="rounded-xl border border-gray-200 bg-[#F8F9FC] p-6">
        <h3 className="mb-4 text-lg font-semibold text-gray-800">
          Applicant Declaration
        </h3>

        <div className="space-y-4 text-sm leading-7 text-gray-600">
          <p>
            I hereby declare that all the information provided by me in
            this admission application is true, complete, and correct
            to the best of my knowledge.
          </p>

          <p>
            I understand that any incorrect, incomplete, or misleading
            information may result in cancellation of my application
            or admission.
          </p>

          <p>
            I confirm that the documents uploaded by me are genuine and
            belong to me. I understand that the college may verify the
            information and documents submitted as part of the admission
            process.
          </p>

          <p>
            I agree to abide by the rules, regulations, policies, and
            admission requirements of Jyoti Nivas College.
          </p>
        </div>
      </div>

      {/* Declaration Checkbox */}
      <div>
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("declarationAccepted", {
              required: {
                value: true,
                message:
                  "You must accept the declaration before proceeding",
              },
            })}
            className="mt-1 h-4 w-4 accent-[#2F2F6F]"
          />

          <span className="text-sm leading-6 text-gray-700">
            I have read and understood the above declaration and confirm
            that the information and documents provided in this
            application are true and correct.
            <span className="text-red-500"> *</span>
          </span>
        </label>

        {errors.declarationAccepted && (
          <p className="mt-2 text-sm text-red-500">
            {errors.declarationAccepted.message}
          </p>
        )}
      </div>

      {/* Important Note */}
      <div className="border-t border-gray-200 pt-5">
        <p className="text-sm text-gray-500">
          Please review all your application details carefully in the
          next step before proceeding to the application fee payment.
        </p>
      </div>
    </div>
  );
};

export default Step6Declaration;