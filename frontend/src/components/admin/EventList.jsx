import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { toast } from "react-toastify";

import EventCard from "./EventCard";

import {
  getAllEvents,
  deleteEvent,
} from "../../services/eventService";

const EventList = ({ onEdit, refresh }) => {
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, [refresh]);

  const fetchEvents = async () => {
    try {
      setLoading(true);

      const res = await getAllEvents();

      setEvents(res.data || []);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEvent(id);

      toast.success("Event Deleted Successfully");

      fetchEvents();
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to delete event"
      );
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-2xl shadow-md border border-gray-200">

      {/* Header */}
      <div className="flex items-center justify-between px-7 py-5 border-b">
        <h2 className="text-3xl font-bold text-[#2D2A70]">
          Existing Events
        </h2>

        <div className="relative w-80">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border rounded-xl pl-11 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#2D2A70]"
          />
        </div>
      </div>

      {/* Event List */}
      <div className="max-h-[760px] overflow-y-auto">
        {loading ? (
          <div className="py-12 text-center text-gray-500">
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            No events found.
          </div>
        ) : (
          filteredEvents.map((event) => (
            <EventCard
              key={event._id}
              event={event}
              onEdit={onEdit}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

    </div>
  );
};

export default EventList;