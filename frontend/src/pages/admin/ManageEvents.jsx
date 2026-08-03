import { useState } from "react";

import EventForm from "../../components/admin/EventForm";
import EventList from "../../components/admin/EventList";

import GalleryForm from "../../components/admin/GalleryForm";
import GalleryList from "../../components/admin/GalleryList";

const ManageEvents = () => {
  const [activeTab, setActiveTab] = useState("events");

  // Event State
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [eventRefresh, setEventRefresh] = useState(false);

  // Gallery State
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [galleryRefresh, setGalleryRefresh] = useState(false);

  const triggerEventRefresh = () => {
    setEventRefresh((prev) => !prev);
  };

  const triggerGalleryRefresh = () => {
    setGalleryRefresh((prev) => !prev);
  };

  console.log("NEW MANAGE EVENTS PAGE");

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-6">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2D2A70]">
            Manage Events
          </h1>

          <p className="text-gray-600 mt-2">
            Create, update and manage college events and event gallery.
          </p>
        </div>

        {/* Tabs */}

        <div className="flex gap-4 mb-8 border-b border-gray-300 pb-5">

          <button
            onClick={() => setActiveTab("events")}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === "events"
                ? "bg-[#2D2A70] text-white"
                : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
            }`}
          >
            Events
          </button>

          <button
            onClick={() => setActiveTab("gallery")}
            className={`px-8 py-3 rounded-full font-semibold transition-all ${
              activeTab === "gallery"
                ? "bg-[#2D2A70] text-white"
                : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
            }`}
          >
            Event Gallery
          </button>

        </div>

        {/* Events */}

        {activeTab === "events" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            <div className="lg:col-span-2">
              <EventForm
                selectedEvent={selectedEvent}
                setSelectedEvent={setSelectedEvent}
                triggerRefresh={triggerEventRefresh}
              />
            </div>

            <div className="lg:col-span-3">
              <EventList
                onEdit={setSelectedEvent}
                refresh={eventRefresh}
              />
            </div>

          </div>
        )}

        {/* Gallery */}

        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            <div className="lg:col-span-2">
              <GalleryForm
                selectedGallery={selectedGallery}
                setSelectedGallery={setSelectedGallery}
                triggerRefresh={triggerGalleryRefresh}
              />
            </div>

            <div className="lg:col-span-3">
              <GalleryList
                onEdit={setSelectedGallery}
                refresh={galleryRefresh}
              />
            </div>

          </div>
        )}

      </div>
    </div>
  );
};

export default ManageEvents;