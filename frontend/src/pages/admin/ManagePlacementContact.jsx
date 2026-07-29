import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import PlacementContactForm from "../../components/admin/placementContact/PlacementContactForm";
import PlacementContactList from "../../components/admin/placementContact/PlacementContactList";
import ConfirmModal from "../../components/common/ConfirmModal";

import {
  getPlacementContacts,
  deletePlacementContact,
} from "../../services/placementContactService";

const ManagePlacementContact = () => {
  const [contacts, setContacts] = useState([]);

  const [selectedContact, setSelectedContact] = useState(null);

  const [refresh, setRefresh] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, [refresh]);

  const fetchContacts = async () => {
    try {
      const res = await getPlacementContacts();

      setContacts(res.data || []);
    } catch (error) {
      console.error(error);

      toast.error("Failed to load placement contacts.");
    }
  };

  const triggerRefresh = () => {
    setRefresh((prev) => !prev);
  };

  /* ================= Delete ================= */

  const handleDelete = (id) => {
    setDeleteId(id);

    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await deletePlacementContact(deleteId);

      toast.success(
        "Placement Contact Deleted Successfully"
      );

      if (selectedContact?._id === deleteId) {
        setSelectedContact(null);
      }

      setShowDeleteModal(false);

      setDeleteId(null);

      triggerRefresh();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Unable to delete placement contact."
      );
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);

    setDeleteId(null);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-[#2D2A70]">
              Manage Placement Contact
            </h1>

            <p className="text-gray-600 mt-2">
              Create, update and manage placement coordinator details.
            </p>

          </div>

          {/* Content */}

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left Form */}

            <div className="lg:col-span-2">

              <PlacementContactForm
                selectedContact={selectedContact}
                setSelectedContact={setSelectedContact}
                triggerRefresh={triggerRefresh}
              />

            </div>

            {/* Right List */}

            <div className="lg:col-span-3">

              <PlacementContactList
                contacts={contacts}
                onEdit={setSelectedContact}
                onDelete={handleDelete}
                refresh={refresh}
              />

            </div>

          </div>

        </div>
      </div>

      {/* Delete Confirmation Modal */}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Delete Placement Contact"
        message="Are you sure you want to delete this placement contact? This action cannot be undone."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default ManagePlacementContact;