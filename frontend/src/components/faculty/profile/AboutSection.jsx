const AboutSection = ({ bio }) => {
  return (
    <p className="text-[15px] leading-7 text-gray-700 text-justify">
      {bio || "No information available."}
    </p>
  );
};

export default AboutSection;