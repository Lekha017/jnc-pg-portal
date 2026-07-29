import FacultyTable from "./FacultyTable";

const AwardTable = ({
  awards = [],
}) => {
  return (
    <FacultyTable
      columns={[
        "Sl. No.",
        "Award",
        "Organization",
        "Year",
      ]}
      data={awards}
      emptyMessage="No awards available."
      renderRow={(award, index) => (
        <tr
          key={index}
          className="border-b border-gray-200 hover:bg-gray-50"
        >
          <td className="px-4 py-3 text-center">
            {index + 1}
          </td>

          <td className="px-4 py-3">
            {award.title || "-"}
          </td>

          <td className="px-4 py-3">
            {award.organization || "-"}
          </td>

          <td className="px-4 py-3 text-center">
            {award.year || "-"}
          </td>
        </tr>
      )}
    />
  );
};

export default AwardTable;