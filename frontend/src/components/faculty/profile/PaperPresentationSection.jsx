import { Plus, Trash2 } from "lucide-react";

import Button from "../../common/Button";
import InputField from "../../common/InputField";

const PaperPresentationSection = ({
  paperPresentations = [],
  setPaperPresentations,
}) => {
  const addPresentation = () => {
    setPaperPresentations([
      ...paperPresentations,
      {
        title: "",
        event: "",
        year: "",
        location: "",
      },
    ]);
  };

  const removePresentation = (index) => {
    setPaperPresentations(
      paperPresentations.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, field, value) => {
    const updatedPresentations = [...paperPresentations];
    updatedPresentations[index][field] = value;
    setPaperPresentations(updatedPresentations);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#4B4B7C]">
          Paper Presentations
        </h2>

        <Button
          type="button"
          onClick={addPresentation}
          className="w-auto px-5 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Presentation
        </Button>
      </div>

      {paperPresentations.length === 0 ? (
        <div className="text-center py-6 border rounded-lg border-dashed text-gray-500">
          No paper presentations added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {paperPresentations.map((item, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <InputField
                  label="Paper Title"
                  value={item.title}
                  onChange={(e) =>
                    handleChange(index, "title", e.target.value)
                  }
                  placeholder="Enter paper title"
                />

                <InputField
                  label="Event Name"
                  value={item.event}
                  onChange={(e) =>
                    handleChange(index, "event", e.target.value)
                  }
                  placeholder="Enter event name"
                />

                <InputField
                  label="Year"
                  type="number"
                  value={item.year}
                  onChange={(e) =>
                    handleChange(index, "year", e.target.value)
                  }
                  placeholder="Enter year"
                />

                <InputField
                  label="Location"
                  value={item.location}
                  onChange={(e) =>
                    handleChange(index, "location", e.target.value)
                  }
                  placeholder="Enter location"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => removePresentation(index)}
                  className="p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PaperPresentationSection;