import FacultyTable from "./FacultyTable";

const PaperPresentationTable = ({
  paperPresentations = [],
}) => {
  return (
    <FacultyTable
      columns={[
        "Sl. No.",
        "Paper Title",
        "Event",
        "Year",
        "Location",
      ]}
      data={paperPresentations}
      emptyMessage="No paper presentations available."
      renderRow={(presentation, index) => (
        <tr
          key={index}
          className="border-b border-gray-200 hover:bg-gray-50"
        >
          <td className="px-4 py-3 text-center">
            {index + 1}
          </td>

          <td className="px-4 py-3">
            {presentation.title || "-"}
          </td>

          <td className="px-4 py-3">
            {presentation.event || "-"}
          </td>

          <td className="px-4 py-3 text-center">
            {presentation.year || "-"}
          </td>

          <td className="px-4 py-3">
            {presentation.location || "-"}
          </td>
        </tr>
      )}
    />
  );
};

export default PaperPresentationTable;