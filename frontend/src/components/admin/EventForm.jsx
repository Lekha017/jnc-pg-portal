import { useState } from "react";
import {
    CalendarPlus,
    UploadCloud,
    Save,
    RotateCcw,
} from "lucide-react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { getDepartments } from "../../services/departmentService";
import {
    createEvent,
    updateEvent,
} from "../../services/eventService";

const EventForm = ({
    selectedEvent,
    setSelectedEvent,
    triggerRefresh,
}) => {
    const [isEditing, setIsEditing] = useState(false);

    const [departments, setDepartments] = useState([]);

    const [posterPreview, setPosterPreview] = useState("");

    const [qrPreview, setQrPreview] = useState("");

    const [formData, setFormData] = useState({
        title: "",
        department: "",
        venue: "",
        startDate: "",
        endDate: "",
        chiefGuest: "",
        registrationLink: "",
        description: "",
        isPublished: true,
        poster: null,
        registrationQRCode: null,
    });

    useEffect(() => {
        loadDepartments();
    }, []);
    useEffect(() => {
        if (!selectedEvent) return;

        setIsEditing(true);

        setFormData({
            title: selectedEvent.title || "",
            department: selectedEvent.department?._id || "",
            venue: selectedEvent.venue || "",
            startDate: selectedEvent.startDate?.split("T")[0] || "",
            endDate: selectedEvent.endDate?.split("T")[0] || "",
            chiefGuest: selectedEvent.chiefGuest || "",
            registrationLink: selectedEvent.registrationLink || "",
            description: selectedEvent.description || "",
            isPublished: selectedEvent.isPublished,
            poster: null,
            registrationQRCode: null,
        });

        setPosterPreview(selectedEvent.poster?.url || "");
    }, [selectedEvent]);

    const loadDepartments = async () => {
        try {
            const data = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.log(error.response?.data);

            toast.error(
                error.response?.data?.message ||
                "Failed to create event"
            );
        }
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handlePoster = (e) => {
        const file = e.target.files[0];
        console.log("POSTER FILE:", file);

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            poster: file,
        }));

        setPosterPreview(URL.createObjectURL(file));
    };

    const handleQR = (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setFormData((prev) => ({
            ...prev,
            registrationQRCode: file,
        }));

        setQrPreview(URL.createObjectURL(file));
    };

    const resetForm = () => {
        setPosterPreview("");
        setQrPreview("");

        setFormData({
            title: "",
            department: "",
            venue: "",
            startDate: "",
            endDate: "",
            chiefGuest: "",
            registrationLink: "",
            description: "",
            isPublished: true,
            poster: null,
            registrationQRCode: null,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const data = new FormData();

            Object.keys(formData).forEach((key) => {
                if (formData[key] !== null) {
                    data.append(key, formData[key]);
                }
            });

            if (isEditing) {
                await updateEvent(selectedEvent._id, data);

                toast.success("Event Updated Successfully");
            } else {
                await createEvent(data);

                toast.success("Event Created Successfully");
            }

            resetForm();

            setSelectedEvent(null);
            setIsEditing(false);

            triggerRefresh();
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Operation Failed"
            );
        }
    };
    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-6 sticky top-6">
            {/* Heading */}
            <div className="flex items-center gap-3 mb-8">
                <div className="bg-[#2D2A70] p-3 rounded-xl text-white">
                    <CalendarPlus size={24} />
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-[#2D2A70]">
                        {isEditing ? "Update Event" : "Create Event"}
                    </h2>

                    <p className="text-gray-500 text-sm">
                        {isEditing
                            ? "Update the selected event."
                            : "Fill in the details below to create a new event."}
                    </p>
                </div>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-6"
            >
                {/* Event Title */}
                <div>
                    <label className="block font-semibold text-gray-700 mb-2">
                        Event Title <span className="text-red-500">*</span>
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
                        Department <span className="text-red-500">*</span>
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

                        {departments.map((dept) => (
                            <option
                                key={dept._id}
                                value={dept._id}
                            >
                                {dept.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Start Date <span className="text-red-500">*</span>
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
                            End Date <span className="text-red-500">*</span>
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
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <label className="block font-semibold text-gray-700 mb-2">
                            Venue <span className="text-red-500">*</span>
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
                        type="text"
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
                        Description <span className="text-red-500">*</span>
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

                {/* Upload Section */}
                <div className="grid grid-cols-2 gap-5">
                    {/* Poster */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-3">
                            Event Poster <span className="text-red-500">*</span>
                        </label>

                        {/* <input
                            type="file"
                            accept="image/*"
                            onChange={handlePoster}
                            className="hidden"
                        /> */}
                        <label
                            htmlFor="posterUpload"
                            className="border-2 border-dashed border-gray-300 rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer hover:border-[#2D2A70] transition"
                        >
                            {posterPreview ? (
                                <img
                                    src={posterPreview}
                                    alt="Poster Preview"
                                    className="w-full h-full object-cover rounded-2xl"
                                />
                            ) : (
                                <>
                                    <UploadCloud
                                        size={40}
                                        className="text-[#2D2A70] mb-3"
                                    />

                                    <p className="font-medium text-gray-700">
                                        Click to Upload
                                    </p>

                                    <p className="text-sm text-gray-500 mt-1">
                                        PNG, JPG, JPEG
                                    </p>
                                </>
                            )}
                        </label>

                        <input
                            id="posterUpload"
                            type="file"
                            accept="image/*"
                            onChange={handlePoster}
                            className="hidden"
                        />
                    </div>

                    {/* QR */}
                    <div>
                        <label className="block font-semibold text-gray-700 mb-3">
                            Registration QR
                            <span className="text-gray-500 text-sm ml-1">
                                (Optional)
                            </span>
                        </label>

                        <label
                            htmlFor="qrUpload"
                            className="border-2 border-dashed border-gray-300 rounded-2xl h-44 flex flex-col items-center justify-center cursor-pointer hover:border-[#2D2A70] transition"
                        >
                            <UploadCloud
                                size={40}
                                className="text-[#2D2A70] mb-3"
                            />

                            <p className="font-medium text-gray-700">
                                Click to upload
                            </p>

                            <p className="text-sm text-gray-500 mt-1">
                                PNG, JPG, JPEG
                            </p>

                            <input
                                id="qrUpload"
                                type="file"
                                accept="image/*"
                                onChange={handleQR}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>

                {/* Publish */}
                <div className="flex items-center gap-3">
                    <input
                        type="checkbox"
                        name="isPublished"
                        checked={formData.isPublished}
                        onChange={handleChange}
                        className="w-5 h-5 accent-[#2D2A70]"
                    />

                    <span className="font-medium text-gray-700">
                        Publish Immediately
                    </span>
                </div>

                {/* Buttons */}
                <div className="flex gap-4 pt-3">
                    <button
                        type="submit"
                        className="flex-1 flex items-center justify-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white py-3 rounded-xl font-semibold transition"
                    >
                        <Save size={18} />
                        {isEditing ? "Update Event" : "Save Event"}
                    </button>

                    <button
                        type="button"
                        onClick={resetForm}
                        className="flex items-center justify-center gap-2 px-6 border border-gray-300 rounded-xl hover:bg-gray-100 transition"
                    >
                        <RotateCcw size={18} />
                        Reset
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EventForm;