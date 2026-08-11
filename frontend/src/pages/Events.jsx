import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

import Navbar from "../components/layout/Navbar";
import EventCard from "../components/events/EventCard";
import GalleryCard from "../components/events/EventGalleryCard";
import EventModal from "../components/events/EventModal";

import { getPublishedGalleries } from "../services/galleryService";

import {
    getUpcomingEvents,
    getOngoingEvents,
} from "../services/eventService";

function Events() {
    const [activeTab, setActiveTab] = useState("upcoming");

    // Read department ID from URL
    // Example:
    // /events?department=65f123abc...
    const [searchParams] = useSearchParams();

    const departmentId = searchParams.get("department");

    const [upcomingEvents, setUpcomingEvents] = useState([]);
    const [ongoingEvents, setOngoingEvents] = useState([]);
    const [galleries, setGalleries] = useState([]);

    const [loading, setLoading] = useState(true);

    const [selectedImages, setSelectedImages] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedTitle, setSelectedTitle] = useState("");

    // Fetch whenever department changes
    useEffect(() => {
        fetchEvents();
    }, [departmentId]);

    const fetchEvents = async () => {
        try {
            setLoading(true);

            const [
                upcomingRes,
                ongoingRes,
                galleryRes,
            ] = await Promise.all([
                // If departmentId exists:
                // fetch only that department's events
                //
                // If departmentId is null:
                // fetch all events
                getUpcomingEvents(departmentId),
                getOngoingEvents(departmentId),

                // Gallery remains unchanged for now
                getPublishedGalleries(),
            ]);

            setUpcomingEvents(
                upcomingRes?.data || []
            );

            setOngoingEvents(
                ongoingRes?.data || []
            );

            setGalleries(
                galleryRes?.data || []
            );

        } catch (error) {
            console.error(
                "Error fetching events:",
                error
            );

            setUpcomingEvents([]);
            setOngoingEvents([]);

        } finally {
            setLoading(false);
        }
    };

    const openModal = (
        images,
        index,
        title
    ) => {
        setSelectedImages(images);
        setSelectedIndex(index);
        setSelectedTitle(title);
    };

    const closeModal = () => {
        setSelectedImages([]);
        setSelectedIndex(0);
        setSelectedTitle("");
    };

    return (
        <>
            <Navbar />

            <section className="bg-gray-50 min-h-screen pb-20">

                {/* =========================
                    HERO
                ========================= */}
                <div className="bg-[#1F1A52] text-white py-16">
                    <div className="max-w-7xl mx-auto px-6">

                        <h1
                            className="text-5xl font-bold"
                            style={{
                                fontFamily:
                                    "Georgia, serif",
                            }}
                        >
                            Events
                        </h1>

                        <p className="mt-4 text-lg text-gray-200 max-w-2xl">
                            Stay updated with upcoming
                            events, seminars, conferences,
                            workshops and explore memorable
                            moments from previous years.
                        </p>

                    </div>
                </div>


                {/* =========================
                    TABS
                ========================= */}
                <div className="max-w-7xl mx-auto px-6 mt-10">

                    <div className="flex flex-wrap gap-4 border-b pb-4">

                        {/* Upcoming */}
                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab(
                                    "upcoming"
                                )
                            }
                            className={`px-6 py-3 rounded-full font-medium transition ${
                                activeTab === "upcoming"
                                    ? "bg-[#1F1A52] text-white"
                                    : "bg-white border hover:bg-gray-100"
                            }`}
                        >
                            Upcoming Events
                        </button>


                        {/* Ongoing */}
                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab(
                                    "ongoing"
                                )
                            }
                            className={`px-6 py-3 rounded-full font-medium transition ${
                                activeTab === "ongoing"
                                    ? "bg-[#1F1A52] text-white"
                                    : "bg-white border hover:bg-gray-100"
                            }`}
                        >
                            Ongoing Events
                        </button>


                        {/* Gallery */}
                        <button
                            type="button"
                            onClick={() =>
                                setActiveTab(
                                    "gallery"
                                )
                            }
                            className={`px-6 py-3 rounded-full font-medium transition ${
                                activeTab === "gallery"
                                    ? "bg-[#1F1A52] text-white"
                                    : "bg-white border hover:bg-gray-100"
                            }`}
                        >
                            Event Gallery
                        </button>

                    </div>


                    {/* =========================
                        CONTENT
                    ========================= */}
                    <div className="mt-10">

                        {/* Loading */}
                        {loading && (
                            <div className="bg-white rounded-xl shadow p-12 text-center">

                                <h2 className="text-2xl font-semibold">
                                    Loading...
                                </h2>

                            </div>
                        )}


                        {/* =========================
                            UPCOMING EVENTS
                        ========================= */}
                        {!loading &&
                            activeTab ===
                                "upcoming" && (
                                <>
                                    {upcomingEvents.length ===
                                    0 ? (
                                        <div className="bg-white rounded-xl shadow p-12 text-center">

                                            <h2 className="text-2xl font-semibold text-[#1F1A52]">
                                                No Upcoming
                                                Events
                                            </h2>

                                            {departmentId && (
                                                <p className="mt-3 text-gray-500">
                                                    No upcoming
                                                    events are
                                                    available
                                                    for this
                                                    department.
                                                </p>
                                            )}

                                        </div>
                                    ) : (
                                        <div className="space-y-8">

                                            {upcomingEvents.map(
                                                (event) => (
                                                    <EventCard
                                                        key={
                                                            event._id
                                                        }
                                                        event={
                                                            event
                                                        }
                                                        onImageClick={(
                                                            images,
                                                            index
                                                        ) =>
                                                            openModal(
                                                                images,
                                                                index,
                                                                event.title
                                                            )
                                                        }
                                                    />
                                                )
                                            )}

                                        </div>
                                    )}
                                </>
                            )}


                        {/* =========================
                            ONGOING EVENTS
                        ========================= */}
                        {!loading &&
                            activeTab ===
                                "ongoing" && (
                                <>
                                    {ongoingEvents.length ===
                                    0 ? (
                                        <div className="bg-white rounded-xl shadow p-12 text-center">

                                            <h2 className="text-2xl font-semibold text-[#1F1A52]">
                                                No Ongoing
                                                Events
                                            </h2>

                                            {departmentId && (
                                                <p className="mt-3 text-gray-500">
                                                    No ongoing
                                                    events are
                                                    available
                                                    for this
                                                    department.
                                                </p>
                                            )}

                                        </div>
                                    ) : (
                                        <div className="space-y-8">

                                            {ongoingEvents.map(
                                                (event) => (
                                                    <EventCard
                                                        key={
                                                            event._id
                                                        }
                                                        event={
                                                            event
                                                        }
                                                        onImageClick={(
                                                            images,
                                                            index
                                                        ) =>
                                                            openModal(
                                                                images,
                                                                index,
                                                                event.title
                                                            )
                                                        }
                                                    />
                                                )
                                            )}

                                        </div>
                                    )}
                                </>
                            )}


                        {/* =========================
                            EVENT GALLERY
                        ========================= */}
                        {!loading &&
                            activeTab ===
                                "gallery" && (
                                <>
                                    {galleries.length ===
                                    0 ? (
                                        <div className="bg-white rounded-xl shadow p-12 text-center">

                                            <h2 className="text-2xl font-semibold text-[#1F1A52]">
                                                No Galleries
                                                Available
                                            </h2>

                                            <p className="mt-3 text-gray-600">
                                                Event galleries
                                                will appear
                                                here.
                                            </p>

                                        </div>
                                    ) : (
                                        <div className="space-y-8">

                                            {galleries.map(
                                                (gallery) => (
                                                    <GalleryCard
                                                        key={
                                                            gallery._id
                                                        }
                                                        gallery={
                                                            gallery
                                                        }
                                                        onImageClick={(
                                                            images,
                                                            index
                                                        ) =>
                                                            openModal(
                                                                images,
                                                                index,
                                                                gallery.title
                                                            )
                                                        }
                                                    />
                                                )
                                            )}

                                        </div>
                                    )}
                                </>
                            )}

                    </div>
                </div>


                {/* =========================
                    IMAGE MODAL
                ========================= */}
                <EventModal
                    images={selectedImages}
                    currentIndex={
                        selectedIndex
                    }
                    title={selectedTitle}
                    onClose={closeModal}
                />

            </section>
        </>
    );
}

export default Events;