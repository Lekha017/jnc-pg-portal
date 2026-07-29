import { Plus, Trash2 } from "lucide-react";

import Button from "../../common/Button";
import InputField from "../../common/InputField";

const MembershipSection = ({
  memberships = [],
  setMemberships,
}) => {
  const addMembership = () => {
    setMemberships([
      ...memberships,
      {
        organization: "",
        role: "",
        year: "",
      },
    ]);
  };

  const removeMembership = (index) => {
    setMemberships(
      memberships.filter((_, i) => i !== index)
    );
  };

  const handleChange = (index, field, value) => {
    const updatedMemberships = [...memberships];
    updatedMemberships[index][field] = value;
    setMemberships(updatedMemberships);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-semibold text-[#4B4B7C]">
          Professional Memberships
        </h2>

        <Button
          type="button"
          onClick={addMembership}
          className="w-auto px-5 flex items-center gap-2"
        >
          <Plus size={18} />
          Add Membership
        </Button>
      </div>

      {memberships.length === 0 ? (
        <div className="text-center py-6 border rounded-lg border-dashed text-gray-500">
          No memberships added yet.
        </div>
      ) : (
        <div className="space-y-6">
          {memberships.map((membership, index) => (
            <div
              key={index}
              className="border rounded-xl p-6 bg-gray-50"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <InputField
                  label="Organization"
                  value={membership.organization}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "organization",
                      e.target.value
                    )
                  }
                  placeholder="Enter organization name"
                />

                <InputField
                  label="Role"
                  value={membership.role}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "role",
                      e.target.value
                    )
                  }
                  placeholder="Enter your role"
                />

                <InputField
                  label="Year"
                  type="number"
                  value={membership.year}
                  onChange={(e) =>
                    handleChange(
                      index,
                      "year",
                      e.target.value
                    )
                  }
                  placeholder="Enter year"
                />
              </div>

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={() =>
                    removeMembership(index)
                  }
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

export default MembershipSection;