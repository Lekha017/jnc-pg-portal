import { FileText } from "lucide-react";

function DocumentsCard({ documents }) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

      <div className="flex items-center gap-3 mb-5">

        <div className="bg-blue-100 p-2 rounded-lg">
          <FileText className="text-blue-700" />
        </div>

        <h2 className="text-xl font-bold text-[#2D2A70]">
          Documents Required
        </h2>

      </div>

      <ul className="space-y-3">

        {documents.map((doc) => (
          <li
            key={doc}
            className="flex items-start gap-2 text-gray-700"
          >
            <span className="text-[#2D2A70] font-bold">
              •
            </span>

            {doc}
          </li>
        ))}

      </ul>

    </div>
  );
}

export default DocumentsCard;