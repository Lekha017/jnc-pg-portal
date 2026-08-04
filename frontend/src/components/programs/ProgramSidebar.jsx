function ProgramSidebar({ details }) {
    return (
        <div
            className="
        bg-white
        border
        border-gray-200
        rounded-2xl
        p-6
        sticky
        top-24
      "
        >
            {/* Contact Section */}

            <h3 className="text-2xl font-bold text-[#2D2A70] mb-5">
                Contact Information
            </h3>

            {details?.contactPerson1 && (
                <div className="mb-5">
                    <p className="font-semibold text-gray-800">
                        {details.contactPerson1}
                    </p>

                    <p className="text-gray-600">
                        {details.contactPhone1}
                    </p>
                </div>
            )}

            {details?.contactPerson2 && (
                <div className="mb-5">
                    <p className="font-semibold text-gray-800">
                        {details.contactPerson2}
                    </p>

                    <p className="text-gray-600">
                        {details.contactPhone2}
                    </p>
                </div>
            )}

            {details?.email && (
                <div className="mb-6">
                    <p className="font-semibold text-gray-800">
                        Email
                    </p>

                    <p className="text-gray-600 break-all">
                        {details.email}
                    </p>
                </div>
            )}

            <div className="border-b border-gray-200 my-6"></div>

            {/* Syllabus */}

            {details?.syllabusPdf && (
                <a
                    href={details.syllabusPdf}
                    target="_blank"
                    rel="noreferrer"
                    className="
            block
            w-full
            text-center
            bg-[#2D2A70]
            text-white
            py-3
            rounded-xl
            mb-4
          "
                >
                    Download Syllabus
                </a>
            )}

            {/* Apply */}

            <button
                className="
    w-full
    bg-[#2D2A70]
    hover:bg-[#23205b]
    text-white
    py-3
    rounded-xl
    font-medium
    transition
  "
            >
                Apply Now
            </button>
        </div>
    );
}

export default ProgramSidebar;