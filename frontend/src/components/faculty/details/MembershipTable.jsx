import FacultyTable from "./FacultyTable";

const MembershipTable = ({
  memberships = [],
}) => {
  return (
    <FacultyTable
      columns={[
        "Sl. No.",
        "Organization",
        "Role",
        "Year",
      ]}
      data={memberships}
      emptyMessage="No memberships available."
      renderRow={(membership, index) => (
        <tr
          key={index}
          className="border-b border-gray-200 hover:bg-gray-50"
        >
          <td className="px-4 py-3 text-center">
            {index + 1}
          </td>

          <td className="px-4 py-3">
            {membership.organization || "-"}
          </td>

          <td className="px-4 py-3">
            {membership.role ||
              membership.designation ||
              "-"}
          </td>

          <td className="px-4 py-3 text-center">
            {membership.year || "-"}
          </td>
        </tr>
      )}
    />
  );
};

export default MembershipTable;