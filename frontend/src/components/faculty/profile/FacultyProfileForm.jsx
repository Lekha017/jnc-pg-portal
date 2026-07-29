import { useEffect, useState } from "react";

import Button from "../../common/Button";

import BasicInformationSection from "./BasicInformationSection";
import AboutSection from "./AboutSection";
import ExperienceSection from "./ExperienceSection";
import ResearchInterestSection from "./ResearchInterestSection";
import QualificationSection from "./QualificationSection";
import PublicationSection from "./PublicationSection";
import ConferencePublicationSection from "./ConferencePublicationSection";
import PaperPresentationSection from "./PaperPresentationSection";
import AwardSection from "./AwardSection";
import MembershipSection from "./MembershipSection";

const FacultyProfileForm = ({
  initialData = {},
  departments = [],
  onSubmit,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    designation: "",
    departments: "",
    bio: "",
    academicExperience: "",
    researchExperience: "",
    researchInterests: "",
    image: null,
  });

  const [qualifications, setQualifications] = useState([]);
  const [publications, setPublications] = useState([]);
  const [
    conferencePublications,
    setConferencePublications,
  ] = useState([]);
  const [
    paperPresentations,
    setPaperPresentations,
  ] = useState([]);
  const [awards, setAwards] = useState([]);
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    setFormData({
      fullName: initialData.fullName || "",
      email: initialData.email || "",
      phone: initialData.phone || "",
      designation: initialData.designation || "",
      departments: Array.isArray(initialData.departments)
        ? initialData.departments[0]?._id || ""
        : initialData.departments?._id || "",
      bio: initialData.bio || "",
      academicExperience:
        initialData.academicExperience || "",
      researchExperience:
        initialData.researchExperience || "",
      researchInterests:
        initialData.researchInterests || "",
      image: initialData.image || null,
    });

    setQualifications(initialData.qualifications || []);

    setPublications(
      initialData.structuredPublications || []
    );

    setConferencePublications(
      initialData.structuredConferencePublications || []
    );

    setPaperPresentations(
      initialData.structuredPapersPresented || []
    );

    setAwards(
      initialData.structuredAwards || []
    );

    setMemberships(
      initialData.structuredMemberships || []
    );
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file) => {
    setFormData((prev) => ({
      ...prev,
      image: file,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!onSubmit) return;

    const data = new FormData();

    Object.entries(formData).forEach(
      ([key, value]) => {
        if (key === "image") {
          if (value instanceof File) {
            data.append("image", value);
          }
        } else if (
          value !== null &&
          value !== undefined
        ) {
          data.append(key, value);
        }
      }
    );

    data.append(
      "qualifications",
      JSON.stringify(qualifications)
    );

    data.append(
      "structuredPublications",
      JSON.stringify(publications)
    );

    data.append(
      "structuredConferencePublications",
      JSON.stringify(
        conferencePublications
      )
    );

    data.append(
      "structuredPapersPresented",
      JSON.stringify(
        paperPresentations
      )
    );

    data.append(
      "structuredAwards",
      JSON.stringify(awards)
    );

    data.append(
      "structuredMemberships",
      JSON.stringify(memberships)
    );

    await onSubmit(data);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8"
    >
      <BasicInformationSection
        formData={formData}
        handleChange={handleChange}
        handleImageChange={handleImageChange}
        departments={departments}
      />

      <AboutSection
        formData={formData}
        handleChange={handleChange}
      />

      <ExperienceSection
        formData={formData}
        handleChange={handleChange}
      />

      <ResearchInterestSection
        formData={formData}
        handleChange={handleChange}
      />

      <QualificationSection
        qualifications={qualifications}
        setQualifications={setQualifications}
      />

      <PublicationSection
        publications={publications}
        setPublications={setPublications}
      />

      <ConferencePublicationSection
        conferencePublications={
          conferencePublications
        }
        setConferencePublications={
          setConferencePublications
        }
      />

      <PaperPresentationSection
        paperPresentations={
          paperPresentations
        }
        setPaperPresentations={
          setPaperPresentations
        }
      />

      <AwardSection
        awards={awards}
        setAwards={setAwards}
      />

      <MembershipSection
        memberships={memberships}
        setMemberships={setMemberships}
      />

      <div className="flex justify-end">
        <Button
          type="submit"
          loading={loading}
          className="w-auto px-8"
        >
          Save Profile
        </Button>
      </div>
    </form>
  );
};

export default FacultyProfileForm;