import { useState } from "react";

import AdminLayout from "../../../components/layout/AdminLayout";

import ManagePrograms from "./ManagePrograms";
import ManageProgramDetails from "./ManageProgramDetails";
import ManageFees from "./ManageFees";

function ManageAcademics() {
  const [activeTab, setActiveTab] =
    useState("programs");

  return (
    <AdminLayout>
      <div className="min-h-screen bg-[#f5f7fb] py-8 px-6">

        <div className="max-w-7xl mx-auto">

          {/* Heading */}

          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#2D2A70]">
              Manage Academics
            </h1>

            <p className="text-gray-600 mt-2">
              Create, update and manage programmes,
              programme details and fee structure.
            </p>
          </div>

          {/* Tabs */}

          <div className="flex gap-4 mb-8 border-b border-gray-300 pb-5">

            <button
              onClick={() =>
                setActiveTab("programs")
              }
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === "programs"
                  ? "bg-[#2D2A70] text-white"
                  : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
              }`}
            >
              Programs
            </button>

            <button
              onClick={() =>
                setActiveTab("details")
              }
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === "details"
                  ? "bg-[#2D2A70] text-white"
                  : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
              }`}
            >
              Program Details
            </button>

            <button
              onClick={() =>
                setActiveTab("fees")
              }
              className={`px-8 py-3 rounded-full font-semibold transition-all ${
                activeTab === "fees"
                  ? "bg-[#2D2A70] text-white"
                  : "border border-[#2D2A70] text-[#2D2A70] hover:bg-[#EEF5FF]"
              }`}
            >
              Fee Structure
            </button>

          </div>

          {/* Programs */}

          {activeTab === "programs" && (
            <ManagePrograms />
          )}

          {/* Program Details */}

          {activeTab === "details" && (
            <ManageProgramDetails />
          )}

          {/* Fees */}

          {activeTab === "fees" && (
            <ManageFees />
          )}

        </div>

      </div>
    </AdminLayout>
  );
}

export default ManageAcademics;