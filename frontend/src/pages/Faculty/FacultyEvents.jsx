import { useEffect, useState } from "react";
import { Plus, X, Pencil, Trash2 } from "lucide-react";
import { toast } from "react-toastify";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import {
  getFacultyEvents,
  createFacultyEvent,
  updateFacultyEvent,
  deleteFacultyEvent,
} from "../../services/eventService";

import { getMyFacultyProfile } from "../../services/facultyService";

import Loader from "../../components/common/Loader";

const emptyForm = {
  title: "",
  department: "",
  venue: "",
  startDate: "",
  endDate: "",
  chiefGuest: "",
  registrationLink: "",
  description: "",
  poster: null,
};

const FacultyEvents = () => {
  const [faculty, setFaculty] = useState(null);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [showForm, setShowForm] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  const [formData, setFormData] = useState(emptyForm);
  const [posterPreview, setPosterPreview] = useState("");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);

      const [profileResponse, eventsResponse] =
        await Promise.all([
          getMyFacultyProfile(),
          getFacultyEvents(),
        ]);

      const facultyData =
        profileResponse.data || profileResponse;

      const eventsData =
        eventsResponse.data || [];

      setFaculty(facultyData);
      setEvents(eventsData);
    } catch (error) {
      console.error("Faculty Events Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load department events."
      );
    } finally {
      setLoading(false);
    }
  };

  const departments = faculty?.departments || [];

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePosterChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setFormData((prev) => ({
      ...prev,
      poster: file,
    }));

    setPosterPreview(URL.createObjectURL(file));
  };

  const openCreateForm = () => {
    setSelectedEvent(null);

    setFormData({
      ...emptyForm,
      department:
        departments.length === 1
          ? departments[0]._id
          : "",
    });

    setPosterPreview("");
    setShowForm(true);
  };

  const openEditForm = (event) => {
    setSelectedEvent(event);

    setFormData({
      title: event.title || "",
      department: event.department?._id || "",
      venue: event.venue || "",
      startDate: event.startDate
        ? event.startDate.split("T")[0]
        : "",
      endDate: event.endDate
        ? event.endDate.split("T")[0]
        : "",
      chiefGuest: event.chiefGuest || "",
      registrationLink:
        event.registrationLink || "",
      description: event.description || "",
      poster: null,
    });

    setPosterPreview(event.poster?.url || "");
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedEvent(null);
    setFormData(emptyForm);
    setPosterPreview("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.department ||
      !formData.venue ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.description
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (
      new Date(formData.endDate) <
      new Date(formData.startDate)
    ) {
      toast.error(
        "End date cannot be before start date."
      );
      return;
    }

    try {
      setSaving(true);

      const data = new FormData();

      data.append("title", formData.title);
      data.append(
        "department",
        formData.department
      );
      data.append("venue", formData.venue);
      data.append(
        "startDate",
        formData.startDate
      );
      data.append(
        "endDate",
        formData.endDate
      );
      data.append(
        "chiefGuest",
        formData.chiefGuest
      );
      data.append(
        "registrationLink",
        formData.registrationLink
      );
      data.append(
        "description",
        formData.description
      );

      if (formData.poster) {
        data.append("poster", formData.poster);
      }

      if (selectedEvent) {
        await updateFacultyEvent(
          selectedEvent._id,
          data
        );

        toast.success(
          "Event updated successfully."
        );
      } else {
        await createFacultyEvent(data);

        toast.success(
          "Event created successfully."
        );
      }

      closeForm();
      await loadData();
    } catch (error) {
      console.error("Save Faculty Event Error:", error);

      toast.error(
        error.response?.data?.message ||
          "Failed to save event."
      );
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (event) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${event.title}"?`
    );

    if (!confirmed) return;

    try {
      await deleteFacultyEvent(event._id);

      toast.success(
        "Event deleted successfully."
      );

      await loadData();
    } catch (error) {
      console.error(
        "Delete Faculty Event Error:",
        error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete event."
      );
    }
  };

  const getEventStatus = (event) => {
  const today = new Date();
  const start = new Date(event.startDate);
  const end = new Date(event.endDate);

  today.setHours(0, 0, 0, 0);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);

  if (today < start) {
    return {
      label: "Upcoming",
      className: "bg-blue-100 text-blue-700",
    };
  }

  if (today >= start && today <= end) {
    return {
      label: "Ongoing",
      className: "bg-green-100 text-green-700",
    };
  }

  return {
    label: "Completed",
    className: "bg-gray-100 text-gray-600",
  };
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

  if (loading) {
    return (
      <Loader text="Loading department events..." />
    );
  }

 return (
  <>
    <Header />
    <Navbar />

    <main className="min-h-screen bg-[#f5f7fb] py-1 px-4">
      <div className="max-w-7xl mx-auto">

{/* Hero */}
<section className="bg-[#2F2F6F] py-10 -mx-10 mb-8">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h1 className="text-5xl font-bold text-white">
      Department Events
    </h1>

    <p className="text-white/90 text-lg mt-3">
      Create and manage events for your assigned department.
    </p>
  </div>
</section>

{/* Add Event */}
<div className="flex justify-end mb-6">
  <button
    onClick={openCreateForm}
    className="flex items-center justify-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
  >
    <Plus size={18} />
    Add Event
  </button>
</div>

        {/* Departments */}
        <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-8">
          <p className="text-sm text-gray-500 mb-2">
            Your Department(s)
          </p>

          <div className="flex flex-wrap gap-2">
            {departments.length > 0 ? (
              departments.map((department) => (
                <span
                  key={department._id}
                  className="px-4 py-2 rounded-full bg-[#3d3a82]/10 text-[#3d3a82] text-sm font-medium"
                >
                  {department.name}
                </span>
              ))
            ) : (
              <p className="text-gray-500 text-sm">
                No department assigned.
              </p>
            )}
          </div>
        </div>

{/* Events */}
{events.length === 0 ? (
  <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
    <h2 className="text-xl font-semibold text-gray-700">
      No Department Events
    </h2>

    <p className="text-gray-500 mt-2">
      You haven't created any events for your department yet.
    </p>

    <button
      onClick={openCreateForm}
      className="mt-5 inline-flex items-center gap-2 bg-[#2D2A70] text-white px-5 py-3 rounded-xl font-semibold hover:bg-[#221f59] transition"
    >
      <Plus size={18} />
      Create First Event
    </button>
  </div>
) : (
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {events.map((event) => {
      const status = getEventStatus(event);

      return (
        <div
          key={event._id}
          className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
        >
          {/* ================= POSTER ================= */}
        <div className="relative h-[260px] bg-gray-100 overflow-hidden flex items-center justify-center">
  {event.poster?.url ? (
    <img
      src={event.poster.url}
      alt={event.title}
      className="w-full h-full object-contain transition-transform duration-500"
    />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
                No Poster Available
              </div>
            )}

            {/* Status Badge */}
            <span
              className={`absolute top-3 right-3 text-xs font-semibold px-3 py-1.5 rounded-full shadow-sm ${status.className}`}
            >
              {status.label}
            </span>
          </div>

          {/* ================= CONTENT ================= */}
          <div className="p-5">

            {/* Title */}
            <h2 className="text-lg font-bold text-[#2D2A70] leading-snug line-clamp-2 min-h-[52px]">
              {event.title}
            </h2>

            {/* Department */}
            <p className="text-xs font-semibold text-[#6B68A5] mt-2">
              {event.department?.name}
            </p>

            {/* Date */}
            <div className="flex items-center gap-2 mt-4 text-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#2D2A70]/10 flex items-center justify-center">
                <span className="text-[#2D2A70] text-sm">📅</span>
              </div>

              <div>
                <p className="text-xs text-gray-400">
                  Date
                </p>

                <p className="font-medium text-gray-700">
                  {formatDate(event.startDate)}
                  {event.endDate &&
                    formatDate(event.startDate) !==
                      formatDate(event.endDate) &&
                    ` – ${formatDate(event.endDate)}`}
                </p>
              </div>
            </div>

            {/* Venue */}
            <div className="flex items-center gap-2 mt-3 text-sm">
              <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#2D2A70]/10 flex items-center justify-center">
                <span className="text-[#2D2A70] text-sm">📍</span>
              </div>

              <div className="min-w-0">
                <p className="text-xs text-gray-400">
                  Venue
                </p>

                <p className="font-medium text-gray-700 truncate">
                  {event.venue}
                </p>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-500 mt-4 line-clamp-2 leading-relaxed">
              {event.description}
            </p>

            {/* Actions */}
            <div className="flex gap-3 mt-5 pt-4 border-t border-gray-100">
              <button
                onClick={() => openEditForm(event)}
                className="flex-1 flex items-center justify-center gap-2 border border-[#2D2A70] text-[#2D2A70] hover:bg-[#2D2A70] hover:text-white px-3 py-2.5 rounded-xl font-medium transition"
              >
                <Pencil size={15} />
                Edit
              </button>

              <button
                onClick={() => handleDelete(event)}
                className="flex-1 flex items-center justify-center gap-2 border border-red-300 text-red-600 hover:bg-red-600 hover:text-white px-3 py-2.5 rounded-xl font-medium transition"
              >
                <Trash2 size={15} />
                Delete
              </button>
            </div>

          </div>
        </div>
      );
    })}
  </div>
)}

      {/* Add / Edit Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
          <div className="min-h-screen flex items-start justify-center p-6 md:p-10">

            <div className="relative w-full max-w-4xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

              <button
                onClick={closeForm}
                className="absolute top-5 right-5 z-10 w-11 h-11 rounded-full bg-white shadow flex items-center justify-center hover:bg-gray-100"
              >
                <X size={22} />
              </button>

              <div className="p-7 md:p-10">

                <div className="mb-7">
                  <h2 className="text-2xl font-bold text-[#2D2A70]">
                    {selectedEvent
                      ? "Edit Event"
                      : "Create Event"}
                  </h2>

                  <p className="text-gray-500 mt-1">
                    {selectedEvent
                      ? "Update your department event details."
                      : "Add a new event for your department."}
                  </p>
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Title */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Event Title{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="Enter event title"
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                    />
                  </div>

                  {/* Department */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Department{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                    >
                      <option value="">
                        Select Department
                      </option>

                      {departments.map(
                        (department) => (
                          <option
                            key={department._id}
                            value={department._id}
                          >
                            {department.name}
                          </option>
                        )
                      )}
                    </select>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Start Date{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        End Date{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                      />
                    </div>
                  </div>

                  {/* Venue + Chief Guest */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Venue{" "}
                        <span className="text-red-500">
                          *
                        </span>
                      </label>

                      <input
                        type="text"
                        name="venue"
                        value={formData.venue}
                        onChange={handleChange}
                        placeholder="Enter venue"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold text-gray-700 mb-2">
                        Chief Guest
                      </label>

                      <input
                        type="text"
                        name="chiefGuest"
                        value={formData.chiefGuest}
                        onChange={handleChange}
                        placeholder="Enter chief guest"
                        className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                      />
                    </div>
                  </div>

                  {/* Registration Link */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Registration Link
                    </label>

                    <input
                      type="url"
                      name="registrationLink"
                      value={formData.registrationLink}
                      onChange={handleChange}
                      placeholder="https://..."
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                      Description{" "}
                      <span className="text-red-500">
                        *
                      </span>
                    </label>

                    <textarea
                      rows={5}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Enter event description..."
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#2D2A70]"
                    />
                  </div>

                  {/* Poster */}
                  <div>
                    <label className="block font-semibold text-gray-700 mb-3">
                      Event Poster
                    </label>

                    <label
                      htmlFor="facultyPosterUpload"
                      className="border-2 border-dashed border-gray-300 rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer hover:border-[#2D2A70] transition overflow-hidden"
                    >
                      {posterPreview ? (
                        <img
                          src={posterPreview}
                          alt="Poster Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <>
                          <Plus
                            size={35}
                            className="text-[#2D2A70] mb-3"
                          />

                          <p className="font-medium text-gray-700">
                            Click to Upload Poster
                          </p>

                          <p className="text-sm text-gray-500 mt-1">
                            PNG, JPG, JPEG
                          </p>
                        </>
                      )}
                    </label>

                    <input
                      id="facultyPosterUpload"
                      type="file"
                      accept="image/*"
                      onChange={handlePosterChange}
                      className="hidden"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 pt-3">
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex-1 bg-[#2D2A70] hover:bg-[#221f59] disabled:opacity-60 text-white py-3 rounded-xl font-semibold transition"
                    >
                      {saving
                        ? "Saving..."
                        : selectedEvent
                        ? "Update Event"
                        : "Create Event"}
                    </button>

                    <button
                      type="button"
                      onClick={closeForm}
                      disabled={saving}
                      className="px-6 py-3 border border-gray-300 rounded-xl font-semibold hover:bg-gray-100 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
            )}
        </div>
      </main>

      <Footer />
    </>
  );
};

export default FacultyEvents;