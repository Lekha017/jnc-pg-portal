import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

      setFaculty(
        response.data.data || response.data.faculty
      );
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
        <Navbar />
        <div className="max-w-7xl mx-auto py-20 text-center">
          Loading Faculty...
        </div>
      </>
    );
  }

  if (!faculty) {
    return (
      <>
        <Navbar />
        <div className="max-w-7xl mx-auto py-20 text-center">
          Faculty not found.
        </div>
      </>
    );
  }

  const isOwner =
    loggedInUser?.role === "faculty" &&
    loggedInUser?.email === faculty.email;

  return (
    <>
      <Navbar />

      <section className="bg-[#f3f6fd] py-10">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid lg:grid-cols-[260px_1fr] gap-8">

            {/* LEFT */}
            <FacultySidebar faculty={faculty} />

            {/* RIGHT */}
            <div>

              <FacultyHeader
                faculty={faculty}
                isOwner={isOwner}
                onEdit={() =>
                  navigate("/faculty/edit-profile")
                }
              />

              <div className="mt-8 space-y-5">

                {faculty.bio?.trim() && (
                  <FacultyAccordion title="About">
                    <AboutSection bio={faculty.bio} />
                  </FacultyAccordion>
                )}

                {faculty.researchInterests?.length > 0 && (
                  <FacultyAccordion title="Research Interests">
                    <ResearchInterestSection
                      researchInterests={faculty.researchInterests}
                    />
                  </FacultyAccordion>
                )}

                {faculty.structuredPublications?.length > 0 && (
                  <FacultyAccordion title="Publications">
                    <PublicationTable
                      publications={faculty.structuredPublications}
                    />
                  </FacultyAccordion>
                )}

                {faculty.structuredConferencePublications?.length > 0 && (
                  <FacultyAccordion title="Conference Publications">
                    <ConferencePublicationTable
                      conferencePublications={
                        faculty.structuredConferencePublications
                      }
                    />
                  </FacultyAccordion>
                )}

                {faculty.structuredPapersPresented?.length > 0 && (
                  <FacultyAccordion title="Paper Presentations">
                    <PaperPresentationTable
                      paperPresentations={
                        faculty.structuredPapersPresented
                      }
                    />
                  </FacultyAccordion>
                )}

                {faculty.structuredAwards?.length > 0 && (
                  <FacultyAccordion title="Awards">
                    <AwardTable
                      awards={faculty.structuredAwards}
                    />
                  </FacultyAccordion>
                )}

                {faculty.structuredMemberships?.length > 0 && (
                  <FacultyAccordion title="Professional Memberships">
                    <MembershipTable
                      memberships={
                        faculty.structuredMemberships
                      }
                    />
                  </FacultyAccordion>
                )}

              </div>

            </div>

          </div>

        </div>
      </section>
    </>
  );
};

export default FacultyDetails;