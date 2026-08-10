import {
  MapPin,
  Clock3,
  Building2,
} from "lucide-react";

const OfficeInfoCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

      {/* Header */}

      <div className="bg-[#EAF4FF] px-6 py-5 border-none">

        <h2 className="text-2xl font-bold text-[#2D2A70]">
          Office Information
        </h2>

        <p className="text-gray-600 text-sm mt-1">
          Placement Cell Office Details
        </p>

      </div>


      {/* Content */}

      <div className="p-6 space-y-6">

        {/* Placement Cell */}

        <div className="flex gap-4">

          <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] flex items-center justify-center">

            <Building2
              className="text-[#2D2A70]"
              size={24}
            />

          </div>

          <div>

            <h3 className="font-semibold text-gray-900">
              Placement Cell
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              Jyoti Nivas College (Autonomous)
            </p>

          </div>

        </div>


        {/* Address */}

        <div className="flex gap-4">

          <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] flex items-center justify-center">

            <MapPin
              className="text-[#2D2A70]"
              size={24}
            />

          </div>

          <div>

            <h3 className="font-semibold text-gray-900">
              Office Address
            </h3>

            <p className="text-gray-600 text-sm mt-1 leading-6">
              Jyoti Nivas College (Autonomous)
              <br />
              Hosur Road,
              <br />
              Bengaluru,
              Karnataka – 560095
            </p>

          </div>

        </div>


        {/* Working Hours */}

        <div className="flex gap-4">

          <div className="w-12 h-12 rounded-xl bg-[#EAF4FF] flex items-center justify-center">

            <Clock3
              className="text-[#2D2A70]"
              size={24}
            />

          </div>

          <div>

            <h3 className="font-semibold text-gray-900">
              Office Hours
            </h3>

            <p className="text-gray-600 text-sm mt-1">
              Monday – Friday
            </p>

            <p className="text-gray-600 text-sm">
              9:00 AM – 4:00 PM
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OfficeInfoCard;