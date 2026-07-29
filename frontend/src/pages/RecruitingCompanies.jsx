import Navbar from "../components/layout/Navbar";
import PlacementSidebar from "../components/placements/PlacementSidebar";
import RecruitingCompanies from "../components/placements/RecruitingCompanies";

function RecruitingCompaniesPage() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-10">

        <div className="max-w-7xl mx-auto px-4">

          <div className="grid lg:grid-cols-4 gap-8">

            <div className="lg:col-span-3">
              <RecruitingCompanies />
            </div>

            <div className="lg:col-span-1">
              <PlacementSidebar />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default RecruitingCompaniesPage;