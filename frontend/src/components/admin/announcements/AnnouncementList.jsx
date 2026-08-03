import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AnnouncementCard from "./AnnouncementCard";
import ConfirmationModal from "../../common/ConfirmModal";

import {
  getAllAnnouncements,
  deleteAnnouncement,
} from "../../../services/announcementService";

function AnnouncementList({
  refresh,
  onEdit,
}) {
  const [announcements, setAnnouncements] = useState([]);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchAnnouncements();
  }, [refresh]);

  const fetchAnnouncements = async () => {
    try {
      const res = await getAllAnnouncements();

      console.log("Admin Announcements:", res);

      setAnnouncements(res.data || []);

    } catch (error) {
      console.error(
        "Fetch Announcement Error:",
        error
      );

      toast.error(
        "Failed to load announcements"
      );
    }
  };


  const handleDelete = async () => {
    try {

      await deleteAnnouncement(deleteId);

      toast.success(
        "Announcement Deleted Successfully"
      );

      setDeleteId(null);

      fetchAnnouncements();

    } catch (error) {

      console.error(
        "Delete Announcement Error:",
        error
      );

      toast.error(
        "Failed to delete announcement"
      );
    }
  };


  return (
    <>
      <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6">

        <div className="mb-6">

          <h2 className="text-2xl font-bold text-[#2D2A70]">
            Announcements
          </h2>

          <p className="text-gray-500 text-sm">
            Manage all announcements.
          </p>

        </div>


        {announcements.length === 0 ? (

          <div className="text-center py-16">

            <p className="text-lg text-gray-500">
              No Announcements Found
            </p>

          </div>

        ) : (

          <div className="space-y-4">

            {announcements.map(
              (announcement) => (

                <AnnouncementCard
                  key={announcement._id}
                  announcement={announcement}
                  onEdit={onEdit}
                  onDelete={setDeleteId}
                />

              )
            )}

          </div>

        )}

      </div>


      <ConfirmationModal
        isOpen={Boolean(deleteId)}
        title="Delete Announcement"
        message="Are you sure you want to delete this announcement?"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />

    </>
  );
}

export default AnnouncementList;