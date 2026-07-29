import FacultyTable from "./FacultyTable";

const PublicationTable = ({
  publications = [],
}) => {
  return (
    <FacultyTable
      columns={[
        "Sl. No.",
        "Title",
        "Journal",
        "Year",
        "ISBN / ISSN",
        "Publisher",
      ]}
      data={publications}
      emptyMessage="No publications available."
      renderRow={(publication, index) => (
        <tr
          key={index}
          className="border-b border-gray-200 hover:bg-gray-50"
        >
          <td className="px-4 py-3 text-center">
            {index + 1}
          </td>

          <td className="px-4 py-3">
            {publication.title || "-"}
          </td>

          <td className="px-4 py-3">
            {publication.journal || "-"}
          </td>

          <td className="px-4 py-3 text-center">
            {publication.year || "-"}
          </td>

          <td className="px-4 py-3">
            {publication.isbnIssn || "-"}
          </td>

          <td className="px-4 py-3">
            {publication.publisher || "-"}
          </td>
        </tr>
      )}
    />
  );
};

export default PublicationTable;