const FacultyTable = ({
  columns = [],
  data = [],
  renderRow,
  emptyMessage = "No records available.",
}) => {
  return (
    <div className="overflow-x-auto border border-gray-200 rounded bg-white">
      <table className="w-full border-collapse text-sm">

        <thead>
          <tr className="bg-[#f3f4f6]">
            {columns.map((column, index) => (
              <th
                key={index}
                className="
                  border
                  border-gray-300
                  px-4
                  py-3
                  text-center
                  font-semibold
                  text-[#2F2F6F]
                "
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.length > 0 ? (
            data.map((item, index) =>
              renderRow(item, index)
            )
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="
                  border
                  border-gray-300
                  py-8
                  text-center
                  text-gray-500
                "
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  );
};

export default FacultyTable;