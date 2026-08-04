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

function ProgramDetailsPage() {
  const { programId } = useParams();

  const [details, setDetails] = useState(null);
  const [fees, setFees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPage();
  }, [programId]);

  const loadPage = async () => {
    try {
      setLoading(true);

      const detailsRes =
        await getDetailsByProgram(programId);

      setDetails(detailsRes.data);

      try {
        const feeRes =
          await getFeeByProgram(programId);

        setFees(feeRes.data || []);
      } catch (error) {
        console.log("Fee not found");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="py-24 text-center">
          Loading...
        </div>

        <Footer />
      </>
    );
  }

  if (!details) {
    return (
      <>
        <Header />
        <Navbar />

        <div className="py-24 text-center">
          Program Details Not Found
        </div>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <Navbar />

      <main className="bg-white">

        <ProgramHero details={details} />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">

          <div className="grid grid-cols-12 gap-10">

            <div className="col-span-12 lg:col-span-8">

              <ProgramContent
                details={details}
                fees={fees}
              />

            </div>

            <div className="col-span-12 lg:col-span-4">

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