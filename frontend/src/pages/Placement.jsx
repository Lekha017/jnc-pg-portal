import { useEffect, useState } from "react";

import Navbar from "../components/layout/Navbar";

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
      <Navbar />

      <div className="bg-gray-50 min-h-screen">

        <PlacementHero />

        <div className="max-w-7xl mx-auto px-4 py-10">

          <div className="grid lg:grid-cols-4 gap-8">

            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">

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
            <div className="lg:col-span-1">
              <PlacementSidebar />
            </div>

          </div>

        </div>

      </div>
    </>
  );
}

export default Placement;