import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Users,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import api from "../../services/api";

import {
  getClubAssociations,
  getClubAssociationsByDepartment,
} from "../../services/clubAssociationService";

const ClubAssociations = () => {
  // =========================================================
  // STATE
  // =========================================================

  const [departments, setDepartments] = useState([]);

  const [clubAssociations, setClubAssociations] =
    useState([]);

  const [selectedDepartment, setSelectedDepartment] =
    useState("all");

  const [search, setSearch] = useState("");

  const [loadingDepartments, setLoadingDepartments] =
    useState(true);

  const [loadingClubs, setLoadingClubs] =
    useState(true);

  // =========================================================
  // FETCH DEPARTMENTS
  // =========================================================

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        setLoadingDepartments(true);

        const response = await api.get("/departments");

        const departmentData =
          response?.data?.data ||
          response?.data ||
          [];

        setDepartments(
          Array.isArray(departmentData)
            ? departmentData
            : []
        );
      } catch (error) {
        console.error(
          "Fetch departments error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load departments."
        );

        setDepartments([]);
      } finally {
        setLoadingDepartments(false);
      }
    };

    fetchDepartments();
  }, []);

  // =========================================================
  // FETCH ALL PUBLISHED CLUBS
  // =========================================================

  const fetchAllClubs = async () => {
    try {
      setLoadingClubs(true);

      const response =
        await getClubAssociations();

      const clubData = Array.isArray(
        response?.data
      )
        ? response.data
        : [];

      setClubAssociations(clubData);
    } catch (error) {
      console.error(
        "Fetch clubs error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load clubs and associations."
      );

      setClubAssociations([]);
    } finally {
      setLoadingClubs(false);
    }
  };

  // =========================================================
  // FETCH CLUBS BY DEPARTMENT
  // =========================================================

  const fetchClubsByDepartment = async (
    departmentId
  ) => {
    try {
      setLoadingClubs(true);

      const response =
        await getClubAssociationsByDepartment(
          departmentId
        );

      const clubData = Array.isArray(
        response?.data
      )
        ? response.data
        : [];

      setClubAssociations(clubData);
    } catch (error) {
      console.error(
        "Fetch department clubs error:",
        error
      );

      toast.error(
        error?.response?.data?.message ||
          "Failed to load clubs for this department."
      );

      setClubAssociations([]);
    } finally {
      setLoadingClubs(false);
    }
  };

  // =========================================================
  // INITIAL CLUB FETCH
  // =========================================================

  useEffect(() => {
    fetchAllClubs();
  }, []);

  // =========================================================
  // DEPARTMENT CHANGE
  // =========================================================

  const handleDepartmentChange = (
    departmentId
  ) => {
    setSelectedDepartment(departmentId);
    setSearch("");

    if (departmentId === "all") {
      fetchAllClubs();
      return;
    }

    fetchClubsByDepartment(departmentId);
  };

  // =========================================================
  // SEARCH
  // =========================================================

  const filteredClubs = useMemo(() => {
    const searchValue = search
      .trim()
      .toLowerCase();

    if (!searchValue) {
      return clubAssociations;
    }

    return clubAssociations.filter((club) => {
      const title =
        club?.title?.toLowerCase() || "";

      const description =
        club?.description?.toLowerCase() || "";

      const department =
        club?.department?.name?.toLowerCase() ||
        "";

      return (
        title.includes(searchValue) ||
        description.includes(searchValue) ||
        department.includes(searchValue)
      );
    });
  }, [search, clubAssociations]);

  // =========================================================
  // SELECTED DEPARTMENT NAME
  // =========================================================

  const selectedDepartmentName =
    selectedDepartment === "all"
      ? "All Clubs & Associations"
      : departments.find(
          (department) =>
            department._id === selectedDepartment
        )?.name || "Clubs & Associations";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      <Header />

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="bg-[#2F2F6F] text-white">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-9 md:py-11">

          <div className="max-w-3xl">

            {/* STUDENT LIFE BADGE */}

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/20 text-xs md:text-sm mb-4">

              <Users size={15} />

              Student Life

            </div>

            {/* TITLE */}

            <h1 className="text-3xl md:text-4xl font-bold leading-tight">

              Clubs & Associations

            </h1>

            {/* DESCRIPTION */}

            <p className="text-white/80 text-sm md:text-base leading-7 mt-3 max-w-2xl">

              Explore the clubs and associations that
              encourage students to discover their
              interests, develop new skills and actively
              participate in campus life.

            </p>

          </div>

        </div>

      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <section className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-14">

        {/* ===================================================
            DEPARTMENT FILTER
        ==================================================== */}

        <div className="mb-10">

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-5">

            <div>

              <p className="text-sm font-semibold text-[#4B4B7C] uppercase tracking-wide">

                Explore by Department

              </p>

              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mt-1">

                Find a Club or Association

              </h2>

            </div>

            {/* SEARCH */}

            <div className="relative w-full md:w-80">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search clubs..."
                className="
                  w-full
                  pl-11 pr-4 py-3
                  bg-white
                  border border-gray-200
                  rounded-xl
                  outline-none
                  focus:border-[#4B4B7C]
                  focus:ring-2
                  focus:ring-[#4B4B7C]/10
                "
              />

            </div>

          </div>

          {/* DEPARTMENT BUTTONS */}

          <div className="flex gap-3 overflow-x-auto pb-2">

            {/* ALL */}

            <button
              type="button"
              onClick={() =>
                handleDepartmentChange("all")
              }
              className={`
                shrink-0
                px-5 py-2.5
                rounded-full
                text-sm font-semibold
                border
                transition
                ${
                  selectedDepartment === "all"
                    ? "bg-[#2F2F6F] text-white border-[#2F2F6F]"
                    : "bg-white text-gray-600 border-gray-200 hover:border-[#2F2F6F] hover:text-[#2F2F6F]"
                }
              `}
            >
              All Departments
            </button>

            {/* DEPARTMENTS */}

            {loadingDepartments ? (
              <div className="flex items-center gap-2 px-4 text-sm text-gray-500">

                <Loader2
                  size={16}
                  className="animate-spin"
                />

                Loading departments...

              </div>
            ) : (
              departments.map((department) => (

                <button
                  key={department._id}
                  type="button"
                  onClick={() =>
                    handleDepartmentChange(
                      department._id
                    )
                  }
                  className={`
                    shrink-0
                    px-5 py-2.5
                    rounded-full
                    text-sm font-semibold
                    border
                    transition
                    ${
                      selectedDepartment ===
                      department._id
                        ? "bg-[#2F2F6F] text-white border-[#2F2F6F]"
                        : "bg-white text-gray-600 border-gray-200 hover:border-[#2F2F6F] hover:text-[#2F2F6F]"
                    }
                  `}
                >

                  {department.name}

                  {department.code && (
                    <span className="ml-1 opacity-70">
                      ({department.code})
                    </span>
                  )}

                </button>

              ))
            )}

          </div>

        </div>

        {/* ===================================================
            SECTION HEADING
        ==================================================== */}

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">

              {selectedDepartmentName}

            </h2>

            {!loadingClubs && (

              <p className="text-sm text-gray-500 mt-1">

                {filteredClubs.length}{" "}

                {filteredClubs.length === 1
                  ? "club / association"
                  : "clubs / associations"}{" "}

                available

              </p>

            )}

          </div>

        </div>

        {/* ===================================================
            LOADING
        ==================================================== */}

        {loadingClubs && (

          <div className="flex flex-col items-center justify-center py-20">

            <Loader2
              size={38}
              className="animate-spin text-[#2F2F6F]"
            />

            <p className="text-gray-500 mt-4">

              Loading clubs and associations...

            </p>

          </div>

        )}

        {/* ===================================================
            EMPTY
        ==================================================== */}

        {!loadingClubs &&
          filteredClubs.length === 0 && (

            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">

              <div className="w-16 h-16 mx-auto rounded-full bg-[#2F2F6F]/10 flex items-center justify-center">

                <Users
                  size={28}
                  className="text-[#2F2F6F]"
                />

              </div>

              <h3 className="text-xl font-bold text-gray-800 mt-5">

                No clubs or associations found

              </h3>

              <p className="text-gray-500 mt-2 max-w-md mx-auto">

                {search
                  ? "Try searching with a different club or association name."
                  : "There are currently no published clubs or associations for this department."}

              </p>

            </div>

          )}

        {/* ===================================================
            CLUB GRID
        ==================================================== */}

        {!loadingClubs &&
          filteredClubs.length > 0 && (

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

              {filteredClubs.map((club) => {

                const image =
                  club?.images?.[0]?.url ||
                  "https://placehold.co/800x500?text=Club+Association";

                const departmentName =
                  club?.department?.name ||
                  "Department";

                return (

                  <article
                    key={club._id}
                    className="
                      group
                      bg-white
                      border border-gray-200
                      rounded-2xl
                      overflow-hidden
                      shadow-sm
                      hover:shadow-xl
                      hover:-translate-y-1
                      transition-all
                      duration-300
                    "
                  >

                    {/* IMAGE */}

                    <div className="relative h-56 overflow-hidden bg-gray-100">

                      <img
                        src={image}
                        alt={club.title}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://placehold.co/800x500?text=Club+Association";
                        }}
                      />

                      {/* DEPARTMENT BADGE
                          Positioned around the lower/knee area */}

                      <div className="absolute bottom-3 left-4">

                        <span className="px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-xs font-semibold text-[#2F2F6F] shadow-sm">

                          {departmentName}

                        </span>

                      </div>

                      {/* IMAGE COUNT */}

                      {club?.images?.length > 1 && (

                        <div className="absolute bottom-4 right-4">

                          <span className="px-3 py-1.5 rounded-full bg-black/60 text-white text-xs font-medium">

                            {club.images.length} photos

                          </span>

                        </div>

                      )}

                    </div>

                    {/* CONTENT */}

                    <div className="p-6">

                      <h3 className="text-xl font-bold text-[#2F2F6F] line-clamp-1">

                        {club.title}

                      </h3>

                      <p className="text-gray-600 text-sm leading-6 mt-3 line-clamp-3">

                        {club.description}

                      </p>

                      {/* DETAILS */}

                      <div className="mt-6 pt-5 border-t border-gray-100">

                        <Link
                          to={`/clubs-associations/${club._id}`}
                          className="
                            inline-flex
                            items-center
                            gap-2
                            text-sm
                            font-semibold
                            text-[#2F2F6F]
                            hover:text-[#4B4B7C]
                            transition
                          "
                        >

                          View Details

                          <ArrowRight
                            size={17}
                            className="
                              group-hover:translate-x-1
                              transition-transform
                            "
                          />

                        </Link>

                      </div>

                    </div>

                  </article>

                );

              })}

            </div>

          )}

      </section>

      <Footer />

    </div>
  );
};

export default ClubAssociations;