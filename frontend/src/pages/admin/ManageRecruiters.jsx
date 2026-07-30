import { useState } from "react";

import AdminLayout from "../../components/layout/AdminLayout";
import RecruiterForm from "../../components/admin/RecruiterForm";
import RecruiterList from "../../components/admin/RecruiterList";

const ManageRecruiters = () => {
  const [refresh, setRefresh] = useState(0);
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);

  return (
    <AdminLayout>
      <div className="min-h-screen bg-gray-100 py-8 px-6">
        <div className="max-w-7xl mx-auto">

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-[#2D2A70]">
              Manage Recruiters
            </h1>

            <p className="text-gray-600 mt-2">
              Add, edit and manage recruiting companies.
            </p>
          </div>

          {/* Content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

            {/* Left */}
            <div className="lg:col-span-2">
              <RecruiterForm
                selectedRecruiter={selectedRecruiter}
                setSelectedRecruiter={setSelectedRecruiter}
                refresh={() => setRefresh((prev) => prev + 1)}
              />
            </div>

            {/* Right */}
            <div className="lg:col-span-3">
              <RecruiterList
                onEdit={setSelectedRecruiter}
                refresh={refresh}
              />
            </div>

          </div>

        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageRecruiters;