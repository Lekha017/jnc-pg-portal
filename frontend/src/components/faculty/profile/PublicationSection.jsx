import { Plus, Trash2 } from "lucide-react";

import Button from "../../common/Button";
import InputField from "../../common/InputField";

const PublicationSection = ({
  publications = [],
  setPublications,
}) => {
  const handleChange = (index, field, value) => {
    const updatedPublications = [...publications];
    updatedPublications[index][field] = value;
    setPublications(updatedPublications);
  };

  const addPublication = () => {
    setPublications([
      ...publications,
      {
        title: "",
        journal: "",
        year: "",
        isbnIssn: "",
        publisher: "",
      },
    ]);
  };

  const removePublication = (index) => {
    setPublications(
      publications.filter((_, i) => i !== index)
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#4B4B7C]">
          Publications
        </h2>

        <Button
          type="button"
          onClick={addPublication}
          className="w-auto px-5 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Publication
        </Button>
      </div>

      {publications.length === 0 ? (
        <div className="text-center py-6 border rounded-lg border-dashed text-gray-500">
          No publications added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {publications.map((publication, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                <InputField
                  label="Title"
                  value={publication.title}
                  onChange={(e) =>
                    handleChange(index, "title", e.target.value)
                  }
                  placeholder="Enter publication title"
                />

                <InputField
                  label="Journal"
                  value={publication.journal}
                  onChange={(e) =>
                    handleChange(index, "journal", e.target.value)
                  }
                  placeholder="Enter journal name"
                />

                <InputField
                  label="Year"
                  type="number"
                  value={publication.year}
                  onChange={(e) =>
                    handleChange(index, "year", e.target.value)
                  }
                  placeholder="Enter year"
                />

                <InputField
                  label="ISBN / ISSN"
                  value={publication.isbnIssn}
                  onChange={(e) =>
                    handleChange(index, "isbnIssn", e.target.value)
                  }
                  placeholder="Enter ISBN / ISSN"
                />

                <div className="md:col-span-2">
                  <InputField
                    label="Publisher"
                    value={publication.publisher}
                    onChange={(e) =>
                      handleChange(index, "publisher", e.target.value)
                    }
                    placeholder="Enter publisher"
                  />
                </div>

              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() => removePublication(index)}
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

export default PublicationSection;