const FacultySection = ({
  title,
  children,
}) => {
  return (
    <section className="mb-10">
      <h2 className="text-[24px] font-semibold text-[#2F2F6F] border-b border-gray-300 pb-2 mb-5">
        {title}
      </h2>

      {children}
    </section>
  );
};

export default FacultySection;