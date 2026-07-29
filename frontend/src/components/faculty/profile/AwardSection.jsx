import { Plus, Trash2 } from "lucide-react";

import Button from "../../common/Button";
import InputField from "../../common/InputField";

const AwardSection = ({
  awards = [],
  setAwards,
}) => {
  const addAward = () => {
    setAwards([
      ...awards,
      {
        title: "",
        organization: "",
        year: "",
      },
    ]);
  };

  const removeAward = (index) => {
    setAwards(
      awards.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, field, value) => {
    const updatedAwards = [...awards];
    updatedAwards[index][field] = value;
    setAwards(updatedAwards);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#4B4B7C]">
          Awards & Achievements
        </h2>

        <Button
          type="button"
          onClick={addAward}
          className="w-auto px-5 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Award
        </Button>
      </div>

      {awards.length === 0 ? (
        <div className="text-center py-6 border rounded-lg border-dashed text-gray-500">
          No awards added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {awards.map((award, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField
                  label="Award Title"
                  value={award.title}
                  onChange={(e) =>
                    handleChange(index, "title", e.target.value)
                  }
                  placeholder="Enter award title"
                />

                <InputField
                  label="Organization"
                  value={award.organization}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "organization",
                      e.target.value
                    )
                  }
                  placeholder="Enter organization"
                />

                <InputField
                  label="Year"
                  type="number"
                  value={award.year}
                  onChange={(e) =>
                    handleChange(index, "year", e.target.value)
                  }
                  placeholder="Enter year"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => removeAward(index)}
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

export default AwardSection;