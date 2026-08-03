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
    <div className="max-w-5xl mx-auto">

      <div className="text-center mb-12">

        <h1 className="text-4xl font-bold text-[#2D2A70]">
          Admission Process
        </h1>

        <p className="text-gray-600 mt-3">
          Follow these simple steps to complete your admission successfully.
        </p>

      </div>

      <div className="space-y-5">

        {admissionSteps.map((step) => (
          <AdmissionStepCard
            key={step.id}
            step={step}
          />
        ))}

      </div>

      <div className="mt-10">
        <DocumentsCard
          documents={documents}
        />
      </div>

      <div className="mt-10">
        <ContactCard contacts={contacts} />
      </div>

    </div>
  );
}

export default AdmissionProcess;