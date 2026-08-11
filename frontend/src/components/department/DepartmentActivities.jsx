import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAchievementsByDepartment } from "../../services/achievementService";

const DepartmentActivities = ({ departmentId }) => {
  const navigate = useNavigate();

  const [achievements, setAchievements] = useState([]);
  const [achievementsLoading, setAchievementsLoading] = useState(false);

  const [achievementIndex, setAchievementIndex] = useState(0);
  const [clubIndex, setClubIndex] = useState(0);

  // =========================================================
  // TEMPORARY CLUBS & ASSOCIATIONS DATA
  // Backend will be added later
  // =========================================================

  const clubs = [
    {
      id: 1,
      title: "Student Clubs",
      description:
        "Student clubs provide opportunities to explore interests, develop skills and participate in collaborative activities.",
      image:
        "https://placehold.co/800x500?text=Student+Clubs",
    },
    {
      id: 2,
      title: "Cultural Associations",
      description:
        "Cultural associations encourage students to participate in cultural, creative and extracurricular activities.",
      image:
        "https://placehold.co/800x500?text=Cultural+Associations",
    },
    {
      id: 3,
      title: "Academic Associations",
      description:
        "Academic associations promote knowledge sharing, discussions, workshops and department-level activities.",
      image:
        "https://placehold.co/800x500?text=Academic+Associations",
    },
    {
      id: 4,
      title: "Community Activities",
      description:
        "Students actively participate in social initiatives, awareness programmes and community-oriented activities.",
      image:
        "https://placehold.co/800x500?text=Community+Activities",
    },
  ];

  // =========================================================
  // FETCH ACHIEVEMENTS
  // =========================================================

  useEffect(() => {
    if (!departmentId) return;

    const fetchAchievements = async () => {
      try {
        setAchievementsLoading(true);
        setAchievementIndex(0);

        const response =
          await getAchievementsByDepartment(departmentId);

        console.log(
          "Department achievements response:",
          response
        );

        setAchievements(
          Array.isArray(response?.data)
            ? response.data
            : []
        );
      } catch (error) {
        console.error(
          "Failed to fetch department achievements:",
          error
        );

        setAchievements([]);
      } finally {
        setAchievementsLoading(false);
      }
    };

    fetchAchievements();
  }, [departmentId]);

  // =========================================================
  // ACHIEVEMENT AUTO SLIDER
  // =========================================================

  useEffect(() => {
    if (achievements.length <= 2) return;

    const interval = setInterval(() => {
      setAchievementIndex((prev) => {
        const maxIndex = achievements.length - 2;

        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [achievements.length]);

  // =========================================================
  // CLUB AUTO SLIDER
  // =========================================================

  useEffect(() => {
    if (clubs.length <= 2) return;

    const interval = setInterval(() => {
      setClubIndex((prev) => {
        const maxIndex = clubs.length - 2;

        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [clubs.length]);

  // =========================================================
  // ACHIEVEMENT CONTROLS
  // =========================================================

  const nextAchievement = () => {
    if (achievements.length <= 2) return;

    const maxIndex = achievements.length - 2;

    setAchievementIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const previousAchievement = () => {
    if (achievements.length <= 2) return;

    const maxIndex = achievements.length - 2;

    setAchievementIndex((prev) =>
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  // =========================================================
  // CLUB CONTROLS
  // =========================================================

  const nextClub = () => {
    if (clubs.length <= 2) return;

    const maxIndex = clubs.length - 2;

    setClubIndex((prev) =>
      prev >= maxIndex ? 0 : prev + 1
    );
  };

  const previousClub = () => {
    if (clubs.length <= 2) return;

    const maxIndex = clubs.length - 2;

    setClubIndex((prev) =>
      prev <= 0 ? maxIndex : prev - 1
    );
  };

  // =========================================================
  // ACHIEVEMENT IMAGE
  // =========================================================

  const getAchievementImage = (achievement) => {
    return (
      achievement?.images?.[0]?.url ||
      "https://placehold.co/800x500?text=Achievement"
    );
  };

  // =========================================================
  // ACHIEVEMENT DATE
  // =========================================================

  const formatAchievementDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <section className="py-12 border-b border-gray-200">
      {/* =====================================================
          ACHIEVEMENTS + CLUBS & ASSOCIATIONS
      ====================================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

        {/* ===================================================
            ACHIEVEMENTS
        ==================================================== */}

        <div className="flex flex-col">

          {/* HEADER */}

          <div className="mb-6 min-h-[90px]">
            <h2 className="text-3xl font-bold text-[#2F2F6F]">
              Achievements
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Achievements and accomplishments of the
              department and its students
            </p>
          </div>

          {/* LOADING */}

          {achievementsLoading && (
            <div className="bg-white rounded-2xl border border-gray-200 h-[420px] flex items-center justify-center">
              <p className="text-gray-500">
                Loading achievements...
              </p>
            </div>
          )}

          {/* EMPTY */}

          {!achievementsLoading &&
            achievements.length === 0 && (
              <div className="bg-white rounded-2xl border border-gray-200 h-[420px] flex items-center justify-center">
                <p className="text-gray-500">
                  No achievements available for this
                  department.
                </p>
              </div>
            )}

          {/* ACHIEVEMENT CAROUSEL */}

          {!achievementsLoading &&
            achievements.length > 0 && (
              <div className="relative overflow-hidden">

                {/* VIEWPORT */}

                <div className="overflow-hidden">

                  {/* SLIDING TRACK */}

                  <div
                    className="flex gap-5 transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${
                        achievementIndex * 50
                      }%)`,
                    }}
                  >

                    {achievements.map((achievement) => (

                      <div
                        key={achievement._id}

                        /*
                         * IMPORTANT:
                         * Clicking an achievement from the
                         * department page goes to the main
                         * Achievements page.
                         *
                         * The image popup/slider will be
                         * handled inside Achievements.jsx.
                         */
                        onClick={() => navigate("/achievements")}

                        className="min-w-[calc(50%-10px)] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                      >

                        {/* IMAGE */}

                        <div className="h-[190px] overflow-hidden bg-gray-100">

                          <img
                            src={getAchievementImage(
                              achievement
                            )}
                            alt={
                              achievement?.title ||
                              "Achievement"
                            }
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            onError={(event) => {
                              event.currentTarget.src =
                                "https://placehold.co/800x500?text=Achievement";
                            }}
                          />

                        </div>

                        {/* CONTENT */}

                        <div className="p-5">

                          <h3 className="text-lg font-bold text-[#2F2F6F] line-clamp-2">
                            {achievement?.title}
                          </h3>

                          <p className="text-sm text-gray-600 mt-2 leading-6 line-clamp-3">
                            {achievement?.description ||
                              "Department achievement"}
                          </p>

                          {/* CATEGORY */}

                          {achievement?.category && (
                            <p className="text-xs font-semibold text-[#E91E63] mt-4 uppercase">
                              {achievement.category}
                            </p>
                          )}

                          {/* DATE */}

                          {achievement?.date && (
                            <p className="text-xs text-gray-500 mt-2">
                              {formatAchievementDate(
                                achievement.date
                              )}
                            </p>
                          )}

                        </div>

                      </div>

                    ))}

                  </div>

                </div>

                {/* PREVIOUS */}

                {achievements.length > 2 && (
                  <button
                    type="button"
                    onClick={previousAchievement}
                    className="absolute left-2 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 shadow-md text-[#2F2F6F] text-xl hover:bg-[#2F2F6F] hover:text-white transition z-10"
                    aria-label="Previous achievement"
                  >
                    ←
                  </button>
                )}

                {/* NEXT */}

                {achievements.length > 2 && (
                  <button
                    type="button"
                    onClick={nextAchievement}
                    className="absolute right-2 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 shadow-md text-[#2F2F6F] text-xl hover:bg-[#2F2F6F] hover:text-white transition z-10"
                    aria-label="Next achievement"
                  >
                    →
                  </button>
                )}

                {/* DOTS */}

                {achievements.length > 2 && (
                  <div className="flex justify-center gap-2 mt-5">

                    {Array.from({
                      length: achievements.length - 1,
                    }).map((_, index) => (

                      <button
                        type="button"
                        key={index}
                        onClick={() =>
                          setAchievementIndex(index)
                        }
                        className={`h-2.5 rounded-full transition-all ${
                          achievementIndex === index
                            ? "w-7 bg-[#2F2F6F]"
                            : "w-2.5 bg-gray-300"
                        }`}
                        aria-label={`Go to achievement ${
                          index + 1
                        }`}
                      />

                    ))}

                  </div>
                )}

              </div>
            )}

        </div>

        {/* ===================================================
            CLUBS & ASSOCIATIONS
        ==================================================== */}

        <div className="flex flex-col">

          {/* HEADER */}

          <div className="mb-6 min-h-[90px]">

            <h2 className="text-3xl font-bold text-[#2F2F6F]">
              Clubs & Associations
            </h2>

            <p className="text-gray-500 mt-2 leading-6">
              Explore the clubs, associations and
              extracurricular activities of our students
            </p>

          </div>

          {/* CLUB CAROUSEL */}

          <div className="relative overflow-hidden">

            {/* VIEWPORT */}

            <div className="overflow-hidden">

              {/* SLIDING TRACK */}

              <div
                className="flex gap-5 transition-transform duration-700 ease-in-out"
                style={{
                  transform: `translateX(-${
                    clubIndex * 50
                  }%)`,
                }}
              >

                {clubs.map((club) => (

                  <div
                    key={club.id}
                    className="min-w-[calc(50%-10px)] bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer"
                  >

                    {/* IMAGE */}

                    <div className="h-[190px] overflow-hidden bg-gray-100">

                      <img
                        src={club.image}
                        alt={club.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />

                    </div>

                    {/* CONTENT */}

                    <div className="p-5">

                      <h3 className="text-lg font-bold text-[#2F2F6F] line-clamp-2">
                        {club.title}
                      </h3>

                      <p className="text-sm text-gray-600 mt-2 leading-6 line-clamp-3">
                        {club.description}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            {/* PREVIOUS */}

            {clubs.length > 2 && (
              <button
                type="button"
                onClick={previousClub}
                className="absolute left-2 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 shadow-md text-[#2F2F6F] text-xl hover:bg-[#2F2F6F] hover:text-white transition z-10"
                aria-label="Previous club"
              >
                ←
              </button>
            )}

            {/* NEXT */}

            {clubs.length > 2 && (
              <button
                type="button"
                onClick={nextClub}
                className="absolute right-2 top-[42%] -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 shadow-md text-[#2F2F6F] text-xl hover:bg-[#2F2F6F] hover:text-white transition z-10"
                aria-label="Next club"
              >
                →
              </button>
            )}

            {/* DOTS */}

            {clubs.length > 2 && (
              <div className="flex justify-center gap-2 mt-5">

                {Array.from({
                  length: clubs.length - 1,
                }).map((_, index) => (

                  <button
                    type="button"
                    key={index}
                    onClick={() =>
                      setClubIndex(index)
                    }
                    className={`h-2.5 rounded-full transition-all ${
                      clubIndex === index
                        ? "w-7 bg-[#2F2F6F]"
                        : "w-2.5 bg-gray-300"
                    }`}
                    aria-label={`Go to club ${
                      index + 1
                    }`}
                  />

                ))}

              </div>
            )}

          </div>

        </div>

      </div>

    </section>
  );
};

export default DepartmentActivities;