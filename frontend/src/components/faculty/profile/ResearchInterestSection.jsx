const ResearchInterestSection = ({
  researchInterests,
}) => {
  const interests = Array.isArray(researchInterests)
    ? researchInterests
    : researchInterests
    ? [researchInterests]
    : [];

  if (!interests.length) {
    return (
      <p className="text-gray-700">
        No research interests available.
      </p>
    );
  }

  return (
    <ul className="list-disc pl-5 space-y-2 text-gray-700">
      {interests.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

export default ResearchInterestSection;