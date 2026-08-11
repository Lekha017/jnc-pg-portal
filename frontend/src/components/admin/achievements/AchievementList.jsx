import { useEffect, useState } from "react";
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ConfirmModal from "../../common/ConfirmModal";

function AchievementList({ type }) {
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

  useEffect(() => {
    fetchAchievements();
  }, [type]);

  const fetchAchievements = async () => {
    try {
      setLoading(true);

      const { data } = await axios.get(
        `${API}/achievements/type/${type}`,
        {
          withCredentials: true,
        }
      );

      setAchievements(data.data || []);
    } catch (error) {
      console.error(
        "Error fetching achievements:",
        error
      );
    } finally {
      setLoading(false);
    }
  };

  const filteredAchievements = achievements.filter(
    (achievement) =>
      achievement.title
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      achievement.category
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      achievement.department?.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API}/achievements/${deleteId}`,
        {
          withCredentials: true,
        }
      );

      setAchievements((prev) =>
        prev.filter(
          (achievement) =>
            achievement._id !== deleteId
        )
      );

      setShowDeleteModal(false);
      setDeleteId(null);
    } catch (error) {
      console.error(
        "Delete achievement error:",
        error
      );

      alert(
        error.response?.data?.message ||
          "Failed to delete achievement"
      );
    }
  };

  const handlePublishToggle = async (id) => {
    try {
      const { data } = await axios.patch(
        `${API}/achievements/${id}/publish`,
        {},
        {
          withCredentials: true,
        }
      );

      setAchievements((prev) =>
        prev.map((achievement) =>
          achievement._id === id
            ? data.data
            : achievement
        )
      );
    } catch (error) {
      console.error(
        "Publish toggle error:",
        error
      );
    }
  };

  if (loading) {
    return (
      <div className="py-10 text-center text-gray-500">
        Loading achievements...
      </div>
    );
  }

  return (
    <>
      {/* Search */}
      <div className="mb-6">

        <input
          type="text"
          placeholder="Search achievements..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="w-full md:w-96 border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-[#2F2F6F]"
        />

      </div>

      {/* Empty */}
      {filteredAchievements.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">

          <p className="text-gray-500">
            No{" "}
            {type === "student"
              ? "student"
              : "faculty"}{" "}
            achievements found.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {filteredAchievements.map(
            (achievement) => (
              <div
                key={achievement._id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 flex flex-col lg:flex-row gap-5"
              >

                {/* Image */}
                <div className="w-full lg:w-36 h-32 shrink-0">

                  {achievement.images?.length > 0 ? (
                    <img
                      src={
                        achievement.images[0].url ||
                        achievement.images[0]
                      }
                      alt={achievement.title}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center text-gray-400 text-sm">
                      No Image
                    </div>
                  )}

                </div>

                {/* Content */}
                <div className="flex-1">

                  <div className="flex flex-wrap items-start justify-between gap-3">

                    <div>

                      <h3 className="text-lg font-bold text-[#2F2F6F]">
                        {achievement.title}
                      </h3>

                      <p className="text-sm text-gray-500 mt-1">
                        {achievement.department?.name ||
                          "No Department"}
                      </p>

                    </div>

                    {/* Status */}
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        achievement.isPublished
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {achievement.isPublished
                        ? "Published"
                        : "Unpublished"}
                    </span>

                  </div>

                  <p className="text-sm text-gray-600 mt-3 line-clamp-2">
                    {achievement.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-gray-500">

                    <span className="bg-gray-100 px-3 py-1 rounded-full">
                      {achievement.category}
                    </span>

                    <span>
                      {achievement.date
                        ? new Date(
                            achievement.date
                          ).toLocaleDateString()
                        : ""}
                    </span>

                    {achievement.images?.length > 0 && (
                      <span>
                        {achievement.images.length}{" "}
                        image
                        {achievement.images.length >
                        1
                          ? "s"
                          : ""}
                      </span>
                    )}

                  </div>

                </div>

                {/* Actions */}
                <div className="flex lg:flex-col justify-end gap-2">

                  <button
                    onClick={() =>
                      handlePublishToggle(
                        achievement._id
                      )
                    }
                    title={
                      achievement.isPublished
                        ? "Unpublish"
                        : "Publish"
                    }
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100"
                  >
                    {achievement.isPublished ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>

                  <button
                    onClick={() =>
                      navigate(
                        "/admin/achievements/edit",
                        {
                          state: {
                            type,
                            achievement,
                          },
                        }
                      )
                    }
                    title="Edit"
                    className="p-2 rounded-lg border border-gray-200 hover:bg-gray-100 text-[#2F2F6F]"
                  >
                    <Pencil size={18} />
                  </button>

                  <button
                    onClick={() => {
                      setDeleteId(
                        achievement._id
                      );
                      setShowDeleteModal(true);
                    }}
                    title="Delete"
                    className="p-2 rounded-lg border border-gray-200 hover:bg-red-50 text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}

      {/* Existing ConfirmModal */}
      {showDeleteModal && (
        <ConfirmModal
          isOpen={showDeleteModal}
          title="Delete Achievement"
          message="Are you sure you want to delete this achievement? This action cannot be undone."
          onConfirm={handleDelete}
          onCancel={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
          }}
        />
      )}
    </>
  );
}

export default AchievementList;