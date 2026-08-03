import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PlacementContactHero from "../components/placements/PlacementContactHero";
import PlacementSidebar from "../components/placements/PlacementSidebar";
import CoordinatorCard from "../components/placements/CoordinatorCard";
import OfficeInfoCard from "../components/placements/OfficeInfoCard";
import QuickActions from "../components/placements/QuickActions";

import { getPlacementContact } from "../services/placementContactService";

const PlacementContact = () => {
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const res = await getPlacementContact();

      if (res.success) {
        setContact(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <PlacementContactHero />

      <section className="bg-[#F8FAFC] py-14">
        <div className="max-w-7xl mx-auto px-6">

          {loading ? (
            <div className="bg-white rounded-3xl shadow-sm border border-gray-200 py-20 text-center">
              <h2 className="text-2xl font-semibold text-[#2D2A70]">
                Loading Placement Contact...
              </h2>

              <p className="text-gray-500 mt-2">
                Please wait while we fetch the coordinator details.
              </p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-12 gap-10">

              {/* Main Content */}

              <main className="lg:col-span-9">

                <div className="mb-8">

                  <h2 className="text-4xl font-bold text-[#2D2A70]">
                    Contact the Placement Cell
                  </h2>

                  <p className="mt-3 text-gray-600 leading-7">
                    Reach out to our Placement Cell for campus recruitment,
                    internship opportunities, placement assistance, recruiter
                    collaborations and career guidance.
                  </p>

                </div>

                {/* Coordinator */}

                <CoordinatorCard contact={contact} />

                {/* Bottom Cards */}

                <div className="grid md:grid-cols-2 gap-8 mt-8">

                  <OfficeInfoCard />

                  <QuickActions contact={contact} />

                </div>

              </main>

              {/* Sidebar */}

              <aside className="lg:col-span-3">
                <div className="sticky top-24">
                  <PlacementSidebar />
                </div>
              </aside>

            </div>
          )}

        </div>
      </section>

      <Footer />
    </>
  );
};

export default PlacementContact;