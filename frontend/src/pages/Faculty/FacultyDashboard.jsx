import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import { getMyFacultyProfile } from "../../services/facultyService";

import {
  getUpcomingEvents,
  getOngoingEvents,
} from "../../services/eventService";

import Loader from "../../components/common/Loader";
import Toast from "../../components/common/Toast";

export default function FacultyDashboard() {
  const [faculty, setFaculty] = useState(null);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [ongoingEvents, setOngoingEvents] = useState([]);

  const [loading, setLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      const profileResponse = await getMyFacultyProfile();

      const facultyData =
        profileResponse.data || profileResponse;

      setFaculty(facultyData);

      const departments = facultyData?.departments || [];

      if (departments.length === 0) {
        setUpcomingEvents([]);
        setOngoingEvents([]);
        return;
      }

      const upcomingResults = await Promise.all(
        departments.map((department) =>
          getUpcomingEvents(department._id)
        )
      );

      const ongoingResults = await Promise.all(
        departments.map((department) =>
          getOngoingEvents(department._id)
        )
      );

      const upcoming = upcomingResults.flatMap(
        (result) => result.data || []
      );

      const ongoing = ongoingResults.flatMap(
        (result) => result.data || []
      );

      const uniqueUpcoming = Array.from(
        new Map(
          upcoming.map((event) => [event._id, event])
        ).values()
      );

      const uniqueOngoing = Array.from(
        new Map(
          ongoing.map((event) => [event._id, event])
        ).values()
      );

      setUpcomingEvents(uniqueUpcoming);
      setOngoingEvents(uniqueOngoing);
    } catch (error) {
      console.error(
        "Faculty Dashboard Error:",
        error
      );

      setToast({
        show: true,
        message:
          error.response?.data?.message ||
          "Failed to load faculty dashboard.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader text="Loading faculty dashboard..." />;
  }

  const departments = faculty?.departments || [];

  return (
    <>
      <Header />

      <Navbar />

      <main className="min-h-screen bg-[#f5f7ff] py-1 px-6">
        <div className="max-w-7xl mx-auto">

         {/* Hero */}
<section className="bg-[#2F2F6F] py-10 -mx-10 mb-8">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h1 className="text-5xl font-bold text-white">
      Faculty Dashboard
    </h1>

    <p className="text-white/90 text-lg mt-3">
      Welcome,{" "}
      {faculty?.user?.fullName ||
        faculty?.fullName}
    </p>
  </div>
</section>

          {/* Department Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
            <h2 className="text-xl font-semibold text-[#3d3a82] mb-3">
              Your Department
            </h2>

            {departments.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {departments.map((department) => (
                  <span
                    key={department._id}
                    className="px-4 py-2 rounded-full bg-[#3d3a82]/10 text-[#3d3a82] font-medium text-sm"
                  >
                    {department.name}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">
                No department has been assigned to your
                profile.
              </p>
            )}
          </div>

          {/* Main Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">

            {/* Edit Profile */}
            <Link
              to="/faculty/edit-profile"
              className="bg-[#3d3a82] hover:bg-[#34316f] transition rounded-2xl p-7 text-center shadow-sm"
            >
              <h2 className="text-white text-xl font-semibold">
                Edit Profile
              </h2>

              <p className="text-gray-200 text-sm mt-2">
                Update your faculty profile information.
              </p>
            </Link>

            {/* Manage Events */}
            <Link
              to="/faculty/events"
              className="bg-[#3d3a82] hover:bg-[#34316f] transition rounded-2xl p-7 text-center shadow-sm"
            >
              <h2 className="text-white text-xl font-semibold">
                Manage Department Events
              </h2>

              <p className="text-gray-200 text-sm mt-2">
                Create, edit and manage events for your
                department.
              </p>
            </Link>

          </div>

          {/* Upcoming Events */}
          <section className="mb-10">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-bold text-[#2D2A70]">
                  Upcoming Events
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Upcoming events from your department
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {upcomingEvents.length} event
                {upcomingEvents.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>

            {upcomingEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500">
                  No upcoming events for your department.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                  />
                ))}
              </div>
            )}
          </section>

          {/* Ongoing Events */}
          <section>
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-2xl font-bold text-[#2D2A70]">
                  Ongoing Events
                </h2>

                <p className="text-sm text-gray-500 mt-1">
                  Events currently happening in your
                  department
                </p>
              </div>

              <span className="text-sm text-gray-500">
                {ongoingEvents.length} event
                {ongoingEvents.length !== 1
                  ? "s"
                  : ""}
              </span>
            </div>

            {ongoingEvents.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-200 p-8 text-center">
                <p className="text-gray-500">
                  No ongoing events for your department.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ongoingEvents.map((event) => (
                  <EventCard
                    key={event._id}
                    event={event}
                  />
                ))}
              </div>
            )}
          </section>

        </div>
      </main>

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
}


/* =====================================================
   EVENT CARD
===================================================== */

const EventCard = ({ event }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">

      {/* Poster */}
      {event.poster?.url && (
        <div className="relative bg-gray-100">
          <img
            src={event.poster.url}
            alt={event.title}
            className="w-full h-[260px] object-contain"
          />

          {/* Status */}
          <span
            className={`absolute top-4 right-4 text-xs font-semibold px-4 py-2 rounded-full shadow-sm ${
              new Date(event.startDate) >
              new Date()
                ? "bg-white text-[#3d3a82]"
                : "bg-green-100 text-green-700"
            }`}
          >
            {new Date(event.startDate) >
            new Date()
              ? "Upcoming"
              : "Ongoing"}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">

        {/* Title */}
        <h3 className="text-lg font-semibold text-[#2D2A70] leading-snug">
          {event.title}
        </h3>

        {/* Department */}
        <p className="text-sm text-[#4B4B7C] font-medium mt-3">
          {event.department?.name}
        </p>

        {/* Date */}
        <div className="flex items-center gap-3 mt-4">
          <div className="w-9 h-9 rounded-xl bg-[#4B4B7C]/10 flex items-center justify-center">
            <span className="text-[#4B4B7C] text-sm">
              📅
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Date
            </p>

            <p className="text-sm font-medium text-gray-700">
              {new Date(
                event.startDate
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}{" "}
              –{" "}
              {new Date(
                event.endDate
              ).toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </p>
          </div>
        </div>

        {/* Venue */}
        <div className="flex items-center gap-3 mt-3">
          <div className="w-9 h-9 rounded-xl bg-[#4B4B7C]/10 flex items-center justify-center">
            <span className="text-[#4B4B7C] text-sm">
              📍
            </span>
          </div>

          <div>
            <p className="text-xs text-gray-400">
              Venue
            </p>

            <p className="text-sm font-medium text-gray-700">
              {event.venue}
            </p>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-500 leading-relaxed mt-4 line-clamp-2">
          {event.description}
        </p>

      </div>
    </div>
  );
};