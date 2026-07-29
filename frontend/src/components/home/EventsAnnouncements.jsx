import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getUpcomingEvents,
  getOngoingEvents,
} from "../../services/eventService";
import { getAnnouncements } from "../../services/announcementService";

function EventsAnnouncements() {
  const [events, setEvents] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [activeTab, setActiveTab] = useState("events");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
    fetchAnnouncements();
  }, []);

  const fetchEvents = async () => {
    try {
      const [upcomingRes, ongoingRes] =
        await Promise.all([
          getUpcomingEvents(),
          getOngoingEvents(),
        ]);

      const upcoming =
        upcomingRes?.success
          ? upcomingRes.data
          : [];

      const ongoing =
        ongoingRes?.success
          ? ongoingRes.data
          : [];

      const allEvents = [
        ...ongoing,
        ...upcoming,
      ];

      setEvents(allEvents.slice(0, 2));
    } catch (error) {
      console.error(error);
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchAnnouncements = async () => {
    try {
      const response = await getAnnouncements();

      if (response.success) {
        setAnnouncements(response.data.slice(0, 2));
      } else {
        setAnnouncements([]);
      }
    } catch (error) {
      console.error(error);
      setAnnouncements([]);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="w-full">

      {/* Tabs */}
      <div className="flex gap-2 mb-5">

        <button
          onClick={() => setActiveTab("events")}
          className={`w-40 py-2.5 rounded-md text-sm font-semibold transition ${activeTab === "events"
            ? "bg-[#37347C] text-white"
            : "bg-gray-200 text-gray-800"
            }`}
        >
          Events
        </button>

        <button
          onClick={() => setActiveTab("announcements")}
          className={`w-40 py-2.5 rounded-md text-sm font-semibold transition ${activeTab === "announcements"
            ? "bg-[#37347C] text-white"
            : "bg-gray-200 text-gray-800"
            }`}
        >
          Announcements
        </button>

      </div>

      {/* ================= EVENTS ================= */}

      {activeTab === "events" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl border shadow-sm p-6">
              Loading...
            </div>
          ) : events.length === 0 ? (
            <div className="bg-white rounded-xl border shadow-sm p-6">
              No events available.
            </div>
          ) : (
            <>
              {events.map((event) => (
                <div
                  key={event._id}
                  className="bg-white rounded-xl px-5 py-3 mb-3 shadow-sm hover:bg-gray-50 transition"
                >
                  <h3 className="text-base font-semibold text-[#37347C] line-clamp-1">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(event.startDate)}
                  </p>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {event.description}
                  </p>
                </div>
              ))}

              <Link
                to="/events"
                className="inline-flex items-center mt-2 bg-[#37347C] text-white px-7 py-3 rounded-full text-sm hover:bg-[#2d2968] transition"
              >
                View More →
              </Link>
            </>
          )}
        </>
      )}

      {/* ================= ANNOUNCEMENTS ================= */}

      {activeTab === "announcements" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              Loading...
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-6">
              No announcements available.
            </div>
          ) : (
            <>
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="bg-white rounded-xl px-5 py-3 mb-3 shadow-sm hover:bg-gray-50 transition"
                >

                  <h3 className="text-base font-semibold text-[#37347C] line-clamp-1">
                    {announcement.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    {formatDate(announcement.publishDate)}
                  </p>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {announcement.description}
                  </p>
                </div>
              ))}

              <Link
                to="/announcements"
                className="inline-flex items-center mt-2 bg-[#37347C] text-white px-7 py-3 rounded-full text-sm hover:bg-[#2d2968] transition"
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