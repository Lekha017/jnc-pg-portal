import { useMemo } from "react";
import { Search } from "lucide-react";

import PlacementGalleryCard from "./PlacementGalleryCard";

const PlacementGalleryList = ({
  galleries,
  search,
  setSearch,
  onEdit,
  onDelete,
}) => {
console.log("Gallery List:", galleries);
  const filteredGalleries = useMemo(() => {

    return galleries.filter((gallery) => {

      const keyword = search.toLowerCase();

      return (
        gallery.title
          ?.toLowerCase()
          .includes(keyword) ||

        gallery.description
          ?.toLowerCase()
          .includes(keyword)
      );

    });

  }, [galleries, search]);

  return (

    <div className="bg-white rounded-2xl border border-gray-200 shadow-md">

      {/* Header */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 p-6">

        <div>

          <h2 className="text-2xl font-bold text-[#2D2A70]">

            Existing Galleries

          </h2>

          <p className="text-gray-500 mt-1">

            View, search and manage placement galleries.

          </p>

        </div>

        {/* Search */}

        <div className="relative w-full md:w-80">

          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search gallery..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full rounded-xl border border-gray-300 pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />

        </div>

      </div>

      <div className="border-t border-gray-200" />
            {/* Gallery List */}

      {filteredGalleries.length === 0 ? (

        <div className="py-20 text-center">

          <h3 className="text-2xl font-semibold text-gray-600">

            No Gallery Found

          </h3>

          <p className="text-gray-500 mt-2">

            Create your first placement gallery or try another search.

          </p>

        </div>

      ) : (

        <div className="divide-y divide-gray-200">

          {filteredGalleries.map((gallery) => (

            <PlacementGalleryCard
              key={gallery._id}
              gallery={gallery}
              onEdit={onEdit}
              onDelete={onDelete}
            />

          ))}

        </div>

      )}

    </div>

  );

};

export default PlacementGalleryList;