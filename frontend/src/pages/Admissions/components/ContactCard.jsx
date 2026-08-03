import {
  Phone,
  Mail,
  User,
} from "lucide-react";

function ContactCard({ contacts }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

      <h2 className="text-xl font-bold text-[#2D2A70] mb-6">
        Admission Enquiries
      </h2>

      <div className="space-y-4">

        <div className="flex items-center gap-3">
          <Phone className="text-[#2D2A70]" />
          <span>{contacts.phone}</span>
        </div>

        <div className="flex items-center gap-3">
          <Phone className="text-[#2D2A70]" />
          <span>{contacts.office}</span>
        </div>

        <div className="flex items-center gap-3">
          <Mail className="text-[#2D2A70]" />
          <span>{contacts.email}</span>
        </div>

      </div>

      <hr className="my-6" />

      <h3 className="font-bold text-[#2D2A70] mb-4">
        Technical Support
      </h3>

      <div className="space-y-4">

        {contacts.support.map((person) => (
          <div
            key={person.name}
            className="flex items-center gap-3"
          >
            <User className="text-[#2D2A70]" />

            <div>

              <p className="font-semibold">
                {person.name}
              </p>

              <p className="text-gray-600">
                {person.phone}
              </p>

            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default ContactCard;