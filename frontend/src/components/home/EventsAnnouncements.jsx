import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  getUpcomingEvents,
  getOngoingEvents,
} from "../../services/eventService";

import { getAnnouncements } from "../../services/announcementService";

import { getAchievements } from "../../services/achievementService";

import { getClubAssociations } from "../../services/clubAssociationService";

function EventsAnnouncements() {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [clubAssociations, setClubAssociations] = useState([]);

  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
    fetchAchievements();
    fetchClubAssociations();
  }, []);

  /* =========================
     FETCH EVENTS
  ========================= */

  const fetchEvents = async () => {
    try {
      const [upcomingRes, ongoingRes] = await Promise.all([
        getUpcomingEvents(),
        getOngoingEvents(),
      ]);

      const upcoming = upcomingRes?.success
        ? upcomingRes.data
        : [];

      const ongoing = ongoingRes?.success
        ? ongoingRes.data
        : [];

      setEvents(
        [...ongoing, ...upcoming].slice(0, 2)
      );
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     FETCH ANNOUNCEMENTS
  ========================= */

  const fetchAnnouncements = async () => {
    try {
      const response = await getAnnouncements();

      if (response?.success) {
        setAnnouncements(
          response.data?.slice(0, 2) || []
        );
      }
    } catch (error) {
      console.error(
        "Error fetching announcements:",
        error
      );

      setAnnouncements([]);
    }
  };

  /* =========================
     FETCH ACHIEVEMENTS
  ========================= */

  const fetchAchievements = async () => {
    try {
      const response = await getAchievements();

      if (response?.success) {
        setAchievements(
          response.data?.slice(0, 2) || []
        );
      }
    } catch (error) {
      console.error(
        "Error fetching achievements:",
        error
      );

      setAchievements([]);
    }
  };

  /* =========================
     FETCH CLUBS & ASSOCIATIONS
  ========================= */

  const fetchClubAssociations = async () => {
    try {
      const response = await getClubAssociations();

      if (response?.success) {
        setClubAssociations(
          response.data?.slice(0, 2) || []
        );
      }
    } catch (error) {
      console.error(
        "Error fetching clubs and associations:",
        error
      );

      setClubAssociations([]);
    }
  };

  /* =========================
     DATE FORMAT
  ========================= */

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div>

      {/* =========================
          TABS
      ========================= */}

      <div className="flex flex-wrap gap-2 mb-3">

        {/* EVENTS */}

        <button
          type="button"
          onClick={() => setActiveTab("events")}
          className={`w-32 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "events"
              ? "bg-[#37347C] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Events
        </button>

        {/* ANNOUNCEMENTS */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("announcements")
          }
          className={`w-32 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "announcements"
              ? "bg-[#37347C] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Announcements
        </button>

        {/* ACHIEVEMENTS */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("achievements")
          }
          className={`w-32 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "achievements"
              ? "bg-[#37347C] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Achievements
        </button>

        {/* CLUBS & ASSOCIATIONS */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("clubs")
          }
          className={`w-40 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "clubs"
              ? "bg-[#37347C] text-white"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
        >
          Clubs & Associations
        </button>

      </div>

      {/* =========================
          EVENTS
      ========================= */}

      {activeTab === "events" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl border shadow-sm p-4">
              Loading...
            </div>
          ) : (
            <>
              {events.length > 0 ? (
                events.map((event) => (
                  <div
                    key={event._id}
                    className="bg-white rounded-xl px-4 py-3 mb-2 shadow-sm border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-[#37347C] line-clamp-1">
                      {event.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(event.startDate)}
                    </p>

                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {event.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-gray-500">
                  No events available.
                </div>
              )}

              <Link
                to="/events"
                className="inline-flex items-center mt-2 bg-[#37347C] text-white px-6 py-2 rounded-full text-sm hover:bg-[#2d2968] transition"
              >
                View More →
              </Link>
            </>
          )}
        </>
      )}

      {/* =========================
          ANNOUNCEMENTS
      ========================= */}

      {activeTab === "announcements" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl border shadow-sm p-4">
              Loading...
            </div>
          ) : (
            <>
              {announcements.length > 0 ? (
                announcements.map((announcement) => (
                  <div
                    key={announcement._id}
                    className="bg-white rounded-xl px-4 py-3 mb-2 shadow-sm border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-[#37347C] line-clamp-1">
                      {announcement.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(
                        announcement.publishDate
                      )}
                    </p>

                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {announcement.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-gray-500">
                  No announcements available.
                </div>
              )}

              <Link
                to="/announcements"
                className="inline-flex items-center mt-2 bg-[#37347C] text-white px-6 py-2 rounded-full text-sm hover:bg-[#2d2968] transition"
              >
                View More →
              </Link>
            </>
          )}
        </>
      )}

      {/* =========================
          ACHIEVEMENTS
      ========================= */}

      {activeTab === "achievements" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl border shadow-sm p-4">
              Loading...
            </div>
          ) : (
            <>
              {achievements.length > 0 ? (
                achievements.map((achievement) => (
                  <div
                    key={achievement._id}
                    className="bg-white rounded-xl px-4 py-3 mb-2 shadow-sm border border-gray-100"
                  >
                    <h3 className="text-lg font-semibold text-[#37347C] line-clamp-1">
                      {achievement.title}
                    </h3>

                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(
                        achievement.date
                      )}
                    </p>

                    <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                      {achievement.description}
                    </p>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-gray-500">
                  No achievements available.
                </div>
              )}

              <Link
                to="/achievements"
                className="inline-flex items-center mt-2 bg-[#37347C] text-white px-6 py-2 rounded-full text-sm hover:bg-[#2d2968] transition"
              >
                View More →
              </Link>
            </>
          )}
        </>
      )}

      {/* =========================
          CLUBS & ASSOCIATIONS
      ========================= */}

      {activeTab === "clubs" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl border shadow-sm p-4">
              Loading...
            </div>
          ) : (
            <>
              {clubAssociations.length > 0 ? (
                clubAssociations.map(
                  (clubAssociation) => (
                    <div
                      key={clubAssociation._id}
                      className="bg-white rounded-xl px-4 py-3 mb-2 shadow-sm border border-gray-100"
                    >
                      <h3 className="text-lg font-semibold text-[#37347C] line-clamp-1">
                        {clubAssociation.title}
                      </h3>

                      <p className="text-xs text-gray-500 mt-1">
                        {clubAssociation?.department?.name ||
                          "Department"}
                      </p>

                      <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                        {clubAssociation.description}
                      </p>
                    </div>
                  )
                )
              ) : (
                <div className="bg-white rounded-xl border border-gray-100 p-4 text-sm text-gray-500">
                  No clubs or associations available.
                </div>
              )}

              <Link
                to="/clubs-associations"
                className="inline-flex items-center mt-2 bg-[#37347C] text-white px-6 py-2 rounded-full text-sm hover:bg-[#2d2968] transition"
              >
                View More →
              </Link>
            </>
          )}
        </>
      )}

    </div>
  );
}

export default EventsAnnouncements;