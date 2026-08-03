import { useState, useEffect } from "react";

import PlacementForm from "../../components/admin/placements/PlacementForm";
import PlacementList from "../../components/admin/placements/PlacementList";

import RecruiterForm from "../../components/admin/RecruiterForm";
import RecruiterList from "../../components/admin/RecruiterList";

import PlacementContactForm from "../../components/admin/placementContact/PlacementContactForm";
import PlacementContactList from "../../components/admin/placementContact/PlacementContactList";
import { getPlacementContacts } from "../../services/placementContactService";

import PlacementGalleryForm from "../../components/admin/placementGallery/PlacementGalleryForm";
import PlacementGalleryList from "../../components/admin/placementGallery/PlacementGalleryList";
import AdminLayout from "../../components/layout/AdminLayout";
import { getPlacementGalleries } from "../../services/placementGalleryService";

function ManagePlacements() {

    const [activeTab, setActiveTab] = useState("placements");

    /* ===========================
          Placement
    =========================== */

    const [selectedPlacement, setSelectedPlacement] =
        useState(null);

    const [placementRefresh, setPlacementRefresh] =
        useState(false);

    const triggerPlacementRefresh = () =>
        setPlacementRefresh((prev) => !prev);

    /* ===========================
          Recruiters
    =========================== */

    const [selectedRecruiter, setSelectedRecruiter] =
        useState(null);

    const [recruiterRefresh, setRecruiterRefresh] =
        useState(0);

    const triggerRecruiterRefresh = () =>
        setRecruiterRefresh((prev) => prev + 1);

    /* ===========================
          Placement Contact
    =========================== */

    const [selectedContact, setSelectedContact] =
        useState(null);

    const [contacts, setContacts] =
        useState([]);

    const [contactRefresh, setContactRefresh] =
        useState(false);

    const triggerContactRefresh = () =>
        setContactRefresh((prev) => !prev);

    /* ===========================
      Placement Gallery
=========================== */

    const [selectedGallery, setSelectedGallery] =
        useState(null);

    const [galleries, setGalleries] =
        useState([]);

    const [gallerySearch, setGallerySearch] =
        useState("");

    const [galleryRefresh, setGalleryRefresh] =
        useState(false);

    const triggerGalleryRefresh = () =>
        setGalleryRefresh((prev) => !prev);

    useEffect(() => {

        const fetchGalleries = async () => {

            try {

                const response = await getPlacementGalleries();

                console.log(
                    "Placement Galleries:",
                    response
                );

                // setGalleries(response.data || []);
                setGalleries(response || []);
                console.log("Gallery Array:", response);

            } catch (error) {

                console.error(
                    "Error fetching placement galleries",
                    error
                );

            }

        };


        fetchGalleries();

    }, [galleryRefresh]);

    useEffect(() => {

        const fetchContacts = async () => {

            try {

                const response = await getPlacementContacts();

                console.log("Placement Contacts:", response);

                setContacts(response.data || []);

            } catch (error) {

                console.error(
                    "Error fetching placement contacts",
                    error
                );

            }

        };

        fetchContacts();

    }, [contactRefresh]);
    return (
         <AdminLayout>
        <div className="min-h-screen bg-gray-100 py-8 px-6">

            <div className="max-w-7xl mx-auto">


                {/* Heading */}

                <div className="mb-8">

                    <h1 className="text-4xl font-bold text-[#2D2A70]">
                        Manage Placements
                    </h1>

                    <p className="text-gray-600 mt-2">
                        Manage placements, recruiting companies and placement coordinator details.
                    </p>

                </div>


                {/* Tabs */}

                <div className="flex gap-4 mb-8 border-b border-gray-300 pb-5">


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



                {/* ==========================
              PLACEMENTS TAB
        =========================== */}


                {activeTab === "placements" && (

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">


                        {/* Form */}

                        <div className="lg:col-span-2">

                            <PlacementForm
                                selectedPlacement={selectedPlacement}
                                setSelectedPlacement={setSelectedPlacement}
                                triggerRefresh={triggerPlacementRefresh}
                            />

                        </div>



                        {/* List */}

                        <div className="lg:col-span-3">

                            <PlacementList
                                refresh={placementRefresh}
                                onEdit={setSelectedPlacement}
                            />

                        </div>


                    </div>

                )}
                {/* ==========================
              RECRUITERS TAB
        =========================== */}


                {activeTab === "recruiters" && (

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">


                        {/* Recruiter Form */}

                        <div className="lg:col-span-2">

                            <RecruiterForm
                                selectedRecruiter={selectedRecruiter}
                                setSelectedRecruiter={setSelectedRecruiter}
                                refresh={triggerRecruiterRefresh}
                            />

                        </div>



                        {/* Recruiter List */}

                        <div className="lg:col-span-3">

                            <RecruiterList
                                onEdit={setSelectedRecruiter}
                                refresh={recruiterRefresh}
                            />

                        </div>


                    </div>

                )}





                {/* ==========================
              PLACEMENT CONTACT TAB
        =========================== */}


                {activeTab === "contact" && (

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">


                        {/* Contact Form */}

                        <div className="lg:col-span-2">

                            <PlacementContactForm
                                selectedContact={selectedContact}
                                setSelectedContact={setSelectedContact}
                                triggerRefresh={triggerContactRefresh}
                            />

                        </div>



                        {/* Contact List */}

                        <div className="lg:col-span-3">

                            <PlacementContactList
                                contacts={contacts}
                                onEdit={setSelectedContact}
                            />

                        </div>


                    </div>

                )}

                                {/* ==========================
              PLACEMENT GALLERY TAB
        =========================== */}


                {activeTab === "gallery" && (

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">


                        {/* Gallery Form */}

                        <div className="lg:col-span-2">

                            <PlacementGalleryForm
                                selectedGallery={selectedGallery}
                                setSelectedGallery={setSelectedGallery}
                                triggerRefresh={triggerGalleryRefresh}
                            />

                        </div>



                        {/* Gallery List */}

                        <div className="lg:col-span-3">

                            <PlacementGalleryList
                                galleries={galleries}
                                search={gallerySearch}
                                setSearch={setGallerySearch}
                                onEdit={setSelectedGallery}
                            />

                        </div>


                    </div>

                )}

            </div>

        </div>
        </AdminLayout>
    );
}


export default ManagePlacements;