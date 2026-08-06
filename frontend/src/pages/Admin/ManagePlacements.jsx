import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";

import AdminLayout from "../../components/layout/AdminLayout";

import PlacementForm from "../../components/admin/placements/PlacementForm";
import PlacementList from "../../components/admin/placements/PlacementList";

import RecruiterForm from "../../components/admin/RecruiterForm";
import RecruiterList from "../../components/admin/RecruiterList";

import PlacementContactForm from "../../components/admin/placementContact/PlacementContactForm";
import PlacementContactList from "../../components/admin/placementContact/PlacementContactList";

import PlacementGalleryForm from "../../components/admin/placementGallery/PlacementGalleryForm";
import PlacementGalleryList from "../../components/admin/placementGallery/PlacementGalleryList";

import {
    getPlacementContacts,
} from "../../services/placementContactService";

import {
    getPlacementGalleries,
} from "../../services/placementGalleryService";

function ManagePlacements() {

    const [activeTab, setActiveTab] =
        useState("placements");

    /* ===========================
          Placement
    =========================== */

    const [
        selectedPlacement,
        setSelectedPlacement,
    ] = useState(null);

    const [
        placementRefresh,
        setPlacementRefresh,
    ] = useState(false);

    const [
        showPlacementForm,
        setShowPlacementForm,
    ] = useState(false);

    const triggerPlacementRefresh = () =>
        setPlacementRefresh((prev) => !prev);

    /* ===========================
          Recruiters
    =========================== */

    const [
        selectedRecruiter,
        setSelectedRecruiter,
    ] = useState(null);

    const [
        recruiterRefresh,
        setRecruiterRefresh,
    ] = useState(0);

    const [
        showRecruiterForm,
        setShowRecruiterForm,
    ] = useState(false);

    const triggerRecruiterRefresh = () =>
        setRecruiterRefresh((prev) => prev + 1);

    /* ===========================
        Placement Contact
    =========================== */

    const [
        selectedContact,
        setSelectedContact,
    ] = useState(null);

    const [contacts, setContacts] =
        useState([]);

    const [
        contactRefresh,
        setContactRefresh,
    ] = useState(false);

    const [
        showContactForm,
        setShowContactForm,
    ] = useState(false);

    const triggerContactRefresh = () =>
        setContactRefresh((prev) => !prev);

    /* ===========================
        Placement Gallery
    =========================== */

    const [
        selectedGallery,
        setSelectedGallery,
    ] = useState(null);

    const [galleries, setGalleries] =
        useState([]);

    const [
        gallerySearch,
        setGallerySearch,
    ] = useState("");

    const [
        galleryRefresh,
        setGalleryRefresh,
    ] = useState(false);

    const [
        showGalleryForm,
        setShowGalleryForm,
    ] = useState(false);

    const triggerGalleryRefresh = () =>
        setGalleryRefresh((prev) => !prev);

    useEffect(() => {

        const fetchContacts = async () => {

            try {

                const response =
                    await getPlacementContacts();

                setContacts(response.data || []);

            } catch (error) {

                console.error(error);

            }

        };

        fetchContacts();

    }, [contactRefresh]);

    useEffect(() => {

        const fetchGalleries = async () => {

            try {

                const response =
                    await getPlacementGalleries();

                setGalleries(response || []);

            } catch (error) {

                console.error(error);

            }

        };

        fetchGalleries();

    }, [galleryRefresh]);

    return (
        <AdminLayout>

            <div className="min-h-screen bg-[#f5f7fb] p-8">

                <div className="max-w-7xl mx-auto">

                    {/* Header */}

                    <div className="mb-8">

                        <h1 className="text-4xl font-bold text-[#2D2A70]">
                            Manage Placements
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Manage placements, recruiting companies and placement coordinator details.
                        </p>

                    </div>

                    {/* Tabs + Add Button */}

                    <div className="flex items-center justify-between mb-8">

                        <div className="flex gap-4">

                            <button
                                onClick={() => setActiveTab("placements")}
                                className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === "placements"
                                        ? "bg-[#2D2A70] text-white"
                                        : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
                                    }`}
                            >
                                Placements
                            </button>

                            <button
                                onClick={() => setActiveTab("recruiters")}
                                className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === "recruiters"
                                        ? "bg-[#2D2A70] text-white"
                                        : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
                                    }`}
                            >
                                Recruiters
                            </button>

                            <button
                                onClick={() => setActiveTab("contact")}
                                className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === "contact"
                                        ? "bg-[#2D2A70] text-white"
                                        : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
                                    }`}
                            >
                                Placement Contact
                            </button>

                            <button
                                onClick={() => setActiveTab("gallery")}
                                className={`px-8 py-3 rounded-full font-semibold transition-all ${activeTab === "gallery"
                                        ? "bg-[#2D2A70] text-white"
                                        : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
                                    }`}
                            >
                                Placement Gallery
                            </button>

                        </div>

                        <button
                            onClick={() => {

                                if (activeTab === "placements") {
                                    setSelectedPlacement(null);
                                    setShowPlacementForm(true);
                                }

                                else if (activeTab === "recruiters") {
                                    setSelectedRecruiter(null);
                                    setShowRecruiterForm(true);
                                }

                                else if (activeTab === "contact") {
                                    setSelectedContact(null);
                                    setShowContactForm(true);
                                }

                                else {
                                    setSelectedGallery(null);
                                    setShowGalleryForm(true);
                                }

                            }}
                            className="flex items-center gap-2 bg-[#2D2A70] hover:bg-[#221f59] text-white px-5 py-3 rounded-xl font-semibold transition"
                        >
                            <Plus size={18} />

                            {activeTab === "placements"
                                ? "Add Placement"
                                : activeTab === "recruiters"
                                    ? "Add Recruiter"
                                    : activeTab === "contact"
                                        ? "Add Contact"
                                        : "Add Gallery"}

                        </button>

                    </div>
                    {/* ==========================
                PLACEMENTS TAB
          ========================== */}

                    {activeTab === "placements" && (
                        <PlacementList
                            refresh={placementRefresh}
                            onEdit={(placement) => {
                                setSelectedPlacement(placement);
                                setShowPlacementForm(true);
                            }}
                        />
                    )}

                    {/* ==========================
                RECRUITERS TAB
          ========================== */}

                    {activeTab === "recruiters" && (
                        <RecruiterList
                            refresh={recruiterRefresh}
                            onEdit={(recruiter) => {
                                setSelectedRecruiter(recruiter);
                                setShowRecruiterForm(true);
                            }}
                        />
                    )}

                    {/* ==========================
                CONTACT TAB
          ========================== */}

                    {activeTab === "contact" && (
                        <PlacementContactList
                            contacts={contacts}
                            onEdit={(contact) => {
                                setSelectedContact(contact);
                                setShowContactForm(true);
                            }}
                        />
                    )}

                    {/* ==========================
                GALLERY TAB
          ========================== */}

                    {activeTab === "gallery" && (
                        <PlacementGalleryList
                            galleries={galleries}
                            search={gallerySearch}
                            setSearch={setGallerySearch}
                            onEdit={(gallery) => {
                                setSelectedGallery(gallery);
                                setShowGalleryForm(true);
                            }}
                        />
                    )}

                </div>

                {/* ==========================
              Placement Popup
        ========================== */}

                {showPlacementForm && (
                    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
                        <div className="min-h-screen flex items-start justify-center p-8">

                            <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

                                <button
                                    onClick={() => {
                                        setShowPlacementForm(false);
                                        setSelectedPlacement(null);
                                    }}
                                    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-10">

                                    <PlacementForm
                                        selectedPlacement={selectedPlacement}
                                        setSelectedPlacement={setSelectedPlacement}
                                        triggerRefresh={() => {
                                            triggerPlacementRefresh();
                                            setShowPlacementForm(false);
                                        }}
                                    />

                                </div>

                            </div>

                        </div>
                    </div>
                )}
                {/* ==========================
              Recruiter Popup
        ========================== */}

                {showRecruiterForm && (
                    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
                        <div className="min-h-screen flex items-start justify-center p-8">

                            <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

                                <button
                                    onClick={() => {
                                        setShowRecruiterForm(false);
                                        setSelectedRecruiter(null);
                                    }}
                                    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-10">

                                    <RecruiterForm
                                        selectedRecruiter={selectedRecruiter}
                                        setSelectedRecruiter={setSelectedRecruiter}
                                        triggerRefresh={() => {
                                            triggerRecruiterRefresh();
                                            setShowRecruiterForm(false);
                                        }}
                                    />

                                </div>

                            </div>

                        </div>
                    </div>
                )}
                {/* ==========================
              Contact Popup
        ========================== */}

                {showContactForm && (
                    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
                        <div className="min-h-screen flex items-start justify-center p-8">

                            <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

                                <button
                                    onClick={() => {
                                        setShowContactForm(false);
                                        setSelectedContact(null);
                                    }}
                                    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-10">

                                    <PlacementContactForm
                                        selectedContact={selectedContact}
                                        setSelectedContact={setSelectedContact}
                                        triggerRefresh={() => {
                                            triggerContactRefresh();
                                            setShowContactForm(false);
                                        }}
                                    />

                                </div>

                            </div>

                        </div>
                    </div>
                )}
                {/* ==========================
              Gallery Popup
        ========================== */}

                {showGalleryForm && (
                    <div className="fixed inset-0 z-50 bg-black/40 overflow-y-auto">
                        <div className="min-h-screen flex items-start justify-center p-8">

                            <div className="relative w-full max-w-7xl bg-[#f5f7fb] rounded-3xl shadow-2xl">

                                <button
                                    onClick={() => {
                                        setShowGalleryForm(false);
                                        setSelectedGallery(null);
                                    }}
                                    className="absolute top-6 right-6 z-50 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center hover:bg-gray-100"
                                >
                                    <X size={24} />
                                </button>

                                <div className="p-10">

                                    <PlacementGalleryForm
                                        selectedGallery={selectedGallery}
                                        setSelectedGallery={setSelectedGallery}
                                        triggerRefresh={() => {
                                            triggerGalleryRefresh();
                                            setShowGalleryForm(false);
                                        }}
                                    />

                                </div>

                            </div>

                        </div>
                    </div>
                )}
            </div>

        </AdminLayout>
    );
}

export default ManagePlacements;