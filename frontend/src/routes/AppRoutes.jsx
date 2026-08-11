import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Events from "../pages/Events";
import Announcements from "../pages/Announcements";
import Placement from "../pages/Placement";
import RecruitingCompaniesPage from "../pages/RecruitingCompanies";
import PlacementTraining from "../pages/PlacementTraining";
import PlacementContact from "../pages/PlacementContact";
import ProgramDetailsPage from "../pages/Admissions/components/ProgramDetailsPage";
import Auditorium from "../pages/infrastructure/Auditorium";
import FoodCourt from "../pages/infrastructure/FoodCourt";
import Hostel from "../pages/infrastructure/Hostel";
import MedicalRoom from "../pages/infrastructure/MedicalRoom";
import BoardRoom from "../pages/infrastructure/BoardRoom";
import MeditationRoom from "../pages/infrastructure/MeditationRoom";
import ConferenceHall from "../pages/infrastructure/ConferenceHall";
import VideoStudio from "../pages/infrastructure/VideoStudio";
import Chapel from "../pages/infrastructure/Chapel";
import Gymnasium from "../pages/infrastructure/Gymnasium";
import IndoorGamesRoom from "../pages/infrastructure/IndoorGamesRoom";
import Bank from "../pages/infrastructure/Bank";
import Parking from "../pages/infrastructure/Parking";
import AudioStudio from "../pages/infrastructure/AudioStudio";
import MediaLab from "../pages/infrastructure/MediaLab";
import InnovationLab from "../pages/infrastructure/InnovationLab";
import MediaIncubationCentre from "../pages/infrastructure/MediaIncubationCentre";
import ZoologicalMuseum from "../pages/infrastructure/ZoologicalMuseum";
import LanguageLab from "../pages/infrastructure/LanguageLab";
import StudentUnionRoom from "../pages/infrastructure/StudentUnionRoom";
import PerformingArts from "../pages/infrastructure/PerformingArts";

import Dhwani from "../pages/AdmissionsNavbar/Dhwani";
import Prospectus from "../pages/AdmissionsNavbar/Prospectus";
import MaintenancePolicy from "../pages/infrastructure/MaintenancePolicy";

import ARIIA from "../pages/AdmissionsNavbar/ARIIA";
import OnlinePayment from "../pages/AdmissionsNavbar/OnlinePayment";


import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";

import Faculty from "../pages/Faculty/Faculty";
import FacultyDetails from "../pages/Faculty/FacultyDetails";
import EditFaculty from "../pages/Faculty/EditFaculty";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";
import AdmissionsPage from "../pages/Admissions/AdmissionsPage";
import AdmissionPortal from "../pages/Admissions/AdmissionPortal";
import ApplicationForm from "../pages/Admissions/ApplicationForm";
import ApplicationInvoice from "../pages/Admissions/ApplicationInvoice";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageFaculty from "../pages/admin/ManageFaculty";
import AddFaculty from "../pages/admin/AddFaculty";
import AdminEditFaculty from "../pages/admin/AdminEditFaculty";
import ManageManagement from "../pages/admin/ManageManagement";
import AddManagement from "../pages/admin/AddManagement";
import EditManagement from "../pages/admin/EditManagement";
import ManageDeans from "../pages/admin/ManageDeans";
import AddDean from "../pages/admin/AddDean";
import EditDean from "../pages/admin/EditDean";

import OrganizationStructure from "../pages/AboutUs/OrganizationStructure";
import GoverningBody from "../pages/AboutUs/GoverningBody";
import PrincipalMessage from "../pages/AboutUs/PrincipalMessage";
import ExaminationCell from "../pages/AboutUs/ExaminationCell";
import ChiefCoordinators from "../pages/AboutUs/ChiefCoordinators";
import AdministrativeStaff from "../pages/AboutUs/AdministrativeStaff";
import StaffWelfareServices from "../pages/AboutUs/StaffWelfareServices";
import Management from "../pages/AboutUs/Management";
import GoverningCouncil from "../pages/AboutUs/GoverningCouncil";
import AcademicCouncil from "../pages/AboutUs/AcademicCouncil";
import Deans from "../pages/AboutUs/Deans";
import HistoryMilestones from "../pages/AboutUs/HistoryMilestones";
import InstitutionalDistinctiveness from "../pages/AboutUs/InstitutionalDistinctiveness";
import BestPractices from "../pages/AboutUs/BestPractices";
import CampusCulture from "../pages/AboutUs/CampusCulture";

