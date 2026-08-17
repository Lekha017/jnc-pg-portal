import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/Navbar";

import { getFacultyById } from "../../services/facultyService";
import { getProfile } from "../../services/authService";

import FacultyHeader from "../../components/faculty/details/FacultyHeader";
import FacultySidebar from "../../components/faculty/details/FacultySidebar";
import FacultyAccordion from "../../components/faculty/details/FacultyAccordion";

import AboutSection from "../../components/faculty/details/AboutSection";
import ResearchInterestSection from "../../components/faculty/details/ResearchInterestSection";

import PublicationTable from "../../components/faculty/details/PublicationTable";
import ConferencePublicationTable from "../../components/faculty/details/ConferencePublicationTable";
import PaperPresentationTable from "../../components/faculty/details/PaperPresentationTable";
import AwardTable from "../../components/faculty/details/AwardTable";
import MembershipTable from "../../components/faculty/details/MembershipTable";

const FacultyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [faculty, setFaculty] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFaculty();
    loadLoggedInUser();
  }, [id]);

  const loadFaculty = async () => {
    try {
      setLoading(true);

      const response = await getFacultyById(id);

      setFaculty(response.data || response.faculty);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const loadLoggedInUser = async () => {
    try {
      const data = await getProfile();
      setLoggedInUser(data.user);
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          Loading Faculty...
        </div>

        <Footer />
      </>
    );
  }

  if (!faculty) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
          Faculty not found.
        </div>

        <Footer />
      </>
    );
  }

  const isOwner =
    loggedInUser?.role === "faculty" &&
    loggedInUser?.email === faculty.email;

  return (
    <>
      <Header />
      <Navbar />

      <section className="bg-[#f3f6fd] py-6 sm:py-8 lg:py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-6 sm:gap-8">

            {/* LEFT */}
            <div className="w-full min-w-0">
              <FacultySidebar faculty={faculty} />
            </div>

            {/* RIGHT */}
            <div className="min-w-0">

              <FacultyHeader
                faculty={faculty}
                isOwner={isOwner}
                onEdit={() =>
                  navigate("/faculty/edit-profile")
                }
              />

              <div className="mt-6 sm:mt-8 space-y-4 sm:space-y-5">

                {faculty.bio?.trim() && (
                  <FacultyAccordion title="About">
                    <div className="w-full min-w-0">
                      <AboutSection bio={faculty.bio} />
                    </div>
                  </FacultyAccordion>
                )}

                {faculty.researchInterests?.length > 0 && (
                  <FacultyAccordion title="Research Interests">
                    <div className="w-full min-w-0">
                      <ResearchInterestSection
                        researchInterests={faculty.researchInterests}
                      />
                    </div>
                  </FacultyAccordion>
                )}

                {faculty.structuredPublications?.length > 0 && (
                  <FacultyAccordion title="Publications">
                    <div className="w-full min-w-0 overflow-x-auto">
                      <PublicationTable
                        publications={faculty.structuredPublications}
                      />
                    </div>
                  </FacultyAccordion>
                )}

                {faculty.structuredConferencePublications?.length > 0 && (
                  <FacultyAccordion title="Conference Publications">
                    <div className="w-full min-w-0 overflow-x-auto">
                      <ConferencePublicationTable
                        conferencePublications={
                          faculty.structuredConferencePublications
                        }
                      />
                    </div>
                  </FacultyAccordion>
                )}

                {faculty.structuredPapersPresented?.length > 0 && (
                  <FacultyAccordion title="Paper Presentations">
                    <div className="w-full min-w-0 overflow-x-auto">
                      <PaperPresentationTable
                        paperPresentations={
                          faculty.structuredPapersPresented
                        }
                      />
                    </div>
                  </FacultyAccordion>
                )}

                {faculty.structuredAwards?.length > 0 && (
                  <FacultyAccordion title="Awards">
                    <div className="w-full min-w-0 overflow-x-auto">
                      <AwardTable
                        awards={faculty.structuredAwards}
                      />
                    </div>
                  </FacultyAccordion>
                )}

                {faculty.structuredMemberships?.length > 0 && (
                  <FacultyAccordion title="Professional Memberships">
                    <div className="w-full min-w-0 overflow-x-auto">
                      <MembershipTable
                        memberships={
                          faculty.structuredMemberships
                        }
                      />
                    </div>
                  </FacultyAccordion>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </>
  );
};

export default FacultyDetails;