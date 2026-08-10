import {
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const QuickActions = ({ contact }) => {
  if (!contact) return null;

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}

      <div className="bg-[#EAF4FF] px-6 py-5 border-none">

        <h2 className="text-2xl font-bold text-[#2D2A70]">
          Quick Actions
        </h2>

        <p className="text-gray-600 text-sm mt-1">
          Get in touch with the Placement Cell instantly.
        </p>

      </div>


      {/* Body */}

      <div className="px-6 pt-5 pb-4">

        <p className="text-gray-700 leading-6 text-sm mb-5">
          Whether you're a student looking for placement support or
          a recruiter interested in campus hiring, we're here to
          assist you.
        </p>


        {/* Email Button */}

        <a
          href={`mailto:${contact.email}`}
          className="flex items-center justify-between w-full bg-[#2D2A70] text-white rounded-xl px-4 py-3 hover:bg-[#24205f] transition"
        >
          <div>
            <p className="text-base font-semibold">
              Email Coordinator
            </p>

            <p className="text-xs text-gray-200 break-all mt-0.5">
              {contact.email}
            </p>
          </div>

          <ArrowRight
            size={18}
            className="shrink-0 ml-3"
          />
        </a>

        {/* Phone Number */}

        <div className="mt-5 flex items-center gap-4 pt-4">

          <div className="bg-[#EAF4FF] p-3 rounded-xl">

            <Phone
              className="text-[#2D2A70]"
              size={22}
            />

          </div>

          <div>

            <p className="text-gray-500 text-xs">
              Contact Number
            </p>

            <a
              href={`tel:${contact.phone}`}
              className="text-lg font-semibold text-[#2D2A70] hover:underline"
            >
              {contact.phone}
            </a>

          </div>

        </div>

      </div>

    </div>
  );
};

export default QuickActions;