import { Plus, Trash2 } from "lucide-react";

import Button from "../../common/Button";
import InputField from "../../common/InputField";

const QualificationSection = ({
  qualifications = [],
  setQualifications,
}) => {
  const handleChange = (index, value) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = value;
    setQualifications(updatedQualifications);
  };

  const addQualification = () => {
    setQualifications([
      ...qualifications,
      "",
    ]);
  };

  const removeQualification = (index) => {
    setQualifications(
      qualifications.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#4B4B7C]">
          Qualifications
        </h2>

        <Button
          type="button"
          onClick={addQualification}
          className="w-auto px-5 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Qualification
        </Button>
      </div>

      {qualifications.length === 0 ? (
        <div className="text-center py-6 text-gray-500 border rounded-lg border-dashed">
          No qualifications added yet.
        </div>
      ) : (
        <div className="space-y-4">
          {qualifications.map(
            (qualification, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div className="flex-1">
                  <InputField
                    label={`Qualification ${
                      index + 1
                    }`}
                    value={qualification}
                    onChange={(e) =>
                      handleChange(
                        index,
                        e.target.value
                      )
                    }
                    placeholder="Enter qualification"
                  />
                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeQualification(index)
                  }
                  className="mt-10 p-3 rounded-lg bg-red-500 hover:bg-red-600 text-white transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default QualificationSection;