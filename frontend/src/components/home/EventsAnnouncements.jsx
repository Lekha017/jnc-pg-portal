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
      }
    } catch (error) {
      console.error(error);
      setAnnouncements([]);
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  return (
    <div className="w-full">

      {/* Tabs */}
      <div className="flex gap-2 mb-3">

        <button
          onClick={() => setActiveTab("events")}
          className={`w-32 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "events"
              ? "bg-[#37347C] text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Events
        </button>

        <button
          onClick={() => setActiveTab("announcements")}
          className={`w-32 py-2 rounded-md text-sm font-medium transition ${
            activeTab === "announcements"
              ? "bg-[#37347C] text-white"
              : "bg-gray-200 text-gray-800"
          }`}
        >
          Announcements
        </button>

      </div>

      {/* EVENTS */}
      {activeTab === "events" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl border shadow-sm p-4">
              Loading...
            </div>
          ) : (
            <>
              {events.map((event) => (
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
              ))}

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

      {/* ANNOUNCEMENTS */}
      {activeTab === "announcements" && (
        <>
          {loading ? (
            <div className="bg-white rounded-xl border shadow-sm p-4">
              Loading...
            </div>
          ) : (
            <>
              {announcements.map((announcement) => (
                <div
                  key={announcement._id}
                  className="bg-white rounded-xl px-4 py-3 mb-2 shadow-sm border border-gray-100"
                >
                  <h3 className="text-lg font-semibold text-[#37347C] line-clamp-1">
                    {announcement.title}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    {formatDate(announcement.publishDate)}
                  </p>

                  <p className="text-sm text-gray-600 mt-1 line-clamp-1">
                    {announcement.description}
                  </p>
                </div>
              ))}

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

    </div>
  );
}

export default EventsAnnouncements;