import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import GalleryCard from "./GalleryCard";

import {
  getGalleries,
  deleteGallery,
} from "../../services/galleryService";

const GalleryList = ({
  onEdit,
  refresh,
}) => {
  const [galleries, setGalleries] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, [refresh]);

  const fetchGalleries = async () => {
    try {
      setLoading(true);

      const res = await getGalleries();

      setGalleries(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load galleries");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteGallery(id);

      toast.success(
        "Gallery Deleted Successfully"
      );

      fetchGalleries();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete gallery"
      );
    }
  };

  const filteredGalleries =
    galleries.filter((gallery) =>
      gallery.title
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200">

      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5 border-b border-gray-200">

        <h2 className="text-3xl font-bold text-[#2D2A70]">
          Existing Galleries
        </h2>

        <div className="relative w-80">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search galleries..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              border
              border-gray-300
              rounded-xl
              pl-11
              pr-4
              py-3
              outline-none
              focus:ring-2
              focus:ring-[#2D2A70]/20
              focus:border-[#2D2A70]
            "
          />

        </div>

      </div>

      {/* Gallery List */}
      <div className="max-h-[760px] overflow-y-auto">

        {loading ? (

          <div className="py-12 text-center text-gray-500">
            Loading galleries...
          </div>

        ) : filteredGalleries.length === 0 ? (

          <div className="py-12 text-center text-gray-500">
            No galleries found.
          </div>

        ) : (

          filteredGalleries.map(
            (gallery) => (
              <GalleryCard
                key={gallery._id}
                gallery={gallery}
                onEdit={onEdit}
                onDelete={
                  handleDelete
                }
              />
            )
          )

        )}

      </div>

    </div>
  );
};

export default GalleryList;