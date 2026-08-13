import { useEffect, useState } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import AdmissionNavbar from "./components/AdmissionNavbar";
import AdmissionProcess from "./components/AdmissionProcess";
import ProgramsFees from "./components/ProgramsFees";

function AdmissionsPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(
    location.search.includes("tab=programs")
      ? "programs"
      : "process"
  );

  // =========================================================
  // RESTORE TAB + SCROLL POSITION ON BACK
  // =========================================================

  useEffect(() => {
    const params = new URLSearchParams(
      location.search
    );

    const tab = params.get("tab");

    if (tab === "programs") {
      setActiveTab("programs");
    } else {
      setActiveTab("process");
    }

    // -------------------------------------------------------
    // Restore saved scroll position
    // -------------------------------------------------------

    const savedScroll =
      location.state?.admissionsScrollPosition;

    if (
      location.state?.restoreAdmissionsScroll &&
      typeof savedScroll === "number"
    ) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          window.scrollTo({
            top: savedScroll,
            left: 0,
            behavior: "smooth",
          });
        });
      });

      // Clear the restore flag so normal visits start at top
      navigate(
        {
          pathname: location.pathname,
          search: location.search,
        },
        {
          replace: true,
          state: {},
        }
      );
    } else {
      // -----------------------------------------------------
      // New visit to Admissions → TOP
      // -----------------------------------------------------

      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });
    }
  }, [
    location.pathname,
    location.search,
    location.key,
  ]);

  // =========================================================
  // TAB CHANGE
  // =========================================================

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    if (tab === "programs") {
      navigate(
        "/admissions?tab=programs",
        {
          state: {},
        }
      );
    } else {
      navigate(
        "/admissions",
        {
          state: {},
        }
      );
    }
  };

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-[#F8FAFC] min-h-screen">

        <AdmissionNavbar
          activeTab={activeTab}
          setActiveTab={handleTabChange}
        />

        <div className="max-w-7xl mx-auto px-6 py-8">

          {activeTab === "process" && (
            <AdmissionProcess />
          )}

          {activeTab === "programs" && (
            <ProgramsFees />
          )}

        </div>

      </main>

      <Footer />
    </>
  );
}

export default AdmissionsPage;