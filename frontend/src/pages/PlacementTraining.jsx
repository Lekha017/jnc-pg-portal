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

      <section className="bg-[#F8FAFC] py-12">
        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">

            {/* =========================
                LEFT CONTENT
            ========================== */}

            <div className="lg:col-span-3 space-y-8">

              {/* =========================
                  ABOUT PLACEMENT TRAINING
              ========================== */}

              <div className="bg-white rounded-2xl border border-gray-200 p-10">

                <h2
                  className="text-3xl font-bold text-[#2D2A70]"
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  About Placement Training
                </h2>

                <div className="w-20 h-1 bg-blue-500 rounded-full mt-4 mb-6"></div>

                <p className="text-gray-700 leading-8 text-lg">
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

            <div>
              <PlacementSidebar />
            </div>

          </div>

        </div>
      </section>
    </>
  );
}

export default PlacementTraining;