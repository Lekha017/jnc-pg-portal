import FacultyTable from "./FacultyTable";

const ConferencePublicationTable = ({
  conferencePublications = [],
}) => {
  return (
    <FacultyTable
      columns={[
        "Sl. No.",
        "Paper Title",
        "Conference",
        "Year",
        "Location",
      ]}
      data={conferencePublications}
      emptyMessage="No conference publications available."
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
            {publication.conference || "-"}
          </td>

          <td className="px-4 py-3 text-center">
            {publication.year || "-"}
          </td>

          <td className="px-4 py-3">
            {publication.location || "-"}
          </td>
        </tr>
      )}
    />
  );
};

export default ConferencePublicationTable;