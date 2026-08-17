import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Header from "../components/layout/Header";
import PlacementHero from "../components/placements/PlacementHero";
import PlacementStats from "../components/placements/PlacementStats";
import PlacementFilters from "../components/placements/PlacementFilters";
import PlacementGrid from "../components/placements/PlacementGrid";
import PlacementSidebar from "../components/placements/PlacementSidebar";

import { getPlacements } from "../services/placementService";

function Placement() {
  const [placements, setPlacements] = useState([]);
  const [filteredPlacements, setFilteredPlacements] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [year, setYear] = useState("All");

  useEffect(() => {
    fetchPlacements();
  }, []);

  useEffect(() => {
    filterPlacements();
  }, [placements, search, department, year]);

  const fetchPlacements = async () => {
    try {
      setLoading(true);

      const res = await getPlacements();

      if (res.success) {
        setPlacements(res.data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filterPlacements = () => {
    let data = [...placements];

    if (search) {
      data = data.filter(
        (item) =>
          item.studentName
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.company
            .toLowerCase()
            .includes(search.toLowerCase()) ||
          item.role
            .toLowerCase()
            .includes(search.toLowerCase())
      );
    }

    if (department !== "All") {
      data = data.filter(
        (item) => item.department?.name === department
      );
    }

    if (year !== "All") {
      data = data.filter(
        (item) => item.year === Number(year)
      );
    }

    setFilteredPlacements(data);
  };

  return (
    <>
    <Header />
      <Navbar />
      <div className="bg-gray-50 min-h-screen">

        <PlacementHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8">

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6 sm:space-y-8 min-w-0">

              <PlacementStats placements={placements} />

              <PlacementFilters
                search={search}
                setSearch={setSearch}
                department={department}
                setDepartment={setDepartment}
                year={year}
                setYear={setYear}
                placements={placements}
              />

              <PlacementGrid
                placements={filteredPlacements}
                loading={loading}
              />

            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 min-w-0">
              <PlacementSidebar />
            </div>

          </div>

        </div>
<Footer />
      </div>
    </>
  );
}

export default Placement;