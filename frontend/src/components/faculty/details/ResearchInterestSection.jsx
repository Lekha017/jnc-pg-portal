const ResearchInterestSection = ({
  researchInterests,
}) => {
  const interests = Array.isArray(researchInterests)
    ? researchInterests
    : researchInterests
    ? [researchInterests]
    : [];

  return interests.length > 0 ? (
    <ul className="list-disc pl-6 space-y-2 text-[15px] text-gray-700">
      {interests.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  ) : (
    <p className="text-[15px] text-gray-700">
      No research interests available.
    </p>
  );
};

export default ResearchInterestSection;