import {
  Mail,
  Phone,
  Building2,
  UserCircle2,
} from "lucide-react";

const CoordinatorCard = ({ contact }) => {
  if (!contact) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <p className="text-gray-600">
          No Placement Coordinator Found
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}

      <div className="bg-[#EAF4FF] px-8 py-6 border-none">

        <h2 className="text-3xl font-bold text-[#2D2A70]">
          Placement Coordinator
        </h2>

        <p className="text-gray-600 mt-2">
          Get in touch with our Placement Cell for placement assistance,
          recruitment queries and career guidance.
        </p>

      </div>


      {/* Body */}

      <div className="p-8">

        <div className="flex flex-col lg:flex-row gap-8">

          {/* Image */}

          <div className="flex justify-center">

            <img
              src={contact.profileImage?.url}
              alt={contact.coordinatorName}
              className="w-52 h-52 rounded-3xl object-cover border-none shadow"
            />

          </div>


          {/* Details */}

          <div className="flex-1">

            <h2 className="text-4xl font-bold text-[#2D2A70]">
              {contact.coordinatorName}
            </h2>

            <p className="text-xl text-gray-600 mt-2">
              {contact.designation}
            </p>


            <div className="mt-8 grid md:grid-cols-3 gap-5">

              {/* Department */}

              <div className="bg-[#F8FAFC] rounded-2xl p-5">

                <Building2
                  className="text-[#2D2A70] mb-3"
                  size={28}
                />

                <p className="text-sm text-gray-500">
                  Department
                </p>

                <p className="font-semibold mt-1">
                  {contact.department}
                </p>

              </div>


              {/* Email */}

              <div className="bg-[#F8FAFC] rounded-2xl p-5">

                <Mail
                  className="text-[#2D2A70] mb-3"
                  size={28}
                />

                <p className="text-sm text-gray-500">
                  Email
                </p>

                <p className="font-semibold mt-1 break-all">
                  {contact.email}
                </p>

              </div>


              {/* Phone */}

              <div className="bg-[#F8FAFC] rounded-2xl p-5">

                <Phone
                  className="text-[#2D2A70] mb-3"
                  size={28}
                />

                <p className="text-sm text-gray-500">
                  Phone
                </p>

                <p className="font-semibold mt-1">
                  {contact.phone}
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* About */}

        <div className="mt-10 bg-[#F8FAFC] rounded-2xl p-8">

          <div className="flex items-center gap-3 mb-4">

            <UserCircle2
              className="text-[#2D2A70]"
              size={28}
            />

            <h3 className="text-2xl font-bold text-[#2D2A70]">
              About the Placement Cell
            </h3>

          </div>

          <p className="text-gray-700 leading-8 text-justify">
            {contact.description}
          </p>

        </div>

      </div>

    </div>
  );
};

export default CoordinatorCard;