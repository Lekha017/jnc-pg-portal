import { useState } from "react";
import { Plus, X } from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";

import AnnouncementForm from "../../components/admin/announcements/AnnouncementForm";
import AnnouncementList from "../../components/admin/announcements/AnnouncementList";

function ManageAnnouncements() {
  const [selectedAnnouncement, setSelectedAnnouncement] =
    useState(null);

  const [refresh, setRefresh] = useState(false);

  const [showForm, setShowForm] = useState(false);

  const triggerRefresh = () =>
    setRefresh((prev) => !prev);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f5f7fb] p-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#2D2A70]">
            Manage Announcements
          </h1>

          <p className="text-gray-500 mt-2">
            Create, edit and manage announcements.
          </p>
        </div>

        {/* Add Button */}
        <div className="flex items-center justify-end mb-8">

          <button
            onClick={() => {
              setSelectedAnnouncement(null);
              setShowForm(true);
            }}
            className="flex items-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <Plus size={18} />
            Add Announcement
          </button>

        </div>

        {/* Announcement List */}

        <AnnouncementList
          refresh={refresh}
          onEdit={(announcement) => {
            setSelectedAnnouncement(announcement);
            setShowForm(true);
          }}
        />

        {/* Popup */}

        {showForm && (
          <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">

            <div className="min-h-screen flex items-start justify-center p-8">

              <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

                {/* Close Button */}

                <button
                  onClick={() => {
                    setShowForm(false);
                    setSelectedAnnouncement(null);
                  }}
                  className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
                >
                  <X size={24} />
                </button>

                {/* Form */}

                <div className="p-10">

                  <AnnouncementForm
                    selectedAnnouncement={selectedAnnouncement}
                    setSelectedAnnouncement={setSelectedAnnouncement}
                    triggerRefresh={() => {
                      triggerRefresh();
                      setShowForm(false);
                      setSelectedAnnouncement(null);
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
}

export default ManageAnnouncements;