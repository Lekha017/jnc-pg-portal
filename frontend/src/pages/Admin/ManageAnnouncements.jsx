import { useState } from "react";
import AdminLayout from "../../components/layout/AdminLayout";

import AnnouncementForm from "../../components/admin/announcements/AnnouncementForm";
import AnnouncementList from "../../components/admin/announcements/AnnouncementList";

function ManageAnnouncements() {
  const [
    selectedAnnouncement,
    setSelectedAnnouncement,
  ] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const triggerRefresh = () => setRefresh(!refresh);

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="grid lg:grid-cols-2 gap-8">
          <AnnouncementForm
            selectedAnnouncement={selectedAnnouncement}
            setSelectedAnnouncement={setSelectedAnnouncement}
            triggerRefresh={triggerRefresh}
          />

          <AnnouncementList
            refresh={refresh}
            onEdit={setSelectedAnnouncement}
          />
        </div>
      </div>
    </AdminLayout>
  );
}

export default ManageAnnouncements;