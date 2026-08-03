import { useState } from "react";

import Header from "../../components/layout/Header";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";

import AdmissionNavbar from "./components/AdmissionNavbar";
import AdmissionProcess from "./components/AdmissionProcess";
import ProgramsFees from "./components/ProgramsFees";

function AdmissionsPage() {
  const [activeTab, setActiveTab] = useState("process");

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-[#F8FAFC] min-h-screen">

        <AdmissionNavbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
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