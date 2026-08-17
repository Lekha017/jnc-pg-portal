import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Header from "../../../components/layout/Header";
import Navbar from "../../../components/layout/Navbar";
import Footer from "../../../components/layout/Footer";

import ProgramHero from "../../../components/programs/ProgramHero";
import ProgramContent from "../../../components/programs/ProgramContent";
import ProgramSidebar from "../../../components/programs/ProgramSidebar";

import { getDetailsByProgram } from "../../../services/programDetailsService";
import { getFeeByProgram } from "../../../services/feeService";
import { getAllDepartments } from "../../../services/departmentService";

function ProgramDetailsPage() {
  const { programId } = useParams();

  const [details, setDetails] = useState(null);
  const [fees, setFees] = useState([]);
  const [departmentSlug, setDepartmentSlug] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });

    loadPage();
  }, [programId]);

  const loadPage = async () => {
    try {
      setLoading(true);

      // ==============================
      // PROGRAM DETAILS
      // ==============================

      const detailsRes = await getDetailsByProgram(programId);

      const programDetails = detailsRes.data;

      setDetails(programDetails);

      // ==============================
      // FEES
      // ==============================

      try {
        const feeRes = await getFeeByProgram(programId);

        setFees(feeRes.data || []);
      } catch (error) {
        console.log("Fee not found");
        setFees([]);
      }

      // ==============================
      // DEPARTMENT
      // ==============================

      try {
        const departments = await getAllDepartments();

        const department = departments.find((dept) => {
          // Match using department ID
          if (
            programDetails?.department &&
            typeof programDetails.department === "object"
          ) {
            if (
              programDetails.department._id === dept._id
            ) {
              return true;
            }

            if (
              programDetails.department.slug === dept.slug
            ) {
              return true;
            }

            if (
              programDetails.department.name === dept.name
            ) {
              return true;
            }
          }

          // Match if department is stored as ID
          if (
            typeof programDetails?.department === "string"
          ) {
            if (programDetails.department === dept._id) {
              return true;
            }

            if (programDetails.department === dept.slug) {
              return true;
            }

            if (programDetails.department === dept.name) {
              return true;
            }
          }

          // Match using department name
          if (
            programDetails?.departmentName &&
            programDetails.departmentName === dept.name
          ) {
            return true;
          }

          // Match using department code
          if (
            programDetails?.departmentCode &&
            programDetails.departmentCode === dept.code
          ) {
            return true;
          }

          return false;
        });

        if (department) {
          setDepartmentSlug(department.slug);
        } else {
          console.log(
            "Department not found for this program"
          );

          setDepartmentSlug(null);
        }
      } catch (error) {
        console.error(
          "Failed to load department",
          error
        );

        setDepartmentSlug(null);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ==============================
  // LOADING
  // ==============================

  if (loading) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="min-h-[400px] flex items-center justify-center px-4 text-center">
          <p className="text-lg sm:text-xl text-gray-600">
            Loading...
          </p>
        </div>

        <Footer />
      </>
    );
  }

  // ==============================
  // NOT FOUND
  // ==============================

  if (!details) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="min-h-[400px] flex items-center justify-center px-4 text-center">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#2D2A70]">
              Program Details Not Found
            </h2>

            <p className="mt-2 text-sm sm:text-base text-gray-500">
              The requested program could not be found.
            </p>
          </div>
        </div>

        <Footer />
      </>
    );
  }

  // ==============================
  // PAGE
  // ==============================

  return (
    <>
      <Header />

      <Navbar />

      <main className="bg-white">

        {/* ==========================
            PROGRAM HERO
        ========================== */}

        <ProgramHero details={details} />

        {/* ==========================
            CONTENT + SIDEBAR
        ========================== */}

        <div
          className="
            max-w-7xl
            mx-auto
            px-4
            sm:px-6
            lg:px-8
            py-8
            sm:py-10
            lg:py-12
          "
        >

          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-12
              gap-8
              lg:gap-10
            "
          >

            {/* =========================
                LEFT CONTENT
            ========================= */}

            <div className="w-full lg:col-span-8 min-w-0">

              <ProgramContent
                details={details}
                fees={fees}
                departmentSlug={departmentSlug}
              />

            </div>

            {/* =========================
                RIGHT SIDEBAR
            ========================= */}

            <div className="w-full lg:col-span-4 min-w-0">

              <ProgramSidebar
                details={details}
              />

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  );
}

export default ProgramDetailsPage;