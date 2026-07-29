import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import Toast from "../../components/common/Toast";
import Loader from "../../components/common/Loader";

import {
  getMyFacultyProfile,
  updateMyFacultyProfile,
} from "../../services/facultyService";

const tabs = [
  "About",
  "Experience",
  "Qualifications",
  "Research Interests",
  "Publications",
  "Conference Publications",
  "Paper Presentations",
  "Awards",
  "Memberships",
];

const EditFaculty = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("About");

  const [faculty, setFaculty] = useState(null);

  const [loading, setLoading] = useState(false);
  const [pageLoading, setPageLoading] = useState(true);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const [photo, setPhoto] = useState(null);

  const [formData, setFormData] = useState({
  bio: "",
  academicExperience: "",
  researchExperience: "",

  qualifications: [],

  researchInterests: [],

  structuredPublications: [],

  structuredConferencePublications: [],

  structuredPapersPresented: [],

  structuredAwards: [],

  structuredMemberships: [],
});

  useEffect(() => {
    fetchFaculty();
  }, []);

  const fetchFaculty = async () => {
    try {
      const response = await getMyFacultyProfile();

      const data =
        response.data?.data ||
        response.data?.faculty;

      setFaculty(data);

      setFormData({
  bio: data.bio || "",

  academicExperience:
    data.academicExperience || "",

  researchExperience:
    data.researchExperience || "",

  qualifications:
    data.qualifications || [],

 researchInterests: Array.isArray(data.researchInterests)
  ? data.researchInterests
  : data.researchInterests
  ? [data.researchInterests]
  : [],

  structuredPublications:
    data.structuredPublications || [],

  structuredConferencePublications:
    data.structuredConferencePublications || [],

  structuredPapersPresented:
    data.structuredPapersPresented || [],

  structuredAwards:
    data.structuredAwards || [],

  structuredMemberships:
    data.structuredMemberships || [],
});
    } catch (error) {
      setToast({
        show: true,
        message: "Unable to load faculty profile.",
        type: "error",
      });
    } finally {
      setPageLoading(false);
    }
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const saveProfile = async () => {
    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(formData).forEach(
        ([key, value]) => {
          data.append(
            key,
            Array.isArray(value)
              ? JSON.stringify(value)
              : value
          );
        }
      );

      if (photo) {
        data.append("image", photo);
      }

formData.qualifications = formData.qualifications.filter(
  (q) =>
    q.degree?.trim() ||
    q.subject?.trim() ||
    q.university?.trim() ||
    q.year
);

      await updateMyFacultyProfile(data);

      setToast({
        show: true,
        message:
          "Profile updated successfully.",
        type: "success",
      });
    } catch (error) {
      setToast({
        show: true,
        message:
          "Failed to update profile.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (pageLoading) {
    return (
      <>
        <Header />
        <Navbar />
        <Loader text="Loading Profile..." />
      </>
    );
  }

return (
  <>
    <Header />
    <Navbar />

    <section className="bg-[#eef3ff] py-10 pb-16">

      <div className="max-w-6xl mx-auto px-6">

        {/* ================= BREADCRUMB ================= */}

        <div className="text-sm mb-8">

          <Link
            to="/"
            className="text-blue-600 hover:underline"
          >
            Home
          </Link>

          {" "}›{" "}

          <Link
            to="/faculty"
            className="text-blue-600 hover:underline"
          >
            Faculty
          </Link>

          {" "}›{" "}

          <Link
            to={`/faculty/${faculty._id}`}
            className="text-blue-600 hover:underline"
          >
            {faculty.fullName}
          </Link>

          {" "}›{" "}

          <span className="font-semibold text-black">
            Edit Profile
          </span>

        </div>

        {/* ================= PHOTO ================= */}

        <div className="mb-8">

         <img
  src={
    photo
      ? URL.createObjectURL(photo)
      : faculty.image
      ?faculty.image || "/avatar.png"
      : "/avatar.png"
  }
  alt={faculty.fullName}
  className="w-32 h-32 object-cover rounded"
 />

          <input
            type="file"
            className="mt-4"
            onChange={(e) =>
              setPhoto(e.target.files[0])
            }
          />

        </div>

        {/* ================= TABS ================= */}

        <div className="border-b border-gray-300 mb-8 flex gap-8">

          {tabs.map((tab) => (

            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-[15px] transition ${
                activeTab === tab
                  ? "border-b-2 border-blue-600 text-black font-medium"
                  : "text-gray-500 hover:text-black"
              }`}
            >
              {tab}
            </button>

          ))}

        </div>

        {/* ================= CONTENT STARTS ================= */}

        <div className="bg-transparent">
                  {/* ================= ABOUT ================= */}

        {activeTab === "About" && (

          <textarea
            rows={4}
            value={formData.bio}
            onChange={(e) =>
              handleChange("bio", e.target.value)
            }
            className="w-full border border-gray-300 rounded p-4 outline-none resize-none bg-white"
          />

        )}
{/* ================= EXPERIENCE ================= */}

{activeTab === "Experience" && (

  <div className="space-y-8">

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Academic Experience
      </label>

      <textarea
        rows={1}
        value={formData.academicExperience}
        onChange={(e) =>
          handleChange(
            "academicExperience",
            e.target.value
          )
        }
        placeholder="Enter academic experience..."
        className="w-full border border-gray-300 rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

    <div>

      <label className="block text-sm font-semibold text-gray-700 mb-2">
        Research Experience
      </label>

      <textarea
        rows={1}
        value={formData.researchExperience}
        onChange={(e) =>
          handleChange(
            "researchExperience",
            e.target.value
          )
        }
        placeholder="Enter research experience..."
        className="w-full border border-gray-300 rounded-lg p-4 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

    </div>

  </div>

)}

        {/* ================= QUALIFICATIONS ================= */}

{activeTab === "Qualifications" && (

  <div className="space-y-4">

    {formData.qualifications.map((item, index) => (

      <div
        key={index}
        className="space-y-3 mb-6"
      >

        <input
          type="text"
          placeholder="Degree"
          value={item.degree || ""}
          onChange={(e) => {
            const list = [...formData.qualifications];
            list[index].degree = e.target.value;
            handleChange("qualifications", list);
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
         placeholder="Subject"
value={item.subject || ""}
          onChange={(e) => {
            const list = [...formData.qualifications];
            list[index].subject = e.target.value;
            handleChange("qualifications", list);
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

<input
  type="text"
  placeholder="University"
  value={item.university || ""}
  onChange={(e) => {
    const list = [...formData.qualifications];
    list[index].university = e.target.value;
    handleChange("qualifications", list);
  }}
  className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
/>

        <input
          type="number"
          placeholder="Year"
          value={item.year || ""}
          onChange={(e) => {
            const list = [...formData.qualifications];
            list[index].year = e.target.value;
            handleChange("qualifications", list);
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <button
          type="button"
          onClick={() => {
            const list = [...formData.qualifications];
            list.splice(index, 1);
            handleChange("qualifications", list);
          }}
          className="text-red-600 hover:underline"
        >
          Delete Qualification
        </button>

      </div>

    ))}

    <button
      type="button"
      onClick={() =>
        handleChange(
          "qualifications",
          [
            ...formData.qualifications,
            {
  degree: "",
  subject: "",
  university: "",
  year: "",
}
          ]
        )
      }
      className="text-blue-600 hover:underline font-medium"
    >
      + Add Qualification
    </button>

  </div>

)}

{/* ================= RESEARCH INTERESTS ================= */}

{activeTab === "Research Interests" && (

  <div className="space-y-4">

    {formData.researchInterests.map((item, index) => (

      <div
        key={index}
        className="space-y-3 mb-6"
      >

        <input
          type="text"
          value={item}
          placeholder="Research Interest"
          onChange={(e) => {
            const list = [...formData.researchInterests];
            list[index] = e.target.value;
            handleChange("researchInterests", list);
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <button
          type="button"
          onClick={() => {
            const list = [...formData.researchInterests];
            list.splice(index, 1);
            handleChange("researchInterests", list);
          }}
          className="text-red-600 hover:underline text-sm"
        >
          Delete
        </button>

      </div>

    ))}

    <button
      type="button"
      onClick={() =>
        handleChange("researchInterests", [
          ...formData.researchInterests,
          "",
        ])
      }
      className="text-blue-600 hover:underline font-medium"
    >
      + Add Research Interest
    </button>

  </div>

)}
       {/* ================= PUBLICATIONS ================= */}

{activeTab === "Publications" && (

  <div className="space-y-4">

    {formData.structuredPublications.map((pub, index) => (

      <div
        key={index}
        className="space-y-3 mb-6"
      >

        <input
          type="text"
          placeholder="Title"
          value={pub.title || ""}
          onChange={(e) => {
            const list = [...formData.structuredPublications];
            list[index].title = e.target.value;
            handleChange(
              "structuredPublications",
              list
            );
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Journal"
          value={pub.journal || ""}
          onChange={(e) => {
            const list = [...formData.structuredPublications];
            list[index].journal = e.target.value;
            handleChange(
              "structuredPublications",
              list
            );
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="number"
          placeholder="Year"
          value={pub.year || ""}
          onChange={(e) => {
            const list = [...formData.structuredPublications];
            list[index].year = e.target.value;
            handleChange(
              "structuredPublications",
              list
            );
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="ISBN / ISSN"
          value={pub.isbnIssn || ""}
          onChange={(e) => {
            const list = [...formData.structuredPublications];
            list[index].isbnIssn = e.target.value;
            handleChange(
              "structuredPublications",
              list
            );
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Publisher"
          value={pub.publisher || ""}
          onChange={(e) => {
            const list = [...formData.structuredPublications];
            list[index].publisher = e.target.value;
            handleChange(
              "structuredPublications",
              list
            );
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <button
          type="button"
          onClick={() => {
            const list = [...formData.structuredPublications];
            list.splice(index, 1);
            handleChange(
              "structuredPublications",
              list
            );
          }}
          className="text-red-600 hover:underline"
        >
          Delete Publication
        </button>

      </div>

    ))}

    <button
      type="button"
      onClick={() =>
        handleChange(
          "structuredPublications",
          [
            ...formData.structuredPublications,
            {
              title: "",
              journal: "",
              year: "",
              isbnIssn: "",
              publisher: "",
            },
          ]
        )
      }
      className="text-blue-600 hover:underline font-medium"
    >
      + Add Publication
    </button>

  </div>

)}

{/* ================= CONFERENCE PUBLICATIONS ================= */}

{activeTab === "Conference Publications" && (

  <div className="space-y-4">

    {formData.structuredConferencePublications.map((item, index) => (

      <div
        key={index}
        className="space-y-3 mb-6"
      >

        <input
          type="text"
          placeholder="Title"
          value={item.title || ""}
          onChange={(e) => {
            const list = [...formData.structuredConferencePublications];
            list[index].title = e.target.value;
            handleChange("structuredConferencePublications", list);
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Conference"
          value={item.conference || ""}
          onChange={(e) => {
            const list = [...formData.structuredConferencePublications];
            list[index].conference = e.target.value;
            handleChange("structuredConferencePublications", list);
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Location"
          value={item.location || ""}
          onChange={(e) => {
            const list = [...formData.structuredConferencePublications];
            list[index].location = e.target.value;
            handleChange("structuredConferencePublications", list);
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="number"
          placeholder="Year"
          value={item.year || ""}
          onChange={(e) => {
            const list = [...formData.structuredConferencePublications];
            list[index].year = e.target.value;
            handleChange("structuredConferencePublications", list);
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <button
          type="button"
          onClick={() => {
            const list = [...formData.structuredConferencePublications];
            list.splice(index, 1);
            handleChange("structuredConferencePublications", list);
          }}
          className="text-red-600 hover:underline"
        >
          Delete Conference Publication
        </button>

      </div>

    ))}

    <button
      type="button"
      onClick={() =>
        handleChange(
          "structuredConferencePublications",
          [
            ...formData.structuredConferencePublications,
            {
              title: "",
              conference: "",
              location: "",
              year: "",
            },
          ]
        )
      }
      className="text-blue-600 hover:underline font-medium"
    >
      + Add Conference Publication
    </button>

  </div>

)}

{/* ================= PAPER PRESENTATIONS ================= */}

{activeTab === "Paper Presentations" && (

  <div className="space-y-4">

    {formData.structuredPapersPresented.map((item, index) => (

      <div
        key={index}
        className="space-y-3 mb-6"
      >

        <input
          type="text"
          placeholder="Title"
          value={item.title || ""}
          onChange={(e) => {
            const list = [...formData.structuredPapersPresented];
            list[index].title = e.target.value;
            handleChange("structuredPapersPresented", list);
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Event"
          value={item.event || ""}
          onChange={(e) => {
            const list = [...formData.structuredPapersPresented];
            list[index].event = e.target.value;
            handleChange("structuredPapersPresented", list);
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Location"
          value={item.location || ""}
          onChange={(e) => {
            const list = [...formData.structuredPapersPresented];
            list[index].location = e.target.value;
            handleChange("structuredPapersPresented", list);
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="number"
          placeholder="Year"
          value={item.year || ""}
          onChange={(e) => {
            const list = [...formData.structuredPapersPresented];
            list[index].year = e.target.value;
            handleChange("structuredPapersPresented", list);
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <button
          type="button"
          onClick={() => {
            const list = [...formData.structuredPapersPresented];
            list.splice(index, 1);
            handleChange("structuredPapersPresented", list);
          }}
          className="text-red-600 hover:underline"
        >
          Delete Paper Presentation
        </button>

      </div>

    ))}

    <button
      type="button"
      onClick={() =>
        handleChange(
          "structuredPapersPresented",
          [
            ...formData.structuredPapersPresented,
            {
              title: "",
              event: "",
              location: "",
              year: "",
            },
          ]
        )
      }
      className="text-blue-600 hover:underline font-medium"
    >
      + Add Paper Presentation
    </button>

  </div>

)}

       {/* ================= AWARDS ================= */}

{activeTab === "Awards" && (

  <div className="space-y-4">

    {formData.structuredAwards.map((award, index) => (

      <div
        key={index}
        className="space-y-3 mb-6"
      >

        <input
          type="text"
          placeholder="Award Title"
          value={award.title || ""}
          onChange={(e) => {
            const list = [...formData.structuredAwards];
            list[index].title = e.target.value;
            handleChange(
              "structuredAwards",
              list
            );
          }}
          className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Organization"
          value={award.organization || ""}
          onChange={(e) => {
            const list = [...formData.structuredAwards];
            list[index].organization = e.target.value;
            handleChange(
              "structuredAwards",
              list
            );
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="number"
          placeholder="Year"
          value={award.year || ""}
          onChange={(e) => {
            const list = [...formData.structuredAwards];
            list[index].year = e.target.value;
            handleChange(
              "structuredAwards",
              list
            );
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <button
          type="button"
          onClick={() => {
            const list = [...formData.structuredAwards];
            list.splice(index, 1);
            handleChange(
              "structuredAwards",
              list
            );
          }}
          className="text-red-600 hover:underline"
        >
          Delete Award
        </button>

      </div>

    ))}

    <button
      type="button"
      onClick={() =>
        handleChange(
          "structuredAwards",
          [
            ...formData.structuredAwards,
            {
              title: "",
              organization: "",
              year: "",
            },
          ]
        )
      }
      className="text-blue-600 hover:underline font-medium"
    >
      + Add Award
    </button>

  </div>

)}

        {/* ================= MEMBERSHIPS ================= */}

{activeTab === "Memberships" && (

  <div className="space-y-4">

    {formData.structuredMemberships.map((membership, index) => (

      <div
        key={index}
       className="space-y-3 mb-6"
      >

        <input
          type="text"
          placeholder="Organization"
          value={membership.organization || ""}
          onChange={(e) => {
            const list = [...formData.structuredMemberships];
            list[index].organization = e.target.value;
            handleChange(
              "structuredMemberships",
              list
            );
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="text"
          placeholder="Role"
          value={membership.role || ""}
          onChange={(e) => {
            const list = [...formData.structuredMemberships];
            list[index].role = e.target.value;
            handleChange(
              "structuredMemberships",
              list
            );
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <input
          type="number"
          placeholder="Year"
          value={membership.year || ""}
          onChange={(e) => {
            const list = [...formData.structuredMemberships];
            list[index].year = e.target.value;
            handleChange(
              "structuredMemberships",
              list
            );
          }}
         className="w-full border border-gray-300 rounded-md px-4 py-3 bg-white outline-none focus:border-gray-400"
        />

        <button
          type="button"
          onClick={() => {
            const list = [...formData.structuredMemberships];
            list.splice(index, 1);
            handleChange(
              "structuredMemberships",
              list
            );
          }}
          className="text-red-600 hover:underline"
        >
          Delete Membership
        </button>

      </div>

    ))}

    <button
      type="button"
      onClick={() =>
        handleChange(
          "structuredMemberships",
          [
            ...formData.structuredMemberships,
            {
              organization: "",
              role: "",
              year: "",
            },
          ]
        )
      }
      className="text-blue-600 hover:underline font-medium"
    >
      + Add Membership
    </button>

  </div>

)}

        {/* ================= SAVE BUTTON ================= */}

        <div className="mt-8">

          <button
            onClick={saveProfile}
            disabled={loading}
            className="bg-[#4B4B7C] hover:bg-[#3a3a67] text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            {loading
              ? "Saving..."
              : "Save Changes"}
          </button>

        </div>

      </div>

    </div>

  </section>

  <Footer />

  <Toast
    show={toast.show}
    message={toast.message}
    type={toast.type}
    onClose={() =>
      setToast((prev) => ({
        ...prev,
        show: false,
      }))
    }
  />

</>

);
};

export default EditFaculty;