import { useState } from "react";
import { Plus, X } from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";

import EventList from "../../components/admin/EventList";
import GalleryList from "../../components/admin/GalleryList";

import EventForm from "../../components/admin/EventForm";
import GalleryForm from "../../components/admin/GalleryForm";

const ManageEvents = () => {
  const [activeTab, setActiveTab] = useState("events");

  const [eventRefresh, setEventRefresh] = useState(false);
  const [galleryRefresh, setGalleryRefresh] = useState(false);

  const [showEventForm, setShowEventForm] = useState(false);
  const [showGalleryForm, setShowGalleryForm] = useState(false);

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const triggerEventRefresh = () =>
    setEventRefresh((prev) => !prev);

  const triggerGalleryRefresh = () =>
    setGalleryRefresh((prev) => !prev);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f5f7fb] p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2D2A70]">
            Manage Events
          </h1>

          <p className="text-gray-500 mt-2">
            Create, edit and manage college events and galleries.
          </p>
        </div>

        {/* Tabs + Add Button */}
        <div className="flex items-center justify-between mb-8">

          <div className="flex gap-4">

            <button
              onClick={() => setActiveTab("events")}
              className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === "events"
                  ? "bg-[#2D2A70] text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Events
            </button>

            <button
              onClick={() => setActiveTab("gallery")}
              className={`px-6 py-3 rounded-xl font-semibold transition ${activeTab === "gallery"
                  ? "bg-[#2D2A70] text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50"
                }`}
            >
              Event Gallery
            </button>

          </div>

          <button
            onClick={() => {
              if (activeTab === "events") {
                setSelectedEvent(null);
                setShowEventForm(true);
              } else {
                setSelectedGallery(null);
                setShowGalleryForm(true);
              }
            }}
            className="flex items-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <Plus size={18} />
            {activeTab === "events"
              ? "Add Event"
              : "Add Gallery"}
          </button>

        </div>

        {/* Content */}

        {activeTab === "events" ? (
          <EventList
            refresh={eventRefresh}
            onEdit={(event) => {
              setSelectedEvent(event);
              setShowEventForm(true);
            }}
          />
        ) : (
          <GalleryList
            refresh={galleryRefresh}
            onEdit={(gallery) => {
              setSelectedGallery(gallery);
              setShowGalleryForm(true);
            }}
          />
        )}

        {/* Event Popup */}

        {showEventForm && (
  <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
    <div className="min-h-screen flex items-start justify-center p-8">

      <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

        <button
          onClick={() => {
            setShowEventForm(false);
            setSelectedEvent(null);
          }}
          className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          <EventForm
            selectedEvent={selectedEvent}
            setSelectedEvent={setSelectedEvent}
            triggerRefresh={() => {
              triggerEventRefresh();
              setShowEventForm(false);
            }}
          />
        </div>

      </div>

    </div>
  </div>
)}

        {/* Gallery Popup */}

        {showGalleryForm && (
  <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
    <div className="min-h-screen flex items-start justify-center p-8">

      <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

        <button
          onClick={() => {
            setShowGalleryForm(false);
            setSelectedGallery(null);
          }}
          className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
        >
          <X size={24} />
        </button>

        <div className="p-10">
          <GalleryForm
            selectedGallery={selectedGallery}
            setSelectedGallery={setSelectedGallery}
            triggerRefresh={() => {
              triggerGalleryRefresh();
              setShowGalleryForm(false);
            }}
          />
        </div>

      </div>

    </div>
  </div>
)}

      </div>
    </AdminLayout>
  );
};

export default ManageEvents;