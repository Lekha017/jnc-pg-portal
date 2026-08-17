import { useEffect, useState } from "react";

import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import PlacementSidebar from "../components/placements/PlacementSidebar";
import PlacementGalleryAccordion from "../components/placements/PlacementGalleryAccordion";

import { getPlacementGalleries } from "../services/placementGalleryService";

const PlacementGallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  const fetchGalleries = async () => {
    try {
      const res = await getPlacementGalleries();

      if (Array.isArray(res)) {
        setGalleries(res);
      } else if (Array.isArray(res.data)) {
        setGalleries(res.data);
      } else if (Array.isArray(res.galleries)) {
        setGalleries(res.galleries);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <section className="bg-[#F8FAFC] py-8 sm:py-10 md:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">

            {/* Main Content */}
            <main className="lg:col-span-9 min-w-0">

              <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-6 md:p-8">

                <div className="bg-[#F5F7FC] rounded-xl p-5 sm:p-7 md:p-10">

                  <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center text-[#2D2A70] mb-7 sm:mb-10">
                    Gallery
                  </h1>

                  {loading ? (
                    <div className="text-center py-14 sm:py-20 text-sm sm:text-base">
                      Loading Gallery...
                    </div>
                  ) : (
                    <PlacementGalleryAccordion
                      galleries={galleries}
                    />
                  )}

                </div>

              </div>

            </main>

            {/* Sidebar */}
            <aside className="lg:col-span-3 min-w-0">
              <div className="lg:sticky lg:top-24">
                <PlacementSidebar />
              </div>
            </aside>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default PlacementGallery;