import Library from "../pages/Library";
import PlacementGallery from "../pages/PlacementGallery";
import Careers from "../pages/Careers";


import AddDepartment from "../pages/admin/AddDepartment";
import EditDepartment from "../pages/admin/EditDepartment";
import ManageDepartments from "../pages/admin/ManageDepartments";
import ManageAcademics from "../pages/Admin/programs/ManageAcademics";

import ManageEvents from "../pages/Admin/ManageEvents";

import ManageAnnouncements from "../pages/Admin/ManageAnnouncements";

import ManagePlacements from "../pages/Admin/ManagePlacements";

import DepartmentDetails from "../pages/Department/DepartmentDetails";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />


      <Route
        path="/events"
        element={<Events />}
      />

      <Route
        path="/announcements"
        element={<Announcements />}
      />

      <Route
        path="/placements"
        element={<Placement />}
      />

      <Route
        path="/recruiting-companies"
        element={<RecruitingCompaniesPage />}
      />

      <Route
        path="/placement-training"
        element={<PlacementTraining />}
      />


      <Route
        path="/placement-contact"
        element={<PlacementContact />}
      />

      <Route
        path="/placement-gallery"
        element={<PlacementGallery />}
      />


      <Route
        path="/department/:slug"
        element={<DepartmentDetails />}
      />

      <Route
        path="/admissions"
        element={<AdmissionsPage />}
      />

      <Route
        path="/program-details/:programId"
        element={<ProgramDetailsPage />}
      />

      <Route
        path="/infrastructure/auditorium"
        element={<Auditorium />}
      />

      <Route
        path="/infrastructure/food-court"
        element={<FoodCourt />}
      />

      <Route
        path="/infrastructure/hostel"
        element={<Hostel />}
      />

      <Route
        path="/infrastructure/medical-room"
        element={<MedicalRoom />}
      />

      <Route
        path="/infrastructure/board-room"
        element={<BoardRoom />}
      />

      <Route
        path="/infrastructure/meditation-room"
        element={<MeditationRoom />}
      />

      <Route
        path="/infrastructure/conference-hall"
        element={<ConferenceHall />}
      />

      <Route
        path="/infrastructure/video-studio"
        element={<VideoStudio />}
      />

      <Route
        path="/infrastructure/chapel"
        element={<Chapel />}
      />

      <Route
        path="/infrastructure/gymnasium"
        element={<Gymnasium />}
      />

      <Route
        path="/infrastructure/indoor-games-room"
        element={<IndoorGamesRoom />}
      />

      <Route
        path="/infrastructure/bank"
        element={<Bank />}
      />

      <Route
        path="/infrastructure/parking"
        element={<Parking />}
      />

      <Route
        path="/infrastructure/audio-studio"
        element={<AudioStudio />}
      />

      <Route
        path="/infrastructure/media-lab"
        element={<MediaLab />}
      />

      <Route
        path="/infrastructure/innovation-lab"
        element={<InnovationLab />}
      />

      <Route
        path="/prospectus"
        element={<Prospectus />}
      />

      <Route
        path="/dhwani"
        element={<Dhwani />}
      />

      <Route
        path="/admissionsnavbar/online-payment"
        element={<OnlinePayment />}
      />
      <Route
        path="/infrastructure/maintenance-policy"
        element={<MaintenancePolicy />}
      />

      <Route

        path="/ARIIA"
        element={<ARIIA />}
      />

      <Route
        path="/infrastructure/media-incubation-centre"
        element={<MediaIncubationCentre />}
      />

      <Route
        path="/infrastructure/zoological-museum"
        element={<ZoologicalMuseum />}
      />

      <Route
        path="/infrastructure/language-lab"
        element={<LanguageLab />}
      />

      <Route
        path="/infrastructure/student-union-room"
        element={<StudentUnionRoom />}
      />

      <Route
        path="/infrastructure/performing-arts"
        element={<PerformingArts />}
      />

      <Route
        path="/admission-portal"
        element={<AdmissionPortal />}
      />

      <Route
        path="/admissions/application"
        element={<ApplicationForm />}
      />

