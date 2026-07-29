import PlacementContactCard from "./PlacementContactCard";

function PlacementContactList({
  contacts = [],
  onEdit,
  onDelete,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

      {/* Heading */}

      <div className="mb-6">

        <h2 className="text-2xl font-bold text-[#2D2A70]">
          Placement Contacts
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          Manage all placement coordinator details.
        </p>

      </div>

      {/* Empty State */}

      {contacts.length === 0 ? (

        <div className="flex flex-col items-center justify-center py-20">

          <p className="text-lg font-medium text-gray-500">
            No Placement Contact Found
          </p>

          <p className="text-gray-400 text-sm mt-2">
            Add your first placement coordinator.
          </p>

        </div>

      ) : (

        <div className="space-y-5">

          {contacts.map((contact) => (

            <PlacementContactCard
              key={contact._id}
              contact={contact}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </div>

      )}

    </div>
  );
}

export default PlacementContactList;