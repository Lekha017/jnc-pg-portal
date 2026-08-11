import { useEffect, useState } from "react";
import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import {
  ArrowLeft,
  Images,
  Loader2,
  Users,
  X,
} from "lucide-react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  getClubAssociationById,
} from "../../services/clubAssociationService";

const ClubAssociationDetails = () => {
  // =========================================================
  // ROUTER
  // =========================================================

  const { id } = useParams();
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [clubAssociation, setClubAssociation] =
    useState(null);

  const [loading, setLoading] = useState(true);

  const [selectedImage, setSelectedImage] =
    useState(null);

  // =========================================================
  // FETCH CLUB / ASSOCIATION
  // =========================================================

  useEffect(() => {
    const fetchClubAssociation = async () => {
      try {
        setLoading(true);

        const response =
          await getClubAssociationById(id);

        if (!response?.data) {
          toast.error(
            "Club / Association not found."
          );

          navigate("/clubs-associations");
          return;
        }

        setClubAssociation(response.data);
      } catch (error) {
        console.error(
          "Fetch club association details error:",
          error
        );

        toast.error(
          error?.response?.data?.message ||
            "Failed to load club / association details."
        );

        navigate("/clubs-associations");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchClubAssociation();
    }
  }, [id, navigate]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center">
        <div className="text-center">
          <Loader2
            size={42}
            className="animate-spin text-[#2F2F6F] mx-auto"
          />

          <p className="text-gray-500 mt-4">
            Loading club details...
          </p>
        </div>
      </div>
    );
  }

  // =========================================================
  // SAFETY
  // =========================================================

  if (!clubAssociation) {
    return null;
  }

  // =========================================================
  // DATA
  // =========================================================

  const images =
    Array.isArray(clubAssociation.images)
      ? clubAssociation.images
      : [];

  const departmentName =
    clubAssociation?.department?.name ||
    "Department";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="min-h-screen bg-[#F8F9FC]">

      <Header />

      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="bg-[#2F2F6F] text-white">

        <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-10">

          {/* =================================================
              BACK BUTTON
          ================================================== */}

          <button
            type="button"
            onClick={() =>
              navigate("/clubs-associations")
            }
            className="
              inline-flex
              items-center
              gap-2
              text-sm
              text-white/80
              hover:text-white
              transition
              mb-5
            "
          >
            <ArrowLeft size={17} />

            Back to Clubs & Associations
          </button>

          {/* =================================================
              TITLE CONTENT
          ================================================== */}

          <div className="max-w-4xl">

            {/* DEPARTMENT */}

            <div
              className="
                inline-flex
                items-center
                gap-2
                px-3.5
                py-1.5
                rounded-full
                bg-white/10
                border
                border-white/20
                text-sm
                mb-4
              "
            >
              <Users size={15} />

              {departmentName}
            </div>

            {/* TITLE */}

            <h1
              className="
                text-3xl
                md:text-4xl
                font-bold
                leading-tight
              "
            >
              {clubAssociation.title}
            </h1>

            {/* DESCRIPTION */}

            <p
              className="
                text-white/80
                text-sm
                md:text-base
                leading-7
                mt-3
                max-w-3xl
              "
            >
              Discover more about this club or
              association and explore its activities,
              initiatives and gallery.
            </p>

          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main
        className="
          max-w-7xl
          mx-auto
          px-6
          md:px-10
          py-10
          md:py-14
        "
      >

        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-3
            gap-8
          "
        >

          {/* =================================================
              LEFT / MAIN CONTENT
          ================================================== */}

          <div className="lg:col-span-2 space-y-8">

            {/* =================================================
                DESCRIPTION
            ================================================== */}

            <section
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                shadow-sm
                p-6
                md:p-8
              "
            >

              <div className="flex items-center gap-3 mb-5">

                <div
                  className="
                    w-10
                    h-10
                    rounded-xl
                    bg-[#2F2F6F]/10
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Users
                    size={20}
                    className="text-[#2F2F6F]"
                  />
                </div>

                <h2
                  className="
                    text-2xl
                    font-bold
                    text-[#2F2F6F]
                  "
                >
                  About the Club / Association
                </h2>

              </div>

              <p
                className="
                  text-gray-600
                  leading-8
                  whitespace-pre-line
                "
              >
                {clubAssociation.description}
              </p>

            </section>

            {/* =================================================
                GALLERY
            ================================================== */}

            {images.length > 0 && (
              <section
                className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  shadow-sm
                  p-6
                  md:p-8
                "
              >

                {/* HEADER */}

                <div
                  className="
                    flex
                    items-center
                    justify-between
                    gap-4
                    mb-6
                  "
                >

                  <div>

                    <div className="flex items-center gap-3">

                      <div
                        className="
                          w-10
                          h-10
                          rounded-xl
                          bg-[#2F2F6F]/10
                          flex
                          items-center
                          justify-center
                        "
                      >
                        <Images
                          size={20}
                          className="text-[#2F2F6F]"
                        />
                      </div>

                      <h2
                        className="
                          text-2xl
                          font-bold
                          text-[#2F2F6F]
                        "
                      >
                        Gallery
                      </h2>

                    </div>

                    <p
                      className="
                        text-sm
                        text-gray-500
                        mt-2
                      "
                    >
                      Explore moments from the
                      club or association.
                    </p>

                  </div>

                  <span
                    className="
                      shrink-0
                      px-3
                      py-1.5
                      rounded-full
                      bg-gray-100
                      text-gray-600
                      text-sm
                      font-medium
                    "
                  >
                    {images.length}{" "}
                    {images.length === 1
                      ? "photo"
                      : "photos"}
                  </span>

                </div>

                {/* IMAGE GRID */}

                <div
                  className="
                    grid
                    grid-cols-2
                    md:grid-cols-3
                    gap-4
                  "
                >

                  {images.map((image, index) => (

                    <button
                      key={
                        image.publicId ||
                        index
                      }
                      type="button"
                      onClick={() =>
                        setSelectedImage(
                          image.url
                        )
                      }
                      className="
                        relative
                        aspect-[4/3]
                        rounded-xl
                        overflow-hidden
                        bg-gray-100
                        group
                        cursor-pointer
                      "
                    >

                      <img
                        src={image.url}
                        alt={`${clubAssociation.title} gallery ${
                          index + 1
                        }`}
                        className="
                          w-full
                          h-full
                          object-cover
                          group-hover:scale-105
                          transition-transform
                          duration-500
                        "
                        onError={(event) => {
                          event.currentTarget.src =
                            "https://placehold.co/800x500?text=Club+Association";
                        }}
                      />

                      {/* OVERLAY */}

                      <div
                        className="
                          absolute
                          inset-0
                          bg-black/0
                          group-hover:bg-black/30
                          transition
                          flex
                          items-center
                          justify-center
                        "
                      >

                        <span
                          className="
                            opacity-0
                            group-hover:opacity-100
                            transition
                            bg-white/90
                            text-[#2F2F6F]
                            px-4
                            py-2
                            rounded-full
                            text-sm
                            font-semibold
                          "
                        >
                          View Image
                        </span>

                      </div>

                    </button>

                  ))}

                </div>

              </section>
            )}

          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-6">

            {/* =================================================
                DEPARTMENT CARD
            ================================================== */}

            <div
              className="
                bg-white
                border
                border-gray-200
                rounded-2xl
                shadow-sm
                p-6
              "
            >

              <p
                className="
                  text-xs
                  font-semibold
                  uppercase
                  tracking-wider
                  text-gray-400
                "
              >
                Department
              </p>

              <h3
                className="
                  text-xl
                  font-bold
                  text-[#2F2F6F]
                  mt-2
                "
              >
                {departmentName}
              </h3>

              {clubAssociation?.department?.code && (
                <p className="text-sm text-gray-500 mt-1">
                  {clubAssociation.department.code}
                </p>
              )}

            </div>

            {/* =================================================
                GALLERY SUMMARY
            ================================================== */}

            <div
              className="
                bg-[#2F2F6F]
                text-white
                rounded-2xl
                p-6
              "
            >

              <div
                className="
                  w-11
                  h-11
                  rounded-xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                  mb-5
                "
              >
                <Images size={21} />
              </div>

              <h3 className="text-xl font-bold">
                Club Gallery
              </h3>

              <p
                className="
                  text-white/70
                  text-sm
                  leading-6
                  mt-2
                "
              >
                Browse photographs and moments
                associated with this club or
                association.
              </p>

              <div
                className="
                  mt-5
                  pt-5
                  border-t
                  border-white/10
                "
              >

                <span className="text-3xl font-bold">
                  {images.length}
                </span>

                <span className="text-white/70 ml-2">
                  {images.length === 1
                    ? "Photo"
                    : "Photos"}
                </span>

              </div>

            </div>

            {/* =================================================
                BACK BUTTON
            ================================================== */}

            <button
              type="button"
              onClick={() =>
                navigate("/clubs-associations")
              }
              className="
                w-full
                flex
                items-center
                justify-center
                gap-2
                px-5
                py-3.5
                rounded-xl
                border
                border-gray-200
                bg-white
                text-[#2F2F6F]
                font-semibold
                hover:bg-gray-50
                transition
              "
            >
              <ArrowLeft size={18} />

              View All Clubs
            </button>

          </aside>

        </div>
      </main>

      {/* =====================================================
          IMAGE LIGHTBOX
      ====================================================== */}

      {selectedImage && (
        <div
          className="
            fixed
            inset-0
            z-[9999]
            bg-black/80
            backdrop-blur-sm
            flex
            items-center
            justify-center
            p-4
          "
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setSelectedImage(null);
            }
          }}
        >

          {/* CLOSE */}

          <button
            type="button"
            onClick={() =>
              setSelectedImage(null)
            }
            className="
              absolute
              top-5
              right-5
              w-11
              h-11
              rounded-full
              bg-white
              text-gray-700
              flex
              items-center
              justify-center
              shadow-lg
              hover:bg-gray-100
              transition
            "
            aria-label="Close image"
          >
            <X size={22} />
          </button>

          {/* IMAGE */}

          <img
            src={selectedImage}
            alt={clubAssociation.title}
            className="
              max-w-full
              max-h-[90vh]
              object-contain
              rounded-xl
              shadow-2xl
            "
          />

        </div>
      )}

      <Footer />

    </div>
  );
};

export default ClubAssociationDetails;