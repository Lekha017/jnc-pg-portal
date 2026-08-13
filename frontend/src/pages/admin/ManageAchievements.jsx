import { useState } from "react";
import { Plus, X } from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";

import AchievementList from "../../components/admin/achievements/AchievementList";
import AchievementForm from "../../components/admin/achievements/AchievementForm";

const ManageAchievements = () => {
  const [activeTab, setActiveTab] = useState("student");

  const [achievementRefresh, setAchievementRefresh] =
    useState(false);

  const [showAchievementForm, setShowAchievementForm] =
    useState(false);

  const [selectedAchievement, setSelectedAchievement] =
    useState(null);

  /*
  ============================
  REFRESH LIST
  ============================
  */

  const triggerAchievementRefresh = () => {
    setAchievementRefresh((prev) => !prev);
  };

  /*
  ============================
  OPEN ADD FORM
  ============================
  */

  const handleAddAchievement = () => {
    setSelectedAchievement(null);
    setShowAchievementForm(true);
  };

  /*
  ============================
  OPEN EDIT FORM
  ============================
  */

  const handleEditAchievement = (achievement) => {
    setSelectedAchievement(achievement);
    setShowAchievementForm(true);
  };

  /*
  ============================
  CLOSE FORM
  ============================
  */

  const handleCloseForm = () => {
    setShowAchievementForm(false);
    setSelectedAchievement(null);
  };

  /*
  ============================
  TAB CHANGE
  ============================
  */

  const handleTabChange = (type) => {
    // Close form if user changes tab
    setShowAchievementForm(false);
    setSelectedAchievement(null);

    setActiveTab(type);
  };

  return (
    <AdminLayout>

      <div className="max-w-7xl mx-auto">

        {/* ============================
            HEADER
        ============================ */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-[#2D2A70]">
            Manage Achievements
          </h1>

          <p className="text-gray-500 mt-2">
            Create, edit and manage student and
            faculty achievements.
          </p>

        </div>

        {/* ============================
            TABS + ADD BUTTON
        ============================ */}

        <div className="flex items-center justify-between mb-8">

          {/* TABS */}

          <div className="flex gap-4">

            {/* STUDENT */}

            <button
              type="button"
              onClick={() =>
                handleTabChange("student")
              }
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                activeTab === "student"
                  ? "bg-[#2D2A70] text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              Student Achievements
            </button>

            {/* FACULTY */}

            <button
              type="button"
              onClick={() =>
                handleTabChange("faculty")
              }
              className={`px-6 py-3 rounded-xl font-semibold transition ${
                activeTab === "faculty"
                  ? "bg-[#2D2A70] text-white"
                  : "bg-white border border-gray-300 hover:bg-gray-50 text-gray-700"
              }`}
            >
              Faculty Achievements
            </button>

          </div>

          {/* ADD ACHIEVEMENT */}

          <button
            type="button"
            onClick={handleAddAchievement}
            className="flex items-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
          >
            <Plus size={18} />

            Add Achievement
          </button>

        </div>

        {/* ============================
            ACHIEVEMENT LIST
        ============================ */}

        <AchievementList
          type={activeTab}
          refresh={achievementRefresh}
          onEdit={handleEditAchievement}
        />

        {/* ============================
            ACHIEVEMENT FORM POPUP
        ============================ */}

        {showAchievementForm && (
          <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-6">

            <div className="relative w-full max-w-7xl max-h-[90vh] overflow-y-auto bg-[#f5f7fb] rounded-3xl shadow-2xl">

              {/* ============================
                  CLOSE BUTTON
              ============================ */}

              <button
                type="button"
                onClick={handleCloseForm}
                className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100 transition"
              >
                <X size={24} />
              </button>

              {/* ============================
                  FORM
              ============================ */}

              <div className="p-10">

                <AchievementForm
                  type={activeTab}
                  selectedAchievement={
                    selectedAchievement
                  }

                  triggerRefresh={() => {
                    triggerAchievementRefresh();
                    handleCloseForm();
                  }}

                  onClose={handleCloseForm}
                />

              </div>

            </div>

          </div>
        )}

      </div>

    </AdminLayout>
  );
};

export default ManageAchievements;