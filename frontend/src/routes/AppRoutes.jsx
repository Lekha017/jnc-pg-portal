import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Events from "../pages/Events";
import Announcements from "../pages/Announcements";
import Placement from "../pages/Placement";
import RecruitingCompaniesPage from "../pages/RecruitingCompanies";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import ManageEvents from "../pages/admin/ManageEvents";
import ManageGallery from "../pages/admin/ManageGallery";
import ManageRecruiters from "../pages/admin/ManageRecruiters";
import PlacementTraining from "../pages/PlacementTraining";
import ManagePlacementContact from "../pages/admin/ManagePlacementContact";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>

      {/* ================= Public Routes ================= */}

      <Route path="/" element={<Home />} />

      <Route path="/events" element={<Events />} />

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
        path="/admin/placement-contact"
        element={<ManagePlacementContact />}
      />

      <Route path="/login" element={<Login />} />

      <Route path="/register" element={<Register />} />



      {/* ================= Admin Routes ================= */}

      <Route
        path="/admin/events"
        element={<ManageEvents />}
      />

      <Route
        path="/admin/gallery"
        element={<ManageGallery />}
      />

      <Route
        path="/admin/recruiters"
        element={<ManageRecruiters />}
      />



      {/* ================= Future Protected Routes ================= */}

      {/*
      <Route
        path="/admin/events"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageEvents />
          </ProtectedRoute>
        }
      />
      */}

    </Routes>
  );
};

export default AppRoutes;