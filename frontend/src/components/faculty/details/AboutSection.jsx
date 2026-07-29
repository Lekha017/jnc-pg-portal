import FacultySection from "./FacultySection";

const AboutSection = ({ bio }) => {
  return (
    <p className="text-gray-700 leading-7 whitespace-pre-line">
      {bio || "No biography available."}
    </p>
  );
};

export default AboutSection;