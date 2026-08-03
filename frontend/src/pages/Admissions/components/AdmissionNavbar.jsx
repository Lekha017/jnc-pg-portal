import { admissionTabs } from "../data/admissionData";

function AdmissionNavbar({
  activeTab,
  setActiveTab,
}) {
  return (
    <div className="bg-white border-b">

      <div className="max-w-7xl mx-auto px-6 py-5">

        <h1 className="text-4xl font-bold text-[#2D2A70]">
          Admissions 2026-2027
        </h1>

        <p className="text-gray-500 mt-2">
          Everything you need to know about admission.
        </p>

        <div className="flex gap-4 mt-8">

          {admissionTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setActiveTab(tab.id)
              }
              className={`
                px-6
                py-3
                rounded-xl
                font-semibold
                transition

                ${
                  activeTab === tab.id
                    ? "bg-[#2D2A70] text-white"
                    : "bg-gray-100 hover:bg-gray-200"
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