import { useState } from "react";

import GalleryForm from "../../components/admin/GalleryForm";
import GalleryList from "../../components/admin/GalleryList";

const ManageGallery = () => {
  const [selectedGallery, setSelectedGallery] = useState(null);
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
            Manage Event Gallery
          </h1>

          <p className="text-gray-600 mt-2">
            Create, update and manage all event galleries.
          </p>

        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* Gallery Form */}
          <div className="lg:col-span-2">

            <GalleryForm
              selectedGallery={selectedGallery}
              setSelectedGallery={setSelectedGallery}
              triggerRefresh={triggerRefresh}
            />

          </div>

          {/* Gallery List */}
          <div className="lg:col-span-3">

            <GalleryList
              onEdit={setSelectedGallery}
              refresh={refresh}
            />

          </div>

        </div>

      </div>
    </div>
  );
};

export default ManageGallery;