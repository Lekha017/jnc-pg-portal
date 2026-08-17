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

      setEvents([...ongoing, ...upcoming].slice(0, 2));
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
    <div className="w-full min-w-0">

      {/* =========================
          TABS
      ========================= */}

      <div
        className="
          flex
          gap-2
          mb-4
          overflow-x-auto
          pb-1
          scrollbar-hide
        "
      >

        {/* EVENTS */}

        <button
          type="button"
          onClick={() => setActiveTab("events")}
          className={`
            flex-shrink-0
            w-[110px]
            sm:w-[125px]
            lg:w-32
            py-2
            px-2
            rounded-md
            text-xs
            sm:text-sm
            font-medium
            transition
            ${
              activeTab === "events"
                ? "bg-[#37347C] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
        >
          Events
        </button>

        {/* ANNOUNCEMENTS */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("announcements")
          }
          className={`
            flex-shrink-0
            w-[125px]
            sm:w-[140px]
            lg:w-32
            py-2
            px-2
            rounded-md
            text-xs
            sm:text-sm
            font-medium
            transition
            ${
              activeTab === "announcements"
                ? "bg-[#37347C] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
        >
          Announcements
        </button>

        {/* ACHIEVEMENTS */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("achievements")
          }
          className={`
            flex-shrink-0
            w-[120px]
            sm:w-[135px]
            lg:w-32
            py-2
            px-2
            rounded-md
            text-xs
            sm:text-sm
            font-medium
            transition
            ${
              activeTab === "achievements"
                ? "bg-[#37347C] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
        >
          Achievements
        </button>

        {/* CLUBS & ASSOCIATIONS */}

        <button
          type="button"
          onClick={() =>
            setActiveTab("clubs")
          }
          className={`
            flex-shrink-0
            w-[160px]
            sm:w-[175px]
            lg:w-40
            py-2
            px-2
            rounded-md
            text-xs
            sm:text-sm
            font-medium
            transition
            ${
              activeTab === "clubs"
                ? "bg-[#37347C] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }
          `}
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
            <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-5">
              <p className="text-sm sm:text-base text-gray-500">
                Loading...
              </p>
            </div>
          ) : (
            <>
              {events.length > 0 ? (
                <div className="space-y-2">

                  {events.map((event) => (
                    <div
                      key={event._id}
                      className="
                        bg-white
                        rounded-xl
                        px-3
                        py-3
                        sm:px-4
                        sm:py-3
                        shadow-sm
                        border
                        border-gray-100
                        w-full
                        min-w-0
                      "
                    >
                      <h3
                        className="
                          text-base
                          sm:text-lg
                          font-semibold
                          text-[#37347C]
                          line-clamp-1
                        "
                      >
                        {event.title}
                      </h3>

                      <p
                        className="
                          text-[11px]
                          sm:text-xs
                          text-gray-500
                          mt-1
                        "
                      >
                        {formatDate(event.startDate)}
                      </p>

                      <p
                        className="
                          text-xs
                          sm:text-sm
                          text-gray-600
                          mt-1
                          line-clamp-2
                        "
                      >
                        {event.description}
                      </p>
                    </div>
                  ))}

                </div>
              ) : (
                <div
                  className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-100
                    p-4
                    sm:p-5
                    text-xs
                    sm:text-sm
                    text-gray-500
                  "
                >
                  No events available.
                </div>
              )}

              <Link
                to="/events"
                className="
                  inline-flex
                  items-center
                  mt-3
                  bg-[#37347C]
                  text-white
                  px-5
                  sm:px-6
                  py-2
                  rounded-full
                  text-xs
                  sm:text-sm
                  hover:bg-[#2d2968]
                  transition
                "
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
            <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-5">
              <p className="text-sm sm:text-base text-gray-500">
                Loading...
              </p>
            </div>
          ) : (
            <>
              {announcements.length > 0 ? (
                <div className="space-y-2">

                  {announcements.map((announcement) => (
                    <div
                      key={announcement._id}
                      className="
                        bg-white
                        rounded-xl
                        px-3
                        py-3
                        sm:px-4
                        sm:py-3
                        shadow-sm
                        border
                        border-gray-100
                        w-full
                        min-w-0
                      "
                    >
                      <h3
                        className="
                          text-base
                          sm:text-lg
                          font-semibold
                          text-[#37347C]
                          line-clamp-1
                        "
                      >
                        {announcement.title}
                      </h3>

                      <p
                        className="
                          text-[11px]
                          sm:text-xs
                          text-gray-500
                          mt-1
                        "
                      >
                        {formatDate(
                          announcement.publishDate
                        )}
                      </p>

                      <p
                        className="
                          text-xs
                          sm:text-sm
                          text-gray-600
                          mt-1
                          line-clamp-2
                        "
                      >
                        {announcement.description}
                      </p>
                    </div>
                  ))}

                </div>
              ) : (
                <div
                  className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-100
                    p-4
                    sm:p-5
                    text-xs
                    sm:text-sm
                    text-gray-500
                  "
                >
                  No announcements available.
                </div>
              )}

              <Link
                to="/announcements"
                className="
                  inline-flex
                  items-center
                  mt-3
                  bg-[#37347C]
                  text-white
                  px-5
                  sm:px-6
                  py-2
                  rounded-full
                  text-xs
                  sm:text-sm
                  hover:bg-[#2d2968]
                  transition
                "
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
            <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-5">
              <p className="text-sm sm:text-base text-gray-500">
                Loading...
              </p>
            </div>
          ) : (
            <>
              {achievements.length > 0 ? (
                <div className="space-y-2">

                  {achievements.map((achievement) => (
                    <div
                      key={achievement._id}
                      className="
                        bg-white
                        rounded-xl
                        px-3
                        py-3
                        sm:px-4
                        sm:py-3
                        shadow-sm
                        border
                        border-gray-100
                        w-full
                        min-w-0
                      "
                    >
                      <h3
                        className="
                          text-base
                          sm:text-lg
                          font-semibold
                          text-[#37347C]
                          line-clamp-1
                        "
                      >
                        {achievement.title}
                      </h3>

                      <p
                        className="
                          text-[11px]
                          sm:text-xs
                          text-gray-500
                          mt-1
                        "
                      >
                        {formatDate(
                          achievement.date
                        )}
                      </p>

                      <p
                        className="
                          text-xs
                          sm:text-sm
                          text-gray-600
                          mt-1
                          line-clamp-2
                        "
                      >
                        {achievement.description}
                      </p>
                    </div>
                  ))}

                </div>
              ) : (
                <div
                  className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-100
                    p-4
                    sm:p-5
                    text-xs
                    sm:text-sm
                    text-gray-500
                  "
                >
                  No achievements available.
                </div>
              )}

              <Link
                to="/achievements"
                className="
                  inline-flex
                  items-center
                  mt-3
                  bg-[#37347C]
                  text-white
                  px-5
                  sm:px-6
                  py-2
                  rounded-full
                  text-xs
                  sm:text-sm
                  hover:bg-[#2d2968]
                  transition
                "
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
            <div className="bg-white rounded-xl border shadow-sm p-4 sm:p-5">
              <p className="text-sm sm:text-base text-gray-500">
                Loading...
              </p>
            </div>
          ) : (
            <>
              {clubAssociations.length > 0 ? (
                <div className="space-y-2">

                  {clubAssociations.map(
                    (clubAssociation) => (
                      <div
                        key={clubAssociation._id}
                        className="
                          bg-white
                          rounded-xl
                          px-3
                          py-3
                          sm:px-4
                          sm:py-3
                          shadow-sm
                          border
                          border-gray-100
                          w-full
                          min-w-0
                        "
                      >
                        <h3
                          className="
                            text-base
                            sm:text-lg
                            font-semibold
                            text-[#37347C]
                            line-clamp-1
                          "
                        >
                          {clubAssociation.title}
                        </h3>

                        <p
                          className="
                            text-[11px]
                            sm:text-xs
                            text-gray-500
                            mt-1
                          "
                        >
                          {clubAssociation?.department?.name ||
                            "Department"}
                        </p>

                        <p
                          className="
                            text-xs
                            sm:text-sm
                            text-gray-600
                            mt-1
                            line-clamp-2
                          "
                        >
                          {clubAssociation.description}
                        </p>
                      </div>
                    )
                  )}

                </div>
              ) : (
                <div
                  className="
                    bg-white
                    rounded-xl
                    border
                    border-gray-100
                    p-4
                    sm:p-5
                    text-xs
                    sm:text-sm
                    text-gray-500
                  "
                >
                  No clubs or associations available.
                </div>
              )}

              <Link
                to="/clubs-associations"
                className="
                  inline-flex
                  items-center
                  mt-3
                  bg-[#37347C]
                  text-white
                  px-5
                  sm:px-6
                  py-2
                  rounded-full
                  text-xs
                  sm:text-sm
                  hover:bg-[#2d2968]
                  transition
                "
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