import PlacementTrainingHero from "../components/placements/PlacementTrainingHero";
import PlacementSidebar from "../components/placements/PlacementSidebar";
import SkillsCovered from "../components/placements/SkillsCovered";
import TechnicalSkills from "../components/placements/TechnicalSkills";
import SemesterTraining from "../components/placements/SemesterTraining";
import TrainingMethodology from "../components/placements/TrainingMethodology";

function PlacementTraining() {
  return (
    <>
      <PlacementTrainingHero />

      <section className="bg-[#F8FAFC] py-8 sm:py-10 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">

            {/* =========================
                LEFT CONTENT
            ========================== */}

            <div className="lg:col-span-3 space-y-6 sm:space-y-8">

              {/* =========================
                  ABOUT PLACEMENT TRAINING
              ========================== */}

              <div className="bg-white rounded-2xl border border-gray-200 p-5 sm:p-7 md:p-10">

                <h2
                  className="text-2xl sm:text-3xl font-bold text-[#2D2A70]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  About Placement Training
                </h2>

                <div className="w-20 h-1 bg-blue-500 rounded-full mt-4 mb-6"></div>

                <p className="text-gray-700 leading-7 sm:leading-8 text-base sm:text-lg">
                  The Placement Training Cell at Jyoti Nivas College
                  prepares postgraduate students for campus recruitment
                  through a structured semester-wise programme covering
                  aptitude, technical skills and professional
                  communication.

                  Sessions are conducted by experienced faculty members
                  and industry experts, combining classroom instruction,
                  mock interviews, aptitude practice and resume
                  development to improve employability.
                </p>

              </div>

              {/* =========================
                  SKILLS COVERED
              ========================== */}

              <SkillsCovered />

              {/* =========================
                  TECHNICAL SKILLS
              ========================== */}

              <TechnicalSkills />

              {/* =========================
                  SEMESTER TRAINING
              ========================== */}

              <SemesterTraining />

              {/* =========================
                  TRAINING METHODOLOGY
              ========================== */}

              <TrainingMethodology />

            </div>

            {/* =========================
                RIGHT SIDEBAR
            ========================== */}

            <div className="w-full lg:col-span-1">
              <div className="lg:sticky lg:top-24">
                <PlacementSidebar />
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default PlacementTraining;