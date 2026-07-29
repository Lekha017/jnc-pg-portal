import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
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
      <Navbar />

      <section className="bg-gray-50 min-h-screen pb-20">

        {/* Hero */}
        <div className="bg-[#1F1A52] text-white py-16">
          <div className="max-w-7xl mx-auto px-6">

            <h1
              className="text-5xl font-bold"
              style={{ fontFamily: "Georgia, serif" }}
            >
              Announcements
            </h1>

            <p className="mt-4 text-lg text-gray-200 max-w-3xl">
              Stay informed with the latest announcements, admission updates,
              examination notices, scholarships, holidays, circulars and
              important information from the Post Graduate Centre.
            </p>

          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-6 mt-10">

          {loading ? (
            <div className="bg-white rounded-xl shadow p-16 text-center">
              <p className="text-lg text-gray-500">
                Loading announcements...
              </p>
            </div>
          ) : announcements.length === 0 ? (
            <div className="bg-white rounded-xl shadow p-16 text-center">
              <h2 className="text-3xl font-semibold text-[#2D2A70]">
                No Announcements Available
              </h2>

              <p className="mt-4 text-gray-600">
                Please check back later for new announcements.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
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
    </>
  );
}

export default Announcements;