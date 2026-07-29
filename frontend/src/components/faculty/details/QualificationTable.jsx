import FacultyTable from "./FacultyTable";

const QualificationTable = ({
  qualifications = [],
}) => {
  return (
    <FacultyTable
      columns={[
        "Sl. No.",
        "Degree",
        "Subject",
        "University",
        "Year",
      ]}
      data={qualifications}
      emptyMessage="No qualifications available."
      renderRow={(qualification, index) => (
        <tr
          key={index}
          className="border-b border-gray-200 hover:bg-gray-50"
        >
          <td className="px-4 py-3 text-center">
            {index + 1}
          </td>

          <td className="px-4 py-3">
            {qualification.degree || "-"}
          </td>

          <td className="px-4 py-3">
            {qualification.subject || "-"}
          </td>

          <td className="px-4 py-3">
            {qualification.university || "-"}
          </td>

          <td className="px-4 py-3 text-center">
            {qualification.year || "-"}
          </td>
        </tr>
      )}
    />
  );
};

export default QualificationTable;