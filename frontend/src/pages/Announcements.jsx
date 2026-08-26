import { useEffect, useState } from "react";
import Header from "../components/layout/Header";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import AnnouncementCard from "../components/announcements/AnnouncementCard";
import { getAnnouncements } from "../services/announcementService";

function Announcements() {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);

      const res = await getAnnouncements();

      setAnnouncements(res.data || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Header/>
      <Navbar />

      <section className="w-full min-h-screen bg-gray-50 pb-12 sm:pb-16 lg:pb-20 overflow-x-hidden">

        {/* =========================
            HERO
        ========================= */}
        <div className="w-full bg-[#1F1A52] text-white py-10 sm:py-12 lg:py-16">
          <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            <h1
              className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Announcements
            </h1>

            <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-200 max-w-3xl leading-relaxed">
              Stay informed with the latest announcements, admission updates,
              examination notices, scholarships, holidays, circulars and
              important information from the Post Graduate Centre.
            </p>

          </div>
        </div>

        {/* =========================
            CONTENT
        ========================= */}
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 lg:mt-10">

          {loading ? (
            <div className="w-full bg-white rounded-xl shadow p-8 sm:p-12 lg:p-16 text-center">

              <p className="text-base sm:text-lg text-gray-500">
                Loading announcements...
              </p>

            </div>
          ) : announcements.length === 0 ? (
            <div className="w-full bg-white rounded-xl shadow p-6 sm:p-10 lg:p-16 text-center">

              <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-[#2D2A70] leading-tight">
                No Announcements Available
              </h2>

              <p className="mt-3 sm:mt-4 text-sm sm:text-base text-gray-600 leading-relaxed">
                Please check back later for new announcements.
              </p>

            </div>
          ) : (
            <div className="w-full space-y-4 sm:space-y-5 lg:space-y-6">

              {announcements.map((announcement) => (
                <AnnouncementCard
                  key={announcement._id}
                  announcement={announcement}
                />
              ))}

            </div>
          )}

        </div>

      </section>
      <Footer/>
    </>
  );
}

export default Announcements;