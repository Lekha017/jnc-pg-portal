import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Events from "../pages/Events";
import Announcements from "../pages/Announcements";
import Placement from "../pages/Placement";
import RecruitingCompaniesPage from "../pages/RecruitingCompanies";
import PlacementTraining from "../pages/PlacementTraining";
import PlacementContact from "../pages/PlacementContact";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Faculty from "../pages/Faculty/Faculty";
import FacultyDetails from "../pages/Faculty/FacultyDetails";
import AddFaculty from "../pages/Faculty/AddFaculty";
import EditFaculty from "../pages/Faculty/EditFaculty";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";

import AdminDashboard from "../pages/Admin/AdminDashboard";
import DepartmentDetails from "../pages/Department/DepartmentDetails";

import Library from "../pages/Library";
import PlacementGallery from "../pages/PlacementGallery";

import ManageEvents from "../pages/Admin/ManageEvents";
// import ManageRecruiters from "../pages/admin/ManageRecruiters";
// import ManagePlacementContact from "../pages/admin/ManagePlacementContact";
import ManageAnnouncements from "../pages/admin/ManageAnnouncements";
// import ManagePlacementGallery from "../pages/admin/ManagePlacementGallery";
import ManagePlacements from "../pages/Admin/ManagePlacements";

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

      {/* <Route
        path="/admin/recruiters"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageRecruiters />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/admin/placement-contact"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManagePlacementContact />
          </ProtectedRoute>
        }
      /> */}

      {/* <Route
        path="/admin/placement-gallery"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManagePlacementGallery />
          </ProtectedRoute>
        }
      /> */}

      <Route
        path="/admin/placements"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManagePlacements />
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
            <EditFaculty />
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
        path="/faculty/profile"
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

      {/* ================= 404 ================= */}

      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center text-2xl font-semibold">
            404 - Page Not Found
          </div>
        }
      />

    </Routes>
  );
};

export default AppRoutes;