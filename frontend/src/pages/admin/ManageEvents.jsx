import { useState } from "react";

import EventForm from "../../components/admin/EventForm";
import EventList from "../../components/admin/EventList";

const ManageEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2D2A70]">
            Manage Events
          </h1>

          <p className="text-gray-600 mt-2">
            Create, update and manage all college events.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Form */}
          <div className="lg:col-span-2">
            <EventForm
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
              triggerRefresh={triggerRefresh}
            />
          </div>

          {/* List */}
          <div className="lg:col-span-3">
            <EventList
              onEdit={setSelectedEvent}
              refresh={refresh}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ManageEvents;