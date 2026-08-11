import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Navbar from "../../components/layout/Navbar";
import Header from "../../components/layout/Header";
import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";
import FacultyCard from "../../components/faculty/FacultyCard";
import Footer from "../../components/layout/Footer";

import { getDepartmentBySlug } from "../../services/departmentService";
import { getEventsByDepartment } from "../../services/eventService";
import { getPlacementsByDepartment } from "../../services/placementService";
import { getAchievementsByDepartment } from "../../services/achievementService";
import { getPrograms } from "../../services/programService";

import DepartmentActivities from "../../components/department/DepartmentActivities";

const DepartmentDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const [department, setDepartment] = useState(null);

  // =========================
  // DATA STATES
  // =========================

  const [events, setEvents] = useState([]);
  const [placements, setPlacements] = useState([]);
  const [achievements, setAchievements] = useState([]);

  // =========================
  // CAROUSEL STATES
  // =========================

  const [eventIndex, setEventIndex] = useState(0);
  const [placementIndex, setPlacementIndex] = useState(0);

  // =========================
  // LOADING STATES
  // =========================

  const [loading, setLoading] = useState(true);
  const [programs, setPrograms] = useState([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [placementsLoading, setPlacementsLoading] = useState(false);
  const [achievementsLoading, setAchievementsLoading] = useState(false);

  // =========================
  // TOAST
  // =========================

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  // =====================================================
  // FETCH DEPARTMENT
  // =====================================================

   useEffect(() => {
  const fetchDepartment = async () => {
    try {
      setLoading(true);

      const response = await getDepartmentBySlug(slug);

      setDepartment(response);
    } catch (error) {
      console.error("Failed to load department:", error);

      setToast({
        show: true,
        message: "Failed to load department.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };
const fetchPrograms = async () => {
  try {
    const response = await getPrograms();

    const data = response?.data || response || [];

    console.log("DEPARTMENT PROGRAMMES:", department?.programmes);
    console.log("ALL PROGRAMS:", data);

    setPrograms(data);
  } catch (error) {
    console.error("Failed to load programs:", error);
    setPrograms([]);
  }
};

  fetchDepartment();
  fetchPrograms();
}, [slug]);


  // =====================================================
  // FETCH EVENTS + PLACEMENTS + ACHIEVEMENTS
  // =====================================================

  useEffect(() => {
    const departmentId = department?._id;

    if (!departmentId) return;

    const fetchDepartmentData = async () => {
      try {
        setEventsLoading(true);
        setPlacementsLoading(true);
        setAchievementsLoading(true);

        // Fetch all three together
        const [
          eventsResponse,
          placementsResponse,
          achievementsResponse,
        ] = await Promise.all([
          getEventsByDepartment(departmentId),
          getPlacementsByDepartment(departmentId),
          getAchievementsByDepartment(departmentId),
        ]);

        // =========================
        // EVENTS
        // =========================

        setEvents(eventsResponse?.data || []);
        setEventIndex(0);

        // =========================
        // PLACEMENTS
        // =========================

        setPlacements(placementsResponse?.data || []);
        setPlacementIndex(0);

        // =========================
        // ACHIEVEMENTS
        // =========================

        setAchievements(achievementsResponse?.data || []);
      } catch (error) {
        console.error(
          "Failed to fetch department data:",
          error
        );

        setEvents([]);
        setPlacements([]);
        setAchievements([]);

        setToast({
          show: true,
          message:
            "Failed to load department activities.",
          type: "error",
        });
      } finally {
        setEventsLoading(false);
        setPlacementsLoading(false);
        setAchievementsLoading(false);
      }
    };

    fetchDepartmentData();
  }, [department?._id]);

  // =====================================================
  // EVENT AUTO SLIDER
  // =====================================================

  useEffect(() => {
    if (events.length <= 2) return;

    const interval = setInterval(() => {
      setEventIndex((prev) => {
        const maxIndex = events.length - 2;

        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [events.length]);

  // =====================================================
  // PLACEMENT AUTO SLIDER
  // =====================================================

  useEffect(() => {
    if (placements.length <= 2) return;

    const interval = setInterval(() => {
      setPlacementIndex((prev) => {
        const maxIndex = placements.length - 2;

        return prev >= maxIndex ? 0 : prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [placements.length]);

  // =====================================================
  // EVENT MANUAL CONTROLS
  // =====================================================

  const nextEvent = () => {
    if (events.length <= 2) return;

    setEventIndex((prev) => {
      const maxIndex = events.length - 2;

      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const previousEvent = () => {
    if (events.length <= 2) return;

    setEventIndex((prev) => {
      const maxIndex = events.length - 2;

      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // =====================================================
  // PLACEMENT MANUAL CONTROLS
  // =====================================================

  const nextPlacement = () => {
    if (placements.length <= 2) return;

    setPlacementIndex((prev) => {
      const maxIndex = placements.length - 2;

      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const previousPlacement = () => {
    if (placements.length <= 2) return;

    setPlacementIndex((prev) => {
      const maxIndex = placements.length - 2;

      return prev <= 0 ? maxIndex : prev - 1;
    });
  };

  // =====================================================
  // LOADING
  // =====================================================

  if (loading) {
    return <Loader text="Loading department..." />;
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <>
     <Header/>
      <Navbar />

      <section className="bg-[#f8f9fc] min-h-screen">

        {/* =====================================================
            DEPARTMENT HEADER
        ===================================================== */}

        <div className="bg-[#2F2F6F] text-white">
          <div className="max-w-7xl mx-auto px-5 py-10 text-center">

            <h1 className="text-4xl md:text-5xl font-bold">
              {department?.name}
            </h1>

            <p className="mt-4 text-lg text-gray-200 max-w-3xl mx-auto">
              Welcome to the Department of{" "}
              {department?.name}
            </p>

          </div>
        </div>

        {/* =====================================================
            MAIN CONTENT
        ===================================================== */}

        <div className="max-w-7xl mx-auto px-6 py-14">

          {/* =====================================================
              ABOUT DEPARTMENT
          ===================================================== */}

          {department?.about?.trim() && (
            <section className="pb-10 border-b border-gray-200">

              <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                About the Department
              </h2>

              <p className="text-gray-700 leading-8">
                {department.about}
              </p>

            </section>
          )}

          {/* =====================================================
              VISION + MISSION
          ===================================================== */}

          {(department?.vision?.trim() ||
            department?.mission?.trim()) && (

            <section className="py-10 border-b border-gray-200">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* VISION */}

                {department?.vision?.trim() && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

                    <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                      Vision
                    </h2>

                    <p className="text-gray-700 leading-8">
                      {department.vision}
                    </p>

                  </div>
                )}

                {/* MISSION */}

                {department?.mission?.trim() && (
                  <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">

                    <h2 className="text-3xl font-bold text-[#2F2F6F] mb-5">
                      Mission
                    </h2>

                    <p className="text-gray-700 leading-8">
                      {department.mission}
                    </p>

                  </div>
                )}

              </div>

            </section>
          )}

          {/* =====================================================
              EVENTS + PLACEMENTS
          ===================================================== */}

          <section className="py-12 border-b border-gray-200">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

              {/* =================================================
                  EVENTS
              ================================================= */}

              <div>

                <div className="mb-6">

                  <h2 className="text-3xl font-bold text-[#2F2F6F]">
                    Events
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Latest events and activities from the{" "}
                    {department?.name} department
                  </p>

                </div>

                {/* LOADING */}

                {eventsLoading && (
                  <div className="bg-white rounded-2xl border border-gray-200 h-[390px] flex items-center justify-center">

                    <p className="text-gray-500">
                      Loading events...
                    </p>

                  </div>
                )}

                {/* EMPTY */}

                {!eventsLoading &&
                  events.length === 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 h-[390px] flex items-center justify-center">

                      <p className="text-gray-500">
                        No events available for this department.
                      </p>

                    </div>
                  )}

                {/* EVENTS */}

                {!eventsLoading &&
                  events.length > 0 && (

                    <div className="relative overflow-hidden">

                      <div className="overflow-hidden">

                        <div
                          className="flex transition-transform duration-700 ease-in-out"
                          style={{
                            transform: `translateX(-${eventIndex * 50}%)`,
                          }}
                        >

                          {events.map((event) => (

                            <div
                              key={event._id}
                              className="w-1/2 flex-shrink-0 px-2"
                            >

                              <div
                                onClick={() =>
                                  navigate(
                                    `/events?event=${event._id}`
                                  )
                                }
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-[390px]"
                              >

                                {/* IMAGE */}

                                <div className="h-[180px] overflow-hidden bg-gray-100">

                                  <img
                                    src={
                                      event?.poster?.url ||
                                      "https://placehold.co/800x500?text=Event"
                                    }
                                    alt={
                                      event?.title ||
                                      "Event"
                                    }
                                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                                  />

                                </div>

                                {/* CONTENT */}

                                <div className="p-5">

                                  <h3 className="text-lg font-bold text-[#2F2F6F] line-clamp-1">
                                    {event?.title}
                                  </h3>

                                  <p className="mt-2 text-sm text-gray-600 line-clamp-2 leading-5">
                                    {event?.description}
                                  </p>

                                  {/* DATE */}

                                  <div className="mt-4">

                                    <p className="text-[11px] font-semibold text-[#2F2F6F] uppercase">
                                      Date
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1">

                                      {event?.startDate
                                        ? new Date(
                                            event.startDate
                                          ).toLocaleDateString(
                                            "en-IN",
                                            {
                                              day: "2-digit",
                                              month: "short",
                                              year: "numeric",
                                            }
                                          )
                                        : "—"}

                                    </p>

                                  </div>

                                  {/* VENUE */}

                                  <div className="mt-3">

                                    <p className="text-[11px] font-semibold text-[#2F2F6F] uppercase">
                                      Venue
                                    </p>

                                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                      {event?.venue || "—"}
                                    </p>

                                  </div>

                                </div>

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                      {/* PREVIOUS */}

                      {events.length > 2 && (
                        <button
                          onClick={previousEvent}
                          className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md text-[#2F2F6F] hover:bg-[#2F2F6F] hover:text-white transition z-10"
                          aria-label="Previous event"
                        >
                          ←
                        </button>
                      )}

                      {/* NEXT */}

                      {events.length > 2 && (
                        <button
                          onClick={nextEvent}
                          className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md text-[#2F2F6F] hover:bg-[#2F2F6F] hover:text-white transition z-10"
                          aria-label="Next event"
                        >
                          →
                        </button>
                      )}

                    </div>
                  )}

              </div>

              {/* =================================================
                  PLACEMENTS
              ================================================= */}

              <div>

                <div className="mb-6">

                  <h2 className="text-3xl font-bold text-[#2F2F6F]">
                    Placements
                  </h2>

                  <p className="text-gray-500 mt-2">
                    Placement opportunities and achievements
                    of our students
                  </p>

                </div>

                {/* LOADING */}

                {placementsLoading && (
                  <div className="bg-white rounded-2xl border border-gray-200 h-[390px] flex items-center justify-center">

                    <p className="text-gray-500">
                      Loading placements...
                    </p>

                  </div>
                )}

                {/* EMPTY */}

                {!placementsLoading &&
                  placements.length === 0 && (
                    <div className="bg-white rounded-2xl border border-gray-200 h-[390px] flex items-center justify-center">

                      <p className="text-gray-500">
                        No placements available for this department.
                      </p>

                    </div>
                  )}

                {/* PLACEMENTS */}

                {!placementsLoading &&
                  placements.length > 0 && (

                    <div className="relative overflow-hidden">

                      <div className="overflow-hidden">

                        <div
                          className="flex transition-transform duration-700 ease-in-out"
                          style={{
                            transform: `translateX(-${placementIndex * 50}%)`,
                          }}
                        >

                          {placements.map((placement) => (

                            <div
                              key={placement._id}
                              className="w-1/2 flex-shrink-0 px-2"
                            >

                              <div
                                onClick={() =>
                                  navigate(
                                    `/placements?placement=${placement._id}`
                                  )
                                }
                                className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer h-[390px]"
                              >

                                {/* STUDENT PHOTO */}

                                <div className="h-[180px] bg-gray-50 flex items-center justify-center">

                                  <img
                                    src={
                                      placement?.studentPhoto?.url ||
                                      "https://placehold.co/400x400?text=Student"
                                    }
                                    alt={
                                      placement?.studentName ||
                                      "Student"
                                    }
                                    className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md"
                                  />

                                </div>

                                {/* CONTENT */}

                                <div className="p-5">

                                  <div className="flex items-center justify-between gap-2">

                                    <h3 className="text-lg font-bold text-[#2F2F6F] line-clamp-1">
                                      {placement?.studentName}
                                    </h3>

                                    {placement?.companyLogo?.url && (
                                      <img
                                        src={
                                          placement.companyLogo.url
                                        }
                                        alt={
                                          placement?.company ||
                                          "Company"
                                        }
                                        className="w-10 h-10 object-contain"
                                      />
                                    )}

                                  </div>

                                  <p className="mt-1 text-sm text-gray-600 font-medium line-clamp-1">
                                    {placement?.company}
                                  </p>

                                  <div className="mt-4 grid grid-cols-2 gap-3">

                                    <div>

                                      <p className="text-[11px] font-semibold text-[#2F2F6F] uppercase">
                                        Role
                                      </p>

                                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                                        {placement?.role || "—"}
                                      </p>

                                    </div>

                                    <div>

                                      <p className="text-[11px] font-semibold text-[#2F2F6F] uppercase">
                                        Package
                                      </p>

                                      <p className="text-sm text-gray-600 mt-1">

                                        {placement?.package
                                          ? `${placement.package} LPA`
                                          : "—"}

                                      </p>

                                    </div>

                                  </div>

                                </div>

                              </div>

                            </div>

                          ))}

                        </div>

                      </div>

                      {/* PREVIOUS */}

                      {placements.length > 2 && (
                        <button
                          onClick={previousPlacement}
                          className="absolute left-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md text-[#2F2F6F] hover:bg-[#2F2F6F] hover:text-white transition z-10"
                          aria-label="Previous placement"
                        >
                          ←
                        </button>
                      )}

                      {/* NEXT */}

                      {placements.length > 2 && (
                        <button
                          onClick={nextPlacement}
                          className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-md text-[#2F2F6F] hover:bg-[#2F2F6F] hover:text-white transition z-10"
                          aria-label="Next placement"
                        >
                          →
                        </button>
                      )}

                    </div>
                  )}

              </div>

            </div>

          </section>

          {/* =====================================================
              ACHIEVEMENTS + CLUBS & ASSOCIATIONS
          ===================================================== */}

          <DepartmentActivities
            departmentId={department?._id}
            achievements={achievements}
            achievementsLoading={achievementsLoading}
          />

          {/* =====================================================
              PROGRAMMES OFFERED
          ===================================================== */}

          <section className="py-10 border-b border-gray-200">

            <h2 className="text-3xl font-bold text-[#2F2F6F] mb-8">
              Programmes Offered
            </h2>

            {department?.programmes?.length > 0 ? (

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

{department.programmes.map((programmeName) => {
  const normalizeProgramName = (name) =>
    name
      ?.toLowerCase()
      .replace(/[^a-z0-9]/g, "");

  const normalizedProgrammeName =
    normalizeProgramName(programmeName);

  const program = programs.find((item) => {
    const normalizedDatabaseName =
      normalizeProgramName(item.programName);

    return (
      normalizedDatabaseName === normalizedProgrammeName ||
      normalizedDatabaseName.includes(normalizedProgrammeName) ||
      normalizedProgrammeName.includes(normalizedDatabaseName)
    );
  });

  return (
    <div
      key={programmeName}
      onClick={() => {
        if (program?._id) {
          navigate(`/program-details/${program._id}`);
        }
      }}
      className={`bg-white rounded-lg shadow-sm border border-gray-100 px-6 py-5 transition ${
        program?._id
          ? "cursor-pointer hover:shadow-md hover:border-[#2F2F6F]"
          : ""
      }`}
    >
      <p className="font-medium text-gray-700">
        {programmeName}
      </p>

      {program?.shortCode && (
        <p className="text-sm text-gray-500 mt-1">
          {program.shortCode}
        </p>
      )}
    </div>
  );
})}

              </div>

            ) : (

              <p className="text-gray-500">
                No programmes available.
              </p>

            )}

          </section>

          {/* =====================================================
              HOD MESSAGE
          ===================================================== */}

          {department?.hod && (

            <section className="py-12 border-b border-gray-200">

              <h2 className="text-3xl font-bold text-[#2F2F6F] mb-10">
                HOD's Message
              </h2>

              <div className="grid lg:grid-cols-[240px_1fr] gap-12 items-start">

                {/* HOD CARD */}

                <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-100">

                  <img
                    src={
                      department.hod.image ||
                      "https://via.placeholder.com/240x300?text=HOD"
                    }
                    alt={department.hod.fullName}
                    className="w-full h-[300px] object-cover"
                  />

                  <div className="p-5 text-center">

                    <h3 className="text-xl font-bold text-[#2F2F6F]">
                      {department.hod.fullName}
                    </h3>

                    <p className="mt-1 text-[#E91E63] font-medium">
                      Head of Department
                    </p>

                  </div>

                </div>

                {/* HOD MESSAGE */}

                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">

                  {department.hodMessage?.trim() ? (

                    <p className="text-gray-700 leading-9 whitespace-pre-line text-[17px]">
                      {department.hodMessage}
                    </p>

                  ) : (

                    <p className="text-gray-500 italic">
                      No message available from the
                      Head of Department.
                    </p>

                  )}

                </div>

              </div>

            </section>

          )}

          {/* =====================================================
              FACULTY MEMBERS
          ===================================================== */}

          <section className="py-12">

            <div className="flex items-center justify-between mb-8">

              <h2 className="text-3xl font-bold text-[#2F2F6F]">
                Our Faculty
              </h2>

              <span className="text-gray-500">
                {department?.faculty?.length || 0} Faculty
                Members
              </span>

            </div>

            {department?.faculty?.length > 0 ? (

              <div className="grid gap-8 justify-items-center grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">

                {department.faculty.map((member) => (

                  <FacultyCard
                    key={member._id}
                    faculty={member}
                  />

                ))}

              </div>

            ) : (

              <div className="bg-white rounded-lg border border-gray-200 py-12 text-center text-gray-500">

                No faculty members found.

              </div>

            )}

          </section>

        </div>

      </section>

      <Footer />

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() =>
          setToast((prev) => ({
            ...prev,
            show: false,
          }))
        }
      />
    </>
  );
};

export default DepartmentDetails;