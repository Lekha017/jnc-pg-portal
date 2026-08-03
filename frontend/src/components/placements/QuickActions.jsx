import {
  Mail,
  Phone,
  ArrowRight,
} from "lucide-react";

const QuickActions = ({ contact }) => {
  if (!contact) return null;

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden h-full flex flex-col">

      {/* Header */}
      <div className="bg-[#EAF4FF] px-8 py-7 border-b border-gray-200">
        <h2 className="text-3xl font-bold text-[#2D2A70]">
          Quick Actions
        </h2>

        <p className="text-gray-600 mt-2">
          Get in touch with the Placement Cell instantly.
        </p>
      </div>

      {/* Body */}
      <div className="flex-1 p-8 flex flex-col">

        <p className="text-gray-700 leading-8 mb-8">
          Whether you're a student looking for placement support or
          a recruiter interested in campus hiring, we're here to
          assist you.
        </p>

        {/* Email Button */}
        <a
  href={`mailto:${contact.email}`}
  className="flex items-center justify-between w-full bg-[#2D2A70] text-white rounded-2xl p-5 hover:bg-[#24205f] transition"
>
  <div className="flex items-center gap-4">
    <Mail size={20} />

    <div>
      <p className="text-xl font-semibold">
        Email Coordinator
      </p>

      <p className="text-xs text-gray-200 break-all">
        {contact.email}
      </p>
    </div>
  </div>

  <ArrowRight size={20} />
</a>

        {/* Phone Number */}
        <div className="mt-8 flex items-center gap-4 border-t pt-6">

          <div className="bg-[#EAF4FF] p-4 rounded-xl">
            <Phone
              className="text-[#2D2A70]"
              size={24}
            />
          </div>

          <div>
            <p className="text-gray-500 text-sm">
              Contact Number
            </p>

            <a
              href={`tel:${contact.phone}`}
              className="text-xl font-semibold text-[#2D2A70] hover:underline"
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