<Route
  path="/admissions/application/invoice"
  element={<ApplicationInvoice />}
/>

<Route
  path="/careers"
  element={<Careers />}
/>
      {/* ================= LIBRARY ================= */}

      <Route
        path="/library"
        element={
          <ProtectedRoute>
            <Library />
          </ProtectedRoute>
        }
      />

      {/* ================= FACULTY PUBLIC ================= */}


      <Route
        path="/faculty"
        element={<Faculty />}
      />


      <Route
        path="/faculty/:id"
        element={<FacultyDetails />}
      />

      {/* ================= ADMIN ================= */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/events"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/announcements"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageAnnouncements />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/placements"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManagePlacements />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/departments"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageDepartments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/departments/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AddDepartment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/departments/edit/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <EditDepartment />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/programs"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageAcademics />
          </ProtectedRoute>
        }
      />


      <Route
        path="/admin/management"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/management/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AddManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/management/edit/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <EditManagement />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/deans"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageDeans />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/deans/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AddDean />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/deans/edit/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <EditDean />
          </ProtectedRoute>
        }
      />



      {/* ================= FACULTY ADMIN ================= */}

      <Route
        path="/admin/faculty"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageFaculty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/faculty/add"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AddFaculty />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/faculty/edit/:id"
        element={
          <ProtectedRoute roles={["admin"]}>
            <AdminEditFaculty />
          </ProtectedRoute>
        }
      />

      {/* ================= FACULTY ================= */}

      <Route
        path="/faculty/dashboard"
        element={
          <ProtectedRoute roles={["faculty"]}>
            <FacultyDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/faculty/edit-profile"
        element={
          <ProtectedRoute roles={["faculty"]}>
            <EditFaculty />
          </ProtectedRoute>
        }
      />

      {/* ================= AUTH ================= */}

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/forgot-password"
        element={<ForgotPassword />}
      />
      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
            404 - Page Not Found
          </div>
        }
      />

      {/* ================= ABOUT US ================= */}
      <Route
        path="/organization-structure"
        element={<OrganizationStructure />}
      />

      <Route
        path="/management"
        element={<Management />}
      />

      <Route
        path="/governing-body"
        element={<GoverningBody />}
      />

      <Route
        path="/principal-message"
        element={<PrincipalMessage />}
      />

      <Route
        path="/examination-cell"
        element={<ExaminationCell />}
      />

      <Route
        path="/chief-coordinators"
        element={<ChiefCoordinators />}
      />

      <Route
        path="/administrative-staff"
        element={<AdministrativeStaff />}
      />

      <Route
        path="/staff-welfare-services"
        element={<StaffWelfareServices />}
      />

      <Route
        path="/governing-council"
        element={<GoverningCouncil />}
      />

      <Route
        path="/academic-council"
        element={<AcademicCouncil />}
      />

      <Route
        path="/deans"
        element={<Deans />}
      />

      <Route
        path="/history-milestones"
        element={<HistoryMilestones />}
      />

      <Route
        path="/institutional-distinctiveness"
        element={<InstitutionalDistinctiveness />}
      />

      <Route
        path="/best-practices"
        element={<BestPractices />}
      />

      <Route
        path="/campus-culture"
        element={<CampusCulture />}
      />
    </Routes>
  );
};

export default AppRoutes;