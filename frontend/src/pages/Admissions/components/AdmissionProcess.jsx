import {
  admissionSteps,
  documents,
  contacts,
} from "../data/admissionData";

import AdmissionStepCard from "./AdmissionStepCard";
import DocumentsCard from "./DocumentsCard";
import ContactCard from "./ContactCard";

function AdmissionProcess() {
  return (
    <div
      className="
        w-full
        max-w-5xl
        mx-auto
        px-1
        sm:px-2
      "
    >

      {/* =========================
          HEADING
      ========================= */}

      <div
        className="
          text-center
          mb-8
          sm:mb-10
          lg:mb-12
        "
      >

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
          Admission Process
        </h1>

        <p
          className="
            text-gray-600
            mt-3
            text-sm
            sm:text-base
            leading-6
            sm:leading-7
            max-w-2xl
            mx-auto
            px-2
          "
        >
          Follow these simple steps to complete your
          admission successfully.
        </p>

      </div>

      {/* =========================
          ADMISSION STEPS
      ========================= */}

      <div className="space-y-4 sm:space-y-5">

        {admissionSteps.map((step) => (
          <AdmissionStepCard
            key={step.id}
            step={step}
          />
        ))}

      </div>

      {/* =========================
          DOCUMENTS
      ========================= */}

      <div className="mt-8 sm:mt-10">

        <DocumentsCard
          documents={documents}
        />

      </div>

      {/* =========================
          CONTACTS
      ========================= */}

      <div className="mt-8 sm:mt-10">

        <ContactCard
          contacts={contacts}
        />

      </div>

    </div>
  );
}

export default AdmissionProcess;