function AdmissionStepCard({ step }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 flex gap-5 hover:shadow-lg transition">

      <div
        className={`${step.color} text-white w-12 h-12 rounded-xl flex items-center justify-center font-bold text-lg flex-shrink-0`}
      >
        {step.id}
      </div>

      <div>

        <h3 className="font-bold text-[#2D2A70] text-lg">
          Step {step.id}: {step.title}
        </h3>

        <p className="text-gray-600 mt-2 leading-relaxed">
          {step.description}
        </p>

      </div>

    </div>
  );
}

export default AdmissionStepCard;