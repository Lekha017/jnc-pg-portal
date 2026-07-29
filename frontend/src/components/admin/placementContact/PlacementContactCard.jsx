import {
  Mail,
  Phone,
  Pencil,
  Trash2,
  UserRound,
} from "lucide-react";

function PlacementContactCard({
  contact,
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">

      {/* Top Section */}

      <div className="flex gap-5">

        {/* Profile Image */}

        <div className="w-24 h-24 rounded-xl overflow-hidden border bg-gray-100 flex items-center justify-center flex-shrink-0">

          {contact.profileImage?.url ? (

            <img
              src={contact.profileImage.url}
              alt={contact.coordinatorName}
              className="w-full h-full object-cover"
            />

          ) : (

            <UserRound
              size={42}
              className="text-gray-400"
            />

          )}

        </div>

        {/* Details */}

        <div className="flex-1">

          <div className="flex justify-between items-start">

            <div>

              <h3 className="text-xl font-bold text-[#2D2A70]">
                {contact.coordinatorName}
              </h3>

              <p className="text-gray-700 mt-1">
                {contact.designation}
              </p>

              <p className="text-sm text-gray-500">
                {contact.department}
              </p>

            </div>

            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold ${
                contact.isPublished
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {contact.isPublished
                ? "Published"
                : "Draft"}
            </span>

          </div>

          {/* Contact */}

          <div className="mt-5 space-y-2">

            <div className="flex items-center gap-2 text-gray-600">

              <Mail
                size={16}
                className="text-[#2D2A70]"
              />

              <span>{contact.email}</span>

            </div>

            <div className="flex items-center gap-2 text-gray-600">

              <Phone
                size={16}
                className="text-[#2D2A70]"
              />

              <span>{contact.phone}</span>

            </div>

          </div>

        </div>

      </div>

      {/* Description */}

      <div className="mt-5 border-t pt-4">

        <p className="text-gray-600 leading-7">
          {contact.description}
        </p>

      </div>

      {/* Buttons */}

      <div className="flex justify-end gap-3 mt-6">

        <button
          onClick={() => onEdit(contact)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white transition"
        >
          <Pencil size={16} />
          Edit
        </button>

        <button
          onClick={() => onDelete(contact._id)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white transition"
        >
          <Trash2 size={16} />
          Delete
        </button>

      </div>

    </div>
  );
}

export default PlacementContactCard;