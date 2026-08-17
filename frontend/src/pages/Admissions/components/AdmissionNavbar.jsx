import { admissionTabs } from "../data/admissionData";

function AdmissionNavbar({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="bg-white border-b">

      <div
        className="
          max-w-7xl
          mx-auto

          px-4
          sm:px-6
          lg:px-8

          py-5
          sm:py-6
          lg:py-7
        "
      >

        {/* =========================
            HEADING
        ========================= */}

        <h1
          className="
            text-2xl
            sm:text-3xl
            lg:text-4xl

            font-bold
            text-[#2D2A70]

            leading-tight
          "
        >
          Admissions 2026-2027
        </h1>

        {/* =========================
            DESCRIPTION
        ========================= */}

        <p
          className="
            text-sm
            sm:text-base

            text-gray-500

            mt-2

            max-w-2xl
          "
        >
          Everything you need to know about admission.
        </p>

        {/* =========================
            TABS
        ========================= */}

        <div
          className="
            flex
            gap-2
            sm:gap-3
            lg:gap-4

            mt-5
            sm:mt-6
            lg:mt-8

            overflow-x-auto

            pb-2

            scrollbar-hide

            -mx-1
            px-1
          "
        >

          {admissionTabs.map((tab) => (

            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex-shrink-0

                px-4
                sm:px-5
                lg:px-6

                py-2
                sm:py-2.5
                lg:py-3

                rounded-lg
                sm:rounded-xl

                text-sm
                sm:text-base

                font-semibold

                transition
                duration-200

                whitespace-nowrap

                ${
                  activeTab === tab.id
                    ? "bg-[#2D2A70] text-white"
                    : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                }
              `}
            >
              {tab.label}
            </button>

          ))}

        </div>

      </div>

    </div>
  );
}

export default AdmissionNavbar;