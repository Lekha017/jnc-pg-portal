import Navbar from "../components/layout/Navbar";
import PlacementSidebar from "../components/placements/PlacementSidebar";
import RecruitingCompanies from "../components/placements/RecruitingCompanies";

function RecruitingCompaniesPage() {
  return (
    <>
      <Navbar />

      <div className="bg-gray-50 min-h-screen py-6 sm:py-8 md:py-10">

        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">

            <div className="lg:col-span-3 w-full">
              <RecruitingCompanies />
            </div>

            <div className="lg:col-span-1 w-full">
              <div className="lg:sticky lg:top-24">
                <PlacementSidebar />
              </div>
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default RecruitingCompaniesPage;