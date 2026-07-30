import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Events from "../pages/Events";
import Announcements from "../pages/Announcements";
import Placement from "../pages/Placement";
import RecruitingCompaniesPage from "../pages/RecruitingCompanies";
import PlacementTraining from "../pages/PlacementTraining";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Faculty from "../pages/Faculty/Faculty";
import FacultyDetails from "../pages/Faculty/FacultyDetails";
import EditFaculty from "../pages/Faculty/EditFaculty";
import FacultyDashboard from "../pages/Faculty/FacultyDashboard";

import AdminDashboard from "../pages/admin/AdminDashboard";
import ManageFaculty from "../pages/admin/ManageFaculty";
import AddFaculty from "../pages/admin/AddFaculty";
import AdminEditFaculty from "../pages/admin/AdminEditFaculty";

import AddDepartment from "../pages/admin/AddDepartment";
import EditDepartment from "../pages/admin/EditDepartment";
import ManageDepartments from "../pages/admin/ManageDepartments";

import ManageEvents from "../pages/admin/ManageEvents";
import ManageGallery from "../pages/admin/ManageGallery";
import ManageRecruiters from "../pages/admin/ManageRecruiters";
import ManagePlacementContact from "../pages/admin/ManagePlacementContact";

import DepartmentDetails from "../pages/Department/DepartmentDetails";

import Library from "../pages/Library";

import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* ================= PUBLIC ================= */}

      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />

      <Route path="/events" element={<Events />} />
      <Route path="/announcements" element={<Announcements />} />
      <Route path="/placement" element={<Placement />} />
      <Route
        path="/recruiters"
        element={<RecruitingCompaniesPage />}
      />
      <Route
        path="/placement-training"
        element={<PlacementTraining />}
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

      <Route path="/faculty" element={<Faculty />} />

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
        path="/admin/gallery"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageGallery />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/recruiters"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManageRecruiters />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/placement-contact"
        element={
          <ProtectedRoute roles={["admin"]}>
            <ManagePlacementContact />
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
        path="/faculty/profile"
        element={
          <ProtectedRoute roles={["faculty"]}>
            <EditFaculty />
          </ProtectedRoute>
        }
      />

      {/* ================= AUTH ================= */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default AppRoutes;