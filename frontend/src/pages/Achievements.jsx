import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  Trophy,
  Star,
  Award,
  Code2,
  Medal,
  FileText,
  Lightbulb,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";


const FILTERS = [
  { label: "All", value: "all" },
  { label: "Students", value: "student" },
  { label: "Faculty", value: "faculty" },
  { label: "Research", value: "research" },
  { label: "Competitions", value: "competitions" },
  { label: "Other", value: "other" },
];

const ITEMS_PER_PAGE = 6;

const Achievements = () => {
  const API = import.meta.env.VITE_API_URL;

  const [achievements, setAchievements] = useState([]);
  const [activeFilter, setActiveFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // IMAGE MODAL
  // =========================================================

  const [selectedAchievement, setSelectedAchievement] =
    useState(null);

  const [selectedImageIndex, setSelectedImageIndex] =
    useState(0);

  // =========================================================
  // FETCH ACHIEVEMENTS
  // =========================================================

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `${API}/achievements`
      );

      setAchievements(response.data?.data || []);
    } catch (error) {
      console.error(
        "Error fetching achievements:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load achievements."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // FILTER ACHIEVEMENTS
  // =========================================================

  const filteredAchievements = useMemo(() => {
    if (activeFilter === "all") {
      return achievements;
    }

    if (
      activeFilter === "student" ||
      activeFilter === "faculty"
    ) {
      return achievements.filter(
        (achievement) =>
          achievement.type?.toLowerCase() ===
          activeFilter
      );
    }

    if (activeFilter === "research") {
      return achievements.filter((achievement) =>
        achievement.category
          ?.toLowerCase()
          .includes("research")
      );
    }

    if (activeFilter === "competitions") {
      return achievements.filter((achievement) => {
        const category =
          achievement.category?.toLowerCase() || "";

        return (
          category.includes("competition") ||
          category.includes("hackathon") ||
          category.includes("contest")
        );
      });
    }

    return achievements.filter((achievement) => {
      const category =
        achievement.category?.toLowerCase() || "";

      return (
        !category.includes("research") &&
        !category.includes("competition") &&
        !category.includes("hackathon") &&
        !category.includes("contest")
      );
    });
  }, [achievements, activeFilter]);

  // =========================================================
  // PAGINATION
  // =========================================================

  const totalPages = Math.ceil(
    filteredAchievements.length / ITEMS_PER_PAGE
  );

  const paginatedAchievements =
    filteredAchievements.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [activeFilter]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;

    setCurrentPage(page);

    window.scrollTo({
      top: 300,
      behavior: "smooth",
    });
  };

  // =========================================================
  // DATE FORMAT
  // =========================================================

  const formatDate = (date) => {
    if (!date) return "";

    const formattedDate = new Date(date);

    return formattedDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  // =========================================================
  // GET ACHIEVEMENT IMAGES
  // =========================================================

  const getImages = (achievement) => {
    if (
      achievement?.images &&
      Array.isArray(achievement.images) &&
      achievement.images.length > 0
    ) {
      return achievement.images
        .map((image) => {
          if (typeof image === "string") {
            return image;
          }

          return image?.url;
        })
        .filter(Boolean);
    }

    return [
      "https://placehold.co/800x500?text=Achievement",
    ];
  };

  // =========================================================
  // GET FIRST IMAGE
  // =========================================================

  const getImage = (achievement) => {
    const images = getImages(achievement);

    return images[0];
  };

  // =========================================================
  // TYPE BADGE
  // =========================================================

  const getTypeBadge = (achievement) => {
    const type = achievement.type?.toLowerCase();

    if (type === "faculty") {
      return {
        label: "FACULTY",
        className: "bg-[#6652C7] text-white",
      };
    }

    return {
      label: "STUDENTS",
      className: "bg-[#E83E79] text-white",
    };
  };

  // =========================================================
  // CATEGORY ICON
  // =========================================================

  const getCategoryIcon = (achievement) => {
    const category =
      achievement.category?.toLowerCase() || "";

    if (category.includes("research")) {
      return <Star size={18} />;
    }

    if (
      category.includes("competition") ||
      category.includes("hackathon")
    ) {
      return <Trophy size={18} />;
    }

    if (category.includes("code")) {
      return <Code2 size={18} />;
    }

    if (category.includes("paper")) {
      return <FileText size={18} />;
    }

    if (
      category.includes("innovation") ||
      category.includes("project")
    ) {
      return <Lightbulb size={18} />;
    }

    if (category.includes("award")) {
      return <Award size={18} />;
    }

    return <Medal size={18} />;
  };

  // =========================================================
  // OPEN IMAGE MODAL
  // =========================================================

  const openImageModal = (achievement) => {
    setSelectedAchievement(achievement);
    setSelectedImageIndex(0);

    document.body.style.overflow = "hidden";
  };

  // =========================================================
  // CLOSE IMAGE MODAL
  // =========================================================

  const closeImageModal = () => {
    setSelectedAchievement(null);
    setSelectedImageIndex(0);

    document.body.style.overflow = "auto";
  };

  // =========================================================
  // NEXT IMAGE
  // =========================================================

  const nextImage = () => {
    if (!selectedAchievement) return;

    const images = getImages(selectedAchievement);

    setSelectedImageIndex((prev) =>
      prev >= images.length - 1 ? 0 : prev + 1
    );
  };

  // =========================================================
  // PREVIOUS IMAGE
  // =========================================================

  const previousImage = () => {
    if (!selectedAchievement) return;

    const images = getImages(selectedAchievement);

    setSelectedImageIndex((prev) =>
      prev <= 0 ? images.length - 1 : prev - 1
    );
  };

  // =========================================================
  // KEYBOARD CONTROLS
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!selectedAchievement) return;

      if (event.key === "Escape") {
        closeImageModal();
      }

      if (event.key === "ArrowRight") {
        nextImage();
      }

      if (event.key === "ArrowLeft") {
        previousImage();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [selectedAchievement]);

  // =========================================================
  // RETURN
  // =========================================================

  return (
    
    <div className="min-h-screen bg-[#f6f8fc]">
      <Header/>
      <Navbar/>

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#29286E]">

        <div className="absolute inset-0 pointer-events-none overflow-hidden">

          <div className="absolute -right-20 top-0 h-full w-[58%] opacity-20">

            <svg
              viewBox="0 0 800 300"
              className="w-full h-full"
              preserveAspectRatio="none"
            >

              <path
                d="M0 180 C150 80 260 260 420 140 C560 30 680 100 800 40"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />

              <path
                d="M0 210 C150 110 270 290 430 170 C570 60 690 130 800 70"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />

              <path
                d="M0 240 C150 140 280 320 440 200 C580 90 700 160 800 100"
                fill="none"
                stroke="white"
                strokeWidth="1"
              />

            </svg>

          </div>

        </div>

        <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">

          <div className="grid lg:grid-cols-2 gap-10 items-center">

            <div>

              <p className="text-[#B7B0F2] uppercase tracking-wide text-sm font-semibold mb-3">
                Computer Science Department
              </p>

              <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
                Achievements
              </h1>

              <p className="text-white/80 text-lg md:text-xl mt-5 max-w-xl leading-relaxed">
                Celebrating the excellence, innovation and
                success of our students and faculty.
              </p>

            </div>

            <div className="hidden lg:flex justify-end">

              <div className="text-right">

                <p className="text-white/75 text-xl italic leading-relaxed">
                  “Big dreams
                  <br />
                  Lead to
                  <br />
                  Greater achievements.”
                </p>

                <div className="w-40 h-[2px] bg-[#E83E79] ml-auto mt-6" />

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-12">

        {/* HEADING + FILTERS */}

        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">

          <div>

            <h2 className="text-3xl font-bold text-[#17245B]">
              Our Achievements
            </h2>

            <p className="text-gray-500 mt-2">
              A showcase of milestones, recognitions and
              accomplishments from our department.
            </p>

          </div>

          <div className="flex flex-wrap gap-2">

            {FILTERS.map((filter) => (

              <button
                key={filter.value}
                type="button"
                onClick={() =>
                  setActiveFilter(filter.value)
                }
                className={`
                  px-5 py-2
                  rounded-full
                  text-sm
                  font-medium
                  border
                  transition-all
                  outline-none
                  focus:outline-none
                  focus:ring-0
                  ${
                    activeFilter === filter.value
                      ? "bg-[#6752C8] border-[#6752C8] text-white shadow-sm"
                      : "bg-white border-gray-200 text-gray-600 hover:border-[#6752C8] hover:text-[#6752C8]"
                  }
                `}
              >
                {filter.label}
              </button>

            ))}

          </div>

        </div>

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {[1, 2, 3, 4, 5, 6].map((item) => (

              <div
                key={item}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 animate-pulse"
              >

                <div className="h-48 bg-gray-200" />

                <div className="p-5">

                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-4" />

                  <div className="h-4 bg-gray-200 rounded mb-2" />

                  <div className="h-4 bg-gray-200 rounded w-5/6 mb-5" />

                  <div className="h-4 bg-gray-200 rounded w-1/2" />

                </div>

              </div>

            ))}

          </div>

        )}

        {/* =====================================================
            ERROR
        ====================================================== */}

        {!loading && error && (

          <div className="bg-white border border-red-200 rounded-xl p-10 text-center">

            <p className="text-red-500 font-medium">
              {error}
            </p>

            <button
              type="button"
              onClick={fetchAchievements}
              className="
                mt-4
                px-5
                py-2
                bg-[#2D2A70]
                text-white
                rounded-lg
                outline-none
                focus:outline-none
                focus:ring-0
              "
            >
              Try Again
            </button>

          </div>

        )}

        {/* =====================================================
            EMPTY
        ====================================================== */}

        {!loading &&
          !error &&
          paginatedAchievements.length === 0 && (

            <div className="bg-white rounded-xl border border-gray-200 py-20 text-center">

              <Trophy
                size={48}
                className="mx-auto text-gray-300"
              />

              <h3 className="text-xl font-semibold text-gray-700 mt-4">
                No achievements found
              </h3>

              <p className="text-gray-500 mt-2">
                There are no achievements available for this
                category.
              </p>

            </div>

          )}

        {/* =====================================================
            ACHIEVEMENT GRID
        ====================================================== */}

        {!loading &&
          !error &&
          paginatedAchievements.length > 0 && (

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

              {paginatedAchievements.map(
                (achievement) => {

                  const badge =
                    getTypeBadge(achievement);

                  return (

                    <article
                      key={achievement._id}
                      tabIndex={0}
                      role="button"
                      onClick={() =>
                        openImageModal(achievement)
                      }
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          openImageModal(achievement);
                        }
                      }}
                      className="
                        group
                        bg-white
                        rounded-lg
                        overflow-hidden
                        border
                        border-gray-200
                        shadow-sm
                        hover:shadow-lg
                        hover:-translate-y-1
                        transition-all
                        duration-300
                        cursor-pointer
                        outline-none
                        focus:outline-none
                        focus:ring-0
                        focus:border-gray-200
                      "
                    >

                      {/* IMAGE */}

                      <div className="relative h-48 overflow-hidden">

                        <img
                          src={getImage(achievement)}
                          alt={achievement.title}
                          className="
                            w-full
                            h-full
                            object-cover
                            group-hover:scale-105
                            transition-transform
                            duration-500
                            pointer-events-none
                          "
                        />

                        {/* BADGE */}

                        <span
                          className={`
                            absolute
                            top-3
                            right-3
                            px-3
                            py-1
                            rounded-md
                            text-[11px]
                            font-bold
                            tracking-wide
                            ${badge.className}
                          `}
                        >
                          {badge.label}
                        </span>

                        {/* IMAGE COUNT */}

                        {getImages(achievement).length > 1 && (

                          <span
                            className="
                              absolute
                              bottom-3
                              right-3
                              bg-black/65
                              text-white
                              text-xs
                              px-3
                              py-1
                              rounded-full
                              backdrop-blur-sm
                            "
                          >
                            {getImages(achievement).length}{" "}
                            Photos
                          </span>

                        )}

                      </div>

                      {/* CONTENT */}

                      <div className="p-5">

                        <h3
                          className="
                            text-[17px]
                            font-bold
                            text-[#16235A]
                            leading-snug
                            line-clamp-2
                            min-h-[44px]
                          "
                        >
                          {achievement.title}
                        </h3>

                        <p
                          className="
                            text-gray-600
                            text-sm
                            leading-relaxed
                            mt-3
                            line-clamp-3
                            min-h-[63px]
                          "
                        >
                          {achievement.description}
                        </p>

                        {/* BOTTOM INFO */}

                        <div className="flex items-center gap-2 mt-5 min-w-0">

                          <span className="text-[#E7A900] shrink-0">
                            {getCategoryIcon(
                              achievement
                            )}
                          </span>

                          <span className="text-xs text-gray-600 whitespace-nowrap">
                            {formatDate(
                              achievement.date
                            )}
                          </span>

                          <span className="text-gray-300">
                            •
                          </span>

                          <span
                            className="
                              text-xs
                              text-gray-600
                              truncate
                            "
                          >
                            {achievement.category ||
                              "Achievement"}
                          </span>

                        </div>

                      </div>

                    </article>

                  );
                }
              )}

            </div>

          )}

        {/* =====================================================
            PAGINATION
        ====================================================== */}

        {!loading &&
          !error &&
          filteredAchievements.length > 0 && (

            <div className="flex flex-col items-center mt-10">

              <div className="flex items-center gap-2">

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      currentPage - 1
                    )
                  }
                  disabled={currentPage === 1}
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-white
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    hover:border-[#6752C8]
                    hover:text-[#6752C8]
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    outline-none
                    focus:outline-none
                    focus:ring-0
                  "
                >
                  <ChevronLeft size={18} />
                </button>

                {Array.from(
                  { length: totalPages },
                  (_, index) => index + 1
                ).map((page) => (

                  <button
                    key={page}
                    type="button"
                    onClick={() =>
                      handlePageChange(page)
                    }
                    className={`
                      w-10
                      h-10
                      rounded-lg
                      text-sm
                      font-semibold
                      transition
                      outline-none
                      focus:outline-none
                      focus:ring-0
                      ${
                        currentPage === page
                          ? "bg-[#6752C8] text-white"
                          : "bg-white border border-gray-200 text-gray-600 hover:border-[#6752C8] hover:text-[#6752C8]"
                      }
                    `}
                  >
                    {page}
                  </button>

                ))}

                <button
                  type="button"
                  onClick={() =>
                    handlePageChange(
                      currentPage + 1
                    )
                  }
                  disabled={
                    currentPage === totalPages
                  }
                  className="
                    w-10
                    h-10
                    rounded-lg
                    bg-white
                    border
                    border-gray-200
                    flex
                    items-center
                    justify-center
                    text-gray-600
                    hover:border-[#6752C8]
                    hover:text-[#6752C8]
                    disabled:opacity-40
                    disabled:cursor-not-allowed
                    outline-none
                    focus:outline-none
                    focus:ring-0
                  "
                >
                  <ChevronRight size={18} />
                </button>

              </div>

              <p className="text-sm text-gray-500 mt-3">

                Showing{" "}

                {Math.min(
                  (currentPage - 1) *
                    ITEMS_PER_PAGE +
                    1,
                  filteredAchievements.length
                )}

                {" - "}

                {Math.min(
                  currentPage *
                    ITEMS_PER_PAGE,
                  filteredAchievements.length
                )}

                {" "}of{" "}

                {filteredAchievements.length}{" "}
                achievements

              </p>

            </div>

          )}

      </main>

      {/* =====================================================
          IMAGE LIGHTBOX / MODAL
      ====================================================== */}

      {selectedAchievement && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onClick={closeImageModal}
        >

          {/* MODAL */}

          <div
            className="
              relative
              w-full
              max-w-5xl
              max-h-[92vh]
              bg-white
              rounded-2xl
              overflow-hidden
              shadow-2xl
            "
            onClick={(event) =>
              event.stopPropagation()
            }
          >

            {/* CLOSE */}

            <button
              type="button"
              onClick={closeImageModal}
              className="
                absolute
                top-4
                right-4
                z-20
                w-10
                h-10
                rounded-full
                bg-black/60
                text-white
                flex
                items-center
                justify-center
                hover:bg-black/80
                transition
                outline-none
                focus:outline-none
                focus:ring-0
              "
              aria-label="Close"
            >
              <X size={21} />
            </button>

            {/* IMAGE */}

            <div className="relative bg-black flex items-center justify-center">

              <img
                src={
                  getImages(selectedAchievement)[
                    selectedImageIndex
                  ]
                }
                alt={
                  selectedAchievement.title ||
                  "Achievement"
                }
                className="
                  max-h-[72vh]
                  w-full
                  object-contain
                "
              />

              {/* PREVIOUS IMAGE */}

              {getImages(selectedAchievement).length >
                1 && (

                <button
                  type="button"
                  onClick={previousImage}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    w-11
                    h-11
                    rounded-full
                    bg-white/90
                    text-[#29286E]
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    hover:bg-white
                    transition
                    outline-none
                    focus:outline-none
                    focus:ring-0
                  "
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>

              )}

              {/* NEXT IMAGE */}

              {getImages(selectedAchievement).length >
                1 && (

                <button
                  type="button"
                  onClick={nextImage}
                  className="
                    absolute
                    right-4
                    top-1/2
                    -translate-y-1/2
                    w-11
                    h-11
                    rounded-full
                    bg-white/90
                    text-[#29286E]
                    flex
                    items-center
                    justify-center
                    shadow-lg
                    hover:bg-white
                    transition
                    outline-none
                    focus:outline-none
                    focus:ring-0
                  "
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

              )}

            </div>

            {/* DETAILS */}

            <div className="p-5">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <h3 className="text-xl font-bold text-[#17245B]">

                    {selectedAchievement.title}

                  </h3>

                  <p className="text-sm text-gray-500 mt-1">

                    {selectedAchievement.category ||
                      "Achievement"}

                    {selectedAchievement.date && (
                      <>
                        {" • "}
                        {formatDate(
                          selectedAchievement.date
                        )}
                      </>
                    )}

                  </p>

                </div>

                {/* IMAGE COUNTER */}

                {getImages(selectedAchievement).length >
                  1 && (

                  <div className="shrink-0">

                    <span className="text-xs font-semibold text-gray-500">

                      {selectedImageIndex + 1} /{" "}

                      {getImages(
                        selectedAchievement
                      ).length}

                    </span>

                  </div>

                )}

              </div>

              <p className="text-gray-600 text-sm leading-6 mt-3">

                {selectedAchievement.description}

              </p>

              {/* THUMBNAILS */}

              {getImages(selectedAchievement).length >
                1 && (

                <div className="flex gap-3 mt-5 overflow-x-auto pb-1">

                  {getImages(
                    selectedAchievement
                  ).map((image, index) => (

                    <button
                      key={index}
                      type="button"
                      onClick={() =>
                        setSelectedImageIndex(index)
                      }
                      className={`
                        shrink-0
                        w-16
                        h-16
                        rounded-lg
                        overflow-hidden
                        border-2
                        outline-none
                        focus:outline-none
                        focus:ring-0
                        ${
                          selectedImageIndex === index
                            ? "border-[#6752C8]"
                            : "border-transparent"
                        }
                      `}
                    >

                      <img
                        src={image}
                        alt={`Achievement ${index + 1}`}
                        className="w-full h-full object-cover"
                      />

                    </button>

                  ))}

                </div>

              )}

            </div>

          </div>

        </div>

      )}

       <Footer />
    </div>
  );
};

export default Achievements;