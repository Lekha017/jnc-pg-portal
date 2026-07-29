import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

const FacultyAccordion = ({
  title,
  children,
  defaultOpen = false,
}) => {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded mb-5 bg-white overflow-hidden">

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 bg-[#f8f8f8] hover:bg-gray-100 transition"
      >
        <h2 className="text-lg font-semibold text-[#2F2F6F]">
          {title}
        </h2>

        {open ? (
          <ChevronUp size={20} />
        ) : (
          <ChevronDown size={20} />
        )}
      </button>

      {open && (
        <div className="p-6">
          {children}
        </div>
      )}

    </div>
  );
};

export default FacultyAccordion;